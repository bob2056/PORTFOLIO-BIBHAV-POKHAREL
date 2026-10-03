"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Layers,
  Sparkles,
  Filter,
  Github,
  ArrowRight,
} from "lucide-react";
import { Project, ProjectCategory } from "@/types";
import { FALLBACK_PROJECTS } from "@/lib/utils";
import { ProjectCard } from "@/components/ProjectCard";
import api from "@/lib/axios";

const CATEGORIES: (ProjectCategory | "All")[] = [
  "All",
  "Full Stack",
  "Backend",
  "Frontend",
  "AI/ML",
  "Other",
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(FALLBACK_PROJECTS);
  const [selectedCategory, setSelectedCategory] = useState<
    ProjectCategory | "All"
  >("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const res = await api.get("/projects");
        if (
          res.data?.success &&
          Array.isArray(res.data.data) &&
          res.data.data.length > 0
        ) {
          if (isMounted) setProjects(res.data.data);
        }
      } catch (err) {
        console.warn("Backend unavailable, using fallback projects:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProjects();
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredProjects = projects.filter((p) => {
    if (
      [
        "odoo business workflow customization",
        "cloud infrastructure & deployment demo",
      ].includes(p.title.trim().toLowerCase())
    ) {
      return false;
    }

    const matchesCategory =
      selectedCategory === "All" || p.category === selectedCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.technologies.some((t) =>
        t.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-cyan-400 text-xs font-mono font-medium tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Showcase & Code</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Projects Portfolio
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            A comprehensive collection of full-stack web applications, backend
            services, and machine learning models built by Bibhav Pokharel.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10 pb-8 border-b border-slate-200 dark:border-slate-800">
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 border ${
                    isActive
                      ? "bg-indigo-600 text-white border-indigo-600 dark:bg-cyan-500 dark:text-slate-950 dark:border-cyan-500 shadow-md shadow-indigo-500/20 dark:shadow-cyan-500/20"
                      : "bg-white/80 dark:bg-slate-900/80 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by title, tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:focus:ring-cyan-500/50 text-xs sm:text-sm transition-all"
            />
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20 px-4 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
            <Layers className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
              No matching projects found
            </h3>
            <p className="text-sm text-slate-500 mb-6">
              Try adjusting your search criteria or resetting filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 dark:bg-cyan-500 text-white dark:text-slate-950"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project._id || project.slug}
                project={project}
              />
            ))}
          </div>
        )}

        {/* Link to GitHub Repos */}
        <div className="mt-16 p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-gradient-to-r from-slate-900 to-indigo-950 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl font-bold flex items-center justify-center md:justify-start gap-2">
              <Github className="w-5 h-5 text-cyan-400" />
              <span>Looking for raw code & open source repositories?</span>
            </h3>
            <p className="text-sm text-slate-300 max-w-xl">
              Explore public GitHub repositories, commit activity, and
              experimental scripts on my GitHub profile (@bob2056).
            </p>
          </div>

          <a
            href="https://github.com/bob2056"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition-colors shrink-0 shadow-md"
          >
            <span>Visit GitHub Profile</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
