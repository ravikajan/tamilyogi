import React from "react";

const HeroBanner = () => (
  <section className="relative flex flex-col justify-end min-h-[420px] bg-gradient-to-t from-black via-black/80 to-transparent rounded-xl overflow-hidden mb-12">
    <img
      src="https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=1200&h=600&fit=crop"
      alt="Banner"
      className="absolute inset-0 w-full h-full object-cover object-center z-0"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />
    <div className="relative z-20 p-8 sm:p-12 max-w-2xl">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-yellow-400 font-bold text-lg">★ 8.5</span>
        <span className="text-white/80 text-sm">2024 • Sci-Fi</span>
        <span className="text-white/60 text-xs ml-2">New Release</span>
      </div>
      <h1 className="text-white text-4xl sm:text-5xl font-extrabold mb-2 drop-shadow-lg">Cyber Punk 2077</h1>
      <p className="text-white/90 text-base mb-6 max-w-xl">A futuristic world where technology and humanity collide. Experience the thrill of the unknown in this sci-fi adventure.</p>
      <div className="flex gap-4">
        <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-full text-lg shadow-lg transition flex items-center gap-2">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          WATCH
        </button>
        <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-full text-lg shadow-lg transition flex items-center gap-2">
          + ADD LIST
        </button>
      </div>
    </div>
  </section>
);

export default HeroBanner;
