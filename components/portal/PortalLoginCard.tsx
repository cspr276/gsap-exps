'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Lock, Mail, ArrowRight, CheckCircle2, AlertCircle, KeyRound, Loader2 } from 'lucide-react';
import { authApi, cleanText, isBlank, isEmail, getPasswordStrengthErrors } from '@/lib/portal-auth';

interface PortalLoginCardProps {
  initialEmail?: string;
  onSuccessRedirect?: string;
}

export default function PortalLoginCard({ initialEmail = '', onSuccessRedirect = '/portal' }: PortalLoginCardProps) {
  const router = useRouter();

  // Form states
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [adminOtp, setAdminOtp] = useState('');
  const [adminOtpRequired, setAdminOtpRequired] = useState(false);
  const [adminDevOtp, setAdminDevOtp] = useState('');

  // UI status
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState('');

  // Password Recovery state
  const [recoverMode, setRecoverMode] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetOtp, setResetOtp] = useState('');
  const [resetOtpSent, setResetOtpSent] = useState(false);
  const [resetDevOtp, setResetDevOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  // Validate login form
  const validateLogin = () => {
    const errors: Record<string, string> = {};
    if (isBlank(email)) errors.email = 'Enter your email address.';
    else if (!isEmail(email)) errors.email = 'Enter a valid email address.';
    if (!password) errors.password = 'Enter your password.';
    if (adminOtpRequired && !/^\d{6}$/.test(cleanText(adminOtp))) {
      errors.adminOtp = 'Enter the 6-digit email OTP.';
    }
    return errors;
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const errors = validateLogin();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setLoading(true);
    try {
      const result = await authApi.login({
        email: cleanText(email),
        password,
        otp: adminOtpRequired ? cleanText(adminOtp) : undefined,
      });

      if (result.requiresOtp) {
        setAdminOtpRequired(true);
        if (result.devOtp) setAdminDevOtp(result.devOtp);
        setLoading(false);
        return;
      }

      const targetRoute = result.user?.role === 'admin' ? '/portal/admin' : onSuccessRedirect;
      setSuccessMessage(
        result.user?.role === 'admin'
          ? 'Admin security verified. Redirecting to operations console...'
          : 'Successfully signed in. Redirecting to portal...'
      );
      setTimeout(() => {
        router.push(targetRoute);
      }, 700);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  // Password recovery handlers
  const handleRequestResetOtp = async () => {
    setError('');
    if (isBlank(resetEmail)) {
      setError('Enter your account email address.');
      return;
    }
    if (!isEmail(resetEmail)) {
      setError('Enter a valid email address.');
      return;
    }

    setResetLoading(true);
    try {
      const result = await authApi.requestPasswordResetOtp(resetEmail);
      setResetOtpSent(true);
      if (result.devOtp) setResetDevOtp(result.devOtp);
      setSuccessMessage('Verification code sent to your email.');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Could not send verification code.');
    } finally {
      setResetLoading(false);
    }
  };

  const handleResetPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const passwordErrors = getPasswordStrengthErrors(newPassword);
    if (passwordErrors.length > 0) {
      setError(passwordErrors[0]);
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!/^\d{6}$/.test(cleanText(resetOtp))) {
      setError('Enter the 6-digit verification code.');
      return;
    }

    setResetLoading(true);
    try {
      await authApi.resetPasswordWithOtp({
        email: cleanText(resetEmail),
        otp: cleanText(resetOtp),
        newPassword,
      });

      setRecoverMode(false);
      setSuccessMessage('Password reset successfully! You can now sign in.');
      setPassword('');
      setResetOtpSent(false);
      setResetDevOtp('');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to reset password.');
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[440px] bg-white dark:bg-neutral-900/95 border border-neutral-200/90 dark:border-neutral-800 rounded-2xl p-7 sm:p-9 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)] relative z-10 transition-all">

      {/* Header Titles */}
      <div className="text-center mb-6">
        <h1 className="font-display font-bold text-xl sm:text-2xl text-neutral-900 dark:text-white tracking-tight mb-1.5">
          {recoverMode ? 'Reset your password' : 'Sign in to your account'}
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400 text-xs sm:text-sm">
          {recoverMode
            ? 'Enter your work email to receive a secure recovery code.'
            : 'Enter your credentials to access your contributor portal.'}
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

      {/* Main Login Form */}
      {!recoverMode ? (
        <form onSubmit={handleLoginSubmit} className="space-y-4" noValidate>
          {/* Email Input Field */}
          <div>
            <label
              htmlFor="login-email"
              className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5 tracking-wide"
            >
              Email Address
            </label>
            <div className="relative">
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setFieldErrors((prev) => ({ ...prev, email: '' }));
                }}
                disabled={loading}
                className={`w-full px-3.5 py-2.5 text-sm text-neutral-900 dark:text-white bg-white dark:bg-neutral-950 border ${
                  fieldErrors.email
                    ? 'border-red-500 ring-1 ring-red-500'
                    : 'border-neutral-300 dark:border-neutral-800'
                } rounded-lg placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-400 focus:border-neutral-900 dark:focus:border-neutral-400 transition-colors`}
              />
              <Mail className="absolute right-3.5 top-3 w-4 h-4 text-neutral-400 dark:text-neutral-600 pointer-events-none" />
            </div>
            {fieldErrors.email && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-400">{fieldErrors.email}</p>
            )}
          </div>

          {/* Password Input Field */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="login-password"
                className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 tracking-wide"
              >
                Password
              </label>
              <button
                type="button"
                onClick={() => {
                  setRecoverMode(true);
                  setResetEmail(email);
                  setError('');
                  setSuccessMessage('');
                }}
                className="text-xs text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white underline underline-offset-2 transition-colors font-medium"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setFieldErrors((prev) => ({ ...prev, password: '' }));
                }}
                disabled={loading}
                className={`w-full px-3.5 py-2.5 text-sm text-neutral-900 dark:text-white bg-white dark:bg-neutral-950 border ${
                  fieldErrors.password
                    ? 'border-red-500 ring-1 ring-red-500'
                    : 'border-neutral-300 dark:border-neutral-800'
                } rounded-lg placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-400 focus:border-neutral-900 dark:focus:border-neutral-400 transition-colors`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                className="absolute right-3.5 top-3 text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {fieldErrors.password && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-400">{fieldErrors.password}</p>
            )}
          </div>

          {/* Admin 2FA OTP Step */}
          {adminOtpRequired && (
            <div className="p-3.5 rounded-lg bg-neutral-50 dark:bg-neutral-950/80 border border-neutral-200 dark:border-neutral-800 animate-in fade-in-50 duration-200">
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="admin-otp"
                  className="block text-xs font-medium text-neutral-800 dark:text-neutral-200 tracking-wide"
                >
                  Admin 2FA Security Code
                </label>
                {adminDevOtp && (
                  <span className="font-mono text-[10px] bg-neutral-200/80 dark:bg-neutral-800 px-2 py-0.5 rounded text-neutral-700 dark:text-neutral-300">
                    Dev Code: {adminDevOtp}
                  </span>
                )}
              </div>
              <div className="relative">
                <input
                  id="admin-otp"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="6-digit OTP"
                  value={adminOtp}
                  onChange={(e) => {
                    setAdminOtp(e.target.value.replace(/\D/g, '').slice(0, 6));
                    setFieldErrors((prev) => ({ ...prev, adminOtp: '' }));
                  }}
                  className="w-full px-3.5 py-2.5 font-mono text-center tracking-widest text-base text-neutral-900 dark:text-white bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-400"
                />
                <KeyRound className="absolute right-3.5 top-3 w-4 h-4 text-neutral-400 pointer-events-none" />
              </div>
              {fieldErrors.adminOtp && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">{fieldErrors.adminOtp}</p>
              )}
            </div>
          )}

          {/* Primary Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 bg-neutral-900 hover:bg-black dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-neutral-900 text-sm font-semibold rounded-lg shadow-xs transition-all duration-150 active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed mt-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Signing in...</span>
              </>
            ) : (
              <span>Sign in</span>
            )}
          </button>

          {/* Switcher: Link to Register */}
          <div className="text-center pt-3 border-t border-neutral-100 dark:border-neutral-800 mt-5">
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              Don&apos;t have an account?{' '}
              <Link
                href="/portal/register"
                className="text-neutral-950 dark:text-white font-semibold underline underline-offset-2 hover:text-black dark:hover:text-neutral-200 transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </form>
      ) : (
        /* Password Recovery Flow */
        <form onSubmit={handleResetPasswordSubmit} className="space-y-4" noValidate>
          <div>
            <label
              htmlFor="reset-email"
              className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5 tracking-wide"
            >
              Account Email
            </label>
            <div className="flex gap-2">
              <input
                id="reset-email"
                type="email"
                placeholder="name@example.com"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                disabled={resetLoading || resetOtpSent}
                className="w-full px-3.5 py-2.5 text-sm text-neutral-900 dark:text-white bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-400"
              />
              <button
                type="button"
                onClick={handleRequestResetOtp}
                disabled={resetLoading || !resetEmail}
                className="whitespace-nowrap px-3.5 py-2 text-xs font-medium bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 rounded-lg border border-neutral-200 dark:border-neutral-700 transition-colors disabled:opacity-50"
              >
                {resetOtpSent ? 'Resend' : 'Send Code'}
              </button>
            </div>
            {resetDevOtp && (
              <p className="mt-1 font-mono text-[11px] text-neutral-600 dark:text-neutral-400">
                Dev OTP code: <span className="font-bold text-neutral-900 dark:text-white">{resetDevOtp}</span>
              </p>
            )}
          </div>

          {resetOtpSent && (
            <>
              <div>
                <label
                  htmlFor="reset-otp"
                  className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5 tracking-wide"
                >
                  6-Digit Verification Code
                </label>
                <input
                  id="reset-otp"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="123456"
                  value={resetOtp}
                  onChange={(e) => setResetOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="w-full px-3.5 py-2.5 font-mono text-center tracking-widest text-sm text-neutral-900 dark:text-white bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-400"
                />
              </div>

              <div>
                <label
                  htmlFor="reset-new-password"
                  className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5 tracking-wide"
                >
                  New Password (min 8 characters)
                </label>
                <div className="relative">
                  <input
                    id="reset-new-password"
                    type={showNewPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm text-neutral-900 dark:text-white bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    tabIndex={-1}
                    className="absolute right-3.5 top-3 text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300"
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="reset-confirm-password"
                  className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5 tracking-wide"
                >
                  Confirm New Password
                </label>
                <input
                  id="reset-confirm-password"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm text-neutral-900 dark:text-white bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-400"
                />
              </div>

              <button
                type="submit"
                disabled={resetLoading}
                className="w-full py-2.5 px-4 bg-neutral-900 hover:bg-black dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-neutral-900 text-sm font-semibold rounded-lg shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                {resetLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Reset Password</span>}
              </button>
            </>
          )}

          <div className="text-center pt-3 border-t border-neutral-100 dark:border-neutral-800">
            <button
              type="button"
              onClick={() => {
                setRecoverMode(false);
                setError('');
                setSuccessMessage('');
              }}
              className="text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white font-medium transition-colors"
            >
              ← Back to sign in
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
