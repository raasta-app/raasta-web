import localFont from 'next/font/local';
import { Inter } from 'next/font/google';

export const display = localFont({
  src: '../app/fonts/google-sans-flex-latin.woff2',
  weight: '300 700',
  display: 'swap',
  variable: '--font-gsf',
  fallback: ['system-ui', 'sans-serif'],
});

export const body = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  fallback: ['system-ui', '-apple-system', 'sans-serif'],
});
