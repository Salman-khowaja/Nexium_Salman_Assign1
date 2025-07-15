import React, { useState } from 'react';
import { Globe, Loader2, CheckCircle, AlertCircle, FileText, Database, Languages } from 'lucide-react';
import { validateUrl, scrapeContent, generateSummary, translateToUrdu, saveToSupabase, saveToMongoDB } from './utils/contentProcessor';
import { ProcessingStep } from './types';

function App() {
  const [url, setUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState<ProcessingStep>('idle');
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateUrl(url)) {
      setError('Please enter a valid URL');
      return;
    }

    setIsProcessing(true);
    setError('');
    setResults(null);

    try {
      // Step 1: Scrape content
      setCurrentStep('scraping');
      await new Promise(resolve => setTimeout(resolve, 1500));
      const scrapedContent = await scrapeContent(url);

      // Step 2: Generate summary
      setCurrentStep('summarizing');
      await new Promise(resolve => setTimeout(resolve, 1200));
      const summary = await generateSummary(scrapedContent);

      // Step 3: Translate to Urdu
      setCurrentStep('translating');
      await new Promise(resolve => setTimeout(resolve, 1000));
      const urduSummary = await translateToUrdu(summary);

      // Step 4: Save to databases
      setCurrentStep('saving');
      await new Promise(resolve => setTimeout(resolve, 800));
      const supabaseId = await saveToSupabase(summary, urduSummary);
      const mongoId = await saveToMongoDB(scrapedContent);

      setResults({
        originalContent: scrapedContent,
        summary,
        urduSummary,
        supabaseId,
        mongoId
      });

      setCurrentStep('completed');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setCurrentStep('error');
    } finally {
      setIsProcessing(false);
    }
  };

  const resetForm = () => {
    setUrl('');
    setCurrentStep('idle');
    setResults(null);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-mint-50 to-sage-50 relative overflow-hidden">
      {/* Organic Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none">
          <path d="M0,400 C150,300 300,200 450,250 C600,300 750,350 900,300 C1050,250 1200,200 1200,400 L1200,800 L0,800 Z" fill="#2E8B57"/>
          <path d="M0,500 C200,450 400,400 600,450 C800,500 1000,550 1200,500 L1200,800 L0,800 Z" fill="#9DC183"/>
          <circle cx="100" cy="150" r="60" fill="#F0F7F4" opacity="0.6"/>
          <circle cx="800" cy="100" r="80" fill="#F0F7F4" opacity="0.4"/>
          <circle cx="1000" cy="300" r="40" fill="#F0F7F4" opacity="0.8"/>
        </svg>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-forest-green to-sage-green p-4 rounded-full shadow-lg">
              <Globe className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-forest-green to-sage-green bg-clip-text text-transparent mb-2">
            Blog Content Processor
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Transform blog content with AI-powered summarization and Urdu translation
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="bg-white rounded-xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-2xl font-semibold text-forest-green mb-6 flex items-center gap-2">
                <FileText className="w-6 h-6" />
                Input Blog URL
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Blog URL
                  </label>
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com/blog-post"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-green focus:border-sage-green transition-all duration-200"
                    disabled={isProcessing}
                  />
                </div>

                {error && (
                  <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                    <AlertCircle className="w-4 h-4" />
                    {error}
                  </div>
                )}

                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={isProcessing || !url}
                    className="flex-1 bg-gradient-to-r from-forest-green to-sage-green text-white py-3 px-6 rounded-lg font-medium hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      'Process Content'
                    )}
                  </button>
                  
                  {results && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </form>

              {/* Processing Steps */}
              {isProcessing && (
                <div className="mt-8 space-y-4">
                  <h3 className="text-lg font-semibold text-forest-green">Processing Steps</h3>
                  <div className="space-y-3">
                    <ProcessingStepItem
                      step="scraping"
                      currentStep={currentStep}
                      title="Scraping Content"
                      description="Extracting text from blog URL"
                    />
                    <ProcessingStepItem
                      step="summarizing"
                      currentStep={currentStep}
                      title="Generating Summary"
                      description="Creating AI-powered summary"
                    />
                    <ProcessingStepItem
                      step="translating"
                      currentStep={currentStep}
                      title="Translating to Urdu"
                      description="Converting summary to Urdu"
                    />
                    <ProcessingStepItem
                      step="saving"
                      currentStep={currentStep}
                      title="Saving to Databases"
                      description="Storing in Supabase and MongoDB"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Results Section */}
            <div className="bg-white rounded-xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-2xl font-semibold text-forest-green mb-6 flex items-center gap-2">
                <Database className="w-6 h-6" />
                Results
              </h2>

              {!results && !isProcessing && (
                <div className="text-center py-16 text-gray-500">
                  <div className="w-16 h-16 mx-auto mb-4 bg-mint-50 rounded-full flex items-center justify-center">
                    <FileText className="w-8 h-8 text-sage-green" />
                  </div>
                  <p>Enter a blog URL to start processing</p>
                </div>
              )}

              {currentStep === 'completed' && results && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-green-600 mb-4">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Processing completed successfully!</span>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-mint-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-forest-green mb-2">Original Summary</h3>
                      <p className="text-gray-700 text-sm">{results.summary}</p>
                    </div>

                    <div className="bg-sage-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-forest-green mb-2 flex items-center gap-2">
                        <Languages className="w-4 h-4" />
                        Urdu Translation
                      </h3>
                      <p className="text-gray-700 text-sm" dir="rtl">{results.urduSummary}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-medium text-blue-800 mb-1">Supabase ID</h4>
                        <p className="text-xs text-blue-600 font-mono">{results.supabaseId}</p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-medium text-green-800 mb-1">MongoDB ID</h4>
                        <p className="text-xs text-green-600 font-mono">{results.mongoId}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ProcessingStepItemProps {
  step: ProcessingStep;
  currentStep: ProcessingStep;
  title: string;
  description: string;
}

function ProcessingStepItem({ step, currentStep, title, description }: ProcessingStepItemProps) {
  const getStepStatus = () => {
    const steps: ProcessingStep[] = ['idle', 'scraping', 'summarizing', 'translating', 'saving', 'completed'];
    const currentIndex = steps.indexOf(currentStep);
    const stepIndex = steps.indexOf(step);
    
    if (currentIndex > stepIndex) return 'completed';
    if (currentIndex === stepIndex) return 'active';
    return 'pending';
  };

  const status = getStepStatus();

  return (
    <div className="flex items-center gap-3">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
        status === 'completed' ? 'bg-green-100 text-green-600' :
        status === 'active' ? 'bg-sage-100 text-sage-600' :
        'bg-gray-100 text-gray-400'
      }`}>
        {status === 'completed' ? (
          <CheckCircle className="w-4 h-4" />
        ) : status === 'active' ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <div className="w-2 h-2 bg-current rounded-full" />
        )}
      </div>
      <div>
        <div className={`font-medium ${
          status === 'completed' ? 'text-green-700' :
          status === 'active' ? 'text-sage-700' :
          'text-gray-500'
        }`}>
          {title}
        </div>
        <div className="text-sm text-gray-500">{description}</div>
      </div>
    </div>
  );
}

export default App;