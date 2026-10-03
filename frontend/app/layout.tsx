import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Bibhav Pokharel | Full-Stack Developer & Advanced Computing Student',
  description:
    'Personal portfolio of Bibhav Pokharel, MSc Advanced Computing student at Keele University / British College & BSc CSIT graduate. Aspiring software developer and full-stack engineer.',
  keywords: [
    'Bibhav Pokharel',
    'Advanced Computing',
    'Keele University',
    'British College',
    'Software Developer',
    'Full Stack Developer',
    'React',
    'Next.js',
    'Node.js',
    'Express',
    'MongoDB',
    'MERN Stack',
    'TypeScript',
    'AI / ML',
    'Machine Learning',
  ],
  authors: [{ name: 'Bibhav Pokharel' }],
  creator: 'Bibhav Pokharel',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://bibhavpokharel.com',
    title: 'Bibhav Pokharel | Full-Stack Developer & Advanced Computing Student',
    description:
      'Explore projects, skills, education, and GitHub repositories of Bibhav Pokharel.',
    siteName: 'Bibhav Pokharel Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bibhav Pokharel | Full-Stack Developer',
    description:
      'MSc Advanced Computing student & aspiring software developer.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-indigo-500 selection:text-white transition-colors duration-200`}
      >
        <div className="relative min-h-screen flex flex-col justify-between">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
