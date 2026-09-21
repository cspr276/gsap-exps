'use client';

import React, { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';

interface DitherProps {
  waveSpeed?: number;
  waveFrequency?: number;
  waveAmplitude?: number;
  waveColor?: [number, number, number];
  backgroundColor?: [number, number, number];
  colorNum?: number;
  pixelSize?: number;
  disableAnimation?: boolean;
  enableMouseInteraction?: boolean;
  mouseRadius?: number;
  className?: string;
}

const vertex = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `#version 300 es
precision highp float;
out vec4 fragColor;

uniform vec2 resolution;
uniform float time;
uniform float waveSpeed;
uniform float waveFrequency;
uniform float waveAmplitude;
uniform vec3 waveColor;
uniform vec3 backgroundColor;
uniform float colorNum;
uniform float pixelSize;

vec4 mod289(vec4 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
vec2 fade(vec2 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }

float cnoise(vec2 P) {
  vec4 Pi = floor(P.xyxy) + vec4(0.0,0.0,1.0,1.0);
  vec4 Pf = fract(P.xyxy) - vec4(0.0,0.0,1.0,1.0);
  Pi = mod289(Pi);
  vec4 ix = Pi.xzxz;
  vec4 iy = Pi.yyww;
  vec4 fx = Pf.xzxz;
  vec4 fy = Pf.yyww;
  vec4 i = permute(permute(ix) + iy);
  vec4 gx = fract(i * (1.0/41.0)) * 2.0 - 1.0;
  vec4 gy = abs(gx) - 0.5;
  vec4 tx = floor(gx + 0.5);
  gx = gx - tx;
  vec2 g00 = vec2(gx.x, gy.x);
  vec2 g10 = vec2(gx.y, gy.y);
  vec2 g01 = vec2(gx.z, gy.z);
  vec2 g11 = vec2(gx.w, gy.w);
  vec4 norm = taylorInvSqrt(vec4(dot(g00,g00), dot(g01,g01), dot(g10,g10), dot(g11,g11)));
  g00 *= norm.x; g01 *= norm.y; g10 *= norm.z; g11 *= norm.w;
  float n00 = dot(g00, vec2(fx.x, fy.x));
  float n10 = dot(g10, vec2(fx.y, fy.y));
  float n01 = dot(g01, vec2(fx.z, fy.z));
  float n11 = dot(g11, vec2(fx.w, fy.w));
  vec2 fade_xy = fade(Pf.xy);
  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
  return 2.3 * mix(n_x.x, n_x.y, fade_xy.y);
}

const int OCTAVES = 4;
float fbm(vec2 p) {
  float value = 0.0;
  float amp = 1.0;
  float freq = waveFrequency;
  for (int i = 0; i < OCTAVES; i++) {
    value += amp * abs(cnoise(p));
    p *= freq;
    amp *= waveAmplitude;
  }
  return value;
}

float pattern(vec2 p) {
  vec2 p2 = p - time * waveSpeed;
  return fbm(p + fbm(p2)); 
}

const float bayerMatrix8x8[64] = float[64](
  0.0/64.0, 48.0/64.0, 12.0/64.0, 60.0/64.0,  3.0/64.0, 51.0/64.0, 15.0/64.0, 63.0/64.0,
  32.0/64.0,16.0/64.0, 44.0/64.0, 28.0/64.0, 35.0/64.0,19.0/64.0, 47.0/64.0, 31.0/64.0,
  8.0/64.0, 56.0/64.0,  4.0/64.0, 52.0/64.0, 11.0/64.0,59.0/64.0,  7.0/64.0, 55.0/64.0,
  40.0/64.0,24.0/64.0, 36.0/64.0, 20.0/64.0, 43.0/64.0,27.0/64.0, 39.0/64.0, 23.0/64.0,
  2.0/64.0, 50.0/64.0, 14.0/64.0, 62.0/64.0,  1.0/64.0,49.0/64.0, 13.0/64.0, 61.0/64.0,
  34.0/64.0,18.0/64.0, 46.0/64.0, 30.0/64.0, 33.0/64.0,17.0/64.0, 45.0/64.0, 29.0/64.0,
  10.0/64.0,58.0/64.0,  6.0/64.0, 54.0/64.0,  9.0/64.0,57.0/64.0,  5.0/64.0, 53.0/64.0,
  42.0/64.0,26.0/64.0, 38.0/64.0, 22.0/64.0, 41.0/64.0,25.0/64.0, 37.0/64.0, 21.0/64.0
);

void main() {
  float ps = max(pixelSize, 1.0);
  vec2 coord = floor(gl_FragCoord.xy / ps);
  vec2 uvPixel = (coord * ps) / resolution.xy;
  vec2 uv = uvPixel - 0.5;
  uv.x *= resolution.x / resolution.y;
  
  float f = pattern(uv);
  vec3 col = mix(backgroundColor, waveColor, clamp(f, 0.0, 1.0));
  
  int x = int(mod(coord.x, 8.0));
  int y = int(mod(coord.y, 8.0));
  float threshold = bayerMatrix8x8[y * 8 + x] - 0.25;
  float stepVal = 1.0 / max(colorNum - 1.0, 1.0);
  col += threshold * stepVal;
  float luminance = dot(col, vec3(0.2126, 0.7152, 0.0722));
  float bias = mix(0.2, 0.0, smoothstep(0.45, 0.8, luminance));
  col = clamp(col - bias, 0.0, 1.0);
  col = floor(col * (colorNum - 1.0) + 0.5) / (colorNum - 1.0);
  
  fragColor = vec4(col, 1.0);
}
`;

export default function Dither({
  waveSpeed = 0.04,
  waveFrequency = 2.4,
  waveAmplitude = 0.3,
  waveColor = [0.42, 0.65, 0.9],
  backgroundColor = [0.03, 0.03, 0.05],
  colorNum = 4,
  pixelSize = 2,
  disableAnimation = false,
  className = '',
}: DitherProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const targetWaveColor = useRef(new Float32Array(waveColor));
  const currentWaveColor = useRef(new Float32Array(waveColor));
  const targetBgColor = useRef(new Float32Array(backgroundColor));
  const currentBgColor = useRef(new Float32Array(backgroundColor));

  // Sync targets when props change
  useEffect(() => {
    targetWaveColor.current.set(waveColor);
  }, [waveColor[0], waveColor[1], waveColor[2]]);

  useEffect(() => {
    targetBgColor.current.set(backgroundColor);
  }, [backgroundColor[0], backgroundColor[1], backgroundColor[2]]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: Renderer;
    try {
      renderer = new Renderer({ alpha: true, antialias: false, dpr: 1 });
    } catch {
      return;
    }

    const gl = renderer.gl;
    const canvas = gl.canvas;
    canvas.style.display = 'block';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    container.appendChild(canvas);

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        resolution: { value: new Float32Array([1, 1]) },
        time: { value: 0 },
        waveSpeed: { value: waveSpeed },
        waveFrequency: { value: waveFrequency },
        waveAmplitude: { value: waveAmplitude },
        waveColor: { value: currentWaveColor.current },
        backgroundColor: { value: currentBgColor.current },
        colorNum: { value: colorNum },
        pixelSize: { value: pixelSize },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });

    const setSize = () => {
      const rect = container.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect.width));
      const h = Math.max(1, Math.floor(rect.height));
      renderer.setSize(w, h);
      program.uniforms.resolution.value[0] = gl.drawingBufferWidth;
      program.uniforms.resolution.value[1] = gl.drawingBufferHeight;
      renderer.render({ scene: mesh });
    };

    const ro = new ResizeObserver(setSize);
    ro.observe(container);
    setSize();

    let raf = 0;
    let isVisible = true;
    let isPageVisible = !document.hidden;
    const t0 = performance.now();

    const loop = (t: number) => {
      if (!disableAnimation) {
        program.uniforms.time.value = (t - t0) * 0.001;
      }

      // Smooth color interpolation
      for (let i = 0; i < 3; i++) {
        currentWaveColor.current[i] += (targetWaveColor.current[i] - currentWaveColor.current[i]) * 0.06;
        currentBgColor.current[i] += (targetBgColor.current[i] - currentBgColor.current[i]) * 0.06;
      }

      renderer.render({ scene: mesh });
      raf = requestAnimationFrame(loop);
    };

    const tryStart = () => {
      if (isVisible && isPageVisible && raf === 0) raf = requestAnimationFrame(loop);
    };
    const tryStop = () => {
      if (raf !== 0) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        isVisible ? tryStart() : tryStop();
      },
      { threshold: 0 }
    );
    io.observe(container);

    const onVisibility = () => {
      isPageVisible = !document.hidden;
      isPageVisible ? tryStart() : tryStop();
    };
    document.addEventListener('visibilitychange', onVisibility);

    tryStart();

    return () => {
      tryStop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      try {
        container.removeChild(canvas);
      } catch {
        /* ignore */
      }
    };
  }, []);

  return <div ref={containerRef} className={`relative w-full h-full overflow-hidden ${className}`.trim()} />;
}
