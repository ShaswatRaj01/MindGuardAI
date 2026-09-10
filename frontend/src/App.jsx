import { useState } from 'react'
import {
  ShieldCheck,
  LayoutDashboard,
  TriangleAlert,
  ClipboardCheck,
  BookOpen,
  Bell,
  User,
  LogOut,
  ArrowRight,
  Check,
  Search,
  HardHat,
  FileWarning,
  Activity,
  Clock3,
  MapPin,
  Thermometer,
  Wind,
  Radio,
  ChevronRight,
  LockKeyhole,
  PhoneCall,
  HeartPulse,
  Ambulance,
  Stethoscope,
  Camera,
} from 'lucide-react'

import './App.css'

function App() {
  const [showPassword, setShowPassword] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [selectedRole, setSelectedRole] = useState('')
  const [dashboard, setDashboard] = useState(false)
  const [workerGuidelinesSeen, setWorkerGuidelinesSeen] = useState(false)
  const [showHazardForm, setShowHazardForm] = useState(false)
  const [hazardReports, setHazardReports] = useState([])

  const [showChecklist, setShowChecklist] = useState(false)
  const [activeSection, setActiveSection] = useState("dashboard")
  const [profileEditing, setProfileEditing] = useState(false)
  const [healthRequests, setHealthRequests] = useState([
    { id: 1, type: 'Respiratory concern', location: 'Sector B-04', status: 'Medical team notified', time: 'Today · 08:42 AM' },
  ])
  const [alerts, setAlerts] = useState([
    { id: 1, title: "High Dust Level", type: "HIGH", category: "Air Quality", location: "Zone B", time: "8 minutes ago", description: "Dust concentration is above the recommended level in Zone B.", unread: true },
    { id: 2, title: "Safety Inspection", type: "INFO", category: "Inspection", location: "Sector B-04", time: "32 minutes ago", description: "Routine inspection scheduled for your work zone.", unread: true },
  ])
  const [checklist, setChecklist] = useState([
  { id: 1, title: "Wear required PPE", completed: true },
  { id: 2, title: "Inspect personal safety equipment", completed: true },
  { id: 3, title: "Check work area for hazards", completed: true },
  { id: 4, title: "Verify communication equipment", completed: false },
  { id: 5, title: "Review emergency procedures", completed: false },
])
  const [checklistEvidence, setChecklistEvidence] = useState(null)
  const [checklistLocationVerified, setChecklistLocationVerified] = useState(false)
  const [checklistSubmissions, setChecklistSubmissions] = useState([
    {
      id: 1,
      worker: 'Mine Worker',
      workerId: 'MG-W027',
      zone: 'Sector B-04',
      submittedAt: 'Today · 08:36 AM',
      status: 'Verified',
      evidence: 'PPE & equipment photo attached',
      locationVerified: true,
      verifiedBy: 'Safety Inspector',
      verifiedAt: 'Today · 08:41 AM',
      note: 'All required checks verified.'
    }
  ])
  const [inspectorInspections, setInspectorInspections] = useState([
    { id: 1, title: "Sector B-04 Safety Inspection", area: "Sector B-04", due: "Today, 10:30 AM", status: "Scheduled", priority: "High" },
    { id: 2, title: "Ventilation & Air Quality Check", area: "Zone C-02", due: "Today, 1:00 PM", status: "Scheduled", priority: "Medium" },
    { id: 3, title: "PPE Compliance Review", area: "Workshop A", due: "Completed yesterday", status: "Completed", priority: "Normal" },
  ])
  const [inspectorChecklistReview, setInspectorChecklistReview] = useState('')
  const [inspectorViolations, setInspectorViolations] = useState([
    { id: 1, title: "Dust concentration above threshold", area: "Zone B", severity: "Critical", status: "Open", source: "Worker report" },
    { id: 2, title: "Missing equipment inspection tag", area: "Workshop A", severity: "Medium", status: "Under Review", source: "Routine inspection" },
    { id: 3, title: "Emergency signage needs replacement", area: "Sector C-02", severity: "Low", status: "Open", source: "Inspector observation" },
  ])

  const [managerRisks, setManagerRisks] = useState([
    { id: 1, title: 'Elevated dust exposure', area: 'Zone B', severity: 'Critical', status: 'Open', owner: 'Operations' },
    { id: 2, title: 'Ventilation efficiency below target', area: 'Sector C-02', severity: 'High', status: 'Monitoring', owner: 'Engineering' },
    { id: 3, title: 'PPE compliance variance', area: 'Workshop A', severity: 'Medium', status: 'Action Required', owner: 'Safety' },
  ])
  const [managerTasks, setManagerTasks] = useState([
    { id: 1, title: 'Review weekly safety report', owner: 'Safety Team', due: 'Today', status: 'Pending' },
    { id: 2, title: 'Approve ventilation maintenance', owner: 'Engineering', due: 'Today', status: 'Pending' },
    { id: 3, title: 'Review worker training status', owner: 'HR & Safety', due: 'Tomorrow', status: 'Pending' },
  ])

  const [controllerIncidents, setControllerIncidents] = useState([
    { id: 1, title: 'High dust concentration', zone: 'Zone B', severity: 'Critical', status: 'Active', assigned: 'Field Team A' },
    { id: 2, title: 'Ventilation sensor warning', zone: 'Sector C-02', severity: 'High', status: 'Monitoring', assigned: 'Engineering' },
    { id: 3, title: 'PPE compliance variance', zone: 'Workshop A', severity: 'Medium', status: 'Assigned', assigned: 'Safety Team' },
  ])
  const [controllerMessages, setControllerMessages] = useState([
    { id: 1, title: 'Zone B team acknowledged alert', time: '4 min ago', status: 'Acknowledged' },
    { id: 2, title: 'Engineering dispatched to Sector C-02', time: '11 min ago', status: 'Dispatched' },
  ])

  const [emergencyIncidents, setEmergencyIncidents] = useState([
    { id: 1, title: 'Dust exposure emergency', zone: 'Zone B', severity: 'Critical', status: 'Active', commander: 'Response Team Alpha', workers: 36 },
    { id: 2, title: 'Ventilation failure', zone: 'Sector C-02', severity: 'High', status: 'Contained', commander: 'Engineering Response', workers: 51 },
  ])
  const [evacuationZones, setEvacuationZones] = useState([
    { id: 1, zone: 'Zone B', workers: 36, status: 'Evacuating', assembly: 'Assembly Point A' },
    { id: 2, zone: 'Sector C-02', workers: 51, status: 'Standby', assembly: 'Assembly Point B' },
    { id: 3, zone: 'Workshop A', workers: 28, status: 'Clear', assembly: 'Assembly Point C' },
    { id: 4, zone: 'North Pit', workers: 63, status: 'Clear', assembly: 'Assembly Point D' },
  ])
  const [emergencyTeams, setEmergencyTeams] = useState([
    { id: 1, name: 'Response Team Alpha', lead: 'R. Sharma', members: 8, status: 'Deployed', location: 'Zone B' },
    { id: 2, name: 'Medical Team', lead: 'A. Kumar', members: 5, status: 'Standby', location: 'Medical Bay' },
    { id: 3, name: 'Engineering Response', lead: 'S. Verma', members: 6, status: 'Deployed', location: 'Sector C-02' },
    { id: 4, name: 'Evacuation Team', lead: 'P. Singh', members: 7, status: 'Standby', location: 'Control Room' },
  ])
  const [emergencyTimeline, setEmergencyTimeline] = useState([
    { id: 1, time: '09:12', event: 'Emergency declared', detail: 'Dust exposure emergency reported in Zone B', type: 'critical' },
    { id: 2, time: '09:14', event: 'Response team dispatched', detail: 'Response Team Alpha assigned to Zone B', type: 'response' },
    { id: 3, time: '09:16', event: 'Evacuation initiated', detail: 'Workers directed toward Assembly Point A', type: 'evacuation' },
    { id: 4, time: '09:19', event: 'Medical team notified', detail: 'Medical Bay placed on emergency standby', type: 'info' },
  ])
  const [emergencyMessages, setEmergencyMessages] = useState([
    { id: 1, title: 'Emergency broadcast delivered to all zones', time: '2 min ago', status: 'Delivered' },
    { id: 2, title: 'Response Team Alpha acknowledged dispatch', time: '5 min ago', status: 'Acknowledged' },
    { id: 3, title: 'Medical Bay moved to emergency standby', time: '7 min ago', status: 'Confirmed' },
  ])

  const roles = [
    {
      id: 'worker',
      icon: HardHat,
      title: 'Mine Worker',
      description: 'Follow safety, report hazards and access health support.',
    },
    {
      id: 'inspector',
      icon: Search,
      title: 'Safety Inspector',
      description: 'Inspect operations and monitor compliance.',
    },
    {
      id: 'manager',
      icon: Activity,
      title: 'Mine Manager',
      description: 'Manage operations, risks and compliance.',
    },
    {
      id: 'controller',
      icon: Radio,
      title: 'Field Controller',
      description: 'Monitor field activities and safety alerts.',
    },
    {
      id: 'emergency',
      icon: TriangleAlert,
      title: 'Emergency Controller',
      description: 'Manage emergency situations and responses.',
    },
  ]

  const handleLogin = (e) => {
    e.preventDefault()
    setLoggedIn(true)
  }

  /* =========================
     MANAGER DASHBOARD
     ========================= */

  if (dashboard && selectedRole === 'manager') {
    const openRisks = managerRisks.filter(r => r.status !== 'Resolved').length
    const pendingTasks = managerTasks.filter(t => t.status !== 'Completed').length
    const unreadAlerts = alerts.filter(a => a.unread).length

    return (
      <div className="worker-app manager-app">
        <aside className="sidebar">
          <div className="sidebar-brand">
            <div className="brand-mark"><ShieldCheck size={25} strokeWidth={2} /></div>
            <div><h1>MineGuard</h1><p>Safety & Compliance</p></div>
          </div>

          <nav className="sidebar-nav">
            <p className="nav-title">MANAGER WORKSPACE</p>
            {[
              ['dashboard', LayoutDashboard, 'Dashboard'],
              ['operations', Activity, 'Operations'],
              ['risks', TriangleAlert, 'Risk Management'],
              ['compliance', ShieldCheck, 'Compliance'],
              ['workforce', HardHat, 'Workforce'],
              ['alerts', Bell, 'Alerts'],
            ].map(([id, Icon, label]) => (
              <button key={id} className={`nav-item ${activeSection === id ? 'active' : ''}`} onClick={() => setActiveSection(id)}>
                <Icon size={18} /><span>{label}</span>
                {id === 'risks' && openRisks > 0 && <b className="nav-badge">{openRisks}</b>}
                {id === 'alerts' && unreadAlerts > 0 && <b className="nav-badge">{unreadAlerts}</b>}
              </button>
            ))}
            <p className="nav-title second-title">ACCOUNT</p>
            <button className={`nav-item ${activeSection === 'profile' ? 'active' : ''}`} onClick={() => setActiveSection('profile')}>
              <User size={18} /><span>My Profile</span>
            </button>
          </nav>

          <div className="sidebar-bottom">
            <div className="sidebar-user">
              <div className="user-avatar"><Activity size={18} /></div>
              <div><strong>Mine Manager</strong><span>Manager ID: MG-M021</span></div>
            </div>
            <button className="sidebar-logout" onClick={() => { setDashboard(false); setLoggedIn(false); setSelectedRole(''); setActiveSection('dashboard') }}>
              <LogOut size={16} /> Sign out
            </button>
          </div>
        </aside>

        <main className="worker-main manager-main">
          {activeSection === 'dashboard' && (
            <>
              <header className="worker-header">
                <div><span className="page-label">MANAGEMENT WORKSPACE</span><h2>Good morning, Manager</h2><p>Monitor operations, safety performance and mine-wide compliance.</p></div>
                <div className="operational-status"><span className="status-dot"></span><span>Mine Operational</span></div>
              </header>

              <section className="manager-hero">
                <div><span className="page-label">MINE OVERVIEW</span><h1>Safety and operations at a glance.</h1><p>Use current field data, compliance records and risk indicators to prioritize management decisions.</p></div>
                <div className="manager-kpi"><span>Mine Safety Index</span><strong>93%</strong><small>Stable · +2.4% this month</small></div>
              </section>

              <div className="stat-grid manager-stats">
                <div className="stat-card"><div className="stat-icon stat-blue"><Activity size={21}/></div><span>Production Status</span><strong>92%</strong><small>Target achievement</small></div>
                <div className="stat-card"><div className="stat-icon stat-red"><TriangleAlert size={21}/></div><span>Open Risks</span><strong>{openRisks}</strong><small>1 critical risk</small></div>
                <div className="stat-card"><div className="stat-icon stat-amber"><ClipboardCheck size={21}/></div><span>Pending Actions</span><strong>{pendingTasks}</strong><small>Across departments</small></div>
                <div className="stat-card"><div className="stat-icon stat-green"><HardHat size={21}/></div><span>Workforce</span><strong>248</strong><small>Active workers</small></div>
              </div>

              <div className="content-grid manager-content-grid">
                <section className="dashboard-panel">
                  <div className="panel-header"><div><h3>Priority Risks</h3><p>Mine conditions requiring management attention.</p></div><button className="panel-link" onClick={() => setActiveSection('risks')}>View all <ChevronRight size={15}/></button></div>
                  {managerRisks.slice(0,3).map(r => <div className="manager-risk-row" key={r.id}><div className={`risk-marker ${r.severity.toLowerCase()}`}></div><div><strong>{r.title}</strong><span><MapPin size={13}/> {r.area} · {r.owner}</span></div><b>{r.severity}</b></div>)}
                </section>
                <section className="dashboard-panel">
                  <div className="panel-header"><div><h3>Management Actions</h3><p>Decisions and follow-ups due soon.</p></div><button className="panel-link" onClick={() => setActiveSection('operations')}>Manage <ChevronRight size={15}/></button></div>
                  {managerTasks.map(t => <div className="manager-task-row" key={t.id}><div className="task-check"><Check size={15}/></div><div><strong>{t.title}</strong><span>{t.owner} · Due {t.due}</span></div><b>{t.status}</b></div>)}
                </section>
              </div>

              <section className="dashboard-panel manager-monitor">
                <div className="panel-header"><div><h3>Mine Monitoring</h3><p>Current operational indicators from monitored work zones.</p></div></div>
                <div className="monitor-grid">
                  <div><Wind size={19}/><span>Air Quality</span><strong>Good</strong><small>All monitored zones</small></div>
                  <div><Thermometer size={19}/><span>Average Temperature</span><strong>28°C</strong><small>Within operating range</small></div>
                  <div><Radio size={19}/><span>Connected Sensors</span><strong>48 / 48</strong><small>100% online</small></div>
                  <div><ShieldCheck size={19}/><span>Compliance</span><strong>93%</strong><small>Current mine score</small></div>
                </div>
              </section>
            </>
          )}

          {activeSection === 'operations' && (
            <section className="manager-page">
              <div className="page-heading"><div><span className="page-label">OPERATIONS CONTROL</span><h2>Operations</h2><p>Coordinate operational actions, maintenance decisions and management follow-ups.</p></div><button className="primary-action" onClick={() => setManagerTasks(prev => [{id:Date.now(), title:'New management review', owner:'Mine Management', due:'Today', status:'Pending'}, ...prev])}><ClipboardCheck size={17}/> Add Action</button></div>
              <div className="manager-operation-grid">
                <div className="dashboard-panel"><div className="panel-header"><div><h3>Operational Areas</h3><p>Current status by department.</p></div></div><div className="operation-list"><div><Activity size={18}/><span><strong>Production</strong><small>Target achievement</small></span><b>92%</b></div><div><Wind size={18}/><span><strong>Ventilation</strong><small>System availability</small></span><b>97%</b></div><div><Radio size={18}/><span><strong>Monitoring Network</strong><small>Sensor connectivity</small></span><b>100%</b></div><div><HardHat size={18}/><span><strong>Workforce Readiness</strong><small>Training & assignment</small></span><b>94%</b></div></div></div>
                <div className="dashboard-panel"><div className="panel-header"><div><h3>Management Actions</h3><p>Track follow-ups to completion.</p></div></div><div className="manager-task-list">{managerTasks.map(t => <div className="manager-task-card" key={t.id}><div><strong>{t.title}</strong><span>{t.owner} · {t.due}</span></div>{t.status !== 'Completed' ? <button className="secondary-action" onClick={() => setManagerTasks(prev => prev.map(x => x.id === t.id ? {...x,status:'Completed'} : x))}>Complete</button> : <Check className="completed-check" size={20}/>}</div>)}</div></div>
              </div>
            </section>
          )}

          {activeSection === 'risks' && (
            <section className="manager-page"><div className="page-heading"><div><span className="page-label">RISK MANAGEMENT</span><h2>Risk Management</h2><p>Review high-priority risks and track corrective action across the mine.</p></div><button className="primary-action" onClick={() => setManagerRisks(prev => [{id:Date.now(), title:'New operational risk', area:'Unassigned Area', severity:'Medium', status:'Open', owner:'Operations'}, ...prev])}><TriangleAlert size={17}/> Add Risk</button></div><div className="manager-risk-list">{managerRisks.map(r => <article className="manager-risk-card" key={r.id}><div className={`risk-icon ${r.severity.toLowerCase()}`}><TriangleAlert size={20}/></div><div className="manager-risk-main"><div className="list-card-top"><h3>{r.title}</h3><b className={`severity-tag ${r.severity.toLowerCase()}`}>{r.severity}</b></div><p><MapPin size={14}/> {r.area} · Owner: {r.owner}</p><span>Status: {r.status}</span></div>{r.status !== 'Resolved' ? <button className="secondary-action" onClick={() => setManagerRisks(prev => prev.map(x => x.id === r.id ? {...x,status:'Resolved'} : x))}>Resolve</button> : <Check size={20} className="completed-check"/>}</article>)}</div></section>
          )}

          {activeSection === 'compliance' && (
            <section className="manager-page"><div className="page-heading"><div><span className="page-label">MINE COMPLIANCE</span><h2>Compliance</h2><p>Management-level view of safety and regulatory performance.</p></div></div><div className="manager-compliance-grid"><div className="compliance-big"><span>Overall compliance</span><strong>93%</strong><div className="progress-track"><div style={{width:'93%'}}></div></div><small>Improved 2.4% compared with last month</small></div><div className="compliance-checks"><div><strong>Workplace Safety</strong><span>96%</span></div><div><strong>Equipment Compliance</strong><span>94%</span></div><div><strong>Environmental Controls</strong><span>89%</span></div><div><strong>Emergency Preparedness</strong><span>92%</span></div></div></div><div className="dashboard-panel"><div className="panel-header"><div><h3>Management Compliance Controls</h3><p>Areas currently requiring executive oversight.</p></div></div><div className="compliance-control-list"><div><Check size={17}/><span>Mandatory inspection programme completion</span><b>COMPLIANT</b></div><div><Check size={17}/><span>Worker safety training coverage</span><b>COMPLIANT</b></div><div><TriangleAlert size={17}/><span>Environmental monitoring threshold</span><b className="attention">REVIEW</b></div></div></div></section>
          )}

          {activeSection === 'workforce' && (
            <section className="manager-page"><div className="page-heading"><div><span className="page-label">WORKFORCE MANAGEMENT</span><h2>Workforce</h2><p>Monitor worker readiness, assignments and safety participation.</p></div></div><div className="workforce-summary"><div><HardHat size={20}/><span>Active Workers</span><strong>248</strong></div><div><ClipboardCheck size={20}/><span>Training Current</span><strong>94%</strong></div><div><TriangleAlert size={20}/><span>Workers Requiring Review</span><strong>7</strong></div><div><Activity size={20}/><span>Attendance Today</span><strong>97%</strong></div></div><div className="dashboard-panel"><div className="panel-header"><div><h3>Workforce Readiness</h3><p>Department-level readiness indicators.</p></div></div><div className="operation-list"><div><HardHat size={18}/><span><strong>Underground Operations</strong><small>Training and PPE readiness</small></span><b>96%</b></div><div><Activity size={18}/><span><strong>Processing Plant</strong><small>Training and attendance</small></span><b>93%</b></div><div><ShieldCheck size={18}/><span><strong>Maintenance Team</strong><small>Certification coverage</small></span><b>91%</b></div></div></div></section>
          )}

          {activeSection === 'alerts' && (
            <section className="manager-page"><div className="page-heading"><div><span className="page-label">SAFETY NOTIFICATIONS</span><h2>Management Alerts</h2><p>Mine-wide conditions and compliance events requiring management attention.</p></div><button className="secondary-action" onClick={() => setAlerts(prev => prev.map(a => ({...a, unread:false})))}>Mark all as read</button></div><div className="manager-alert-list">{alerts.map(a => <article className={`manager-alert-card ${a.unread ? 'unread-card' : ''}`} key={a.id}><div className={`risk-icon ${a.type === 'HIGH' ? 'critical' : 'info'}`}>{a.type === 'HIGH' ? <TriangleAlert size={20}/> : <Bell size={20}/>}</div><div className="manager-risk-main"><div className="list-card-top"><h3>{a.title}</h3><div>{a.unread && <b className="new-tag">NEW</b>}<b className={`severity-tag ${a.type.toLowerCase()}`}>{a.type}</b></div></div><p>{a.category} · {a.location}</p><span>{a.description} · {a.time}</span></div>{a.unread && <button className="secondary-action" onClick={() => setAlerts(prev => prev.map(x => x.id === a.id ? {...x,unread:false} : x))}>Mark read</button>}</article>)}</div></section>
          )}

          {activeSection === 'profile' && (
            <section className="manager-page"><div className="page-heading"><div><span className="page-label">ACCOUNT</span><h2>My Profile</h2><p>Mine manager identity, authority and operational assignment.</p></div></div><div className="profile-grid"><section className="dashboard-panel"><div className="profile-card-heading"><div><span className="page-label">IDENTITY</span><h3>Mine Manager</h3></div><Activity size={22}/></div><div className="profile-fields"><label><span>Full Name</span><input defaultValue="Mine Manager"/></label><label><span>Manager ID</span><input defaultValue="MG-M021" disabled/></label><label><span>Assigned Mine</span><input defaultValue="Mine Site Alpha"/></label><label><span>Management Level</span><input defaultValue="Site Operations Manager" disabled/></label></div></section><section className="dashboard-panel"><div className="profile-card-heading"><div><span className="page-label">AUTHORITY</span><h3>Management Access</h3></div><ShieldCheck size={22}/></div><div className="assignment-list"><div><span>Operational Authority</span><strong>Level III</strong></div><div><span>Safety Oversight</span><strong>Mine-wide</strong></div><div><span>Compliance Review</span><strong>Authorized</strong></div><div><span>Emergency Escalation</span><strong>Enabled</strong></div></div></section></div></section>
          )}
        </main>
      </div>
    )
  }


  /* =========================
     EMERGENCY CONTROLLER DASHBOARD
     ========================= */

  if (dashboard && selectedRole === 'emergency') {
    const activeEmergencies = emergencyIncidents.filter(i => i.status === 'Active').length
    const evacuatedWorkers = evacuationZones.filter(z => z.status === 'Evacuated').reduce((sum, z) => sum + z.workers, 0)
    const evacuatingWorkers = evacuationZones.filter(z => z.status === 'Evacuating').reduce((sum, z) => sum + z.workers, 0)
    const deployedTeams = emergencyTeams.filter(t => t.status === 'Deployed').length
    const unreadAlerts = alerts.filter(a => a.unread).length

    const signOut = () => { setDashboard(false); setLoggedIn(false); setSelectedRole(''); setActiveSection('dashboard') }

    return (
      <div className="worker-app emergency-app">
        <aside className="sidebar">
          <div className="sidebar-brand"><div className="brand-mark"><ShieldCheck size={25}/></div><div><h1>MineGuard</h1><p>Safety & Compliance</p></div></div>
          <nav className="sidebar-nav">
            <p className="nav-title">EMERGENCY WORKSPACE</p>
            {[
              ['dashboard',LayoutDashboard,'Dashboard'],
              ['emergencies',TriangleAlert,'Active Emergencies'],
              ['evacuation',MapPin,'Evacuation Management'],
              ['teams',HardHat,'Teams & Personnel'],
              ['timeline',Clock3,'Incident Timeline'],
              ['communications',Radio,'Emergency Communications'],
              ['zones',Activity,'Critical Zone Status'],
              ['alerts',Bell,'Emergency Alerts']
            ].map(([id,Icon,label]) => <button key={id} className={`nav-item ${activeSection===id?'active':''}`} onClick={()=>setActiveSection(id)}><Icon size={18}/><span>{label}</span>{id==='emergencies'&&activeEmergencies>0&&<b className="nav-badge">{activeEmergencies}</b>}{id==='alerts'&&unreadAlerts>0&&<b className="nav-badge">{unreadAlerts}</b>}</button>)}
            <p className="nav-title second-title">ACCOUNT</p>
            <button className={`nav-item ${activeSection==='profile'?'active':''}`} onClick={()=>setActiveSection('profile')}><User size={18}/><span>My Profile</span></button>
          </nav>
          <div className="sidebar-bottom"><div className="sidebar-user"><div className="user-avatar"><TriangleAlert size={18}/></div><div><strong>Emergency Controller</strong><span>Controller ID: MG-E006</span></div></div><button className="sidebar-logout" onClick={signOut}><LogOut size={16}/> Sign out</button></div>
        </aside>

        <main className="worker-main emergency-main">
          {activeSection==='dashboard'&&<>
            <header className="worker-header"><div><span className="page-label">EMERGENCY RESPONSE WORKSPACE</span><h2>Emergency control center</h2><p>Coordinate response, evacuation and communications during mine emergencies.</p></div><div className="emergency-status"><span className="status-dot"></span><span>Response Network Ready</span></div></header>
            <section className="emergency-hero"><div><span className="page-label">INCIDENT COMMAND</span><h1>Control the response. Protect every worker.</h1><p>Use the command workspace to declare incidents, deploy teams, manage evacuations and maintain a complete response timeline.</p></div><div className="emergency-kpi"><span>Emergency Readiness</span><strong>98%</strong><small>Response systems operational</small></div></section>
            <div className="stat-grid emergency-stats"><div className="stat-card"><div className="stat-icon stat-red"><TriangleAlert size={21}/></div><span>Active Emergencies</span><strong>{activeEmergencies}</strong><small>Immediate command attention</small></div><div className="stat-card"><div className="stat-icon stat-amber"><HardHat size={21}/></div><span>Workers Evacuating</span><strong>{evacuatingWorkers}</strong><small>Moving to assembly points</small></div><div className="stat-card"><div className="stat-icon stat-blue"><Radio size={21}/></div><span>Teams Deployed</span><strong>{deployedTeams}</strong><small>Response personnel active</small></div><div className="stat-card"><div className="stat-icon stat-green"><ShieldCheck size={21}/></div><span>Workers Accounted</span><strong>{248-evacuatingWorkers}</strong><small>{evacuatedWorkers} fully evacuated</small></div></div>
            <div className="emergency-command-bar"><button className="primary-action emergency-declare" onClick={()=>{const id=Date.now();setEmergencyIncidents(p=>[{id,title:'New site emergency',zone:'Unassigned Zone',severity:'Critical',status:'Active',commander:'Unassigned Response Team',workers:0},...p]);setEmergencyTimeline(p=>[{id,time:'Now',event:'Emergency declared',detail:'New emergency opened from command center',type:'critical'},...p])}}><TriangleAlert size={18}/> Declare Emergency</button><button className="secondary-action" onClick={()=>setActiveSection('evacuation')}><MapPin size={17}/> Manage Evacuation</button><button className="secondary-action" onClick={()=>setActiveSection('communications')}><Radio size={17}/> Broadcast Alert</button></div>
            <div className="content-grid emergency-content-grid"><section className="dashboard-panel"><div className="panel-header"><div><h3>Active Emergencies</h3><p>Incidents currently under emergency command.</p></div><button className="panel-link" onClick={()=>setActiveSection('emergencies')}>Open control <ChevronRight size={15}/></button></div>{emergencyIncidents.map(i=><div className="emergency-incident-row" key={i.id}><div className={`risk-marker ${i.severity.toLowerCase()}`}></div><div><strong>{i.title}</strong><span><MapPin size={13}/> {i.zone} · {i.workers} workers</span></div><b>{i.status}</b></div>)}</section><section className="dashboard-panel"><div className="panel-header"><div><h3>Response Teams</h3><p>Current deployment status.</p></div><button className="panel-link" onClick={()=>setActiveSection('teams')}>Manage <ChevronRight size={15}/></button></div>{emergencyTeams.slice(0,3).map(t=><div className="emergency-team-row" key={t.id}><div className="message-icon"><HardHat size={17}/></div><div><strong>{t.name}</strong><span>{t.members} members · {t.location}</span></div><b>{t.status}</b></div>)}</section></div>
            <section className="dashboard-panel"><div className="panel-header"><div><h3>Emergency Situation Overview</h3><p>Command-level status across critical response areas.</p></div></div><div className="emergency-overview-grid"><div><TriangleAlert size={19}/><span>Critical incident</span><strong>{activeEmergencies ? 'ACTIVE' : 'CLEAR'}</strong><small>Zone B response in progress</small></div><div><MapPin size={19}/><span>Evacuation</span><strong>{evacuatingWorkers ? 'IN PROGRESS' : 'STANDBY'}</strong><small>{evacuatingWorkers} workers moving</small></div><div><Radio size={19}/><span>Emergency channel</span><strong>ONLINE</strong><small>All response teams connected</small></div><div><ShieldCheck size={19}/><span>Accountability</span><strong>MONITORING</strong><small>Personnel tracking active</small></div></div></section>
          </>}

          {activeSection==='emergencies'&&<section className="emergency-page"><div className="page-heading"><div><span className="page-label">INCIDENT COMMAND</span><h2>Active Emergencies</h2><p>Declare, dispatch and close emergency incidents from the command center.</p></div><button className="primary-action emergency-declare" onClick={()=>{const id=Date.now();setEmergencyIncidents(p=>[{id,title:'New site emergency',zone:'Unassigned Zone',severity:'Critical',status:'Active',commander:'Control Room',workers:0},...p])}}><TriangleAlert size={17}/> Declare Emergency</button></div><div className="emergency-list">{emergencyIncidents.map(i=><article className="emergency-list-card" key={i.id}><div className="emergency-list-icon"><TriangleAlert size={22}/></div><div className="emergency-list-main"><div className="list-card-top"><h3>{i.title}</h3><b className={`severity-tag ${i.severity.toLowerCase()}`}>{i.severity}</b></div><p><MapPin size={14}/> {i.zone} · {i.workers} workers affected</p><span>Command: {i.commander} · Status: {i.status}</span></div><div className="controller-actions">{i.status==='Active'&&<button className="secondary-action" onClick={()=>{setEmergencyIncidents(p=>p.map(x=>x.id===i.id?{...x,status:'Contained'}:x));setEmergencyTimeline(p=>[{id:Date.now(),time:'Now',event:'Emergency contained',detail:`${i.title} moved to controlled response`,type:'response'},...p])}}>Contain</button>}{i.status!=='Closed'&&<button className="secondary-action" onClick={()=>{setEmergencyIncidents(p=>p.map(x=>x.id===i.id?{...x,status:'Closed'}:x));setEmergencyTimeline(p=>[{id:Date.now(),time:'Now',event:'Emergency closed',detail:`${i.title} closed by emergency command`,type:'info'},...p])}}>Close</button>}{i.status==='Closed'&&<Check size={20} className="completed-check"/>}</div></article>)}</div></section>}

          {activeSection==='evacuation'&&<section className="emergency-page"><div className="page-heading"><div><span className="page-label">PERSONNEL EVACUATION</span><h2>Evacuation Management</h2><p>Direct worker movement, assembly points and zone clearance.</p></div><button className="primary-action" onClick={()=>setEvacuationZones(p=>p.map(z=>z.status==='Standby'?{...z,status:'Evacuating'}:z))}><MapPin size={17}/> Start Evacuation</button></div><div className="evacuation-summary"><div><HardHat size={20}/><span>Workers in evacuation</span><strong>{evacuatingWorkers}</strong></div><div><Check size={20}/><span>Workers evacuated</span><strong>{evacuatedWorkers}</strong></div><div><MapPin size={20}/><span>Zones clearing</span><strong>{evacuationZones.filter(z=>z.status==='Evacuating').length}</strong></div><div><ShieldCheck size={20}/><span>Clear zones</span><strong>{evacuationZones.filter(z=>z.status==='Clear').length}</strong></div></div><div className="emergency-list">{evacuationZones.map(z=><article className="evacuation-card" key={z.id}><div className={`evacuation-icon ${z.status.toLowerCase()}`}><MapPin size={20}/></div><div className="emergency-list-main"><div className="list-card-top"><h3>{z.zone}</h3><b className={`status-pill ${z.status.toLowerCase()}`}>{z.status}</b></div><p>{z.workers} workers · Assembly: {z.assembly}</p><span>Evacuation route and personnel accountability under command control.</span></div><div className="controller-actions">{z.status==='Standby'&&<button className="secondary-action" onClick={()=>setEvacuationZones(p=>p.map(x=>x.id===z.id?{...x,status:'Evacuating'}:x))}>Evacuate</button>}{z.status==='Evacuating'&&<button className="secondary-action" onClick={()=>setEvacuationZones(p=>p.map(x=>x.id===z.id?{...x,status:'Evacuated'}:x))}>Mark evacuated</button>}{z.status!=='Clear'&&z.status!=='Evacuating'&&<button className="secondary-action" onClick={()=>setEvacuationZones(p=>p.map(x=>x.id===z.id?{...x,status:'Clear'}:x))}>Mark clear</button>}{z.status==='Clear'&&<Check size={20} className="completed-check"/>}</div></article>)}</div></section>}

          {activeSection==='teams'&&<section className="emergency-page"><div className="page-heading"><div><span className="page-label">EMERGENCY PERSONNEL</span><h2>Teams & Personnel</h2><p>Track response teams, team leads, deployment and readiness.</p></div><button className="primary-action" onClick={()=>setEmergencyTeams(p=>[{id:Date.now(),name:'New Response Team',lead:'Assigned later',members:6,status:'Standby',location:'Control Room'},...p])}><HardHat size={17}/> Add Response Team</button></div><div className="team-summary"><div><HardHat size={20}/><span>Teams deployed</span><strong>{deployedTeams}</strong></div><div><Radio size={20}/><span>Teams available</span><strong>{emergencyTeams.filter(t=>t.status==='Standby').length}</strong></div><div><ShieldCheck size={20}/><span>Personnel ready</span><strong>26</strong></div><div><Activity size={20}/><span>Network status</span><strong>100%</strong></div></div><div className="emergency-team-grid">{emergencyTeams.map(t=><article className="emergency-team-card" key={t.id}><div className="team-card-head"><div className="team-avatar"><HardHat size={21}/></div><div><h3>{t.name}</h3><span>Lead: {t.lead}</span></div><b>{t.status}</b></div><div className="team-card-meta"><span><HardHat size={14}/>{t.members} members</span><span><MapPin size={14}/>{t.location}</span></div>{t.status==='Standby'?<button className="secondary-action" onClick={()=>setEmergencyTeams(p=>p.map(x=>x.id===t.id?{...x,status:'Deployed'}:x))}>Deploy Team</button>:<button className="secondary-action" onClick={()=>setEmergencyTeams(p=>p.map(x=>x.id===t.id?{...x,status:'Standby'}:x))}>Return to Standby</button>}</article>)}</div></section>}

          {activeSection==='timeline'&&<section className="emergency-page"><div className="page-heading"><div><span className="page-label">RESPONSE RECORD</span><h2>Incident Timeline</h2><p>Maintain a chronological record of emergency decisions and response actions.</p></div><button className="primary-action" onClick={()=>setEmergencyTimeline(p=>[{id:Date.now(),time:'Now',event:'Command update recorded',detail:'Emergency controller added a response timeline event',type:'info'},...p])}><Clock3 size={17}/> Add Timeline Event</button></div><div className="timeline-panel dashboard-panel">{emergencyTimeline.map(item=><div className="emergency-timeline-item" key={item.id}><div className={`timeline-dot ${item.type}`}></div><div className="timeline-time">{item.time}</div><div className="timeline-content"><strong>{item.event}</strong><span>{item.detail}</span></div></div>)}</div></section>}

          {activeSection==='communications'&&<section className="emergency-page"><div className="page-heading"><div><span className="page-label">EMERGENCY COMMUNICATIONS</span><h2>Emergency Alerts & Communications</h2><p>Broadcast instructions and verify response-channel delivery.</p></div><button className="primary-action emergency-declare" onClick={()=>setEmergencyMessages(p=>[{id:Date.now(),title:'Emergency broadcast sent to all mine zones',time:'Just now',status:'Delivered'},...p])}><Radio size={17}/> Broadcast Emergency Alert</button></div><div className="communication-status-grid emergency-communication-grid"><div><Radio size={21}/><span>Emergency Radio</span><strong>ONLINE</strong><small>All response channels connected</small></div><div><Bell size={21}/><span>Alert Broadcast</span><strong>ACTIVE</strong><small>Mine-wide delivery enabled</small></div><div><ShieldCheck size={21}/><span>Command Link</span><strong>SECURE</strong><small>Emergency control channel stable</small></div></div><div className="dashboard-panel"><div className="panel-header"><div><h3>Emergency Communication Log</h3><p>Recent broadcasts and response acknowledgements.</p></div></div><div className="controller-message-list">{emergencyMessages.map(m=><div key={m.id}><Radio size={18}/><span><strong>{m.title}</strong><small>{m.time}</small></span><b>{m.status}</b></div>)}</div></div></section>}

          {activeSection==='zones'&&<section className="emergency-page"><div className="page-heading"><div><span className="page-label">CRITICAL AREA STATUS</span><h2>Critical Zone Status</h2><p>Review conditions and response state across high-priority mine areas.</p></div><span className="live-badge emergency-live">● LIVE</span></div><div className="critical-zone-grid">{[['Zone B','CRITICAL','Dust exposure · evacuation active'],['Sector C-02','HIGH','Ventilation isolated · engineering response'],['Workshop A','NORMAL','No active emergency condition'],['North Pit','NORMAL','Personnel accounted · route clear'],['Processing Plant','NORMAL','Operations stable'],['Haul Road 2','MONITORING','Dust levels being observed']].map((z,i)=><article className={`critical-zone-card ${z[1].toLowerCase()}`} key={i}><div><MapPin size={19}/><span>{z[0]}</span><b>{z[1]}</b></div><h3>{z[1]==='CRITICAL'?'Immediate action required':z[1]==='HIGH'?'Response team monitoring':'Operational status normal'}</h3><p>{z[2]}</p><small>Updated just now</small></article>)}</div></section>}

          {activeSection==='alerts'&&<section className="emergency-page"><div className="page-heading"><div><span className="page-label">EMERGENCY NOTIFICATIONS</span><h2>Emergency Alerts</h2><p>Review and acknowledge critical notifications during active response.</p></div><button className="secondary-action" onClick={()=>setAlerts(p=>p.map(a=>({...a,unread:false})))}>Acknowledge all</button></div><div className="emergency-list">{alerts.map(a=><article className={`emergency-list-card ${a.unread?'unread-card':''}`} key={a.id}><div className={`emergency-list-icon ${a.type==='HIGH'?'critical-icon':'info-icon'}`}>{a.type==='HIGH'?<TriangleAlert size={22}/>:<Bell size={22}/>}</div><div className="emergency-list-main"><div className="list-card-top"><h3>{a.title}</h3><div>{a.unread&&<b className="new-tag">NEW</b>}<b className={`severity-tag ${a.type.toLowerCase()}`}>{a.type}</b></div></div><p>{a.category} · {a.location}</p><span>{a.description} · {a.time}</span></div>{a.unread&&<button className="secondary-action" onClick={()=>setAlerts(p=>p.map(x=>x.id===a.id?{...x,unread:false}:x))}>Acknowledge</button>}</article>)}</div></section>}

          {activeSection==='profile'&&<section className="emergency-page"><div className="page-heading"><div><span className="page-label">ACCOUNT</span><h2>My Profile</h2><p>Emergency controller identity, authority and response responsibilities.</p></div></div><div className="profile-grid"><section className="dashboard-panel"><div className="profile-card-heading"><div><span className="page-label">IDENTITY</span><h3>Emergency Controller</h3></div><TriangleAlert size={22}/></div><div className="profile-fields"><label><span>Full Name</span><input defaultValue="Emergency Controller"/></label><label><span>Controller ID</span><input defaultValue="MG-E006" disabled/></label><label><span>Assigned Mine</span><input defaultValue="Mine Site Alpha"/></label><label><span>Command Area</span><input defaultValue="Mine-wide Emergency Response" disabled/></label></div></section><section className="dashboard-panel"><div className="profile-card-heading"><div><span className="page-label">AUTHORITY</span><h3>Emergency Command Access</h3></div><ShieldCheck size={22}/></div><div className="assignment-list"><div><span>Emergency Declaration</span><strong>Authorized</strong></div><div><span>Evacuation Control</span><strong>Level III</strong></div><div><span>Response Dispatch</span><strong>Mine-wide</strong></div><div><span>Emergency Broadcast</span><strong>Enabled</strong></div></div></section></div></section>}
        </main>
      </div>
    )
  }

  /* =========================
     FIELD CONTROLLER DASHBOARD
     ========================= */

  if (dashboard && selectedRole === 'controller') {
    const activeIncidents = controllerIncidents.filter(i => i.status !== 'Resolved').length
    const unreadAlerts = alerts.filter(a => a.unread).length

    return (
      <div className="worker-app controller-app">
        <aside className="sidebar">
          <div className="sidebar-brand"><div className="brand-mark"><ShieldCheck size={25}/></div><div><h1>MineGuard</h1><p>Safety & Compliance</p></div></div>
          <nav className="sidebar-nav">
            <p className="nav-title">CONTROLLER WORKSPACE</p>
            {[['dashboard',LayoutDashboard,'Dashboard'],['monitoring',Activity,'Live Monitoring'],['tracking',MapPin,'Zone Tracking'],['incidents',TriangleAlert,'Incident Control'],['communications',Radio,'Communications'],['alerts',Bell,'Safety Alerts']].map(([id,Icon,label])=><button key={id} className={`nav-item ${activeSection===id?'active':''}`} onClick={()=>setActiveSection(id)}><Icon size={18}/><span>{label}</span>{id==='incidents'&&activeIncidents>0&&<b className="nav-badge">{activeIncidents}</b>}{id==='alerts'&&unreadAlerts>0&&<b className="nav-badge">{unreadAlerts}</b>}</button>)}
            <p className="nav-title second-title">ACCOUNT</p>
            <button className={`nav-item ${activeSection==='profile'?'active':''}`} onClick={()=>setActiveSection('profile')}><User size={18}/><span>My Profile</span></button>
          </nav>
          <div className="sidebar-bottom"><div className="sidebar-user"><div className="user-avatar"><Radio size={18}/></div><div><strong>Field Controller</strong><span>Controller ID: MG-C008</span></div></div><button className="sidebar-logout" onClick={()=>{setDashboard(false);setLoggedIn(false);setSelectedRole('');setActiveSection('dashboard')}}><LogOut size={16}/> Sign out</button></div>
        </aside>
        <main className="worker-main controller-main">
          {activeSection==='dashboard'&&<>
            <header className="worker-header"><div><span className="page-label">FIELD CONTROL WORKSPACE</span><h2>Good morning, Controller</h2><p>Coordinate field conditions, personnel status and safety response.</p></div><div className="operational-status"><span className="status-dot"></span><span>Control Network Online</span></div></header>
            <section className="controller-hero"><div><span className="page-label">LIVE FIELD OVERVIEW</span><h1>Keep every active zone under control.</h1><p>Monitor field conditions, acknowledge safety events and dispatch the right response team.</p></div><div className="controller-kpi"><span>Field Safety Index</span><strong>96%</strong><small>Stable · Live monitoring active</small></div></section>
            <div className="stat-grid controller-stats"><div className="stat-card"><div className="stat-icon"><Activity size={21}/></div><span>Active Zones</span><strong>12</strong><small>All reporting</small></div><div className="stat-card"><div className="stat-icon"><TriangleAlert size={21}/></div><span>Active Incidents</span><strong>{activeIncidents}</strong><small>Response required</small></div><div className="stat-card"><div className="stat-icon"><Radio size={21}/></div><span>Connected Sensors</span><strong>48/48</strong><small>100% online</small></div><div className="stat-card"><div className="stat-icon"><HardHat size={21}/></div><span>Workers Tracked</span><strong>248</strong><small>Mine-wide visibility</small></div></div>
            <div className="content-grid"><section className="dashboard-panel"><div className="panel-header"><div><h3>Active Field Incidents</h3><p>Events requiring controller attention.</p></div><button className="panel-link" onClick={()=>setActiveSection('incidents')}>Manage <ChevronRight size={15}/></button></div>{controllerIncidents.map(i=><div className="controller-incident-row" key={i.id}><div className={`risk-marker ${i.severity.toLowerCase()}`}></div><div><strong>{i.title}</strong><span><MapPin size={13}/> {i.zone} · {i.assigned}</span></div><b>{i.status}</b></div>)}</section><section className="dashboard-panel"><div className="panel-header"><div><h3>Field Communications</h3><p>Latest controller activity.</p></div><button className="panel-link" onClick={()=>setActiveSection('communications')}>Open <ChevronRight size={15}/></button></div>{controllerMessages.map(m=><div className="controller-message-row" key={m.id}><div className="message-icon"><Radio size={17}/></div><div><strong>{m.title}</strong><span>{m.time}</span></div><b>{m.status}</b></div>)}</section></div>
            <section className="dashboard-panel"><div className="panel-header"><div><h3>Live Field Conditions</h3><p>Current telemetry from monitored operational zones.</p></div></div><div className="controller-monitor-grid"><div><Wind size={19}/><span>Air Quality</span><strong>Good</strong><small>Zone B · 42 µg/m³</small></div><div><Thermometer size={19}/><span>Temperature</span><strong>28°C</strong><small>Normal operating range</small></div><div><Activity size={19}/><span>Ground Stability</span><strong>Normal</strong><small>No abnormal movement</small></div><div><Radio size={19}/><span>Radio Network</span><strong>Online</strong><small>12/12 zones connected</small></div></div></section>
          </>}
          {activeSection==='monitoring'&&<section className="controller-page"><div className="page-heading"><div><span className="page-label">REAL-TIME TELEMETRY</span><h2>Live Field Monitoring</h2><p>Monitor environmental and operational signals across active mine zones.</p></div><span className="live-badge">● LIVE</span></div><div className="controller-zone-grid">{[['Zone B','Air Quality','Good','42 µg/m³'],['Sector C-02','Ventilation','Warning','78% efficiency'],['Workshop A','Temperature','Normal','27°C'],['North Pit','Ground Stability','Normal','Stable'],['Haul Road 2','Dust Level','Good','31 µg/m³'],['Processing Plant','Equipment Status','Normal','96% available']].map((x,i)=><article className="controller-zone-card" key={i}><div className="controller-zone-top"><MapPin size={18}/><b>{x[0]}</b><span className={x[2]==='Warning'?'condition-warning':'condition-good'}>{x[2]}</span></div><h3>{x[1]}</h3><strong>{x[3]}</strong><small>Updated just now</small></article>)}</div></section>}
          {activeSection==='tracking'&&<section className="controller-page"><div className="page-heading"><div><span className="page-label">PERSONNEL VISIBILITY</span><h2>Worker & Zone Tracking</h2><p>Review active personnel distribution and zone occupancy.</p></div></div><div className="tracking-summary"><div><HardHat size={20}/><span>Workers on site</span><strong>248</strong></div><div><MapPin size={20}/><span>Active zones</span><strong>12</strong></div><div><Radio size={20}/><span>Tracking coverage</span><strong>100%</strong></div><div><TriangleAlert size={20}/><span>Zone exceptions</span><strong>2</strong></div></div><div className="dashboard-panel"><div className="panel-header"><div><h3>Zone Occupancy</h3><p>Current worker distribution by operational area.</p></div></div><div className="tracking-list">{[['Sector B-04','42 workers','Normal'],['Zone B','36 workers','Attention'],['Sector C-02','51 workers','Normal'],['Workshop A','28 workers','Normal'],['North Pit','63 workers','Normal'],['Processing Plant','28 workers','Normal']].map((x,i)=><div key={i}><MapPin size={17}/><span><strong>{x[0]}</strong><small>{x[1]}</small></span><b>{x[2]}</b><ChevronRight size={17}/></div>)}</div></div></section>}
          {activeSection==='incidents'&&<section className="controller-page"><div className="page-heading"><div><span className="page-label">FIELD RESPONSE</span><h2>Incident Control</h2><p>Acknowledge, dispatch and resolve field safety incidents.</p></div><button className="primary-action" onClick={()=>setControllerIncidents(p=>[{id:Date.now(),title:'New field incident',zone:'Unassigned Zone',severity:'High',status:'Active',assigned:'Control Room'},...p])}><TriangleAlert size={17}/> Create Incident</button></div><div className="controller-list">{controllerIncidents.map(i=><article className="controller-list-card" key={i.id}><div className={`risk-icon ${i.severity.toLowerCase()}`}><TriangleAlert size={20}/></div><div className="controller-list-main"><div className="list-card-top"><h3>{i.title}</h3><b className={`severity-tag ${i.severity.toLowerCase()}`}>{i.severity}</b></div><p><MapPin size={14}/> {i.zone} · Assigned to {i.assigned}</p><span>Status: {i.status}</span></div><div className="controller-actions">{i.status==='Active'&&<button className="secondary-action" onClick={()=>setControllerIncidents(p=>p.map(x=>x.id===i.id?{...x,status:'Dispatched'}:x))}>Dispatch</button>}{i.status!=='Resolved'&&<button className="secondary-action" onClick={()=>setControllerIncidents(p=>p.map(x=>x.id===i.id?{...x,status:'Resolved'}:x))}>Resolve</button>}{i.status==='Resolved'&&<Check size={20} className="completed-check"/>}</div></article>)}</div></section>}
          {activeSection==='communications'&&<section className="controller-page"><div className="page-heading"><div><span className="page-label">CONTROL ROOM COMMUNICATIONS</span><h2>Communications</h2><p>Coordinate field teams and track response acknowledgements.</p></div><button className="primary-action" onClick={()=>setControllerMessages(p=>[{id:Date.now(),title:'Broadcast sent to field teams',time:'Just now',status:'Sent'},...p])}><Radio size={17}/> Broadcast Update</button></div><div className="communication-status-grid"><div><Radio size={21}/><span>Radio Network</span><strong>Online</strong><small>12 / 12 zones</small></div><div><Activity size={21}/><span>Control Link</span><strong>Stable</strong><small>Latency 42 ms</small></div><div><Bell size={21}/><span>Alert Channel</span><strong>Active</strong><small>{unreadAlerts} unread events</small></div></div><div className="dashboard-panel"><div className="panel-header"><div><h3>Communication Log</h3><p>Recent field coordination events.</p></div></div><div className="controller-message-list">{controllerMessages.map(m=><div key={m.id}><Radio size={18}/><span><strong>{m.title}</strong><small>{m.time}</small></span><b>{m.status}</b></div>)}</div></div></section>}
          {activeSection==='alerts'&&<section className="controller-page"><div className="page-heading"><div><span className="page-label">SAFETY NOTIFICATIONS</span><h2>Safety Alerts</h2><p>Review and acknowledge mine-wide field safety events.</p></div><button className="secondary-action" onClick={()=>setAlerts(p=>p.map(a=>({...a,unread:false})))}>Mark all as read</button></div><div className="controller-list">{alerts.map(a=><article className="controller-list-card" key={a.id}><div className={`risk-icon ${a.type==='HIGH'?'critical':'info'}`}>{a.type==='HIGH'?<TriangleAlert size={20}/>:<Bell size={20}/>}</div><div className="controller-list-main"><div className="list-card-top"><h3>{a.title}</h3><b className={`severity-tag ${a.type.toLowerCase()}`}>{a.type}</b></div><p>{a.category} · {a.location}</p><span>{a.description} · {a.time}</span></div>{a.unread&&<button className="secondary-action" onClick={()=>setAlerts(p=>p.map(x=>x.id===a.id?{...x,unread:false}:x))}>Acknowledge</button>}</article>)}</div></section>}
          {activeSection==='profile'&&<section className="controller-page"><div className="page-heading"><div><span className="page-label">ACCOUNT</span><h2>My Profile</h2><p>Controller identity, assignment and field authority.</p></div></div><div className="profile-grid"><section className="dashboard-panel"><div className="profile-card-heading"><div><span className="page-label">IDENTITY</span><h3>Field Controller</h3></div><Radio size={22}/></div><div className="profile-fields"><label><span>Full Name</span><input defaultValue="Field Controller"/></label><label><span>Controller ID</span><input defaultValue="MG-C008" disabled/></label><label><span>Assigned Mine</span><input defaultValue="Mine Site Alpha"/></label><label><span>Control Area</span><input defaultValue="Mine-wide Field Operations" disabled/></label></div></section><section className="dashboard-panel"><div className="profile-card-heading"><div><span className="page-label">AUTHORITY</span><h3>Controller Access</h3></div><ShieldCheck size={22}/></div><div className="assignment-list"><div><span>Field Monitoring</span><strong>Authorized</strong></div><div><span>Incident Dispatch</span><strong>Level II</strong></div><div><span>Safety Broadcast</span><strong>Enabled</strong></div><div><span>Emergency Escalation</span><strong>Enabled</strong></div></div></section></div></section>}
        </main>
      </div>
    )
  }

  /* =========================
     INSPECTOR DASHBOARD
     ========================= */

  if (dashboard && selectedRole === 'inspector') {
    const openViolations = inspectorViolations.filter(v => v.status !== 'Resolved').length
    const pendingInspections = inspectorInspections.filter(i => i.status !== 'Completed').length
    const workerReportCount = hazardReports.length
    const pendingChecklistCount = checklistSubmissions.filter(c => c.status === 'Awaiting Verification' || c.status === 'Recheck Required').length

    return (
      <div className="worker-app inspector-app">
        <aside className="sidebar">
          <div className="sidebar-brand">
            <div className="brand-mark"><ShieldCheck size={25} strokeWidth={2} /></div>
            <div><h1>MineGuard</h1><p>Safety & Compliance</p></div>
          </div>

          <nav className="sidebar-nav">
            <p className="nav-title">INSPECTOR WORKSPACE</p>
            {[
              ['dashboard', LayoutDashboard, 'Dashboard'],
              ['inspections', ClipboardCheck, 'Inspections'],
              ['reports', FileWarning, 'Worker Reports'],
              ['checklist-review', ClipboardCheck, 'Checklist Verification'],
              ['violations', TriangleAlert, 'Violations'],
              ['compliance', ShieldCheck, 'Compliance'],
              ['alerts', Bell, 'Alerts'],
            ].map(([id, Icon, label]) => (
              <button key={id} className={`nav-item ${activeSection === id ? 'active' : ''}`} onClick={() => { setActiveSection(id); setShowHazardForm(false); setShowChecklist(false); }}>
                <Icon size={18} />
                <span>{label}</span>
                {id === 'reports' && workerReportCount > 0 && <b className="nav-badge">{workerReportCount}</b>}
                {id === 'checklist-review' && pendingChecklistCount > 0 && <b className="nav-badge">{pendingChecklistCount}</b>}
                {id === 'violations' && openViolations > 0 && <b className="nav-badge">{openViolations}</b>}
                {id === 'alerts' && alerts.filter(a => a.unread).length > 0 && <b className="nav-badge">{alerts.filter(a => a.unread).length}</b>}
              </button>
            ))}

            <p className="nav-title second-title">ACCOUNT</p>
            <button className={`nav-item ${activeSection === 'profile' ? 'active' : ''}`} onClick={() => setActiveSection('profile')}>
              <User size={18} /><span>My Profile</span>
            </button>
          </nav>

          <div className="sidebar-bottom">
            <div className="sidebar-user">
              <div className="user-avatar"><Search size={18} /></div>
              <div><strong>Safety Inspector</strong><span>Inspector ID: MG-I014</span></div>
            </div>
            <button className="sidebar-logout" onClick={() => { setDashboard(false); setLoggedIn(false); setSelectedRole(''); }}>
              <LogOut size={16} /> Sign out
            </button>
          </div>
        </aside>

        <main className="worker-main inspector-main">
          {activeSection === 'dashboard' && (
            <>
              <header className="worker-header">
                <div><span className="page-label">INSPECTION WORKSPACE</span><h2>Good morning, Inspector</h2><p>Review mine conditions, worker reports and compliance risks.</p></div>
                <div className="operational-status"><span className="status-dot"></span><span>Mine Operational</span></div>
              </header>

              <section className="inspector-hero">
                <div><span className="page-label">TODAY'S OVERVIEW</span><h1>Safety inspections under control.</h1><p>Prioritize high-risk findings and keep every inspection traceable.</p></div>
                <div className="inspector-score"><span>Compliance Score</span><strong>91%</strong><small>+3% this week</small></div>
              </section>

              <div className="stat-grid inspector-stats">
                <div className="stat-card"><div className="stat-icon stat-blue"><ClipboardCheck size={21}/></div><span>Pending Inspections</span><strong>{pendingInspections}</strong><small>Due today</small></div>
                <div className="stat-card"><div className="stat-icon stat-red"><TriangleAlert size={21}/></div><span>Open Violations</span><strong>{openViolations}</strong><small>1 critical</small></div>
                <div className="stat-card"><div className="stat-icon stat-amber"><FileWarning size={21}/></div><span>Worker Reports</span><strong>{workerReportCount}</strong><small>Awaiting review</small></div>
                <div className="stat-card"><div className="stat-icon stat-green"><Check size={21}/></div><span>Completed</span><strong>18</strong><small>This month</small></div>
              </div>

              <div className="content-grid inspector-content-grid">
                <section className="dashboard-panel">
                  <div className="panel-header"><div><h3>Today's Inspections</h3><p>Assigned inspection schedule.</p></div><button className="panel-link" onClick={() => setActiveSection('inspections')}>View all <ChevronRight size={15}/></button></div>
                  {inspectorInspections.slice(0,2).map(item => <div className="inspection-row" key={item.id}><div className="inspection-icon"><ClipboardCheck size={18}/></div><div className="inspection-info"><strong>{item.title}</strong><span><MapPin size={13}/> {item.area} · {item.due}</span></div><b className={`status-pill ${item.status.toLowerCase()}`}>{item.status}</b></div>)}
                </section>

                <section className="dashboard-panel">
                  <div className="panel-header"><div><h3>Priority Violations</h3><p>Issues requiring attention.</p></div><button className="panel-link" onClick={() => setActiveSection('violations')}>Review <ChevronRight size={15}/></button></div>
                  {inspectorViolations.slice(0,3).map(v => <div className="violation-row" key={v.id}><div className={`violation-marker ${v.severity.toLowerCase()}`}></div><div><strong>{v.title}</strong><span>{v.area}</span></div><b>{v.severity}</b></div>)}
                </section>
              </div>

              <section className="dashboard-panel inspector-readiness"><div><h3>Inspection readiness</h3><p>Mine documentation, worker reports and compliance records are available for today's review.</p></div><div className="readiness-items"><span><Check size={15}/> PPE records</span><span><Check size={15}/> Equipment logs</span><span><Check size={15}/> Worker reports</span></div></section>
            </>
          )}

          {activeSection === 'inspections' && (
            <section className="inspector-page">
              <div className="page-heading"><div><span className="page-label">INSPECTION MANAGEMENT</span><h2>Inspections</h2><p>Plan, perform and record safety inspections across assigned areas.</p></div><button className="primary-action" onClick={() => setInspectorInspections(prev => [{ id: Date.now(), title: 'New General Safety Inspection', area: 'Unassigned Area', due: 'Just created', status: 'Scheduled', priority: 'Normal' }, ...prev])}><ClipboardCheck size={17}/> Create Inspection</button></div>
              <div className="inspector-list">
                {inspectorInspections.map(item => <article className="inspector-list-card" key={item.id}><div className="list-card-icon"><ClipboardCheck size={20}/></div><div className="list-card-main"><div className="list-card-top"><h3>{item.title}</h3><b className={`status-pill ${item.status.toLowerCase()}`}>{item.status}</b></div><p><MapPin size={14}/> {item.area}</p><span><Clock3 size={14}/> {item.due} · Priority: {item.priority}</span></div>{item.status !== 'Completed' ? <button className="secondary-action" onClick={() => setInspectorInspections(prev => prev.map(x => x.id === item.id ? {...x, status:'Completed', due:'Completed just now'} : x))}>Complete</button> : <Check size={20} className="completed-check"/>}</article>)}
              </div>
            </section>
          )}

          {activeSection === 'reports' && (
            <section className="inspector-page">
              <div className="page-heading"><div><span className="page-label">FIELD REPORTS</span><h2>Worker Reports</h2><p>Review hazards submitted from the worker workspace.</p></div></div>
              {hazardReports.length === 0 ? <div className="empty-inspector"><FileWarning size={30}/><h3>No worker reports yet</h3><p>New hazard reports submitted by workers will appear here.</p></div> : <div className="inspector-list">{hazardReports.map(report => <article className="inspector-list-card" key={report.id}><div className="list-card-icon warning"><TriangleAlert size={20}/></div><div className="list-card-main"><div className="list-card-top"><h3>{report.type}</h3><b className={`severity-tag ${report.severity.toLowerCase()}`}>{report.severity}</b></div><p><MapPin size={14}/> {report.location}</p><span>{report.description || 'No additional description provided.'} · Submitted {report.time}</span></div><button className="secondary-action" onClick={() => setInspectorViolations(prev => [{id:Date.now(), title:report.type, area:report.location, severity:report.severity, status:'Under Review', source:'Worker report'}, ...prev])}>Review</button></article>)}</div>}
            </section>
          )}

          {activeSection === 'checklist-review' && (
            <section className="inspector-page checklist-review-page">
              <div className="page-heading">
                <div><span className="page-label">WORKER SAFETY VERIFICATION</span><h2>Checklist Verification</h2><p>Verify worker safety checks using evidence, timestamp and submission records.</p></div>
                <div className="verification-summary"><span>{pendingChecklistCount} awaiting action</span><b>{checklistSubmissions.filter(c => c.status === 'Verified').length} verified</b></div>
              </div>
              <div className="checklist-review-list">
                {checklistSubmissions.map(submission => (
                  <article className={`checklist-review-card ${submission.status.toLowerCase().replaceAll(' ', '-')}`} key={submission.id}>
                    <div className="review-card-icon"><ClipboardCheck size={22}/></div>
                    <div className="review-card-main">
                      <div className="list-card-top"><h3>{submission.worker} · {submission.workerId}</h3><b className={`status-pill ${submission.status === 'Verified' ? 'verified-status' : submission.status === 'Rejected' ? 'critical-status' : 'review-status'}`}>{submission.status}</b></div>
                      <p><MapPin size={14}/> {submission.zone} · Submitted {submission.submittedAt}</p>
                      <div className="evidence-row"><span><Camera size={14}/> {submission.evidence}</span><span>{submission.locationVerified ? '✓ Location captured' : 'Location not captured'}</span></div>
                      {submission.verifiedBy && <small>Reviewed by {submission.verifiedBy} · {submission.verifiedAt} · {submission.note}</small>}
                    </div>
                    {submission.status !== 'Verified' && submission.status !== 'Rejected' ? (
                      <div className="review-actions">
                        <button className="secondary-action" onClick={() => { setInspectorChecklistReview(''); setChecklistSubmissions(prev => prev.map(x => x.id === submission.id ? {...x, status:'Verified', verifiedBy:'Safety Inspector', verifiedAt:'Just now', note:'Checklist and submitted evidence approved.'} : x)) }}>Approve</button>
                        <button className="secondary-action" onClick={() => setChecklistSubmissions(prev => prev.map(x => x.id === submission.id ? {...x, status:'Recheck Required', note:'One or more checklist items require physical recheck.'} : x))}>Request Recheck</button>
                        <button className="secondary-action" onClick={() => setChecklistSubmissions(prev => prev.map(x => x.id === submission.id ? {...x, status:'Rejected', verifiedBy:'Safety Inspector', verifiedAt:'Just now', note:'Submitted evidence was insufficient.'} : x))}>Reject</button>
                      </div>
                    ) : <Check size={21} className="completed-check"/>}
                  </article>
                ))}
              </div>
              <div className="dashboard-panel verification-note-panel">
                <div className="panel-header"><div><h3>Verification rule</h3><p>A completed checkbox alone is not treated as proof. Verification can use submitted evidence, location capture and inspector review.</p></div><ShieldCheck size={21}/></div>
              </div>
            </section>
          )}

          {activeSection === 'violations' && (
            <section className="inspector-page"><div className="page-heading"><div><span className="page-label">RISK MANAGEMENT</span><h2>Safety Violations</h2><p>Track findings until they are resolved and verified.</p></div></div><div className="inspector-list">{inspectorViolations.map(v => <article className="inspector-list-card" key={v.id}><div className={`list-card-icon violation-${v.severity.toLowerCase()}`}><TriangleAlert size={20}/></div><div className="list-card-main"><div className="list-card-top"><h3>{v.title}</h3><div><b className={`severity-tag ${v.severity.toLowerCase()}`}>{v.severity}</b><b className="status-pill review-status">{v.status}</b></div></div><p><MapPin size={14}/> {v.area}</p><span>Source: {v.source}</span></div>{v.status !== 'Resolved' ? <button className="secondary-action" onClick={() => setInspectorViolations(prev => prev.map(x => x.id === v.id ? {...x, status:'Resolved'} : x))}>Resolve</button> : <Check size={20} className="completed-check"/>}</article>)}</div></section>
          )}

          {activeSection === 'compliance' && (
            <section className="inspector-page"><div className="page-heading"><div><span className="page-label">REGULATORY CONTROL</span><h2>Compliance</h2><p>Monitor the current compliance position of inspected areas.</p></div></div><div className="compliance-overview"><div className="compliance-big"><span>Overall compliance</span><strong>91%</strong><div className="progress-track"><div style={{width:'91%'}}></div></div><small>Based on the latest inspection records</small></div><div className="compliance-checks"><div><strong>Equipment Safety</strong><span>96%</span></div><div><strong>Worker PPE</strong><span>94%</span></div><div><strong>Environmental Controls</strong><span>88%</span></div><div><strong>Emergency Readiness</strong><span>86%</span></div></div></div><div className="dashboard-panel"><div className="panel-header"><div><h3>Compliance Controls</h3><p>Current inspection control areas.</p></div></div><div className="compliance-control-list"><div><Check size={17}/><span>Required safety documentation available</span><b>COMPLIANT</b></div><div><Check size={17}/><span>Routine equipment inspection records</span><b>COMPLIANT</b></div><div><TriangleAlert size={17}/><span>Environmental threshold monitoring</span><b className="attention">REVIEW</b></div></div></div></section>
          )}

          {activeSection === 'alerts' && (
            <section className="inspector-page"><div className="page-heading"><div><span className="page-label">SAFETY NOTIFICATIONS</span><h2>Inspector Alerts</h2><p>Critical conditions and compliance events requiring attention.</p></div><button className="secondary-action" onClick={() => setAlerts(prev => prev.map(a => ({...a, unread:false})))}>Mark all as read</button></div><div className="inspector-list">{alerts.map(a => <article className={`inspector-list-card ${a.unread ? 'unread-card' : ''}`} key={a.id}><div className={`list-card-icon ${a.type === 'HIGH' ? 'warning' : ''}`}>{a.type === 'HIGH' ? <TriangleAlert size={20}/> : <Bell size={20}/>}</div><div className="list-card-main"><div className="list-card-top"><h3>{a.title}</h3><div>{a.unread && <b className="new-tag">NEW</b>}<b className={`severity-tag ${a.type.toLowerCase()}`}>{a.type}</b></div></div><p>{a.category} · {a.location}</p><span>{a.description} · {a.time}</span></div>{a.unread && <button className="secondary-action" onClick={() => setAlerts(prev => prev.map(x => x.id === a.id ? {...x, unread:false} : x))}>Mark read</button>}</article>)}</div></section>
          )}

          {activeSection === 'profile' && (
            <section className="inspector-page"><div className="page-heading"><div><span className="page-label">ACCOUNT</span><h2>My Profile</h2><p>Inspector identity and assignment details.</p></div></div><div className="profile-grid"><section className="dashboard-panel"><div className="profile-card-heading"><div><span className="page-label">IDENTITY</span><h3>Safety Inspector</h3></div><Search size={22}/></div><div className="profile-fields"><label><span>Full Name</span><input defaultValue="Safety Inspector"/></label><label><span>Inspector ID</span><input defaultValue="MG-I014" disabled/></label><label><span>Assigned Mine</span><input defaultValue="Mine Site Alpha"/></label><label><span>Primary Zone</span><input defaultValue="Sector B & C"/></label></div></section><section className="dashboard-panel"><div className="profile-card-heading"><div><span className="page-label">CERTIFICATION</span><h3>Inspection Credentials</h3></div><ShieldCheck size={22}/></div><div className="assignment-list"><div><span>Safety Certification</span><strong>Valid</strong></div><div><span>Last Refresher</span><strong>12 Aug 2026</strong></div><div><span>Next Review</span><strong>12 Feb 2027</strong></div><div><span>Inspection Authority</span><strong>Level II</strong></div></div></section></div></section>
          )}
        </main>
      </div>
    )
  }

  /* =========================
     WORKER DASHBOARD
     ========================= */

  if (dashboard && selectedRole === 'worker' && !workerGuidelinesSeen) {
    const safetyGuidelines = [
      { number: '01', title: 'Personal Protective Equipment', text: 'Wear the required helmet, safety boots, eye protection, high-visibility clothing and other PPE before entering the work area.' },
      { number: '02', title: 'Know Your Work-Zone Hazards', text: 'Understand the hazards around your assigned zone, including moving equipment, unstable ground, dust and restricted areas.' },
      { number: '03', title: 'Air Quality & Ventilation', text: 'Pay attention to dust, gas and ventilation warnings. Leave the area and report abnormal conditions immediately.' },
      { number: '04', title: 'Equipment & Machinery Safety', text: 'Use only authorized equipment, complete required pre-use checks and keep clear of operating machinery.' },
      { number: '05', title: 'Emergency Procedures', text: 'Know the nearest emergency route and assembly point. Follow instructions from authorized emergency personnel without delay.' },
      { number: '06', title: 'Daily Safety Checks', text: 'Complete your assigned safety checklist before beginning work and report anything that is unsafe or not functioning correctly.' },
    ]

    return (
      <div className="worker-guideline-onboarding">
        <div className="guideline-onboarding-shell">
          <header className="guideline-onboarding-header">
            <div className="sidebar-brand onboarding-brand">
              <div className="brand-mark"><ShieldCheck size={25} strokeWidth={2} /></div>
              <div><h1>MineGuard</h1><p>Safety & Compliance</p></div>
            </div>
            <div className="onboarding-step"><span className="step-active">1</span><span className="step-line"></span><span className="step">2</span></div>
          </header>

          <main className="guideline-onboarding-content">
            <div className="onboarding-intro">
              <span className="page-label">SHIFT SAFETY CHECK-IN</span>
              <h2>Review your safety guidelines before starting work</h2>
              <p>These essential instructions help you work safely in the mine. Review them before accessing your worker dashboard.</p>
            </div>

            <div className="onboarding-guideline-grid">
              {safetyGuidelines.map((item) => (
                <article className="onboarding-guideline-card" key={item.number}>
                  <div className="onboarding-guideline-number">{item.number}</div>
                  <div><h3>{item.title}</h3><p>{item.text}</p></div>
                </article>
              ))}
            </div>

            <div className="onboarding-notice">
              <ShieldCheck size={20} />
              <div><strong>Safety comes first.</strong><span>If conditions appear unsafe, stop work and contact your supervisor or safety team.</span></div>
            </div>
\            <div className="onboarding-actions">
              <span>Step 1 of 2 · Safety Guidelines</span>
              <button className="onboarding-next-button" onClick={() => { setWorkerGuidelinesSeen(true); setActiveSection('dashboard') }}>
                I Understand — Continue <ArrowRight size={18} />
              </button>
            </div>
          </main>
        </div>
      </div>
    )
  }

  if (dashboard && selectedRole === 'worker') {
    return (
      <div className="worker-app">

        {/* SIDEBAR */}

        <aside className="sidebar">

          <div className="sidebar-brand">
            <div className="brand-mark">
              <ShieldCheck size={25} strokeWidth={2} />
            </div>

            <div>
              <h1>MineGuard</h1>
              <p>Safety & Compliance</p>
            </div>
          </div>

          <nav className="sidebar-nav">

            <p className="nav-title">WORKSPACE</p>

            <button
              className={`nav-item ${
                activeSection === "dashboard" ? "active" : ""
              }`}
              onClick={() => {
                setActiveSection("dashboard")
                setShowHazardForm(false)
                setShowChecklist(false)
              }}
            >
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </button>

            <button
              className={`nav-item ${
                activeSection === "hazard" ? "active" : ""
              }`}
              onClick={() => {
                setActiveSection("hazard")
                setShowHazardForm(true)
                setShowChecklist(false)
              }}
            >
              <TriangleAlert size={18} />
              <span>Report Hazard</span>
            </button>

            <button
              className={`nav-item ${
                activeSection === "checklist" ? "active" : ""
              }`}
              onClick={() => {
                setActiveSection("checklist")
                setShowChecklist(true)
                setShowHazardForm(false)
              }}
            >
              <ClipboardCheck size={18} />
              <span>Safety Checklist</span>
            </button>

            <button
              className={`nav-item ${
                activeSection === "guidelines" ? "active" : ""
              }`}
              onClick={() => {
                setActiveSection("guidelines")
                setShowHazardForm(false)
                setShowChecklist(false)
              }}
            >
              <BookOpen size={18} />
              <span>Safety Guidelines</span>
            </button>

            <button
              className={`nav-item ${
                activeSection === "health" ? "active" : ""
              }`}
              onClick={() => {
                setActiveSection("health")
                setShowHazardForm(false)
                setShowChecklist(false)
              }}
            >
              <HeartPulse size={18} />
              <span>Health & Emergency Help</span>
            </button>

            <button
              className={`nav-item ${
                activeSection === "alerts" ? "active" : ""
              }`}
              onClick={() => {
                setActiveSection("alerts")
                setShowHazardForm(false)
                setShowChecklist(false)
              }}
            >
              <Bell size={18} />
              <span>Alerts</span>
              {alerts.filter((alert) => alert.unread).length > 0 && (
                <b className="nav-badge">
                  {alerts.filter((alert) => alert.unread).length}
                </b>
              )}
            </button>

            <p className="nav-title second-title">ACCOUNT</p>

            <button
              className={`nav-item ${
                activeSection === "profile" ? "active" : ""
              }`}
              onClick={() => {
                setActiveSection("profile")
                setShowHazardForm(false)
                setShowChecklist(false)
              }}
            >
              <User size={18} />
              <span>My Profile</span>
            </button>

          </nav>

          <div className="sidebar-bottom">

            <div className="sidebar-user">

              <div className="user-avatar">
                <HardHat size={18} />
              </div>

              <div>
                <strong>Mine Worker</strong>
                <span>Worker ID: MG-W001</span>
              </div>

            </div>

            <button
              className="sidebar-logout"
              onClick={() => {
                setDashboard(false)
                setLoggedIn(false)
                setSelectedRole('')
                setWorkerGuidelinesSeen(false)
              }}
            >
              <LogOut size={16} />
              Sign out
            </button>

          </div>

        </aside>

        {/* MAIN CONTENT */}

        <main className="worker-main">

          {activeSection === "health" ? (
            <section className="health-page">
              <div className="health-page-header">
                <div>
                  <span className="page-label">HEALTH & EMERGENCY SUPPORT</span>
                  <h2>Health & Emergency Help</h2>
                  <p>Get medical assistance, report health concerns and access mine emergency contacts.</p>
                </div>
                <button className="health-emergency-button" onClick={() => alert('Emergency Control Room contacted. Medical response has been requested.')}>
                  <PhoneCall size={17} /> Emergency Call
                </button>
              </div>

              <div className="health-contact-grid">
                <article className="health-contact-card priority">
                  <div className="health-icon"><Ambulance size={24} /></div>
                  <div><span>MEDICAL EMERGENCY</span><h3>Mine Medical Team</h3><p>Immediate assistance for accidents, injuries or sudden illness.</p></div>
                  <button onClick={() => alert('Calling Mine Medical Team: +91 1800-MINE-HELP')}> <PhoneCall size={16} /> Call</button>
                </article>
                <article className="health-contact-card">
                  <div className="health-icon"><HeartPulse size={24} /></div>
                  <div><span>EMERGENCY CONTROL</span><h3>Emergency Controller</h3><p>Coordinate evacuation, rescue and critical incident response.</p></div>
                  <button onClick={() => alert('Emergency Controller contacted.')}> <PhoneCall size={16} /> Contact</button>
                </article>
                <article className="health-contact-card">
                  <div className="health-icon"><Stethoscope size={24} /></div>
                  <div><span>HEALTH SUPPORT</span><h3>On-site Medical Bay</h3><p>For non-critical illness, first aid and health assessment.</p></div>
                  <button onClick={() => alert('Medical Bay contacted.')}> <PhoneCall size={16} /> Contact</button>
                </article>
              </div>

              <div className="health-content-grid">
                <article className="health-panel">
                  <div className="health-panel-heading"><div><span className="page-label">REPORT A HEALTH ISSUE</span><h3>Medical / Health Concern</h3></div><HeartPulse size={21} /></div>
                  <div className="health-form-grid">
                    <label><span>Issue Type</span><select id="health-type"><option>Accident / Injury</option><option>Respiratory Symptoms</option><option>Heat Stress / Dehydration</option><option>Suspected Contagious Disease</option><option>Other Health Concern</option></select></label>
                    <label><span>Location</span><input id="health-location" defaultValue="Sector B-04" /></label>
                  </div>
                  <label className="health-description"><span>Details</span><textarea id="health-details" placeholder="Describe the injury, symptoms or health concern..."></textarea></label>
                  <button className="primary-action health-submit" onClick={() => {
                    const type = document.getElementById('health-type')?.value || 'Health concern'
                    const location = document.getElementById('health-location')?.value || 'Work zone'
                    setHealthRequests(previous => [{ id: Date.now(), type, location, status: 'Submitted · Medical team notified', time: 'Just now' }, ...previous])
                    alert('Health issue reported. The medical team has been notified.')
                  }}>Report Health Issue</button>
                </article>

                <article className="health-panel">
                  <div className="health-panel-heading"><div><span className="page-label">YOUR REQUESTS</span><h3>Medical Support History</h3></div><ClipboardCheck size={21} /></div>
                  <div className="health-request-list">
                    {healthRequests.map(request => (
                      <div className="health-request" key={request.id}>
                        <div><strong>{request.type}</strong><span>{request.location} · {request.time}</span></div>
                        <b>{request.status}</b>
                      </div>
                    ))}
                  </div>
                </article>
              </div>

              <article className="health-guidance-panel">
                <div className="health-panel-heading"><div><span className="page-label">QUICK GUIDANCE</span><h3>When to Request Help</h3></div><ShieldCheck size={21} /></div>
                <div className="health-guidance-grid">
                  <div><strong>Accident or serious injury</strong><span>Call emergency support immediately and follow site emergency procedures.</span></div>
                  <div><strong>Breathing difficulty or dust exposure</strong><span>Move to a safe area and request medical assessment.</span></div>
                  <div><strong>Heat stress or dehydration</strong><span>Stop work, move to a cool area and contact the medical team.</span></div>
                  <div><strong>Suspected contagious illness</strong><span>Report symptoms promptly and follow site health-control instructions.</span></div>
                </div>
              </article>
            </section>
          ) : activeSection === "alerts" ? (
            <section className="alerts-page">
              <div className="alerts-page-header">
                <div>
                  <span className="page-label">SAFETY NOTIFICATIONS</span>
                  <h2>Alerts</h2>
                  <p>Review important safety notifications and conditions affecting your work zone.</p>
                </div>

                <button
                  className="mark-alerts-button"
                  onClick={() =>
                    setAlerts((previous) =>
                      previous.map((alert) => ({ ...alert, unread: false }))
                    )
                  }
                >
                  Mark all as read
                </button>
              </div>

              <div className="alerts-summary">
                <div>
                  <Bell size={20} />
                  <div>
                    <strong>{alerts.filter((alert) => alert.unread).length}</strong>
                    <span>Unread alerts</span>
                  </div>
                </div>
                <div>
                  <ShieldCheck size={20} />
                  <div>
                    <strong>Sector B-04</strong>
                    <span>Assigned work zone</span>
                  </div>
                </div>
              </div>

              <div className="alerts-list-page">
                {alerts.map((alert) => (
                  <article
                    className={`alert-page-item ${alert.unread ? "unread" : ""}`}
                    key={alert.id}
                  >
                    <div className={`alert-page-icon ${alert.type === "HIGH" ? "danger" : "info"}`}>
                      {alert.type === "HIGH" ? <TriangleAlert size={22} /> : <Activity size={22} />}
                    </div>

                    <div className="alert-page-content">
                      <div className="alert-page-title">
                        <div>
                          <h3>{alert.title}</h3>
                          <span>{alert.category}</span>
                        </div>
                        <span className={`alert-page-severity ${alert.type.toLowerCase()}`}>
                          {alert.type}
                        </span>
                      </div>

                      <p>{alert.description}</p>

                      <div className="alert-page-meta">
                        <span><MapPin size={14} />{alert.location}</span>
                        <span><Clock3 size={14} />{alert.time}</span>
                        {alert.unread && <b>NEW</b>}
                        {alert.unread && (
                          <button
                            className="alert-read-button"
                            onClick={() => setAlerts((previous) => previous.map((item) => item.id === alert.id ? { ...item, unread: false } : item))}
                          >
                            Mark as read
                          </button>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ) : activeSection === "profile" ? (
            <section className="profile-page">
              <div className="profile-page-header">
                <div>
                  <span className="page-label">WORKER ACCOUNT</span>
                  <h2>My Profile</h2>
                  <p>View your worker information, assignment and safety compliance status.</p>
                </div>
                <button
                  className="profile-edit-button"
                  onClick={() => setProfileEditing(!profileEditing)}
                >
                  <User size={17} />
                  {profileEditing ? "Save Profile" : "Edit Profile"}
                </button>
              </div>

              <div className="profile-layout">
                <article className="profile-card profile-identity-card">
                  <div className="profile-avatar-large"><HardHat size={34} /></div>
                  <h3>Mine Worker</h3>
                  <p>Underground Operations</p>
                  <span className="profile-id">Worker ID: MG-W001</span>
                  <div className="profile-active-status"><span className="status-dot"></span>Active Worker</div>
                </article>

                <article className="profile-card">
                  <div className="profile-card-heading">
                    <div><span className="page-label">PERSONAL INFORMATION</span><h3>Worker Details</h3></div>
                    <ShieldCheck size={20} />
                  </div>
                  <div className="profile-fields">
                    <label><span>Full Name</span><input disabled={!profileEditing} defaultValue="Mine Worker" /></label>
                    <label><span>Worker ID</span><input disabled defaultValue="MG-W001" /></label>
                    <label><span>Role</span><input disabled defaultValue="Mine Worker" /></label>
                    <label><span>Contact</span><input disabled={!profileEditing} defaultValue="+91 98XXXXXX21" /></label>
                  </div>
                </article>
              </div>

              <div className="profile-grid">
                <article className="profile-card">
                  <div className="profile-card-heading"><div><span className="page-label">CURRENT ASSIGNMENT</span><h3>Work Assignment</h3></div><MapPin size={20} /></div>
                  <div className="assignment-list">
                    <div><span>Work Zone</span><strong>Sector B-04</strong></div>
                    <div><span>Shift</span><strong>Morning Shift · 06:00–14:00</strong></div>
                    <div><span>Supervisor</span><strong>Shift Safety Supervisor</strong></div>
                    <div><span>Zone Status</span><strong className="check-ok">Operational</strong></div>
                  </div>
                </article>

                <article className="profile-card">
                  <div className="profile-card-heading"><div><span className="page-label">SAFETY COMPLIANCE</span><h3>Training & Compliance</h3></div><ClipboardCheck size={20} /></div>
                  <div className="compliance-row"><div><strong>PPE Training</strong><span>Completed · Valid</span></div><b className="compliance-good">COMPLIANT</b></div>
                  <div className="compliance-row"><div><strong>Emergency Procedures</strong><span>Completed · Valid</span></div><b className="compliance-good">COMPLIANT</b></div>
                  <div className="compliance-row"><div><strong>Equipment Safety</strong><span>Review due this month</span></div><b className="compliance-review">REVIEW</b></div>
                </article>
              </div>

              <article className="profile-card profile-security-card">
                <div className="profile-card-heading"><div><span className="page-label">ACCOUNT SECURITY</span><h3>Access & Security</h3></div><LockKeyhole size={20} /></div>
                <div className="security-items">
                  <div><div><strong>Login protection</strong><span>Password protected account</span></div><b>Enabled</b></div>
                  <div><div><strong>Last access</strong><span>Today · MineGuard workstation</span></div><b>08:14 AM</b></div>
                </div>
              </article>
            </section>
          ) : activeSection === "guidelines" ? (
            <section className="guidelines-page">
              <div className="guidelines-page-header">
                <div>
                  <span className="page-label">SAFETY REFERENCE</span>
                  <h2>Safety Guidelines</h2>
                  <p>
                    Essential safety procedures and operational guidance
                    for your current mining shift.
                  </p>
                </div>

                <div className="guidelines-status">
                  <ShieldCheck size={18} />
                  <span>Safety First</span>
                </div>
              </div>

              <div className="guidelines-page-grid">

                <article className="guideline-large-card">
                  <div className="guideline-large-icon">
                    <HardHat size={24} />
                  </div>
                  <div>
                    <span className="guideline-number">01</span>
                    <h3>Personal Protective Equipment</h3>
                    <p>
                      Wear the required helmet, safety footwear, high-visibility
                      clothing, eye protection and other PPE before entering
                      operational areas.
                    </p>
                  </div>
                </article>

                <article className="guideline-large-card">
                  <div className="guideline-large-icon">
                    <TriangleAlert size={24} />
                  </div>
                  <div>
                    <span className="guideline-number">02</span>
                    <h3>Hazard Awareness & Reporting</h3>
                    <p>
                      Stay alert to unsafe conditions, equipment problems and
                      environmental hazards. Report hazards immediately through
                      MineGuard.
                    </p>
                  </div>
                </article>

                <article className="guideline-large-card">
                  <div className="guideline-large-icon">
                    <Wind size={24} />
                  </div>
                  <div>
                    <span className="guideline-number">03</span>
                    <h3>Air Quality & Ventilation</h3>
                    <p>
                      Monitor air-quality conditions in your work zone. Follow
                      site instructions and leave the area when unsafe readings
                      or emergency warnings are issued.
                    </p>
                  </div>
                </article>

                <article className="guideline-large-card">
                  <div className="guideline-large-icon">
                    <Radio size={24} />
                  </div>
                  <div>
                    <span className="guideline-number">04</span>
                    <h3>Communication & Coordination</h3>
                    <p>
                      Keep approved communication equipment available and
                      maintain contact with supervisors and field controllers
                      during active operations.
                    </p>
                  </div>
                </article>

                <article className="guideline-large-card">
                  <div className="guideline-large-icon">
                    <TriangleAlert size={24} />
                  </div>
                  <div>
                    <span className="guideline-number">05</span>
                    <h3>Emergency Procedures</h3>
                    <p>
                      Know emergency routes, assembly points and site response
                      procedures. Follow instructions from authorized emergency
                      personnel without delay.
                    </p>
                  </div>
                </article>

                <article className="guideline-large-card">
                  <div className="guideline-large-icon">
                    <ClipboardCheck size={24} />
                  </div>
                  <div>
                    <span className="guideline-number">06</span>
                    <h3>Daily Safety Checks</h3>
                    <p>
                      Complete your assigned safety checklist before beginning
                      work and make sure outstanding safety tasks are addressed.
                    </p>
                  </div>
                </article>

              </div>

              <div className="guidelines-footer-note">
                <ShieldCheck size={19} />
                <div>
                  <strong>When in doubt, stop and ask.</strong>
                  <span>
                    Never continue an operation when you believe conditions are
                    unsafe. Contact your supervisor or safety team.
                  </span>
                </div>
              </div>
            </section>
          ) : (
            <>
          <header className="worker-topbar">

            <div>
              <span className="page-label">WORKER DASHBOARD</span>

              <h2>Good morning, Worker</h2>

              <p>
                Review your current safety status and operational information.
              </p>
            </div>

            <div className="mine-status">
              <span className="status-dot"></span>
              Mine Operational
            </div>

          </header>

          {/* IMPORTANT ACTIONS */}

          <section className="important-actions">

            <button
            className="hazard-action"
            onClick={() => setShowHazardForm(true)}
            >

              <div className="large-action-icon">
                <TriangleAlert size={25} />
              </div>

              <div>
                <strong>Report a Hazard</strong>
                <span>
                  Report an unsafe condition immediately.
                </span>
              </div>

              <ArrowRight size={20} />

            </button>

            <button
              className="checklist-action"
              onClick={() => setShowChecklist(true)}
            >

              <div className="large-action-icon">
                <ClipboardCheck size={25} />
              </div>

              <div>
                <strong>Today's Safety Checklist</strong>
                <span>
                  3 of 5 safety tasks completed.
                </span>
              </div>

              <ArrowRight size={20} />

            </button>

          </section>

          {/* STATISTICS */}

          <section className="stat-grid">

            <div className="stat-card">

              <div className="stat-icon">
                <ShieldCheck size={21} />
              </div>

              <div>
                <span>Safety Score</span>
                <strong>94%</strong>
                <small>↑ 4% this week</small>
              </div>

            </div>

            <div className="stat-card">

              <div className="stat-icon">
                <Bell size={21} />
              </div>

              <div>
                <span>Active Alerts</span>
                <strong>{alerts.filter((alert) => alert.unread).length}</strong>
                <small>Requires attention</small>
              </div>

            </div>

            <div className="stat-card">

              <div className="stat-icon">
                <ClipboardCheck size={21} />
              </div>

              <div>
                <span>Safety Tasks</span>
                <strong>5</strong>
                <small>3 completed today</small>
              </div>

            </div>

            <div className="stat-card">

              <div className="stat-icon">
                <Clock3 size={21} />
              </div>

              <div>
                <span>Shift Time</span>
                <strong>06:42</strong>
                <small>Hours completed</small>
              </div>

            </div>

          </section>

          {/* ALERTS + WORK ZONE */}

          <div className="content-grid">

            <section className="dashboard-panel">

              <div className="panel-header">

                <div>
                  <h3>Safety Alerts</h3>
                  <p>Recent safety information from your assigned zone.</p>
                </div>

                <button
                  onClick={() => {
                    setActiveSection("alerts")
                    setShowHazardForm(false)
                    setShowChecklist(false)
                  }}
                >View all</button>

              </div>

              <div className="safety-alert high">

                <div className="alert-symbol">
                  <TriangleAlert size={21} />
                </div>

                <div className="alert-content">

                  <div className="alert-title">
                    <strong>High Dust Level</strong>

                    <span className="severity high-level">
                      HIGH
                    </span>
                  </div>

                  <p>
                    Dust concentration is above the recommended
                    level in Zone B.
                  </p>

                  <small>
                    8 minutes ago · Zone B
                  </small>

                </div>

              </div>

              <div className="safety-alert normal">

                <div className="alert-symbol">
                  <Activity size={21} />
                </div>

                <div className="alert-content">

                  <div className="alert-title">
                    <strong>Safety Inspection</strong>

                    <span className="severity info-level">
                      INFO
                    </span>
                  </div>

                  <p>
                    Routine inspection scheduled for your work zone.
                  </p>

                  <small>
                    32 minutes ago · Sector B-04
                  </small>

                </div>

              </div>

            </section>

            {/* WORK ZONE */}

            <section className="dashboard-panel">

              <div className="panel-header">

                <div>
                  <h3>Your Work Zone</h3>
                  <p>Current operational conditions.</p>
                </div>

                <span className="zone-status">
                  <span className="status-dot"></span>
                  Active
                </span>

              </div>

              <div className="zone-information">

                <div className="zone-item">
                  <MapPin size={17} />
                  <div>
                    <span>Current Zone</span>
                    <strong>Sector B-04</strong>
                  </div>
                </div>

                <div className="zone-item">
                  <Clock3 size={17} />
                  <div>
                    <span>Shift</span>
                    <strong>Morning Shift</strong>
                  </div>
                </div>

                <div className="zone-item">
                  <Wind size={17} />
                  <div>
                    <span>Air Quality</span>
                    <strong className="check-ok">Good</strong>
                  </div>
                </div>

                <div className="zone-item">
                  <Thermometer size={17} />
                  <div>
                    <span>Temperature</span>
                    <strong>28°C</strong>
                  </div>
                </div>

              </div>

              <div className="sensor-status">
                <Radio size={15} />
                <span>Safety sensors connected</span>
                <b>Online</b>
              </div>

            </section>

          </div>

          {/* GUIDELINES */}

          <section className="dashboard-panel guidelines-panel">

            <div className="panel-header">

              <div>
                <h3>Safety Guidelines</h3>
                <p>Reference material for your current shift.</p>
              </div>

              <button
                onClick={() => {
                  setActiveSection("guidelines")
                  setShowHazardForm(false)
                  setShowChecklist(false)
                }}
              >View all</button>

            </div>

            <div className="guideline-grid">

              <button className="guideline-card">
                <ShieldCheck size={20} />

                <div>
                  <strong>Personal Protective Equipment</strong>
                  <p>Required PPE for your work zone.</p>
                </div>

                <ChevronRight size={17} />

              </button>

              <button className="guideline-card">
                <HardHat size={20} />

                <div>
                  <strong>Mining Safety Procedures</strong>
                  <p>Standard operating procedures.</p>
                </div>

                <ChevronRight size={17} />

              </button>

              <button className="guideline-card">
                <FileWarning size={20} />

                <div>
                  <strong>Emergency Procedures</strong>
                  <p>Required actions during an emergency.</p>
                </div>

                <ChevronRight size={17} />

              </button>

            </div>

          </section>

                        {/* RECENT HAZARD REPORTS */}

          <section className="dashboard-panel reports-panel">

            <div className="panel-header">
              <div>
                <h3>Recent Hazard Reports</h3>
                <p>Track hazards you have reported during your shifts.</p>
              </div>

              <span className="report-count">
                {hazardReports.length} report
                {hazardReports.length !== 1 ? "s" : ""}
              </span>
            </div>

            {hazardReports.length === 0 ? (

              <div className="empty-reports">
                <ShieldCheck size={24} />
                <div>
                  <strong>No hazard reports yet</strong>
                  <p>
                    Reports you submit will appear here for tracking.
                  </p>
                </div>
              </div>

            ) : (

              <div className="reports-list">

                {hazardReports.map((report) => (

                  <div className="report-item" key={report.id}>

                    <div className="report-icon">
                      <TriangleAlert size={20} />
                    </div>

                    <div className="report-details">

                      <div className="report-title-row">
                        <strong>{report.type}</strong>

                        <span
                          className={`report-severity ${report.severity.toLowerCase()}`}
                        >
                          {report.severity}
                        </span>
                      </div>

                      <p>{report.description}</p>

                      <div className="report-meta">
                        <span>
                          <MapPin size={14} />
                          {report.location}
                        </span>

                        <span>
                          <Clock3 size={14} />
                          {report.time}
                        </span>
                      </div>

                    </div>

                    <span className="report-status">
                      {report.status}
                    </span>

                  </div>

                ))}

              </div>

            )}

          </section>
            </>
          )}

            {showChecklist && (
  <div className="hazard-modal-overlay">
    <div className="hazard-modal checklist-modal">

      <div className="hazard-modal-header">
        <div>
          <span className="page-label">DAILY SAFETY CHECK</span>
          <h2>Today's Safety Checklist</h2>
          <p>
            Complete each safety task before starting or continuing your shift.
          </p>
        </div>

        <button
          type="button"
          className="modal-close"
          onClick={() => setShowChecklist(false)}
          aria-label="Close"
        >
          ×
        </button>
      </div>

      <div className="hazard-form">

        <div className="checklist-progress">
          <div className="checklist-progress-text">
            <strong>
              {checklist.filter((item) => item.completed).length} of{" "}
              {checklist.length} completed
            </strong>

            <span>
              {Math.round(
                (checklist.filter((item) => item.completed).length /
                  checklist.length) *
                  100
              )}
              %
            </span>
          </div>

          <div className="progress-track">
            <div
              className="progress-fill"
              style={{
                width: `${
                  (checklist.filter((item) => item.completed).length /
                    checklist.length) *
                  100
                }%`,
              }}
            ></div>
          </div>
        </div>

        <div className="checklist-items">

          {checklist.map((item) => (
            <label
              className={`checklist-item ${
                item.completed ? "completed" : ""
              }`}
              key={item.id}
            >
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => {
                  setChecklist((previous) =>
                    previous.map((task) =>
                      task.id === item.id
                        ? {
                            ...task,
                            completed: !task.completed,
                          }
                        : task
                    )
                  )
                }}
              />

              <span className="custom-checkbox">
                {item.completed && <Check size={15} />}
              </span>

              <span className="checklist-item-text">
                {item.title}
              </span>
            </label>
          ))}

        </div>

        <div className="checklist-evidence-panel">
          <div><Camera size={19}/><div><strong>Evidence photo</strong><span>Attach a photo of your PPE, equipment or work area for inspector verification.</span></div></div>
          <label className="evidence-upload">
            <input type="file" accept="image/*" onChange={(e) => setChecklistEvidence(e.target.files?.[0] || null)} />
            <Camera size={17}/><span>{checklistEvidence ? checklistEvidence.name : 'Add photo evidence'}</span>
          </label>
        </div>

        <label className="location-verification">
          <input type="checkbox" checked={checklistLocationVerified} onChange={(e) => setChecklistLocationVerified(e.target.checked)} />
          <span className="custom-checkbox">{checklistLocationVerified && <Check size={15}/>}</span>
          <span><strong>Confirm assigned work zone</strong><small>Sector B-04 · Location check recorded with this submission.</small></span>
        </label>

        <div className="checklist-footer">
          {checklist.every((item) => item.completed) ? (
            <div className="checklist-complete-message"><ShieldCheck size={19} /><span>Checklist complete. Submit it for inspector verification.</span></div>
          ) : (
            <div className="checklist-pending-message"><TriangleAlert size={18} /><span>Complete all required tasks before submitting.</span></div>
          )}
          <button type="button" className="submit-hazard-button" disabled={!checklist.every(item => item.completed)} onClick={() => {
            const evidenceLabel = checklistEvidence ? `Photo attached: ${checklistEvidence.name}` : 'No photo attached';
            setChecklistSubmissions(previous => [{ id: Date.now(), worker: 'Mine Worker', workerId: 'MG-W027', zone: 'Sector B-04', submittedAt: 'Just now', status: 'Awaiting Verification', evidence: evidenceLabel, locationVerified: checklistLocationVerified, note: 'Awaiting inspector review.' }, ...previous]);
            setChecklistEvidence(null);
            setChecklistLocationVerified(false);
            setShowChecklist(false);
            alert('Checklist submitted for inspector verification.');
          }}>Submit for Verification</button>
        </div>

      </div>
    </div>
  </div>
)}
                  {showHazardForm && (
  <div className="hazard-modal-overlay">
    <div className="hazard-modal">

      <div className="hazard-modal-header">
        <div>
          <span className="page-label">SAFETY REPORT</span>
          <h2>Report a Hazard</h2>
          <p>
            Provide details about the unsafe condition so it can be
            reviewed by the safety team.
          </p>
        </div>

        <button
          type="button"
          className="modal-close"
          onClick={() => setShowHazardForm(false)}
          aria-label="Close"
        >
          ×
        </button>
      </div>

      <div className="hazard-form">

        <form
          onSubmit={(e) => {
            e.preventDefault()

            const formData = new FormData(e.currentTarget)

            const newReport = {
              id: Date.now(),
              type: formData.get("hazardType"),
              location: formData.get("location"),
              severity: formData.get("severity"),
              description: formData.get("description"),
              status: "Submitted",
              time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
            }

            setHazardReports((previous) => [newReport, ...previous])
            setShowHazardForm(false)

            alert("Hazard report submitted successfully.")
          }}
        >

          {/* HAZARD TYPE */}
          <div className="form-group">
            <label>Hazard Type</label>

            <select name="hazardType" defaultValue="" required>
              <option value="" disabled>
                Select hazard type
              </option>
              <option>Dust / Air Quality</option>
              <option>Equipment Failure</option>
              <option>Structural Damage</option>
              <option>Fire / Smoke</option>
              <option>Electrical Hazard</option>
              <option>Other</option>
            </select>
          </div>

          {/* LOCATION + SEVERITY */}
          <div className="form-row">

            <div className="form-group">
              <label>Location</label>

              <input
                type="text"
                name="location"
                placeholder="e.g. Sector B-04"
                defaultValue="Sector B-04"
                required
              />
            </div>

            <div className="form-group">
              <label>Severity</label>

              <select name="severity" defaultValue="" required>
                <option value="" disabled>
                  Select severity
                </option>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Critical</option>
              </select>
            </div>

          </div>

          {/* DESCRIPTION */}
          <div className="form-group">
            <label>Description</label>

            <textarea
              name="description"
              rows="5"
              placeholder="Describe what you observed..."
              required
            ></textarea>
          </div>

          {/* SAFETY NOTE */}
          <div className="hazard-form-note">
            <ShieldCheck size={18} />

            <span>
              If there is an immediate threat to life or safety,
              follow emergency procedures and contact the site
              emergency team immediately.
            </span>
          </div>

          {/* ACTIONS */}
          <div className="hazard-form-actions">

            <button
              type="button"
              className="cancel-button"
              onClick={() => setShowHazardForm(false)}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="submit-hazard-button"
            >
              Submit Hazard Report
            </button>

          </div>

        </form>

      </div>
    </div>
  </div>
)}
        </main>

      </div>
    )
  }

  /* =========================
     ROLE SELECTION
     ========================= */

  if (loggedIn) {
    return (
      <div className="role-page">

        <div className="role-container">

          <div className="role-header">

            <div className="role-brand">

              <div className="brand-mark">
                <ShieldCheck size={23} />
              </div>

              <div>
                <h1>MineGuard</h1>
                <p>Safety & Compliance Platform</p>
              </div>

            </div>

            <div className="step-indicator">
              <span className="step-active">1</span>
              <span className="step-line"></span>
              <span className="step">2</span>
            </div>

          </div>

          <div className="role-content">

            <span className="tagline">
              SECURE ACCESS
            </span>

            <h2>Select your role</h2>

            <p className="role-subtitle">
              Choose your role to access the appropriate MineGuard workspace.
            </p>

            <div className="role-grid">

              {roles.map((role) => {

                const Icon = role.icon

                return (
                  <button
                    key={role.id}
                    className={`role-card ${
                      selectedRole === role.id ? 'selected' : ''
                    }`}
                    onClick={() => setSelectedRole(role.id)}
                  >

                    <div className="role-icon">
                      <Icon size={23} />
                    </div>

                    <div className="role-info">
                      <h3>{role.title}</h3>
                      <p>{role.description}</p>
                    </div>

                    <div className="role-check">
                      {selectedRole === role.id
                        ? <Check size={19} />
                        : <ArrowRight size={18} />}
                    </div>

                  </button>
                )
              })}

            </div>

            <button
              className="continue-button"
              disabled={!selectedRole}
              onClick={() => {

                if (selectedRole === 'worker' || selectedRole === 'inspector' || selectedRole === 'manager' || selectedRole === 'controller' || selectedRole === 'emergency') {
                  setDashboard(true)
                  if (selectedRole === 'worker') {
                    setWorkerGuidelinesSeen(false)
                    setActiveSection('guidelines')
                  } else {
                    setActiveSection('dashboard')
                  }
                } else {
                  alert('This dashboard will be added next.')
                }

              }}
            >
              Continue
              <ArrowRight size={18} />
            </button>

            <button
              className="back-button"
              onClick={() => {
                setLoggedIn(false)
                setSelectedRole('')
                setWorkerGuidelinesSeen(false)
              }}
            >
              ← Back to login
            </button>

          </div>

          <p className="role-footer">
            © 2026 MineGuard · Smart Governance & Compliance
          </p>

        </div>

      </div>
    )
  }

  /* =========================
     LOGIN
     ========================= */

  return (
    <div className="login-page">

      <div className="login-left">

        <div className="brand">

          <div className="brand-mark">
            <ShieldCheck size={25} />
          </div>

          <div>
            <h1>MineGuard</h1>
            <p>Safety & Compliance Platform</p>
          </div>

        </div>

        <div className="hero-content">

          <span className="tagline">
            MINING SAFETY & COMPLIANCE
          </span>

          <h2>
            Safer operations.
            <br />
            Better decisions.
          </h2>

          <p>
            Monitor mine operations, identify safety risks,
            and maintain compliance through a centralized
            safety management platform.
          </p>

          <div className="features">

            <div className="feature">
              <div className="feature-icon">
                <Activity size={19} />
              </div>

              <div>
                <strong>Operational Monitoring</strong>
                <p>
                  Track safety conditions across active work zones.
                </p>
              </div>
            </div>

            <div className="feature">
              <div className="feature-icon">
                <TriangleAlert size={19} />
              </div>

              <div>
                <strong>Risk Identification</strong>
                <p>
                  Detect and report hazards before they escalate.
                </p>
              </div>
            </div>

            <div className="feature">
              <div className="feature-icon">
                <ClipboardCheck size={19} />
              </div>

              <div>
                <strong>Compliance Management</strong>
                <p>
                  Maintain records for safety and regulatory requirements.
                </p>
              </div>
            </div>

          </div>

        </div>

        <div className="copyright">
          © 2026 MineGuard · Smart Governance & Compliance
        </div>

      </div>

      {/* LOGIN FORM */}

      <div className="login-right">

        <div className="login-card">

          <div className="mobile-brand">

            <div className="brand-mark">
              <ShieldCheck size={22} />
            </div>

            <h1>MineGuard</h1>

          </div>

          <div className="login-header">

            <span className="form-kicker">
              SECURE ACCESS
            </span>

            <h2>Welcome back</h2>

            <p>
              Sign in to access your MineGuard workspace.
            </p>

          </div>

          <form onSubmit={handleLogin}>

            <div className="form-group">

              <label htmlFor="email">
                Email address
              </label>

              <input
                id="email"
                type="email"
                placeholder="name@company.com"
                required
              />

            </div>

            <div className="form-group">

              <div className="password-label">

                <label htmlFor="password">
                  Password
                </label>

                <a href="#forgot">
                  Forgot password?
                </a>

              </div>

              <div className="password-input">

                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  required
                />

                <button
                  type="button"
                  className="show-password"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>

              </div>

            </div>

            <div className="remember-row">

              <label>
                <input type="checkbox" />
                <span>Remember this device</span>
              </label>

            </div>

            <button
              type="submit"
              className="login-button"
            >
              Sign in
              <ArrowRight size={18} />
            </button>

          </form>

          <div className="security-note">

            <LockKeyhole size={15} />

            <span>
              Secure authentication protects your account and data.
            </span>

          </div>

          <p className="support">
            Need assistance? <a href="#support">Contact support</a>
          </p>

        </div>

      </div>

    </div>
  )
}

export default App