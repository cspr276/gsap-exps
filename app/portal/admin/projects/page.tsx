'use client';

import { useState, useEffect } from 'react';
import {
  Plus,
  Search,
  X,
  AlertCircle,
} from 'lucide-react';
import AdminShell from '@/components/portal/admin/AdminShell';
import {
  getStoredAdminProjects,
  updateAdminProjectStatus,
  createAdminProject,
  INITIAL_ADMIN_PROJECTS,
  AdminProjectItem,
} from '@/lib/portal-admin-data';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<AdminProjectItem[]>(INITIAL_ADMIN_PROJECTS);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [employerName, setEmployerName] = useState('');
  const [projectType, setProjectType] = useState('coding_evaluation');
  const [difficulty, setDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'>('Advanced');
  const [modality, setModality] = useState<'Code' | 'Text' | 'Multimodal' | 'Reasoning'>('Code');
  const [compensation, setCompensation] = useState('$70.00 / hour');
  const [hourlyRate, setHourlyRate] = useState(70);
  const [openings, setOpenings] = useState(4);
  const [timeCommitment, setTimeCommitment] = useState('15-20 hrs/week');
  const [skillsInput, setSkillsInput] = useState('Python, Docker, SWE-bench');
  const [domainsInput, setDomainsInput] = useState('Autonomous Code, Agent Evaluation');
  const [formError, setFormError] = useState('');

  const refreshProjects = () => {
    setProjects(getStoredAdminProjects());
  };

  useEffect(() => {
    refreshProjects();
  }, []);

  const handleStatusChange = (projectId: string, newStatus: AdminProjectItem['status']) => {
    updateAdminProjectStatus(projectId, newStatus);
    refreshProjects();
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !summary.trim() || !description.trim()) {
      setFormError('Please fill in title, summary, and description.');
      return;
    }

    createAdminProject({
      title,
      summary,
      description,
      employerName,
      projectType,
      difficulty,
      modality,
      compensation,
      hourlyRate,
      openings,
      timeCommitment,
      requiredSkills: skillsInput.split(',').map((s) => s.trim()).filter(Boolean),
      domains: domainsInput.split(',').map((d) => d.trim()).filter(Boolean),
    });

    setIsModalOpen(false);
    setTitle('');
    setSummary('');
    setDescription('');
    setEmployerName('');
    setFormError('');
    refreshProjects();
  };

  const filteredProjects = projects.filter((p) => {
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    const matchesSearch =
      searchQuery === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.requiredSkills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  return (
    <AdminShell>
      {/* Editorial Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-[11px] tracking-wider uppercase text-neutral-500 dark:text-neutral-400">
              Contract Lifecycle
            </span>
            <span className="inline-block w-1 h-1 rounded-full bg-neutral-300 dark:bg-neutral-700" />
            <span className="font-mono text-[11px] tracking-wider uppercase text-neutral-500 dark:text-neutral-400">
              {projects.length} Total Projects
            </span>
          </div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-neutral-900 dark:text-white tracking-tight">
            All Projects
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-xl">
            Create, publish, adjust capacity, and manage AI evaluation and red-teaming contracts.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setFormError('');
            setIsModalOpen(true);
          }}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-mono font-semibold bg-neutral-900 hover:bg-black dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-neutral-900 transition-colors shadow-xs cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Project</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search projects, skills, or domains..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg text-xs font-mono bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-400 transition-colors"
          />
          <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-2.5 pointer-events-none" />
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'All' },
            { id: 'open', label: 'Open' },
            { id: 'in_progress', label: 'In Progress' },
            { id: 'completed', label: 'Completed' },
            { id: 'closed', label: 'Closed' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer whitespace-nowrap ${
                statusFilter === tab.id
                  ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-semibold shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects List */}
      <div className="mt-6 space-y-3.5">
        {filteredProjects.length === 0 ? (
          <div className="p-12 text-center rounded-2xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-900/90">
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">No projects found</h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              Try adjusting your status filter or search query.
            </p>
          </div>
        ) : (
          filteredProjects.map((project) => {
            const statusColors = {
              open: 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
              in_progress: 'bg-blue-50 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-800',
              completed: 'bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700',
              closed: 'bg-red-50 text-red-800 dark:bg-red-950/60 dark:text-red-300 border-red-200 dark:border-red-800',
            };

            return (
              <div
                key={project.id}
                className="p-5 sm:p-6 rounded-2xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-900/90 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all shadow-[0_2px_8px_rgb(0,0,0,0.02)]"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2.5 flex-wrap mb-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase tracking-wider bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                        {project.projectTypeLabel}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                        {project.difficulty}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                        {project.modality}
                      </span>
                      <span className="text-[11px] font-mono text-neutral-400">
                        Client: {project.employerName}
                      </span>
                    </div>

                    <h2 className="text-base sm:text-lg font-semibold text-neutral-900 dark:text-white tracking-tight">
                      {project.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed max-w-3xl">
                      {project.summary}
                    </p>

                    {/* Skill tags */}
                    <div className="flex items-center gap-1.5 flex-wrap mt-3">
                      {project.requiredSkills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 rounded text-[11px] font-mono bg-neutral-50 dark:bg-neutral-950/80 border border-neutral-200/80 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions & Status Control */}
                  <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-neutral-100 dark:border-neutral-800 flex-shrink-0">
                    <div className="text-right">
                      <div className="font-mono text-sm font-bold text-neutral-900 dark:text-white">
                        {project.compensation}
                      </div>
                      <div className="font-mono text-[11px] text-neutral-400 mt-0.5">
                        {project.openings} Openings • {project.applicantsCount} Applicants
                      </div>
                    </div>

                    {/* Status Dropdown */}
                    <div className="flex items-center gap-2">
                      <label htmlFor={`status-${project.id}`} className="sr-only">Project Status</label>
                      <select
                        id={`status-${project.id}`}
                        value={project.status}
                        onChange={(e) =>
                          handleStatusChange(project.id, e.target.value as AdminProjectItem['status'])
                        }
                        className={`text-xs font-mono font-medium rounded-lg px-2.5 py-1.5 border focus:outline-none cursor-pointer transition-colors ${
                          statusColors[project.status]
                        }`}
                      >
                        <option value="open">Open (Active)</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="closed">Closed</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Create Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="relative w-full max-w-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800 mb-5">
              <div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Add New Benchmark Project</h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                  Publish a new project specification to the contributor marketplace.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-950/80 border border-red-200 dark:border-red-900 text-xs text-red-700 dark:text-red-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Frontier Reasoning Code-Generation Audit"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs font-mono rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Client / Employer Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Frontier AI Research Lab"
                  value={employerName}
                  onChange={(e) => setEmployerName(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs font-mono rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Project Type
                  </label>
                  <select
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white"
                  >
                    <option value="coding_evaluation">Coding Evaluation</option>
                    <option value="rlhf">RLHF & Safety</option>
                    <option value="model_evaluation">Model Evaluation</option>
                    <option value="data_annotation">Data Annotation</option>
                    <option value="prompt_engineering">Agent Benchmarking</option>
                    <option value="domain_review">Domain Review</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Difficulty
                  </label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Modality
                  </label>
                  <select
                    value={modality}
                    onChange={(e) => setModality(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white"
                  >
                    <option value="Code">Code</option>
                    <option value="Text">Text</option>
                    <option value="Multimodal">Multimodal</option>
                    <option value="Reasoning">Reasoning</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Compensation Label
                  </label>
                  <input
                    type="text"
                    value={compensation}
                    onChange={(e) => setCompensation(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs font-mono rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Open Slots
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={openings}
                    onChange={(e) => setOpenings(Number(e.target.value))}
                    className="w-full px-3.5 py-2 text-xs font-mono rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Time Commitment
                  </label>
                  <input
                    type="text"
                    value={timeCommitment}
                    onChange={(e) => setTimeCommitment(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs font-mono rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Summary (Brief card preview) *
                </label>
                <input
                  type="text"
                  placeholder="One sentence summary of the evaluation mandate"
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs font-mono rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Detailed Description *
                </label>
                <textarea
                  rows={3}
                  placeholder="Detailed requirements, rubric guidelines, and deliverables expected..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs font-mono rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Required Skills (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="Python, Docker, SWE-bench, LaTeX"
                  value={skillsInput}
                  onChange={(e) => setSkillsInput(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs font-mono rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-100 dark:border-neutral-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-xs font-mono text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg text-xs font-mono font-semibold bg-neutral-900 hover:bg-black dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-neutral-900 shadow-xs cursor-pointer"
                >
                  Create & Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
