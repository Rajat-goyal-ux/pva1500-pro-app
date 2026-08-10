import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const exportPdfReport = (reportInfo, stcSpecs, analysisData, isPro = false) => {
  try {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const primaryColor = [3, 7, 18];
    const cyanAccent = [0, 242, 254];
    const passColor = [0, 200, 83];
    const failColor = [255, 23, 68];

    // Executive Header Banner
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, 210, 36, 'F');

    // Decorative Accent Line
    doc.setFillColor(...cyanAccent);
    doc.rect(0, 36, 210, 1.5, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('PVA-1500 SOLMETRIC PV ANALYTICS REPORT', 14, 18);

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...cyanAccent);
    doc.text(isPro ? 'OFFICIAL PRO EDITION • IEC 60891 COMPLIANCE CERTIFICATE' : 'STANDARD EDITION REPORT', 14, 27);

    // Section 1: Executive Metadata & STC Specs (2-Column Summary Box)
    doc.setTextColor(30, 41, 59);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('1. Plant Inspection & STC Specification Reference', 14, 46);

    const metaData = [
      ['Project Name:', reportInfo.projectName || 'Solar Plant Site A', 'Isc STC Rating:', `${stcSpecs.isc_stc} A`],
      ['String / Array ID:', reportInfo.stringName || 'String A-01', 'Voc STC Rating:', `${stcSpecs.voc_stc} V`],
      ['Inspection Date:', reportInfo.date || new Date().toLocaleDateString(), 'Isc Temp Coeff (α):', `+${stcSpecs.alpha} %/°C`],
      ['Certified Inspector:', reportInfo.inspector || 'Rajat Goyal', 'Voc Temp Coeff (β):', `${stcSpecs.beta} %/°C`],
      ['Total Tested Modules:', `${analysisData.length} Modules`, 'Allowed Tolerance:', `±${stcSpecs.tolerance} %`]
    ];

    autoTable(doc, {
      startY: 50,
      body: metaData,
      theme: 'plain',
      styles: { fontSize: 8.5, cellPadding: 2, textColor: [30, 41, 59] },
      columnStyles: {
        0: { fontStyle: 'bold', width: 35 },
        1: { width: 60 },
        2: { fontStyle: 'bold', width: 35 },
        3: { width: 50 }
      }
    });

    // Section 2: IEC 60891 Analysis Table (Isc Data FIRST, Voc Data SECOND!)
    const currentY = (doc.lastAutoTable ? doc.lastAutoTable.finalY : 90) + 8;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 41, 59);
    doc.text('2. Measured Field Data vs IEC 60891 STC Corrected Values', 14, currentY);

    // Columns: Isc FIRST, Voc SECOND!
    const tableHeaders = [[
      'Mod #',
      'Irr\n(W/m²)',
      'Temp\n(°C)',
      'Isc Exp\n(A)',
      'Isc Meas\n(A)',
      'Isc Dev\n(%)',
      'Voc Exp\n(V)',
      'Voc Meas\n(V)',
      'Voc Dev\n(%)',
      'IEC Status'
    ]];
    
    const tableRows = analysisData.map(m => [
      `M${m.idx}`,
      m.irr.toFixed(0),
      m.temp.toFixed(1),
      m.isc_exp.toFixed(2),
      m.isc_meas.toFixed(2),
      `${m.isc_dev > 0 ? '+' : ''}${m.isc_dev.toFixed(1)}%`,
      m.voc_exp.toFixed(2),
      m.voc_meas.toFixed(2),
      `${m.voc_dev > 0 ? '+' : ''}${m.voc_dev.toFixed(1)}%`,
      m.overall_pass ? 'PASS' : 'FAIL'
    ]);

    autoTable(doc, {
      startY: currentY + 4,
      head: tableHeaders,
      body: tableRows,
      theme: 'striped',
      headStyles: {
        fillColor: primaryColor,
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        halign: 'center',
        fontSize: 8,
        cellPadding: 3
      },
      bodyStyles: {
        fontSize: 8,
        halign: 'center',
        cellPadding: 2.5
      },
      didParseCell: (data) => {
        if (data.section === 'body' && data.column.index === 9) {
          const val = data.cell.raw;
          if (val === 'PASS') {
            data.cell.styles.textColor = passColor;
            data.cell.styles.fontStyle = 'bold';
          } else {
            data.cell.styles.textColor = failColor;
            data.cell.styles.fontStyle = 'bold';
          }
        }
      }
    });

    // Section 3: Professional Certification & Sign-off Block
    const finalY = (doc.lastAutoTable ? doc.lastAutoTable.finalY : 200) + 12;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 41, 59);
    doc.text('3. Engineering Verification & Sign-off', 14, finalY);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text(`Report Generated: ${new Date().toLocaleString()} | Algorithm: IEC 60891 Method 1 STC Translation`, 14, finalY + 5);

    // Inspector Signature Line
    doc.setDrawColor(200, 200, 200);
    doc.line(140, finalY + 18, 195, finalY + 18);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 41, 59);
    doc.text('Certified Inspector Signature', 142, finalY + 22);

    if (!isPro) {
      doc.setFontSize(8);
      doc.setTextColor(140, 140, 140);
      doc.setFont('helvetica', 'italic');
      doc.text('Generated via PVA-1500 Pro Free Tier. Upgrade to Pro for digital certificate stamp.', 14, finalY + 22);
    } else {
      doc.setFontSize(8.5);
      doc.setTextColor(0, 150, 80);
      doc.setFont('helvetica', 'bold');
      doc.text('✓ DIGITALLY VERIFIED IEC 60891 INSPECTION CERTIFICATE', 14, finalY + 22);
    }

    // Page Numbering
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(148, 163, 184);
      doc.text(`Page ${i} of ${pageCount} | PVA-1500 Pro Solar Analytics`, 105, 287, { align: 'center' });
    }

    doc.save(`${reportInfo.projectName || 'PVA1500'}_Inspection_Report.pdf`);
    return true;
  } catch (error) {
    console.error('PDF Generation Error:', error);
    alert('PDF Generation Exception: ' + error.message);
    return false;
  }
};
