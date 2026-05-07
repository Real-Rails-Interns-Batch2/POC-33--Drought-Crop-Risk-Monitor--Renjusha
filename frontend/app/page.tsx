"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("./MapComponent"), {
  ssr: false,
});

export default function Home() {
   const [data, setData] = useState<any[]>([]);

   useEffect(() => {
     fetch("http://127.0.0.1:8000/data")
       .then((res) => res.json())
       .then((result) => setData(result));
  }, []);

const [showWhy, setShowWhy] = useState(false);
const [showWho, setShowWho] = useState(false);
const [showBrief, setShowBrief] = useState(false);

  const highRiskCount = data.filter(d => d.risk_level === "High Risk").length;
const avgRisk =
  data.length > 0
    ? (data.reduce((sum, d) => sum + d.risk_score, 0) / data.length).toFixed(2)
    : 0;

const [selectedRegion, setSelectedRegion] = useState<any>(null);
const [searchTerm, setSearchTerm] = useState("");
const [searchResult, setSearchResult] = useState<any>(null);

const [filter, setFilter] = useState("All");
const filteredData =
  filter === "All"
    ? data
    : data.filter((item) => item.risk_level === filter);
  
    const downloadData = () => {
  const fileData = JSON.stringify(filteredData, null, 2);
  const blob = new Blob([fileData], { type: "application/json" });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");

  a.href = url;
  a.download = "drought_crop_risk_data.json";
  a.click();

  URL.revokeObjectURL(url);
};

  return (
    <main className="flex h-screen w-screen overflow-hidden bg-[#030712] text-white font-sans">
      
      {/* LEFT SIDE (70%) */}
      <div className="w-[70%] p-4">
        <div className="h-full w-full rounded-xl border border-[#1F2937] bg-[#0B1117] overflow-hidden">
          <MapComponent data={filteredData} selectedRegion={selectedRegion} />
        </div>
      </div>

    {/* RIGHT SIDE (30%) */}
    <div className="w-[30%] p-6 border-l border-[#1F2937] bg-[#020617] overflow-y-auto">

  {/* TITLE */}
  <h1 className="text-2xl font-bold mb-6 text-white hover:text-cyan-300 transition border-b border-[#1F2937] pb-4">
    Drought & Crop Risk Monitor
  </h1>
  {/* FILTER BUTTONS */ }
  <div className="flex gap-2 mb-6">

  {["All", "High Risk", "Medium Risk", "Low Risk"].map((type) => (
    <button
      key={type}
      onClick={() => setFilter(type)}
      className={`px-3 py-1 text-xs rounded-full border transition
      ${
        filter === type
          ? "bg-[#38BDF8] text-[#030712] border-[#38BDF8] rr-glow"
          : "border-[#1F2937] text-gray-400 hover:border-gray-500"
      }`}
    >
      {type}
    </button>
    
  ))}
  
</div>

 {/* SEARCH COUNTRY */}
<div className="mb-6 p-4 bg-[#0B1117] rounded-xl border border-gray-800 hover:border-gray-500 transition">
  <h2 className="text-sm text-gray-200 mb-3">
    Search country to identify risk
  </h2>

  <input
    type="text"
    placeholder="Enter country name..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-full px-3 py-2 text-sm bg-[#020617] border border-gray-700 rounded-lg text-white outline-none"
  />

  {/* Suggestions */}
  {searchTerm && (
    <div className="mt-2 max-h-40 overflow-y-auto">
      {data
        .filter((item) =>
          item.region.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((item, index) => (
          <div
            key={index}
            onClick={() => {
              setSearchResult(item);
              setSelectedRegion(item); // keeps map sync
              setSearchTerm("");
            }}
            className="px-3 py-2 text-sm cursor-pointer hover:bg-[#020617] rounded"
          >
            {item.region}
          </div>
        ))}
    </div>
  )}
</div> 

 {/* INFO CARDS */ }

  <div className="grid grid-cols-3 gap-3 mb-6">
  
  <div className="rr-card p-3 rounded-lg hover:border-gray-500 transition">
    <p className="text-xs text-gray-400 ">Regions</p>
    <p className="font-semibold">{data.length}</p>
  </div>

  <div className="rr-card p-3 rounded-lg border-red-900/50 hover:border-gray-500 transition">
    <p className="text-xs text-gray-400">High Risk</p>
    <p className="text-lg font-semibold text-red-400">{highRiskCount}</p>
  </div>

  <div className="rr-card p-3 rounded-lg hover:border-gray-500 transition">
    <p className="text-xs text-gray-400">Avg Risk</p>
    <p className="text-lg font-semibold text-[#38BDF8]">{avgRisk}</p>
  </div>

</div>
   {/* SUBTITLE */ }
  <p className="text-sm text-gray-400 mb-6">
    Real-time global agricultural stress tracking
  </p>

  {/* GLOBAL STATUS */}
  <div className="mb-6 p-4 bg-[#0B1117] rounded-xl border border-gray-800 hover:border-gray-500 transition">
    <h2 className="text-sm text-gray-400 mb-2">GLOBAL RISK STATUS</h2>

    <p className="text-xl font-semibold text-red-400">
      High Volatility Detected
    </p>

    <p className="text-xs text-gray-500 mt-1">
      Multiple regions under climate stress
    </p>
  </div>

  {/*DOWNLOAD BUTTON */ }
<div className="mt-3 mb-3">
  <button
    onClick={downloadData}
    className="w-full px-6 py-3 text-sm bg-[#0B1117] border border-gray-700 rounded-lg text-gray-300 hover:border-gray-500 transition"
  >
    ⬇ Download Data
  </button>
</div>

  {/* WHY IT MATTERS */}
  <div className="mt-6 p-4 bg-[#0B1117] rounded-xl border border-gray-800 hover:border-gray-500 transition">

  <div
    onClick={() => setShowWhy(!showWhy)}
    className="flex justify-between items-center cursor-pointer"
  >
    <h2 className="text-sm text-gray-400">WHY THIS MATTERS</h2>
    <span className="text-gray-500 text-xs">
      {showWhy ? "▲" : "▼"}
    </span>
  </div>

  {showWhy && (
    <p className="mt-3 text-sm text-gray-300 leading-relaxed">
      Drought impacts food supply chains, commodity pricing, and economic stability.
      Monitoring these risks helps governments and institutions respond early.
    </p>
  )}

</div>
   
   {/* WHO CONTROLS THE RAIL */ }
    <div className="mt-6 p-4 bg-[#0B1117] rounded-xl border border-gray-800 hover:border-gray-500 transition">

  <div
    onClick={() => setShowWho(!showWho)}
    className="flex justify-between items-center cursor-pointer"
  >
    <h2 className="text-sm text-gray-400">WHO CONTROLS THE RAIL</h2>
    <span className="text-gray-500 text-xs">
      {showWho ? "▲" : "▼"}
    </span>
  </div>

  {showWho && (
    <div className="mt-3 text-sm text-gray-300 space-y-2">

      <p>🌍 Governments regulate water usage and agricultural policy.</p>
      <p>🛰 Climate agencies provide drought forecasting and satellite data.</p>
      <p>🌾 Agribusiness corporations control global food supply chains.</p>
      <p>📊 International organizations influence food security systems.</p>

    </div>
  )}

</div>
  {/* MASTER PROMPT BRIEF */ }
<div className="mt-6 p-4 bg-[#0B1117] rounded-xl border border-gray-800 hover:border-gray-500 transition">

  <div
    onClick={() => setShowBrief(!showBrief)}
    className="flex justify-between items-center cursor-pointer"
  >
    <h2 className="text-sm text-gray-400">SYSTEM INTELLIGENCE BRIEF</h2>
    <span className="text-gray-500 text-xs">
      {showBrief ? "▲" : "▼"}
    </span>
  </div>

  {showBrief && (
    <p className="mt-3 text-sm text-gray-300 leading-relaxed">
      Build a production-style demo called 'Drought + Crop Risk Monitor' for the Real Rails Intelligence Library. Use a clean dark dashboard with clear explanation copy for everyday viewers, builders, and allocators. Treat the core rail as Data & Intelligence. Ingest these sources where possible: NOAA Climate Data Online, World Bank Data, Our World in Data. If a source has no public event-level feed, use well-labeled synthetic/mock data for: Yes — synthetic crop yield sensitivity model. Required features: climate layers, drought index, crop-region compare, risk cards, scenario toggles. Add a 'Why this matters' panel, a 'Who controls the rail' panel, filters, tooltips, and downloadable sample data. Stack preference: Next.js + TypeScript + Tailwind + reusable data adapters; Python FastAPI for ETL where helpful.

    </p>
  )}

</div>
      </div>

      {/* SEARCH RESULT POPUP */}
{searchResult && (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999]">
    <div className="bg-[#0B1117] p-6 rounded-xl border border-gray-800 w-[90%] max-w-md relative">

      <button
        onClick={() => setSearchResult(null)}
        className="absolute top-2 right-3 text-gray-400 hover:text-white"
      >
        ✕
      </button>

      <h2 className="text-xl font-semibold mb-3">
        {searchResult.region}
      </h2>

      <div className="text-sm text-gray-300 space-y-2">
        <p>🌡 Temp: {searchResult.temperature}°C</p>
        <p>🌾 Crop Risk: {searchResult.crop_risk}</p>
        <p>💧 Drought: {searchResult.drought_level}</p>
        <p>📊 Score: {searchResult.risk_score}</p>
        <p className="mt-2 font-semibold text-cyan-400">
          {searchResult.risk_level}
        </p>
      </div>
    </div>
  </div>
)}

    </main>
  );
}
