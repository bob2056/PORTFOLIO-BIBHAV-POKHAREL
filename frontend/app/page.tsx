import React from 'react';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Skills } from '@/components/Skills';
import { Projects } from '@/components/Projects';
import { GitHubProjects } from '@/components/GitHubProjects';
import { Experience } from '@/components/Experience';
import { Education } from '@/components/Education';
import { Contact } from '@/components/Contact';
import {
  FALLBACK_PROFILE,
  FALLBACK_PROJECTS,
  FALLBACK_SKILLS,
  FALLBACK_REPOS,
} from '@/lib/utils';
import { Profile, Project, Skill, GitHubRepo } from '@/types';

// Server-side fetching helper with graceful fallback
async function getData() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  let profile: Profile = FALLBACK_PROFILE;
  let projects: Project[] = FALLBACK_PROJECTS;
  let skills: Skill[] = FALLBACK_SKILLS;
  let repos: GitHubRepo[] = FALLBACK_REPOS;

  try {
    const [pRes, prRes, sRes, gRes] = await Promise.allSettled([
      fetch(`${apiUrl}/profile`, { next: { revalidate: 60 }, signal: AbortSignal.timeout(1500) }).then((r) => r.json()),
      fetch(`${apiUrl}/projects?featured=true`, { next: { revalidate: 60 }, signal: AbortSignal.timeout(1500) }).then((r) => r.json()),
      fetch(`${apiUrl}/skills`, { next: { revalidate: 60 }, signal: AbortSignal.timeout(1500) }).then((r) => r.json()),
      fetch(`${apiUrl}/github/repos`, { next: { revalidate: 300 }, signal: AbortSignal.timeout(1500) }).then((r) => r.json()),
    ]);

    if (pRes.status === 'fulfilled' && pRes.value?.success && pRes.value.data) {
      profile = pRes.value.data;
    }
    if (prRes.status === 'fulfilled' && prRes.value?.success && Array.isArray(prRes.value.data)) {
      projects = prRes.value.data;
    }
    if (sRes.status === 'fulfilled' && sRes.value?.success && Array.isArray(sRes.value.data)) {
      skills = sRes.value.data;
    }
    if (gRes.status === 'fulfilled' && gRes.value?.success && Array.isArray(gRes.value.data)) {
      repos = gRes.value.data;
    }
  } catch {
    // If backend server is not running during build, fallbacks are safely used
  }

  return { profile, projects, skills, repos };
}

export default async function HomePage() {
  const { profile, projects, skills, repos } = await getData();

  return (
    <div className="flex flex-col space-y-4">
      {/* Hero Section */}
      <Hero profile={profile} />

      {/* About Summary */}
      <About profile={profile} />

      {/* Featured Projects */}
      <Projects projects={projects} showViewAllButton={true} />

      {/* Live GitHub Integration */}
      <GitHubProjects initialRepos={repos} />

      {/* Skills Matrix */}
      <Skills skills={skills} />

      {/* Experience Timeline */}
      <Experience />

      {/* Education Timeline */}
      <Education />

      {/* Contact Form CTA */}
      <Contact />
    </div>
  );
}
