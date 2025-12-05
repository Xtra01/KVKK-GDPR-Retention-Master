export enum Tab {
  OVERVIEW = 'OVERVIEW',
  COURSE = 'COURSE', // Renamed from FRAMEWORK
  SIMULATOR = 'SIMULATOR',
  AUDIT = 'AUDIT', // New Tab for Deletion Lab
  ANONYM = 'ANONYM', // New Tab for Anonymization Lab
  SHADOW = 'SHADOW', // New Tab for Shadow IT Lab
  CONSENT = 'CONSENT', // New Tab for Consent Crisis Lab
  MISTAKES = 'MISTAKES'
}

export interface CourseSection {
  title: string;
  content: string[]; // Paragraphs
  bullets?: string[];
  warning?: string;
}

export interface CourseModule {
  id: number;
  title: string;
  duration: string;
  icon: string;
  description: string;
  theory: CourseSection[];
  practical: {
    scenario: string;
    steps: string[];
    outcome: string;
  };
  checklist: string[];
}

export interface ScheduleItem {
  id: string;
  department: string;
  category: string;
  purpose: string;
  legalBasis: string;
  retentionPeriod: number; // in years
  method: string;
}

export interface QuizItem {
  id: number;
  question: string;
  isMistake: boolean;
  explanation: string;
}