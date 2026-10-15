'use client';

import { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
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
      await new Promise((resolve) => setTimeout(resolve, 500));

      submitProjectApplication(
        project.id,
        statement || `Applied with ${hoursPerWeek} hrs/week availability.`
      );

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setStatement('');
        onSuccess();
        onClose();
      }, 700);
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
        className="fixed inset-0 bg-neutral-900/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog (Clean Light Theme) */}
      <div className="relative w-full max-w-lg bg-white border border-neutral-200 rounded-2xl shadow-xl p-6 sm:p-8 z-10 overflow-hidden text-neutral-900 animate-in fade-in-50 zoom-in-95 duration-150">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-1 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-1.5 font-mono text-[11px] uppercase tracking-wider text-neutral-500 font-medium">
            <span>{project.projectTypeLabel}</span>
            <span>•</span>
            <span className="text-neutral-900 font-bold">{project.compensation}</span>
          </div>

          <h2 className="font-display font-bold text-xl text-neutral-900 tracking-tight mb-2">
            Apply to {project.title}
          </h2>
          <p className="text-xs text-neutral-600 leading-relaxed">
            {project.summary}
          </p>
        </div>

        {/* Alert Notes */}
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800">
            Application submitted successfully. Added to your applications ledger.
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Required Skills Match Summary */}
          <div className="p-3.5 bg-neutral-50 border border-neutral-200 rounded-xl">
            <div className="text-[11px] font-mono text-neutral-600 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Required Skills</span>
              <span className="text-emerald-700 font-semibold">{project.matchScore}% match</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {project.requiredSkills.map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-0.5 rounded text-[11px] font-mono bg-white border border-neutral-200 text-neutral-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Availability Select */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 mb-1.5 font-medium">
              Weekly Allocation
            </label>
            <select
              value={hoursPerWeek}
              onChange={(e) => setHoursPerWeek(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs text-neutral-900 bg-white border border-neutral-300 rounded-lg focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
            >
              <option value="5-10">5 – 10 hours / week</option>
              <option value="10-15">10 – 15 hours / week</option>
              <option value="15-20">15 – 20 hours / week</option>
              <option value="20-30">20 – 30 hours / week</option>
            </select>
          </div>

          {/* Statement of Relevance */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 mb-1.5 font-medium">
              Notes or Relevant Experience (Optional)
            </label>
            <textarea
              rows={3}
              placeholder="Highlight any relevant benchmarks or project experience..."
              value={statement}
              onChange={(e) => setStatement(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs text-neutral-900 bg-white border border-neutral-300 rounded-lg placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 resize-none leading-relaxed"
            />
          </div>

          {/* Submit Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-100">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 text-xs font-mono uppercase tracking-wider text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || success}
              className="px-5 py-2 rounded-lg bg-neutral-900 hover:bg-black text-white text-xs font-mono uppercase tracking-wider font-semibold transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <span>Submit Application</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
