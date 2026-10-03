export interface CaseStudyDeliverable {
  label: string;
}

export interface CaseStudyPhase {
  label: 'Problem' | 'Approach' | 'Outcome';
  title: string;
  text: string;
}

export interface CaseStudyMetric {
  value: string;
  label: string;
}

export interface CaseStudy {
  id: string;
  slug: string;
  index: string;
  focus: string;
  category: 'agent-evaluation' | 'red-teaming' | 'expert-data';
  categoryLabel: string;
  clientContext: string;
  domain: string;
  headline: string;
  summary: string;
  phases: CaseStudyPhase[];
  metrics: CaseStudyMetric[];
  deliverables: string[];
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'case-01',
    slug: 'fintech-customer-support-agent-evaluation',
    index: '01',
    focus: 'Agent Evaluation',
    category: 'agent-evaluation',
    categoryLabel: 'Agent Evaluation',
    clientContext: 'A fintech unicorn deploying autonomous customer-support agents',
    domain: 'Fintech & Regulated Payments',
    headline: 'Uncovering Masked Failure Modes Before General Rollout Authorization',
    summary:
      'The engineering team had shipped an autonomous support agent behind a feature flag but could not answer a simple board question: is it safe to expand traffic past 5%? Their only signal was an aggregate helpfulness score from a single LLM judge that masked severe multi-turn refund hallucinations.',
    phases: [
      {
        label: 'Problem',
        title: 'Single-Judge Vibe Scoring Masking Edge-Case Liability',
        text: 'The team relied on an aggregate 4.6/5 score from an off-the-shelf LLM judge. In production shadow traffic, the agent appeared helpful, but senior customer support leads suspected hallucinations in complex policy refund queries. Without deterministic traces or agreement metrics, leadership refused to expand rollout.',
      },
      {
        label: 'Approach',
        title: 'Task-Grounded Rubrics & Calibrated Domain Adjudication',
        text: 'We rebuilt the evaluation harness around the actual regulatory job. We defined task-grounded rubrics for financial policy compliance, tool-call payload validation, and mandatory refusal behavior on regulated credit queries. We scored a held-out set of 850 complex workflows with calibrated domain specialists, enforcing inter-rater agreement before any score was certified.',
      },
      {
        label: 'Outcome',
        title: '1 in 6 Failure Band Closed & Board Authorization Secured',
        text: 'The audit revealed that the aggregate score had been masking a severe failure mode in multi-turn refund disputes: roughly one in six conversations produced an unsupported financial commitment. With reproducible regression baselines in place, the team fixed the tool-retrieval path, verified the fix across two model iterations, and secured board authorization to expand rollout to 100% of customers.',
      },
    ],
    metrics: [
      { value: '1 in 6', label: 'Masked Failure Rate Uncovered' },
      { value: '0.92', label: 'Inter-Rater Agreement (Alpha)' },
      { value: '100%', label: 'Rollout Authorized on Proof' },
    ],
    deliverables: [
      'Task-grounded policy compliance rubric',
      '850-trace seed-locked golden benchmark set',
      'Automated pre-merge regression blocker harness',
      'Executive board assurance memo',
    ],
  },
  {
    id: 'case-02',
    slug: 'foundation-model-lab-adversarial-red-teaming',
    index: '02',
    focus: 'Model Red-Teaming',
    category: 'red-teaming',
    categoryLabel: 'Adversarial Security',
    clientContext: 'A frontier foundation-model lab preparing an external release candidate',
    domain: 'Foundation Model AI Labs',
    headline: 'Hardening Multi-Turn Tool Injection Vectors Ahead of Public Launch',
    summary:
      'A leading AI lab required an exhaustive, independent adversarial assessment of their next-generation reasoning model before public deployment, having previously tested only against static internal prompt suites.',
    phases: [
      {
        label: 'Problem',
        title: 'Static Internal Suites Blind to Adaptive Injections',
        text: 'The lab’s internal evaluations relied on synthetic prompt variations that failed to explore complex multi-turn manipulation, indirect prompt injection through external documents, or privilege escalation via system tool calls.',
      },
      {
        label: 'Approach',
        title: 'Adaptive Multi-Turn Jailbreaks & Retrieval Context Poisoning',
        text: 'Our red-team operators designed multi-horizon exploit scenarios targeting tool-call execution, retrieval-augmented prompt hijacking, and exfiltration probes against the system prompt. Every discovered vulnerability was cataloged with reproducible cryptographic replay traces and severity-graded per CVSS standards.',
      },
      {
        label: 'Outcome',
        title: 'Critical Retrieval Clusters Mitigated & Automated CI Harness Handover',
        text: 'We delivered a triaged finding backlog showing that while critical exploits were a small fraction of attempts, they clustered heavily in indirect prompt injection via retrieved web documents—a vector the internal suite never tested. The lab patched the sanitization layer before release and integrated our suite into their automated CI/CD pipeline.',
      },
    ],
    metrics: [
      { value: '0', label: 'Unmitigated High-Severity Flaws at Launch' },
      { value: '< 24hr', label: 'Critical Vulnerability Triage SLA' },
      { value: '1,400+', label: 'Adversarial Exploit Payloads Delivered' },
    ],
    deliverables: [
      'Severity-ranked exploit dossier (CVSS aligned)',
      'Deterministic replayable exploit payloads',
      'Model architecture patch recommendations',
      'Continuous regression gate integration scripts',
    ],
  },
  {
    id: 'case-03',
    slug: 'clinical-documentation-expert-data-rlhf',
    index: '03',
    focus: 'Expert Data & RLHF',
    category: 'expert-data',
    categoryLabel: 'Expert Alignment & RLHF',
    clientContext: 'A healthcare AI company fine-tuning a clinical summarization model',
    domain: 'Regulated Healthcare Systems',
    headline: 'Eliminating High-Risk Clinical Omissions with Credentialed Medical Fellows',
    summary:
      'A medical AI startup was fine-tuning a clinical documentation summarizer using general crowd-sourced preference data. While outputs sounded exceptionally articulate, doctors noted alarming omissions of clinically critical contraindications.',
    phases: [
      {
        label: 'Problem',
        title: 'Crowd Annotators Prioritizing Fluency Over Clinical Accuracy',
        text: 'Standard crowd reviewers consistently preferred summaries that read smoothly, ignoring omissions of subtle contraindications, vital dosage constraints, and secondary diagnostic hypotheses that only licensed practitioners would notice.',
      },
      {
        label: 'Approach',
        title: 'Credentialed Clinician Network & Double-Blind Dispute Adjudication',
        text: 'We replaced general annotators with credentialed MDs and specialist clinicians. We rewrote review rubrics strictly around patient safety, diagnostic completeness, and omission penalties. Every contributor was calibrated against a gold-standard benchmark before scoring, and disputes were arbitrated by senior department fellows.',
      },
      {
        label: 'Outcome',
        title: '50% Reduction in Omissions & Certified Regulatory Trace Ledger',
        text: 'Inter-rater agreement rose dramatically once the rubric explicitly measured diagnostic risk. Subsequent post-training evaluation showed a 48% reduction in clinically material omissions compared to the prior checkpoint—backed by a complete cryptographic audit trail ready for FDA review.',
      },
    ],
    metrics: [
      { value: '48%', label: 'Reduction in Critical Omissions' },
      { value: '0.94', label: 'Krippendorff Alpha (Clinician Agreement)' },
      { value: '100%', label: 'Reviewer-to-Doctor Audit Trail' },
    ],
    deliverables: [
      'Clinically validated preference dataset',
      'Specialist physician review guidelines',
      'Gold-standard calibration test battery',
      'HIPAA/FDA-ready judgment trace archive',
    ],
  },
];
