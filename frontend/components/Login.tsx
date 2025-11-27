
import React, { useState } from 'react';
import { Lock, User as UserIcon, AlertCircle, Moon, Sun } from 'lucide-react';
import { User, Page } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
  onNavigate: (page: Page) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export function Login({ onLogin, onNavigate, isDarkMode, toggleDarkMode }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const user = await response.json();
        onLogin(user);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Invalid username or password.');
      }
    } catch (error) {
      setError('Failed to connect to the server.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4 relative">
       <button
        onClick={toggleDarkMode}
        className="absolute top-6 right-6 p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition-colors"
      >
        {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
      </button>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md overflow-hidden transition-colors">
        <div className="bg-emerald-600 dark:bg-emerald-700 p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-emerald-100 dark:text-emerald-200">Sign in to manage your store</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg flex items-center gap-2 text-sm">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all placeholder-gray-400"
                placeholder="Enter username"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400 dark:text-gray-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all placeholder-gray-400"
                placeholder="Enter password"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold py-3 rounded-lg shadow-md transition-colors"
          >
            Login
          </button>

          <div className="text-center pt-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <button 
                type="button" 
                onClick={() => onNavigate('signup')} 
                className="font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300"
              >
                Sign Up
              </button>
            </p>
          </div>

          <div className="text-center border-t dark:border-gray-700 pt-4">
             <button type="button" onClick={() => onNavigate('landing')} className="text-sm text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400">
               &larr; Back to Home
             </button>
          </div>
        </form>
      </div>
    </div>
  );
}
