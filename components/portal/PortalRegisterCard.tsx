'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, User, Lock, KeyRound, AlertCircle, CheckCircle2, Loader2, Check } from 'lucide-react';
import {
  authApi,
  cleanText,
  isBlank,
  isEmail,
  isPersonName,
  getPasswordStrengthErrors,
  PASSWORD_REQUIREMENTS,
  MIN_PASSWORD_LENGTH,
} from '@/lib/portal-auth';

interface PortalRegisterCardProps {
  onSuccessRedirect?: string;
}

export default function PortalRegisterCard({ onSuccessRedirect = '/portal' }: PortalRegisterCardProps) {
  const router = useRouter();

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // OTP states
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [devOtp, setDevOtp] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);

  // Status
  const [loading, setLoading] = useState(false);
  const [otpSending, setOtpSending] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState('');

  // Validate preliminary account fields before sending OTP
  const validateAccountFields = () => {
    const errors: Record<string, string> = {};
    if (isBlank(name)) errors.name = 'Enter your full name.';
    else if (!isPersonName(name)) errors.name = 'Use letters and common name punctuation only.';

    if (isBlank(email)) errors.email = 'Enter your work email address.';
    else if (!isEmail(email)) errors.email = 'Enter a valid email address.';

    if (!password) {
      errors.password = 'Choose a secure password.';
    } else {
      const passwordErrors = getPasswordStrengthErrors(password);
      if (passwordErrors.length > 0) errors.password = passwordErrors[0];
    }

    if (!confirmPassword) {
      errors.confirmPassword = 'Re-enter your password.';
    } else if (confirmPassword !== password) {
      errors.confirmPassword = 'Passwords do not match.';
    }

    return errors;
  };

  // Request Registration OTP
  const handleRequestOtp = async () => {
    setError('');
    setSuccessMessage('');
    const errors = validateAccountFields();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setOtpSending(true);
    try {
      const cleanEmail = cleanText(email).toLowerCase();
      const result = await authApi.requestRegistrationOtp(cleanEmail);
      setOtpSent(true);
      if (result.devOtp) setDevOtp(result.devOtp);
      setSuccessMessage('Verification code sent. Check your email to continue.');

      // Start 60s resend cooldown
      setResendCooldown(60);
      const timer = setInterval(() => {
        setResendCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Could not send verification code.');
    } finally {
      setOtpSending(false);
    }
  };

  // Submit complete registration
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    const errors = validateAccountFields();
    if (!otpSent) {
      errors.otp = 'Send the verification code first.';
    } else if (!/^\d{6}$/.test(cleanText(otp))) {
      errors.otp = 'Enter the 6-digit verification code.';
    }

    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setLoading(true);
    try {
      await authApi.register({
        name: cleanText(name),
        email: cleanText(email),
        password,
        role: 'ec',
        otp: cleanText(otp),
      });

      setSuccessMessage('Account created successfully! Preparing your portal...');
      setTimeout(() => {
        router.push(onSuccessRedirect);
      }, 700);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Registration failed. Please check your details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[440px] bg-white dark:bg-neutral-900/95 border border-neutral-200/90 dark:border-neutral-800 rounded-2xl p-7 sm:p-9 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)] relative z-10 transition-all">

      {/* Header Titles */}
      <div className="text-center mb-6">
        <h1 className="font-display font-bold text-xl sm:text-2xl text-neutral-900 dark:text-white tracking-tight mb-1.5">
          Create an account
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400 text-xs sm:text-sm">
          Get started with your work email to join our contributor network.
        </p>
      </div>

      {/* Alert Notices */}
      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-950/80 border border-red-200/80 dark:border-red-800 flex items-start gap-2.5 text-xs text-red-700 dark:text-red-300 animate-in fade-in duration-200">
          <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <div className="leading-snug">{error}</div>
        </div>
      )}

      {successMessage && (
        <div className="mb-4 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200/80 dark:border-emerald-800 flex items-start gap-2.5 text-xs text-emerald-800 dark:text-emerald-300 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
          <div className="leading-snug">{successMessage}</div>
        </div>
      )}

      {/* Registration Form */}
      <form onSubmit={handleRegisterSubmit} className="space-y-4" noValidate>
        {/* Full Name */}
        <div>
          <label htmlFor="reg-name" className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5 tracking-wide">
            Full Name
          </label>
          <div className="relative">
            <input
              id="reg-name"
              type="text"
              autoComplete="name"
              placeholder="e.g. Alex Morgan"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setFieldErrors((prev) => ({ ...prev, name: '' }));
              }}
              disabled={loading || otpSent}
              className={`w-full px-3.5 py-2.5 text-sm text-neutral-900 dark:text-white bg-white dark:bg-neutral-950 border ${
                fieldErrors.name
                  ? 'border-red-500 ring-1 ring-red-500'
                  : 'border-neutral-300 dark:border-neutral-800'
              } rounded-lg placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-400 focus:border-neutral-900 dark:focus:border-neutral-400 transition-colors disabled:bg-neutral-50 dark:disabled:bg-neutral-900 disabled:text-neutral-500`}
            />
            <User className="absolute right-3.5 top-3 w-4 h-4 text-neutral-400 dark:text-neutral-600 pointer-events-none" />
          </div>
          {fieldErrors.name && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{fieldErrors.name}</p>}
        </div>

        {/* Work Email */}
        <div>
          <label htmlFor="reg-email" className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5 tracking-wide">
            Work Email
          </label>
          <div className="relative">
            <input
              id="reg-email"
              type="email"
              autoComplete="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setFieldErrors((prev) => ({ ...prev, email: '' }));
                if (otpSent) {
                  setOtpSent(false);
                  setOtp('');
                  setDevOtp('');
                }
              }}
              disabled={loading || otpSent}
              className={`w-full px-3.5 py-2.5 text-sm text-neutral-900 dark:text-white bg-white dark:bg-neutral-950 border ${
                fieldErrors.email
                  ? 'border-red-500 ring-1 ring-red-500'
                  : 'border-neutral-300 dark:border-neutral-800'
              } rounded-lg placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-400 focus:border-neutral-900 dark:focus:border-neutral-400 transition-colors disabled:bg-neutral-50 dark:disabled:bg-neutral-900 disabled:text-neutral-500`}
            />
            <Mail className="absolute right-3.5 top-3 w-4 h-4 text-neutral-400 dark:text-neutral-600 pointer-events-none" />
          </div>
          {fieldErrors.email && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{fieldErrors.email}</p>}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="reg-password" className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5 tracking-wide">
            Password
          </label>
          <div className="relative">
            <input
              id="reg-password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="At least 8 characters"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setFieldErrors((prev) => ({ ...prev, password: '' }));
              }}
              disabled={loading || otpSent}
              className={`w-full px-3.5 py-2.5 text-sm text-neutral-900 dark:text-white bg-white dark:bg-neutral-950 border ${
                fieldErrors.password
                  ? 'border-red-500 ring-1 ring-red-500'
                  : 'border-neutral-300 dark:border-neutral-800'
              } rounded-lg placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-400 focus:border-neutral-900 dark:focus:border-neutral-400 transition-colors disabled:bg-neutral-50 dark:disabled:bg-neutral-900 disabled:text-neutral-500`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
              className="absolute right-3.5 top-3 text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {fieldErrors.password && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{fieldErrors.password}</p>}

          {/* Password Requirements Checklist */}
          {password && !otpSent && (
            <div className="mt-2.5 p-2.5 bg-neutral-50 dark:bg-neutral-950/80 rounded-lg border border-neutral-100 dark:border-neutral-800 text-[11px] space-y-1">
              <span className="font-semibold text-neutral-700 dark:text-neutral-300 block mb-1">Password Requirements:</span>
              {PASSWORD_REQUIREMENTS.map((rule) => {
                const ok =
                  (rule.startsWith('At least') && password.length >= MIN_PASSWORD_LENGTH) ||
                  (rule.startsWith('One uppercase') && /[A-Z]/.test(password)) ||
                  (rule.startsWith('One lowercase') && /[a-z]/.test(password)) ||
                  (rule.startsWith('One number') && /[0-9]/.test(password)) ||
                  (rule.startsWith('One special') && /[^A-Za-z0-9\s]/.test(password));

                return (
                  <div
                    key={rule}
                    className={`flex items-center gap-1.5 ${ok ? 'text-emerald-700 dark:text-emerald-400 font-medium' : 'text-neutral-400 dark:text-neutral-600'}`}
                  >
                    <Check className={`w-3 h-3 ${ok ? 'text-emerald-600 dark:text-emerald-400 stroke-[3]' : 'text-neutral-300 dark:text-neutral-700'}`} />
                    <span>{rule}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="reg-confirm-password"
            className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5 tracking-wide"
          >
            Confirm Password
          </label>
          <div className="relative">
            <input
              id="reg-confirm-password"
              type={showConfirmPassword ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="Re-enter password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setFieldErrors((prev) => ({ ...prev, confirmPassword: '' }));
              }}
              disabled={loading || otpSent}
              className={`w-full px-3.5 py-2.5 text-sm text-neutral-900 dark:text-white bg-white dark:bg-neutral-950 border ${
                fieldErrors.confirmPassword
                  ? 'border-red-500 ring-1 ring-red-500'
                  : 'border-neutral-300 dark:border-neutral-800'
              } rounded-lg placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-400 focus:border-neutral-900 dark:focus:border-neutral-400 transition-colors disabled:bg-neutral-50 dark:disabled:bg-neutral-900 disabled:text-neutral-500`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              tabIndex={-1}
              className="absolute right-3.5 top-3 text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
            >
              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {fieldErrors.confirmPassword && (
            <p className="mt-1 text-xs text-red-600 dark:text-red-400">{fieldErrors.confirmPassword}</p>
          )}
        </div>

        {/* OTP Verification Box */}
        {otpSent && (
          <div className="p-3.5 rounded-lg bg-neutral-50 dark:bg-neutral-950/80 border border-neutral-200 dark:border-neutral-800 animate-in fade-in-50 duration-200">
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="reg-otp" className="block text-xs font-medium text-neutral-800 dark:text-neutral-200 tracking-wide">
                Email Verification Code
              </label>
              {devOtp && (
                <span className="font-mono text-[10px] bg-neutral-200/80 dark:bg-neutral-800 px-2 py-0.5 rounded text-neutral-700 dark:text-neutral-300">
                  Dev Code: {devOtp}
                </span>
              )}
            </div>
            <div className="relative mb-2">
              <input
                id="reg-otp"
                type="text"
                inputMode="numeric"
                maxLength={6}
                placeholder="6-digit code"
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value.replace(/\D/g, '').slice(0, 6));
                  setFieldErrors((prev) => ({ ...prev, otp: '' }));
                }}
                className={`w-full px-3.5 py-2.5 font-mono text-center tracking-widest text-base text-neutral-900 dark:text-white bg-white dark:bg-neutral-950 border ${
                  fieldErrors.otp ? 'border-red-500 ring-1 ring-red-500' : 'border-neutral-300 dark:border-neutral-800'
                } rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-400`}
              />
              <KeyRound className="absolute right-3.5 top-3 w-4 h-4 text-neutral-400 pointer-events-none" />
            </div>
            {fieldErrors.otp && <p className="text-xs text-red-600 dark:text-red-400 mb-2">{fieldErrors.otp}</p>}

            <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
              <button
                type="button"
                onClick={() => {
                  setOtpSent(false);
                  setOtp('');
                }}
                className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white underline"
              >
                Change details
              </button>
              <button
                type="button"
                onClick={handleRequestOtp}
                disabled={resendCooldown > 0 || otpSending}
                className="text-neutral-900 dark:text-white font-medium hover:underline disabled:opacity-50 disabled:no-underline"
              >
                {resendCooldown > 0 ? `Resend code (${resendCooldown}s)` : 'Resend code'}
              </button>
            </div>
          </div>
        )}

        {/* Action Button */}
        {!otpSent ? (
          <button
            type="button"
            onClick={handleRequestOtp}
            disabled={otpSending}
            className="w-full py-2.5 px-4 bg-neutral-900 hover:bg-black dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-neutral-900 text-sm font-semibold rounded-lg shadow-xs transition-all duration-150 active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed mt-2"
          >
            {otpSending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Sending verification code...</span>
              </>
            ) : (
              <span>Continue with email</span>
            )}
          </button>
        ) : (
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 bg-neutral-900 hover:bg-black dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-neutral-900 text-sm font-semibold rounded-lg shadow-xs transition-all duration-150 active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed mt-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Creating account...</span>
              </>
            ) : (
              <span>Sign up</span>
            )}
          </button>
        )}

        {/* Switcher: Link to Login */}
        <div className="text-center pt-3 border-t border-neutral-100 dark:border-neutral-800 mt-5">
          <p className="text-xs text-neutral-600 dark:text-neutral-400">
            Already have an account?{' '}
            <Link
              href="/portal/login"
              className="text-neutral-950 dark:text-white font-semibold underline underline-offset-2 hover:text-black dark:hover:text-neutral-200 transition-colors"
            >
              Sign In
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
