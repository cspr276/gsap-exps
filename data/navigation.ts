export interface ServiceItem {
  title: string;
  shortTitle?: string;
  description: string;
  path: string;
  lane: 'Assurance' | 'Protection' | 'Expert data' | 'Build';
  signal: string;
}

export interface ServiceLane {
  id: string;
  name: string;
  tagline: string;
  services: ServiceItem[];
}

export interface NavItem {
  title: string;
  description: string;
  path: string;
  label?: string;
  tag?: string;
}

export const servicesList: ServiceItem[] = [
  {
    title: 'AI Agent Evaluation & Benchmarking',
    description: 'Decision-grade evaluation frameworks exposing reasoning, safety, and operational readiness.',
    path: '/services/ai-agent-evaluation-benchmarking',
    lane: 'Assurance',
    signal: 'Benchmark',
  },
  {
    title: 'AI Model Security Testing',
    description: 'Adversarial testing and vulnerability assessment to ensure robustness against attacks and misuse.',
    path: '/services/ai-model-security-testing',
    lane: 'Assurance',
    signal: 'Red team',
  },
  {
    title: 'AI Attack Detection Systems',
    description: 'Real-time detection and defense identifying adversarial inputs, prompt injection, and exploitation.',
    path: '/services/ai-attack-detection-systems',
    lane: 'Protection',
    signal: 'Runtime',
  },
  {
    title: 'Continuous Monitoring & Regression Testing',
    description: 'Ongoing quality signals and regression suites keeping generative systems dependable post-launch.',
    path: '/services/continuous-monitoring-regression-testing',
    lane: 'Protection',
    signal: 'Regression',
  },
  {
    title: 'Data Annotation',
    description: 'High-quality, domain-specific data labeling and annotation powering model training and evaluation.',
    path: '/services/data-annotation',
    lane: 'Expert data',
    signal: 'Labels',
  },
  {
    title: 'Supervised Fine-Tuning (SFT) & RLHF',
    description: 'Model improvement loops aligned with domain expectations and user experience goals.',
    path: '/services/sft-rlhf',
    lane: 'Expert data',
    signal: 'Preference',
  },
  {
    title: 'Enterprise AI Agents',
    description: 'Production-minded AI workflows and agent clusters designed for efficiency and enterprise value.',
    path: '/services/enterprise-ai-agents',
    lane: 'Build',
    signal: 'Workflow',
  },
  {
    title: 'Agent Readiness & Risk Assessment',
    description: 'Governance-focused reviews to identify adoption risks before they affect the business.',
    path: '/services/agent-readiness-risk-assessment',
    lane: 'Build',
    signal: 'Risk',
  },
];

export const serviceLanes: ServiceLane[] = [
  {
    id: 'assurance',
    name: 'Assurance',
    tagline: 'Benchmark & Red-Team',
    services: servicesList.filter((s) => s.lane === 'Assurance'),
  },
  {
    id: 'protection',
    name: 'Protection',
    tagline: 'Runtime Guardrails & Regression',
    services: servicesList.filter((s) => s.lane === 'Protection'),
  },
  {
    id: 'expert-data',
    name: 'Expert Data',
    tagline: 'Annotation & Preference Loops',
    services: servicesList.filter((s) => s.lane === 'Expert data'),
  },
  {
    id: 'build',
    name: 'Build & Governance',
    tagline: 'Enterprise Agents & Audits',
    services: servicesList.filter((s) => s.lane === 'Build'),
  },
];

export const servicesMenuSignals = [
  {
    label: 'Evidence',
    description: 'Reviewer notes, traces, severity, and regression deltas.',
  },
  {
    label: 'Controls',
    description: 'Guardrails, egress boundaries, and production monitoring.',
  },
  {
    label: 'Data',
    description: 'Expert-labelled datasets, preference data, and adjudication.',
  },
];

export const lifecycleSteps = [
  { step: '01', title: 'Evaluate', desc: 'Task-grounded rubrics' },
  { step: '02', title: 'Harden', desc: 'Zero-day red teaming' },
  { step: '03', title: 'Operate', desc: 'Live runtime detection' },
];

export const insightItems: NavItem[] = [
  {
    title: 'Case Studies',
    label: 'Work Evidence',
    description: 'Real delivery stories showing how Evalixa turns technical ambition into operational results.',
    path: '/insights/case-studies',
    tag: 'Proof',
  },
  {
    title: 'Articles',
    label: 'Decision Guides',
    description: 'In-depth reads on AI systems, evaluation methodology, and frontier architecture.',
    path: '/insights/articles',
    tag: 'Analysis',
  },
  {
    title: 'Field Blogs',
    label: 'Technical Practice',
    description: 'Engineering notes, developer logs, and real-world failure post-mortems.',
    path: '/insights/blogs',
    tag: 'Engineering',
  },
];

export const directNavLinks = [
  { label: 'Careers', path: '/careers', id: 'careers' },
  { label: 'About', path: '/about', id: 'about' },
];
