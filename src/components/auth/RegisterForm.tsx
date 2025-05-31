"use client";
import React, { useState } from "react";

function checkPasswordStrength(password: string) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return Math.min(score, 4);
}

export default function RegisterForm({ onSwitch }: { onSwitch?: () => void }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [strength, setStrength] = useState(0);

  const handlePassword = (val: string) => {
    setPassword(val);
    setStrength(checkPasswordStrength(val));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Account created successfully! Please check your email for verification.");
    }, 1500);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
          <input
            type="text"
            required
            className="input-field w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="John"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
          <input
            type="text"
            required
            className="input-field w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="Doe"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
        <input
          type="email"
          required
          className="input-field w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
          placeholder="john@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            required
            id="signupPassword"
            className="input-field w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="Create a strong password"
            value={password}
            onChange={e => handlePassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute right-3 top-3 text-gray-400 hover:text-white"
            tabIndex={-1}
            onClick={() => setShowPassword(v => !v)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
        </div>
        {/* Password Strength Indicator */}
        <div className="mt-2">
          <div className="flex space-x-1">
            <div className={`password-strength h-1 rounded-full flex-1 bg-gray-700 ${strength >= 1 ? (strength <= 2 ? "password-weak" : strength === 3 ? "password-medium" : "password-strong") : ""}`}></div>
            <div className={`password-strength h-1 rounded-full flex-1 bg-gray-700 ${strength >= 2 ? (strength <= 2 ? "password-weak" : strength === 3 ? "password-medium" : "password-strong") : ""}`}></div>
            <div className={`password-strength h-1 rounded-full flex-1 bg-gray-700 ${strength >= 3 ? (strength === 3 ? "password-medium" : strength === 4 ? "password-strong" : "") : ""}`}></div>
            <div className={`password-strength h-1 rounded-full flex-1 bg-gray-700 ${strength === 4 ? "password-strong" : ""}`}></div>
          </div>
          <p className={`text-xs mt-1 ${strength <= 2 ? "text-red-400" : strength === 3 ? "text-yellow-400" : strength === 4 ? "text-green-400" : "text-gray-400"}`}>
            {strength <= 2 ? "Weak password" : strength === 3 ? "Medium strength" : strength === 4 ? "Strong password" : "Password strength"}
          </p>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
        <input
          type="password"
          required
          id="confirmPassword"
          className={`input-field w-full px-4 py-3 bg-gray-800 border ${password !== confirmPassword && confirmPassword ? "border-red-500" : "border-gray-700"} rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent`}
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />
      </div>
      {error && <div className="text-red-400 text-sm">{error}</div>}
      <div className="space-y-3">
        <label className="flex items-start">
          <input type="checkbox" required className="w-4 h-4 text-red-600 bg-gray-800 border-gray-600 rounded focus:ring-red-500 mt-0.5" />
          <span className="ml-2 text-sm text-gray-300">
            I agree to the <a href="#" className="text-red-400 hover:text-red-300">Terms of Service</a> and <a href="#" className="text-red-400 hover:text-red-300">Privacy Policy</a>
          </span>
        </label>
        <label className="flex items-start">
          <input type="checkbox" className="w-4 h-4 text-red-600 bg-gray-800 border-gray-600 rounded focus:ring-red-500 mt-0.5" />
          <span className="ml-2 text-sm text-gray-300">
            Subscribe to updates and promotional content
          </span>
        </label>
      </div>
      <button
        type="submit"
        className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-all pulse-glow"
        disabled={loading}
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Creating Account...
          </span>
        ) : (
          "Create Account"
        )}
      </button>
      <div className="mt-8">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-transparent text-gray-400">Or sign up with</span>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-3">
          <button type="button" className="social-button w-full bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 flex justify-center items-center">
            <svg className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </button>
          <button type="button" className="social-button w-full bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 flex justify-center items-center">
            <svg className="w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
          </button>
          <button type="button" className="social-button w-full bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 flex justify-center items-center">
            <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.887 2.747.097.118.112.221.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.754-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z" />
            </svg>
          </button>
        </div>
      </div>
      <div className="text-center mt-8">
        <p className="text-gray-400 text-sm">
          Already have an account? {onSwitch && (
            <button type="button" className="text-red-400 hover:text-red-300 underline ml-1" onClick={onSwitch}>
              Sign In
            </button>
          )}
        </p>
      </div>
    </form>
  );
}
