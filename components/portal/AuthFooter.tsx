import Link from 'next/link';

export default function AuthFooter() {
  return (
    <footer className="w-full py-6 px-4 text-center mt-auto transition-colors">
      <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-lg mx-auto leading-relaxed">
        By continuing, you agree to our{' '}
        <Link
          href="/terms-of-service"
          className="text-neutral-900 dark:text-neutral-200 underline underline-offset-2 hover:text-black dark:hover:text-white transition-colors"
        >
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link
          href="/privacy-policy"
          className="text-neutral-900 dark:text-neutral-200 underline underline-offset-2 hover:text-black dark:hover:text-white transition-colors"
        >
          Privacy Policy
        </Link>
        . We send security notices and platform updates.
      </p>
    </footer>
  );
}
