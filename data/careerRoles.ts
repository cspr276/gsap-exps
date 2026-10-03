export interface CareerRole {
  slug: string;
  title: string;
  team: string;
  category: 'engineering' | 'infrastructure' | 'security' | 'research' | 'network' | 'operations';
  location: string;
  openings: number;
  deadline: string;
  experience: string;
  qualification: string;
  summary: string;
  responsibilities: string[];
  skills: string[];
}

export const CAREERS_EMAIL = 'careers@evalixa.com';

export const CAREER_ROLES: CareerRole[] = [
  {
    slug: 'machine-learning-engineer',
    title: 'Machine Learning Engineer',
    team: 'AI Engineering',
    category: 'engineering',
    location: 'Remote-first, IST/CET overlap',
    openings: 3,
    deadline: '20 Oct 2026',
    experience: '3+ years in production ML or LLM systems',
    qualification: 'Strong Python, ML fundamentals, model evaluation, and experiment tracking.',
    summary:
      'Build evaluation, fine-tuning, and deployment workflows for AI systems that need measurable quality, reliability, and safety before client release.',
    responsibilities: [
      'Develop ML pipelines, model-evaluation harnesses, and reporting workflows.',
      'Run experiments with clear baselines, metrics, and reproducible artifacts.',
      'Work with reviewers and domain experts to turn feedback into model improvements.',
    ],
    skills: ['Python', 'LLM evaluation', 'MLOps', 'Statistics', 'Experiment tracking'],
  },
  {
    slug: 'system-engineer',
    title: 'System Engineer',
    team: 'Infrastructure',
    category: 'infrastructure',
    location: 'Remote-first, IST/CET overlap',
    openings: 2,
    deadline: '22 Oct 2026',
    experience: '3-6 years in Linux systems, automation, or production operations',
    qualification: 'Hands-on systems engineering experience with secure, reliable services.',
    summary:
      'Design and maintain the infrastructure behind Evalixa delivery: secure environments, monitoring, automation, and dependable internal tooling.',
    responsibilities: [
      'Operate Linux servers, CI jobs, backups, observability, and deployment workflows.',
      'Improve reliability, access controls, and incident response procedures.',
      'Document operational runbooks that engineers can follow under pressure.',
    ],
    skills: ['Linux', 'Networking', 'Automation', 'Monitoring', 'Security hardening'],
  },
  {
    slug: 'debian-engineer',
    title: 'Debian Engineer',
    team: 'Infrastructure',
    category: 'infrastructure',
    location: 'Remote-first, IST/CET overlap',
    openings: 1,
    deadline: '26 Oct 2026',
    experience: '4+ years with Debian packaging, Linux internals, or distribution maintenance',
    qualification: 'Deep Debian/Linux administration and package lifecycle experience.',
    summary:
      'Build hardened Debian-based environments, package internal tools, and keep evaluation infrastructure reproducible from workstation to server.',
    responsibilities: [
      'Maintain Debian images, packages, repositories, and dependency baselines.',
      'Harden hosts and document upgrade, rollback, and recovery procedures.',
      'Support engineering teams with reproducible local and server environments.',
    ],
    skills: ['Debian', 'Packaging', 'Shell', 'Systemd', 'Secure configuration'],
  },
  {
    slug: 'domain-experts',
    title: 'Domain Experts',
    team: 'Expert Evaluation Network',
    category: 'network',
    location: 'Remote-first, project-based',
    openings: 12,
    deadline: '29 Oct 2026',
    experience: 'PhD minimum, with published or applied domain expertise preferred',
    qualification:
      'PhD is the minimum qualification. Open domains include mathematics, computer science, healthcare, law, finance, physical sciences, and technical domains.',
    summary:
      'Review, score, and calibrate specialist AI outputs where ordinary annotators are not enough and expert judgment is required.',
    responsibilities: [
      'Evaluate model outputs against domain-specific truth, reasoning, and quality standards.',
      'Write review notes, rubrics, and examples that improve reviewer agreement.',
      'Join calibration rounds for benchmark, RLHF, and specialist data programs.',
    ],
    skills: ['PhD-level expertise', 'Rubric design', 'Analytical writing', 'Peer review', 'Calibration'],
  },
  {
    slug: 'research-scientist',
    title: 'Research Scientist',
    team: 'Evaluation Research',
    category: 'research',
    location: 'Remote-first, IST/CET overlap',
    openings: 2,
    deadline: '3 Nov 2026',
    experience: '4+ years in AI research, evaluation science, or applied ML research',
    qualification: 'Research record in ML, NLP, agents, benchmarking, human evaluation, or safety.',
    summary:
      'Create rigorous evaluation methods, benchmark designs, and research-backed measurement systems for frontier AI workflows.',
    responsibilities: [
      'Design studies, metrics, benchmark tasks, and validation plans.',
      'Analyze model behavior, reviewer agreement, and benchmark drift.',
      'Publish internal research notes and client-facing technical findings.',
    ],
    skills: ['Research design', 'Benchmarking', 'NLP', 'Statistical analysis', 'Technical writing'],
  },
  {
    slug: 'cybersecurity-expert',
    title: 'Cybersecurity Expert',
    team: 'AI Security',
    category: 'security',
    location: 'Remote-first, IST/CET overlap',
    openings: 3,
    deadline: '5 Nov 2026',
    experience: '4+ years in application security, offensive security, or AI security testing',
    qualification: 'Security testing experience with clear, responsible documentation practices.',
    summary:
      'Test AI agents, model integrations, and web systems for realistic security failures, then convert findings into repeatable safeguards.',
    responsibilities: [
      'Assess authentication, authorization, injection, upload, SSRF, XSS, and AI-specific risks.',
      'Write safe proof notes, severity ratings, and remediation guidance.',
      'Build regression checks so fixed issues do not return.',
    ],
    skills: ['OWASP', 'AI red teaming', 'Threat modeling', 'Secure code review', 'Reporting'],
  },
  {
    slug: 'partnerships-business-development-manager',
    title: 'Partnerships & Business Development Manager',
    team: 'Growth',
    category: 'operations',
    location: 'Remote-first, India/EU/US overlap preferred',
    openings: 1,
    deadline: '10 Nov 2026',
    experience: '5+ years in B2B partnerships, enterprise sales, or strategic business development',
    qualification: 'Proven ability to build qualified partnerships in technical or AI markets.',
    summary:
      'Build relationships with AI labs, enterprises, research groups, and ecosystem partners that need evaluation, security, and expert data programs.',
    responsibilities: [
      'Identify, qualify, and manage partnership opportunities.',
      'Coordinate proposals with delivery, research, and operations teams.',
      'Maintain a trusted pipeline without spammy or deceptive outreach.',
    ],
    skills: ['Partnerships', 'B2B sales', 'Proposal writing', 'AI market knowledge', 'CRM discipline'],
  },
  {
    slug: 'operations-manager',
    title: 'Operations Manager',
    team: 'Operations',
    category: 'operations',
    location: 'Remote-first, IST overlap',
    openings: 1,
    deadline: '13 Nov 2026',
    experience: '5+ years in operations, delivery management, or program management',
    qualification: 'Operational leadership experience in distributed technical teams.',
    summary:
      'Keep Evalixa delivery calm, measurable, and on schedule across projects, expert contributors, compliance steps, and client communication.',
    responsibilities: [
      'Coordinate project cadence, resourcing, documentation, and status reporting.',
      'Track delivery risks and unblock teams before deadlines slip.',
      'Improve repeatable operating processes without adding unnecessary bureaucracy.',
    ],
    skills: ['Program management', 'Operations', 'Documentation', 'Client coordination', 'Process design'],
  },
  {
    slug: 'compliance-executive',
    title: 'Compliance Executive',
    team: 'Compliance',
    category: 'operations',
    location: 'Remote-first, IST overlap',
    openings: 2,
    deadline: '18 Nov 2026',
    experience: '2-5 years in compliance, vendor onboarding, data protection, or audit operations',
    qualification: 'Strong documentation discipline and familiarity with privacy, contracts, and audit evidence.',
    summary:
      'Support Evalixa compliance workflows, contributor documentation, vendor checks, agreement records, and evidence needed for responsible AI delivery.',
    responsibilities: [
      'Maintain agreement, onboarding, audit, and compliance documentation.',
      'Review records for completeness, retention, and privacy requirements.',
      'Coordinate with operations and reviewers when documents need correction.',
    ],
    skills: ['Compliance', 'Data privacy', 'Audit evidence', 'Documentation', 'Process control'],
  },
];

export const CAREER_ROLE_BY_SLUG = Object.fromEntries(
  CAREER_ROLES.map((role) => [role.slug, role])
);
