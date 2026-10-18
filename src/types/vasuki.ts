export type ViewMode = 'campus' | 'telemetry' | 'story' | 'capex' | 'apk' | 'dpiit' | 'cnc';

export interface FloorModule {
  id: string;
  floorNumber: number | string;
  name: string;
  title: string;
  category: 'Civil & Entry' | 'AI & Gaming' | 'Sports & Social' | 'Edge Compute & Gym' | 'Telecom & Dining' | 'Industrial Annex';
  capexRange: string;
  capexMinCr: number;
  capexMaxCr: number;
  highlightColor: string;
  description: string;
  coreFunctionalUnits: string[];
  keyTechStack: string[];
  specs: {
    label: string;
    value: string;
  }[];
  activeSensors: {
    id: string;
    type: string;
    reading: string;
    status: 'nominal' | 'warning' | 'active';
  }[];
}

export interface FloorZoneHeatmapData {
  id: string;
  floorId: string;
  floorLevel: string;
  floorName: string;
  zoneName: string;
  subsystem: string;
  throughputDensity: number; // 0 to 100 percentage
  throughputValue: string; // e.g. "1,480 units/hr" or "2.4 Gbps"
  thermalLoadC: number;
  powerKw: number;
  status: 'optimal' | 'high-performance' | 'nominal' | 'surge';
  activeUnitsCount: number;
  operatorOrAgent: string;
  gridCoordinates: {
    col: number; // 1 to 4
    row: number; // 1 to 3
    span?: number;
  };
}

export interface AssetMaintenanceLog {
  id: string;
  timestamp: string;
  technician: string;
  action: string;
  scannerType: string;
  verificationHash: string;
  status: 'passed' | 'service_required' | 'calibrated';
}

export interface IndiaMartItem {
  id: string;
  name: string;
  spec: string;
  cost: string;
  status: 'Ready for PO' | 'Quotation Received' | 'Customs Transit' | 'In Assembly' | 'Live Sync';
  category: 'Toy Fabrication' | 'Edge DC Server' | 'Electronics & PCB' | 'Sports Mechanics';
  supplierLocation: string;
  assetVerificationId: string;
  serialNumber: string;
  assignedZone: string;
  healthScore: number;
  maintenanceStatus: 'VERIFIED_ACTIVE' | 'CALIBRATION_DUE' | 'INSPECTION_PENDING' | 'MAINTENANCE_IN_PROGRESS';
  lastInspection: string;
  nextScheduled: string;
  assignedTechnician: string;
  maintenanceHistory?: AssetMaintenanceLog[];
}

export interface TelemetryPacket {
  module_id: string;
  cluster_name: string;
  injection_molding_throughput_hourly: number;
  pcb_routing_api_status: string;
  hourly_output_telemetry: number[];
  indiamart_machinery_pipeline: {
    name: string;
    spec: string;
    cost: string;
    status: string;
  }[];
  engineering_execution_steps: string[];
  server_timestamp?: string;
  zoneHeatmapOverrides?: Record<string, number>;
}

export interface DialogueLine {
  speaker: 'AMIT' | 'ROSA' | 'SYSTEM';
  role: string;
  avatarColor: string;
  text: string;
  floorTarget?: string;
  technicalMetric?: string;
}

export interface StoryChapter {
  id: number;
  title: string;
  sceneTitle: string;
  description: string;
  lines: DialogueLine[];
  stageAnchor: string;
}
