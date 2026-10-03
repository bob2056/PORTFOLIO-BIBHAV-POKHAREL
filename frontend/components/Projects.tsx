'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Layers, ArrowRight, Sparkles } from 'lucide-react';
import { Project, ProjectCategory } from '@/types';
import { FALLBACK_PROJECTS } from '@/lib/utils';
import { ProjectCard } from './ProjectCard';

interface ProjectsProps {
  projects?: Project[];
  title?: string;
  subtitle?: string;
  showViewAll?: boolean;
  showViewAllButton?: boolean;
}

const CATEGORIES: (ProjectCategory | 'All')[] = [
  'All',
  'Full Stack',
  'Backend',
  'Frontend',
  'AI/ML',
  'Other',
];

export const Projects: React.FC<ProjectsProps> = ({
  projects = FALLBACK_PROJECTS,
  title = 'Featured Projects',
  subtitle = 'Production-ready full-stack applications, robust backend services, and machine learning implementations.',
  showViewAll = true,
  showViewAllButton,
}) => {
  const isViewAllVisible = showViewAllButton !== undefined ? showViewAllButton : showViewAll;
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | 'All'>('All');

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-20 md:py-28 bg-slate-50/50 dark:bg-slate-900/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-cyan-400 text-xs font-mono font-medium tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Portfolio Showcase</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {title}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
              {subtitle}
            </p>
          </div>

          {isViewAllVisible && (
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-cyan-400 hover:border-indigo-400 dark:hover:border-cyan-500/50 transition-all self-start md:self-auto shadow-sm"
            >
              <span>Explore All Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {CATEGORIES.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 border ${
                  isActive
                    ? 'bg-indigo-600 text-white border-indigo-600 dark:bg-cyan-500 dark:text-slate-950 dark:border-cyan-500 shadow-md shadow-indigo-500/20 dark:shadow-cyan-500/20'
                    : 'bg-white/80 dark:bg-slate-900/80 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
            <Layers className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <p className="text-base font-medium text-slate-700 dark:text-slate-300">
              No projects found in category "{selectedCategory}".
            </p>
            <p className="text-sm text-slate-500 mt-1">
              Select another category or view all projects.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project._id || project.slug} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
