// ========================================
// DATA - 84-Day English Learning Roadmap
// Based on the PDF curriculum
// ========================================

// Motivational quotes
export const quotes = [
  { text: "The expert in anything was once a beginner.", author: "Helen Hayes" },
  { text: "A different language is a different vision of life.", author: "Federico Fellini" },
  { text: "One language sets you in a corridor for life. Two languages open every door.", author: "Frank Smith" },
  { text: "You can never understand one language until you understand at least two.", author: "Geoffrey Willans" },
  { text: "Learning is a treasure that will follow its owner everywhere.", author: "Chinese Proverb" },
  { text: "The beautiful thing about learning is nobody can take it away from you.", author: "B.B. King" },
  { text: "Every accomplishment starts with the decision to try.", author: "John F. Kennedy" },
  { text: "Small daily improvements over time lead to stunning results.", author: "Robin Sharma" },
  { text: "Don't let what you cannot do interfere with what you can do.", author: "John Wooden" },
  { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
  { text: "Mistakes are proof that you are trying.", author: "Jennifer Lim" },
  { text: "Practice makes progress, not perfection.", author: "Unknown" },
  { text: "Your English is better than my [insert their language]. Keep going!", author: "Every supportive friend" },
  { text: "Fluency is not about perfection. It's about communication.", author: "Language Learning Wisdom" },
  { text: "Speak like no one is judging. Because they're not.", author: "Your English Coach" },
];

// Badges / Achievements
export const badges = [
  { id: 'first_step', name: 'First Step', icon: '👣', requirement: 'Complete Day 1', check: (s) => s.days[1]?.completed },
  { id: 'week_warrior', name: 'Week Warrior', icon: '⚔️', requirement: 'Complete 7 days', check: (s) => Object.values(s.days).filter(d => d.completed).length >= 7 },
  { id: 'streak_3', name: 'On Fire', icon: '🔥', requirement: '3-day streak', check: (s) => s.streak.current >= 3 || s.streak.longest >= 3 },
  { id: 'streak_7', name: 'Unstoppable', icon: '💪', requirement: '7-day streak', check: (s) => s.streak.current >= 7 || s.streak.longest >= 7 },
  { id: 'streak_14', name: 'Dedicated', icon: '🌟', requirement: '14-day streak', check: (s) => s.streak.current >= 14 || s.streak.longest >= 14 },
  { id: 'streak_30', name: 'Legend', icon: '👑', requirement: '30-day streak', check: (s) => s.streak.current >= 30 || s.streak.longest >= 30 },
  { id: 'quiz_master', name: 'Quiz Pro', icon: '🧠', requirement: 'Score 100% on a quiz', check: (s) => Object.values(s.days).some(d => d.quizScore && d.quizScore.score === d.quizScore.total) },
  { id: 'xp_100', name: 'Centurion', icon: '💯', requirement: 'Earn 100 XP', check: (s) => s.xp >= 100 },
  { id: 'xp_500', name: 'Scholar', icon: '📖', requirement: 'Earn 500 XP', check: (s) => s.xp >= 500 },
  { id: 'halfway', name: 'Halfway Hero', icon: '🏔️', requirement: 'Reach Day 42', check: (s) => s.currentDay >= 42 },
  { id: 'phase2', name: 'Conversationalist', icon: '💬', requirement: 'Start Phase 2 (Day 29)', check: (s) => s.currentDay >= 29 },
  { id: 'graduate', name: 'Graduate', icon: '🎓', requirement: 'Complete Day 84', check: (s) => s.days[84]?.completed },
];

// Encouraging messages for quiz results
export const encourageMessages = {
  perfect: ["You absolutely crushed it! 🔥", "PERFECT SCORE! You're amazing! ✨", "100%! Genius level unlocked! 🧠💎"],
  great: ["So close to perfect! Amazing work! 🌟", "You're really getting this! Keep it up! 💪", "Great job! Your English is improving fast! 🚀"],
  good: ["Nice effort! You're learning! 📈", "Good work! Review the mistakes and try again! 💪", "Keep going, you're making progress! 🌱"],
  okay: ["Don't worry! Every mistake is a lesson! 📚", "Practice makes progress! Try reviewing the lesson first 💪", "You got this! Try again after reviewing! 🔄"],
  low: ["Hey, it's okay! Let's review the lesson together 📖", "Learning takes time, don't give up! 🌈", "Read the lesson again and you'll do better! 💕"],
};

// Get phase info for a day
export function getPhaseInfo(day) {
  if (day <= 28) return { phase: 'Foundation', weeks: 'Week 1-4', color: 'phase-foundation', icon: '🌱' };
  if (day <= 56) return { phase: 'Conversations', weeks: 'Week 5-8', color: 'phase-conversation', icon: '💬' };
  return { phase: 'Advanced', weeks: 'Week 9-12', color: 'phase-advanced', icon: '🚀' };
}

// Get level info based on XP
export function getLevelInfo(xp) {
  if (xp < 50) return { level: 1, name: 'Beginner', icon: '🌱', next: 50 };
  if (xp < 150) return { level: 2, name: 'Starter', icon: '🌿', next: 150 };
  if (xp < 300) return { level: 3, name: 'Learner', icon: '📗', next: 300 };
  if (xp < 500) return { level: 4, name: 'Speaker', icon: '💬', next: 500 };
  if (xp < 800) return { level: 5, name: 'Confident', icon: '💪', next: 800 };
  if (xp < 1200) return { level: 6, name: 'Fluent', icon: '⭐', next: 1200 };
  if (xp < 2000) return { level: 7, name: 'Pro', icon: '🌟', next: 2000 };
  return { level: 8, name: 'Master', icon: '👑', next: null };
}

// Default tasks for each day
export function getDayTasks(day) {
  const phase = getPhaseInfo(day);
  const data = curriculum[day];
  const hasVideo = data && (data.videoUrl || (data.videoUrls && data.videoUrls.length > 0));

  const baseTasks = [];
  
  if (hasVideo) {
    baseTasks.push({ id: 'watch', label: '📺 Watch the video lesson', sublabel: 'Learn from the teacher', xp: 10 });
  }

  baseTasks.push(
    { id: 'read', label: '📖 Read today\'s notes', sublabel: 'Review the key points', xp: 10 },
    { id: 'vocab', label: '💬 Practice vocabulary', sublabel: `Learn today's new words`, xp: 10 },
    { id: 'quiz', label: '🧠 Complete the quiz', sublabel: 'Test your knowledge', xp: 15 }
  );

  if (day <= 28) {
    baseTasks.push({ id: 'practice', label: '🎤 Speak for 5 minutes', sublabel: 'Practice self-introduction', xp: 15 });
  } else if (day <= 56) {
    baseTasks.push({ id: 'practice', label: '🎤 Role-play practice', sublabel: 'Practice a conversation', xp: 15 });
  } else {
    baseTasks.push({ id: 'practice', label: '🎤 Impromptu speaking', sublabel: '2-min talk on a random topic', xp: 15 });
  }

  return baseTasks;
}

// =============================================
// 84-DAY CURRICULUM DATA
// =============================================
// Each day: { title, lesson (HTML content), vocabulary, questions }

const curriculum = {};

// ====== PHASE 1: WEEKS 1-4 (Days 1-28) — Foundation & Sentence Basics ======

// --- Week 1: Parts of Speech & Sentence Building ---

curriculum[1] = {
  title: "What is a Sentence? Subject & Verb",
  videoUrls: [
    "https://www.youtube.com/embed/G8ao2JdpDMM",
    "https://www.youtube.com/embed/l9pRXG72wCY"
  ],
  lesson: `
    <p>Every English sentence needs two things: a <span class="highlight">Subject</span> (who/what) and a <span class="highlight">Verb</span> (action/state).</p>
    <ul>
      <li><strong>Subject</strong>: The person or thing doing the action. <em>Example: She, The cat, Ram</em></li>
      <li><strong>Verb</strong>: What the subject does. <em>Example: runs, eats, is</em></li>
    </ul>
    <p>Simple pattern: <span class="highlight">Subject + Verb + Object (SVO)</span></p>
    <p>Examples:</p>
    <ul>
      <li>I <strong>eat</strong> rice. (Subject: I, Verb: eat, Object: rice)</li>
      <li>She <strong>reads</strong> books.</li>
      <li>They <strong>play</strong> cricket.</li>
    </ul>
    <p>💡 <strong>Tip:</strong> Don't translate from Hindi/your mother tongue! Think in SVO order directly.</p>
  `,
  vocabulary: [
    { word: "Sentence", meaning: "A group of words that expresses a complete thought" },
    { word: "Subject", meaning: "The person or thing doing the action" },
    { word: "Verb", meaning: "An action word (run, eat, speak)" },
    { word: "Object", meaning: "The thing receiving the action" },
    { word: "Grammar", meaning: "The rules of a language" },
    { word: "Noun", meaning: "A naming word (person, place, thing)" },
    { word: "Pronoun", meaning: "A word used instead of a noun (he, she, it)" },
    { word: "Confident", meaning: "Sure of yourself, not afraid" },
    { word: "Fluent", meaning: "Able to speak smoothly and easily" },
    { word: "Practice", meaning: "To do something again and again to improve" },
  ],
  questions: [
    { type: 'mcq', question: 'What are the two essential parts of every English sentence?', options: ['Noun and Adjective', 'Subject and Verb', 'Article and Preposition', 'Pronoun and Adverb'], correct: 1, explanation: 'Every sentence needs a Subject (who/what does) and a Verb (the action).' },
    { type: 'mcq', question: 'In the sentence "She reads books", what is the verb?', options: ['She', 'reads', 'books', 'the'], correct: 1, explanation: '"Reads" is the action word — it tells us what "She" does.' },
    { type: 'truefalse', question: 'In English, the standard sentence order is Subject + Object + Verb (SOV).', correct: false, explanation: 'English uses SVO (Subject + Verb + Object), not SOV. Hindi uses SOV which is why many learners make this mistake!' },
    { type: 'truefalse', question: '"I eat rice" follows the SVO pattern.', correct: true, explanation: 'I (Subject) + eat (Verb) + rice (Object) = perfect SVO!' },
    { type: 'fill', question: '___ plays cricket every day.', correct: 'He', explanation: 'We need a subject (pronoun) to start the sentence. "He" fits perfectly.' },
    { type: 'mcq', question: 'Which of these is a complete sentence?', options: ['Running fast', 'She runs fast', 'Very beautiful', 'In the morning'], correct: 1, explanation: '"She runs fast" has both a subject (She) and a verb (runs). The others are fragments.' },
    { type: 'correct', question: 'Fix this sentence: "Rice I eat daily."', correct: 'I eat rice daily.', explanation: 'In English, we use SVO order: Subject (I) + Verb (eat) + Object (rice) + time (daily).' },
  ]
};

curriculum[2] = {
  title: "Nouns — Naming Words",
  videoUrl: "https://www.youtube.com/embed/AGIG-g_aOqY",
  lesson: `
    <p>A <span class="highlight">Noun</span> is a word that names a person, place, thing, or idea.</p>
    <ul>
      <li><strong>Person:</strong> teacher, girl, Rahul, mother</li>
      <li><strong>Place:</strong> school, Delhi, market, home</li>
      <li><strong>Thing:</strong> book, phone, water, chair</li>
      <li><strong>Idea:</strong> love, happiness, freedom, education</li>
    </ul>
    <p><strong>Types of Nouns:</strong></p>
    <ul>
      <li><span class="highlight">Common Noun</span>: general name (city, dog, boy)</li>
      <li><span class="highlight">Proper Noun</span>: specific name, always capitalized (Mumbai, Rex, Aman)</li>
      <li><span class="highlight">Countable</span>: can be counted (books, chairs)</li>
      <li><span class="highlight">Uncountable</span>: cannot be counted (water, rice, information)</li>
    </ul>
    <p>💡 <strong>Common Mistake:</strong> "I need informations" ❌ → "I need information" ✅ (uncountable!)</p>
  `,
  vocabulary: [
    { word: "Common", meaning: "Ordinary, shared by many" },
    { word: "Proper", meaning: "Specific, belonging to one" },
    { word: "Countable", meaning: "Can be counted (one, two, three...)" },
    { word: "Uncountable", meaning: "Cannot be counted directly" },
    { word: "Abstract", meaning: "Something you cannot touch (love, happiness)" },
    { word: "Concrete", meaning: "Something you can touch (table, pen)" },
    { word: "Education", meaning: "The process of learning and teaching" },
    { word: "Freedom", meaning: "The state of being free" },
    { word: "Knowledge", meaning: "Information and understanding" },
    { word: "Experience", meaning: "Something that happens to you or that you do" },
  ],
  questions: [
    { type: 'mcq', question: 'Which of these is a proper noun?', options: ['city', 'Delhi', 'boy', 'school'], correct: 1, explanation: 'Delhi is a specific place name, so it\'s a proper noun. Always capitalize proper nouns!' },
    { type: 'mcq', question: '"Water" is an example of a(n) ___ noun.', options: ['Proper', 'Countable', 'Uncountable', 'Pronoun'], correct: 2, explanation: 'Water cannot be counted directly (you can\'t say "one water, two waters"). It\'s uncountable.' },
    { type: 'truefalse', question: 'Proper nouns should always start with a capital letter.', correct: true, explanation: 'Yes! Names of specific people, places, and things always start with a capital letter.' },
    { type: 'truefalse', question: '"Happiness" is a concrete noun because you can feel it.', correct: false, explanation: 'Happiness is abstract — you cannot physically touch it. Concrete nouns are things you can touch.' },
    { type: 'fill', question: 'My ___ is very strict but kind.', correct: 'teacher', explanation: 'Teacher is a common noun for a person.' },
    { type: 'correct', question: 'Fix: "I need many informations about this."', correct: 'I need much information about this.', explanation: '"Information" is uncountable. Use "much" instead of "many" with uncountable nouns.' },
    { type: 'mcq', question: 'Which word is an abstract noun?', options: ['Chair', 'Courage', 'Apple', 'River'], correct: 1, explanation: 'Courage is something you cannot see or touch — it exists as an idea. That makes it abstract.' },
  ]
};

curriculum[3] = {
  title: "Pronouns — Words that Replace Nouns",
  videoUrl: "https://www.youtube.com/embed/TOsNcqImhzI",
  lesson: `
    <p><span class="highlight">Pronouns</span> replace nouns so we don't repeat the same word again and again.</p>
    <p>Instead of: "Ram went to Ram's house because Ram was tired."</p>
    <p>We say: "<strong>Ram</strong> went to <strong>his</strong> house because <strong>he</strong> was tired."</p>
    <table style="width:100%;font-size:0.85rem;color:var(--text-secondary);">
      <tr><th style="text-align:left;padding:4px;">Person</th><th>Subject</th><th>Object</th><th>Possessive</th></tr>
      <tr><td>1st singular</td><td>I</td><td>me</td><td>my/mine</td></tr>
      <tr><td>2nd</td><td>you</td><td>you</td><td>your/yours</td></tr>
      <tr><td>3rd male</td><td>he</td><td>him</td><td>his</td></tr>
      <tr><td>3rd female</td><td>she</td><td>her</td><td>her/hers</td></tr>
      <tr><td>3rd thing</td><td>it</td><td>it</td><td>its</td></tr>
      <tr><td>1st plural</td><td>we</td><td>us</td><td>our/ours</td></tr>
      <tr><td>3rd plural</td><td>they</td><td>them</td><td>their/theirs</td></tr>
    </table>
    <p>💡 <strong>Common MTI Error:</strong> "She is very beautiful" is correct. NOT "She very beautiful" (don't drop the verb "is"!).</p>
  `,
  vocabulary: [
    { word: "Replace", meaning: "To take the place of something" },
    { word: "Possessive", meaning: "Showing ownership (my, your, his)" },
    { word: "Singular", meaning: "One person or thing" },
    { word: "Plural", meaning: "More than one" },
    { word: "Ourselves", meaning: "Reflexive pronoun for 'we'" },
    { word: "Herself", meaning: "Reflexive pronoun for 'she'" },
    { word: "Someone", meaning: "An unknown person" },
    { word: "Everyone", meaning: "All people" },
    { word: "Nobody", meaning: "No person" },
    { word: "Communicate", meaning: "To share information with others" },
  ],
  questions: [
    { type: 'mcq', question: 'Which pronoun replaces "Priya" in a sentence?', options: ['He', 'She', 'They', 'It'], correct: 1, explanation: 'Priya is a female name, so we use "She".' },
    { type: 'fill', question: 'Rahul lost ___ phone at school.', correct: 'his', explanation: 'Rahul is male, so we use the possessive pronoun "his".' },
    { type: 'truefalse', question: '"Me went to the market" is grammatically correct.', correct: false, explanation: '"Me" is an object pronoun. The correct subject pronoun is "I". Say "I went to the market."' },
    { type: 'correct', question: 'Fix: "Her is my best friend."', correct: 'She is my best friend.', explanation: '"Her" is an object/possessive pronoun. Use the subject pronoun "She" when it\'s the doer of the action.' },
    { type: 'mcq', question: 'Choose the correct sentence:', options: ['Me and Ravi went to school.', 'Ravi and I went to school.', 'I and Ravi went to school.', 'Ravi and me went to school.'], correct: 1, explanation: 'The polite and grammatically correct form puts the other person first: "Ravi and I".' },
    { type: 'truefalse', question: '"They" can only refer to multiple people.', correct: false, explanation: '"They" can also be used as a gender-neutral singular pronoun (e.g., "Someone left their bag").' },
    { type: 'fill', question: 'The cat licked ___ paw after eating.', correct: 'its', explanation: 'For animals/things, we use "its" (no apostrophe!) as the possessive pronoun.' },
  ]
};

curriculum[4] = {
  title: "Verbs — Action & Being Words",
  videoUrl: "https://www.youtube.com/embed/CvZm15LrL1A",
  lesson: `
    <p><span class="highlight">Verbs</span> are the heart of every sentence. They show action or state of being.</p>
    <p><strong>Action verbs:</strong> run, eat, write, play, study, speak</p>
    <p><strong>Being verbs (to be):</strong> am, is, are, was, were</p>
    <p><strong>"To be" verbs — super important in English!</strong></p>
    <ul>
      <li>I <strong>am</strong> happy.</li>
      <li>She <strong>is</strong> a student.</li>
      <li>They <strong>are</strong> friends.</li>
    </ul>
    <p><strong>Helping verbs:</strong> do, does, did, have, has, will, can, may, should</p>
    <p>💡 <strong>Major MTI Error:</strong> In Hindi, we skip "is/am/are" but in English they are REQUIRED!</p>
    <ul>
      <li>❌ "She happy" → ✅ "She <strong>is</strong> happy"</li>
      <li>❌ "I student" → ✅ "I <strong>am</strong> a student"</li>
      <li>❌ "They friends" → ✅ "They <strong>are</strong> friends"</li>
    </ul>
  `,
  vocabulary: [
    { word: "Action", meaning: "Something you do" },
    { word: "Achieve", meaning: "To successfully reach a goal" },
    { word: "Create", meaning: "To make something new" },
    { word: "Develop", meaning: "To grow or improve over time" },
    { word: "Establish", meaning: "To set up or start something" },
    { word: "Improve", meaning: "To make better" },
    { word: "Organize", meaning: "To arrange things in order" },
    { word: "Recognize", meaning: "To identify or acknowledge" },
    { word: "Suggest", meaning: "To put forward an idea" },
    { word: "Transform", meaning: "To change completely" },
  ],
  questions: [
    { type: 'mcq', question: 'Which is a "to be" verb?', options: ['run', 'is', 'eat', 'play'], correct: 1, explanation: '"Is" is a form of "to be" (am, is, are, was, were).' },
    { type: 'fill', question: 'She ___ a doctor. (use correct "to be" verb)', correct: 'is', explanation: 'With "She" (third person singular), we use "is".' },
    { type: 'correct', question: 'Fix: "They very intelligent students."', correct: 'They are very intelligent students.', explanation: 'In English, you cannot drop "are". Hindi skips it, but English needs it!' },
    { type: 'truefalse', question: '"I am eat food" is correct English.', correct: false, explanation: '"Am" and "eat" clash here. Either "I am eating food" (continuous) or "I eat food" (simple).' },
    { type: 'mcq', question: 'Which sentence is correct?', options: ['She happy today.', 'She is happy today.', 'She be happy today.', 'She are happy today.'], correct: 1, explanation: '"She" takes "is" as the helping verb. "She is happy today."' },
    { type: 'fill', question: 'I ___ a student of English.', correct: 'am', explanation: 'With "I", always use "am".' },
    { type: 'truefalse', question: '"Helping verbs" help the main verb in a sentence.', correct: true, explanation: 'Yes! Helping verbs (do, does, did, can, will, etc.) support the main verb to form questions, negatives, and tenses.' },
  ]
};

curriculum[5] = {
  title: "Articles — A, An, The",
  videoUrl: "https://www.youtube.com/embed/2hlnMQKPdE8",
  lesson: `
    <p><span class="highlight">Articles</span> are tiny words that come before nouns. English has three: <strong>a, an, the</strong>.</p>
    <p><strong>Indefinite Articles (a/an):</strong> Used for non-specific things.</p>
    <ul>
      <li><strong>A</strong> is used before consonant sounds: a cat, a university, a European</li>
      <li><strong>An</strong> is used before vowel sounds: an apple, an hour, an MBA</li>
    </ul>
    <p>⚠️ It's about the <em>sound</em>, not the letter! "Hour" starts with a vowel sound, so we say "an hour".</p>
    <p><strong>Definite Article (the):</strong> Used for specific things.</p>
    <ul>
      <li>"I saw <strong>a</strong> dog." (any dog, first mention)</li>
      <li>"<strong>The</strong> dog was brown." (the specific dog I mentioned)</li>
    </ul>
    <p>💡 <strong>Hindi doesn't have articles!</strong> That's why Indians often skip them. But in English, they're essential.</p>
  `,
  vocabulary: [
    { word: "Article", meaning: "A/An/The — words used before nouns" },
    { word: "Definite", meaning: "Specific, known, certain" },
    { word: "Indefinite", meaning: "Not specific, general" },
    { word: "Consonant", meaning: "Letters that are not vowels (B, C, D, etc.)" },
    { word: "Vowel", meaning: "The letters A, E, I, O, U" },
    { word: "Specific", meaning: "Clearly defined, particular" },
    { word: "General", meaning: "Not limited to one thing" },
    { word: "University", meaning: "A place for higher education" },
    { word: "Honest", meaning: "Truthful, not lying" },
    { word: "European", meaning: "From Europe" },
  ],
  questions: [
    { type: 'mcq', question: 'Which is correct: "__ hour"?', options: ['a hour', 'an hour', 'the hour', 'no article'], correct: 1, explanation: '"Hour" starts with a vowel SOUND (/aʊ/), so we use "an".' },
    { type: 'mcq', question: 'Which is correct: "__ university"?', options: ['an university', 'a university', 'the university', 'university'], correct: 1, explanation: '"University" starts with a /juː/ sound (consonant sound), so we use "a".' },
    { type: 'truefalse', question: 'We always use "an" before words starting with a vowel letter.', correct: false, explanation: 'Not always! It depends on the SOUND. "A university" is correct because it starts with a consonant sound /juː/.' },
    { type: 'fill', question: 'She is ___ honest person.', correct: 'an', explanation: '"Honest" starts with a vowel sound (/ɒ/), the "h" is silent. So we use "an".' },
    { type: 'correct', question: 'Fix: "I want to be engineer."', correct: 'I want to be an engineer.', explanation: 'We need the article "an" before "engineer" (vowel sound). In Hindi we skip articles, but English needs them!' },
    { type: 'mcq', question: '"I saw ___ beautiful sunset yesterday."', options: ['a', 'an', 'the', 'no article'], correct: 0, explanation: '"A" is used because we\'re talking about any beautiful sunset, not a specific one. "Beautiful" starts with a consonant sound.' },
    { type: 'truefalse', question: '"The" is called the definite article.', correct: true, explanation: 'Yes! "The" refers to a specific noun that both speaker and listener know about.' },
  ]
};

curriculum[6] = {
  title: "Singular & Plural + Common Mistakes",
  videoUrl: "https://www.youtube.com/embed/s11mjre1K3Y",
  lesson: `
    <p>Making words plural in English has rules — and many exceptions!</p>
    <p><strong>Regular rules:</strong></p>
    <ul>
      <li>Most nouns: add <strong>-s</strong> (book → books, cat → cats)</li>
      <li>Words ending in s, sh, ch, x, z: add <strong>-es</strong> (bus → buses, watch → watches)</li>
      <li>Words ending in consonant + y: change y to <strong>-ies</strong> (baby → babies, city → cities)</li>
      <li>Words ending in f/fe: change to <strong>-ves</strong> (knife → knives, leaf → leaves)</li>
    </ul>
    <p><strong>Irregular plurals (memorize these!):</strong></p>
    <ul>
      <li>man → men, woman → women, child → children</li>
      <li>tooth → teeth, foot → feet, mouse → mice</li>
      <li>fish → fish, sheep → sheep, deer → deer</li>
    </ul>
    <p>💡 <strong>Indian English Mistake:</strong> "One person, two persons" → Actually "people" is more natural: "two people" ✅</p>
  `,
  vocabulary: [
    { word: "Singular", meaning: "One (a book, one child)" },
    { word: "Plural", meaning: "More than one (books, children)" },
    { word: "Regular", meaning: "Following the normal pattern" },
    { word: "Irregular", meaning: "Not following the normal pattern" },
    { word: "Exception", meaning: "Something that doesn't follow the rule" },
    { word: "Memorize", meaning: "To learn and remember exactly" },
    { word: "Pattern", meaning: "A repeated design or order" },
    { word: "Rhythm", meaning: "A regular beat or pattern in speaking" },
    { word: "Syllable", meaning: "A unit of sound in a word" },
    { word: "Accent", meaning: "The way you pronounce words" },
  ],
  questions: [
    { type: 'mcq', question: 'What is the plural of "child"?', options: ['childs', 'childrens', 'children', 'child'], correct: 2, explanation: '"Child" has an irregular plural: "children". Not "childs"!' },
    { type: 'fill', question: 'I saw three ___ in the garden. (mouse)', correct: 'mice', explanation: 'Mouse → mice is an irregular plural. You must memorize it!' },
    { type: 'truefalse', question: 'The plural of "fish" is "fishes".', correct: false, explanation: '"Fish" is usually the same in plural: "one fish, two fish". "Fishes" is only used when talking about different species.' },
    { type: 'correct', question: 'Fix: "Many peoples came to the party."', correct: 'Many people came to the party.', explanation: '"People" is already plural (of "person"). Don\'t add -s to it!' },
    { type: 'mcq', question: 'What is the plural of "watch"?', options: ['watchs', 'watches', 'watch', 'watchies'], correct: 1, explanation: 'Words ending in -ch add "-es": watch → watches.' },
    { type: 'truefalse', question: '"Deer" changes to "deers" in plural.', correct: false, explanation: '"Deer" stays the same: "one deer, many deer". It\'s an unchanged plural.' },
    { type: 'mcq', question: 'Which plural is WRONG?', options: ['knives', 'cities', 'babys', 'boxes'], correct: 2, explanation: '"Baby" ends in consonant + y, so it becomes "babies", not "babys".' },
  ]
};

curriculum[7] = {
  title: "Week 1 Review — Build Your First Paragraph!",
  lesson: `
    <p>🎉 <strong>Congratulations on completing Week 1!</strong></p>
    <p>This week you learned:</p>
    <ul>
      <li>✅ SVO sentence structure</li>
      <li>✅ Nouns (common, proper, countable, uncountable)</li>
      <li>✅ Pronouns (I, you, he, she, it, we, they)</li>
      <li>✅ Verbs (action & "to be")</li>
      <li>✅ Articles (a, an, the)</li>
      <li>✅ Singular & Plural</li>
    </ul>
    <p><strong>🎯 Today's Challenge: Write a short paragraph about yourself!</strong></p>
    <p>Try to use:</p>
    <ul>
      <li>At least 5 sentences</li>
      <li>Different types of nouns</li>
      <li>Correct pronouns</li>
      <li>Proper articles</li>
      <li>Both singular and plural nouns</li>
    </ul>
    <p>Example: "My name is Priya. <strong>I am</strong> a student. <strong>I</strong> study in <strong>a</strong> college in Delhi. <strong>I</strong> have two <strong>brothers</strong>. <strong>They</strong> are very kind."</p>
    <p>💡 <strong>Recording Exercise:</strong> Read your paragraph aloud and record it! Listen back and check your pronunciation.</p>
  `,
  vocabulary: [
    { word: "Paragraph", meaning: "A group of sentences about one topic" },
    { word: "Review", meaning: "To look at something again" },
    { word: "Challenge", meaning: "A difficult but exciting task" },
    { word: "Introduce", meaning: "To present yourself or someone" },
    { word: "Describe", meaning: "To tell about something using words" },
    { word: "Express", meaning: "To show your thoughts or feelings" },
    { word: "Conversation", meaning: "A talk between two or more people" },
    { word: "Pronounce", meaning: "To say a word in a specific way" },
    { word: "Record", meaning: "To capture audio or video" },
    { word: "Progress", meaning: "Moving forward, getting better" },
  ],
  questions: [
    { type: 'mcq', question: 'Which sentence has correct SVO order?', options: ['Very happy I am.', 'I am very happy.', 'Happy am I very.', 'Am I very happy.'], correct: 1, explanation: '"I (S) am (V) very happy" follows the correct English word order.' },
    { type: 'correct', question: 'Fix: "My name Priya. I student."', correct: 'My name is Priya. I am a student.', explanation: 'Don\'t forget "is" and "am"! Also need the article "a" before "student".' },
    { type: 'truefalse', question: '"I have two brother" is correct.', correct: false, explanation: '"Two" means plural, so it should be "two brothers" with the -s.' },
    { type: 'fill', question: 'She ___ from Mumbai. (to be verb)', correct: 'is', explanation: 'She + is. Always use "is" with he/she/it.' },
    { type: 'mcq', question: 'Which sentence has a mistake?', options: ['They are my friends.', 'I am an engineer.', 'She have two cats.', 'We are happy.'], correct: 2, explanation: '"She" takes "has", not "have". "She has two cats."' },
    { type: 'correct', question: 'Fix: "He go to school everyday."', correct: 'He goes to school every day.', explanation: 'With he/she/it, add -s/-es to the verb: "goes". Also "every day" is two words.' },
    { type: 'truefalse', question: 'A paragraph is a group of related sentences about one topic.', correct: true, explanation: 'Exactly! A paragraph focuses on one main idea, expressed through multiple sentences.' },
  ]
};

// Generic video pools for generated days featuring top Indian English educators
const genericVideos = [
  "https://www.youtube.com/embed/M1aA_A9x90M", // Dear Sir - Tenses
  "https://www.youtube.com/embed/Xb9x5jK0_yQ", // English Connection - Daily Use Sentences
  "https://www.youtube.com/embed/0WjQ-g9lW8s", // Dear Sir - Prepositions
  "https://www.youtube.com/embed/b2zYj1B8_uU", // Spoken English Guru - Modals
  "https://www.youtube.com/embed/uU_Hl1V7a0A", // Dear Sir - Active Passive
];

// --- Weeks 2-4: More Foundation Topics ---
// Days 8-28: Adjectives, Adverbs, Prepositions, Tenses basics, Pronunciation

const weekTwoToFourTopics = [
  { day: 8, title: "Adjectives — Describing Words", focus: "big, small, beautiful, ugly, happy, sad", videoUrl: "https://www.youtube.com/embed/tNzSrEkx6bM" },
  { day: 9, title: "Adverbs — How, When, Where", focus: "quickly, slowly, always, never, here, there", videoUrl: "https://www.youtube.com/embed/dPpzLT48yKM" },
  { day: 10, title: "Prepositions — in, on, at, to, from", focus: "Position and direction words", videoUrl: "https://www.youtube.com/embed/IGODTYMQaf0" },
  { day: 11, title: "Conjunctions — and, but, or, because", focus: "Joining words and sentences", videoUrls: ["https://www.youtube.com/embed/XzVFbfdymas", "https://www.youtube.com/embed/FO8ZvqTB68Y"] },
  { day: 12, title: "Simple Present Tense", focus: "I eat, She eats, We play", videoUrls: ["https://www.youtube.com/embed/NA6E-NULuo8", "https://www.youtube.com/embed/6CrZp1cwK6g"] },
  { day: 13, title: "Present Continuous Tense", focus: "I am eating, She is playing", videoUrl: "https://www.youtube.com/embed/rFdhrR6Dpco" },
  { day: 14, title: "Week 2 Review — Describe Your Daily Routine", focus: "Practice using all parts of speech", videoUrl: null },
  { day: 15, title: "Simple Past Tense", focus: "I ate, She played, They went", videoUrl: "https://www.youtube.com/embed/92foCQ5bT2w" },
  { day: 16, title: "Past Continuous Tense", focus: "I was eating, They were playing", videoUrl: "https://www.youtube.com/embed/x-IbabnLzng" },
  { day: 17, title: "Simple Future — will & going to", focus: "I will eat, She is going to play", videoUrl: "https://www.youtube.com/embed/Zyg-n28rhqc" },
  { day: 18, title: "Pronunciation — Vowel Sounds", focus: "/ɪ/ vs /iː/, /æ/ vs /ʌ/", videoUrls: ["https://www.youtube.com/embed/RakVcW1Ib04", "https://www.youtube.com/embed/qniH34JylVQ"] },
  { day: 19, title: "Pronunciation — Consonant Sounds", focus: "th, v/w, silent letters", videoUrl: "https://www.youtube.com/embed/WJnrveWw6uA?start=169" },
  { day: 20, title: "Common Indian Pronunciation Mistakes", focus: "school≠iskool, think≠tink", videoUrl: "https://www.youtube.com/embed/zLI3Lg6Hz8g" },
  { day: 21, title: "Week 3 Review — Record & Compare", focus: "Record yourself reading and compare", videoUrl: null },
  { day: 22, title: "Question Formation — Yes/No Questions", focus: "Do you, Does she, Is he", videoUrl: "https://www.youtube.com/embed/YIkewDhlSwQ" },
  { day: 23, title: "Question Formation — WH Questions", focus: "What, Where, When, Why, How", videoUrl: "https://www.youtube.com/embed/mDBR4UWmwKQ" },
  { day: 24, title: "Negative Sentences", focus: "don't, doesn't, isn't, aren't, won't", videoUrl: "https://www.youtube.com/embed/olA4Ebvdf7w" },
  { day: 25, title: "Self-Introduction Practice", focus: "Name, place, hobbies, family, dreams", videoUrl: "https://www.youtube.com/embed/4fOLmHuoFyg" },
  { day: 26, title: "Describing a Photo Out Loud", focus: "I can see... There is... It looks like...", videoUrl: "https://www.youtube.com/embed/EW0R1KfZf4A" },
  { day: 27, title: "Common Greeting & Farewell Phrases", focus: "How are you? Nice to meet you!", videoUrl: "https://www.youtube.com/embed/6lqNcWpb-48" },
  { day: 28, title: "Phase 1 Final Review — Foundation Complete! 🎉", focus: "Revise the whole thing till now!", videoUrl: null },
];

weekTwoToFourTopics.forEach(topic => {
  curriculum[topic.day] = generateDayContent(topic.day, topic.title, topic.focus, topic.videoUrl, topic.videoUrls);
});

// --- Phase 2: Weeks 5-8 (Days 29-56) — Tenses & Daily Conversations ---
const phaseTwoTopics = [
  { day: 29, title: "Present Perfect Tense", focus: "I have eaten, She has gone", videoUrl: "https://www.youtube.com/embed/XySNOXSiBMo" },
  { day: 30, title: "Present Perfect Continuous", focus: "I have been working, She has been studying", videoUrl: "https://www.youtube.com/embed/Ttr7DowBUBk" },
  { day: 31, title: "Past Perfect Tense", focus: "I had eaten before he came", videoUrl: "https://www.youtube.com/embed/3Ne14wX-3dc" },
  { day: 32, title: "All 12 Tenses — Overview Chart", focus: "Big picture of the tense system", videoUrl: "https://www.youtube.com/embed/97ZgXLQxkpU" },
  { day: 33, title: "Degrees of Comparison", focus: "tall, taller, tallest; good, better, best", videoUrl: "https://www.youtube.com/embed/4zCGUdMd3bw" },
  { day: 34, title: "Modal Verbs — can, could, may, might", focus: "Ability, possibility, permission", videoUrl: "https://www.youtube.com/embed/padtwaoqogA" },
  { day: 35, title: "Week 5 Review — Tense Practice", focus: "Read All Tenses / Review", videoUrl: null },
  { day: 36, title: "Role-Play: Ordering Food at a Restaurant", focus: "I would like... Can I have...", videoUrl: "https://www.youtube.com/embed/bgfdqVmVjfk" },
  { day: 37, title: "Role-Play: Visiting a Doctor", focus: "I have been feeling... It hurts when...", videoUrl: "https://www.youtube.com/embed/44SL8i8h0dg" },
  { day: 38, title: "Role-Play: Asking for Directions (IMP in real life)", focus: "How do I get to... Turn left at...", videoUrl: "https://www.youtube.com/embed/WXIpaNU6WlE" },
  { day: 39, title: "Role-Play: Shopping Conversations", focus: "How much does... Do you have...", videoUrl: "https://www.youtube.com/embed/yo1kVDmIHI4" },
  { day: 40, title: "Passive Voice Basics", focus: "The book was written by her", videoUrl: "https://www.youtube.com/embed/1rHi6HGYjQc" },
  { day: 41, title: "Direct vs Indirect Speech", focus: "She said, 'I am happy' → She said that she was happy" },
  { day: 42, title: "Week 6 Review — Halfway Milestone! 🎯", focus: "Review and celebrate progress" },
  { day: 43, title: "Punctuation Rules", focus: "Full stop, comma, question mark, exclamation" },
  { day: 44, title: "Common Phrasal Verbs", focus: "give up, look for, turn off, come across" },
  { day: 45, title: "Idioms Indians Should Know", focus: "Break the ice, A piece of cake" },
  { day: 46, title: "Role-Play: Job Interview Basics", focus: "Tell me about yourself..." },
  { day: 47, title: "Email Writing Basics", focus: "Dear Sir, I am writing to..." },
  { day: 48, title: "Phone Conversation Skills", focus: "May I speak to... This is... speaking" },
  { day: 49, title: "Week 7 Review — Voice Diary Check", focus: "Review voice recordings" },
  { day: 50, title: "Confusing Words — there/their/they're", focus: "Homophones and near-homophones" },
  { day: 51, title: "Confusing Words — affect/effect, your/you're", focus: "More commonly mixed words" },
  { day: 52, title: "Word Stress & Sentence Rhythm", focus: "CONTENT words are stressed" },
  { day: 53, title: "Intonation Patterns", focus: "Rising for questions, falling for statements" },
  { day: 54, title: "Active Listening Skills", focus: "Paraphrasing, asking follow-ups" },
  { day: 55, title: "Small Talk & Social Skills", focus: "Weather, weekend, sports, news" },
  { day: 56, title: "Phase 2 Final Review — Conversation Ready! 💬", focus: "Full review of weeks 5-8" },
];

phaseTwoTopics.forEach(topic => {
  curriculum[topic.day] = generateDayContent(topic.day, topic.title, topic.focus, topic.videoUrl, topic.videoUrls);
});

// --- Phase 3: Weeks 9-12 (Days 57-84) — Advanced Spoken English ---
const phaseThreeTopics = [
  { day: 57, title: "Advanced Conditionals — If Clauses", focus: "If I had known, I would have..." },
  { day: 58, title: "Wish & Regret Expressions", focus: "I wish I had... If only..." },
  { day: 59, title: "Advanced Passive Voice", focus: "It is believed that... He is said to..." },
  { day: 60, title: "Relative Clauses", focus: "who, which, that, where, whose" },
  { day: 61, title: "Reported Speech — Advanced", focus: "Complex reporting verbs" },
  { day: 62, title: "Debate: Technology — Good or Bad?", focus: "Arguing for and against" },
  { day: 63, title: "Week 9 Review — Complex Structures", focus: "Practice conditionals and clauses" },
  { day: 64, title: "2-Minute Impromptu Talk: My Favorite Place", focus: "Structure an unplanned speech" },
  { day: 65, title: "2-Minute Impromptu Talk: A Life Lesson", focus: "Tell a story with a message" },
  { day: 66, title: "Advanced Vocabulary — Academic Words", focus: "analyze, evaluate, significant" },
  { day: 67, title: "Formal vs Informal English", focus: "Register switching" },
  { day: 68, title: "Debate: Social Media Impact", focus: "Balanced arguments" },
  { day: 69, title: "Mock Job Interview — Full Practice", focus: "Strengths, weaknesses, goals" },
  { day: 70, title: "Week 10 Review — Speaking Under Pressure", focus: "Timed exercises" },
  { day: 71, title: "Essay Writing — Structure & Planning", focus: "Introduction, body, conclusion" },
  { day: 72, title: "Essay Writing — Opinion Essays", focus: "I believe that... In my opinion..." },
  { day: 73, title: "Presentation Skills", focus: "Good morning everyone, Today I will..." },
  { day: 74, title: "Advanced Pronunciation — Connected Speech", focus: "Linking, elision, assimilation" },
  { day: 75, title: "Understanding Native Speakers", focus: "Slang, contractions, speed" },
  { day: 76, title: "Polite Disagreement & Negotiation", focus: "I see your point, however..." },
  { day: 77, title: "Week 11 Review — Advanced Skills", focus: "Essay + presentation practice" },
  { day: 78, title: "Business English Basics", focus: "Let's touch base, moving forward" },
  { day: 79, title: "Storytelling Techniques", focus: "Hook, build-up, climax, resolution" },
  { day: 80, title: "Humor in English", focus: "Wordplay, puns, timing" },
  { day: 81, title: "Cultural Communication", focus: "Being direct vs indirect, politeness" },
  { day: 82, title: "Final Speech: 5-Minute Talk About Your Journey", focus: "Reflect on your 84-day progress" },
  { day: 83, title: "Self-Assessment & Next Steps", focus: "Record and analyze your growth" },
  { day: 84, title: "Graduation Day — You Made It! 🎓🎉", focus: "Celebrate and plan your future learning" },
];

phaseThreeTopics.forEach(topic => {
  curriculum[topic.day] = generateDayContent(topic.day, topic.title, topic.focus, topic.videoUrl, topic.videoUrls);
});


// Helper to generate content for days we don't manually write
function generateDayContent(day, title, focus, specificVideoUrl, specificVideoUrls) {
  const phase = getPhaseInfo(day);
  const vocabSets = getVocabForDay(day);
  const questions = getQuestionsForDay(day, title, focus);
  
  let videoUrl = null;
  if (specificVideoUrl !== undefined) {
    videoUrl = specificVideoUrl;
  } else if (!specificVideoUrls) {
    videoUrl = genericVideos[day % genericVideos.length];
  }

  const hasVideo = videoUrl || (specificVideoUrls && specificVideoUrls.length > 0);

  let keyPoints = '';
  if (hasVideo) {
    keyPoints = `
      <ul>
        <li>Watch the video lesson(s) above carefully</li>
        <li>Study the concept and practice with the vocabulary words below</li>
        <li>Complete the quiz to test your understanding</li>
        <li>Try speaking about this topic for 5 minutes</li>
      </ul>
    `;
  } else {
    keyPoints = `
      <ul>
        <li>Review today's concept thoroughly and recall previous lessons</li>
        <li>Practice with the vocabulary words below</li>
        <li>Complete the quiz to test your memory</li>
        <li>Speak aloud about this topic for 5 minutes without any aids</li>
      </ul>
    `;
  }

  return {
    title,
    videoUrl,
    videoUrls: specificVideoUrls,
    lesson: `
      <p>Today's focus: <span class="highlight">${focus}</span></p>
      <p>This is part of <strong>${phase.phase}</strong> (${phase.weeks}).</p>
      <p><strong>Key Points:</strong></p>
      ${keyPoints}
      <p>💡 <strong>Remember:</strong> Consistency is more important than perfection. Even 15 minutes of daily practice makes a huge difference!</p>
    `,
    vocabulary: vocabSets,
    questions
  };
}

// Vocabulary pools by phase
function getVocabForDay(day) {
  const vocabPools = {
    foundation: [
      { word: "Achieve", meaning: "To succeed in doing something" },
      { word: "Attempt", meaning: "To try to do something" },
      { word: "Benefit", meaning: "An advantage or good result" },
      { word: "Compare", meaning: "To look at differences and similarities" },
      { word: "Determine", meaning: "To decide or find out" },
      { word: "Essential", meaning: "Very important, necessary" },
      { word: "Frequent", meaning: "Happening often" },
      { word: "Gradually", meaning: "Slowly, step by step" },
      { word: "Identify", meaning: "To recognize or find out what something is" },
      { word: "Majority", meaning: "More than half of a group" },
    ],
    conversation: [
      { word: "Accommodate", meaning: "To provide space or adjust to needs" },
      { word: "Circumstance", meaning: "A condition or situation" },
      { word: "Demonstrate", meaning: "To show how something works" },
      { word: "Elaborate", meaning: "To explain in more detail" },
      { word: "Fluctuate", meaning: "To go up and down" },
      { word: "Hesitate", meaning: "To pause before doing something" },
      { word: "Inevitable", meaning: "Certain to happen, unavoidable" },
      { word: "Justify", meaning: "To give a good reason for something" },
      { word: "Negotiate", meaning: "To discuss to reach an agreement" },
      { word: "Perspective", meaning: "A point of view" },
    ],
    advanced: [
      { word: "Ambiguous", meaning: "Having more than one meaning, unclear" },
      { word: "Comprehensive", meaning: "Including everything, complete" },
      { word: "Controversial", meaning: "Causing disagreement or argument" },
      { word: "Elaborate", meaning: "Detailed and complex" },
      { word: "Phenomenon", meaning: "Something that happens or exists" },
      { word: "Significant", meaning: "Important, meaningful" },
      { word: "Sophisticated", meaning: "Complex and advanced" },
      { word: "Subsequent", meaning: "Coming after something" },
      { word: "Unprecedented", meaning: "Never happened before" },
      { word: "Versatile", meaning: "Able to do many different things" },
    ]
  };

  const phase = day <= 28 ? 'foundation' : day <= 56 ? 'conversation' : 'advanced';
  const pool = vocabPools[phase];
  // Rotate vocab based on day number
  const start = ((day - 1) * 3) % pool.length;
  const result = [];
  for (let i = 0; i < 10; i++) {
    result.push(pool[(start + i) % pool.length]);
  }
  return result;
}

// Generate questions based on topic
function getQuestionsForDay(day, title, focus) {
  // Generic but relevant questions based on day themes
  const q = [];

  if (title.includes("Tense") || title.includes("tense")) {
    q.push(
      { type: 'mcq', question: `Which tense is used in: "She goes to school daily"?`, options: ['Simple Present', 'Present Continuous', 'Simple Past', 'Future'], correct: 0, explanation: '"Goes" is Simple Present — used for habits and routines.' },
      { type: 'truefalse', question: 'Simple Present Tense is used for actions happening right now.', correct: false, explanation: 'Simple Present is for habits/routines. For right now, use Present Continuous (is/am/are + -ing).' },
      { type: 'fill', question: 'She ___ to school every day. (go)', correct: 'goes', explanation: 'With she/he/it in Simple Present, add -s or -es to the verb.' },
      { type: 'correct', question: 'Fix: "He go to market yesterday."', correct: 'He went to the market yesterday.', explanation: '"Yesterday" means past tense. "Go" becomes "went". Also need "the" before "market".' },
    );
  } else if (title.includes("Pronunciation") || title.includes("pronunciation")) {
    q.push(
      { type: 'truefalse', question: '"School" should be pronounced as "iskool".', correct: false, explanation: 'This is a common MTI error. The correct pronunciation starts with "sk" not "isk".' },
      { type: 'mcq', question: 'The "th" in "think" should sound like:', options: ['"t" sound', '"d" sound', 'Tongue between teeth + air', '"s" sound'], correct: 2, explanation: 'For "th", place your tongue tip between your teeth and blow air gently.' },
      { type: 'truefalse', question: 'English is a phonetic language where words are pronounced exactly as written.', correct: false, explanation: 'English is NOT phonetic! Many words have silent letters and unexpected pronunciations.' },
      { type: 'mcq', question: 'Which word has a silent letter?', options: ['cat', 'knowledge', 'dog', 'red'], correct: 1, explanation: 'The "k" in "knowledge" is silent. We say "nol-ij".' },
    );
  } else if (title.includes("Role-Play") || title.includes("role-play")) {
    q.push(
      { type: 'mcq', question: 'How do you politely order food at a restaurant?', options: ['Give me food!', 'I would like to have...', 'Food now please.', 'I want eat.'], correct: 1, explanation: '"I would like to have..." is polite and natural English for ordering.' },
      { type: 'fill', question: 'Excuse me, could you ___ me the way to the station?', correct: 'tell', explanation: '"Could you tell me" is a polite way to ask for directions.' },
      { type: 'truefalse', question: '"I am having a headache" is the correct way to say it in English.', correct: false, explanation: 'In English, we say "I have a headache" (not "having"). Also, "My head is paining" is wrong — use "I have a headache".' },
      { type: 'correct', question: 'Fix: "What is your good name?"', correct: 'What is your name?', explanation: '"Good name" is an Indian English phrase. In standard English, just say "What is your name?"' },
    );
  } else if (title.includes("Review") || title.includes("review")) {
    q.push(
      { type: 'mcq', question: 'Which sentence is grammatically correct?', options: ['She don\'t like coffee.', 'She doesn\'t likes coffee.', 'She doesn\'t like coffee.', 'She not like coffee.'], correct: 2, explanation: 'With doesn\'t/don\'t, the main verb stays in base form. "She doesn\'t like coffee."' },
      { type: 'truefalse', question: '"I am agree with you" is correct.', correct: false, explanation: '"Agree" is a main verb, not used with "am". Say "I agree with you."' },
      { type: 'fill', question: 'They ___ playing cricket when it started raining.', correct: 'were', explanation: 'Past continuous: they + were + verb-ing.' },
      { type: 'correct', question: 'Fix: "Yesterday I am going to market."', correct: 'Yesterday I went to the market.', explanation: '"Yesterday" = past tense, so use "went" (not "am going"). Add "the" before "market".' },
    );
  } else {
    // Default generic questions
    q.push(
      { type: 'mcq', question: 'Which is a complete sentence?', options: ['Running in park.', 'She runs in the park.', 'Very fast runner.', 'In the park running.'], correct: 1, explanation: 'A complete sentence needs a Subject + Verb. "She runs in the park" has both.' },
      { type: 'truefalse', question: 'In English, the verb usually comes after the subject.', correct: true, explanation: 'English follows SVO order: Subject first, then Verb, then Object.' },
      { type: 'fill', question: 'My brother ___ a software engineer. (to be)', correct: 'is', explanation: '"Brother" is third person singular, so use "is".' },
      { type: 'correct', question: 'Fix: "She very beautiful girl."', correct: 'She is a very beautiful girl.', explanation: 'Need "is" (to be verb) and "a" (article) in English!' },
    );
  }

  // Add more varied questions
  q.push(
    { type: 'mcq', question: 'What does "MTI" stand for in English learning?', options: ['Modern Teaching Institute', 'Mother Tongue Influence', 'Multiple Training Ideas', 'Main Text Introduction'], correct: 1, explanation: 'MTI = Mother Tongue Influence. It\'s when your native language habits affect your English.' },
    { type: 'truefalse', question: 'Practicing English for 15 minutes daily is more effective than 2 hours once a week.', correct: true, explanation: 'Daily practice builds habits and neural pathways. Short, consistent practice beats irregular long sessions.' },
    { type: 'fill', question: 'Practice makes ___, not perfection.', correct: 'progress', explanation: 'The saying is "Practice makes progress, not perfection" — focus on improving, not being perfect!' },
  );

  return q;
}


// Export the curriculum
export function getDayCurriculum(day) {
  return curriculum[day] || generateDayContent(day, `Day ${day} — Keep Learning!`, 'Continue your English journey');
}

export function getAllDays() {
  return Array.from({ length: 84 }, (_, i) => {
    const d = i + 1;
    const c = getDayCurriculum(d);
    return { day: d, title: c.title, ...getPhaseInfo(d) };
  });
}
