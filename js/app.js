// ========================================
// APP.JS — Main application logic
// ========================================

import {
  getState, updateState, markTaskComplete, markTaskIncomplete,
  saveQuizScore, markDayComplete, markDayIncomplete, resetDayProgress,
  addXP, getCurrentDay, advanceDay, setCurrentDay, updateStreak,
  getAdminPIN, setAdminPIN, getCustomQuestions, setCustomQuestions,
  addActivity, exportData, resetAllProgress
} from './store.js';

import {
  getDayCurriculum, getDayTasks, getPhaseInfo, getLevelInfo,
  quotes, badges, encourageMessages, getAllDays
} from './data.js';

import { fireConfetti, fireStarBurst, miniCelebration } from './confetti.js';

// =============================================
// INIT
// =============================================

let currentPage = 'home';
let quizState = { questions: [], current: 0, score: 0, answered: false };
let vocabState = { words: [], current: 0, revealed: false };

document.addEventListener('DOMContentLoaded', () => {
  // Show splash, then app
  setTimeout(() => {
    const splash = document.getElementById('splash-screen');
    splash.classList.add('fade-out');
    setTimeout(() => {
      splash.style.display = 'none';
      document.getElementById('app').style.display = 'block';
      initApp();
    }, 400);
  }, 1800);
});

function initApp() {
  updateStreak();
  renderHome();
  setupNavigation();
  setupAdminPIN();
  setupAdminTabs();
  setupQuestionForm();
  setupManageActions();

  // Add SVG gradient for progress ring
  const svg = document.querySelector('.progress-ring');
  if (svg) {
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    gradient.setAttribute('id', 'progressGradient');
    gradient.setAttribute('x1', '0%');
    gradient.setAttribute('y1', '0%');
    gradient.setAttribute('x2', '100%');
    gradient.setAttribute('y2', '100%');

    const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute('stop-color', '#a855f7');

    const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop2.setAttribute('offset', '100%');
    stop2.setAttribute('stop-color', '#ff6b6b');

    gradient.appendChild(stop1);
    gradient.appendChild(stop2);
    defs.appendChild(gradient);
    svg.insertBefore(defs, svg.firstChild);
  }
}

// =============================================
// NAVIGATION
// =============================================

function setupNavigation() {
  // Bottom nav
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const page = btn.dataset.page;
      navigateTo(page);
    });
  });

  // Back buttons
  document.querySelectorAll('.back-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      navigateTo(btn.dataset.page);
    });
  });

  // Admin trigger
  document.getElementById('btn-admin-trigger').addEventListener('click', () => {
    navigateTo('admin');
  });

  // Streak card → progress page
  document.getElementById('streak-card').addEventListener('click', () => {
    navigateTo('streak');
  });
}

function navigateTo(page) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  // Show target
  const target = document.getElementById(`page-${page}`);
  if (target) {
    target.classList.add('active');
    // Re-trigger animation
    target.style.animation = 'none';
    target.offsetHeight;
    target.style.animation = null;
  }

  // Update nav
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const navBtn = document.querySelector(`.nav-item[data-page="${page}"]`);
  if (navBtn) navBtn.classList.add('active');

  // Hide bottom nav on admin
  document.getElementById('bottom-nav').style.display = page === 'admin' ? 'none' : 'flex';

  currentPage = page;

  // Render page content
  switch (page) {
    case 'home': renderHome(); break;
    case 'learn': renderLearn(); break;
    case 'quiz': renderQuiz(); break;
    case 'streak': renderStreak(); break;
    case 'vocab': renderVocab(); break;
    case 'admin': renderAdmin(); break;
  }
}

// =============================================
// HOME / DASHBOARD
// =============================================

function renderHome() {
  const state = getState();
  const day = state.currentDay;
  const dayData = state.days[day] || {};

  // Greeting
  const hour = new Date().getHours();
  let greet = hour < 12 ? 'Good Morning, Tuli! ☀️' : hour < 17 ? 'Hey Tuli! 🌤️' : 'Good Evening, Tuli! 🌙';
  document.getElementById('greeting-text').textContent = greet;

  // Date
  const now = new Date();
  document.getElementById('date-text').textContent = now.toLocaleDateString('en-IN', {
    weekday: 'long', day: 'numeric', month: 'long'
  });

  // Streak
  document.getElementById('streak-count').textContent = state.streak.current;
  document.getElementById('xp-total').textContent = `${state.xp} XP`;

  // Animate fire based on streak
  const fire = document.getElementById('streak-fire');
  if (state.streak.current >= 7) {
    fire.textContent = '🔥🔥';
  } else if (state.streak.current >= 3) {
    fire.textContent = '🔥';
  } else {
    fire.textContent = '✨';
  }

  // Progress ring
  document.getElementById('progress-day').textContent = `Day ${day}`;
  const circumference = 326.73;
  const progress = (day / 84) * circumference;
  const offset = circumference - progress;
  setTimeout(() => {
    document.getElementById('progress-ring-fill').style.strokeDashoffset = offset;
  }, 100);

  // Level
  const levelInfo = getLevelInfo(state.xp);
  document.getElementById('level-text').textContent = levelInfo.name;
  document.querySelector('.level-icon').textContent = levelInfo.icon;

  // Tasks
  const tasks = getDayTasks(day);
  const tasksCard = document.getElementById('tasks-card');
  tasksCard.innerHTML = '';

  tasks.forEach(task => {
    const isCompleted = dayData.tasks?.[task.id] || false;
    const el = document.createElement('div');
    el.className = `task-item${isCompleted ? ' completed' : ''}`;
    el.innerHTML = `
      <div class="task-checkbox">${isCompleted ? '✓' : ''}</div>
      <div class="task-content">
        <div class="task-label">${task.label}</div>
        <div class="task-sublabel">${task.sublabel}</div>
      </div>
      <span class="task-xp">+${task.xp} XP</span>
    `;

    el.addEventListener('click', () => {
      if (task.id === 'quiz') {
        navigateTo('quiz');
        return;
      }
      if (task.id === 'vocab') {
        navigateTo('vocab');
        return;
      }
      if (task.id === 'read') {
        navigateTo('learn');
        return;
      }

      // Toggle task
      if (isCompleted) {
        markTaskIncomplete(day, task.id);
      } else {
        markTaskComplete(day, task.id);
        addXP(task.xp);
        updateStreak();
        miniCelebration();
        showToast(`+${task.xp} XP earned! 🎉`, 'success');
      }

      // Check if all tasks done
      checkDayCompletion(day);
      renderHome();
    });

    tasksCard.appendChild(el);
  });

  // Check for day advancement button
  if (dayData.completed && day < 84) {
    const advBtn = document.createElement('button');
    advBtn.className = 'btn btn-primary';
    advBtn.style.marginTop = '12px';
    advBtn.textContent = '🚀 Advance to Day ' + (day + 1);
    advBtn.addEventListener('click', () => {
      advanceDay();
      fireConfetti(50);
      showToast(`Day ${day + 1} unlocked! Let's go Tuli! 🚀`, 'success');
      renderHome();
    });
    tasksCard.appendChild(advBtn);
  }

  // Quote
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById('quote-text').textContent = `"${randomQuote.text}"`;
  document.getElementById('quote-author').textContent = `— ${randomQuote.author}`;
}

function checkDayCompletion(day) {
  const state = getState();
  const dayData = state.days[day];
  if (!dayData) return;

  const tasks = getDayTasks(day);
  const allDone = tasks.every(t => dayData.tasks?.[t.id]);

  if (allDone && !dayData.completed) {
    markDayComplete(day);
    addXP(25); // bonus XP for completing all tasks
    addActivity('complete', `Completed Day ${day}!`);
    fireConfetti(100);
    showToast('🎉 Day completed! All tasks done! +25 bonus XP', 'success');
  }
}

// =============================================
// LEARN PAGE
// =============================================

function renderLearn() {
  const day = getCurrentDay();
  const data = getDayCurriculum(day);
  const phase = getPhaseInfo(day);
  const container = document.getElementById('lesson-container');

  let videoHTML = '';
  if (data.videoUrls && Array.isArray(data.videoUrls)) {
    videoHTML = data.videoUrls.map(url => `
      <div class="video-container">
         <iframe src="${url}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
       </div>
    `).join('');
  } else if (data.videoUrl) {
    videoHTML = `<div class="video-container">
         <iframe src="${data.videoUrl}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
       </div>`;
  }

  container.innerHTML = `
    <div class="lesson-phase-tag ${phase.color}">
      ${phase.icon} ${phase.phase} — ${phase.weeks}
    </div>
    <div class="lesson-card">
      <h3>📖 Day ${day}: ${data.title}</h3>
      ${videoHTML}
      ${data.lesson}
    </div>
    <div class="lesson-card">
      <h3>💬 Today's Vocabulary</h3>
      <div style="display:flex;flex-wrap:wrap;gap:6px;">
        ${data.vocabulary.map(v => `
          <div class="vocab-word-card" title="${v.meaning}">
            <span class="vocab-word">${v.word}</span>
            <span class="vocab-meaning">${v.meaning}</span>
          </div>
        `).join('')}
      </div>
    </div>
    <div class="lesson-card">
      <h3>🎤 Speaking Practice</h3>
      <p>Try to explain today's topic in your own words for 5 minutes. Record yourself if possible!</p>
      <p style="margin-top:8px;"><strong>Tip:</strong> Don't worry about mistakes. Just keep speaking! 💪</p>
    </div>
    <button class="btn btn-primary" id="btn-mark-read" style="margin-top:8px;">
      ✅ I've read today's lesson
    </button>
  `;

  document.getElementById('btn-mark-read').addEventListener('click', () => {
    markTaskComplete(day, 'read');
    addXP(10);
    updateStreak();
    miniCelebration();
    showToast('+10 XP! Great job reading! 📚', 'success');
    checkDayCompletion(day);
    document.getElementById('btn-mark-read').textContent = '✅ Done!';
    document.getElementById('btn-mark-read').disabled = true;
  });
}

// =============================================
// QUIZ PAGE
// =============================================

function renderQuiz() {
  const day = getCurrentDay();
  const data = getDayCurriculum(day);

  // Check for custom questions first
  const customQ = getCustomQuestions(day);
  const questions = customQ || data.questions;

  if (!questions || questions.length === 0) {
    document.getElementById('quiz-container').innerHTML = `
      <div style="text-align:center;padding:40px 20px;">
        <div style="font-size:3rem;margin-bottom:16px;">📝</div>
        <h3>No quiz for today yet!</h3>
        <p style="color:var(--text-secondary);margin-top:8px;">Questions will be added soon.</p>
      </div>
    `;
    return;
  }

  quizState = { questions, current: 0, score: 0, answered: false };
  document.getElementById('quiz-result').style.display = 'none';
  document.getElementById('quiz-container').style.display = 'block';
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const { questions, current } = quizState;
  if (current >= questions.length) {
    showQuizResult();
    return;
  }

  const q = questions[current];
  const container = document.getElementById('quiz-container');

  // Update progress bar
  const progressPct = ((current) / questions.length) * 100;
  document.getElementById('quiz-progress-fill').style.width = `${progressPct}%`;

  let optionsHTML = '';

  if (q.type === 'mcq') {
    const letters = ['A', 'B', 'C', 'D'];
    optionsHTML = `
      <div class="quiz-options">
        ${q.options.map((opt, i) => `
          <div class="quiz-option" data-index="${i}">
            <span class="option-letter">${letters[i]}</span>
            <span>${opt}</span>
          </div>
        `).join('')}
      </div>
    `;
  } else if (q.type === 'truefalse') {
    optionsHTML = `
      <div class="tf-buttons">
        <div class="tf-button" data-value="true">
          <span class="tf-icon">✅</span>
          True
        </div>
        <div class="tf-button" data-value="false">
          <span class="tf-icon">❌</span>
          False
        </div>
      </div>
    `;
  } else if (q.type === 'fill') {
    optionsHTML = `
      <div class="fill-input-wrapper">
        <input type="text" class="fill-input" id="fill-answer" placeholder="Type your answer..." autocomplete="off" />
        <button class="btn btn-primary fill-submit" id="btn-fill-submit">Check Answer</button>
      </div>
    `;
  } else if (q.type === 'correct') {
    optionsHTML = `
      <div class="fill-input-wrapper">
        <input type="text" class="fill-input" id="fill-answer" placeholder="Type the corrected sentence..." autocomplete="off" />
        <button class="btn btn-primary fill-submit" id="btn-fill-submit">Check Answer</button>
      </div>
    `;
  }

  const typeBadge = {
    mcq: '<span class="quiz-type-badge badge-mcq">MCQ</span>',
    truefalse: '<span class="quiz-type-badge badge-truefalse">True / False</span>',
    fill: '<span class="quiz-type-badge badge-fill">Fill in the Blank</span>',
    correct: '<span class="quiz-type-badge badge-correct">Fix the Sentence</span>',
  };

  container.innerHTML = `
    <div class="quiz-question-card">
      ${typeBadge[q.type] || ''}
      <p class="quiz-question-number">Question ${current + 1} of ${questions.length}</p>
      <p class="quiz-question-text">${q.question}</p>
      ${optionsHTML}
      <div id="quiz-feedback"></div>
    </div>
  `;

  quizState.answered = false;

  // Event listeners
  if (q.type === 'mcq') {
    container.querySelectorAll('.quiz-option').forEach(opt => {
      opt.addEventListener('click', () => handleMCQAnswer(parseInt(opt.dataset.index)));
    });
  } else if (q.type === 'truefalse') {
    container.querySelectorAll('.tf-button').forEach(btn => {
      btn.addEventListener('click', () => handleTFAnswer(btn.dataset.value === 'true'));
    });
  } else if (q.type === 'fill' || q.type === 'correct') {
    const submitBtn = document.getElementById('btn-fill-submit');
    const input = document.getElementById('fill-answer');
    submitBtn.addEventListener('click', () => handleFillAnswer(input.value));
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleFillAnswer(input.value);
    });
  }
}

function handleMCQAnswer(index) {
  if (quizState.answered) return;
  quizState.answered = true;

  const q = quizState.questions[quizState.current];
  const options = document.querySelectorAll('.quiz-option');
  const isCorrect = index === q.correct;

  if (isCorrect) {
    quizState.score++;
    options[index].classList.add('correct');
    miniCelebration();
  } else {
    options[index].classList.add('wrong');
    options[q.correct].classList.add('correct');
  }

  showFeedback(isCorrect, q.explanation);
}

function handleTFAnswer(answer) {
  if (quizState.answered) return;
  quizState.answered = true;

  const q = quizState.questions[quizState.current];
  const isCorrect = answer === q.correct;
  const buttons = document.querySelectorAll('.tf-button');

  buttons.forEach(btn => {
    const val = btn.dataset.value === 'true';
    if (val === q.correct) btn.classList.add('correct');
    else if (val === answer && !isCorrect) btn.classList.add('wrong');
  });

  if (isCorrect) {
    quizState.score++;
    miniCelebration();
  }

  showFeedback(isCorrect, q.explanation);
}

function handleFillAnswer(answer) {
  if (quizState.answered) return;
  quizState.answered = true;

  const q = quizState.questions[quizState.current];
  const input = document.getElementById('fill-answer');
  const isCorrect = answer.trim().toLowerCase() === q.correct.toLowerCase();

  input.classList.add(isCorrect ? 'correct' : 'wrong');
  input.disabled = true;

  if (isCorrect) {
    quizState.score++;
    miniCelebration();
  }

  const correctHTML = !isCorrect ? `<br><strong>Correct answer:</strong> ${q.correct}` : '';
  showFeedback(isCorrect, q.explanation + correctHTML);
}

function showFeedback(isCorrect, explanation) {
  const feedback = document.getElementById('quiz-feedback');
  feedback.innerHTML = `
    <div class="quiz-explanation">
      <strong>${isCorrect ? '✅ Correct!' : '❌ Not quite!'}</strong><br>
      ${explanation}
    </div>
    <button class="btn btn-primary quiz-next-btn" id="btn-quiz-next">
      ${quizState.current + 1 < quizState.questions.length ? 'Next Question →' : 'See Results 🎯'}
    </button>
  `;

  document.getElementById('btn-quiz-next').addEventListener('click', () => {
    quizState.current++;
    renderQuizQuestion();
  });
}

function showQuizResult() {
  const { score, questions } = quizState;
  const total = questions.length;
  const pct = Math.round((score / total) * 100);
  const day = getCurrentDay();

  // Save score
  saveQuizScore(day, score, total);
  markTaskComplete(day, 'quiz');
  updateStreak();
  addActivity('quiz', `Quiz Day ${day}: ${score}/${total} (${pct}%)`);

  // Determine message
  let msgCategory;
  if (pct === 100) msgCategory = 'perfect';
  else if (pct >= 80) msgCategory = 'great';
  else if (pct >= 60) msgCategory = 'good';
  else if (pct >= 40) msgCategory = 'okay';
  else msgCategory = 'low';

  const messages = encourageMessages[msgCategory];
  const msg = messages[Math.floor(Math.random() * messages.length)];

  // Result emoji
  const emojis = { perfect: '🏆', great: '🌟', good: '💪', okay: '📚', low: '🌈' };

  document.getElementById('quiz-container').style.display = 'none';
  document.getElementById('quiz-progress-fill').style.width = '100%';

  const resultDiv = document.getElementById('quiz-result');
  resultDiv.style.display = 'block';
  resultDiv.innerHTML = `
    <div class="result-emoji">${emojis[msgCategory]}</div>
    <h2 class="result-title">Quiz Complete!</h2>
    <div class="result-score">${score}/${total}</div>
    <p class="result-message">${msg}</p>
    <div class="result-stats">
      <div class="result-stat">
        <div class="result-stat-value" style="color:var(--accent-mint);">${score}</div>
        <div class="result-stat-label">Correct</div>
      </div>
      <div class="result-stat">
        <div class="result-stat-value" style="color:var(--accent-coral);">${total - score}</div>
        <div class="result-stat-label">Wrong</div>
      </div>
      <div class="result-stat">
        <div class="result-stat-value" style="color:var(--accent-gold);">${pct}%</div>
        <div class="result-stat-label">Score</div>
      </div>
    </div>
    <button class="btn btn-primary" id="btn-retry-quiz">🔄 Try Again</button>
    <button class="btn btn-secondary" id="btn-back-home" style="margin-top:8px;">🏠 Back to Home</button>
  `;

  if (pct >= 80) fireConfetti(80);

  document.getElementById('btn-retry-quiz').addEventListener('click', () => {
    renderQuiz();
  });
  document.getElementById('btn-back-home').addEventListener('click', () => {
    checkDayCompletion(day);
    navigateTo('home');
  });
}

// =============================================
// VOCAB PAGE
// =============================================

function renderVocab() {
  const day = getCurrentDay();
  const data = getDayCurriculum(day);
  const words = data.vocabulary || [];
  const container = document.getElementById('vocab-container');

  if (words.length === 0) {
    container.innerHTML = '<p style="text-align:center;color:var(--text-secondary);">No vocabulary for today.</p>';
    return;
  }

  vocabState = { words, current: 0, revealed: false };

  function renderFlashcard() {
    const w = vocabState.words[vocabState.current];
    container.innerHTML = `
      <div class="vocab-flashcard" id="vocab-flashcard">
        <div class="vocab-flashcard-word">${w.word}</div>
        <div class="vocab-flashcard-hint">Tap to reveal meaning</div>
        <div class="vocab-flashcard-meaning">${w.meaning}</div>
      </div>
      <div class="vocab-nav">
        <button class="vocab-nav-btn" id="vocab-prev" ${vocabState.current === 0 ? 'disabled' : ''}>←</button>
        <span class="vocab-counter">${vocabState.current + 1} / ${words.length}</span>
        <button class="vocab-nav-btn" id="vocab-next" ${vocabState.current === words.length - 1 ? 'disabled' : ''}>→</button>
      </div>
      <div class="lesson-card" style="margin-top:16px;">
        <h3>📋 All Words Today</h3>
        <div class="vocab-all-words">
          ${words.map((v, i) => `
            <div class="vocab-word-card ${i === vocabState.current ? 'style="border-color:var(--accent-purple);"' : ''}" data-idx="${i}">
              <span class="vocab-word">${v.word}</span>
            </div>
          `).join('')}
        </div>
      </div>
      <button class="btn btn-success" id="btn-vocab-done" style="margin-top:12px;">
        ✅ I've practiced all words
      </button>
    `;

    vocabState.revealed = false;

    // Flashcard click
    document.getElementById('vocab-flashcard').addEventListener('click', () => {
      const card = document.getElementById('vocab-flashcard');
      if (!vocabState.revealed) {
        card.classList.add('revealed');
        vocabState.revealed = true;
      } else {
        card.classList.remove('revealed');
        vocabState.revealed = false;
      }
    });

    // Nav
    document.getElementById('vocab-prev').addEventListener('click', () => {
      if (vocabState.current > 0) {
        vocabState.current--;
        renderFlashcard();
      }
    });

    document.getElementById('vocab-next').addEventListener('click', () => {
      if (vocabState.current < words.length - 1) {
        vocabState.current++;
        renderFlashcard();
      }
    });

    // Word cards
    container.querySelectorAll('.vocab-word-card').forEach(card => {
      card.addEventListener('click', () => {
        vocabState.current = parseInt(card.dataset.idx);
        renderFlashcard();
      });
    });

    // Done button
    document.getElementById('btn-vocab-done').addEventListener('click', () => {
      const day = getCurrentDay();
      markTaskComplete(day, 'vocab');
      addXP(10);
      updateStreak();
      miniCelebration();
      showToast('+10 XP! Vocabulary done! 💬', 'success');
      checkDayCompletion(day);
    });
  }

  renderFlashcard();
}

// =============================================
// STREAK / PROGRESS PAGE
// =============================================

function renderStreak() {
  const state = getState();
  const container = document.getElementById('streak-detail-container');

  // Stats cards
  const completedDays = Object.values(state.days).filter(d => d.completed).length;
  const quizzes = Object.values(state.days).filter(d => d.quizScore).length;
  const avgAccuracy = quizzes > 0
    ? Math.round(Object.values(state.days)
        .filter(d => d.quizScore)
        .reduce((sum, d) => sum + (d.quizScore.score / d.quizScore.total) * 100, 0) / quizzes)
    : 0;

  // Build heatmap (last 35 days)
  const heatmapCells = [];
  const today = new Date();
  for (let i = 34; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];

    // Find if any day data matches this date
    let level = 0;
    Object.entries(state.days).forEach(([dayNum, dayData]) => {
      if (dayData.timestamp) {
        const dayDate = dayData.timestamp.split('T')[0];
        if (dayDate === dateStr) {
          const tasksDone = Object.values(dayData.tasks || {}).filter(Boolean).length;
          if (tasksDone >= 4) level = 4;
          else if (tasksDone >= 3) level = 3;
          else if (tasksDone >= 2) level = 2;
          else if (tasksDone >= 1) level = 1;
        }
      }
    });

    heatmapCells.push(`<div class="heatmap-cell level-${level}" title="${dateStr}"></div>`);
  }

  // Weekly accuracy breakdown
  const weekBars = [];
  for (let w = 1; w <= 12; w++) {
    const startDay = (w - 1) * 7 + 1;
    const endDay = w * 7;
    let weekScore = 0, weekTotal = 0;
    for (let d = startDay; d <= endDay; d++) {
      if (state.days[d]?.quizScore) {
        weekScore += state.days[d].quizScore.score;
        weekTotal += state.days[d].quizScore.total;
      }
    }
    const pct = weekTotal > 0 ? Math.round((weekScore / weekTotal) * 100) : 0;
    weekBars.push(`
      <div class="week-bar-row">
        <span class="week-bar-label">Week ${w}</span>
        <div class="week-bar-track">
          <div class="week-bar-fill" style="width:${pct}%"></div>
        </div>
        <span class="week-bar-value">${pct}%</span>
      </div>
    `);
  }

  // Badges
  const badgesHTML = badges.map(b => {
    const earned = b.check(state);
    return `
      <div class="badge-item ${earned ? 'earned' : 'locked'}">
        <span class="badge-icon">${b.icon}</span>
        <span class="badge-name">${b.name}</span>
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <div class="stat-cards">
      <div class="stat-card stat-coral">
        <div class="stat-card-value">${state.streak.current}</div>
        <div class="stat-card-label">Current Streak 🔥</div>
      </div>
      <div class="stat-card stat-gold">
        <div class="stat-card-value">${state.streak.longest}</div>
        <div class="stat-card-label">Longest Streak ⭐</div>
      </div>
      <div class="stat-card stat-mint">
        <div class="stat-card-value">${completedDays}</div>
        <div class="stat-card-label">Days Done ✅</div>
      </div>
      <div class="stat-card stat-purple">
        <div class="stat-card-value">${avgAccuracy}%</div>
        <div class="stat-card-label">Quiz Accuracy 🎯</div>
      </div>
    </div>

    <div class="heatmap-section">
      <h3>Activity Heatmap (Last 5 Weeks)</h3>
      <div class="heatmap-day-labels">
        ${['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => `<span class="heatmap-day-label">${d}</span>`).join('')}
      </div>
      <div class="heatmap-grid">
        ${heatmapCells.join('')}
      </div>
    </div>

    <div class="weekly-breakdown">
      <h3>Weekly Quiz Accuracy 📈</h3>
      ${weekBars.join('')}
    </div>

    <div class="badges-section">
      <h3>Achievements 🏆</h3>
      <div class="badges-grid">
        ${badgesHTML}
      </div>
    </div>
  `;
}

// =============================================
// ADMIN PANEL
// =============================================

function setupAdminPIN() {
  const pinInputs = document.querySelectorAll('.pin-digit');

  pinInputs.forEach((input, idx) => {
    input.addEventListener('input', (e) => {
      const val = e.target.value;
      if (val && idx < 3) {
        pinInputs[idx + 1].focus();
      }
      // Check if all filled
      const pin = Array.from(pinInputs).map(i => i.value).join('');
      if (pin.length === 4) {
        if (pin === getAdminPIN()) {
          document.getElementById('admin-gate').style.display = 'none';
          document.getElementById('admin-dashboard').style.display = 'block';
          renderAdminHero();
          renderAdminStats();
          populateAdminDaySelectors();
        } else {
          document.getElementById('pin-error').style.display = 'block';
          pinInputs.forEach(i => { i.value = ''; });
          pinInputs[0].focus();
        }
      }
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !e.target.value && idx > 0) {
        pinInputs[idx - 1].focus();
      }
    });
  });
}

function renderAdmin() {
  // Reset PIN gate
  document.getElementById('admin-gate').style.display = 'flex';
  document.getElementById('admin-dashboard').style.display = 'none';
  document.getElementById('pin-error').style.display = 'none';
  document.querySelectorAll('.pin-digit').forEach(i => { i.value = ''; });
}

function setupAdminTabs() {
  document.querySelectorAll('.admin-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.admin-tab-content').forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(`tab-${tab.dataset.tab}`).classList.add('active');

      if (tab.dataset.tab === 'stats') renderAdminStats();
      if (tab.dataset.tab === 'questions') renderAdminQuestions();
    });
  });
}

function renderAdminHero() {
  const state = getState();
  const heroEl = document.getElementById('admin-hero');
  const days = state.days || {};
  const completedDays = Object.values(days).filter(d => d && d.completed).length;
  const phase = getPhaseInfo(state.currentDay);
  const level = getLevelInfo(state.xp);

  heroEl.innerHTML = `
    <div class="hero-top">
      <div class="hero-avatar">${level.icon}</div>
      <div class="hero-info">
        <h2>Tuli's Journey</h2>
        <p>${phase.icon} ${phase.phase} Phase — Day ${state.currentDay} of 84</p>
      </div>
    </div>
    <div class="hero-stats-row">
      <div class="hero-stat">
        <div class="hero-stat-value" style="color:var(--accent-coral);">${state.streak?.current || 0}🔥</div>
        <div class="hero-stat-label">Streak</div>
      </div>
      <div class="hero-stat">
        <div class="hero-stat-value" style="color:var(--accent-gold);">${state.xp || 0}</div>
        <div class="hero-stat-label">Total XP</div>
      </div>
      <div class="hero-stat">
        <div class="hero-stat-value" style="color:var(--accent-mint);">${completedDays}</div>
        <div class="hero-stat-label">Days Done</div>
      </div>
    </div>
  `;
}

function renderAdminStats() {
  const state = getState();
  const statsGrid = document.getElementById('stats-grid');
  const days = state.days || {};

  const completedDays = Object.values(days).filter(d => d && d.completed).length;
  const quizzes = Object.values(days).filter(d => d && d.quizScore);
  const avgAccuracy = quizzes.length > 0
    ? Math.round(quizzes.reduce((sum, d) => sum + (d.quizScore.score / d.quizScore.total) * 100, 0) / quizzes.length)
    : 0;
  const totalQuestions = quizzes.reduce((sum, d) => sum + d.quizScore.total, 0);
  const totalCorrect = quizzes.reduce((sum, d) => sum + d.quizScore.score, 0);

  statsGrid.innerHTML = `
    <div class="stats-card">
      <div class="stats-card-icon" style="background:rgba(168,85,247,0.12);">📅</div>
      <div class="stats-card-data">
        <div class="stats-card-value" style="color:var(--accent-purple);">Day ${state.currentDay}</div>
        <div class="stats-card-label">Current Day</div>
      </div>
    </div>
    <div class="stats-card">
      <div class="stats-card-icon" style="background:rgba(255,107,107,0.12);">🔥</div>
      <div class="stats-card-data">
        <div class="stats-card-value" style="color:var(--accent-coral);">${state.streak?.current || 0} / ${state.streak?.longest || 0}</div>
        <div class="stats-card-label">Current / Best</div>
      </div>
    </div>
    <div class="stats-card">
      <div class="stats-card-icon" style="background:rgba(255,217,61,0.12);">⭐</div>
      <div class="stats-card-data">
        <div class="stats-card-value" style="color:var(--accent-gold);">${state.xp || 0}</div>
        <div class="stats-card-label">Total XP</div>
      </div>
    </div>
    <div class="stats-card">
      <div class="stats-card-icon" style="background:rgba(107,203,119,0.12);">🎯</div>
      <div class="stats-card-data">
        <div class="stats-card-value" style="color:var(--accent-mint);">${avgAccuracy}%</div>
        <div class="stats-card-label">Avg Accuracy</div>
      </div>
    </div>
    <div class="stats-card">
      <div class="stats-card-icon" style="background:rgba(96,165,250,0.12);">✅</div>
      <div class="stats-card-data">
        <div class="stats-card-value" style="color:var(--accent-blue);">${completedDays}/84</div>
        <div class="stats-card-label">Days Done</div>
      </div>
    </div>
    <div class="stats-card">
      <div class="stats-card-icon" style="background:rgba(244,114,182,0.12);">🧠</div>
      <div class="stats-card-data">
        <div class="stats-card-value" style="color:var(--accent-pink);">${totalCorrect}/${totalQuestions}</div>
        <div class="stats-card-label">Questions Answered</div>
      </div>
    </div>
  `;

  // Improvement tracker
  const improvementEl = document.getElementById('admin-improvement');
  const taskCompletionPct = completedDays > 0 ? Math.round((completedDays / 84) * 100) : 0;
  const streakPct = Math.min(100, Math.round(((state.streak?.current || 0) / 30) * 100));
  const quizPct = avgAccuracy;
  const xpPct = Math.min(100, Math.round(((state.xp || 0) / 2000) * 100));

  improvementEl.innerHTML = `
    <h3>📈 Tuli's Improvement</h3>
    <div class="improvement-row">
      <span class="improvement-label">Progress</span>
      <div class="improvement-bar-track"><div class="improvement-bar-fill green" style="width:${taskCompletionPct}%"></div></div>
      <span class="improvement-value" style="color:var(--accent-mint);">${taskCompletionPct}%</span>
    </div>
    <div class="improvement-row">
      <span class="improvement-label">Streak</span>
      <div class="improvement-bar-track"><div class="improvement-bar-fill purple" style="width:${streakPct}%"></div></div>
      <span class="improvement-value" style="color:var(--accent-purple);">${state.streak?.current || 0}d</span>
    </div>
    <div class="improvement-row">
      <span class="improvement-label">Accuracy</span>
      <div class="improvement-bar-track"><div class="improvement-bar-fill blue" style="width:${quizPct}%"></div></div>
      <span class="improvement-value" style="color:var(--accent-blue);">${quizPct}%</span>
    </div>
    <div class="improvement-row">
      <span class="improvement-label">XP Growth</span>
      <div class="improvement-bar-track"><div class="improvement-bar-fill gold" style="width:${xpPct}%"></div></div>
      <span class="improvement-value" style="color:var(--accent-gold);">${state.xp || 0}</span>
    </div>
  `;

  // Activity log
  const logContainer = document.getElementById('activity-log');
  const activityLog = state.activityLog || [];
  const logs = activityLog.slice(0, 20);

  logContainer.innerHTML = `
    <h3>📋 Tuli's Activity Log</h3>
    ${logs.length === 0 ? '<p style="color:var(--text-muted);font-size:0.85rem;">No activity yet. Tuli hasn\'t started practicing!</p>' : ''}
    ${logs.map(log => {
      const dotColor = log.type === 'complete' ? 'green' : log.type === 'quiz' ? 'yellow' : 'red';
      const time = new Date(log.timestamp).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
      return `
        <div class="activity-item">
          <div class="activity-dot ${dotColor}"></div>
          <span class="activity-text">${log.message}</span>
          <span class="activity-time">${time}</span>
        </div>
      `;
    }).join('')}
  `;
}

function populateAdminDaySelectors() {
  const days = getAllDays();
  const selects = [document.getElementById('admin-day-select'), document.getElementById('manage-day-select')];
  const currentDay = getCurrentDay();

  selects.forEach(select => {
    if (!select) return;
    select.innerHTML = days.map(d =>
      `<option value="${d.day}" ${d.day === currentDay ? 'selected' : ''}>Day ${d.day}: ${d.title}</option>`
    ).join('');
  });

  // Listen for changes on admin day select
  const adminSelect = document.getElementById('admin-day-select');
  if (adminSelect) {
    adminSelect.addEventListener('change', () => renderAdminQuestions());
  }
}

function renderAdminQuestions() {
  const dayNum = parseInt(document.getElementById('admin-day-select')?.value || getCurrentDay());
  const customQ = getCustomQuestions(dayNum);
  const defaultQ = getDayCurriculum(dayNum).questions;
  const questions = customQ || defaultQ;
  const isCustom = !!customQ;

  // Question count info
  const countInfo = document.getElementById('question-count-info');
  countInfo.innerHTML = `📝 <strong>${questions.length}</strong> questions for Day ${dayNum} ${isCustom ? '<span style="color:var(--accent-purple);">(Custom)</span>' : '<span style="color:var(--text-muted);">(Default)</span>'}`;

  const list = document.getElementById('admin-question-list');

  const typeColors = {
    mcq: 'background:rgba(96,165,250,0.15);color:var(--accent-blue);',
    truefalse: 'background:rgba(255,217,61,0.15);color:var(--accent-gold);',
    fill: 'background:rgba(107,203,119,0.15);color:var(--accent-mint);',
    correct: 'background:rgba(244,114,182,0.15);color:var(--accent-pink);',
  };

  const typeLabels = { mcq: 'MCQ', truefalse: 'T/F', fill: 'Fill', correct: 'Fix' };

  list.innerHTML = questions.map((q, i) => `
    <div class="question-list-item" data-index="${i}">
      <span class="q-number">${i + 1}</span>
      <span class="q-type-tag" style="${typeColors[q.type] || ''}">${typeLabels[q.type] || q.type}</span>
      <span class="q-text">${q.question}</span>
      <div class="q-actions">
        <button class="q-action-btn btn-edit-q" data-index="${i}" title="Edit">✏️</button>
        <button class="q-action-btn btn-delete-q" data-index="${i}" title="Delete">🗑️</button>
      </div>
    </div>
  `).join('');

  // Edit handlers
  list.querySelectorAll('.btn-edit-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.index);
      openQuestionModal(dayNum, questions, idx);
    });
  });

  // Delete handlers
  list.querySelectorAll('.btn-delete-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.index);
      const newQuestions = [...questions];
      newQuestions.splice(idx, 1);
      setCustomQuestions(dayNum, newQuestions);
      showToast('Question deleted! 🗑️', 'info');
      renderAdminQuestions();
    });
  });
}

function openQuestionModal(dayNum, questions, editIndex = -1) {
  const modal = document.getElementById('question-modal');
  modal.style.display = 'flex';
  modal.dataset.dayNum = dayNum;
  modal.dataset.editIndex = editIndex;

  const isEdit = editIndex >= 0;
  document.getElementById('modal-title').textContent = isEdit ? 'Edit Question' : 'Add Question';

  // Reset form
  const form = document.getElementById('question-form');
  form.reset();

  if (isEdit) {
    const q = questions[editIndex];
    document.getElementById('q-type').value = q.type;
    document.getElementById('q-text').value = q.question;
    document.getElementById('q-explanation').value = q.explanation || '';

    if (q.type === 'mcq' && q.options) {
      document.getElementById('q-opt-a').value = q.options[0] || '';
      document.getElementById('q-opt-b').value = q.options[1] || '';
      document.getElementById('q-opt-c').value = q.options[2] || '';
      document.getElementById('q-opt-d').value = q.options[3] || '';
      document.getElementById('q-correct-mcq').value = q.correct;
    }

    if (q.type === 'truefalse') {
      document.querySelectorAll('.tf-btn').forEach(btn => {
        btn.classList.toggle('active', (btn.dataset.val === 'true') === q.correct);
      });
    }

    if (q.type === 'fill') {
      document.getElementById('q-fill-answer').value = q.correct || '';
    }

    if (q.type === 'correct') {
      document.getElementById('q-correct-sentence').value = q.correct || '';
    }
  }

  updateQuestionTypeUI();
}

function updateQuestionTypeUI() {
  const type = document.getElementById('q-type').value;
  document.getElementById('mcq-options').style.display = type === 'mcq' ? 'block' : 'none';
  document.getElementById('tf-options').style.display = type === 'truefalse' ? 'block' : 'none';
  document.getElementById('fill-options').style.display = type === 'fill' ? 'block' : 'none';
  document.getElementById('correct-options').style.display = type === 'correct' ? 'block' : 'none';
}

function setupQuestionForm() {
  document.getElementById('q-type').addEventListener('change', updateQuestionTypeUI);

  // TF toggle
  document.querySelectorAll('#tf-options .tf-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#tf-options .tf-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Close modal
  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.getElementById('btn-cancel-question').addEventListener('click', closeModal);

  // Add question button
  document.getElementById('btn-add-question').addEventListener('click', () => {
    const dayNum = parseInt(document.getElementById('admin-day-select')?.value || getCurrentDay());
    const customQ = getCustomQuestions(dayNum);
    const defaultQ = getDayCurriculum(dayNum).questions;
    openQuestionModal(dayNum, customQ || defaultQ, -1);
  });

  // Save question
  document.getElementById('question-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const modal = document.getElementById('question-modal');
    const dayNum = parseInt(modal.dataset.dayNum);
    const editIndex = parseInt(modal.dataset.editIndex);

    const type = document.getElementById('q-type').value;
    const question = document.getElementById('q-text').value.trim();
    const explanation = document.getElementById('q-explanation').value.trim();

    if (!question) {
      showToast('Please enter a question!', 'error');
      return;
    }

    const newQ = { type, question, explanation };

    if (type === 'mcq') {
      newQ.options = [
        document.getElementById('q-opt-a').value.trim(),
        document.getElementById('q-opt-b').value.trim(),
        document.getElementById('q-opt-c').value.trim(),
        document.getElementById('q-opt-d').value.trim(),
      ];
      newQ.correct = parseInt(document.getElementById('q-correct-mcq').value);
    } else if (type === 'truefalse') {
      const activeBtn = document.querySelector('#tf-options .tf-btn.active');
      newQ.correct = activeBtn?.dataset.val === 'true';
    } else if (type === 'fill') {
      newQ.correct = document.getElementById('q-fill-answer').value.trim();
    } else if (type === 'correct') {
      newQ.correct = document.getElementById('q-correct-sentence').value.trim();
    }

    // Get current questions
    const customQ = getCustomQuestions(dayNum);
    const defaultQ = getDayCurriculum(dayNum).questions;
    const questions = [...(customQ || defaultQ)];

    if (editIndex >= 0) {
      questions[editIndex] = newQ;
    } else {
      questions.push(newQ);
    }

    setCustomQuestions(dayNum, questions);
    closeModal();
    renderAdminQuestions();
    showToast(editIndex >= 0 ? 'Question updated! ✏️' : 'Question added! ➕', 'success');
  });
}

function closeModal() {
  document.getElementById('question-modal').style.display = 'none';
}

function setupManageActions() {
  // Mark complete
  document.getElementById('btn-mark-complete')?.addEventListener('click', () => {
    const day = parseInt(document.getElementById('manage-day-select').value);
    markDayComplete(day);
    addActivity('admin', `Marked Day ${day} complete for Tuli`);
    showToast(`Day ${day} marked as complete! ✅`, 'success');
    updateManageDayStatus();
  });

  // Mark incomplete
  document.getElementById('btn-mark-incomplete')?.addEventListener('click', () => {
    const day = parseInt(document.getElementById('manage-day-select').value);
    markDayIncomplete(day);
    addActivity('admin', `Marked Day ${day} incomplete`);
    showToast(`Day ${day} marked as incomplete ↩️`, 'info');
    updateManageDayStatus();
  });

  // Reset day
  document.getElementById('btn-reset-day')?.addEventListener('click', () => {
    const day = parseInt(document.getElementById('manage-day-select').value);
    if (confirm(`Reset all progress for Day ${day}?`)) {
      resetDayProgress(day);
      addActivity('admin', `Reset Day ${day} progress`);
      showToast(`Day ${day} progress reset 🔄`, 'info');
      updateManageDayStatus();
    }
  });

  // Set Day
  document.getElementById('btn-set-day')?.addEventListener('click', () => {
    const input = document.getElementById('set-day-input');
    const day = parseInt(input.value);
    if (day >= 1 && day <= 84) {
      setCurrentDay(day);
      addActivity('admin', `Set Tuli's current day to Day ${day}`);
      showToast(`Tuli is now on Day ${day}! 🎯`, 'success');
      input.value = '';
      renderAdminHero();
      renderAdminStats();
    } else {
      showToast('Enter a day between 1 and 84!', 'error');
    }
  });

  // Manage day selector change → show status
  document.getElementById('manage-day-select')?.addEventListener('change', updateManageDayStatus);

  // Change PIN
  document.getElementById('btn-change-pin')?.addEventListener('click', () => {
    const newPin = document.getElementById('new-pin').value;
    if (newPin.length === 4 && /^\d{4}$/.test(newPin)) {
      setAdminPIN(newPin);
      document.getElementById('new-pin').value = '';
      showToast('PIN updated! 🔐', 'success');
    } else {
      showToast('PIN must be 4 digits!', 'error');
    }
  });

  // Export data
  document.getElementById('btn-export-data')?.addEventListener('click', () => {
    const data = exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tulis_english_quest_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Data exported! 📦', 'success');
  });

  // Reset all
  document.getElementById('btn-reset-all')?.addEventListener('click', () => {
    if (confirm('⚠️ This will delete ALL of Tuli\'s progress. Are you sure?')) {
      if (confirm('Really? This cannot be undone!')) {
        resetAllProgress();
        showToast('All progress reset 🗑️', 'info');
        navigateTo('home');
      }
    }
  });
}

function updateManageDayStatus() {
  const day = parseInt(document.getElementById('manage-day-select')?.value);
  const state = getState();
  const dayData = state.days[day];
  const statusEl = document.getElementById('manage-day-status');
  if (!statusEl) return;

  if (dayData?.completed) {
    const tasksDone = Object.values(dayData.tasks || {}).filter(Boolean).length;
    const quizInfo = dayData.quizScore ? ` | Quiz: ${dayData.quizScore.score}/${dayData.quizScore.total}` : '';
    statusEl.className = 'manage-day-status status-complete';
    statusEl.innerHTML = `✅ Completed — ${tasksDone} tasks done${quizInfo}`;
  } else if (dayData) {
    const tasksDone = Object.values(dayData.tasks || {}).filter(Boolean).length;
    statusEl.className = 'manage-day-status status-incomplete';
    statusEl.innerHTML = `⏳ In Progress — ${tasksDone} tasks done`;
  } else {
    statusEl.className = 'manage-day-status status-incomplete';
    statusEl.innerHTML = `📭 Not started yet`;
  }
}

// =============================================
// TOAST NOTIFICATIONS
// =============================================

function showToast(message, type = 'info') {
  // Remove existing toasts
  document.querySelectorAll('.toast').forEach(t => t.remove());

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 2500);
}
