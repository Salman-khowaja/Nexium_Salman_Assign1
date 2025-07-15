import { BlogContent } from '../types';

// URL validation
export const validateUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return ['http:', 'https:'].includes(urlObj.protocol);
  } catch {
    return false;
  }
};

// Simulated content scraping
export const scrapeContent = async (url: string): Promise<BlogContent> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Simulate scraped content
  return {
    title: "The Future of Web Development: Trends and Innovations",
    content: `
      Web development continues to evolve at a rapid pace, with new technologies and methodologies emerging constantly. 
      In this comprehensive guide, we explore the latest trends that are shaping the future of web development.
      
      React and Vue.js remain dominant in the frontend ecosystem, while new frameworks like Svelte and Solid.js are gaining traction.
      The rise of TypeScript has significantly improved code quality and developer experience across JavaScript projects.
      
      Server-side rendering (SSR) and static site generation (SSG) are becoming increasingly important for performance and SEO.
      Tools like Next.js, Nuxt.js, and SvelteKit are making it easier to build fast, scalable web applications.
      
      The adoption of Web Components and progressive web apps (PWAs) is making web applications more native-like.
      CSS-in-JS solutions and utility-first frameworks like Tailwind CSS are changing how we approach styling.
      
      Backend development is seeing a shift towards microservices architecture and serverless computing.
      GraphQL is gaining popularity as an alternative to REST APIs, providing more flexible data fetching capabilities.
      
      The importance of web accessibility and performance optimization cannot be overstated in modern web development.
      Developers are increasingly focused on creating inclusive and fast-loading web experiences.
    `,
    url,
    metadata: {
      author: "Tech Blogger",
      publishDate: "2024-01-15",
      wordCount: 187
    }
  };
};

// AI-powered summarization (simulated)
export const generateSummary = async (content: BlogContent): Promise<string> => {
  // Simulate AI processing
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Simple extractive summarization logic
  const sentences = content.content.split(/[.!?]+/).filter(s => s.trim().length > 50);
  const keyPhrases = [
    'web development', 'react', 'vue.js', 'typescript', 'performance', 
    'ssr', 'ssg', 'next.js', 'tailwind css', 'microservices', 'graphql'
  ];
  
  // Score sentences based on key phrases
  const scoredSentences = sentences.map(sentence => {
    const score = keyPhrases.reduce((acc, phrase) => {
      return acc + (sentence.toLowerCase().includes(phrase) ? 1 : 0);
    }, 0);
    return { sentence: sentence.trim(), score };
  });
  
  // Select top 3 sentences
  const topSentences = scoredSentences
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(item => item.sentence);
  
  return topSentences.join('. ') + '.';
};

// Urdu translation dictionary
const englishToUrdu: Record<string, string> = {
  'web development': 'ویب ڈیولپمنٹ',
  'technology': 'ٹیکنالوجی',
  'framework': 'فریم ورک',
  'react': 'ری ایکٹ',
  'vue': 'ویو',
  'typescript': 'ٹائپ اسکرپٹ',
  'javascript': 'جاوا اسکرپٹ',
  'performance': 'کارکردگی',
  'application': 'ایپلیکیشن',
  'server': 'سرور',
  'database': 'ڈیٹابیس',
  'api': 'اے پی آئی',
  'frontend': 'فرنٹ اینڈ',
  'backend': 'بیک اینڈ',
  'css': 'سی ایس ایس',
  'html': 'ایچ ٹی ایم ایل',
  'component': 'کمپوننٹ',
  'developer': 'ڈیولپر',
  'modern': 'جدید',
  'tools': 'ٹولز',
  'trends': 'رجحانات',
  'innovation': 'اختراع',
  'future': 'مستقبل',
  'scalable': 'قابل توسیع',
  'experience': 'تجربہ',
  'accessibility': 'رسائی',
  'optimization': 'بہتری',
  'and': 'اور',
  'the': '',
  'is': 'ہے',
  'are': 'ہیں',
  'with': 'کے ساتھ',
  'for': 'کے لیے',
  'in': 'میں',
  'of': 'کا',
  'to': 'کو',
  'more': 'زیادہ',
  'new': 'نیا',
  'making': 'بنانا',
  'building': 'بنانا',
  'creating': 'بنانا',
  'fast': 'تیز',
  'quality': 'معیار',
  'code': 'کوڈ',
  'important': 'اہم',
  'popular': 'مقبول',
  'becoming': 'بننا',
  'gaining': 'حاصل کرنا',
  'improved': 'بہتر',
  'flexible': 'لچکدار',
  'alternative': 'متبادل',
  'providing': 'فراہم کرنا',
  'capabilities': 'صلاحیات',
  'focused': 'مرکوز',
  'inclusive': 'شامل'
};

export const translateToUrdu = async (text: string): Promise<string> => {
  // Simulate translation processing
  await new Promise(resolve => setTimeout(resolve, 200));
  
  let translatedText = text.toLowerCase();
  
  // Replace English words with Urdu equivalents
  Object.entries(englishToUrdu).forEach(([english, urdu]) => {
    if (urdu) {
      const regex = new RegExp(`\\b${english}\\b`, 'gi');
      translatedText = translatedText.replace(regex, urdu);
    }
  });
  
  // Clean up extra spaces and punctuation
  translatedText = translatedText.replace(/\s+/g, ' ').trim();
  
  return translatedText;
};

// Supabase storage simulation
export const saveToSupabase = async (summary: string, urduSummary: string): Promise<string> => {
  // Simulate database operation
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const id = `sb_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  
  // Simulate saving to Supabase
  console.log('Saving to Supabase:', { id, summary, urduSummary });
  
  return id;
};

// MongoDB storage simulation
export const saveToMongoDB = async (content: BlogContent): Promise<string> => {
  // Simulate database operation
  await new Promise(resolve => setTimeout(resolve, 250));
  
  const id = `mongo_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  
  // Simulate saving to MongoDB
  console.log('Saving to MongoDB:', { id, content });
  
  return id;
};