import React from 'react';
import Link from 'next/link';
import { Github, Linkedin, Mail, ArrowUp, Heart, Terminal } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/60 backdrop-blur-md transition-colors mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Bio */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 via-indigo-500 to-violet-500 flex items-center justify-center text-white shadow-sm">
                <Terminal className="w-4 h-4" />
              </div>
              <span className="font-bold text-lg text-slate-900 dark:text-white tracking-tight">
                Bibhav Pokharel
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-md">
              MSc Advanced Computing student at Keele University / British College & BSc CSIT graduate. 
              Aspiring Software & Full-Stack Developer passionate about scalable web architecture, clean engineering, and intelligent systems.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://github.com/bob2056"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/bibhav-pokharel-47669a31a/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-[#0077b5] dark:hover:text-[#38a3dd] hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:bibhav.pokharel@example.com"
                aria-label="Email Me"
                className="w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-rose-500 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-200 uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-cyan-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-cyan-400 transition-colors"
                >
                  About Me
                </Link>
              </li>
              <li>
                <Link
                  href="/skills"
                  className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-cyan-400 transition-colors"
                >
                  Technical Skills
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-cyan-400 transition-colors"
                >
                  Projects & Repositories
                </Link>
              </li>
              <li>
                <Link
                  href="/experience"
                  className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-cyan-400 transition-colors"
                >
                  Experience & Education
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Focus & Contact */}
          <div>
            <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-200 uppercase tracking-wider mb-4">
              Core Tech
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {[
                'Next.js',
                'React',
                'TypeScript',
                'Node.js',
                'Express',
                'MongoDB',
                'Python',
                'Flask',
                'Machine Learning',
                'Scikit-learn',
                'Tailwind CSS',
              ].map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2.5 py-1 rounded-md bg-slate-200/60 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 space-y-3 sm:space-y-0">
          <p>© {currentYear} Bibhav Pokharel. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <span>Built with Next.js, Express & TypeScript</span>
            </span>
            <Link
              href="/admin"
              className="text-slate-400 hover:text-indigo-600 dark:hover:text-cyan-400"
            >
              Admin Dashboard
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
