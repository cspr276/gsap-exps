export interface ContactChannel {
  key: string;
  label: string;
  email: string;
  tagline: string;
  description: string;
  image: string;
  cols: string; // Tailwind bento column span
}

export const CONTACT_CHANNELS: ContactChannel[] = [
  {
    key: 'sales',
    label: 'Sales',
    email: 'sales@evalixa.com',
    tagline: 'Start a project conversation',
    description:
      'Discuss your project requirements, service packages, engagement models, and commercial terms. The best first step for any new partnership.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    cols: 'col-span-12 lg:col-span-7',
  },
  {
    key: 'support',
    label: 'Technical Support',
    email: 'support@evalixa.com',
    tagline: 'Help with ongoing work',
    description:
      'Get assistance with active projects, technical blockers, delivery questions, and post-launch issues. We respond within one business day.',
    image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80',
    cols: 'col-span-12 lg:col-span-5',
  },
  {
    key: 'consulting',
    label: 'Expert Consulting',
    email: 'consulting@evalixa.com',
    tagline: 'Short-term specialist engagement',
    description:
      'Architecture reviews, AI readiness assessments, code audits, and technical advisory sessions without a full long-term contract.',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    cols: 'col-span-12 md:col-span-6 lg:col-span-4',
  },
  {
    key: 'community',
    label: 'Expert Community',
    email: 'community@evalixa.com',
    tagline: 'Join the builder network',
    description:
      'Connect with our network of engineers, AI researchers, and domain specialists. Share knowledge, collaborate on open problems, and stay close to the craft.',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
    cols: 'col-span-12 md:col-span-6 lg:col-span-4',
  },
  {
    key: 'partners',
    label: 'Partnerships',
    email: 'partnership@evalixa.com',
    tagline: 'Technology and ecosystem collaboration',
    description:
      'Explore co-delivery arrangements, technology integrations, referral partnerships, and ecosystem collaborations that expand what both sides offer.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    cols: 'col-span-12 md:col-span-12 lg:col-span-4',
  },
  {
    key: 'careers',
    label: 'Careers',
    email: 'careers@evalixa.com',
    tagline: 'Join the team',
    description:
      'Applications, spontaneous CVs, internship enquiries, and questions about working at Evalixa. We read every message from people who care about the craft.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    cols: 'col-span-12 lg:col-span-5',
  },
  {
    key: 'media',
    label: 'Media & Press',
    email: 'media@evalixa.com',
    tagline: 'Press, interviews, and brand inquiries',
    description:
      'Journalist inquiries, interview requests, speaking opportunities, and anything related to public communications about Evalixa.',
    image: 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=800&q=80',
    cols: 'col-span-12 md:col-span-6 lg:col-span-3',
  },
  {
    key: 'general',
    label: 'General Inquiries',
    email: 'hello@evalixa.com',
    tagline: 'Everything else',
    description:
      'Questions, feedback, ideas, and anything that does not fit another category. If you are not sure where to send something, start here.',
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80',
    cols: 'col-span-12 md:col-span-6 lg:col-span-4',
  },
];

export const SOCIAL_LINKS = [
  { key: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/company/evalixa-ai/' },
  { key: 'twitter', label: 'X / Twitter', url: 'https://x.com/Evalixa_AI' },
  { key: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/evalixa_ai/' },
  { key: 'facebook', label: 'Facebook', url: 'https://www.facebook.com/people/Evalixa-AI/' },
];

export const COMPANY_INFO = {
  name: 'Evalixa AI',
  legalName: 'Evalixa AI Ltd.',
  headquarters: 'Hyderabad, India',
  address: 'Uppal, Hyderabad, Telangana 500039, India',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Uppal,+Hyderabad,+Telangana+500039,+India',
  primaryEmail: 'hello@evalixa.com',
};
