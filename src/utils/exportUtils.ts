import { jsPDF } from 'jspdf';
import { TelemetryPacket, FloorModule, IndiaMartItem } from '../types/vasuki';

export function exportToCSV(data: TelemetryPacket, modules: FloorModule[], items?: IndiaMartItem[]) {
  let csvContent = 'data:text/csv;charset=utf-8,';
  csvContent += '=======================================================\n';
  csvContent += 'PROJECT-VASUKI-X5 OPERATIONAL TELEMETRY & CAPEX REPORT\n';
  csvContent += 'VASUKI-INDICUS-SMART-CLUSTER-2026\n';
  csvContent += 'Vasuki-Indicus-Anusandhan-AI-Lab\n';
  csvContent += `Generated: ${new Date().toISOString()}\n`;
  csvContent += '=======================================================\n\n';

  csvContent += '1. CORE TELEMETRY SNAPSHOT\n';
  csvContent += `Module Identifier,${data.module_id}\n`;
  csvContent += `Target Cluster,${data.cluster_name}\n`;
  csvContent += `Hourly Molding Throughput,${data.injection_molding_throughput_hourly} units/hr\n`;
  csvContent += `SolidWorks PCB API Status,${data.pcb_routing_api_status}\n\n`;

  csvContent += '2. HOURLY PRODUCTION OUTPUT (LAST 8 HOURS)\n';
  csvContent += 'Hour Index,Time Window,Output Units,Target Threshold\n';
  const hours = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];
  data.hourly_output_telemetry.forEach((units, i) => {
    csvContent += `Hour ${i + 1},${hours[i] || 'T+' + i},${units},1500\n`;
  });
  csvContent += '\n';

  csvContent += '3. INDIAMART MACHINERY IMPORT & ASSET VERIFICATION MATRIX\n';
  if (items && items.length > 0) {
    csvContent += 'Asset Verification ID,Equipment Name,Specification,Unit Cost,Serial Number,Assigned Zone,Health Score,Status\n';
    items.forEach((item) => {
      csvContent += `"${item.assetVerificationId}","${item.name}","${item.spec}","${item.cost}","${item.serialNumber}","${item.assignedZone}","${item.healthScore}%","${item.status}"\n`;
    });
  } else {
    csvContent += 'Equipment Name,Specification,Unit Cost,Status\n';
    data.indiamart_machinery_pipeline.forEach((item) => {
      csvContent += `"${item.name}","${item.spec}","${item.cost}","${item.status}"\n`;
    });
  }
  csvContent += '\n';

  csvContent += '4. 5-STOREY CAMPUS SPATIAL & CAPEX MATRIX\n';
  csvContent += 'Floor Level,Module Name,Category,CapEx Range (INR Cr),Target Output / Specs\n';
  modules.forEach((mod) => {
    csvContent += `"${mod.floorNumber}","${mod.name}","${mod.category}","${mod.capexRange}","${mod.specs[0]?.label || ''}: ${mod.specs[0]?.value || ''}"\n`;
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `VASUKI_X5_TELEMETRY_${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportToPDF(data: TelemetryPacket, modules: FloorModule[]) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  // Dark slate background header
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, pageWidth, 42, 'F');

  // Title & Brand
  doc.setFont('courier', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(34, 211, 238);
  doc.text('PROJECT-VASUKI-X5 ARCHITECTURE MATRIX', 14, 18);

  doc.setFont('courier', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(148, 163, 184);
  doc.text('VASUKI-INDICUS-SMART-CLUSTER-2026 · Vasuki-Indicus-Anusandhan-AI-Lab', 14, 26);
  doc.text(`Report Timestamp: ${new Date().toUTCString()} · Status: ACTIVE`, 14, 34);

  // Horizontal Accent Divider
  doc.setDrawColor(6, 182, 212);
  doc.setLineWidth(0.8);
  doc.line(14, 46, pageWidth - 14, 46);

  // Section 1: Telemetry Summary
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text('1. Real-Time Operational Telemetry', 14, 56);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);
  doc.text(`Cluster Target: ${data.cluster_name}`, 14, 64);
  doc.text(`Active Module: ${data.module_id}`, 14, 70);
  doc.text(`Toy Molding Throughput: ${data.injection_molding_throughput_hourly} units/hr (Target: 1,500/hr)`, 14, 76);
  doc.text(`SolidWorks PCB Routing API: ${data.pcb_routing_api_status}`, 14, 82);

  // Section 2: IndiaMART Sourcing Matrix
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text('2. IndiaMART Machinery Procurement Pipeline', 14, 96);

  doc.setFont('courier', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('EQUIPMENT / UNIT', 14, 104);
  doc.text('EST. COST', 130, 104);
  doc.text('PIPELINE STATUS', 165, 104);

  doc.setDrawColor(226, 232, 240);
  doc.line(14, 106, pageWidth - 14, 106);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(30, 41, 59);

  let y = 113;
  data.indiamart_machinery_pipeline.forEach((item, index) => {
    doc.text(`${index + 1}. ${item.name}`, 14, y);
    doc.text(`${item.cost}`, 130, y);
    doc.text(`[${item.status}]`, 165, y);
    y += 7;
  });

  // Section 3: 5-Storey Campus Spatial & CapEx Matrix
  y += 6;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text('3. Campus Spatial Allocation & Baseline CapEx (₹22.5 Cr - ₹33.5 Cr)', 14, y);

  y += 8;
  doc.setFont('courier', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('ZONE / FLOOR', 14, y);
  doc.text('EST. BASE CAPEX (INR)', 130, y);

  doc.setDrawColor(226, 232, 240);
  doc.line(14, y + 2, pageWidth - 14, y + 2);
  y += 8;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(30, 41, 59);

  modules.forEach((mod) => {
    doc.text(`${mod.floorNumber === 'ANNEX' ? 'Annex' : 'Floor ' + mod.floorNumber}: ${mod.name}`, 14, y);
    doc.text(`${mod.capexRange}`, 130, y);
    y += 7;
  });

  // Footer
  doc.setFont('courier', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text('CONFIDENTIAL & PROPRIETARY · PATENT-GRADE SPECIFICATION · VASUKI INDICUS 2026', 14, 285);

  doc.save(`VASUKI_X5_ARCH_REPORT_${Date.now()}.pdf`);
}
