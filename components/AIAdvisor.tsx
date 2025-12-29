import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Sparkles, Send, Bot, User, Loader2, RefreshCcw } from 'lucide-react';

const AIAdvisor: React.FC = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; content: string }[]>([
    { role: 'bot', content: "Hi! I'm your TSA Pro Advisor. Tell me about your interests (e.g., coding, building, video editing, public speaking) and I'll help you find the perfect TSA competition!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const cleanText = (text: string) => {
    // Aggressively remove markdown symbols for plain text vibe
    return text
      .replace(/\*\*/g, '')   // Remove bold
      .replace(/\*/g, '')     // Remove italics/bullets
      .replace(/__/g, '')     // Remove underline
      .replace(/_/g, '')      // Remove italics
      .replace(/#/g, '')      // Remove headers
      .replace(/`/g, '')      // Remove code ticks
      .replace(/^\s*-\s/gm, '• '); // Replace dash bullets with dots
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      // Create instance here to ensure fresh API key
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: [
          { role: 'user', parts: [{ text: userMessage }] }
        ],
        config: {
          systemInstruction: "You are the Little Elm High School TSA Pro Advisor. Your mission is to help students choose competition events for the 2024-2025 year. Be encouraging, professional, and knowledgeable about the 40+ events. If they mention interests, map them to specific events like Animatronics, Webmaster, Coding, or Structural Design. Keep responses concise and formatted for a chat interface. IMPORTANT: Do NOT use markdown asterisks (*), bolding (**), headers (#), or bullet points (*). Write in plain text paragraphs or use simple dashes (-) for lists if absolutely necessary. Use emojis sparingly to look friendly.",
          thinkingConfig: { thinkingBudget: 2000 }
        }
      });

      const rawText = response.text || "I'm sorry, I'm having trouble connecting to my database right now. Let's try again in a moment!";
      const botResponse = cleanText(rawText);
      
      setMessages(prev => [...prev, { role: 'bot', content: botResponse }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'bot', content: "Oops! Something went wrong in my digital brain. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative group p-[3px] rounded-2xl bg-gradient-to-r from-accent-blue via-purple-400 to-pink-400 bg-[length:400%_400%] animate-gradient-xy shadow-xl overflow-hidden">
      {/* Sparkle Overlay */}
      <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-10 left-10 w-2 h-2 bg-white rounded-full animate-ping opacity-75"></div>
          <div className="absolute bottom-20 right-10 w-1 h-1 bg-white rounded-full animate-pulse opacity-75"></div>
          <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-yellow-200 rounded-full animate-pulse opacity-50"></div>
      </div>

      <div className="bg-white dark:bg-dark-surface rounded-xl flex flex-col h-[500px] overflow-hidden relative z-10">
        
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-accent-blue to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-accent-blue/20 relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
              <Sparkles size={20} className="animate-spin-slow relative z-10 text-yellow-200" />
              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                TSA Pro Advisor
                <span className="text-[10px] bg-gradient-to-r from-blue-500 to-purple-500 text-white px-2 py-0.5 rounded-full font-bold shadow-sm flex items-center gap-1">
                   <Sparkles size={8} /> AI
                </span>
              </h3>
              <p className="text-xs text-gray-500">Powered by Gemini Pro</p>
            </div>
          </div>
          <button 
            onClick={() => setMessages([messages[0]])}
            className="p-2 text-gray-400 hover:text-accent-blue transition-colors rounded-lg hover:bg-accent-blue/10"
            title="Reset Chat"
          >
            <RefreshCcw size={16} />
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/50 dark:bg-dark-bg/20">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}>
              <div className={`max-w-[85%] flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center border transition-all duration-300 ${
                  msg.role === 'bot' 
                    ? 'bg-accent-blue border-accent-blue text-white shadow-md scale-100' 
                    : 'bg-white dark:bg-dark-surface border-gray-200 dark:border-dark-border text-gray-400'
                }`}>
                  {msg.role === 'bot' ? <Sparkles size={14} /> : <User size={16} />}
                </div>
                <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.role === 'bot'
                    ? 'bg-white dark:bg-[#1A2235] text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-dark-border rounded-tl-none'
                    : 'bg-accent-blue text-white rounded-tr-none'
                }`}>
                  {msg.content}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start animate-fade-in">
              <div className="bg-white dark:bg-[#1A2235] p-4 rounded-2xl rounded-tl-none border border-gray-200 dark:border-dark-border shadow-sm flex items-center gap-3">
                <Loader2 className="animate-spin text-accent-blue" size={16} />
                <span className="text-xs text-gray-500">Thinking...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200 dark:border-dark-border bg-white dark:bg-dark-surface">
          <div className="relative">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="I love coding and graphic design..."
              className="w-full bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl pl-4 pr-12 py-3 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-accent-blue/10 focus:border-accent-blue outline-none transition-all"
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="absolute right-2 top-1.5 p-2 bg-accent-blue hover:bg-accent-hover text-white rounded-lg transition-all disabled:opacity-50 shadow-md hover:scale-105 active:scale-95"
            >
              <Send size={18} />
            </button>
          </div>
          <p className="text-[10px] text-gray-400 mt-2 text-center">Your AI advisor can make mistakes. Always check official TSA guidelines.</p>
        </div>
      </div>
      
      <style>{`
        @keyframes gradient-xy {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-xy {
          animation: gradient-xy 6s ease infinite;
        }
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default AIAdvisor;