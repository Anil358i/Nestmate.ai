import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, query } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDTxyr3zJGsyfmdztvfFz8aw9XSyPCNeQM",
  authDomain: "nestmate-ai.firebaseapp.com",
  projectId: "nestmate-ai",
  storageBucket: "nestmate-ai.firebasestorage.app",
  messagingSenderId: "7053398074",
  appId: "1:7053398074:web:13dc18b49402d95107a503"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ── VERIFIED LISTINGS PAGE: Load live host count ──
async function loadVerifiedHostCount() {
  try {
    const q = query(collection(db, "properties"));
    const snapshot = await getDocs(q);
    const uniqueHosts = new Set();
    snapshot.forEach(doc => {
      if (doc.data().userId) uniqueHosts.add(doc.data().userId);
    });
    const el = document.getElementById('hostCount');
    if (el) el.textContent = uniqueHosts.size;
  } catch (error) {
    console.error("Metrics execution fault:", error);
  }
}

// ── VERIFIED LISTINGS PAGE: Submit abuse report ──
async function submitReport(event) {
  const btn = event.target;
  const email = document.getElementById('reportEmail').value.trim();
  const reason = document.getElementById('reportReason').value;
  const details = document.getElementById('reportDetails').value.trim();
  const successMsg = document.getElementById('successMsg');
  const errorMsg = document.getElementById('errorMsg');

  if (!email || !reason) {
    if (errorMsg) {
      errorMsg.textContent = '⚠ Please enter the host email and select a reason.';
      errorMsg.style.display = 'block';
    }
    return;
  }

  try {
    btn.disabled = true;
    await addDoc(collection(db, "reports"), {
      hostEmail: email,
      reason: reason,
      details: details,
      reportedAt: new Date(),
      status: 'pending'
    });
    if (successMsg) successMsg.style.display = 'block';
    if (errorMsg) errorMsg.style.display = 'none';
  } catch (error) {
    console.error("Report submit error:", error);
    if (errorMsg) {
      errorMsg.textContent = '⚠ Could not submit report. Please try again.';
      errorMsg.style.display = 'block';
    }
  } finally {
    btn.disabled = false;
  }
}

// ── SAVE MONEY PAGE: Savings calculator ──
function initializeSavingsCalculator() {
  const inputRent   = document.getElementById('totalRent');
  const inputRooms  = document.getElementById('rooms');
  const inputWeekly = document.getElementById('roomRent');

  // Only runs if we're on the savings page (these IDs exist)
  if (!inputRent || !inputRooms || !inputWeekly) return;

  const calculate = () => {
    const totalRent  = parseFloat(inputRent.value)   || 0;
    const rooms      = parseInt(inputRooms.value)     || 1;
    const roomRent   = parseFloat(inputWeekly.value)  || 0;

    // 4.33 = average weeks per month
    const monthlyIncome       = Math.round(rooms * roomRent * 4.33);
    const netCost             = Math.max(0, Math.round(totalRent - monthlyIncome));
    const yearSave            = monthlyIncome * 12;
    const coveragePercentage  = totalRent > 0
      ? Math.min(100, Math.round((monthlyIncome / totalRent) * 100))
      : 0;

    document.getElementById('income').textContent    = '£' + monthlyIncome.toLocaleString();
    document.getElementById('youPay').textContent    = '£' + netCost.toLocaleString();
    document.getElementById('yearSave').textContent  = '£' + yearSave.toLocaleString();
    document.getElementById('tipRooms').textContent  = rooms;
    document.getElementById('tipRent').textContent   = roomRent;
    document.getElementById('tipPercent').textContent = coveragePercentage;
    document.getElementById('roomVal').textContent   = rooms + (rooms > 1 ? ' rooms' : ' room');
  };

  inputRent.addEventListener('input', calculate);
  inputRooms.addEventListener('input', calculate);
  inputWeekly.addEventListener('input', calculate);

  // Run once immediately so results show on page load
  calculate();
}

// ── ROUTER: runs on DOMContentLoaded, activates the right module ──
document.addEventListener('DOMContentLoaded', () => {

  // Verified Listings / Report page
  const submitBtn = document.getElementById('submitReportBtn');
  if (submitBtn) {
    loadVerifiedHostCount();
    submitBtn.addEventListener('click', submitReport);
  }

  // Savings Calculator page
  initializeSavingsCalculator();
});
