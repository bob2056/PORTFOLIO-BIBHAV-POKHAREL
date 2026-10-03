import React from 'react';
import type { Metadata } from 'next';
import { Skills } from '@/components/Skills';
import { FALLBACK_SKILLS } from '@/lib/utils';
import { Wrench, Terminal, Cpu, Database, Server, Code2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Skills & Technical Proficiencies | Bibhav Pokharel',
  description:
    'Detailed overview of programming languages, full-stack frameworks, databases, and development tools mastered by Bibhav Pokharel.',
};

export default function SkillsPage() {
  const toolsets = [
    {
      title: 'Workflow & Version Control',
      icon: <Terminal className="w-5 h-5 text-indigo-500" />,
      items: ['Git & GitHub', 'Bash / Shell Scripting', 'GitHub Actions / CI', 'Semantic Versioning'],
    },
    {
      title: 'API Development & Testing',
      icon: <Server className="w-5 h-5 text-cyan-500" />,
      items: ['Postman & Insomnia', 'RESTful API Standards', 'JSON Web Tokens (JWT)', 'Input Validation'],
    },
    {
      title: 'Databases & Data Modeling',
      icon: <Database className="w-5 h-5 text-emerald-500" />,
      items: ['MongoDB & Mongoose', 'PostgreSQL & SQL', 'Schema Design & Normalization', 'Query Optimization'],
    },
    {
      title: 'Data & Machine Learning',
      icon: <Cpu className="w-5 h-5 text-violet-500" />,
      items: ['Python Data Stack (Pandas, NumPy)', 'Scikit-learn', 'Exploratory Data Analysis', 'Model Evaluation'],
    },
  ];

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Skills skills={FALLBACK_SKILLS} />

        {/* Additional Workflow & Toolsets Section */}
        <div className="mt-16 pt-16 border-t border-slate-200 dark:border-slate-800">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Engineering Workflow & Tooling
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Standard tooling, development practices, and testing environments leveraged across projects.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {toolsets.map((tool, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/60 backdrop-blur-sm space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  {tool.icon}
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {tool.title}
                </h3>
                <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  {tool.items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
