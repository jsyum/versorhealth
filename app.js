// Community Care Data Platform — app.js
// Structured data capture for Illinois CCP in-home services
// Fields derived from 89 Ill. Admin. Code Part 240

// TAB DEFINITIONS

const tabDefs = [
  { id: 'visit', label: 'Caregiver Visit' },
  { id: 'participant', label: 'Participant Record' },
  { id: 'employee', label: 'Employee Compliance' }
];

// CAREGIVER VISIT FIELDS

const visitFields = [
  { id: "v_date", label: "Visit Date", type: "date", grp: "Visit Information" },
  { id: "v_mobility", label: "Patient Mobility", opts: ["Independent", "Minimal assist", "Moderate assist", "Maximum assist", "Unable to ambulate"], grp: "Observation Fields" },
  { id: "v_appetite", label: "Appetite / Nutrition", opts: ["Ate full meal", "Ate partial meal", "Minimal intake", "Refused food", "Not observed"] },
  { id: "v_mood", label: "Mood / Affect", opts: ["Alert and engaged", "Calm but withdrawn", "Anxious or agitated", "Confused or disoriented", "Unresponsive"] },
  { id: "v_meds", label: "Medications Present", opts: ["All present and organized", "Present but disorganized", "Appear missing", "Unable to verify", "Missed doses reported"] },
  { id: "v_env", label: "Home Environment", opts: ["Safe and clean", "Minor hazards", "Significant hazards", "Unsanitary", "Emergency concern"] },
  { id: "v_skin", label: "Skin Integrity", opts: ["No concerns", "Redness/irritation", "Wound stable", "Wound worsening", "New wound/bruising"] },
  { id: "v_behavior", label: "Behavioral Changes", opts: ["No changes", "Increased confusion", "Increased agitation", "Increased withdrawal", "Other"] },
  { id: "v_adl", label: "ADLs Provided", multi: true, opts: ["Bathing", "Dressing", "Toileting", "Meal prep", "Housekeeping", "Laundry", "Errands/shopping", "Escort/transport", "Medication reminding", "Respiratory services"], grp: "Service Documentation - §240.210(a)", ref: "§240.210(a)" },
  { id: "v_money", label: "Money Handling", opts: ["No money handling", "Receipts obtained", "Money handled no receipts", "N/A"], ref: "§240.1510(c)" },
  { id: "v_poc_adherence", label: "Services Match Plan of Care", opts: ["Yes all services per plan", "Deviation participant request", "Deviation safety concern", "Unable to complete plan"], ref: "§240.1510(b)", grp: "Compliance" },
  { id: "v_incident", label: "Incident / Concern", icon: "⚠️", opts: ["Nothing to report", "Abuse/neglect concern", "Fall or injury", "Emergency", "Other"], ref: "§240.1510(s)" },
  { id: "v_hours", label: "Direct Service Hours", icon: "⏱", type: "text", placeholder: "e.g., 4.0 (quarter-hour increments)", ref: "§240.1531" }
];

// PARTICIPANT RECORD FIELDS (office staff entry)

const partFields = [
  { id: "p_name", label: "Participant Name", type: "text", grp: "Demographics" },
  { id: "p_dob", label: "Date of Birth", type: "text", placeholder: "MM/DD/YYYY" },
  { id: "p_address", label: "Home Address", type: "text" },
  { id: "p_phone", label: "Phone Number", type: "text" },
  { id: "p_emergency", label: "Emergency Contact", type: "text", placeholder: "Name, relationship, phone" },
  { id: "p_ssn_verified", label: "SSN Verified", opts: ["Yes card viewed", "Yes via HFS", "Pending"], ref: "eCCPIS Policy", grp: "Eligibility §240.160" },
  { id: "p_don_score", label: "DON Score", type: "text", placeholder: "From CCU assessment", ref: "§240.160" },
  { id: "p_mco", label: "MCO Enrollment", opts: ["Meridian", "Molina", "BCBS", "Aetna Better Health", "Not enrolled in MCO"], ref: "Billing" },
  { id: "p_auth_hours", label: "Authorized Weekly Hours", type: "text", placeholder: "e.g., 20", grp: "Person-Centered Plan of Care - §240.730", ref: "§240.730" },
  { id: "p_services", label: "Authorized Service Components", multi: true, opts: ["Personal care", "Bathing", "Dressing", "Meal prep", "Housekeeping", "Laundry", "Shopping/errands", "Escort to medical", "Medication reminding", "Respiratory services"], ref: "§240.210(a)" },
  { id: "p_plan_start", label: "Plan of Care Start Date", type: "text", placeholder: "MM/DD/YYYY" },
  { id: "p_plan_review", label: "Last Plan Review Date", type: "text", placeholder: "MM/DD/YYYY" },
  { id: "p_advance", label: "Advance Directive", opts: ["POA on file", "Living will on file", "No directive", "Declined"], ref: "§240.1510(l)", grp: "Legal / Compliance" },
  { id: "p_release", label: "Release of Information", opts: ["Signed by participant", "Signed by authorized rep", "Not on file"], ref: "§240.340" },
  { id: "p_restraint", label: "Restraint/Seclusion in Plan", opts: ["Not applicable", "Documented in plan — staff trained", "Documented — training pending"], ref: "§240.1510(t)" },
  { id: "p_complaints", label: "Complaints / Grievances", opts: ["None on record", "Filed - resolved", "Filed - pending", "Filed - escalated"], ref: "§240.1650" },
  { id: "p_notes", label: "Additional Notes", type: "text", placeholder: "Optional free text for context" }
];

// EMPLOYEE COMPLIANCE FIELDS

const empFields = [
  { id: "e_name", label: "Employee Name", type: "text", grp: "Personnel Information" },
  { id: "e_role", label: "Position", opts: ["Homecare Aide", "Homecare Supervisor", "Office Staff", "Management"], ref: "§240.1535" },
  { id: "e_hire", label: "Date of Hire", type: "text", placeholder: "MM/DD/YYYY" },
  { id: "e_job_desc", label: "Written Job Description on File", opts: ["Yes", "No"], ref: "§240.1510(d)(1)", grp: "Personnel File Requirements - §240.1510(d)(5)" },
  { id: "e_bg", label: "Criminal Background Check", opts: ["Cleared", "Waiver granted", "Pending", "Expired"], ref: "§240.1510(d)(5)(H)" },
  { id: "e_aps", label: "APS Registry Check", opts: ["Cleared", "Pending", "Not completed"], ref: "§240.1510(d)(5)(H)" },
  { id: "e_oig", label: "HHS/HFS OIG Exclusion Check", opts: ["Cleared", "Flagged", "Not completed"], ref: "§240.1510(d)(5)(G)" },
  { id: "e_vehicle", label: "Vehicle Insurance (if transporting)", opts: ["On file", "Expired", "Not applicable"], ref: "§240.1510(d)(5)(F)" },
  { id: "e_preservice", label: "Pre-Service Training (24 hrs)", opts: ["Complete", "In progress", "Not started", "Exempt"], ref: "§240.1535(b)(3)(A)", grp: "Training Compliance - §240.1535" },
  { id: "e_dementia", label: "Dementia Training (2 hrs/yr)", opts: ["Current", "Due within 30 days", "Overdue"], ref: "§240.1535(b)(4)" },
  { id: "e_inservice_hrs", label: "In-Service Hours This Year", type: "text", placeholder: "of 12 required (aides) / 26 (supervisors)", ref: "§240.1535(b)(3)(C)" },
  { id: "e_flu", label: "Influenza Education (Annual)", opts: ["Completed", "Not yet completed", "Vaccinated"], ref: "§240.1510(w)" },
  { id: "e_ccp_training", label: "CCP Dept. Training (Supervisors)", opts: ["Completed within 90 days", "Pending", "N/A - not supervisor"], ref: "§240.1535(a)(3)(A)" },
  { id: "e_eval", label: "Annual Performance Evaluation", opts: ["Current", "Due within 60 days", "Overdue"], ref: "§240.1510(d)(5)(B)", grp: "Supervision - §240.1535(a)(1)" },
  { id: "e_quarterly", label: "Quarterly Supervisor Conference", opts: ["Current", "Due", "Overdue", "N/A"], ref: "§240.1535(a)(1)(E)" },
  { id: "e_sup_visit", label: "Semi-Annual Home Supervisory Visit", opts: ["Both documented", "One completed", "Overdue", "N/A"], ref: "§240.1535(a)(1)(H)" }
];

// SUPABASE

const db = window.supabase
  ? window.supabase.createClient(
      'https://tjyjtonbupzmybznwixi.supabase.com',
      'sb_publishable_0IU4oNptoiqBh7jokkk6Qw_sBI-gYUH'
    )
  : null;

// APP STATE

const state = { visit: {}, part: {}, emp: {} };
const savedId = { part: null, emp: null };
const allFields = { visit: visitFields, part: partFields, emp: empFields };
const minSubmit = { visit: 8, part: 10, emp: 10 };

// INITIALIZATION

function init() {
  // Render tabs
  const tb = document.getElementById('tab-bar');
  tabDefs.forEach((t, i) => {
    const b = document.createElement('button');
    b.className = 'tab' + (i === 0 ? ' active' : '');
    b.textContent = t.label;
    b.onclick = () => switchTab(t.id, b);
    tb.appendChild(b);
  });

  // Render all field sets
  ['visit', 'part', 'emp'].forEach(p => {
    renderFields(p, allFields[p], p + '-fields');
    renderProg(p);
  });
}

// RENDER FIELDS

function renderFields(p, fields, cid) {
  const c = document.getElementById(cid);
  c.innerHTML = '';

  fields.forEach(f => {
    // Section divider
    if (f.grp) {
      const d = document.createElement('div');
      d.className = 'section-divider';
      d.textContent = f.grp;
      c.appendChild(d);
    }

    const div = document.createElement('div');
    div.className = 'field';

    let h = '<div class="field-label">';
    h += (f.icon ? f.icon + ' ' : '') + f.label;
    if (f.ref) h += '<span class="field-hint">' + f.ref + '</span>';
    h += '</div>';

    if (f.type === 'date') {
      const today = new Date().toISOString().split('T')[0];
      if (!state[p][f.id]) state[p][f.id] = today;
      h += '<input class="text-input" type="date" value="' + state[p][f.id] + '" onchange="ti(\'' + p + '\',\'' + f.id + '\',this.value)">';
    } else if (f.type === 'text') {
      h += '<input class="text-input" placeholder="' + (f.placeholder || '') + '" oninput="ti(\'' + p + '\',\'' + f.id + '\',this.value)">';
    } else {
      h += '<div class="opts">';
      f.opts.forEach(o => {
        h += '<button class="opt" data-p="' + p + '" data-f="' + f.id + '" data-v="' + o + '" data-m="' + (!!f.multi) + '" onclick="pk(this)">' + o + '</button>';
      });
      h += '</div>';
    }

    div.innerHTML = h;
    c.appendChild(div);
  });

  // Render progress bar segments
  const bar = document.getElementById(p + '-prog');
  bar.innerHTML = '';
  for (let i = 0; i < fields.length; i++) {
    const s = document.createElement('div');
    s.className = 'prog-seg';
    bar.appendChild(s);
  }
}

// SELECTION HANDLERS

function pk(b) {
  const p = b.dataset.p;
  const f = b.dataset.f;
  const v = b.dataset.v;
  const m = b.dataset.m === 'true';

  if (m) {
    if (!state[p][f]) state[p][f] = [];
    const i = state[p][f].indexOf(v);
    if (i > -1) {
      state[p][f].splice(i, 1);
      if (!state[p][f].length) delete state[p][f];
    } else {
      state[p][f].push(v);
    }
  } else {
    state[p][f] = state[p][f] === v ? undefined : v;
    if (state[p][f] === undefined) delete state[p][f];
  }

  // Update button styles
  document.querySelectorAll('[data-p="' + p + '"][data-f="' + f + '"]').forEach(x => {
    const val = x.dataset.v;
    if (m) {
      x.className = (state[p][f] || []).includes(val) ? 'opt sel' : 'opt';
    } else {
      x.className = state[p][f] === val ? 'opt sel' : 'opt';
    }
  });

  renderProg(p);
}

function ti(p, f, v) {
  if (v.trim()) {
    state[p][f] = v;
  } else {
    delete state[p][f];
  }
  renderProg(p);
}

// PROGRESS TRACKING

function renderProg(p) {
  const ct = Object.keys(state[p]).length;
  const total = allFields[p].length;
  const mn = minSubmit[p];

  // Update progress bar
  document.querySelectorAll('#' + p + '-prog .prog-seg').forEach((s, i) => {
    s.className = i < ct ? 'prog-seg f' : 'prog-seg';
  });

  // Update count text
  document.getElementById(p + '-ct').textContent = ct + ' of ' + total + ' fields';

  // Update submit button
  const btn = document.getElementById(p + '-sub');
  btn.textContent = btn.textContent.replace(/\(.*\)/, '(' + ct + '/' + total + ')');
  btn.className = ct >= mn ? 'submit-btn rdy' : 'submit-btn';
}

// FORM SUBMISSION

async function submitForm(p) {
  if (Object.keys(state[p]).length < minSubmit[p]) return;

  if (db) {
    const tableMap = { visit: 'visits', part: 'participants', emp: 'employees' };
    if (savedId[p]) {
      const { error } = await db.from(tableMap[p]).update(state[p]).eq('id', savedId[p]);
      if (error) { alert('Save failed: ' + error.message); return; }
    } else {
      const { data, error } = await db.from(tableMap[p]).insert(state[p]).select('id').single();
      if (error) { alert('Save failed: ' + error.message); return; }
      if (savedId[p] !== undefined && data) savedId[p] = data.id;
    }
  }

  const vid = p === 'visit' ? 'visit' : p === 'part' ? 'participant' : 'employee';
  document.querySelector('#v-' + vid + ' .form-area').classList.add('hide');
  document.getElementById(p + '-done').classList.add('show');
}

function resetForm(p) {
  state[p] = {};

  const vid = p === 'visit' ? 'visit' : p === 'part' ? 'participant' : 'employee';
  document.querySelector('#v-' + vid + ' .form-area').classList.remove('hide');
  document.getElementById(p + '-done').classList.remove('show');

  renderFields(p, allFields[p], p + '-fields');
  renderProg(p);
}

// TAB SWITCHING

function switchTab(id, btn) {
  const map = { visit: 'v-visit', participant: 'v-participant', employee: 'v-employee' };

  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));

  document.getElementById(map[id]).classList.add('active');
  btn.classList.add('active');
}

// START

document.addEventListener('DOMContentLoaded', init);
