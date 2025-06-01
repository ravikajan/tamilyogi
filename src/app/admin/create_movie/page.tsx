"use client";
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { getGenreList } from "@/actions/genre/genre_action";
import { createOrUpdateMovie } from "@/actions/movie/movie_action";
import Header from "@/components/Header";
import DynamicImage from "@/components/DynamicImage";

// MovieType enum from Prisma
const MOVIE_TYPES = [
  { value: "MOVIE", label: "Movie" },
  { value: "WEB_SERIES", label: "Web Series" },
  { value: "TV_SHOW", label: "TV Show" },
  { value: "DOCUMENTARY", label: "Documentary" },
];

interface Genre {
  id: number;
  name: string;
  slug: string;
  emoji: string;
}

interface Season {
  seasonNumber: number;
  title: string;
  description: string;
  releaseDate?: string;
  episodes: Episode[];
}

interface Episode {
  episodeNumber: number;
  title: string;
  description: string;
  releaseDate?: string;
  videoUrl?: string;
}

const initialMovieState = {
  type: "MOVIE",
  title: "",
  slug: "",
  description: "",
  rating: "",
  releaseDate: "",
  genreId: "",
  poster: null as File | null,
  posterUrl: "",
  trailer: "",
  videoUrl: "",
  seasons: [] as Season[],
};

export default function CreateMoviePage() {
  const [step, setStep] = useState(1);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [movie, setMovie] = useState({ ...initialMovieState });
  const [posterPreview, setPosterPreview] = useState<string>("");
  const [descCount, setDescCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // Fetch genres on mount
  useEffect(() => {
    getGenreList().then(setGenres);
  }, []);

  // Slug auto-generation
  useEffect(() => {
    setMovie((prev) => ({
      ...prev,
      slug: prev.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, ""),
    }));
  }, [movie.title]);

  // Poster preview
  useEffect(() => {
    if (movie.poster) {
      const url = URL.createObjectURL(movie.poster);
      setPosterPreview(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPosterPreview("");
    }
  }, [movie.poster]);

  // Step navigation
  const nextStep = () => setStep((s) => Math.min(s + 1, 3));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  // Form field change
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "description") setDescCount(value.length);
    setMovie((prev) => ({ ...prev, [name]: value }));
  };

  // Poster image URL change
  const handlePosterUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMovie((prev) => ({ ...prev, posterUrl: e.target.value }));
    setPosterPreview(e.target.value);
  };

  // Type change (show/hide seasons)
  const handleTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMovie((prev) => ({ ...prev, type: e.target.value, seasons: [] }));
  };

  // Add season
  const addSeason = () => {
    setMovie((prev) => ({
      ...prev,
      seasons: [
        ...prev.seasons,
        { seasonNumber: prev.seasons.length + 1, title: "", description: "", episodes: [] },
      ],
    }));
  };

  // Remove season
  const removeSeason = (idx: number) => {
    setMovie((prev) => ({
      ...prev,
      seasons: prev.seasons.filter((_, i) => i !== idx),
    }));
  };

  // Add episode to season
  const addEpisode = (seasonIdx: number) => {
    setMovie((prev) => {
      const seasons = [...prev.seasons];
      seasons[seasonIdx].episodes.push({
        episodeNumber: seasons[seasonIdx].episodes.length + 1,
        title: "",
        description: "",
      });
      return { ...prev, seasons };
    });
  };

  // Remove episode
  const removeEpisode = (seasonIdx: number, epIdx: number) => {
    setMovie((prev) => {
      const seasons = [...prev.seasons];
      seasons[seasonIdx].episodes = seasons[seasonIdx].episodes.filter((_, i) => i !== epIdx);
      return { ...prev, seasons };
    });
  };

  // Update season/episode fields
  const handleSeasonChange = (seasonIdx: number, field: string, value: string) => {
    setMovie((prev) => {
      const seasons = [...prev.seasons];
      (seasons[seasonIdx] as any)[field] = value;
      return { ...prev, seasons };
    });
  };
  const handleEpisodeChange = (seasonIdx: number, epIdx: number, field: string, value: string) => {
    setMovie((prev) => {
      const seasons = [...prev.seasons];
      (seasons[seasonIdx].episodes[epIdx] as any)[field] = value;
      return { ...prev, seasons };
    });
  };

  // --- FORM VALIDATION ---
  function validateForm() {
    // Step 1: Basic Info
    if (step === 1) {
      if (!movie.title.trim()) return { valid: false, message: "Title is required." };
      if (!movie.genreId) return { valid: false, message: "Genre is required." };
      if (!movie.description.trim()) return { valid: false, message: "Description is required." };
      if (movie.description.length > 500) return { valid: false, message: "Description must be 500 characters or less." };
    }
    // Step 2: Media & Details
    if (step === 2) {
      if (movie.type === "MOVIE" && !movie.videoUrl.trim()) return { valid: false, message: "Video URL is required for Movie type." };
      if (movie.type === "MOVIE" && typeof movie.videoUrl !== "string") return { valid: false, message: "Video URL must be a string." };
      if (movie.type === "MOVIE" && movie.videoUrl && !/^https?:\/\//.test(movie.videoUrl)) return { valid: false, message: "Video URL must be valid." };
      if (movie.trailer && !/^https?:\/\//.test(movie.trailer)) return { valid: false, message: "Trailer URL must be valid." };
      if ((movie.type === "WEB_SERIES" || movie.type === "TV_SHOW") && movie.seasons.length === 0) {
        return { valid: false, message: "At least one season is required." };
      }
      if ((movie.type === "WEB_SERIES" || movie.type === "TV_SHOW")) {
        for (const [i, season] of movie.seasons.entries()) {
          if (!season.title.trim()) return { valid: false, message: `Season ${i + 1} title is required.` };
          for (const [j, ep] of season.episodes.entries()) {
            if (!ep.title.trim()) return { valid: false, message: `Episode ${j + 1} in Season ${i + 1} title is required.` };
          }
        }
      }
    }
    return { valid: true };
  }

  // --- HANDLE NEXT STEP WITH VALIDATION ---
  const handleNextStep = () => {
    const { valid, message } = validateForm();
    if (!valid) {
      alert(message);
      return;
    }
    setStep((s) => Math.min(s + 1, 3));
  };

  // --- HANDLE SUBMIT WITH FINAL VALIDATION ---
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { valid, message } = validateForm();
    if (!valid) {
      alert(message);
      return;
    }
    setLoading(true);
    try {
      await createOrUpdateMovie({
        ...movie,
        posterUrl: movie.posterUrl,
        videoUrl: movie.videoUrl,
        seasons: movie.seasons,
      });
      setLoading(false);
      alert("Movie created!");
      // Optionally reset form or redirect
    } catch (err) {
      setLoading(false);
      alert("Failed to create movie");
    }
  };

  // --- HANDLE SAVE AS DRAFT ---
  const handleSaveDraft = async () => {
    setLoading(true);
    try {
      await createOrUpdateMovie({
        ...movie,
        posterUrl: movie.posterUrl,
        videoUrl: movie.videoUrl,
        seasons: movie.seasons,
      }, true);
      setLoading(false);
      alert("Draft saved!");
    } catch (err) {
      setLoading(false);
      alert("Failed to save draft");
    }
  };

  // Helper: get trailer embed url
  function getTrailerEmbedUrl(url: string) {
    if (url.includes("youtube.com/watch?v=")) {
      const videoId = url.split("v=")[1].split("&")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    } else if (url.includes("youtu.be/")) {
      const videoId = url.split("youtu.be/")[1].split("?")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    } else if (url.includes("vimeo.com/")) {
      const videoId = url.split("vimeo.com/")[1].split("?")[0];
      return `https://player.vimeo.com/video/${videoId}`;
    }
    return url;
  }

  // Step 1: Basic Info
  const renderStep1 = () => (
    <div className="space-y-8">
      <div className="form-section bg-gray-900 rounded-xl p-6 mb-6 transition-all hover:shadow-2xl">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <span className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center mr-3"></span>
          Content Type
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {MOVIE_TYPES.map((type) => (
            <label key={type.value} className={`type-option bg-gray-800 hover:bg-gray-700 p-4 rounded-lg cursor-pointer border-2 transition-all flex flex-col items-center gap-2 ${movie.type === type.value ? "border-red-500 bg-red-900 bg-opacity-20" : "border-transparent"}`}>
              <input
                type="radio"
                name="type"
                value={type.value}
                checked={movie.type === type.value}
                onChange={handleTypeChange}
                className="hidden"
              />
              <span className="font-semibold text-base">{type.label}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="form-section bg-gray-900 rounded-xl p-6 mb-6 transition-all hover:shadow-2xl">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <span className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center mr-3"></span>
          Basic Information
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Title <span className="text-red-500">*</span></label>
            <input
              name="title"
              value={movie.title}
              onChange={handleChange}
              required
              className="input-field w-full bg-gray-800 rounded px-3 py-2 mb-2 focus:outline-none"
              placeholder="Movie or Series Title"
            />
            <label className="block text-sm font-medium text-gray-300 mb-2">Slug</label>
            <input
              name="slug"
              value={movie.slug}
              onChange={handleChange}
              className="input-field w-full bg-gray-800 rounded px-3 py-2"
              placeholder="auto-generated-slug"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Genre <span className="text-red-500">*</span></label>
            <select
              name="genreId"
              value={movie.genreId}
              onChange={handleChange}
              required
              className="input-field w-full bg-gray-800 rounded px-3 py-2 mb-2 focus:outline-none"
            >
              <option value="">Select Genre</option>
              {genres.map((g) => (
                <option key={g.id} value={g.id}>{g.emoji} {g.name}</option>
              ))}
            </select>
            <label className="block text-sm font-medium text-gray-300 mb-2">Release Date</label>
            <input
              type="date"
              name="releaseDate"
              value={movie.releaseDate}
              onChange={handleChange}
              className="input-field w-full bg-gray-800 rounded px-3 py-2"
            />
            <label className="block text-sm font-medium text-gray-300 mb-2">IMDB Rating</label>
            <input
              type="number"
              name="rating"
              value={movie.rating}
              onChange={handleChange}
              min="0"
              max="10"
              step="0.1"
              className="input-field w-full bg-gray-800 rounded px-3 py-2"
              placeholder="e.g. 8.5"
            />
          </div>
        </div>
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">Description <span className="text-red-500">*</span></label>
          <textarea
            name="description"
            value={movie.description}
            onChange={handleChange}
            rows={4}
            maxLength={500}
            required
            className="input-field w-full bg-gray-800 rounded px-3 py-2"
            placeholder="Enter a brief description of the movie..."
          />
          <div className="text-xs text-gray-500 mt-1">{descCount}/500 characters</div>
        </div>
      </div>
    </div>
  );

  // Step 2: Media & Details
  const renderStep2 = () => (
    <div className="space-y-8">
      <div className="form-section bg-gray-900 rounded-xl p-6 mb-6 transition-all hover:shadow-2xl">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <span className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center mr-3"></span>
          Movie Poster
        </h3>
        <div className="flex gap-6 items-center">
          <div>
            {movie.posterUrl ? (
              <DynamicImage
                src={movie.posterUrl}
                alt="Poster Preview"
                className="rounded-lg preview-image border-2 border-gray-700"
                width={160}
                height={224}
              />
            ) : (
              <div className="w-40 h-56 bg-gray-800 rounded-lg flex items-center justify-center text-gray-500 border-2 border-dashed border-gray-700">No Poster</div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <input
              type="text"
              name="posterUrl"
              value={movie.posterUrl}
              onChange={handlePosterUrlChange}
              className="input-field w-full bg-gray-800 rounded px-3 py-2 border border-gray-700"
              placeholder="Paste poster image URL here"
            />
          </div>
        </div>
      </div>
      {movie.type === "MOVIE" && (
        <div className="form-section bg-gray-900 rounded-xl p-6 mb-6 transition-all hover:shadow-2xl">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <span className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center mr-3"></span>
            Movie Video URL
          </h3>
          <input
            type="text"
            name="videoUrl"
            value={movie.videoUrl}
            onChange={handleChange}
            className="input-field w-full bg-gray-800 rounded px-3 py-2 border border-gray-700"
            placeholder="Paste main movie video URL here"
            required={movie.type === "MOVIE"}
          />
        </div>
      )}
      <div className="form-section bg-gray-900 rounded-xl p-6 mb-6 transition-all hover:shadow-2xl">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <span className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center mr-3"></span>
          Trailer & Media
        </h3>
        <input
          name="trailer"
          value={movie.trailer}
          onChange={handleChange}
          className="input-field w-full bg-gray-800 rounded px-3 py-2 mb-2"
          placeholder="YouTube/Vimeo URL (optional)"
        />
        {movie.trailer && (movie.trailer.includes("youtube.com") || movie.trailer.includes("youtu.be") || movie.trailer.includes("vimeo.com")) && (
          <div className="mt-4">
            <iframe
              src={getTrailerEmbedUrl(movie.trailer)}
              className="w-full h-64 rounded-lg border-0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="Trailer Preview"
            />
          </div>
        )}
      </div>
      {(movie.type === "WEB_SERIES" || movie.type === "TV_SHOW") && (
        <div className="form-section bg-gray-900 rounded-xl p-6 mb-6 transition-all hover:shadow-2xl">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <span className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center mr-3"></span>
            Seasons & Episodes
          </h3>
          <div className="space-y-4">
            {movie.seasons.map((season, sIdx) => (
              <div key={sIdx} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold">Season {season.seasonNumber}</h4>
                  <button type="button" onClick={() => removeSeason(sIdx)} className="text-red-400 hover:text-red-300 text-sm">Remove</button>
                </div>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <input
                    className="input-field w-full bg-gray-700 rounded px-3 py-2 mb-2"
                    placeholder="Season Title"
                    value={season.title}
                    onChange={e => handleSeasonChange(sIdx, "title", e.target.value)}
                  />
                  <input
                    type="date"
                    className="input-field w-full bg-gray-700 rounded px-3 py-2 mb-2"
                    placeholder="Release Date"
                    value={season.releaseDate || ""}
                    onChange={e => handleSeasonChange(sIdx, "releaseDate", e.target.value)}
                  />
                </div>
                <textarea
                  className="input-field w-full bg-gray-700 rounded px-3 py-2 mb-2"
                  placeholder="Season Description"
                  value={season.description}
                  onChange={e => handleSeasonChange(sIdx, "description", e.target.value)}
                  rows={2}
                />
                <div className="episodes-section mt-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold">Episodes</span>
                    <button type="button" onClick={() => addEpisode(sIdx)} className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-lg text-xs font-medium transition-colors">+ Add Episode</button>
                  </div>
                  <div className="space-y-3">
                    {season.episodes.map((ep, epIdx) => (
                      <div key={epIdx} className="episode-item bg-gray-700 rounded p-3 border border-gray-600">
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-semibold">Episode {ep.episodeNumber}</span>
                          <button type="button" onClick={() => removeEpisode(sIdx, epIdx)} className="text-red-400 hover:text-red-300 text-xs">Remove</button>
                        </div>
                        <div className="grid md:grid-cols-2 gap-3 mb-3">
                          <input
                            className="input-field w-full bg-gray-800 rounded px-3 py-2 mb-2"
                            placeholder="Episode Title"
                            value={ep.title}
                            onChange={e => handleEpisodeChange(sIdx, epIdx, "title", e.target.value)}
                          />
                          <input
                            type="date"
                            className="input-field w-full bg-gray-800 rounded px-3 py-2 mb-2"
                            placeholder="Release Date"
                            value={ep.releaseDate || ""}
                            onChange={e => handleEpisodeChange(sIdx, epIdx, "releaseDate", e.target.value)}
                          />
                        </div>
                        <textarea
                          className="input-field w-full bg-gray-800 rounded px-3 py-2 mb-2"
                          placeholder="Episode Description"
                          value={ep.description}
                          onChange={e => handleEpisodeChange(sIdx, epIdx, "description", e.target.value)}
                          rows={2}
                        />
                        <input
                          className="input-field w-full bg-gray-800 rounded px-3 py-2 mb-2"
                          placeholder="Video URL (optional)"
                          value={ep.videoUrl || ""}
                          onChange={e => handleEpisodeChange(sIdx, epIdx, "videoUrl", e.target.value)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            <button type="button" onClick={addSeason} className="mt-4 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">+ Add Season</button>
          </div>
        </div>
      )}
    </div>
  );

  // Step 3: Review & Save
  const renderStep3 = () => (
    <div className="space-y-8">
      <div className="form-section bg-gray-900 rounded-xl p-6 mb-6 transition-all hover:shadow-2xl">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <span className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center mr-3"></span>
          Review & Confirm
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-2">Basic Information</h4>
            <div className="space-y-2 text-sm">
              <div><b>Type:</b> {MOVIE_TYPES.find(t => t.value === movie.type)?.label}</div>
              <div><b>Title:</b> {movie.title}</div>
              <div><b>Slug:</b> {movie.slug}</div>
              <div><b>Genre:</b> {genres.find(g => g.id === Number(movie.genreId))?.name}</div>
              <div><b>Release Date:</b> {movie.releaseDate}</div>
              <div><b>Rating:</b> {movie.rating}</div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Description</h4>
            <p className="text-sm text-gray-300">{movie.description || "No description provided"}</p>
          </div>
        </div>
        <div className="mt-6">
          <h4 className="font-semibold mb-2">Poster</h4>
          {movie.posterUrl ? (
            <DynamicImage
              src={movie.posterUrl}
              alt="Poster Preview"
              className="rounded-lg preview-image border-2 border-gray-700"
              width={160}
              height={224}
            />
          ) : (
            <div className="w-40 h-56 bg-gray-800 rounded-lg flex items-center justify-center text-gray-500 border-2 border-dashed border-gray-700">No Poster</div>
          )}
        </div>
        {movie.trailer && (
          <div className="mt-6">
            <h4 className="font-semibold mb-2">Trailer</h4>
            <a href={movie.trailer} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">{movie.trailer}</a>
          </div>
        )}
        {(movie.type === "WEB_SERIES" || movie.type === "TV_SHOW") && (
          <div className="mt-6">
            <h4 className="font-semibold mb-2">Seasons & Episodes</h4>
            <div className="space-y-2">
              {movie.seasons.map((season, sIdx) => (
                <div key={sIdx} className="bg-gray-800 rounded p-3">
                  <div className="font-semibold">Season {season.seasonNumber}: {season.title}</div>
                  <div className="text-xs text-gray-400">{season.description}</div>
                  <div className="ml-4 mt-2 space-y-1">
                    {season.episodes.map((ep, epIdx) => (
                      <div key={epIdx} className="text-sm">Ep {ep.episodeNumber}: {ep.title}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Step indicators
  const renderSteps = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        {[1, 2, 3].map((n) => (
          <React.Fragment key={n}>
            <div className={`step-indicator w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${step === n ? "active" : step > n ? "completed" : "bg-gray-700 text-gray-400"}`}>{n}</div>
            {n < 3 && <div className="flex-1 h-1 bg-gray-700 mx-4"></div>}
          </React.Fragment>
        ))}
      </div>
      <div className="flex justify-between text-sm text-gray-400">
        <span>Basic Info</span>
        <span>Media & Details</span>
        <span>Review & Save</span>
      </div>
    </div>
  );

  return (
    <div className="bg-black text-white min-h-screen">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Create New Movie</h1>
          <p className="text-gray-400">Add a new movie or web series to your streaming platform</p>
        </div>
        {renderSteps()}
        <form onSubmit={handleSubmit} className="space-y-8">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          <div className="flex justify-between items-center pt-8 border-t border-gray-800">
            <button type="button" onClick={prevStep} className={`bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg font-medium transition-colors ${step === 1 ? "hidden" : ""}`}>Previous</button>
            <div className="flex gap-4 ml-auto">
              <button type="button" onClick={handleSaveDraft} className="border border-gray-600 hover:border-gray-500 px-6 py-3 rounded-lg font-medium transition-colors">Save as Draft</button>
              {step < 3 ? (
                <button type="button" onClick={handleNextStep} className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-medium transition-colors">Next Step</button>
              ) : (
                <button type="submit" className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-medium transition-colors" disabled={loading}>
                  {loading ? "Creating Movie..." : "Create Movie"}
                </button>
              )}
            </div>
          </div>
        </form>
      </main>
      <style jsx global>{`
        .step-indicator.active {
          background: linear-gradient(135deg, #ef4444, #dc2626);
          color: white;
        }
        .step-indicator.completed {
          background: #10b981;
          color: white;
        }
        .input-field:focus {
          box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.3);
          transform: translateY(-1px);
        }
        .file-upload:hover {
          border-color: #ef4444;
          background: rgba(239, 68, 68, 0.1);
        }
        .preview-image {
          max-height: 220px;
          object-fit: cover;
        }
      `}</style>
    </div>
  );
}
