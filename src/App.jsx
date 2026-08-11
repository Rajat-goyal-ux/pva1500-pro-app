'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import { Header } from './components/Header';
import { StatsOverview } from './components/StatsOverview';
import { IVCurveChart } from './components/IVCurveChart';
import { AdBanner } from './components/AdBanner';
import { UpgradeModal } from './components/UpgradeModal';
import { FeedbackModal } from './components/FeedbackModal';
import { LegalModals } from './components/LegalModals';
import { Footer } from './components/Footer';
import { ActiveTheoryBackground } from './components/ActiveTheoryBackground';
import { CursorFollower } from './components/CursorFollower';
import { parsePvaCsv, calculateStcMetrics } from './utils/ivAnalysisEngine';
import { exportPdfReport } from './utils/pdfExport';
import { exportExcelData } from './utils/excelExport';

import {
  UploadCloud,
  FileText,
  FileSpreadsheet,
  RefreshCw,
  Play,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Sliders,
  FolderOpen,
  Crown,
  Search,
  Zap,
  ArrowRight,
  Radio,
  Download
} from 'lucide-react';

const INITIAL_STC_SPECS = {
  isc_stc: 13.56,
  voc_stc: 49.80,
  alpha: 0.048,
  beta: -0.270,
  stc_temp: 25,
  tolerance: 10.0
};

const INITIAL_SAMPLE_MODULES = [
  { fileName: 'Mod_01_PVA1500.csv', irr: 985, temp: 42.5, isc_meas: 13.12, voc_meas: 46.50, pmax_meas: 460 },
  { fileName: 'Mod_02_PVA1500.csv', irr: 990, temp: 43.1, isc_meas: 13.18, voc_meas: 46.40, pmax_meas: 462 },
  { fileName: 'Mod_03_PVA1500.csv', irr: 978, temp: 42.0, isc_meas: 13.01, voc_meas: 46.70, pmax_meas: 456 },
  { fileName: 'Mod_04_PVA1500.csv', irr: 995, temp: 44.0, isc_meas: 13.25, voc_meas: 46.10, pmax_meas: 464 },
  { fileName: 'Mod_05_PVA1500.csv', irr: 960, temp: 41.5, isc_meas: 12.80, voc_meas: 46.90, pmax_meas: 450 },
  { fileName: 'Mod_06_PVA1500.csv', irr: 988, temp: 43.5, isc_meas: 13.15, voc_meas: 44.20, pmax_meas: 435 }
];

export function App() {
  const { user, isPro } = useAuth();
  const [darkMode, setDarkMode] = useState(true);

  // Modals state
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [activeLegalModal, setActiveLegalModal] = useState(null);

  // STC Configuration Specs
  const [stcSpecs, setStcSpecs] = useState(INITIAL_STC_SPECS);

  // Report Information
  const [reportInfo, setReportInfo] = useState({
    projectName: 'Artemis Solar Park 01',
    stringName: 'String A-12',
    inspector: user ? user.displayName : 'Rajat Goyal',
    date: new Date().toISOString().split('T')[0]
  });

  // Uploaded Files & Processed Data
  const [rawModules, setRawModules] = useState(INITIAL_SAMPLE_MODULES);
  const [analysisData, setAnalysisData] = useState([]);
  const [statusMsg, setStatusMsg] = useState({ text: '✅ Solar Files Logged • Adjust Specs/Details below then click "Run IEC Analysis"', type: 'ok' });
  const [tableSearch, setTableSearch] = useState('');

  useEffect(() => {
    if (rawModules && rawModules.length > 0) {
      const calculated = calculateStcMetrics(rawModules, stcSpecs);
      setAnalysisData(calculated);
    }
  }, [stcSpecs, rawModules]);

  useEffect(() => {
    if (user && !reportInfo.inspector) {
      setReportInfo(prev => ({ ...prev, inspector: user.displayName }));
    }
  }, [user]);

  // STC Presets
  const applyStcPreset = (type) => {
    if (type === 'perc') {
      setStcSpecs({ isc_stc: 13.56, voc_stc: 49.80, alpha: 0.048, beta: -0.270, stc_temp: 25, tolerance: 10.0 });
    } else if (type === 'topcon') {
      setStcSpecs({ isc_stc: 14.20, voc_stc: 52.40, alpha: 0.045, beta: -0.250, stc_temp: 25, tolerance: 8.0 });
    } else if (type === 'hjt') {
      setStcSpecs({ isc_stc: 15.10, voc_stc: 55.60, alpha: 0.035, beta: -0.230, stc_temp: 25, tolerance: 5.0 });
    }
  };

  // Handle File Upload
  const handleFileUpload = (files) => {
    const fileList = Array.from(files);
    if (!fileList.length) {
      setStatusMsg({ text: 'Please select valid PVA-1500 files', type: 'err' });
      return;
    }

    if (!isPro && fileList.length > 5) {
      setShowUpgradeModal(true);
      setStatusMsg({ text: 'Free tier limited to 5 CSVs per batch. Upgrade to Pro for unlimited bulk upload!', type: 'err' });
      return;
    }

    let loadedModules = [];
    let count = 0;

    fileList.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const parsed = parsePvaCsv(e.target.result, file.name);
        if (parsed) loadedModules.push(parsed);
        count++;

        if (count === fileList.length) {
          if (loadedModules.length === 0) {
            setStatusMsg({ text: 'Could not parse values from uploaded file. Using standard solar data.', type: 'err' });
            return;
          }

          setRawModules(loadedModules);
          const calculated = calculateStcMetrics(loadedModules, stcSpecs);
          setAnalysisData(calculated);

          setStatusMsg({
            text: `🎉 ${calculated.length} Modules Uploaded! Verify Specifications & Site Details below, then click "Run IEC Analysis".`,
            type: 'ok'
          });
        }
      };
      reader.readAsText(file);
    });
  };

  const loadSampleData = () => {
    setRawModules(INITIAL_SAMPLE_MODULES);
    const calculated = calculateStcMetrics(INITIAL_SAMPLE_MODULES, stcSpecs);
    setAnalysisData(calculated);
    setStatusMsg({ text: '✅ Loaded 6 sample PVA-1500 modules.', type: 'ok' });
  };

  const runAnalysis = () => {
    if (!rawModules.length) {
      loadSampleData();
      return;
    }
    const calculated = calculateStcMetrics(rawModules, stcSpecs);
    setAnalysisData(calculated);
    setStatusMsg({ text: `⚡ IEC 60891 STC Analysis executed successfully for ${calculated.length} modules! Scroll down for visual graph & report export.`, type: 'ok' });
  };

  const handleReset = () => {
    setRawModules([]);
    setAnalysisData([]);
    setStatusMsg({ text: 'Reset complete. Upload CSV files or click "Load Sample Data".', type: 'info' });
  };

  const filteredAnalysisData = analysisData.filter(m => {
    if (!tableSearch) return true;
    const q = tableSearch.toLowerCase();
    return (
      m.fileName.toLowerCase().includes(q) ||
      `m${m.idx}`.includes(q) ||
      (m.overall_pass ? 'pass' : 'fail').includes(q)
    );
  });

  const handleDownloadPdf = () => {
    if (!analysisData || analysisData.length === 0) {
      alert('Please click "Run IEC Analysis" or upload CSV files first.');
      return;
    }
    exportPdfReport(reportInfo, stcSpecs, analysisData, isPro);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center relative overflow-hidden selection:bg-cyan-400 selection:text-slate-950 w-full">
      
      {/* 3D Particle Energy Canvas Background & Light Orb Follower */}
      <ActiveTheoryBackground />
      <CursorFollower />

      {/* Header */}
      <Header
        onOpenUpgrade={() => setShowUpgradeModal(true)}
        onOpenFeedback={() => setShowFeedbackModal(true)}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* Centered Hero Tag Pill */}
      <div className="max-w-4xl w-full mx-auto px-6 pt-3 pb-1 flex items-center justify-center text-center z-10">
        <div className="trending-pill cursor-pointer px-5 py-1.5 text-xs shadow-lg shadow-cyan-500/20 mx-auto" onClick={() => setShowUpgradeModal(true)}>
          <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span className="font-syne font-bold text-white tracking-wider">PVA-1500 PRO • AUTOMATIC REPORT GENERATOR ACTIVE</span>
          <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
        </div>
      </div>

      {/* Top Ad Banner */}
      <AdBanner slot="1111111111" />

      {/* Sleek Compact Workspace Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-4 space-y-6 z-10 flex flex-col items-center justify-center text-center">

        {/* STEP 1: FILE UPLOAD DROPZONE */}
        <div className="glass-card-transparent max-w-xl w-full p-6 text-center relative group border border-cyan-500/35 mx-auto">
          <input
            type="file"
            accept=".csv,.txt,.dat,text/csv"
            multiple
            onChange={(e) => handleFileUpload(e.target.files)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />

          <div className="relative z-0 max-w-md mx-auto space-y-3 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-400 via-violet-600 to-emerald-400 p-0.5 shadow-xl shadow-cyan-500/40 group-hover:scale-110 transition-transform duration-300 mx-auto">
              <div className="w-full h-full bg-[#020408] rounded-[14px] flex items-center justify-center text-cyan-400">
                <UploadCloud className="w-6 h-6 animate-bounce" />
              </div>
            </div>

            <div className="text-center">
              <h2 className="text-xl font-extrabold font-syne text-white tracking-tight text-center">
                Drop PVA-1500 CSV Files
              </h2>
              <p className="text-xs text-slate-300 font-mono text-center">
                Click to browse or drag & drop inspection files
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
              <span className="text-[11px] text-cyan-300 font-mono bg-cyan-500/10 px-3.5 py-1 rounded-full border border-cyan-500/30">
                ⚡ Auto CSV Engine Ready
              </span>
              {!isPro && (
                <span className="text-[11px] text-amber-300 font-mono bg-amber-500/10 px-3.5 py-1 rounded-full border border-amber-500/30 flex items-center gap-1.5">
                  <Crown className="w-3.5 h-3.5" /> Max 5 files (Free Tier)
                </span>
              )}
            </div>
          </div>
        </div>

        {/* STEP 2: STC SPECIFICATIONS & SITE DETAILS FORMS (AFTER FILE UPLOAD) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full mx-auto">
          
          {/* Module STC Specs Card */}
          <div className="glass-card-transparent p-5 text-center space-y-4 flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center space-y-2 pb-2 border-b border-white/10 w-full text-center">
              <div className="flex items-center justify-center gap-2 text-cyan-400 font-syne font-bold text-xs uppercase tracking-wider text-center">
                <Sliders className="w-4 h-4" /> STC Specifications
              </div>
              
              {/* Presets */}
              <div className="flex items-center justify-center gap-2 pt-0.5">
                <button onClick={() => applyStcPreset('perc')} className="btn-animated-glass py-1 px-3 text-[10px] font-mono">
                  PERC
                </button>
                <button onClick={() => applyStcPreset('topcon')} className="btn-animated-glass py-1 px-3 text-[10px] font-mono border-cyan-500/40 text-cyan-300">
                  TOPCon
                </button>
                <button onClick={() => applyStcPreset('hjt')} className="btn-animated-glass py-1 px-3 text-[10px] font-mono border-violet-500/40 text-violet-300">
                  HJT 650W
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center w-full">
              <div>
                <label className="block text-[11px] text-slate-400 font-mono mb-1 text-center">Isc STC (A)</label>
                <input
                  type="number"
                  step="0.01"
                  value={stcSpecs.isc_stc}
                  onChange={e => setStcSpecs({ ...stcSpecs, isc_stc: parseFloat(e.target.value) || 0 })}
                  className="input-centered py-2 text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 font-mono mb-1 text-center">Voc STC (V)</label>
                <input
                  type="number"
                  step="0.01"
                  value={stcSpecs.voc_stc}
                  onChange={e => setStcSpecs({ ...stcSpecs, voc_stc: parseFloat(e.target.value) || 0 })}
                  className="input-centered py-2 text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 font-mono mb-1 text-center">α Isc (%/°C)</label>
                <input
                  type="number"
                  step="0.001"
                  value={stcSpecs.alpha}
                  onChange={e => setStcSpecs({ ...stcSpecs, alpha: parseFloat(e.target.value) || 0 })}
                  className="input-centered py-2 text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 font-mono mb-1 text-center">β Voc (%/°C)</label>
                <input
                  type="number"
                  step="0.001"
                  value={stcSpecs.beta}
                  onChange={e => setStcSpecs({ ...stcSpecs, beta: parseFloat(e.target.value) || 0 })}
                  className="input-centered py-2 text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 font-mono mb-1 text-center">STC Temp (°C)</label>
                <input
                  type="number"
                  value={stcSpecs.stc_temp}
                  onChange={e => setStcSpecs({ ...stcSpecs, stc_temp: parseFloat(e.target.value) || 25 })}
                  className="input-centered py-2 text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 font-mono mb-1 text-center">Tolerance (±%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={stcSpecs.tolerance}
                  onChange={e => setStcSpecs({ ...stcSpecs, tolerance: parseFloat(e.target.value) || 10 })}
                  className="input-centered py-2 text-xs border-amber-500/40 text-amber-300"
                />
              </div>
            </div>
          </div>

          {/* Site Inspection Metadata Card */}
          <div className="glass-card-transparent p-5 text-center space-y-4 flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center space-y-1 pb-2 border-b border-white/10 w-full text-center">
              <div className="flex items-center justify-center gap-2 text-cyan-400 font-syne font-bold text-xs uppercase tracking-wider text-center">
                <FolderOpen className="w-4 h-4" /> Site Report Details
              </div>
              <span className="text-[11px] font-mono text-slate-400 text-center">PDF Report Headers</span>
            </div>

            <div className="space-y-3 text-center w-full">
              <div>
                <label className="block text-[11px] text-slate-400 font-mono mb-1 text-center">Project / Plant Name</label>
                <input
                  type="text"
                  value={reportInfo.projectName}
                  onChange={e => setReportInfo({ ...reportInfo, projectName: e.target.value })}
                  className="input-centered py-2 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-400 font-mono mb-1 text-center">String ID</label>
                  <input
                    type="text"
                    value={reportInfo.stringName}
                    onChange={e => setReportInfo({ ...reportInfo, stringName: e.target.value })}
                    className="input-centered py-2 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 font-mono mb-1 text-center">Inspection Date</label>
                  <input
                    type="date"
                    value={reportInfo.date}
                    onChange={e => setReportInfo({ ...reportInfo, date: e.target.value })}
                    className="input-centered py-2 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 font-mono mb-1 text-center">Certified Inspector Name</label>
                <input
                  type="text"
                  value={reportInfo.inspector}
                  onChange={e => setReportInfo({ ...reportInfo, inspector: e.target.value })}
                  className="input-centered py-2 text-xs"
                />
              </div>
            </div>
          </div>

        </div>

        {/* STEP 3: RUN ANALYSIS BUTTON (AFTER SPECIFICATIONS & SITE DETAILS) */}
        <div className="glass-card-transparent max-w-xl w-full p-4 flex flex-wrap items-center justify-center gap-4 text-center mx-auto border-2 border-cyan-400/40 shadow-xl shadow-cyan-500/20">
          <button
            onClick={runAnalysis}
            className="btn-animated-cyber bg-gradient-to-r from-cyan-400 via-cyan-500 to-emerald-400 text-slate-950 font-extrabold text-xs py-3 px-8 shadow-cyan-500/50"
          >
            <Zap className="w-4 h-4 fill-current animate-bounce" />
            <span>⚡ Run IEC 60891 Analysis</span>
          </button>

          <button onClick={loadSampleData} className="btn-animated-cyber btn-animated-emerald text-[11px] py-2 px-4">
            <Sparkles className="w-3.5 h-3.5 text-slate-950" />
            <span>Load Sample Data</span>
          </button>

          <button onClick={handleReset} className="btn-animated-glass text-slate-300 hover:text-white text-[11px] py-2 px-4">
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>

        {/* Status Notification Pill */}
        <div className={`text-[11px] font-mono px-5 py-2 rounded-xl border flex items-center gap-2 justify-center text-center mx-auto max-w-xl w-full ${
          statusMsg.type === 'err'
            ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
            : statusMsg.type === 'ok'
            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
            : 'bg-slate-900/80 text-slate-300 border-slate-700'
        }`}>
          {statusMsg.type === 'err' ? <AlertCircle className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
          <span>{statusMsg.text}</span>
        </div>

        {/* STEP 4 & 5: RESULTS SECTION (METRICS, CHART, TABLE) */}
        {analysisData.length > 0 && (
          <div className="w-full space-y-8 pt-2 text-center">

            {/* Metrics Overview Bento Cards */}
            <StatsOverview analysisData={analysisData} stcSpecs={stcSpecs} />

            {/* I-V & P-V Graph */}
            <IVCurveChart analysisData={analysisData} />

            {/* Results Table Card */}
            <div className="glass-card-transparent p-5 text-center flex flex-col items-center justify-center">
              <div className="flex flex-col items-center justify-center gap-4 mb-4 pb-3 border-b border-white/10 w-full text-center">
                <div className="text-center">
                  <h3 className="text-base font-bold font-syne text-white flex items-center justify-center gap-2 text-center">
                    IEC 60891 STC Corrections & Compliance Table
                  </h3>
                  <p className="text-[11px] text-slate-400 font-mono mt-0.5 text-center">
                    Calculated STC expected values (Isc, Voc) vs measured PVA-1500 field values
                  </p>
                </div>

                {/* Table Filter Search */}
                <div className="relative max-w-[220px] w-full mx-auto">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Filter modules..."
                    value={tableSearch}
                    onChange={e => setTableSearch(e.target.value)}
                    className="input-centered text-xs pl-9 py-2"
                  />
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto w-full">
                <table className="table-spacious-centered">
                  <thead>
                    <tr>
                      <th>Mod #</th>
                      <th>Irr (W/m²)</th>
                      <th>Temp (°C)</th>
                      <th>Isc Exp</th>
                      <th>Isc Meas</th>
                      <th>Isc Dev</th>
                      <th>Voc Exp</th>
                      <th>Voc Meas</th>
                      <th>Voc Dev</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAnalysisData.map((m) => (
                      <tr key={m.id}>
                        <td className="font-bold text-white">M{m.idx}</td>
                        <td>{m.irr.toFixed(0)}</td>
                        <td>{m.temp.toFixed(1)}</td>
                        <td>{m.isc_exp.toFixed(2)}</td>
                        <td>{m.isc_meas.toFixed(2)}</td>
                        <td className={`font-bold ${m.isc_pass ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {m.isc_dev > 0 ? '+' : ''}{m.isc_dev.toFixed(2)}%
                        </td>
                        <td>{m.voc_exp.toFixed(2)}</td>
                        <td>{m.voc_meas.toFixed(2)}</td>
                        <td className={`font-bold ${m.voc_pass ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {m.voc_dev > 0 ? '+' : ''}{m.voc_dev.toFixed(2)}%
                        </td>
                        <td>
                          <span className={m.overall_pass ? 'badge-linear-pass' : 'badge-linear-fail'}>
                            {m.overall_pass ? 'PASS' : 'FAIL'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* STEP 6: VERY LAST SECTION: REPORT GENERATE & DOWNLOAD BUTTONS AT THE END */}
            <div className="glass-card-transparent max-w-2xl w-full p-5 flex flex-col sm:flex-row items-center justify-center gap-4 text-center mx-auto border-2 border-cyan-400/40">
              <div className="space-y-2 text-center w-full">
                <div className="text-base font-bold font-syne text-white">
                  📄 Download Official Certified Inspection Report
                </div>
                <p className="text-xs text-slate-300 font-mono">
                  Export verified PDF inspection certificate or raw XLSX sheet
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                  <button
                    onClick={handleDownloadPdf}
                    className="btn-animated-cyber bg-gradient-to-r from-cyan-400 via-cyan-500 to-emerald-400 text-slate-950 font-extrabold text-xs py-3 px-6"
                  >
                    <Download className="w-4 h-4 fill-current" />
                    <span>📄 Download Certified PDF Report</span>
                  </button>

                  <button
                    onClick={() => exportExcelData(reportInfo, stcSpecs, analysisData)}
                    className="btn-animated-glass py-3 px-6 text-xs text-emerald-400 border-emerald-500/40 hover:bg-emerald-500/10 font-bold"
                  >
                    <FileSpreadsheet className="w-4 h-4" />
                    <span>Export XLSX Sheet</span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        )}

      </main>

      {/* Bottom Ad Banner */}
      <AdBanner slot="2222222222" />

      {/* Footer */}
      <Footer onOpenLegal={(modalType) => setActiveLegalModal(modalType)} />

      {/* Modals */}
      <UpgradeModal isOpen={showUpgradeModal} onClose={() => setShowUpgradeModal(false)} />
      <FeedbackModal isOpen={showFeedbackModal} onClose={() => setShowFeedbackModal(false)} />
      <LegalModals activeModal={activeLegalModal} onClose={() => setActiveLegalModal(null)} />
    </div>
  );
}
