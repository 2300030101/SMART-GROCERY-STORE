import React, { useState } from 'react';
import { Sparkles, Loader, TrendingUp, AlertTriangle } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { Customer, Transaction } from '../types';

interface AiInsightsProps {
  customers: Customer[];
  transactions: Transaction[];
}

export function AiInsights({ customers, transactions }: AiInsightsProps) {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generateInsights = async () => {
    setLoading(true);
    try {
      // Prepare data summary for the AI
      const totalRevenue = transactions.reduce((sum, t) => sum + t.total, 0);
      const debtTotal = customers.reduce((sum, c) => sum + c.debt, 0);
      const topDebtors = customers
        .filter(c => c.debt > 0)
        .map(c => `${c.name} (₹${c.debt})`)
        .join(', ');
      
      const prompt = `
        You are an expert retail business analyst for a small general store.
        Analyze the following data and provide a concise, strategic summary with 3 key actionable bullet points.
        
        Data:
        - Total Revenue Today: ₹${totalRevenue}
        - Total Outstanding Debt (Katha): ₹${debtTotal}
        - Number of Transactions: ${transactions.length}
        - Customers with Debt: ${topDebtors || "None"}
        
        Focus on cash flow, debt management, and sales opportunities. Keep it encouraging but professional.
      `;

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      setAnalysis(response.text || "Could not generate insights at this time.");

    } catch (error) {
      console.error("AI Error:", error);
      setAnalysis("Error connecting to AI Assistant. Please check your API key.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-900 to-purple-900 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Sparkles className="w-32 h-32" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-indigo-500/30 p-2 rounded-lg backdrop-blur-sm">
            <Sparkles className="w-6 h-6 text-yellow-300" />
          </div>
          <h2 className="text-xl font-bold">Smart Assistant</h2>
        </div>

        {!analysis && !loading && (
          <div className="text-indigo-200 mb-6">
            <p>Get AI-powered insights on your sales, customer debts, and performance metrics instantly.</p>
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center py-8 space-y-3">
            <Loader className="w-8 h-8 animate-spin text-yellow-300" />
            <p className="text-sm text-indigo-200">Analyzing store data...</p>
          </div>
        )}

        {analysis && (
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 mb-6 border border-white/10 text-sm leading-relaxed whitespace-pre-line">
            {analysis}
          </div>
        )}

        <button
          onClick={generateInsights}
          disabled={loading}
          className="w-full bg-white text-indigo-900 font-bold py-3 rounded-xl hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2"
        >
          {loading ? 'Thinking...' : 'Generate Daily Report'}
        </button>
      </div>
    </div>
  );
}
