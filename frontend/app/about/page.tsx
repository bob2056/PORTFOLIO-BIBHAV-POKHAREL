import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  GraduationCap,
  Briefcase,
  Code2,
  Terminal,
  Target,
  Sparkles,
  ArrowRight,
  Download,
  Github,
  Linkedin,
  Mail,
  CheckCircle,
} from 'lucide-react';
import { Education } from '@/components/Education';
import { FALLBACK_PROFILE } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'About Me | Bibhav Pokharel',
  description:
    'Learn more about Bibhav Pokharel — MSc Advanced Computing student at Keele University / British College, BSc CSIT graduate, and aspiring software developer.',
};

export default function AboutPage() {
  const profile = FALLBACK_PROFILE;

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16 space-y-3">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-cyan-400 text-xs font-mono font-medium tracking-wider uppercase">
            <Terminal className="w-3.5 h-3.5" />
            <span>Profile & Background</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            About Me
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
            Advanced Computing postgraduate student with a strong computer science foundation, specializing in full-stack MERN web engineering and applied AI / Machine Learning solutions.
          </p>
        </div>

        {/* Bio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          {/* Avatar and Quick Facts */}
          <div className="lg:col-span-4 space-y-6">
            <div className="relative aspect-square rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800/80 bg-slate-100 dark:bg-slate-800/60 shadow-lg">
              <Image
                src={profile.profileImage}
                alt={profile.fullName}
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/60 backdrop-blur-sm space-y-4">
              <h3 className="text-sm font-mono font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Quick Facts
              </h3>

              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-xs text-slate-400 font-mono block">Status</span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    MSc Advanced Computing Student
                  </span>
                </div>

                <div>
                  <span className="text-xs text-slate-400 font-mono block">Target Roles</span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    Full-Stack MERN Developer, AI/ML Engineer, Software Developer
                  </span>
                </div>

                <div>
                  <span className="text-xs text-slate-400 font-mono block">Location</span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    Kathmandu, Nepal / Keele, UK
                  </span>
                </div>

                <div>
                  <span className="text-xs text-slate-400 font-mono block">Core Tech</span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    React, Next.js, Node.js, Express, MongoDB, Python
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl border border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <Link
                  href="/contact"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-indigo-600 dark:bg-cyan-500 text-white dark:text-slate-950 hover:bg-indigo-700 dark:hover:bg-cyan-400 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Contact Me</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Detailed Narrative */}
          <div className="lg:col-span-8 space-y-8">
            <div className="p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/60 backdrop-blur-sm space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                My Story & Professional Philosophy
              </h2>

              <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                I am an MSc Advanced Computing student at Keele University / British College, having graduated with a Bachelor of Science in Computer Science and Information Technology (BSc CSIT) from Tribhuvan University (2019–2023).
              </p>

              <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                During my academic studies and software development projects, I developed a passion for full-stack engineering, distributed systems, and applied AI. I focus on architecting responsive React and Next.js interfaces, designing resilient Node/Express APIs with MongoDB, and training predictive Machine Learning models with Python.
              </p>

              <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Simultaneously, I have built multiple full-stack web applications using React, Next.js, Node.js, Express, and MongoDB. I enjoy designing clean RESTful APIs, securing applications with JWT and validation layers, and crafting responsive, accessible user experiences.
              </p>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                  What I Bring to a Team:
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-600 dark:text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Strong fundamental grounding in CS & Algorithms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Hands-on MERN & Next.js full-stack development</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Python AI / ML & predictive modeling experience</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Continuous learner with an eagerness to absorb feedback</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Career Goals & Focus */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/60 backdrop-blur-sm space-y-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-slate-800 flex items-center justify-center text-indigo-600 dark:text-cyan-400">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Career Goals
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  To secure a role as a Full-Stack MERN Developer, AI/ML Engineer, or Software Engineer where I can deliver high-quality code, architect scalable features, and contribute to production-grade systems.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/60 backdrop-blur-sm space-y-3">
                <div className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-slate-800 flex items-center justify-center text-violet-600 dark:text-violet-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Current Learning
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Deepening knowledge in advanced distributed computing, microservices patterns, machine learning data processing, and cloud deployment pipelines.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Education Section */}
        <Education />
      </div>
    </div>
  );
}
