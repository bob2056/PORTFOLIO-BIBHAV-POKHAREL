'use client';

import React from 'react';
import { GraduationCap, Calendar, MapPin, Award, BookOpen, CheckCircle } from 'lucide-react';

export const Education: React.FC = () => {
  const educationItems = [
    {
      degree: 'MSc Advanced Computing',
      institution: 'Keele University / The British College',
      period: 'Current / In Progress',
      location: 'Kathmandu, Nepal / Keele, UK',
      status: 'Master’s Degree Candidate',
      description:
        'Advanced postgraduate program emphasizing cutting-edge software engineering, distributed cloud systems, modern web architectures, machine learning algorithms, and intelligent computing.',
      highlights: [
        'Advanced Software Engineering & Distributed Systems',
        'Machine Learning & Artificial Intelligence Applications',
        'Cloud Computing Architectures & Data Engineering',
        'Research methodologies and advanced problem solving',
      ],
    },
    {
      degree: 'BSc Computer Science and Information Technology (CSIT)',
      institution: 'Tribhuvan University',
      period: '2019 – 2023',
      location: 'Kathmandu, Nepal',
      status: 'Graduated / Degree Conferred',
      description:
        'Comprehensive 4-year undergraduate degree establishing core foundations in data structures, algorithms, operating systems, database management, computer networks, and full-stack software development.',
      highlights: [
        'Data Structures & Algorithms (C / C++ / Python)',
        'Database Management Systems (RDBMS & SQL)',
        'Object-Oriented Programming (Java, C++, Python)',
        'Web Technology, Software Engineering & Project Capstone',
      ],
    },
  ];

  return (
    <section id="education" className="py-20 md:py-28 bg-slate-50/50 dark:bg-slate-900/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-400 text-xs font-mono font-medium tracking-wider uppercase">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Background</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Education & Qualifications
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            Rigorous computing education spanning undergraduate fundamentals to advanced computing studies.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {educationItems.map((item, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/70 backdrop-blur-sm transition-all duration-300 hover:border-indigo-400/50 dark:hover:border-cyan-500/40 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-cyan-400 border border-indigo-200 dark:border-indigo-800">
                    {item.period}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                  {item.degree}
                </h3>
                <div className="text-sm font-medium text-indigo-600 dark:text-cyan-400 mb-2">
                  {item.institution}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-4">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{item.location}</span>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-indigo-500 dark:text-cyan-400" />
                  <span>Key Subject Areas</span>
                </h4>
                <ul className="space-y-2">
                  {item.highlights.map((h, i) => (
                    <li
                      key={i}
                      className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
