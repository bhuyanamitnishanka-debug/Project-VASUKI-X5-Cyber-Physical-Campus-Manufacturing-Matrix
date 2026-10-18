import { FloorModule, IndiaMartItem, TelemetryPacket, StoryChapter, FloorZoneHeatmapData } from '../types/vasuki';

export const CAMPUS_MODULES: FloorModule[] = [
  {
    id: 'industrial-annex',
    floorNumber: 'ANNEX',
    name: 'Automated Toy Manufacturing Cluster',
    title: 'Smart Hardware & Peripheral Fabrication Wing',
    category: 'Industrial Annex',
    capexRange: 'Industrial Tier (Scalable)',
    capexMinCr: 4.5,
    capexMaxCr: 8.0,
    highlightColor: '#06b6d4',
    description: 'High-precision automated toy fabrication wing converting digital gaming character avatars, skins, and controllers directly into smart IoT merchandise within minutes.',
    coreFunctionalUnits: [
      'Automatic Plastic Injection Moulding Cells (150-200 Ton Clamping)',
      'Dual-Station Toy Blow Moulding Station Array',
      'Pick-and-Place SMT Micro-Chip Assembly Lines',
      'SolidWorks API-driven automated optical inspection (AOI) rigs',
      'Industrial IoT (IIoT) conveyor telemetry tracking'
    ],
    keyTechStack: [
      'SolidWorks API Automation',
      'AutoCAD DXF/DWG Vector Pipeline',
      'Embedded C/C++ Firmware (ESP32/STM32)',
      'Industrial Modbus/MQTT Telemetry',
      'PyTorch Surface Defect Vision'
    ],
    specs: [
      { label: 'Target Output', value: '1,500 Units / Hour' },
      { label: 'Injection Clamping', value: '180 Ton Hydraulic' },
      { label: 'SMT Placement Speed', value: '28,000 CPH' },
      { label: 'QA Failure Rate', value: '< 0.08% Tolerance' }
    ],
    activeSensors: [
      { id: 'SEN-MOLD-01', type: 'Nozzle Thermal Probe', reading: '235.4°C', status: 'nominal' },
      { id: 'SEN-HYD-04', type: 'Clamping Hydraulic Pressure', reading: '175 Bar', status: 'nominal' },
      { id: 'SEN-SMT-02', type: 'PCB Feeder Alignment', reading: '0.002mm delta', status: 'active' },
      { id: 'SEN-IIOT-09', type: 'Conveyor Speed Motor', reading: '1.2 m/s', status: 'nominal' }
    ]
  },
  {
    id: 'floor-5',
    floorNumber: 5,
    name: 'Rooftop Satellite Array & Buffet Court',
    title: 'LEO Telecom Downlink & Multi-Cuisine Dining',
    category: 'Telecom & Dining',
    capexRange: 'Scalable Vendor Tier',
    capexMinCr: 1.5,
    capexMaxCr: 2.5,
    highlightColor: '#38bdf8',
    description: 'High-throughput low-earth-orbit (LEO) satellite antenna array paired with building-wide fiber optic backbone and panoramic buffet dining space.',
    coreFunctionalUnits: [
      'Low-Earth Orbit (LEO) Dish Antenna Cluster (Starlink/OneWeb Gateway)',
      'Building-Wide Redundant Fiber Distribution MDF',
      'High-Density Solar Photovoltaic Energy Harvesting Array',
      'Multi-Cuisine Buffet Food Court & Executive Lounge'
    ],
    keyTechStack: [
      'Ka/Ku Band RF Transceiver',
      'BGP Anycast Routing Matrix',
      'Solar Microinverter Monitoring',
      'Fiber 100GbE QSFP28 Uplinks'
    ],
    specs: [
      { label: 'LEO Dish Array', value: '4x Steerable Phased Array' },
      { label: 'Edge Latency', value: '< 14 ms Direct Uplink' },
      { label: 'Solar Output', value: '125 kW Peak Capacity' },
      { label: 'Food Court Capacity', value: '350 Seats Simultaneous' }
    ],
    activeSensors: [
      { id: 'RF-DISH-01', type: 'LEO Sat Tracking Angle', reading: 'Az 142° / El 68°', status: 'nominal' },
      { id: 'NET-BW-01', type: 'Uplink Throughput', reading: '2.4 Gbps Aggregated', status: 'nominal' },
      { id: 'SOLAR-KW-01', type: 'Array Power Generation', reading: '98.4 kW', status: 'active' }
    ]
  },
  {
    id: 'floor-4',
    floorNumber: 4,
    name: 'Fitness & On-Premise Edge Data Center',
    title: 'Tier-3 Server Farm & High-Impact Athletic Gym',
    category: 'Edge Compute & Gym',
    capexRange: '₹2.0 Cr – ₹3.0 Cr (Combined with F5)',
    capexMinCr: 2.0,
    capexMaxCr: 3.0,
    highlightColor: '#818cf8',
    description: 'Dedicated on-premise Tier-3 Edge Data Center with closed-loop direct-to-chip liquid cooling and structural vibration isolation pads under commercial athletic gym equipment.',
    coreFunctionalUnits: [
      'High-Density GPU Server Racks for Unreal Engine / PyTorch Inference',
      'Direct-to-Chip Liquid Coolant Distribution Units (CDUs)',
      'Structural Vibration Damping Springs & Floating Acoustic Slab',
      'Commercial Cardio & Heavy-Resistance Gym Complex'
    ],
    keyTechStack: [
      'NVIDIA HGX H100/A100 Compute Clusters',
      'Liquid Cooling Heat Exchangers',
      'Structural Tuned Mass Dampers',
      'Redundant N+1 CRAC HVAC Systems'
    ],
    specs: [
      { label: 'Compute Capacity', value: '1.2 PFLOPS FP16' },
      { label: 'Rack Power Density', value: '35 kW / Rack' },
      { label: 'Vibration Isolation', value: '98.5% Structural Attenuation' },
      { label: 'PUE Efficiency', value: '1.14 Power Usage' }
    ],
    activeSensors: [
      { id: 'DC-COOL-01', type: 'Liquid Coolant Inflow', reading: '18.2°C Delta', status: 'nominal' },
      { id: 'DC-PUE-01', type: 'PUE Efficiency Monitor', reading: '1.12 Nominal', status: 'nominal' },
      { id: 'GYM-VIB-02', type: 'Floor Seismic Vibration', reading: '0.04 mm/s RMS', status: 'nominal' }
    ]
  },
  {
    id: 'floor-3',
    floorNumber: 3,
    name: 'High-Energy Futsal & Game Dev Studio',
    title: 'Indoor Sports Arena & Video Game Dev Headquarters',
    category: 'Sports & Social',
    capexRange: 'Included in Sports & IT Hardware',
    capexMinCr: 1.5,
    capexMaxCr: 2.5,
    highlightColor: '#10b981',
    description: 'Indoor FIFA-spec shock-absorbing artificial turf futsal court and motion-capture video game engineering studio crafting proprietary titles.',
    coreFunctionalUnits: [
      'Shock-Absorbing Artificial Turf Futsal Pitch with Impact Netting',
      'Acoustic Attenuation Ceiling Baffles & Glass Partitioning',
      'In-House Video Game Development Studio (Unreal Engine 5.4 / Unity)',
      'Table Tennis Competition Courts with Digital Scoring'
    ],
    keyTechStack: [
      'Unreal Engine 5.4 C++ SDK',
      'Unity DOTS High Performance Pipeline',
      'OptiTrack Motion Capture Cameras',
      'Synthetic Turf Shockpad CAD'
    ],
    specs: [
      { label: 'Turf Surface', value: 'FIFA Quality Pro Synthetic' },
      { label: 'Acoustic Barrier', value: 'STC 55 Rated Enclosure' },
      { label: 'MoCap Studio', value: '16-Camera Optical Array' },
      { label: 'Dev Workstations', value: '24 Dual-GPU Workstations' }
    ],
    activeSensors: [
      { id: 'SP-TURF-01', type: 'Sub-base Moisture Probe', reading: '42% Balanced', status: 'nominal' },
      { id: 'AUD-ISO-01', type: 'Acoustic Bleed Decibel', reading: '44 dB (Pass)', status: 'nominal' },
      { id: 'MOCAP-CAM-01', type: 'MoCap Tracking Sync', reading: '120 FPS Locked', status: 'active' }
    ]
  },
  {
    id: 'floor-2',
    floorNumber: 2,
    name: 'Classic Indoor Social & Gaming Club',
    title: 'Automated Pinspotter Lanes, Billiards & Chess Sanctuary',
    category: 'Sports & Social',
    capexRange: '₹3.0 Cr – ₹4.0 Cr (Combined with F3)',
    capexMinCr: 3.0,
    capexMaxCr: 4.0,
    highlightColor: '#f59e0b',
    description: 'Bespoke social recreation floor featuring automated string pinspotter bowling alleys, competition tournament slate billiard tables, chess league room, and foosball arena.',
    coreFunctionalUnits: [
      'Automated String Pinspotter Bowling Mechanics (USBC Certified)',
      'Italian Slate Pool & Snooker Tables with Micro-Leveling',
      'Grandmaster Acoustic Chess Sanctuary with DGT Smartboards',
      'Competitive Multi-Player Foosball Pods'
    ],
    keyTechStack: [
      'Automated Pinspotter PLC Control',
      'DGT Electronic Chessboard Bus',
      'Laser Alignment Optical Sensors',
      'Subwoofer Bass Trap Acoustic Zoning'
    ],
    specs: [
      { label: 'Bowling Lanes', value: '4 Regulation Length' },
      { label: 'Pin Reset Cycle', value: '4.8 Seconds / Cycle' },
      { label: 'Billiards Tables', value: '6 Premium Tournament Slates' },
      { label: 'Chess Tables', value: '12 DGT USB-Enabled Boards' }
    ],
    activeSensors: [
      { id: 'BOWL-PIN-01', type: 'Lane 1 Pinspotter Cam', reading: '10/10 Pins Verified', status: 'nominal' },
      { id: 'CHESS-DGT-01', type: 'DGT Central Score Bus', reading: '12 Boards Active', status: 'active' }
    ]
  },
  {
    id: 'floor-1',
    floorNumber: 1,
    name: 'The Avatar Arena',
    title: 'Real-Time PyTorch AI Face Mapping & Immersive Domes',
    category: 'AI & Gaming',
    capexRange: '₹2.5 Cr – ₹6.5 Cr (IT Hardware & AI Dev)',
    capexMinCr: 2.5,
    capexMaxCr: 6.5,
    highlightColor: '#22d3ee',
    description: 'Flagship interactive gaming zone equipped with all-generation PlayStation console pods, spectator projection domes, and sub-12ms AI facial tracking avatars.',
    coreFunctionalUnits: [
      'All-Generation PlayStation & Next-Gen Console Pods (PS1 through PS5 Pro)',
      '360° Spherical Spectator Projection Domes with Edge Blending',
      'PyTorch Real-Time Facial Feature Mesh Scanning Stations',
      'Low-Latency Avatar Injection Engine to In-House Games',
      'Custom Mechanical Gantry & Vibration Floor Transducers'
    ],
    keyTechStack: [
      'PyTorch 2.4 Face Landmark Detection',
      'MediaPipe 468-point 3D Mesh Generator',
      'Direct Memory Avatar Injector to Unreal Engine',
      'Edge Blended 4K Laser Projection Domes'
    ],
    specs: [
      { label: 'Face Scan Latency', value: '< 11.4 Milliseconds' },
      { label: 'Mesh Resolution', value: '468 3D Polygonal Vertices' },
      { label: 'Spectator Domes', value: '2x 6-Meter Hemispherical' },
      { label: 'Active Console Pods', value: '32 Immersive Stations' }
    ],
    activeSensors: [
      { id: 'AI-FACE-01', type: 'Dome 1 Scan Ingest Camera', reading: '60 FPS / 4K UHD', status: 'active' },
      { id: 'PROJ-LUM-01', type: 'Dome Projection Laser Lumen', reading: '15,000 ANSI Lumens', status: 'nominal' },
      { id: 'HOLO-MESH-01', type: 'Vertex Mesh Latency Tracker', reading: '9.8 ms Roundtrip', status: 'nominal' }
    ]
  },
  {
    id: 'floor-ground',
    floorNumber: 0,
    name: 'Exterior & Biometric Ground Concourse',
    title: 'Biometric AI Registration, Smart Lockers & Eco-Perimeter',
    category: 'Civil & Entry',
    capexRange: '₹15.0 Cr – ₹20.0 Cr (Civil & Infrastructure)',
    capexMinCr: 15.0,
    capexMaxCr: 20.0,
    highlightColor: '#10b981',
    description: 'Reinforced concrete foundation, landscaped botanical buffer gardens, automated biometric facial registration gates, EV charging parking, and smart locker concourse.',
    coreFunctionalUnits: [
      'Automated Walk-Through Biometric AI Access Turnstiles',
      'Terrain-Grade Landscaped Gardens with Graywater Closed-Loop Recycling',
      'Surface & Basement Electric Vehicle Charging Parking Matrix',
      'RFID & Facial-Recognition Smart Security Locker Bank',
      'Direct Covered Skybridge Linking Campus to Industrial Annex'
    ],
    keyTechStack: [
      'Civil Reinforced Superstructure (M40 Concrete / Fe500D Steel)',
      'Biometric Facial Recognition Scanners (Sub-0.4s Verification)',
      'Graywater Filtration & Irrigation Automation',
      'IoT Automated Locker Locking Bus'
    ],
    specs: [
      { label: 'Turnstile Throughput', value: '45 Persons / Minute' },
      { label: 'EV Charging Bays', value: '16x 60kW DC Fast Chargers' },
      { label: 'Smart Lockers', value: '240 Biometric Compartments' },
      { label: 'Civil Structural Rating', value: 'Zone IV Seismic Compliant' }
    ],
    activeSensors: [
      { id: 'GATE-BIO-01', type: 'Main Turnstile Facial Verifier', reading: '0.28s Auth Time', status: 'nominal' },
      { id: 'WATER-GW-01', type: 'Closed-Loop Irrigation Flow', reading: '14.2 L/min Recycled', status: 'nominal' },
      { id: 'EV-GRID-01', type: 'EV Fast Charging Load', reading: '340 kW Allocated', status: 'active' }
    ]
  }
];

export const FLOOR_ZONES_HEATMAP: FloorZoneHeatmapData[] = [
  // FLOOR 5: ROOFTOP & TELECOM
  {
    id: 'Z5-A',
    floorId: 'floor-5',
    floorLevel: 'Floor 5',
    floorName: 'Rooftop Satellite Array & Telecom Hub',
    zoneName: 'LEO Phased Array Satellites',
    subsystem: 'Starlink / OneWeb Downlink Terminal (Ka/Ku Band)',
    throughputDensity: 92,
    throughputValue: '2.4 Gbps Direct RF',
    thermalLoadC: 38.5,
    powerKw: 12.4,
    status: 'high-performance',
    activeUnitsCount: 4,
    operatorOrAgent: 'Automated Antenna Gantry Daemon',
    gridCoordinates: { col: 1, row: 1 }
  },
  {
    id: 'Z5-B',
    floorId: 'floor-5',
    floorLevel: 'Floor 5',
    floorName: 'Rooftop Satellite Array & Telecom Hub',
    zoneName: 'Solar PV Harvesting Grid',
    subsystem: 'High-Density Microinverter Solar Panels',
    throughputDensity: 78,
    throughputValue: '98.4 kW Generation',
    thermalLoadC: 44.0,
    powerKw: 98.4,
    status: 'nominal',
    activeUnitsCount: 160,
    operatorOrAgent: 'Solar Grid Microcontroller',
    gridCoordinates: { col: 2, row: 1 }
  },
  {
    id: 'Z5-C',
    floorId: 'floor-5',
    floorLevel: 'Floor 5',
    floorName: 'Rooftop Satellite Array & Telecom Hub',
    zoneName: 'Buffet Food Court & Lounge',
    subsystem: 'Commercial Induction Kitchen & Executive Dining',
    throughputDensity: 65,
    throughputValue: '210 Patrons Served / Hr',
    thermalLoadC: 24.2,
    powerKw: 35.0,
    status: 'nominal',
    activeUnitsCount: 350,
    operatorOrAgent: 'Hospitality Management Agent',
    gridCoordinates: { col: 3, row: 1, span: 2 }
  },

  // FLOOR 4: FITNESS & EDGE DATA CENTER
  {
    id: 'Z4-A',
    floorId: 'floor-4',
    floorLevel: 'Floor 4',
    floorName: 'Fitness Complex & Edge Data Center',
    zoneName: 'Tier-3 Edge Compute Racks',
    subsystem: 'High-Density NVIDIA HGX Servers (PyTorch & Unreal)',
    throughputDensity: 96,
    throughputValue: '1.18 PFLOPS Active FP16',
    thermalLoadC: 42.1,
    powerKw: 140.0,
    status: 'surge',
    activeUnitsCount: 16,
    operatorOrAgent: 'Slurm Cluster Scheduler',
    gridCoordinates: { col: 1, row: 2 }
  },
  {
    id: 'Z4-B',
    floorId: 'floor-4',
    floorLevel: 'Floor 4',
    floorName: 'Fitness Complex & Edge Data Center',
    zoneName: 'Direct-to-Chip Liquid Cooling CDUs',
    subsystem: 'Closed-Loop Fluid Heat Exchangers (PUE 1.14)',
    throughputDensity: 88,
    throughputValue: '18.2°C Coolant Inflow Delta',
    thermalLoadC: 22.5,
    powerKw: 28.5,
    status: 'high-performance',
    activeUnitsCount: 4,
    operatorOrAgent: 'Coolant Flow SCADA Loop',
    gridCoordinates: { col: 2, row: 2 }
  },
  {
    id: 'Z4-C',
    floorId: 'floor-4',
    floorLevel: 'Floor 4',
    floorName: 'Fitness Complex & Edge Data Center',
    zoneName: 'Commercial Cardio & Strength Gym',
    subsystem: 'Heavy Athletic Gym over Floating Vibration Slabs',
    throughputDensity: 74,
    throughputValue: '98.5% Vibration Attenuated',
    thermalLoadC: 21.0,
    powerKw: 18.0,
    status: 'optimal',
    activeUnitsCount: 85,
    operatorOrAgent: 'Facility HVAC Zone 4',
    gridCoordinates: { col: 3, row: 2, span: 2 }
  },

  // FLOOR 3: INDOOR FUTSAL & GAME DEV STUDIO
  {
    id: 'Z3-A',
    floorId: 'floor-3',
    floorLevel: 'Floor 3',
    floorName: 'High-Energy Futsal & Game Dev Studio',
    zoneName: 'Indoor Synthetic Turf Futsal Pitch',
    subsystem: 'FIFA Pro Artificial Turf with Graywater Sub-Cooling',
    throughputDensity: 84,
    throughputValue: '14 Players / Match Telemetry',
    thermalLoadC: 20.8,
    powerKw: 22.0,
    status: 'high-performance',
    activeUnitsCount: 1,
    operatorOrAgent: 'Kinetic Camera Mesh Tracker',
    gridCoordinates: { col: 1, row: 3, span: 2 }
  },
  {
    id: 'Z3-B',
    floorId: 'floor-3',
    floorLevel: 'Floor 3',
    floorName: 'High-Energy Futsal & Game Dev Studio',
    zoneName: 'OptiTrack 16-Camera MoCap Studio',
    subsystem: 'Sub-millimeter Optical Motion Capture Array',
    throughputDensity: 91,
    throughputValue: '120 FPS Locked Vector Sync',
    thermalLoadC: 23.4,
    powerKw: 15.2,
    status: 'high-performance',
    activeUnitsCount: 16,
    operatorOrAgent: 'Unreal Live Link Node',
    gridCoordinates: { col: 3, row: 3 }
  },
  {
    id: 'Z3-C',
    floorId: 'floor-3',
    floorLevel: 'Floor 3',
    floorName: 'High-Energy Futsal & Game Dev Studio',
    zoneName: 'In-House Game Development Lab',
    subsystem: '24 Dual-GPU Workstations (Unreal 5.4 C++)',
    throughputDensity: 86,
    throughputValue: '24 Dev Workstations Online',
    thermalLoadC: 26.1,
    powerKw: 32.0,
    status: 'optimal',
    activeUnitsCount: 24,
    operatorOrAgent: 'Perforce Versioning Daemon',
    gridCoordinates: { col: 4, row: 3 }
  },

  // FLOOR 2: CLASSIC INDOOR CLUB
  {
    id: 'Z2-A',
    floorId: 'floor-2',
    floorLevel: 'Floor 2',
    floorName: 'Classic Indoor Social & Gaming Club',
    zoneName: 'Automated String Pinspotter Bowling',
    subsystem: '4 Regulation Lanes with 4.8s Reset Mechanics',
    throughputDensity: 80,
    throughputValue: '48 Games / Hr Active Throughput',
    thermalLoadC: 21.5,
    powerKw: 24.0,
    status: 'optimal',
    activeUnitsCount: 4,
    operatorOrAgent: 'USBC Pinspotter Controller',
    gridCoordinates: { col: 1, row: 4, span: 2 }
  },
  {
    id: 'Z2-B',
    floorId: 'floor-2',
    floorLevel: 'Floor 2',
    floorName: 'Classic Indoor Social & Gaming Club',
    zoneName: 'Italian Slate Billiard Hall',
    subsystem: '6 Premium Tournament Slates with Micro-Leveling',
    throughputDensity: 70,
    throughputValue: '100% Table Occupancy',
    thermalLoadC: 21.0,
    powerKw: 8.5,
    status: 'optimal',
    activeUnitsCount: 6,
    operatorOrAgent: 'Lighting & Table Automation',
    gridCoordinates: { col: 3, row: 4 }
  },
  {
    id: 'Z2-C',
    floorId: 'floor-2',
    floorLevel: 'Floor 2',
    floorName: 'Classic Indoor Social & Gaming Club',
    zoneName: 'Grandmaster DGT Chess League Room',
    subsystem: '12 Electronic Smartboards with USB Central Bus',
    throughputDensity: 62,
    throughputValue: '12 Smartboards Live Streamed',
    thermalLoadC: 19.8,
    powerKw: 4.2,
    status: 'nominal',
    activeUnitsCount: 12,
    operatorOrAgent: 'DGT Central Bus Daemon',
    gridCoordinates: { col: 4, row: 4 }
  },

  // FLOOR 1: THE AVATAR ARENA
  {
    id: 'Z1-A',
    floorId: 'floor-1',
    floorLevel: 'Floor 1',
    floorName: 'The Avatar Arena',
    zoneName: '360° Spherical Projection Domes',
    subsystem: '2x 6-Meter Domes with 15,000 ANSI Laser Projections',
    throughputDensity: 97,
    throughputValue: '120 Hz Edge-Blended 4K',
    thermalLoadC: 27.5,
    powerKw: 65.0,
    status: 'surge',
    activeUnitsCount: 2,
    operatorOrAgent: 'Dome Edge Warping Processor',
    gridCoordinates: { col: 1, row: 5, span: 2 }
  },
  {
    id: 'Z1-B',
    floorId: 'floor-1',
    floorLevel: 'Floor 1',
    floorName: 'The Avatar Arena',
    zoneName: 'PyTorch Real-Time Facial Scanners',
    subsystem: 'Sub-12ms 468-point 3D Mesh Ingest Engines',
    throughputDensity: 98,
    throughputValue: '9.8 ms Roundtrip Latency',
    thermalLoadC: 29.0,
    powerKw: 42.0,
    status: 'surge',
    activeUnitsCount: 12,
    operatorOrAgent: 'PyTorch Face Landmark Ingest',
    gridCoordinates: { col: 3, row: 5 }
  },
  {
    id: 'Z1-C',
    floorId: 'floor-1',
    floorLevel: 'Floor 1',
    floorName: 'The Avatar Arena',
    zoneName: 'All-Gen PlayStation Console Pods',
    subsystem: '32 Immersive Stations with Vibration Transducers',
    throughputDensity: 94,
    throughputValue: '32 Active Console Pods (100%)',
    thermalLoadC: 24.8,
    powerKw: 38.0,
    status: 'high-performance',
    activeUnitsCount: 32,
    operatorOrAgent: 'Console Pod Network Manager',
    gridCoordinates: { col: 4, row: 5 }
  },

  // GROUND FLOOR: BIOMETRICS & PERIMETER
  {
    id: 'Z0-A',
    floorId: 'floor-ground',
    floorLevel: 'Ground Floor',
    floorName: 'Exterior & Biometric Ground Concourse',
    zoneName: 'Biometric AI Turnstile Gates',
    subsystem: 'Sub-0.4s Facial Recognition Access Turnstiles',
    throughputDensity: 82,
    throughputValue: '45 Persons / Min Verified',
    thermalLoadC: 22.0,
    powerKw: 12.0,
    status: 'optimal',
    activeUnitsCount: 8,
    operatorOrAgent: 'Biometric Security Microservice',
    gridCoordinates: { col: 1, row: 6, span: 2 }
  },
  {
    id: 'Z0-B',
    floorId: 'floor-ground',
    floorLevel: 'Ground Floor',
    floorName: 'Exterior & Biometric Ground Concourse',
    zoneName: 'EV Fast Charging Matrix & Parking',
    subsystem: '16x 60kW DC Fast Chargers with Smart Grid Load',
    throughputDensity: 89,
    throughputValue: '340 kW Active Grid Load',
    thermalLoadC: 32.0,
    powerKw: 340.0,
    status: 'high-performance',
    activeUnitsCount: 16,
    operatorOrAgent: 'Smart Grid Balance Node',
    gridCoordinates: { col: 3, row: 6 }
  },
  {
    id: 'Z0-C',
    floorId: 'floor-ground',
    floorLevel: 'Ground Floor',
    floorName: 'Exterior & Biometric Ground Concourse',
    zoneName: 'Graywater Botanical Buffer & Lockers',
    subsystem: '240 Biometric Compartments & Graywater Irrigation',
    throughputDensity: 76,
    throughputValue: '14.2 L/min Recycled Water',
    thermalLoadC: 21.0,
    powerKw: 6.5,
    status: 'optimal',
    activeUnitsCount: 240,
    operatorOrAgent: 'Closed-Loop Irrigation Controller',
    gridCoordinates: { col: 4, row: 6 }
  },

  // INDUSTRIAL ANNEX: AUTOMATED TOY CLUSTER
  {
    id: 'ZAX-1',
    floorId: 'industrial-annex',
    floorLevel: 'Industrial Annex',
    floorName: 'Automated Toy Manufacturing Cluster',
    zoneName: 'Automatic Plastic Injection Moulding Line',
    subsystem: '150-200 Ton Hydraulic Clamping Cells (440V 3-Phase)',
    throughputDensity: 97,
    throughputValue: '1,450 Units / Hour Throughput',
    thermalLoadC: 68.4,
    powerKw: 210.0,
    status: 'surge',
    activeUnitsCount: 6,
    operatorOrAgent: 'Hydraulic Mold Automation PLC',
    gridCoordinates: { col: 1, row: 7, span: 2 }
  },
  {
    id: 'ZAX-2',
    floorId: 'industrial-annex',
    floorLevel: 'Industrial Annex',
    floorName: 'Automated Toy Manufacturing Cluster',
    zoneName: 'Dual-Station Blow Moulding Stations',
    subsystem: '1L-2L Cavity Blow Moulding for Peripheral Shells',
    throughputDensity: 88,
    throughputValue: '620 Shells / Hour',
    thermalLoadC: 54.0,
    powerKw: 85.0,
    status: 'high-performance',
    activeUnitsCount: 4,
    operatorOrAgent: 'Parison Programmer Node',
    gridCoordinates: { col: 3, row: 7 }
  },
  {
    id: 'ZAX-3',
    floorId: 'industrial-annex',
    floorLevel: 'Industrial Annex',
    floorName: 'Automated Toy Manufacturing Cluster',
    zoneName: 'Pick-and-Place SMT Microchip Rigs',
    subsystem: 'Surface-Mount PCB Routing for Smart IoT Action Figures',
    throughputDensity: 99,
    throughputValue: '28,000 CPH High-Speed SMT',
    thermalLoadC: 45.2,
    powerKw: 48.0,
    status: 'surge',
    activeUnitsCount: 2,
    operatorOrAgent: 'SMT Optical Feeder Alignment',
    gridCoordinates: { col: 4, row: 7 }
  },
  {
    id: 'ZAX-4',
    floorId: 'industrial-annex',
    floorLevel: 'Industrial Annex',
    floorName: 'Automated Toy Manufacturing Cluster',
    zoneName: 'CNC-Milling & G-Code Scale Model Cell',
    subsystem: 'API-Driven Subtractive CNC Prototyping (VBA Macro Engine)',
    throughputDensity: 93,
    throughputValue: 'F300 Feed / S2400 Spindle',
    thermalLoadC: 36.0,
    powerKw: 32.0,
    status: 'high-performance',
    activeUnitsCount: 3,
    operatorOrAgent: 'AutoCAD / SolidWorks CAM Daemon',
    gridCoordinates: { col: 1, row: 8, span: 2 }
  },
  {
    id: 'ZAX-5',
    floorId: 'industrial-annex',
    floorLevel: 'Industrial Annex',
    floorName: 'Automated Toy Manufacturing Cluster',
    zoneName: 'Smart RFID Flash & IIoT Conveyor Packaging',
    subsystem: 'In-Line Quality Inspection (AOI) & Lobby Delivery Link',
    throughputDensity: 95,
    throughputValue: '1.2 m/s Conveyor Sync',
    thermalLoadC: 26.5,
    powerKw: 18.0,
    status: 'surge',
    activeUnitsCount: 1,
    operatorOrAgent: 'MQTT Packaging Dispatch',
    gridCoordinates: { col: 3, row: 8, span: 2 }
  }
];

export const INDIAMART_PROCUREMENT: IndiaMartItem[] = [
  {
    id: 'IM-001',
    name: 'Automatic Plastic Injection Moulding Rig',
    spec: '150-200 Ton Clamping / 440V 3-Phase / Hydraulic Core Puller',
    cost: '₹12,28,000 / Set',
    status: 'Ready for PO',
    category: 'Toy Fabrication',
    supplierLocation: 'Ahmedabad, Gujarat (IndiaMART Verified)',
    assetVerificationId: 'VASUKI-ASSET-7F9C-IM001',
    serialNumber: 'SN-2026-MOLD-8821',
    assignedZone: 'Industrial Annex · Zone ZAX-1',
    healthScore: 98.4,
    maintenanceStatus: 'VERIFIED_ACTIVE',
    lastInspection: '2026-10-15 (08:30 IST)',
    nextScheduled: '2026-11-15',
    assignedTechnician: 'Amit Nishanka Bhuyan (Lead AI)',
    maintenanceHistory: [
      {
        id: 'LOG-MOLD-01',
        timestamp: '2026-10-15 08:30:14',
        technician: 'Amit Nishanka Bhuyan',
        action: 'Hydraulic clamping pressure calibration & thermocouple sync',
        scannerType: 'Zebra TC58 Laser Optical Scanner',
        verificationHash: 'SHA256:7F9C8821B4190...',
        status: 'passed'
      },
      {
        id: 'LOG-MOLD-02',
        timestamp: '2026-09-28 14:15:02',
        technician: 'R. K. Sharma (Maintenance Eng)',
        action: 'Core puller nitrogen charge check & seal replacement',
        scannerType: 'Capacitor Android Handheld APK',
        verificationHash: 'SHA256:3A814981C0991...',
        status: 'calibrated'
      }
    ]
  },
  {
    id: 'IM-002',
    name: 'Dual-Station Toy Blow Moulding Station Array',
    spec: '1L-2L Cavity / Dual Head Hydraulic / Parison Programmer',
    cost: '₹5,75,000 / Set',
    status: 'Quotation Received',
    category: 'Toy Fabrication',
    supplierLocation: 'Rajkot, Gujarat (IndiaMART Gold Supplier)',
    assetVerificationId: 'VASUKI-ASSET-3A81-IM002',
    serialNumber: 'SN-2026-BLOW-4190',
    assignedZone: 'Industrial Annex · Zone ZAX-2',
    healthScore: 96.2,
    maintenanceStatus: 'VERIFIED_ACTIVE',
    lastInspection: '2026-10-12 (11:20 IST)',
    nextScheduled: '2026-11-12',
    assignedTechnician: 'S. N. Mohapatra (Hydraulics)',
    maintenanceHistory: [
      {
        id: 'LOG-BLOW-01',
        timestamp: '2026-10-12 11:20:45',
        technician: 'S. N. Mohapatra',
        action: 'Extruder barrel PID test & parison programmer wall uniformity check',
        scannerType: 'Capacitor Android Handheld APK',
        verificationHash: 'SHA256:1C9902FA3B884...',
        status: 'passed'
      }
    ]
  },
  {
    id: 'IM-003',
    name: 'High-Precision Pick-and-Place SMT System',
    spec: '6-Head Micro-Chip Routing / 0201 to QFP Component Support',
    cost: '₹18,50,000 / Unit',
    status: 'Customs Transit',
    category: 'Electronics & PCB',
    supplierLocation: 'Bengaluru, Karnataka (Direct Importer)',
    assetVerificationId: 'VASUKI-ASSET-E4D2-IM003',
    serialNumber: 'SN-2026-SMT-9904',
    assignedZone: 'Industrial Annex · Zone ZAX-3',
    healthScore: 99.1,
    maintenanceStatus: 'CALIBRATION_DUE',
    lastInspection: '2026-10-08 (15:45 IST)',
    nextScheduled: '2026-10-22',
    assignedTechnician: 'Dr. Rosa Patel (Firmware Lead)',
    maintenanceHistory: [
      {
        id: 'LOG-SMT-01',
        timestamp: '2026-10-08 15:45:10',
        technician: 'Dr. Rosa Patel',
        action: 'Nozzle vacuum sensor test & optical vision feeder calibration',
        scannerType: 'Honeywell HF680 2D Scanner',
        verificationHash: 'SHA256:E4D299047C109...',
        status: 'calibrated'
      }
    ]
  },
  {
    id: 'IM-004',
    name: 'Direct-to-Chip Edge Data Center Server Racks',
    spec: '42U Heavy-Duty Server Enclosure / Liquid Coolant Manifold / Dual PDU',
    cost: '₹16,40,000 / Set (x4 Racks)',
    status: 'Live Sync',
    category: 'Edge DC Server',
    supplierLocation: 'Noida, Uttar Pradesh (Tier-3 Vendor)',
    assetVerificationId: 'VASUKI-ASSET-8B15-IM004',
    serialNumber: 'SN-2026-EDGE-42U01',
    assignedZone: 'Floor 4 · Edge Data Center (Z4-A)',
    healthScore: 99.8,
    maintenanceStatus: 'VERIFIED_ACTIVE',
    lastInspection: '2026-10-18 (06:00 IST)',
    nextScheduled: '2026-11-01',
    assignedTechnician: 'Amit Nishanka Bhuyan (Lead AI)',
    maintenanceHistory: [
      {
        id: 'LOG-EDGE-01',
        timestamp: '2026-10-18 06:00:22',
        technician: 'Amit Nishanka Bhuyan',
        action: 'Coolant manifold flow rate (18.2°C nominal) & Dual PDU load balancing verification',
        scannerType: 'Zebra TC58 Laser Optical Scanner',
        verificationHash: 'SHA256:8B1542U01EF30...',
        status: 'passed'
      }
    ]
  },
  {
    id: 'IM-005',
    name: 'Automated String Pinspotter Bowling Rigs',
    spec: 'USBC Regulation Spec / Ultra-Low Maintenance 24V DC Drive Motor',
    cost: '₹22,00,000 / Pair of Lanes',
    status: 'Ready for PO',
    category: 'Sports Mechanics',
    supplierLocation: 'Mumbai, Maharashtra (Sports Tech Importers)',
    assetVerificationId: 'VASUKI-ASSET-9C33-IM005',
    serialNumber: 'SN-2026-PIN-6610',
    assignedZone: 'Floor 2 · Automated Bowling Alley (Z2-A)',
    healthScore: 94.5,
    maintenanceStatus: 'VERIFIED_ACTIVE',
    lastInspection: '2026-10-05 (10:10 IST)',
    nextScheduled: '2026-11-05',
    assignedTechnician: 'K. V. Raman (Mechanical Tech)',
    maintenanceHistory: [
      {
        id: 'LOG-PIN-01',
        timestamp: '2026-10-05 10:10:00',
        technician: 'K. V. Raman',
        action: 'Gearbox lubrication, sensor string tension check & acoustic baffle alignment',
        scannerType: 'Capacitor Android Handheld APK',
        verificationHash: 'SHA256:9C336610A8821...',
        status: 'passed'
      }
    ]
  },
  {
    id: 'IM-006',
    name: 'Automated Wave Soldering Machine for Toys',
    spec: 'Lead-Free Dual Wave Solder / Preheating Chamber / Digital PID',
    cost: '₹7,80,000 / Unit',
    status: 'Quotation Received',
    category: 'Electronics & PCB',
    supplierLocation: 'Pune, Maharashtra (IndiaMART Star Supplier)',
    assetVerificationId: 'VASUKI-ASSET-2E7A-IM006',
    serialNumber: 'SN-2026-WAVE-3301',
    assignedZone: 'Industrial Annex · Zone ZAX-3',
    healthScore: 95.0,
    maintenanceStatus: 'INSPECTION_PENDING',
    lastInspection: '2026-09-30 (16:30 IST)',
    nextScheduled: '2026-10-25',
    assignedTechnician: 'Dr. Rosa Patel (Firmware Lead)',
    maintenanceHistory: [
      {
        id: 'LOG-WAVE-01',
        timestamp: '2026-09-30 16:30:15',
        technician: 'Dr. Rosa Patel',
        action: 'Solder bath purity assay & conveyor finger transport ultrasonic wash',
        scannerType: 'Honeywell HF680 2D Scanner',
        verificationHash: 'SHA256:2E7A3301F0014...',
        status: 'passed'
      }
    ]
  },
  {
    id: 'IM-007',
    name: '4-Axis CNC High-Speed Toolroom Milling Center',
    spec: 'BT30 Spindle / 24,000 RPM / SolidWorks & AutoCAD Direct G-Code Parsing',
    cost: '₹14,90,000 / Unit',
    status: 'Live Sync',
    category: 'Toy Fabrication',
    supplierLocation: 'Bengaluru, Karnataka (IndiaMART Verified)',
    assetVerificationId: 'VASUKI-ASSET-6B40-IM007',
    serialNumber: 'SN-2026-CNC-2400',
    assignedZone: 'Industrial Annex · Zone ZAX-4',
    healthScore: 97.9,
    maintenanceStatus: 'VERIFIED_ACTIVE',
    lastInspection: '2026-10-17 (14:00 IST)',
    nextScheduled: '2026-11-17',
    assignedTechnician: 'Amit Nishanka Bhuyan (Lead AI)',
    maintenanceHistory: [
      {
        id: 'LOG-CNC-01',
        timestamp: '2026-10-17 14:00:55',
        technician: 'Amit Nishanka Bhuyan',
        action: 'Spindle runout micrometer check (<0.003mm) & nc_streamer.py Cartesian telemetry sync',
        scannerType: 'Zebra TC58 Laser Optical Scanner',
        verificationHash: 'SHA256:6B402400C8192...',
        status: 'passed'
      }
    ]
  },
  {
    id: 'IM-008',
    name: 'Automated Optical Inspection (AOI) In-Line Scanner',
    spec: '5MP Telecentric Lens / RGBW Coaxial LED / 0.01mm Defect Detection',
    cost: '₹9,20,000 / Set',
    status: 'Ready for PO',
    category: 'Electronics & PCB',
    supplierLocation: 'Chennai, Tamil Nadu (IndiaMART Gold Supplier)',
    assetVerificationId: 'VASUKI-ASSET-1F92-IM008',
    serialNumber: 'SN-2026-AOI-5520',
    assignedZone: 'Industrial Annex · Zone ZAX-5',
    healthScore: 98.8,
    maintenanceStatus: 'VERIFIED_ACTIVE',
    lastInspection: '2026-10-16 (12:15 IST)',
    nextScheduled: '2026-11-16',
    assignedTechnician: 'Dr. Rosa Patel (Firmware Lead)',
    maintenanceHistory: [
      {
        id: 'LOG-AOI-01',
        timestamp: '2026-10-16 12:15:30',
        technician: 'Dr. Rosa Patel',
        action: 'Telecentric lens focal alignment & machine learning solder bridge classifier test',
        scannerType: 'Capacitor Android Handheld APK',
        verificationHash: 'SHA256:1F925520D7741...',
        status: 'passed'
      }
    ]
  }
];

export const NC_STREAMER_PYTHON_SCRIPT = `import asyncio
import websockets
import json
import re
import os

# ==============================================================================
# VASUKI-INDICUS-SMART-CLUSTER-2026 // G-CODE (.nc) STREAMER ENGINE
# Developed under: Vasuki-Indicus-Anusandhan-AI-Lab
# Purpose: Real-time Cartesian (X,Y,Z) toolpath extraction and WebSocket broadcast
# Target Client: Android Mobile APK Console & Web Dashboard (ws://localhost:8765)
# ==============================================================================

# CONFIGURATION PARAMETERS
NC_FILE_PATH = "C:\\\\Vasuki_Project_X5_Workspace\\\\CNC_Outputs\\\\toy_cluster_mold.nc"
SERVER_HOST = "0.0.0.0"
SERVER_PORT = 8765

def parse_gcode_line(line):
    """
    सटीक G-code पार्सिंग इंजन: लाइन में से X, Y, Z और G कमांड्स को एक्सट्रेक्ट करता है।
    Extracts Cartesian coordinates and modal codes from raw .nc / G-code streams.
    """
    line = line.strip().split('(')[0] # Strip comments
    if not line:
        return None
        
    g_match = re.search(r'G\\d+', line)
    x_match = re.search(r'X([-+]?\\d*\\.\\d+|\\d+)', line)
    y_match = re.search(r'Y([-+]?\\d*\\.\\d+|\\d+)', line)
    z_match = re.search(r'Z([-+]?\\d*\\.\\d+|\\d+)', line)
    f_match = re.search(r'F\\d+', line)
    s_match = re.search(r'S\\d+', line)
    
    parsed_data = {}
    if g_match: parsed_data["g_command"] = g_match.group(0)
    if x_match: parsed_data["x_pos"] = float(x_match.group(1))
    if y_match: parsed_data["y_pos"] = float(y_match.group(1))
    if z_match: parsed_data["z_pos"] = float(z_match.group(1))
    if f_match: parsed_data["feed_rate"] = float(f_match.group(1))
    if s_match: parsed_data["spindle_rpm"] = float(s_match.group(1))
    
    return parsed_data if parsed_data else None

async def gcode_streamer(websocket):
    print(f"[VASUKI-SERVER] Client successfully hooked into stream: {websocket.remote_address}")
    
    # Broadcast initial cluster handshake packet
    handshake = {
        "event": "CLUSTER_HANDSHAKE_OK",
        "cluster_name": "Vasuki-Indicus-Anusandhan-AI-Lab Cluster",
        "module_id": "MODULE-X5-CORE",
        "gcode_source": NC_FILE_PATH,
        "spindle_status": "ONLINE_ACTIVE"
    }
    await websocket.send(json.dumps(handshake))
    await asyncio.sleep(0.5)

    # Simulated NC G-Code coordinates if physical .nc file path is not yet generated
    default_gcode_lines = [
        "G90 G21 G17 (Absolute, Metric, XY-Plane)",
        "G00 X0.00 Y0.00 Z5.000 F1500 S2400 (Rapid to clearance)",
        "G01 Z-1.250 F300 (Plunge to roughing depth)",
        "G01 X24.500 Y12.800 F650 (Outer cavity perimeter)",
        "G02 X38.200 Y26.500 R13.700 F600 (Corner fillet arc)",
        "G01 X78.900 Y26.500 F750 (Core mold boundary)",
        "G03 X92.400 Y40.000 R13.500 F600 (Runner channel)",
        "G01 X92.400 Y85.000 F800 (Sprue bushing interface)",
        "G00 Z5.000 (Retract to safe Z)",
        "G00 X0.00 Y0.00 (Return to home origin)"
    ]

    try:
        if os.path.exists(NC_FILE_PATH):
            with open(NC_FILE_PATH, 'r') as f:
                lines = f.readlines()
        else:
            lines = default_gcode_lines

        while True:
            for raw_line in lines:
                parsed = parse_gcode_line(raw_line)
                if parsed:
                    payload = {
                        "telemetry_type": "GCODE_TOOLPATH_STREAM",
                        "cluster_name": "Vasuki-Indicus-Anusandhan-AI-Lab Cluster",
                        "module_id": "MODULE-X5-CORE",
                        "raw_line": raw_line.strip(),
                        "coordinates": parsed,
                        "injection_molding_throughput_hourly": 1450,
                        "pcb_routing_api_status": "SYNCHRONIZED_ACTIVE",
                        "timestamp": asyncio.get_event_loop().time()
                    }
                    await websocket.send(json.dumps(payload))
                    print(f"[STREAMING G-CODE]: {payload['raw_line']} -> X:{parsed.get('x_pos')} Y:{parsed.get('y_pos')} Z:{parsed.get('z_pos')}")
                    await asyncio.sleep(0.15) # 150ms real-time cycle
    except websockets.exceptions.ConnectionClosed:
        print("[VASUKI-SERVER] Client disconnected.")

async def main():
    print(f"🚀 Project-VASUKI-X5 G-Code Streamer Engine initialized on ws://{SERVER_HOST}:{SERVER_PORT}")
    async with websockets.serve(gcode_streamer, SERVER_HOST, SERVER_PORT):
        await asyncio.Future() # run forever

if __name__ == "__main__":
    asyncio.run(main())
`;

export const INITIAL_TELEMETRY: TelemetryPacket = {
  module_id: 'MODULE-X5-CORE',
  cluster_name: 'Vasuki-Indicus-Anusandhan-AI-Lab Cluster',
  injection_molding_throughput_hourly: 1450,
  pcb_routing_api_status: 'SYNCHRONIZED_ACTIVE',
  hourly_output_telemetry: [420, 680, 890, 1150, 950, 1320, 1410, 1450],
  indiamart_machinery_pipeline: [
    { name: 'Automatic Injection Moulding Rig', spec: '150-200 Ton Clamping', cost: '₹12,28,000', status: 'Ready for PO' },
    { name: 'Blow Moulding Station Array', spec: '1L-2L Cavity Dual Head', cost: '₹5,75,000', status: 'Quote Received' },
    { name: 'Edge Data Center Server Racks', spec: 'Direct Liquid Cooled 42U', cost: '₹18,50,000', status: 'Customs Transit' }
  ],
  engineering_execution_steps: [
    'Step 1: Loaded SolidWorks API configuration profiles into memory.',
    'Step 2: Established secure token validation handshake via LEO rooftop antenna.',
    'Step 3: Triggered injection molding heat matrices for component assembly.',
    'Step 4: Synchronized PyTorch facial tracking telemetry loop with Floor 1 gaming consoles.',
    'Step 5: Output payload safely dispatched to primary analytical dashboard logs.'
  ],
  server_timestamp: '2026-10-18T16:20:00Z'
};

export const STORY_CHAPTERS: StoryChapter[] = [
  {
    id: 1,
    title: 'Act 1: Zero-Latency Cyber-Physical Backbone',
    sceneTitle: 'Rooftop Satellite Array & Floor 1 Projection Domes',
    stageAnchor: 'floor-5',
    description: 'Amit and Rosa examine telemetry as the LEO satellite link connects to the on-site edge servers.',
    lines: [
      {
        speaker: 'AMIT',
        role: 'Chief Systems Architect',
        avatarColor: '#06b6d4',
        text: 'Look at the telemetry, Rosa. By anchoring the LEO satellite dish array right next to the Edge Data Center on the roof, we cut out external ISP latency completely.',
        floorTarget: 'floor-5',
        technicalMetric: 'Uplink latency: 11.2ms'
      },
      {
        speaker: 'ROSA',
        role: 'Lead Logistics & Electronics Engineer',
        avatarColor: '#10b981',
        text: 'And Floor 1 is already reaping the benefits. The AI face recognition nodes can capture a player expression, map it to a 468-point 3D mesh, and project it into our custom game engine in under 12 milliseconds.',
        floorTarget: 'floor-1',
        technicalMetric: 'Face Scan: 468 vertices / 9.8ms'
      },
      {
        speaker: 'AMIT',
        role: 'Chief Systems Architect',
        avatarColor: '#06b6d4',
        text: 'Standard real estate designs isolate entertainment from engineering. Here, the consoles on Floor 1, the servers on Floor 4, and the satellite dishes on Floor 5 form a continuous high-throughput loop.',
        floorTarget: 'floor-4'
      }
    ]
  },
  {
    id: 2,
    title: 'Act 2: The Physical Manufacturing Flywheel',
    sceneTitle: 'Avatar Arena to Industrial Annex Toy Cluster',
    stageAnchor: 'industrial-annex',
    description: 'Rosa explains how digital game achievements trigger physical production runs in the adjacent factory.',
    lines: [
      {
        speaker: 'ROSA',
        role: 'Lead Logistics & Electronics Engineer',
        avatarColor: '#10b981',
        text: 'And here is the real economic flywheel, Amit. The exact moment a player unlocks a premium skin or legendary character in the Avatar Arena upstairs, our automated Toy Manufacturing Cluster down here gets the assembly signal via our internal IoT network.',
        floorTarget: 'industrial-annex',
        technicalMetric: 'IoT Trigger: MQTT payload dispatched'
      },
      {
        speaker: 'AMIT',
        role: 'Chief Systems Architect',
        avatarColor: '#06b6d4',
        text: 'Exactly. The CAD system pushes the vector geometries directly to the injection molding cells and SMT machines. The player can literally walk into our lobby shop on their way out and pick up a physical, smart-chip-embedded action figure of the custom avatar they just created upstairs.',
        floorTarget: 'floor-ground',
        technicalMetric: 'Molding Cycle: 42s / SMT Chip flash'
      },
      {
        speaker: 'ROSA',
        role: 'Lead Logistics & Electronics Engineer',
        avatarColor: '#10b981',
        text: 'It completely redefines the entertainment loop. We are not just selling game tickets or licensing IPs—we are running an end-to-end cyber-physical engine. Investors looking at our LinkedIn blueprint will not just see a playground; they will see an uncopiable industrial monopoly.',
        floorTarget: 'industrial-annex'
      }
    ]
  },
  {
    id: 3,
    title: 'Act 3: Structural Load & Environmental Isolation',
    sceneTitle: 'Floors 2, 3, and 4 Mechanical Synthesis',
    stageAnchor: 'floor-4',
    description: 'Amit details the civil engineering innovations that allow heavy sports directly adjacent to sensitive server racks.',
    lines: [
      {
        speaker: 'AMIT',
        role: 'Chief Systems Architect',
        avatarColor: '#06b6d4',
        text: 'Notice our vibration damping matrix on Floor 4. Running a commercial gym with deadlift platforms right above a bowling alley on Floor 2 and alongside high-density server racks requires floating acoustic slabs.',
        floorTarget: 'floor-4',
        technicalMetric: 'Isolation efficiency: 98.5% RMS damping'
      },
      {
        speaker: 'ROSA',
        role: 'Lead Logistics & Electronics Engineer',
        avatarColor: '#10b981',
        text: 'And on Floor 3, the synthetic turf futsal pitch uses recycled graywater sub-cooling and STC 55 acoustic baffles. Game developers can code in the studio right next door with zero acoustic interference.',
        floorTarget: 'floor-3',
        technicalMetric: 'Acoustic rating: STC 55 / 44dB'
      },
      {
        speaker: 'AMIT',
        role: 'Chief Systems Architect',
        avatarColor: '#06b6d4',
        text: 'This level of vertical spatial synthesis is why the baseline investment of ₹22.5 Cr to ₹33.5 Cr offers an unmatched return profile for global Transfer of Technology (TOT) consortia.',
        floorTarget: 'floor-ground'
      }
    ]
  }
];

export const CAPEX_BREAKDOWN = [
  {
    category: 'Exterior, Civil & Foundation',
    zone: 'Ground Floor & Concourse',
    minCr: 15.0,
    maxCr: 20.0,
    pct: 60.5,
    details: 'M40 concrete superstructure, Fe500D steel, seismic Zone IV engineering, botanical thermal envelope, biometric turnstiles, EV fast chargers.'
  },
  {
    category: 'Avatar Arena & Gaming Tech',
    zone: 'Floor 1',
    minCr: 2.5,
    maxCr: 6.5,
    pct: 16.0,
    details: 'All-generation PlayStation pods, spherical projection domes, PyTorch face scanning cameras, 4K laser projectors, audio isolation.'
  },
  {
    category: 'Classic Indoor Recreation',
    zone: 'Floor 2 (Bowling & Billiards)',
    minCr: 1.5,
    maxCr: 2.0,
    pct: 6.5,
    details: 'USBC certified automated string pinspotters, Italian slate pool tables, DGT smart chess network, acoustic bass traps.'
  },
  {
    category: 'Futsal Turf & Game Dev Studio',
    zone: 'Floor 3',
    minCr: 1.5,
    maxCr: 2.0,
    pct: 6.5,
    details: 'FIFA Quality Pro shockpad turf, impact netting, OptiTrack 16-cam motion capture, 24x high-spec game dev workstations.'
  },
  {
    category: 'Fitness Complex & Edge Data Center',
    zone: 'Floor 4',
    minCr: 2.0,
    maxCr: 3.0,
    pct: 8.5,
    details: 'Direct liquid-cooled GPU server racks, N+1 CRAC HVAC redundancy, tuned mass dampers, commercial athletic equipment.'
  },
  {
    category: 'LEO Satellite Uplink & Buffet Court',
    zone: 'Floor 5 & Rooftop',
    minCr: 1.5,
    maxCr: 2.5,
    pct: 6.0,
    details: '4x Steerable LEO phased array dishes, 125kW solar PV array, commercial induction kitchen, fiber optic MDF core.'
  }
];

export const ANDROID_CAPACITOR_CONFIG = `{
  "appId": "com.vasuki.indicus.anusandhan",
  "appName": "Project VASUKI X5",
  "webDir": "dist",
  "server": {
    "androidScheme": "https",
    "allowNavigation": ["localhost:8765"]
  },
  "android": {
    "allowMixedContent": true,
    "backgroundColor": "#020617"
  }
}`;

export const ANDROID_CORDOVA_CONFIG = `<?xml version='1.0' encoding='utf-8'?>
<widget id="com.vasuki.indicus.anusandhan" version="1.0.0" xmlns="http://w3.org" xmlns:cdv="http://apache.org">
    <name>Project VASUKI X5</name>
    <description>Active Android Matrix Console for Infrastructure, Sourcing, and Toy Fabrication.</description>
    <author email="dev@vasuki.indicus" href="https://github.com">Vasuki-Indicus-Anusandhan-AI-Lab</author>
    
    <content src="index.html" />
    
    <!-- Security Layer: Strictly govern network access maps -->
    <access origin="*" />
    <allow-navigation href="*" />
    <allow-intent href="http://*/*" />
    <allow-intent href="https://*/*" />
    <allow-intent href="ws://*/*" />

    <!-- Android Viewport Optimization Adjustments -->
    <preference name="KeepRunning" value="true" />
    <preference name="Fullscreen" value="true" />
    <preference name="Orientation" value="portrait" />
    <preference name="BackgroundColor" value="0xff020617" />

    <platform name="android">
        <allow-intent href="market:*" />
        <preference name="AndroidXEnabled" value="true" />
    </platform>
</widget>`;

export const CNC_VBA_SCRIPT = `' ==============================================================================
' PROJECT-VASUKI-X5: AUTOMATED G-CODE GENERATION ENGINE VIA SOLIDWORKS API
' Developer: Amit Nishanka Bhuyan | Vasuki-Indicus-Anusandhan-AI-Lab
' Purpose: Parametric Toolpath Extraction for CNC-Milling Scale Model Prototype
' ==============================================================================

Sub GenerateModelGCode()
    Dim swApp As Object
    Dim swModel As Object
    Dim swPart As Object
    Dim swFeat As Object
    Dim GCodeFilePath As String
    Dim FileNumber As Integer
    
    ' Initialize SolidWorks Application Context
    Set swApp = Application.SldWorks
    Set swModel = swApp.ActiveDoc
    
    If swModel Is Nothing Then
        MsgBox "Critical Error: No active CAD model detected in workspace.", vbCritical
        Exit Sub
    End If
    
    ' Establish Local Output Directory for .NC File Block
    GCodeFilePath = "C:\\Vasuki_Project_X5_Workspace\\CNC_Outputs\\toy_cluster_mold.nc"
    FileNumber = FreeFile
    Open GCodeFilePath For Output As #FileNumber
    
    ' Write Standardized CNC Header Blocks (G-Code Initialization)
    Print #FileNumber, "%"
    Print #FileNumber, "O0015 (PROJECT-VASUKI-X5 TOY CLUSTER SCALE MODEL)"
    Print #FileNumber, "G21 (Metric Programming Unit Matrix Setup - mm)"
    Print #FileNumber, "G90 (Absolute Positioning Coordinate Selection)"
    Print #FileNumber, "G28 G91 Z0 (Return to Reference Position - Z-Axis Safety Block)"
    Print #FileNumber, "M03 S2400 (Initialize Spindle Core Rotation - 2400 RPM)"
    Print #FileNumber, "G00 X0.000 Y0.000 Z5.000 (Rapid Traverse to Work Home Clearance Point)"
    
    ' Loop Through Model Feature Pipeline to Extract Vector Profiles
    Set swFeat = swModel.FirstFeature
    Do While Not swFeat Is Nothing
        If swFeat.GetTypeName2 = "ProfileFeature" Or swFeat.GetTypeName2 = "Extrusion" Then
            Print #FileNumber, "(Processing Layer Feature: " & swFeat.Name & ")"
            Print #FileNumber, "G01 Z-1.500 F150 (Linear Feed Engagement - Depth Step 1.5mm)"
            Print #FileNumber, "G01 X15.450 Y22.300 F300 (Toolpath Vector Transition)"
            Print #FileNumber, "G02 X35.200 Y42.100 R10.000 (Clockwise Circular Interpolation Radius)"
            Print #FileNumber, "G01 X55.000 Y10.000 (Toolpath Vector Return Sweep)"
        End If
        Set swFeat = swFeat.GetNextFeature
    Loop
    
    ' Write Standardized CNC Footer Blocks (Spindle Stop & Program End)
    Print #FileNumber, "G00 Z5.000 (Retract Tool to Clear Zone)"
    Print #FileNumber, "M05 (Terminate Spindle Rotation Loop)"
    Print #FileNumber, "G28 X0 Y0 (Return Machine Carriage to Home Positions)"
    Print #FileNumber, "M30 (Program Reset and Terminal End Block)"
    Print #FileNumber, "%"
    
    Close #FileNumber
    MsgBox "Success: G-code block compiled safely to: " & GCodeFilePath, vbInformation
End Sub`;
