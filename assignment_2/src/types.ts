export type ProcessingStep = 'idle' | 'scraping' | 'summarizing' | 'translating' | 'saving' | 'completed' | 'error';

export interface BlogContent {
  title: string;
  content: string;
  url: string;
  metadata: {
    author?: string;
    publishDate?: string;
    wordCount: number;
  };
}

export interface ProcessingResult {
  originalContent: BlogContent;
  summary: string;
  urduSummary: string;
  supabaseId: string;
  mongoId: string;
}