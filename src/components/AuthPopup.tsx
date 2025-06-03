"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface AuthPopupProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
}

const AuthPopup: React.FC<AuthPopupProps> = ({ 
  isOpen, 
  onClose, 
  title = "Experience TamilYogiVip", 
  description = "Join thousands of movie lovers and discover your next favorite watch!" 
}) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      // Prevent body scrolling when popup is open
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable scrolling when popup is closed
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Auto-close if user becomes authenticated
  useEffect(() => {
    if (session?.user && isOpen) {
      onClose();
    }
  }, [session, isOpen, onClose]);
  const handleLogin = () => {
    router.push("/login");
    // Don't close popup - user must complete login
  };
  const handleOverlayClick = (e: React.MouseEvent) => {
    // Prevent closing popup by clicking overlay
    e.preventDefault();
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 z-[100] transition-all duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleOverlayClick}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      
      {/* Modal */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">        <div 
          className={`bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl max-w-md w-full mx-auto transform transition-all duration-300 ${
            isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
          }`}
        >
          {/* Header with gradient background */}
          <div className="relative bg-gradient-to-r from-red-600 to-red-500 rounded-t-2xl p-6 text-center overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-transparent" />
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full" />
            <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-white/5 rounded-full" />
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.9 1 3 1.9 3 3V21C3 22.1 3.9 23 5 23H19C20.1 23 21 22.1 21 21V9M12 8L18 14L12 20L6 14L12 8Z"/>
                </svg>
              </div>              <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
              <p className="text-red-100 text-sm">Login required to access our premium content library</p>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 text-gray-300">
                <div className="w-8 h-8 bg-red-600/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <span className="text-sm">Access thousands of movies & series</span>
              </div>
              
              <div className="flex items-center gap-3 text-gray-300">
                <div className="w-8 h-8 bg-red-600/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <span className="text-sm">Create your personal watchlist</span>
              </div>
              
              <div className="flex items-center gap-3 text-gray-300">
                <div className="w-8 h-8 bg-red-600/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <span className="text-sm">Get personalized recommendations</span>
              </div>
              
              <div className="flex items-center gap-3 text-gray-300">
                <div className="w-8 h-8 bg-red-600/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <span className="text-sm">HD quality streaming experience</span>
              </div>
            </div>            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleLogin}
                className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-red-500/25"
              >
                Login to Experience
              </button>
            </div>

            <p className="text-center text-xs text-gray-500 mt-4">
              Don't have an account? 
              <button 
                onClick={handleLogin}
                className="text-red-400 hover:text-red-300 ml-1 font-medium transition-colors"
              >
                Sign up for free
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPopup;
