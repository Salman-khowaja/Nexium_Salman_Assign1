// app/page.tsx
'use client';

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const quotesData = [
  { topic: "motivation", quote: "Push yourself, because no one else is going to do it for you." },
  { topic: "motivation", quote: "Success doesn’t just find you. You have to go out and get it." },
  { topic: "motivation", quote: "Great things never come from comfort zones." },
  { topic: "life", quote: "Life is what happens when you're busy making other plans." },
  { topic: "life", quote: "Get busy living or get busy dying." },
  { topic: "life", quote: "Life is really simple, but we insist on making it complicated." },
  { topic: "friendship", quote: "A real friend is one who walks in when the rest of the world walks out." },
  { topic: "friendship", quote: "Friendship is the only cement that will ever hold the world together." },
  { topic: "friendship", quote: "True friendship comes when the silence between two people is comfortable." }
];

export default function Home() {
  const [topic, setTopic] = useState("");
  const [quotes, setQuotes] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const filtered = quotesData.filter(q => q.topic.toLowerCase() === topic.toLowerCase()).slice(0, 3);
    setQuotes(filtered.map(q => q.quote));
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-blue-700 via-blue-500 to-blue-300">
      <div className="bg-white bg-opacity-80 rounded-2xl shadow-xl p-8 max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-900">Nexium Quote Generator App</h1>
          <p className="text-sm text-blue-800 mt-2">Enter a topic to generate 3 inspiring quotes</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input 
            placeholder="Enter topic (e.g., motivation, life, friendship)" 
            value={topic} 
            onChange={(e) => setTopic(e.target.value)}
            className="rounded-full px-6 py-3 bg-white border border-blue-300 text-blue-900 focus-visible:ring-2 focus-visible:ring-blue-600"
          />
          <Button 
            type="submit" 
            className="w-full rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 font-semibold">
            Get Quotes
          </Button>
        </form>

        <div className="mt-10 space-y-4">
          {quotes.length > 0 && quotes.map((q, index) => (
            <Card key={index} className="bg-white bg-opacity-90 border border-blue-300 shadow-sm">
              <CardContent className="p-4 text-center font-medium text-blue-800">
                {q}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
