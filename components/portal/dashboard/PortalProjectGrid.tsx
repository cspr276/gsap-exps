'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { PortalProject } from '@/lib/portal-data';
import PortalApplyModal from './PortalApplyModal';
import { usePortalTheme } from '../PortalThemeContext';

interface PortalProjectGridProps {
  projects: PortalProject[];
  appliedProjectIds: Set<string>;
  onApplicationSuccess: () => void;
}

const CATEGORIES = [
  { id: 'all', label: 'All Projects' },
  { id: 'coding_evaluation', label: 'Coding Evaluation' },
  { id: 'rlhf', label: 'RLHF & Safety' },
  { id: 'model_evaluation', label: 'Model Evaluation' },
  { id: 'prompt_engineering', label: 'Agent Benchmarks' },
  { id: 'data_annotation', label: 'Data Annotation' },
];

export default function PortalProjectGrid({
  projects,
  appliedProjectIds,
  onApplicationSuccess,
}: PortalProjectGridProps) {
  const { isDark } = usePortalTheme();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<PortalProject | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Filter projects based on category and search query
  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      activeCategory === 'all' || project.projectType === activeCategory;

    const matchesSearch =
      searchQuery.trim() === '' ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.requiredSkills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      project.domains.some((d) => d.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const handleOpenApply = (project: PortalProject) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  return (
    <section className="mb-10">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <h2
            className={`font-display font-bold text-xl sm:text-2xl tracking-tight ${
              isDark ? 'text-white' : 'text-neutral-900'
            }`}
          >
            Recommended Projects
          </h2>
          <p className={`text-xs sm:text-sm mt-1 max-w-xl ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
            Open evaluation projects matched to your verified skills and availability.
          </p>
        </div>

        {/* Search Input Field */}
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search skills, domains..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-9 pr-3.5 py-2 text-xs font-sans rounded-lg focus:outline-none transition-colors ${
              isDark
                ? 'bg-neutral-900 border border-neutral-800 text-white placeholder:text-neutral-500 focus:border-neutral-600'
                : 'bg-white border border-neutral-300 text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900'
            }`}
          />
          <Search
            className={`w-3.5 h-3.5 absolute left-3 top-2.5 pointer-events-none ${
              isDark ? 'text-neutral-500' : 'text-neutral-400'
            }`}
          />
        </div>
      </div>

      {/* Category Filter Pills (clean segmented style) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none mb-6">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                isActive
                  ? isDark
                    ? 'bg-white text-black font-semibold'
                    : 'bg-neutral-900 text-white font-semibold'
                  : isDark
                  ? 'bg-neutral-900/80 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800'
                  : 'bg-white text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 border border-neutral-200'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Project Cards Grid */}
      {filteredProjects.length === 0 ? (
        <div
          className={`p-12 rounded-xl border text-center transition-colors ${
            isDark
              ? 'bg-neutral-900/40 border-neutral-800 text-neutral-400'
              : 'bg-white border-neutral-200 text-neutral-600'
          }`}
        >
          <p className="text-sm">No projects match your current filter.</p>
          <button
            type="button"
            onClick={() => {
              setActiveCategory('all');
              setSearchQuery('');
            }}
            className={`mt-2 text-xs font-medium underline cursor-pointer ${
              isDark ? 'text-white hover:text-neutral-300' : 'text-neutral-900 hover:text-black'
            }`}
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProjects.map((project) => {
            const hasApplied = appliedProjectIds.has(project.id);

            return (
              <div
                key={project.id}
                className={`flex flex-col justify-between rounded-xl p-6 transition-all shadow-xs border ${
                  isDark
                    ? 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700'
                    : 'bg-white border-neutral-200/90 hover:border-neutral-300'
                }`}
              >
                {/* Top Strip: Type & Match Badge */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`text-[11px] font-mono uppercase tracking-wider font-medium ${
                        isDark ? 'text-neutral-400' : 'text-neutral-500'
                      }`}
                    >
                      {project.projectTypeLabel}
                    </span>

                    <span
                      className={`font-mono text-xs font-semibold ${
                        isDark ? 'text-emerald-400' : 'text-emerald-700'
                      }`}
                    >
                      {project.matchScore}% match
                    </span>
                  </div>

                  {/* Title & Summary */}
                  <h3
                    className={`font-display font-bold text-base tracking-tight leading-snug mb-2 ${
                      isDark ? 'text-white' : 'text-neutral-900'
                    }`}
                  >
                    {project.title}
                  </h3>

                  <p
                    className={`text-xs leading-relaxed line-clamp-3 mb-4 ${
                      isDark ? 'text-neutral-400' : 'text-neutral-600'
                    }`}
                  >
                    {project.summary}
                  </p>

                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.requiredSkills.slice(0, 4).map((skill) => (
                      <span
                        key={skill}
                        className={`px-2 py-0.5 rounded text-[11px] font-mono border ${
                          isDark
                            ? 'bg-neutral-950 border-neutral-800 text-neutral-300'
                            : 'bg-neutral-100 border-neutral-200/80 text-neutral-700'
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                    {project.requiredSkills.length > 4 && (
                      <span
                        className={`px-1.5 py-0.5 text-[11px] font-mono ${
                          isDark ? 'text-neutral-500' : 'text-neutral-500'
                        }`}
                      >
                        +{project.requiredSkills.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Meta & Action */}
                <div
                  className={`pt-4 border-t flex items-center justify-between gap-2 ${
                    isDark ? 'border-neutral-800' : 'border-neutral-100'
                  }`}
                >
                  <div>
                    <div
                      className={`font-mono text-sm font-bold ${
                        isDark ? 'text-white' : 'text-neutral-900'
                      }`}
                    >
                      {project.compensation}
                    </div>
                    <div className={`text-[11px] ${isDark ? 'text-neutral-500' : 'text-neutral-500'}`}>
                      {project.timeCommitment}
                    </div>
                  </div>

                  {/* Apply CTA Button */}
                  {hasApplied ? (
                    <span
                      className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-mono font-medium border ${
                        isDark
                          ? 'bg-neutral-800 text-neutral-400 border-neutral-700'
                          : 'bg-neutral-100 text-neutral-600 border-neutral-200'
                      }`}
                    >
                      Applied
                    </span>
                  ) : project.status === 'open' ? (
                    <button
                      type="button"
                      onClick={() => handleOpenApply(project)}
                      className={`inline-flex items-center px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider font-semibold transition-colors cursor-pointer ${
                        isDark
                          ? 'bg-white text-black hover:bg-neutral-200'
                          : 'bg-neutral-900 hover:bg-black text-white'
                      }`}
                    >
                      Apply
                    </button>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-1 text-xs text-neutral-500 font-mono">
                      Queueing
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Apply Modal Dialog */}
      <PortalApplyModal
        project={selectedProject}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={onApplicationSuccess}
      />
    </section>
  );
}
