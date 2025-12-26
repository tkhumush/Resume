type ProjectLink = {
  label: string;
  url: string;
};

export type Project = {
  title: string;
  summary: string;
  links: ProjectLink[];
  status?: string;
};

export const techProjects: Project[] = [
  {
    title: 'Nostrhood - A nostr client',
    summary: 'Open-source Nostr client focused on browsing and publishing notes with media support, deployed on nostrhood.social.',
    links: [
      { label: 'Source', url: 'https://github.com/tkhumush/Seewaan.git' },
      { label: 'Deployment', url: 'https://github.com/tkhumush/seewaan.com.git' },
      { label: 'nostrhood.social', url: 'https://nostrhood.social' },
    ],
    status: 'Active',
  },
  {
    title: 'Nostrarabia Relay & Media',
    summary: 'Self-hosted Nostr relay with media handling to keep regional traffic and assets close to end users.',
    links: [
      { label: 'Source', url: 'https://github.com/tkhumush/nostrarabia.git' },
    ],
    status: 'Active',
  },
  {
    title: 'Mempool TV',
    summary: 'Apple TV app that streams Bitcoin mempool insights for the living room experience.\n',
    links: [
      { label: 'Source', url: 'https://github.com/tkhumush/MempoolTV.git' },
      { label: 'App Store', url: 'https://apps.apple.com/us/app/mempooltv/id6751822510' },
    ],
    status: 'Released',
  },
  {
    title: 'nostrTV (tvOS & AndroidTV)',
    summary: 'In-progress Nostr-powered TV app targeting both tvOS and Android TV to bring decentralized feeds to larger screens.',
    links: [
      { label: 'tvOS Source', url: 'https://github.com/tkhumush/nostrTV.git' },
      { label: 'Android TV Source', url: 'https://github.com/tkhumush/nostrTV-Android.git' },
    ],
    status: 'Work in progress',
  },
  {
    title: 'FastDiet',
    summary: 'Mobile app that tracks last meal timing and fasting windows with reminders to stay on plan.\n',
    links: [
      { label: 'App Store', url: 'https://apps.apple.com/us/app/fastdiet-last-meal-burner/id1487273671' },
    ],
    status: 'Released',
  },
];

export const workProjects: Project[] = [
  {
    title: 'Retirement Dashboard',
    summary: 'Forecasts retirement eligibility windows and highlights at-risk skill areas for proactive staffing.',
    links: [],
    status: 'Deployed',
  },
  {
    title: 'Career Path Competency Explorer',
    summary: 'Maps roles to competencies and readiness signals to guide mobility and targeted development.',
    links: [],
    status: 'Deployed',
  },
  {
    title: 'Career Path History Analysis',
    summary: 'Visualizes role movement patterns to uncover progression bottlenecks and internal supply trends.',
    links: [],
    status: 'Deployed',
  },
  {
    title: 'Supply Analysis Dashboard',
    summary: 'Monitors headcount supply against workforce plans and hiring pipelines for operations.',
    links: [],
    status: 'Deployed',
  },
  {
    title: 'Termination Analysis Dashboard',
    summary: 'Tracks attrition drivers by function and tenure to inform retention actions.',
    links: [],
    status: 'Deployed',
  },
  {
    title: 'Overtime Analysis Dashboard',
    summary: 'Surfaces overtime trends and cost drivers to support budget controls and staffing plans.',
    links: [],
    status: 'Deployed',
  },
  {
    title: 'Mentorship Program',
    summary: 'Power App to intake participants, match mentors/mentees, and track outcomes.',
    links: [],
    status: 'Deployed',
  },
];
