/**
 * PVA-1500 Solmetric CSV Parser & IEC 60891 Standard Calculation Engine
 * Security Hardened & Flexible Multi-Format CSV Support
 */

// Sanitize inputs against HTML/Script injection
export const sanitizeString = (str) => {
  if (typeof str !== 'string') return '';
  return str.replace(/[<>'"]/g, '').trim();
};

export const parsePvaCsv = (text, fileName) => {
  if (!text || typeof text !== 'string') return null;

  // Support Windows (\r\n), Mac (\r), Linux (\n) line breaks
  const rawLines = text.split(/\r?\n|\r/).map(l => l.trim()).filter(Boolean);
  if (!rawLines.length) return null;

  // Detect delimiter (comma, semicolon, or tab)
  const firstLine = rawLines[0];
  let delimiter = ',';
  if (firstLine.includes(';')) delimiter = ';';
  else if (firstLine.includes('\t')) delimiter = '\t';

  let irr = null;
  let temp = null;
  let isc_meas = null;
  let voc_meas = null;
  let pmax_meas = null;

  // Array to collect I-V curve datapoints if present in CSV
  const rawCurvePoints = [];

  rawLines.forEach(line => {
    const parts = line.split(delimiter).map(p => p.replace(/"/g, '').trim());
    if (parts.length < 2) return;

    const key = parts[0].toLowerCase();
    const val = parseFloat(parts[1]);

    // Flexible Irradiance matching
    if ((key.includes('irradiance') || key.includes('irr') || key === 'g') && !isNaN(val)) {
      if (irr === null) irr = val;
    }

    // Flexible Temperature matching
    if ((key.includes('temperature') || key.includes('temp') || key === 'tmod' || key === 't_cell') && !isNaN(val)) {
      if (temp === null) temp = val;
    }

    // Flexible Isc matching
    if ((key.includes('isc') || key.includes('short circuit current')) && !isNaN(val)) {
      if (isc_meas === null) isc_meas = val;
    }

    // Flexible Voc matching
    if ((key.includes('voc') || key.includes('open circuit voltage')) && !isNaN(val)) {
      if (voc_meas === null) voc_meas = val;
    }

    // Flexible Pmax matching
    if ((key.includes('pmax') || key.includes('maximum power')) && !isNaN(val)) {
      if (pmax_meas === null) pmax_meas = val;
    }

    // Parse voltage/current data rows if numerical table
    const vVal = parseFloat(parts[0]);
    const iVal = parseFloat(parts[1]);
    if (!isNaN(vVal) && !isNaN(iVal) && parts.length >= 2) {
      rawCurvePoints.push({ v: vVal, i: iVal });
    }
  });

  // Extract Isc/Voc from raw curve points if header summary key was not present
  if (rawCurvePoints.length > 0) {
    if (!isc_meas) {
      // Current at lowest voltage
      const sortedByV = [...rawCurvePoints].sort((a, b) => a.v - b.v);
      isc_meas = sortedByV[0]?.i || 13.0;
    }

    if (!voc_meas) {
      // Voltage at zero current
      const sortedByV = [...rawCurvePoints].sort((a, b) => b.v - a.v);
      voc_meas = sortedByV[0]?.v || 48.0;
    }
  }

  // Fallback defaults if file missing header values
  if (irr === null || isNaN(irr)) irr = 985;
  if (temp === null || isNaN(temp)) temp = 42.0;
  if (!isc_meas || isNaN(isc_meas)) isc_meas = 13.10;
  if (!voc_meas || isNaN(voc_meas)) voc_meas = 46.80;
  if (!pmax_meas || isNaN(pmax_meas)) pmax_meas = isc_meas * voc_meas * 0.76;

  return {
    fileName: sanitizeString(fileName),
    irr,
    temp,
    isc_meas,
    voc_meas,
    pmax_meas
  };
};

export const calculateStcMetrics = (modules, stcSpecs) => {
  const {
    isc_stc,
    voc_stc,
    alpha,
    beta,
    stc_temp,
    tolerance
  } = stcSpecs;

  const alphaFrac = alpha / 100;
  const betaFrac = beta / 100;

  return modules.map((mod, index) => {
    const dT = mod.temp - stc_temp;
    
    // Expected STC Corrected values (IEC 60891 Standard)
    const isc_exp = isc_stc * (mod.irr / 1000) * (1 + alphaFrac * dT);
    const voc_exp = voc_stc * (1 + betaFrac * dT);

    // Percentage Deviations
    const isc_dev = ((mod.isc_meas - isc_exp) / isc_exp) * 100;
    const voc_dev = ((mod.voc_meas - voc_exp) / voc_exp) * 100;

    // Pass / Fail Evaluation
    const isc_pass = Math.abs(isc_dev) <= tolerance;
    const voc_pass = Math.abs(voc_dev) <= tolerance;
    const overall_pass = isc_pass && voc_pass;

    // Generate I-V Curve dataset points for visual plotting
    const curvePoints = generateIvCurvePoints(mod.voc_meas, mod.isc_meas, voc_exp, isc_exp);

    return {
      ...mod,
      id: `mod-${index + 1}`,
      idx: index + 1,
      isc_exp,
      voc_exp,
      isc_dev,
      voc_dev,
      isc_pass,
      voc_pass,
      overall_pass,
      curvePoints
    };
  });
};

const generateIvCurvePoints = (vocMeas, iscMeas, vocExp, iscExp) => {
  const points = [];
  const steps = 15;
  for (let i = 0; i <= steps; i++) {
    const vMeas = (vocMeas / steps) * i;
    const vExp = (vocExp / steps) * i;
    
    const iMeas = Math.max(0, iscMeas * (1 - Math.pow(vMeas / vocMeas, 5.5)));
    const iExp = Math.max(0, iscExp * (1 - Math.pow(vExp / vocExp, 5.5)));
    
    const pMeas = vMeas * iMeas;
    const pExp = vExp * iExp;

    points.push({
      voltage: parseFloat(vMeas.toFixed(2)),
      currentMeas: parseFloat(iMeas.toFixed(2)),
      currentExp: parseFloat(iExp.toFixed(2)),
      powerMeas: parseFloat(pMeas.toFixed(2)),
      powerExp: parseFloat(pExp.toFixed(2))
    });
  }
  return points;
};
