'use client';

import React, { useState, useEffect } from 'react';
import {
  Github,
  Star,
  GitFork,
  ExternalLink,
  Code2,
  Calendar,
  RefreshCw,
  AlertCircle,
} from 'lucide-react';
import api from '@/lib/axios';
import { GitHubRepo } from '@/types';
import { FALLBACK_GITHUB_REPOS, formatDate } from '@/lib/utils';

interface GitHubProjectsProps {
  initialRepos?: GitHubRepo[];
}

export const GitHubProjects: React.FC<GitHubProjectsProps> = ({
  initialRepos = FALLBACK_GITHUB_REPOS,
}) => {
  const [repos, setRepos] = useState<GitHubRepo[]>(initialRepos);
  const [loading, setLoading] = useState<boolean>(!initialRepos || initialRepos.length === 0);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchRepos = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await api.get('/github/repos');
        if (res.data?.success && Array.isArray(res.data.data)) {
          if (isMounted) {
            setRepos(res.data.data);
          }
        }
      } catch (err) {
        console.warn('Backend GitHub API unavailable, utilizing fallback repos:', err);
        if (isMounted) {
          setError('Backend offline or rate-limited; showing cached repositories.');
          setRepos(FALLBACK_GITHUB_REPOS);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchRepos();
    return () => {
      isMounted = false;
    };
  }, []);

  // Extract unique languages
  const languages = [
    'All',
    ...Array.from(
      new Set(
        repos
          .map((r) => r.language)
          .filter((lang): lang is string => Boolean(lang))
      )
    ),
  ];

  const filteredRepos =
    selectedLanguage === 'All'
      ? repos
      : repos.filter((r) => r.language === selectedLanguage);

  return (
    <section id="github" className="py-20 md:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-900/10 dark:bg-slate-800 text-slate-800 dark:text-cyan-400 text-xs font-mono font-medium tracking-wider uppercase border border-slate-200 dark:border-slate-700">
              <Github className="w-3.5 h-3.5" />
              <span>Open Source & Public Repositories</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              GitHub Activity
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
              Live public repositories fetched directly from GitHub (
              <span className="font-mono text-indigo-600 dark:text-cyan-400 font-semibold">
                @bob2056
              </span>
              ).
            </p>
          </div>

          <a
            href="https://github.com/bob2056"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-cyan-400 hover:border-indigo-400 dark:hover:border-cyan-500/50 transition-all self-start md:self-auto shadow-sm"
          >
            <Github className="w-4 h-4" />
            <span>Follow on GitHub</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Notice if fallback is used */}
        {error && (
          <div className="mb-8 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 text-xs flex items-center gap-2 font-mono">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Language Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {languages.map((lang) => {
            const isActive = selectedLanguage === lang;
            return (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 border ${
                  isActive
                    ? 'bg-slate-900 text-white border-slate-900 dark:bg-cyan-500 dark:text-slate-950 dark:border-cyan-500 shadow-sm'
                    : 'bg-white/80 dark:bg-slate-900/80 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                {lang}
              </button>
            );
          })}
        </div>

        {/* Loading Skeletons */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-48 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-900/50 animate-pulse p-6"
              />
            ))}
          </div>
        )}

        {/* Repositories Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRepos.map((repo) => (
              <a
                key={repo.id}
                href={repo.htmlUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col justify-between p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/60 backdrop-blur-sm transition-all duration-300 hover:border-indigo-400/50 dark:hover:border-cyan-500/40 hover:shadow-lg hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white font-mono group-hover:text-indigo-600 dark:group-hover:text-cyan-400 transition-colors break-all">
                      {repo.name}
                    </h3>
                    <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors shrink-0 mt-0.5" />
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed mb-4">
                    {repo.description || 'Public GitHub project repository.'}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono">
                  <div className="flex items-center gap-3">
                    {repo.language && (
                      <span className="inline-flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
                        <span>{repo.language}</span>
                      </span>
                    )}

                    <span className="inline-flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-amber-500" />
                      <span>{repo.stars}</span>
                    </span>

                    <span className="inline-flex items-center gap-1">
                      <GitFork className="w-3.5 h-3.5" />
                      <span>{repo.forks}</span>
                    </span>
                  </div>

                  {repo.updatedAt && (
                    <span className="text-[11px] text-slate-400">
                      {formatDate(repo.updatedAt)}
                    </span>
                  )}
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
