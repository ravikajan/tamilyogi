import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="bg-black min-h-screen text-white flex flex-col">
      <Header />
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-red-500 mb-4">404</h1>
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">Page Not Found</h2>
          <p className="text-gray-400 mb-8">Sorry, the page you are looking for does not exist or has been moved.</p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors"
          >
            Go Home
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
