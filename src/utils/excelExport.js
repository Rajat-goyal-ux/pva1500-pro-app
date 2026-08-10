import * as XLSX from 'xlsx';

export const exportExcelData = (reportInfo, stcSpecs, analysisData) => {
  const summarySheetData = [
    ['PVA-1500 IV Analysis Report Summary'],
    ['Project Name', reportInfo.projectName || 'Solar Plant'],
    ['String Name', reportInfo.stringName || 'String 01'],
    ['Inspector', reportInfo.inspector || 'Rajat Goyal'],
    ['Date', reportInfo.date || new Date().toLocaleDateString()],
    [''],
    ['STC Parameters'],
    ['Isc STC (A)', stcSpecs.isc_stc],
    ['Voc STC (V)', stcSpecs.voc_stc],
    ['Alpha (%/C)', stcSpecs.alpha],
    ['Beta (%/C)', stcSpecs.beta],
    ['Tolerance (%)', stcSpecs.tolerance]
  ];

  const detailSheetData = analysisData.map(m => ({
    'Module #': `Module ${m.idx}`,
    'File Name': m.fileName,
    'Irradiance (W/m²)': m.irr,
    'Temperature (°C)': m.temp,
    'Isc Measured (A)': m.isc_meas,
    'Isc Expected (A)': parseFloat(m.isc_exp.toFixed(3)),
    'Isc Dev (%)': parseFloat(m.isc_dev.toFixed(2)),
    'Isc Status': m.isc_pass ? 'PASS' : 'FAIL',
    'Voc Measured (V)': m.voc_meas,
    'Voc Expected (V)': parseFloat(m.voc_exp.toFixed(3)),
    'Voc Dev (%)': parseFloat(m.voc_dev.toFixed(2)),
    'Voc Status': m.voc_pass ? 'PASS' : 'FAIL',
    'Overall Status': m.overall_pass ? 'PASS' : 'FAIL'
  }));

  const wb = XLSX.utils.book_new();
  const summaryWs = XLSX.utils.aoa_to_sheet(summarySheetData);
  const detailWs = XLSX.utils.json_to_sheet(detailSheetData);

  XLSX.utils.book_append_sheet(wb, summaryWs, 'Summary');
  XLSX.utils.book_append_sheet(wb, detailWs, 'Module Analysis');

  XLSX.writeFile(wb, `${reportInfo.projectName || 'PVA1500'}_Data_Export.xlsx`);
};
