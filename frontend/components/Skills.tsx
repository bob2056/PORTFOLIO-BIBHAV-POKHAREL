'use client';

import React, { useState } from 'react';
import {
  Code2,
  Server,
  Database,
  Terminal,
  Cpu,
  Wrench,
  Cloud,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { Skill, SkillCategory } from '@/types';
import { FALLBACK_SKILLS } from '@/lib/utils';

interface SkillsProps {
  skills?: Skill[];
}

const CATEGORIES: { label: string; value: SkillCategory | 'All'; icon: React.ReactNode }[] = [
  { label: 'All Skills', value: 'All', icon: <Sparkles className="w-4 h-4" /> },
  { label: 'Frontend', value: 'Frontend', icon: <Code2 className="w-4 h-4" /> },
  { label: 'Backend', value: 'Backend', icon: <Server className="w-4 h-4" /> },
  { label: 'Database', value: 'Database', icon: <Database className="w-4 h-4" /> },
  { label: 'Programming', value: 'Programming', icon: <Terminal className="w-4 h-4" /> },
  { label: 'AI & ML', value: 'AI / Machine Learning', icon: <Cpu className="w-4 h-4" /> },
  { label: 'Tools', value: 'Tools', icon: <Wrench className="w-4 h-4" /> },
  { label: 'DevOps', value: 'DevOps', icon: <Cloud className="w-4 h-4" /> },
];

export const Skills: React.FC<SkillsProps> = ({ skills = FALLBACK_SKILLS }) => {
  const [activeCategory, setActiveCategory] = useState<SkillCategory | 'All'>('All');

  const filteredSkills =
    activeCategory === 'All'
      ? skills
      : skills.filter((skill) => skill.category === activeCategory);

  return (
    <section id="skills" className="py-20 md:py-28 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-mono font-medium tracking-wider uppercase">
            <Cpu className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Skills & Core Technologies
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
            Practical skills acquired through MSc Advanced Computing coursework, BSc CSIT studies, full-stack MERN development, and applied AI / Machine Learning projects.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 border ${
                  isActive
                    ? 'bg-indigo-600 text-white border-indigo-600 dark:bg-cyan-500 dark:text-slate-950 dark:border-cyan-500 shadow-md shadow-indigo-500/20 dark:shadow-cyan-500/20 scale-105'
                    : 'bg-white/80 dark:bg-slate-900/80 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {filteredSkills.map((skill, index) => (
            <div
              key={skill._id || `${skill.name}-${index}`}
              className="group relative p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/60 backdrop-blur-sm transition-all duration-300 hover:border-indigo-400/50 dark:hover:border-cyan-500/40 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-cyan-400 font-mono text-sm font-bold group-hover:bg-indigo-50 dark:group-hover:bg-cyan-950/60 transition-colors">
                    {skill.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                      {skill.name}
                    </h3>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                      {skill.category}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono font-semibold text-indigo-600 dark:text-cyan-400">
                  {skill.level}%
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 transition-all duration-500"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Note on Integrity */}
        <div className="mt-12 text-center">
          <p className="text-xs text-slate-500 dark:text-slate-500 flex items-center justify-center gap-1.5 font-mono">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>Accurate representation of skills practiced in academic coursework and development projects.</span>
          </p>
        </div>
      </div>
    </section>
  );
};
