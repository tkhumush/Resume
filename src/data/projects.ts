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
    title: 'MempoolTV',
    summary:
      'Built and shipped a native Apple TV app that streams live Bitcoin mempool insights to the living room, after finding the data only lived in dense desktop dashboards with no glanceable big-screen view. Now live on the App Store.',
    links: [
      { label: 'App Store', url: 'https://apps.apple.com/us/app/mempooltv/id6751822510' },
      { label: 'Source', url: 'https://github.com/tkhumush/MempoolTV' },
    ],
    status: 'Released',
  },
  {
    title: 'FastDiet: Last Meal Burner',
    summary:
      'Built a fasting tracker that calculates the fasting window from calories owed rather than a fixed clock. Shipped as a native iOS app (live on the App Store), then re-platformed into an installable Progressive Web App for cross-platform reach.',
    links: [
      { label: 'App Store', url: 'https://apps.apple.com/us/app/fastdiet-last-meal-burner/id1487273671' },
      { label: 'PWA Source', url: 'https://github.com/tkhumush/FastDiet-PWA' },
    ],
    status: 'Released',
  },
  {
    title: 'Marmot: Encrypted Messaging Stack',
    summary:
      'Built an end-to-end encrypted messaging stack on the Marmot Protocol (MLS) so people do not have to trust a centralized server with their keys. Pairs a Rust CLI for key management with a TypeScript channel plugin, published and approved on ClawHub.',
    links: [
      { label: 'CLI', url: 'https://github.com/tkhumush/marmot-cli' },
      { label: 'Plugin', url: 'https://github.com/tkhumush/openclaw-marmot' },
      { label: 'ClawHub', url: 'https://clawhub.ai/plugins/@tkhumush/marmot' },
    ],
    status: 'Released',
  },
  {
    title: 'nostrTV (tvOS & Android TV)',
    summary:
      'Built a TV app that turns open-protocol social video and feeds into a lean-back living-room experience, taken across stacks to two platforms. The tvOS version is in beta on TestFlight pending its iOS launch, alongside an Android TV and Chromecast port in Kotlin.',
    links: [
      { label: 'tvOS Source', url: 'https://github.com/tkhumush/nostrTV' },
      { label: 'Android TV Source', url: 'https://github.com/tkhumush/nostrTV-droid' },
    ],
    status: 'Work in progress',
  },
  {
    title: 'BASIC Circassian',
    summary:
      'Built a clean, deployable web app that teaches the basics of Circassian, an endangered heritage language with almost no modern, approachable learning tools online. A personal-heritage project that doubles as a polished language-learning UI.',
    links: [
      { label: 'Source', url: 'https://github.com/tkhumush/BASIC_Circassian' },
    ],
    status: 'Active',
  },
  {
    title: 'Zaplan',
    summary:
      'Built a to-do and project-planning web app on an open protocol with encrypted storage, so tasks are not locked into a single proprietary service. The most-adopted of these open-source projects, forked by other developers.',
    links: [
      { label: 'Source', url: 'https://github.com/tkhumush/zaplan' },
    ],
    status: 'Active',
  },
  {
    title: 'Seewaan / Nostrhood.social + Community Relays',
    summary:
      'Shipped a full-stack social experience: a Nostr web client (forked from Jumble) deployed at seewaan.com, paired with self-hosted relay and media servers so a community can keep its traffic, content, and media entirely under its own control.',
    links: [
      { label: 'nostrhood.social', url: 'https://nostrhood.social' },
      { label: 'Client', url: 'https://github.com/tkhumush/Seewaan' },
      { label: 'Relay', url: 'https://github.com/tkhumush/BitcoinDistrictRelay' },
    ],
    status: 'Active',
  },
  {
    title: 'Oneword',
    summary:
      'Built a stripped-down reader for fast, distraction-free long-form reading, since most social-feed clients make long posts cluttered and slow to get through.',
    links: [
      { label: 'Source', url: 'https://github.com/tkhumush/Oneword' },
    ],
    status: 'Active',
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
