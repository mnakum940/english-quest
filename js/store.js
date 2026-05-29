// ========================================
// STORE - localStorage wrapper & state
// ========================================

const STORAGE_KEY = 'english_quest_data';
const ADMIN_PIN_KEY = 'english_quest_pin';

const defaultState = {
  currentDay: 1,
  startDate: null,
  streak: { current: 0, longest: 0, lastActiveDate: null },
  xp: 0,
  days: {},        // { 1: { completed: false, tasks: {...}, quizScore: null, timestamp: null, xpEarned: 0 } }
  customQuestions: {}, // { dayNum: [questions] } — admin-added questions override defaults
  activityLog: [],  // [{ type, message, timestamp }]
};

export function getState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initState();
    const state = JSON.parse(raw);
    // migrate old state if needed
    if (!state.activityLog) state.activityLog = [];
    if (!state.customQuestions) state.customQuestions = {};
    if (!state.streak) state.streak = { current: 0, longest: 0, lastActiveDate: null };
    if (state.xp === undefined) state.xp = 0;
    if (!state.days) state.days = {};
    return state;
  } catch {
    return initState();
  }
}

export function setState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function updateState(updater) {
  const state = getState();
  updater(state);
  setState(state);
  return state;
}

function initState() {
  const state = {
    ...defaultState,
    startDate: new Date().toISOString().split('T')[0],
  };
  setState(state);
  return state;
}

// === Day-level helpers ===

export function getDayData(dayNum) {
  const state = getState();
  return state.days[dayNum] || null;
}

export function saveDayData(dayNum, dayData) {
  updateState(s => {
    s.days[dayNum] = dayData;
  });
}

export function markTaskComplete(dayNum, taskId) {
  updateState(s => {
    if (!s.days[dayNum]) {
      s.days[dayNum] = { completed: false, tasks: {}, quizScore: null, timestamp: null, xpEarned: 0 };
    }
    s.days[dayNum].tasks[taskId] = true;
    s.days[dayNum].timestamp = new Date().toISOString();
  });
}

export function markTaskIncomplete(dayNum, taskId) {
  updateState(s => {
    if (s.days[dayNum]) {
      s.days[dayNum].tasks[taskId] = false;
    }
  });
}

export function saveQuizScore(dayNum, score, total) {
  updateState(s => {
    if (!s.days[dayNum]) {
      s.days[dayNum] = { completed: false, tasks: {}, quizScore: null, timestamp: null, xpEarned: 0 };
    }
    s.days[dayNum].quizScore = { score, total, timestamp: new Date().toISOString() };
    const xpForQuiz = Math.round((score / total) * 50);
    s.days[dayNum].xpEarned = (s.days[dayNum].xpEarned || 0) + xpForQuiz;
    s.xp += xpForQuiz;
  });
}

export function markDayComplete(dayNum) {
  updateState(s => {
    if (!s.days[dayNum]) {
      s.days[dayNum] = { completed: false, tasks: {}, quizScore: null, timestamp: null, xpEarned: 0 };
    }
    s.days[dayNum].completed = true;
    s.days[dayNum].timestamp = new Date().toISOString();
  });
}

export function markDayIncomplete(dayNum) {
  updateState(s => {
    if (s.days[dayNum]) {
      s.days[dayNum].completed = false;
    }
  });
}

export function resetDayProgress(dayNum) {
  updateState(s => {
    delete s.days[dayNum];
  });
}

export function addXP(amount) {
  updateState(s => { s.xp += amount; });
}

// === Current Day ===

export function getCurrentDay() {
  const state = getState();
  return state.currentDay;
}

export function advanceDay() {
  updateState(s => {
    if (s.currentDay < 84) s.currentDay++;
  });
}

export function setCurrentDay(day) {
  updateState(s => { s.currentDay = Math.max(1, Math.min(84, day)); });
}

// === Streak ===

export function updateStreak() {
  const today = new Date().toISOString().split('T')[0];
  updateState(s => {
    if (s.streak.lastActiveDate === today) return; // already counted today

    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    if (s.streak.lastActiveDate === yesterday) {
      s.streak.current++;
    } else if (s.streak.lastActiveDate !== today) {
      s.streak.current = 1;
    }
    s.streak.lastActiveDate = today;
    if (s.streak.current > s.streak.longest) {
      s.streak.longest = s.streak.current;
    }
  });
}

// === Admin PIN ===

export function getAdminPIN() {
  return localStorage.getItem(ADMIN_PIN_KEY) || '1234';
}

export function setAdminPIN(pin) {
  localStorage.setItem(ADMIN_PIN_KEY, pin);
}

// === Custom Questions ===

export function getCustomQuestions(dayNum) {
  const state = getState();
  return state.customQuestions[dayNum] || null;
}

export function setCustomQuestions(dayNum, questions) {
  updateState(s => {
    s.customQuestions[dayNum] = questions;
  });
}

// === Activity Log ===

export function addActivity(type, message) {
  updateState(s => {
    s.activityLog.unshift({
      type,
      message,
      timestamp: new Date().toISOString()
    });
    // Keep last 100
    if (s.activityLog.length > 100) s.activityLog = s.activityLog.slice(0, 100);
  });
}

// === Export / Reset ===

export function exportData() {
  return JSON.stringify(getState(), null, 2);
}

export function resetAllProgress() {
  localStorage.removeItem(STORAGE_KEY);
  return initState();
}
