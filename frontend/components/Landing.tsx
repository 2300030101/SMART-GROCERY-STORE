
import React from 'react';
import { Store, ShoppingBag, ArrowRight, Moon, Sun } from 'lucide-react';

interface LandingProps {
  onNavigate: (page: any) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export function Landing({ onNavigate, isDarkMode, toggleDarkMode }: LandingProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-500 to-teal-700 dark:from-emerald-900 dark:to-teal-950 flex flex-col items-center justify-center text-white p-6 relative">
      <button
        onClick={toggleDarkMode}
        className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-colors"
      >
        {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
      </button>

      <div className="max-w-4xl w-full text-center space-y-8">
        <div className="flex justify-center mb-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-full shadow-xl">
            <Store className="w-16 h-16 text-emerald-600 dark:text-emerald-400" />
          </div>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
          Smart General Store
        </h1>
        <p className="text-xl md:text-2xl text-emerald-100 dark:text-emerald-200 max-w-2xl mx-auto">
          The modern solution for local commerce. Manage sales, track debts, and grow your business with AI insights.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <button 
            onClick={() => onNavigate('store')}
            className="group bg-white dark:bg-emerald-400 text-emerald-700 dark:text-emerald-950 px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-emerald-50 dark:hover:bg-emerald-300 transition-all flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-6 h-6" />
            Enter Store
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button 
            onClick={() => onNavigate('login')}
            className="bg-emerald-800 bg-opacity-40 border-2 border-emerald-300/30 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-emerald-800/60 transition-all"
          >
            Staff / Admin Login
          </button>
        </div>
      </div>
      
      <div className="absolute bottom-8 text-emerald-200 text-sm">
        Powered by Smart Tech &copy; 2024
      </div>
    </div>
  );
}
