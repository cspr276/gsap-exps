// Client auth service for the Evalixa Portal
// Mirrors the production API contract while running seamlessly in the browser
// via localStorage persistence (evalixa-portal-db-v1 & evalixa-portal-session-v1).

export const MIN_PASSWORD_LENGTH = 8;

export const PASSWORD_REQUIREMENTS = [
  `At least ${MIN_PASSWORD_LENGTH} characters`,
  'One uppercase letter',
  'One lowercase letter',
  'One number',
  'One special character',
];

export const PASSWORD_REQUIREMENTS_TEXT = PASSWORD_REQUIREMENTS.join(', ') + '.';

export function cleanText(value: unknown): string {
  if (typeof value !== 'string') return String(value ?? '');
  return value.normalize('NFC').trim();
}

export const isBlank = (value: unknown): boolean => !cleanText(value);

const PERSON_NAME_RE = /^[\p{L}\p{M}][\p{L}\p{M} .,'-]{1,159}$/u;

export function isPersonName(value: unknown, max = 160): boolean {
  const name = cleanText(value);
  return name.length >= 2 && name.length <= max && PERSON_NAME_RE.test(name);
}

export function isEmail(value: unknown): boolean {
  const email = cleanText(value);
  if (!email || email.length > 254 || /[\u0000-\u001F\u007F\s]/.test(email)) return false;
  if ((email.match(/@/g) || []).length !== 1) return false;
  const [local, domain] = email.split('@');
  if (!local || !domain || local.length > 64 || domain.length > 253) return false;
  if (local.startsWith('.') || local.endsWith('.') || local.includes('..')) return false;
  if (!/^[A-Za-z0-9!#$%&'*+/=?^_`{|}~.-]+$/.test(local)) return false;
  if (domain.includes('..')) return false;
  const labels = domain.split('.');
  if (labels.length < 2) return false;
  return labels.every(
    (label) =>
      label.length >= 1 &&
      label.length <= 63 &&
      /^[A-Za-z0-9-]+$/.test(label) &&
      !label.startsWith('-') &&
      !label.endsWith('-')
  ) && /^[A-Za-z]{2,63}$/.test(labels.at(-1) || '');
}

export function getPasswordStrengthErrors(password: unknown): string[] {
  const value = String(password ?? '');
  const errors: string[] = [];
  if (value.length < MIN_PASSWORD_LENGTH) errors.push(`Use at least ${MIN_PASSWORD_LENGTH} characters.`);
  if (!/[A-Z]/.test(value)) errors.push('Add at least one uppercase letter.');
  if (!/[a-z]/.test(value)) errors.push('Add at least one lowercase letter.');
  if (!/[0-9]/.test(value)) errors.push('Add at least one number.');
  if (!/[^A-Za-z0-9\s]/.test(value)) errors.push('Add at least one special character.');
  return errors;
}

export function isStrongPassword(password: unknown): boolean {
  return getPasswordStrengthErrors(password).length === 0;
}

export interface PortalUser {
  id: string;
  email: string;
  name: string;
  role: 'ec' | 'employer' | 'admin';
  status: 'active' | 'suspended';
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
}

export interface PortalProfile {
  id: string;
  userId: string;
  headline?: string;
  bio?: string;
  skills: string[];
  domains: string[];
  languages: string[];
  totalEarnings: number;
  onboardingStatus: string;
  verificationStatus: string;
}

interface StoredDb {
  users: (PortalUser & { password: string })[];
  ecProfiles: PortalProfile[];
  employerProfiles: unknown[];
  projects: unknown[];
  applications: unknown[];
  assignments: unknown[];
  submissions: unknown[];
  portalRequests: unknown[];
  otps: Record<string, { code: string; expiresAt: number; purpose: string }>;
}

const DB_KEY = 'evalixa-portal-db-v1';
const SESSION_KEY = 'evalixa-portal-session-v1';

function uid(prefix = 'id'): string {
  const rand = Math.random().toString(36).slice(2, 8);
  const time = Date.now().toString(36).slice(-4);
  return `${prefix}_${time}${rand}`;
}

function nowIso(): string {
  return new Date().toISOString();
}

function seedDb(): StoredDb {
  const t = nowIso();
  return {
    users: [
      {
        id: 'usr_admin_default',
        email: 'web-admin@evalixa.com',
        password: 'EvalixaAdmin2026!',
        name: 'Evalixa Security Admin',
        role: 'admin',
        status: 'active',
        emailVerified: true,
        createdAt: t,
        updatedAt: t,
      },
      {
        id: 'usr_ec_demo',
        email: 'contributor@evalixa.com',
        password: 'EvalixaDemo2026!',
        name: 'Sarah Connor',
        role: 'ec',
        status: 'active',
        emailVerified: true,
        createdAt: t,
        updatedAt: t,
      },
    ],
    ecProfiles: [
      {
        id: 'ec_demo_profile',
        userId: 'usr_ec_demo',
        headline: 'Autonomous Systems & RLHF Specialist',
        bio: 'Focusing on LLM red-teaming and agent evaluation benchmarks.',
        skills: ['RLHF', 'SWE-bench', 'Red-teaming', 'Python'],
        domains: ['Safety', 'Agent Evaluation'],
        languages: ['English'],
        totalEarnings: 3450,
        onboardingStatus: 'complete',
        verificationStatus: 'verified',
      },
    ],
    employerProfiles: [],
    projects: [],
    applications: [],
    assignments: [],
    submissions: [],
    portalRequests: [],
    otps: {},
  };
}

function isBrowser(): boolean {
  return typeof window !== 'undefined' && !!window.localStorage;
}

let inMemoryDb: StoredDb | null = null;

function loadDb(): StoredDb {
  if (!isBrowser()) {
    if (!inMemoryDb) inMemoryDb = seedDb();
    return inMemoryDb;
  }
  try {
    const raw = window.localStorage.getItem(DB_KEY);
    if (!raw) {
      const seeded = seedDb();
      window.localStorage.setItem(DB_KEY, JSON.stringify(seeded));
      return seeded;
    }
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.users)) {
      const seeded = seedDb();
      window.localStorage.setItem(DB_KEY, JSON.stringify(seeded));
      return seeded;
    }
    if (!parsed.otps) parsed.otps = {};
    return parsed;
  } catch {
    const seeded = seedDb();
    return seeded;
  }
}

function saveDb(db: StoredDb): void {
  if (!isBrowser()) {
    inMemoryDb = db;
    return;
  }
  try {
    window.localStorage.setItem(DB_KEY, JSON.stringify(db));
  } catch {
    // Storage quota or restricted environment
  }
}

export function getSessionUserId(): string | null {
  if (!isBrowser()) return null;
  try {
    return window.localStorage.getItem(SESSION_KEY);
  } catch {
    return null;
  }
}

export function setSessionUserId(id: string | null): void {
  if (!isBrowser()) return;
  try {
    if (id) {
      window.localStorage.setItem(SESSION_KEY, id);
    } else {
      window.localStorage.removeItem(SESSION_KEY);
    }
  } catch {
    // Ignore storage issues
  }
}

function sanitizeUser(u: StoredDb['users'][number]): PortalUser {
  return {
    id: u.id,
    email: u.email,
    name: u.name,
    role: u.role,
    status: u.status,
    emailVerified: u.emailVerified,
    createdAt: u.createdAt,
    updatedAt: u.updatedAt,
    lastLoginAt: u.lastLoginAt,
  };
}

// Single auth API interface used by Login, Signup, and Portal routes
export const authApi = {
  async me(): Promise<{ user: PortalUser | null; profile: PortalProfile | null }> {
    const userId = getSessionUserId();
    if (!userId) return { user: null, profile: null };
    const db = loadDb();
    const user = db.users.find((u) => u.id === userId && u.status !== 'suspended');
    if (!user) {
      setSessionUserId(null);
      return { user: null, profile: null };
    }
    const profile = db.ecProfiles.find((p) => p.userId === userId) || null;
    return { user: sanitizeUser(user), profile };
  },

  async requestRegistrationOtp(email: string): Promise<{ ok: boolean; devOtp: string }> {
    const cleanEmail = cleanText(email).toLowerCase();
    const db = loadDb();
    const exists = db.users.some((u) => u.email.toLowerCase() === cleanEmail);
    if (exists) {
      throw new Error('An account with this email already exists.');
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes
    db.otps[`reg_${cleanEmail}`] = { code, expiresAt, purpose: 'portal_registration' };
    saveDb(db);

    return { ok: true, devOtp: code };
  },

  async verifyRegistrationOtp(email: string, otp: string): Promise<{ ok: boolean }> {
    const cleanEmail = cleanText(email).toLowerCase();
    const trimmedOtp = cleanText(otp);
    if (!/^\d{6}$/.test(trimmedOtp)) {
      throw new Error('OTP must be 6 digits.');
    }
    const db = loadDb();
    const entry = db.otps[`reg_${cleanEmail}`];
    if (!entry || entry.code !== trimmedOtp || Date.now() > entry.expiresAt) {
      throw new Error('Invalid or expired registration code. Please request a new one.');
    }
    return { ok: true };
  },

  async register(params: {
    name: string;
    email: string;
    password: string;
    role?: 'ec';
    otp: string;
  }): Promise<{ user: PortalUser; profile: PortalProfile }> {
    const cleanEmail = cleanText(params.email).toLowerCase();
    const cleanName = cleanText(params.name);
    const password = params.password;
    const role = params.role || 'ec';
    const otp = cleanText(params.otp);

    if (!cleanName) throw new Error('Full name is required.');
    if (!isPersonName(cleanName)) throw new Error('Use letters and standard name characters only.');
    if (!isEmail(cleanEmail)) throw new Error('Enter a valid work email address.');
    if (!isStrongPassword(password)) throw new Error(`Password must meet complexity rules: ${PASSWORD_REQUIREMENTS_TEXT}`);
    if (!/^\d{6}$/.test(otp)) throw new Error('OTP must be 6 digits.');

    const db = loadDb();
    const exists = db.users.some((u) => u.email.toLowerCase() === cleanEmail);
    if (exists) throw new Error('An account with this email already exists.');

    const otpKey = `reg_${cleanEmail}`;
    const otpEntry = db.otps[otpKey];
    if (!otpEntry || otpEntry.code !== otp || Date.now() > otpEntry.expiresAt) {
      throw new Error('Invalid or expired registration OTP.');
    }
    delete db.otps[otpKey];

    const t = nowIso();
    const newUser = {
      id: uid('usr'),
      email: cleanEmail,
      password,
      name: cleanName,
      role: role as 'ec',
      status: 'active' as const,
      emailVerified: true,
      createdAt: t,
      updatedAt: t,
      lastLoginAt: t,
    };
    db.users.push(newUser);

    const newProfile: PortalProfile = {
      id: uid('ec'),
      userId: newUser.id,
      headline: '',
      bio: '',
      skills: [],
      domains: [],
      languages: ['English'],
      totalEarnings: 0,
      onboardingStatus: 'not_started',
      verificationStatus: 'unverified',
    };
    db.ecProfiles.push(newProfile);

    saveDb(db);
    setSessionUserId(newUser.id);

    return { user: sanitizeUser(newUser), profile: newProfile };
  },

  async login(credentials: {
    email: string;
    password: string;
    otp?: string;
  }): Promise<{ user?: PortalUser; requiresOtp?: boolean; devOtp?: string }> {
    const cleanEmail = cleanText(credentials.email).toLowerCase();
    const password = credentials.password;
    const db = loadDb();

    const user = db.users.find((u) => u.email.toLowerCase() === cleanEmail);
    if (!user || user.password !== password) {
      throw new Error('Invalid email or password.');
    }
    if (user.status === 'suspended') {
      throw new Error('This account has been suspended. Please contact platform administration.');
    }

    // Admin accounts require 2FA OTP verification
    if (user.role === 'admin') {
      const otpKey = `admin_${cleanEmail}`;
      if (!credentials.otp) {
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        db.otps[otpKey] = {
          code,
          expiresAt: Date.now() + 5 * 60 * 1000,
          purpose: 'admin_login_otp',
        };
        saveDb(db);
        return { requiresOtp: true, devOtp: code };
      }

      const entry = db.otps[otpKey];
      if (!entry || entry.code !== cleanText(credentials.otp) || Date.now() > entry.expiresAt) {
        throw new Error('Invalid or expired admin verification code.');
      }
      delete db.otps[otpKey];
      saveDb(db);
    }

    user.lastLoginAt = nowIso();
    saveDb(db);
    setSessionUserId(user.id);

    return { user: sanitizeUser(user) };
  },

  async requestPasswordResetOtp(email: string): Promise<{ ok: boolean; devOtp?: string }> {
    const cleanEmail = cleanText(email).toLowerCase();
    const db = loadDb();
    const user = db.users.find((u) => u.email.toLowerCase() === cleanEmail && u.status !== 'suspended');
    if (!user) {
      // Don't disclose if account exists
      return { ok: true };
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    db.otps[`reset_${cleanEmail}`] = {
      code,
      expiresAt: Date.now() + 10 * 60 * 1000,
      purpose: 'portal_password_reset',
    };
    saveDb(db);

    return { ok: true, devOtp: code };
  },

  async resetPasswordWithOtp(params: {
    email: string;
    otp: string;
    newPassword: string;
  }): Promise<{ ok: boolean }> {
    const cleanEmail = cleanText(params.email).toLowerCase();
    const otp = cleanText(params.otp);
    const newPassword = params.newPassword;

    if (!isStrongPassword(newPassword)) {
      throw new Error(`Password must meet complexity rules: ${PASSWORD_REQUIREMENTS_TEXT}`);
    }
    if (!/^\d{6}$/.test(otp)) {
      throw new Error('OTP must be 6 digits.');
    }

    const db = loadDb();
    const otpKey = `reset_${cleanEmail}`;
    const entry = db.otps[otpKey];
    if (!entry || entry.code !== otp || Date.now() > entry.expiresAt) {
      throw new Error('Invalid or expired reset code.');
    }

    const user = db.users.find((u) => u.email.toLowerCase() === cleanEmail);
    if (!user) {
      throw new Error('Account not found.');
    }

    user.password = newPassword;
    user.updatedAt = nowIso();
    delete db.otps[otpKey];
    saveDb(db);

    return { ok: true };
  },

  async logout(): Promise<void> {
    setSessionUserId(null);
  },
};
