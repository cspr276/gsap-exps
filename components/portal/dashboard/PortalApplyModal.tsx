'use client';

import { useState } from 'react';
import { X, CheckCircle2, Loader2, Sparkles, AlertCircle, ShieldCheck } from 'lucide-react';
import { PortalProject, submitProjectApplication } from '@/lib/portal-data';

interface PortalApplyModalProps {
  project: PortalProject | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function PortalApplyModal({
  project,
  isOpen,
  onClose,
  onSuccess,
}: PortalApplyModalProps) {
  const [statement, setStatement] = useState('');
  const [hoursPerWeek, setHoursPerWeek] = useState('15-20');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  if (!isOpen || !project) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Simulate submission network latency
      await new Promise((resolve) => setTimeout(resolve, 600));

      submitProjectApplication(
        project.id,
        statement || `Applied with ${hoursPerWeek} hrs/week availability. Matched on ${project.requiredSkills.join(', ')}.`
      );

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setStatement('');
        onSuccess();
        onClose();
      }, 900);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Could not submit application.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-6 sm:p-8 z-10 overflow-hidden text-white animate-in fade-in-50 zoom-in-95 duration-150">
        {/* Subtle Ambient Top Accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-sky-500" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-2 font-mono text-[11px] uppercase tracking-wider text-emerald-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{project.projectTypeLabel}</span>
            <span className="text-neutral-600">•</span>
            <span className="text-white font-semibold">{project.compensation}</span>
          </div>

          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-white mb-2">
            {project.title}
          </h2>
          <p className="text-xs text-neutral-400 leading-relaxed">
            {project.summary}
          </p>
        </div>

        {/* Alert Notes */}
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-950/60 border border-red-800/80 flex items-center gap-2 text-xs text-red-300">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 rounded-lg bg-emerald-950/60 border border-emerald-800/80 flex items-center gap-2 text-xs text-emerald-300">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-400" />
            <span>Application submitted successfully! Tracking added to your ledger.</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Required Skills Match Summary */}
          <div className="p-3 bg-neutral-950/70 border border-neutral-800/80 rounded-xl">
            <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Required Expertise Match</span>
              <span className="text-emerald-400 font-semibold">{project.matchScore}% Match Fit</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {project.requiredSkills.map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-0.5 rounded text-[10px] font-mono bg-neutral-900 border border-neutral-700/80 text-neutral-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Availability Select */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
              Weekly Allocation
            </label>
            <select
              value={hoursPerWeek}
              onChange={(e) => setHoursPerWeek(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs font-mono text-white bg-neutral-950 border border-neutral-800 rounded-lg focus:outline-none focus:border-neutral-600"
            >
              <option value="5-10">5 – 10 hours / week</option>
              <option value="10-15">10 – 15 hours / week</option>
              <option value="15-20">15 – 20 hours / week (Recommended)</option>
              <option value="20-30">20 – 30 hours / week (Full Commitment)</option>
            </select>
          </div>

          {/* Statement of Relevance */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
              Technical Experience & Domain Context (Optional)
            </label>
            <textarea
              rows={3}
              placeholder="Highlight any specific experience with benchmarks, model red-teaming, or code evaluation..."
              value={statement}
              onChange={(e) => setStatement(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs text-white bg-neutral-950 border border-neutral-800 rounded-lg placeholder:text-neutral-600 focus:outline-none focus:border-neutral-600 leading-relaxed resize-none"
            />
          </div>

          {/* Fast Terms Notice */}
          <div className="flex items-center gap-2 text-[11px] text-neutral-500 font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
            <span>Under Evalixa Mutual NDA & Benchmarking Agreement</span>
          </div>

          {/* Submit Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-800/80">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || success}
              className="px-5 py-2 rounded-lg bg-white text-black hover:bg-neutral-200 text-xs font-mono uppercase tracking-wider font-semibold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <span>Confirm Application</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
