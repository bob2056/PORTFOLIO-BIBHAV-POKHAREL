'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Download,
  Github,
  Linkedin,
  Mail,
  Sparkles,
  MapPin,
  GraduationCap,
  Briefcase,
  Code2,
} from 'lucide-react';
import { Profile } from '@/types';

interface HeroProps {
  profile: Profile;
}

export const Hero: React.FC<HeroProps> = ({ profile }) => {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      {/* Background radial gradients for subtle premium glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-cyan-500/15 via-indigo-500/15 to-violet-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Status Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-medium shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Open to Full-Stack MERN & AI/ML Roles</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                Hi, I'm{' '}
                <span className="bg-gradient-to-r from-cyan-600 via-indigo-600 to-violet-600 dark:from-cyan-400 dark:via-indigo-400 dark:to-violet-400 bg-clip-text text-transparent">
                  {profile.fullName || 'Bibhav Pokharel'}
                </span>
              </h1>
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-700 dark:text-slate-300">
                Advanced Computing Student | Full-Stack MERN & AI/ML Developer
              </h2>
            </div>

            {/* Intro paragraph */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              MSc Advanced Computing student at Keele University / British College and BSc CSIT graduate. 
              Specializing in scalable full-stack MERN applications (React, Next.js, Node.js, Express, MongoDB, TypeScript) and applied AI / Machine Learning solutions in Python.
            </p>

            {/* Meta details (Education, Location) */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
              <div className="flex items-center space-x-1.5">
                <GraduationCap className="w-4 h-4 text-indigo-500" />
                <span>Keele University / British College</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <MapPin className="w-4 h-4 text-rose-500" />
                <span>{profile.location || 'Kathmandu, Nepal / Keele, UK'}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Briefcase className="w-4 h-4 text-emerald-500" />
                <span>Full-Stack MERN & AI/ML Projects</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-4">
              <Link
                href="/projects"
                className="inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-medium text-sm shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all duration-200"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {profile.cvUrl && profile.cvUrl !== '[ADD YOUR CV]' ? (
                <a
                  href={profile.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium text-sm transition-all shadow-sm"
                >
                  <Download className="w-4 h-4 text-indigo-500" />
                  <span>Download CV</span>
                </a>
              ) : (
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium text-sm transition-all shadow-sm"
                >
                  <Download className="w-4 h-4 text-indigo-500" />
                  <span>Request CV</span>
                </Link>
              )}

              <Link
                href="/contact"
                className="inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-xl border border-transparent hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100/60 dark:hover:bg-slate-800/60 font-medium text-sm transition-all"
              >
                <Mail className="w-4 h-4" />
                <span>Contact Me</span>
              </Link>
            </div>

            {/* Social links */}
            <div className="flex items-center justify-center lg:justify-start space-x-3 pt-3">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Connect:
              </span>
              <a
                href={profile.githubUrl || 'https://github.com/bob2056'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>github.com/bob2056</span>
              </a>
              <a
                href={
                  profile.linkedinUrl ||
                  'https://www.linkedin.com/in/bibhav-pokharel-47669a31a/'
                }
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-[#0077b5] dark:hover:text-[#38a3dd] hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Right Column: Profile Photo Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group">
              {/* Outer glowing ambient ring */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500 via-indigo-500 to-violet-500 rounded-3xl blur-lg opacity-40 group-hover:opacity-60 transition duration-500"></div>

              {/* Main Card */}
              <div className="relative w-72 sm:w-80 md:w-88 rounded-3xl bg-white dark:bg-slate-900 p-4 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
                {/* Photo container */}
                <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-center">
                  {profile.profileImage ? (
                    <img
                      src={
                        profile.profileImage.startsWith('/uploads')
                          ? `${process.env.NEXT_PUBLIC_API_URL?.replace(/\/api\/?$/, '') || 'http://localhost:5000'}${profile.profileImage}`
                          : profile.profileImage
                      }
                      alt={profile.fullName || 'Bibhav Pokharel'}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-6 text-center text-white">
                      <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-500 flex items-center justify-center text-3xl font-bold mb-4 shadow-lg shadow-cyan-500/25">
                        BP
                      </div>
                      <h3 className="font-bold text-lg text-white">Bibhav Pokharel</h3>
                      <p className="text-xs text-cyan-300 mt-1">MSc Advanced Computing</p>
                      <div className="mt-4 px-3 py-1 rounded-full bg-white/10 text-[11px] font-mono border border-white/15">
                        /profile.jpg
                      </div>
                    </div>
                  )}
                </div>

                {/* Floating summary badge */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                  <span className="font-medium text-slate-900 dark:text-slate-200">
                    Kathmandu / Keele
                  </span>
                  <span className="font-mono text-cyan-600 dark:text-cyan-400 font-semibold">
                    Full-Stack Ready
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
