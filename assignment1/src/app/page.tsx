"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const quotes = [
  { topic: "inspiration", text: "The best way to get started is to quit talking and begin doing." },
  { topic: "inspiration", text: "Don't let yesterday take up too much of today." },
  { topic: "inspiration", text: "It's not whether you get knocked down, it's whether you get up." },
  { topic: "success", text: "Success is not final, failure is not fatal: It is the courage to continue that counts." },
  { topic: "success", text: "Success usually comes to those who are too busy to be looking for it." },
  { topic: "success", text: "Don't be afraid to give up the good to go for the great." },
  { topic: "life", text: "Life is what happens when you're busy making other plans." },
  { topic: "life", text: "Get busy living or get busy dying." },
  { topic: "life", text: "You only live once, but if you do it right, once is enough." },
  
];

const LiveBackground = dynamic(() => import("@/components/ui/LiveeBackground"), { ssr: false });

export default function QuoteGenerator() {
  const [topic, setTopic] = useState<string>("");
  const [results, setResults] = useState<typeof quotes>([]);

  const handleGenerate = () => {
    const filtered = quotes.filter(q => q.topic.toLowerCase().includes(topic.toLowerCase()));
    setResults(filtered.slice(0, 3));
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4">
      <LiveBackground />
      <div className="z-10 max-w-xl w-full text-center space-y-6 bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl">
        <h1 className="text-4xl font-bold text-white">Quote Generator</h1>
        <Input
          placeholder="Enter a topic (e.g., inspiration, success, life)"
          className="text-black"
          value={topic}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTopic(e.target.value)}
        />
        <Button className="w-full" onClick={handleGenerate}>
          Generate Quotes
        </Button>
        <div className="space-y-4">
          {results.map((quote, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Card className="bg-gradient-to-br from-pink-500 to-purple-600 text-white border-none">
                <CardContent className="p-4">
                  <p className="text-lg italic">"{quote.text}"</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}