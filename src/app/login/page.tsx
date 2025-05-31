"use client";

import { useState } from "react";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-[#1a1a2e] to-[#16213e] text-white overflow-hidden auth-container">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        <div className="absolute top-20 left-20 w-4 h-4 bg-red-500 rounded-full floating-animation opacity-60" />
        <div className="absolute bottom-40 right-20 w-6 h-6 bg-blue-500 rounded-full floating-animation opacity-40" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-10 w-3 h-3 bg-purple-500 rounded-full floating-animation opacity-50" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-yellow-500 rounded-full floating-animation opacity-30" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Main Container */}
      <div className="w-full max-w-md z-10 p-4">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-red-500 mb-2">StreamFlix</h1>
          <p className="text-gray-400">Your ultimate streaming destination</p>
        </div>

        {/* Auth Card */}
        <div className="glass-effect rounded-xl p-6 shadow-xl"> {/* Reduced padding, border radius, and shadow */}
          {/* Tab Switcher */}
          <div className="flex bg-gray-800 rounded-lg p-1 mb-6"> {/* Reduced margin-bottom */}
            <button
              className={`tab-button flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all ${activeTab === 'login' ? 'bg-red-600 text-white' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setActiveTab('login')}
              aria-selected={activeTab === 'login'}
              aria-controls="login-panel"
              type="button"
            >
              Sign In
            </button>
            <button
              className={`tab-button flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all ${activeTab === 'signup' ? 'bg-red-600 text-white' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setActiveTab('signup')}
              aria-selected={activeTab === 'signup'}
              aria-controls="signup-panel"
              type="button"
            >
              Sign Up
            </button>
          </div>

          {/* Only render the active form */}
          <div className="relative min-h-[340px]"> {/* Reduced min height */}
            {activeTab === 'login' ? (
              <LoginForm />
            ) : (
              <RegisterForm />
            )}
          </div>
        </div>

        {/* Footer Links */}
        <div className="text-center mt-8">
          <p className="text-gray-400 text-sm">
            By continuing, you agree to our{' '}
            <a href="#" className="text-red-400 hover:text-red-300">Terms of Service</a> and{' '}
            <a href="#" className="text-red-400 hover:text-red-300">Privacy Policy</a>
          </p>
        </div>
      </div>
      {/* Custom styles for glass effect, floating-animation, etc. are in global CSS or can be added inline if needed */}
    </div>
  );
}
