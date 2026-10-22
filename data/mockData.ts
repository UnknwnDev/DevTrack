export type CodingSession = {
  id: string;
  project: string;
  category: string;
  date: string;
  durationMinutes: number;
  notes: string;
  color: string;
};

export type DevProject = {
  id: string;
  name: string;
  description: string;
  stack: string[];
  progress: number;
  status: 'In progress' | 'Planned' | 'Completed';
  color: string;
};

export const sessions: CodingSession[] = [
  {
    id: '1',
    project: 'DevTrack App',
    category: 'Frontend',
    date: 'Today · 10:30 AM',
    durationMinutes: 90,
    notes: 'Built the home screen and reusable cards.',
    color: '#818CF8',
  },
  {
    id: '2',
    project: 'Portfolio Website',
    category: 'Frontend',
    date: 'Today · 8:00 AM',
    durationMinutes: 60,
    notes: 'Updated responsive layouts and typography.',
    color: '#22D3EE',
  },
  {
    id: '3',
    project: 'API Practice',
    category: 'Backend',
    date: 'Yesterday · 4:00 PM',
    durationMinutes: 75,
    notes: 'Practiced REST API routes.',
    color: '#34D399',
  },
  {
    id: '4',
    project: 'DevTrack App',
    category: 'Learning',
    date: 'Yesterday · 1:30 PM',
    durationMinutes: 45,
    notes: 'Reviewed NativeWind styling.',
    color: '#A78BFA',
  },
];

export const projects: DevProject[] = [
  {
    id: '1',
    name: 'DevTrack App',
    description: 'Track coding time and developer growth.',
    stack: ['React Native', 'Expo', 'TypeScript'],
    progress: 45,
    status: 'In progress',
    color: '#818CF8',
  },
  {
    id: '2',
    name: 'Portfolio Website',
    description: 'Showcase projects and development skills.',
    stack: ['Next.js', 'Tailwind CSS'],
    progress: 75,
    status: 'In progress',
    color: '#22D3EE',
  },
  {
    id: '3',
    name: 'API Practice',
    description: 'Learn backend development with REST APIs.',
    stack: ['Node.js', 'Express'],
    progress: 30,
    status: 'In progress',
    color: '#34D399',
  },
  {
    id: '4',
    name: 'UI Design Study',
    description: 'Practice layouts, colors, and components.',
    stack: ['UI Design', 'Figma'],
    progress: 100,
    status: 'Completed',
    color: '#FBBF24',
  },
];

export const goals = [
  {
    id: '1',
    title: 'Daily coding',
    description: 'Build a consistent coding habit.',
    current: 1.5,
    target: 2,
    unit: 'hours',
    color: '#818CF8',
  },
  {
    id: '2',
    title: 'Weekly coding',
    description: 'Spend focused time building projects.',
    current: 12.5,
    target: 15,
    unit: 'hours',
    color: '#22D3EE',
  },
  {
    id: '3',
    title: 'Practice sessions',
    description: 'Complete focused learning sessions.',
    current: 4,
    target: 5,
    unit: 'sessions',
    color: '#34D399',
  },
];
