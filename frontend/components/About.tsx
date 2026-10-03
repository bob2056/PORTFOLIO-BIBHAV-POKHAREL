'use client';

import React from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  Briefcase,
  Code2,
  Terminal,
  Target,
  BookOpen,
  Award,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { Profile } from '@/types';

interface AboutProps {
  profile: Profile;
}

export const About: React.FC<AboutProps> = ({ profile }) => {
  const highlights = [
    {
      icon: <GraduationCap className="w-5 h-5 text-indigo-500" />,
      title: 'Academic Foundation',
      subtitle: 'MSc Advanced Computing & BSc CSIT',
      description: 'Solid grounding in computer science principles, data structures, algorithms, and advanced computing paradigms.',
    },
    {
      icon: <Briefcase className="w-5 h-5 text-emerald-500" />,
      title: 'Applied AI & Machine Learning',
      subtitle: 'Neural Models, NLP & Predictive Analytics',
      description: 'Hands-on development of data preprocessing, feature engineering, statistical evaluation, and Scikit-learn / deep learning pipelines in Python.',
    },
    {
      icon: <Code2 className="w-5 h-5 text-cyan-500" />,
      title: 'Full-Stack MERN Engineering',
      subtitle: 'React, Next.js, Node.js & MongoDB',
      description: 'Proven capability to create reactive frontends, RESTful APIs, JWT authentication, and secure database interactions.',
    },
    {
      icon: <Target className="w-5 h-5 text-violet-500" />,
      title: 'Career Focus',
      subtitle: 'Full-Stack MERN & AI/ML Engineer',
      description: 'Prepared to contribute immediately to engineering teams, shipping clean TypeScript code, robust APIs, and intelligent systems.',
    },
  ];

  return (
    <section id="about" className="py-20 bg-slate-50/50 dark:bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-cyan-400 text-xs font-mono font-medium tracking-wider uppercase">
            <span>About Me</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Background, Education & Career Focus
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
            A developer profile grounded in rigorous computer science education and practical hands-on building.
          </p>
        </div>

        {/* Narrative & Highlights Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Story (Col 1-7) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm space-y-5">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                <Terminal className="w-5 h-5 text-indigo-500" />
                <span>Professional Summary</span>
              </h3>

              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                {profile.aboutDescription}
              </p>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                  What I Bring to a Team:
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                    <span>Strong TypeScript & JavaScript foundation</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    <span>Next.js App Router & React best practices</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>Node.js / Express RESTful API architecture</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                    <span>Python, Flask & Machine Learning modeling</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    <span>MongoDB & relational SQL database design</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    <span>Machine learning & data analytics curiosity</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <Link
                  href="/experience"
                  className="inline-flex items-center space-x-1.5 text-sm font-semibold text-indigo-600 dark:text-cyan-400 hover:underline"
                >
                  <span>View detailed experience & education</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Feature Cards (Col 8-12) */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {highlights.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-all"
              >
                <div className="flex items-start space-x-3.5">
                  <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 shrink-0">
                    {item.icon}
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                      {item.title}
                    </h4>
                    <p className="text-xs font-medium text-indigo-600 dark:text-cyan-400">
                      {item.subtitle}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pt-1">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
