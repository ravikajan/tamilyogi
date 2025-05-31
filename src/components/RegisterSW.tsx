"use client";
import { useEffect, useState } from "react";

export default function RegisterSW() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js");
    }
  }, []);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  // Hide prompt if already installed (standalone mode)
  useEffect(() => {
    if (
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone
    ) {
      setShowPrompt(false);
    }
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setShowPrompt(false);
      }
      setDeferredPrompt(null);
    }
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-end justify-center pointer-events-none">
      <div className="mb-8 bg-gray-900 border border-gray-700 rounded-xl shadow-xl px-6 py-4 flex items-center gap-4 pointer-events-auto animate-fade-in">
        <span className="text-white font-semibold">
          Install StreamFlix for a better experience!
        </span>
        <button
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-bold ml-2"
          onClick={handleInstall}
        >
          Install App
        </button>
        <button
          className="ml-2 text-gray-400 hover:text-white text-lg"
          onClick={() => setShowPrompt(false)}
          aria-label="Dismiss install prompt"
        >
          ×
        </button>
      </div>
    </div>
  );
}
