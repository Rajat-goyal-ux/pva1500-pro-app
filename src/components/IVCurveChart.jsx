'use client';

import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { TrendingUp, Layers, Sparkles } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const IVCurveChart = ({ analysisData }) => {
  const [selectedModuleIdx, setSelectedModuleIdx] = useState(0);

  if (!analysisData || analysisData.length === 0) return null;

  const currentMod = analysisData[selectedModuleIdx] || analysisData[0];
  if (!currentMod) return null;

  const curveData = currentMod.curvePoints || [];
  const labels = curveData.map(p => p.voltage);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Measured I-V Curve (A)',
        data: curveData.map(p => p.currentMeas),
        borderColor: '#00f2fe',
        backgroundColor: (context) => {
          const chart = context.chart;
          if (!chart || !chart.ctx) return 'rgba(0, 242, 254, 0.15)';
          try {
            const ctx = chart.ctx;
            const gradient = ctx.createLinearGradient(0, 0, 0, 240);
            gradient.addColorStop(0, 'rgba(0, 242, 254, 0.3)');
            gradient.addColorStop(1, 'rgba(0, 242, 254, 0.0)');
            return gradient;
          } catch (e) {
            return 'rgba(0, 242, 254, 0.15)';
          }
        },
        fill: true,
        tension: 0.35,
        pointRadius: 3,
        pointBackgroundColor: '#00f2fe',
        pointHoverRadius: 6,
        yAxisID: 'y'
      },
      {
        label: 'Expected STC Curve (A)',
        data: curveData.map(p => p.currentExp),
        borderColor: '#00f5a0',
        borderDash: [5, 5],
        borderWidth: 1.8,
        tension: 0.35,
        pointRadius: 0,
        yAxisID: 'y'
      },
      {
        label: 'Power Curve P-V (W)',
        data: curveData.map(p => p.powerMeas),
        borderColor: '#e056fd',
        backgroundColor: 'transparent',
        borderWidth: 2,
        tension: 0.35,
        pointRadius: 2.5,
        pointBackgroundColor: '#e056fd',
        yAxisID: 'y1'
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false
    },
    plugins: {
      legend: {
        position: 'top',
        align: 'center',
        labels: {
          color: '#94a3b8',
          font: { family: 'JetBrains Mono', size: 10 },
          usePointStyle: true,
          padding: 14
        }
      },
      tooltip: {
        backgroundColor: '#070a12',
        borderColor: '#00f2fe',
        borderWidth: 1,
        titleColor: '#00f2fe',
        titleFont: { family: 'Syne', size: 12, weight: 'bold' },
        bodyColor: '#f8fafc',
        bodyFont: { family: 'JetBrains Mono', size: 10 },
        padding: 10,
        boxPadding: 4
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#94a3b8', font: { family: 'JetBrains Mono', size: 10 } },
        title: { display: true, text: 'Voltage V (Volts)', color: '#64748b', font: { family: 'JetBrains Mono', size: 10 } }
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#00f2fe', font: { family: 'JetBrains Mono', size: 10 } },
        title: { display: true, text: 'Current I (Amps)', color: '#00f2fe', font: { family: 'JetBrains Mono', size: 10 } }
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: { drawOnChartArea: false },
        ticks: { color: '#e056fd', font: { family: 'JetBrains Mono', size: 10 } },
        title: { display: true, text: 'Power P (Watts)', color: '#e056fd', font: { family: 'JetBrains Mono', size: 10 } }
      }
    }
  };

  return (
    <div className="glass-card-transparent p-5 mb-4 w-full text-center flex flex-col items-center justify-center">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4 pb-3 border-b border-white/10 w-full text-center">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-center mx-auto sm:mx-0">
          <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-sm font-bold font-syne text-white flex items-center justify-center sm:justify-start gap-2">
              Visual I-V & P-V Curve Graph Plotter
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '8s' }} />
            </h3>
            <p className="text-[11px] text-slate-400 font-mono">Diode simulation & field data overlay</p>
          </div>
        </div>

        {/* Module Switcher Dropdown */}
        <div className="flex items-center justify-center gap-2 mx-auto sm:mx-0">
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          <select
            value={selectedModuleIdx}
            onChange={(e) => setSelectedModuleIdx(Number(e.target.value))}
            className="input-centered text-xs py-1 px-2.5 min-w-[190px]"
          >
            {analysisData.map((m, idx) => (
              <option key={m.id} value={idx}>
                Module #{m.idx} - {m.fileName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Sleek Compact Chart Canvas Container */}
      <div className="h-[260px] md:h-[290px] w-full">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};
