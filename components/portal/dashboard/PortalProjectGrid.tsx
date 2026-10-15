'use client';

import { useState } from 'react';
import {
  Search,
  Filter,
  CheckCircle,
  Clock,
  Sparkles,
  ArrowUpRight,
  Zap,
} from 'lucide-react';
import { PortalProject } from '@/lib/portal-data';
import PortalApplyModal from './PortalApplyModal';

interface PortalProjectGridProps {
  projects: PortalProject[];
  appliedProjectIds: Set<string>;
  onApplicationSuccess: () => void;
}

const CATEGORIES = [
  { id: 'all', label: 'All Modules' },
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
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-500 mb-1 block">
            AVAILABLE BENCHMARKS
          </span>
          <h2 className="font-display font-bold text-2xl uppercase tracking-tight text-white">
            Matched Evaluation Modules
          </h2>
          <p className="text-neutral-400 text-xs sm:text-sm mt-1 max-w-xl">
            Contract opportunities prioritized against your skill taxonomy, verified track record, and availability.
          </p>
        </div>

        {/* Search Input Field */}
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search skills, domains..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 text-xs font-mono text-white bg-neutral-900/90 border border-neutral-800 rounded-lg placeholder:text-neutral-500 focus:outline-none focus:border-neutral-600"
          />
          <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-2.5 pointer-events-none" />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none mb-6">
        <Filter className="w-3.5 h-3.5 text-neutral-500 flex-shrink-0 mr-1" />
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`whitespace-nowrap px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                isActive
                  ? 'bg-white text-black font-semibold shadow-xs'
                  : 'bg-neutral-900/70 text-neutral-400 hover:text-white hover:bg-neutral-800/60 border border-neutral-800/80'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Project Cards Grid */}
      {filteredProjects.length === 0 ? (
        <div className="p-12 rounded-xl bg-neutral-900/30 border border-neutral-800/80 text-center">
          <p className="font-mono text-sm text-neutral-400">No project modules match your current filter criteria.</p>
          <button
            type="button"
            onClick={() => {
              setActiveCategory('all');
              setSearchQuery('');
            }}
            className="mt-3 text-xs font-mono text-emerald-400 hover:underline"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProjects.map((project) => {
            const hasApplied = appliedProjectIds.has(project.id);

            return (
              <div
                key={project.id}
                className="group relative flex flex-col justify-between rounded-xl bg-neutral-900/60 border border-neutral-800/80 hover:border-neutral-700 transition-all duration-200 p-5 backdrop-blur-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)]"
              >
                {/* Top Strip: Type & Match Badge */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 font-semibold border border-neutral-700/60">
                      {project.projectTypeLabel}
                    </span>

                    <div className="flex items-center gap-1.5 font-mono text-[11px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded font-medium">
                      <Sparkles className="w-3 h-3 text-emerald-400" />
                      <span>{project.matchScore}% Match</span>
                    </div>
                  </div>

                  {/* Title & Summary */}
                  <h3 className="font-display font-bold text-base text-white tracking-tight leading-snug group-hover:text-neutral-100 transition-colors mb-2">
                    {project.title}
                  </h3>

                  <p className="text-neutral-400 text-xs leading-relaxed line-clamp-3 mb-4">
                    {project.summary}
                  </p>

                  {/* Skills / Taxonomy Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.requiredSkills.slice(0, 4).map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-neutral-950/80 border border-neutral-800 text-neutral-400"
                      >
                        {skill}
                      </span>
                    ))}
                    {project.requiredSkills.length > 4 && (
                      <span className="px-1.5 py-0.5 text-[10px] font-mono text-neutral-500">
                        +{project.requiredSkills.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Meta & Action */}
                <div className="pt-4 border-t border-neutral-800/70 flex items-center justify-between gap-2">
                  <div>
                    <div className="font-mono text-sm font-bold text-white tracking-tight">
                      {project.compensation}
                    </div>
                    <div className="font-mono text-[10px] text-neutral-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{project.timeCommitment}</span>
                    </div>
                  </div>

                  {/* Apply CTA Button */}
                  {hasApplied ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800/90 text-emerald-400 border border-emerald-500/30 text-xs font-mono uppercase tracking-wider font-semibold">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Applied</span>
                    </span>
                  ) : project.status === 'open' ? (
                    <button
                      type="button"
                      onClick={() => handleOpenApply(project)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white text-black hover:bg-neutral-200 text-xs font-mono uppercase tracking-wider font-semibold transition-all cursor-pointer shadow-xs active:scale-[0.98]"
                    >
                      <Zap className="w-3.5 h-3.5 text-black fill-black" />
                      <span>Apply</span>
                    </button>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-neutral-950 text-neutral-500 border border-neutral-800 text-xs font-mono uppercase tracking-wider">
                      <span>Queueing</span>
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
