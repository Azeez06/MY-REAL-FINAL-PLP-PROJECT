import { useEffect, useState, useRef } from "react";
import { Briefcase, Box, Bookmark } from "lucide-react"; // optional icons, lucide-react already in your deps
import Footer from "../components/Footer";
export default function JobSearch() {
  const [mode, setMode] = useState("job"); // 'job' or 'intern'
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState(""); // user-typed location
  const [experience, setExperience] = useState("");
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1); // used to request more pages
  const [loading, setLoading] = useState(false);
  const [noMore, setNoMore] = useState(false);
  const [error, setError] = useState(null);
  const [savedJobs, setSavedJobs] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cb_saved_jobs") || "[]");
    } catch {
      return [];
    }
  });

  const abortRef = useRef(null);

  const RAPIDAPI_KEY = "0b5b496647mshd574be77fbbe992p162869jsne3d2c2a4cdd0"; // <-- paste your RapidAPI key here
  const RAPIDAPI_HOST = "jsearch.p.rapidapi.com";

  // Build a cache key — used to avoid unnecessary repeat requests
  function cacheKey(query, loc, exp, mode, pageNum) {
    return `jsearch:${mode}:${query || ""}:${loc || ""}:${exp || ""}:p${pageNum}`;
  }

  // Save results in sessionStorage for short-term caching (reduces API calls)
  function saveCache(key, data) {
    try {
      sessionStorage.setItem(key, JSON.stringify({ ts: Date.now(), data }));
    } catch {}
  }

  function readCache(key, maxAgeMs = 1000 * 60 * 5) {
    // default 5 minutes cache
    try {
      const raw = sessionStorage.getItem(key);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (Date.now() - parsed.ts > maxAgeMs) return null;
      return parsed.data;
    } catch {
      return null;
    }
  }

  // Utility: build query string used for API query (includes internship keyword if needed)
  function buildQuery(q, loc, exp, forMode) {
    const parts = [];
    if (q) parts.push(q);
    if (loc) parts.push(loc);
    if (exp) parts.push(exp);
    // mode-specific: for internships, include internship keywords
    if (forMode === "intern") {
      parts.push("intern");
      parts.push("internship");
    }
    return parts.join(" ").trim();
  }

  // Main search function: Nigeria-first, then fallback to global if none found
  async function runSearch({ reset = true } = {}) {
    const baseQuery = buildQuery(keyword, location, experience, mode);
    if (!baseQuery) {
      setError("Enter a job title or keyword to search.");
      return;
    }

    // Reset results if requested
    if (reset) {
      setResults([]);
      setPage(1);
      setNoMore(false);
    }

    setLoading(true);
    setError(null);

    // Abort previous fetch (if any)
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      // 1) Try Nigeria-first (explicitly add Nigeria to query)
      const nigeriaQuery = `${baseQuery} Nigeria`.trim();
      const nigeriaCacheKey = cacheKey(nigeriaQuery, "", "", mode, reset ? 1 : page);

      const cachedNigeria = readCache(nigeriaCacheKey);
      let nigeriaData = null;
      if (cachedNigeria) {
        nigeriaData = cachedNigeria;
      } else {
        const urlNigeria = `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(nigeriaQuery)}&num_pages=${reset ? 1 : page}`;
        const r1 = await fetch(urlNigeria, {
          signal: controller.signal,
          headers: {
            "x-rapidapi-key": RAPIDAPI_KEY,
            "x-rapidapi-host": RAPIDAPI_HOST,
          },
        });
        if (!r1.ok) throw new Error(`JSearch (NG) ${r1.status}`);
        const json1 = await r1.json();
        nigeriaData = json1?.data || [];
        saveCache(nigeriaCacheKey, nigeriaData);
      }

      if (nigeriaData.length > 0) {
        // Append or replace results
        setResults((prev) => (reset ? nigeriaData : [...prev, ...nigeriaData]));
        // If fewer than expected returned, mark noMore for pagination control
        if (nigeriaData.length < 10) setNoMore(true);
        setLoading(false);
        return;
      }

      // 2) Fallback to global search (no country)
      const globalQuery = baseQuery;
      const globalCacheKey = cacheKey(globalQuery, "", "", mode, reset ? 1 : page);
      const cachedGlobal = readCache(globalCacheKey);
      let globalData = null;
      if (cachedGlobal) {
        globalData = cachedGlobal;
      } else {
        const urlGlobal = `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(globalQuery)}&num_pages=${reset ? 1 : page}`;
        const r2 = await fetch(urlGlobal, {
          signal: controller.signal,
          headers: {
            "x-rapidapi-key": RAPIDAPI_KEY,
            "x-rapidapi-host": RAPIDAPI_HOST,
          },
        });
        if (!r2.ok) throw new Error(`JSearch (global) ${r2.status}`);
        const json2 = await r2.json();
        globalData = json2?.data || [];
        saveCache(globalCacheKey, globalData);
      }

      if (globalData.length > 0) {
        setResults((prev) => (reset ? globalData : [...prev, ...globalData]));
        if (globalData.length < 10) setNoMore(true);
      } else {
        // No results at all
        setResults([]);
        setNoMore(true);
      }
    } catch (err) {
      if (err.name === "AbortError") {
        // fetch aborted — ignore
      } else {
        console.error("Job search error:", err);
        setError("Failed to fetch jobs. Try again later.");
      }
    } finally {
      setLoading(false);
      abortRef.current = null;
    }
  }

  // Load more results (increase page and perform another fetch)
  async function loadMore() {
    if (noMore) return;
    setPage((p) => p + 1);
    // For simplicity we just call runSearch with reset=false after incrementing page
    await runSearch({ reset: false });
  }

  // Save job to localStorage
  function saveJob(job) {
    try {
      const cur = JSON.parse(localStorage.getItem("cb_saved_jobs") || "[]");
      // Prevent duplicates by job link or id
      const exists = cur.some((j) => j.job_apply_link === job.job_apply_link);
      if (exists) return alert("Already saved");
      cur.unshift(job);
      localStorage.setItem("cb_saved_jobs", JSON.stringify(cur));
      setSavedJobs(cur);
      alert("Job saved ✨");
    } catch {
      alert("Could not save job");
    }
  }

  // Remove saved job
  function removeSaved(link) {
    try {
      const cur = JSON.parse(localStorage.getItem("cb_saved_jobs") || "[]").filter((j) => j.job_apply_link !== link);
      localStorage.setItem("cb_saved_jobs", JSON.stringify(cur));
      setSavedJobs(cur);
    } catch {}
  }

  // small helper to show a friendly summary for experience value
  function experienceLabel(val) {
    if (!val) return "Any";
    return val;
  }

  // UI
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Job & Internship Search</h1>
          <div className="text-sm text-gray-600">Nigeria-first results • Global fallback</div>
        </div>

        {/* Mode toggle */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setMode("job")}
            className={`px-4 py-2 rounded-md ${mode === "job" ? "bg-blue-600 text-white" : "bg-white border"}`}
          >
            Jobs
          </button>
          <button
            onClick={() => setMode("intern")}
            className={`px-4 py-2 rounded-md ${mode === "intern" ? "bg-blue-600 text-white" : "bg-white border"}`}
          >
            Internships
          </button>
        </div>

        {/* Search controls */}
        <div className="bg-white p-5 rounded-xl shadow-sm mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder={`e.g. ${mode === "intern" ? "Marketing Intern, Data Intern" : "Frontend Developer, Mass Communication"}`}
              className="px-4 py-3 border rounded-md focus:outline-none"
            />
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location (e.g. Lagos, or leave blank for Nigeria/global)"
              className="px-4 py-3 border rounded-md focus:outline-none"
            />
            <select value={experience} onChange={(e) => setExperience(e.target.value)} className="px-4 py-3 border rounded-md">
              <option value="">Experience: Any</option>
              <option value="no experience">No Experience</option>
              <option value="less than 3 years">Less Than 3 Years</option>
              <option value="3-5 years">3-5 Years</option>
              <option value="5-10 years">5-10 Years</option>
              <option value="10+ years">10+ Years</option>
            </select>
          </div>

          <div className="flex items-center gap-3 mt-4">
            <button
              onClick={() => runSearch({ reset: true })}
              className="bg-blue-600 text-white px-5 py-2 rounded-md"
              disabled={loading}
            >
              {loading ? "Searching…" : `Search ${mode === "intern" ? "Internships" : "Jobs"}`}
            </button>

            <button
              onClick={() => {
                setKeyword("");
                setLocation("");
                setExperience("");
                setResults([]);
                setError(null);
                setNoMore(false);
                setPage(1);
              }}
              className="px-4 py-2 border rounded-md"
            >
              Reset
            </button>

            <div className="ml-auto text-sm text-gray-500">
              Showing {results.length} result(s)
            </div>
          </div>
        </div>

        {/* Error */}
        {error && <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-md mb-4">{error}</div>}

        {/* Results */}
        <div className="space-y-4">
          {results.length === 0 && !loading ? (
            <div className="text-center text-gray-500 py-10 rounded-md border border-dashed">No results yet — try a search above.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {results.map((job, idx) => (
                <div key={idx} className="bg-white p-4 rounded-lg shadow-sm border">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold text-lg">{job.job_title || job.job_title_raw || "Untitled"}</h3>
                      <p className="text-sm text-gray-600 mt-1">{job.employer_name || job.company_name}</p>
                      <p className="text-xs text-gray-500 mt-1">{job.job_city || job.city || ""}{job.job_country ? `, ${job.job_country}` : ""}</p>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <a href={job.job_apply_link} target="_blank" rel="noreferrer" className="text-sm bg-blue-600 text-white px-3 py-2 rounded-md">
                        Apply
                      </a>

                      {/* Save job */}
                      {savedJobs.some((s) => s.job_apply_link === job.job_apply_link) ? (
                        <button onClick={() => removeSaved(job.job_apply_link)} className="text-sm px-3 py-2 border rounded-md">
                          Unsave
                        </button>
                      ) : (
                        <button onClick={() => saveJob(job)} className="text-sm px-3 py-2 border rounded-md">
                          Save
                        </button>
                      )}
                    </div>
                  </div>

                  {/* meta */}
                  <div className="mt-3 text-xs text-gray-500">
                    {job.job_employment_type ? <span>Type: {job.job_employment_type} • </span> : null}
                    {job.job_publisher_site ? <span>Source: {job.job_publisher_site} • </span> : null}
                    {job.job_posted_at_timestamp ? <span>Posted: {new Date(job.job_posted_at_timestamp * 1000).toLocaleDateString()}</span> : null}
                  </div>

                  {/* short snippet/description if available */}
                  {job.job_description && <p className="mt-3 text-sm text-gray-700">{job.job_description.slice(0, 240)}{job.job_description.length>240 ? "…" : ""}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Load more */}
          {!noMore && results.length > 0 && (
            <div className="text-center mt-6">
              <button onClick={loadMore} disabled={loading} className="px-4 py-2 bg-gray-100 border rounded-md hover:bg-gray-200">
                {loading ? "Loading…" : "Load more"}
              </button>
            </div>
          )}
        </div>

        {/* Saved jobs preview */}
        <div className="mt-10">
          <h3 className="font-semibold mb-3">Saved Jobs</h3>
          {savedJobs.length === 0 ? (
            <p className="text-sm text-gray-500">You don't have saved jobs yet.</p>
          ) : (
            <div className="space-y-3">
              {savedJobs.map((s, i) => (
                <div key={i} className="p-3 bg-white border rounded-md flex justify-between items-center">
                  <div>
                    <div className="font-medium">{s.job_title}</div>
                    <div className="text-xs text-gray-500">{s.employer_name} — {s.job_city}</div>
                  </div>
                  <div className="flex gap-2">
                    <a href={s.job_apply_link} target="_blank" rel="noreferrer" className="px-3 py-1 bg-blue-600 text-white rounded-md text-xs">Apply</a>
                    <button onClick={() => removeSaved(s.job_apply_link)} className="px-3 py-1 border rounded-md text-xs">Remove</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
       <Footer />
    </div>
  );
}
