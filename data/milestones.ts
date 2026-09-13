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

/**
 * The chapter was chartered in the 2022-2023 school year. Every "years of
 * excellence" style figure on the site derives from this constant so the
 * number can never disagree with itself from one page to the next.
 */
export const FOUNDING_SEASON_START = 2022;

/** Completed competition seasons: 2022-23, 2023-24, 2024-25, 2025-26. */
export const CHAPTER_YEARS = 4;

/** Sentence-case spelling of CHAPTER_YEARS, for prose that opens a sentence. */
export const CHAPTER_YEARS_WORD =
  ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'][
    CHAPTER_YEARS
  ] ?? String(CHAPTER_YEARS);

export const MILESTONES: Milestone[] = [
  {
    year: '2022',
    title: 'Chapter Founded',
    body: 'Little Elm High School officially chartered its TSA chapter with its first 10 founding members.',
    accent: '#6a9bcc',
  },
  {
    year: '2023-2024',
    title: 'First National Qualifier',
    body: 'Our chapter sent its first competitor to the National TSA Conference, a first in LEHS TSA history.',
    accent: '#d97757',
  },
  {
    year: '2024-2025',
    title: 'State and Nationals',
    body: 'Eight members advanced to the Texas State Conference and went on to compete at Nationals.',
    accent: '#6a9bcc',
  },
  {
    year: '2025-2026',
    title: 'Exceeded 50 Members',
    body: 'Our chapter grew to over 50 members, becoming the largest STEM organization at Little Elm High School.',
    accent: '#788c5d',
  },
];
