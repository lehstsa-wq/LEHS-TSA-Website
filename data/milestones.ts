/**
 * Chapter milestones. Real, dated outcomes used both as the About page
 * timeline and as the short case studies on the home page.
 */
export interface Milestone {
  year: string;
  title: string;
  body: string;
  accent: string;
}

export const MILESTONES: Milestone[] = [
  {
    year: '2022',
    title: 'Chapter Founded',
    body: 'Little Elm High School officially chartered its TSA chapter, welcoming its first 10 founding members.',
    accent: '#6a9bcc',
  },
  {
    year: '2023 to 2024',
    title: 'First National Qualifier',
    body: 'The chapter sent its first competitor to the National TSA Conference, a first in LEHS TSA history.',
    accent: '#d97757',
  },
  {
    year: '2024 to 2025',
    title: 'State and Nationals',
    body: 'Eight members advanced to the Texas State Conference and went on to compete at Nationals.',
    accent: '#6a9bcc',
  },
  {
    year: '2025 to 2026',
    title: 'Grew Past 50 Members',
    body: 'The chapter grew to over 50 members, becoming one of the largest STEM organizations at Little Elm High School.',
    accent: '#788c5d',
  },
];
