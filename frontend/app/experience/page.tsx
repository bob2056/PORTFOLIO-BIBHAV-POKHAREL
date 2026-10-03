import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Briefcase, GraduationCap, ArrowRight, Mail } from 'lucide-react';
import { Experience } from '@/components/Experience';
import { Education } from '@/components/Education';

export const metadata: Metadata = {
  title: 'Experience & Education | Bibhav Pokharel',
  description:
    'Engineering experience in full-stack MERN web applications, applied AI/ML modeling, and academic computing qualifications (MSc Advanced Computing, BSc CSIT) of Bibhav Pokharel.',
};

export default function ExperiencePage() {
  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-medium tracking-wider uppercase">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Track Record</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Experience & Education
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Practical development background in MERN web systems and applied AI/ML pipelines, paired with formal computer science degrees.
          </p>
        </div>

        {/* Experience Timeline */}
        <Experience />

        {/* Education Timeline */}
        <div className="mt-12">
          <Education />
        </div>

        {/* CTA Banner */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-bold">
              Looking for a Full-Stack MERN & AI/ML Engineer?
            </h3>
            <p className="text-slate-300 text-sm max-w-xl">
              I am actively interviewing for Full-Stack Developer, AI/ML Engineer, or Software Engineering positions. Let's discuss how I can contribute to your engineering goals.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl font-semibold text-sm bg-gradient-to-r from-cyan-400 to-indigo-400 text-slate-950 hover:opacity-90 transition-opacity shadow-lg shadow-cyan-500/20 shrink-0"
          >
            <Mail className="w-4 h-4" />
            <span>Get In Touch</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
