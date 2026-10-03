"use client";

import React from "react";
import {
  Briefcase,
  Calendar,
  MapPin,
  CheckCircle,
  ChevronRight,
  Layers,
} from "lucide-react";

export const Experience: React.FC = () => {
  const experiences = [
    {
      role: "Odoo ERP Developer & Backend Intern",
      company: "YAKFUSION TECHNOLOGIES",
      period: "2024-2025",
      location: "Kathmandu, Nepal",
      type: "Internship",
      description:
        "Engaged in hands-on development with the Odoo ERP framework, customized Python business modules, created ORM models, and wrote automated workflow logic.",
      achievements: [
        "Developed custom Odoo modules and models in Python interacting with PostgreSQL database.",
        "Customized backend views (XML), form views, tree views, and automated action triggers.",
        "Worked with team members on debugging workflows, data mapping, and ERP business processes.",
      ],
      technologies: ["Python", "Odoo ERP", "PostgreSQL", "XML", "Git", "Linux"],
    },
    {
      role: "Full-Stack Developer & Software Project Contributor",
      company: "Independent & Academic Projects",
      period: "2023 - Present",
      location: "Kathmandu, Nepal / Remote",
      type: "Academic & Projects",
      description:
        "Architected and implemented end-to-end full-stack web applications utilizing React, Next.js, Node.js, Express, and MongoDB, alongside machine learning prototypes in Python.",
      achievements: [
        "Built full-stack applications with authentication, responsive modern interfaces, and REST APIs.",
        "Implemented data pipelines and machine learning classification / analysis scripts in Python.",
        "Maintained structured version control on GitHub and configured modular codebase architectures.",
      ],
      technologies: [
        "TypeScript",
        "Next.js",
        "React",
        "Node.js",
        "Express",
        "MongoDB",
        "Python",
      ],
    },
  ];

  return (
    <section id="experience" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-medium tracking-wider uppercase">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Career Journey</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Work Experience & Internships
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            Practical development experience and hands-on technical
            contributions.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-4 sm:ml-8 md:ml-32 space-y-12">
          {experiences.map((exp, index) => (
            <div key={index} className="relative pl-6 sm:pl-8 group">
              {/* Timeline Indicator Node */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-slate-900 border-2 border-indigo-500 dark:border-cyan-400 group-hover:scale-125 transition-transform duration-200 shadow-sm" />

              {/* Card */}
              <div
                className={`p-6 sm:p-8 rounded-2xl border backdrop-blur-sm transition-all duration-300 ${
                  exp.isPlaceholder
                    ? "border-dashed border-slate-300 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-900/30"
                    : "border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/60 shadow-sm hover:shadow-md hover:border-indigo-400/40 dark:hover:border-cyan-500/40"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                      {exp.role}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-slate-600 dark:text-slate-300 font-medium">
                      <span className="text-indigo-600 dark:text-cyan-400">
                        {exp.company}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-slate-500 text-xs">
                        <MapPin className="w-3.5 h-3.5" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-center">
                    <span className="px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {exp.period}
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      {exp.type}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  {exp.description}
                </p>

                {/* Bullet achievements */}
                <ul className="space-y-2 mb-5">
                  {exp.achievements.map((ach, i) => (
                    <li
                      key={i}
                      className="flex items-start text-xs sm:text-sm text-slate-600 dark:text-slate-400"
                    >
                      <ChevronRight className="w-4 h-4 text-indigo-500 dark:text-cyan-400 shrink-0 mt-0.5 mr-1.5" />
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech badges */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                  {exp.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 rounded-md text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
