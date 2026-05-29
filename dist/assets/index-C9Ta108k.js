(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`english_quest_data`,t=`english_quest_pin`,n={currentDay:1,startDate:null,streak:{current:0,longest:0,lastActiveDate:null},xp:0,days:{},customQuestions:{},activityLog:[]};function r(){try{let t=localStorage.getItem(e);if(!t)return o();let n=JSON.parse(t);return n.activityLog||=[],n.customQuestions||={},n}catch{return o()}}function i(t){localStorage.setItem(e,JSON.stringify(t))}function a(e){let t=r();return e(t),i(t),t}function o(){let e={...n,startDate:new Date().toISOString().split(`T`)[0]};return i(e),e}function s(e,t){a(n=>{n.days[e]||(n.days[e]={completed:!1,tasks:{},quizScore:null,timestamp:null,xpEarned:0}),n.days[e].tasks[t]=!0,n.days[e].timestamp=new Date().toISOString()})}function c(e,t){a(n=>{n.days[e]&&(n.days[e].tasks[t]=!1)})}function l(e,t,n){a(r=>{r.days[e]||(r.days[e]={completed:!1,tasks:{},quizScore:null,timestamp:null,xpEarned:0}),r.days[e].quizScore={score:t,total:n,timestamp:new Date().toISOString()};let i=Math.round(t/n*50);r.days[e].xpEarned=(r.days[e].xpEarned||0)+i,r.xp+=i})}function u(e){a(t=>{t.days[e]||(t.days[e]={completed:!1,tasks:{},quizScore:null,timestamp:null,xpEarned:0}),t.days[e].completed=!0,t.days[e].timestamp=new Date().toISOString()})}function d(e){a(t=>{t.days[e]&&(t.days[e].completed=!1)})}function f(e){a(t=>{delete t.days[e]})}function p(e){a(t=>{t.xp+=e})}function m(){return r().currentDay}function ee(){a(e=>{e.currentDay<84&&e.currentDay++})}function h(e){a(t=>{t.currentDay=Math.max(1,Math.min(84,e))})}function g(){let e=new Date().toISOString().split(`T`)[0];a(t=>{if(t.streak.lastActiveDate===e)return;let n=new Date(Date.now()-864e5).toISOString().split(`T`)[0];t.streak.lastActiveDate===n?t.streak.current++:t.streak.lastActiveDate!==e&&(t.streak.current=1),t.streak.lastActiveDate=e,t.streak.current>t.streak.longest&&(t.streak.longest=t.streak.current)})}function _(){return localStorage.getItem(t)||`1234`}function te(e){localStorage.setItem(t,e)}function v(e){return r().customQuestions[e]||null}function y(e,t){a(n=>{n.customQuestions[e]=t})}function b(e,t){a(n=>{n.activityLog.unshift({type:e,message:t,timestamp:new Date().toISOString()}),n.activityLog.length>100&&(n.activityLog=n.activityLog.slice(0,100))})}function ne(){return JSON.stringify(r(),null,2)}function re(){return localStorage.removeItem(e),o()}var x=[{text:`The expert in anything was once a beginner.`,author:`Helen Hayes`},{text:`A different language is a different vision of life.`,author:`Federico Fellini`},{text:`One language sets you in a corridor for life. Two languages open every door.`,author:`Frank Smith`},{text:`You can never understand one language until you understand at least two.`,author:`Geoffrey Willans`},{text:`Learning is a treasure that will follow its owner everywhere.`,author:`Chinese Proverb`},{text:`The beautiful thing about learning is nobody can take it away from you.`,author:`B.B. King`},{text:`Every accomplishment starts with the decision to try.`,author:`John F. Kennedy`},{text:`Small daily improvements over time lead to stunning results.`,author:`Robin Sharma`},{text:`Don't let what you cannot do interfere with what you can do.`,author:`John Wooden`},{text:`It does not matter how slowly you go as long as you do not stop.`,author:`Confucius`},{text:`Mistakes are proof that you are trying.`,author:`Jennifer Lim`},{text:`Practice makes progress, not perfection.`,author:`Unknown`},{text:`Your English is better than my [insert their language]. Keep going!`,author:`Every supportive friend`},{text:`Fluency is not about perfection. It's about communication.`,author:`Language Learning Wisdom`},{text:`Speak like no one is judging. Because they're not.`,author:`Your English Coach`}],ie=[{id:`first_step`,name:`First Step`,icon:`👣`,requirement:`Complete Day 1`,check:e=>e.days[1]?.completed},{id:`week_warrior`,name:`Week Warrior`,icon:`⚔️`,requirement:`Complete 7 days`,check:e=>Object.values(e.days).filter(e=>e.completed).length>=7},{id:`streak_3`,name:`On Fire`,icon:`🔥`,requirement:`3-day streak`,check:e=>e.streak.current>=3||e.streak.longest>=3},{id:`streak_7`,name:`Unstoppable`,icon:`💪`,requirement:`7-day streak`,check:e=>e.streak.current>=7||e.streak.longest>=7},{id:`streak_14`,name:`Dedicated`,icon:`🌟`,requirement:`14-day streak`,check:e=>e.streak.current>=14||e.streak.longest>=14},{id:`streak_30`,name:`Legend`,icon:`👑`,requirement:`30-day streak`,check:e=>e.streak.current>=30||e.streak.longest>=30},{id:`quiz_master`,name:`Quiz Pro`,icon:`🧠`,requirement:`Score 100% on a quiz`,check:e=>Object.values(e.days).some(e=>e.quizScore&&e.quizScore.score===e.quizScore.total)},{id:`xp_100`,name:`Centurion`,icon:`💯`,requirement:`Earn 100 XP`,check:e=>e.xp>=100},{id:`xp_500`,name:`Scholar`,icon:`📖`,requirement:`Earn 500 XP`,check:e=>e.xp>=500},{id:`halfway`,name:`Halfway Hero`,icon:`🏔️`,requirement:`Reach Day 42`,check:e=>e.currentDay>=42},{id:`phase2`,name:`Conversationalist`,icon:`💬`,requirement:`Start Phase 2 (Day 29)`,check:e=>e.currentDay>=29},{id:`graduate`,name:`Graduate`,icon:`🎓`,requirement:`Complete Day 84`,check:e=>e.days[84]?.completed}],ae={perfect:[`You absolutely crushed it! 🔥`,`PERFECT SCORE! You're amazing! ✨`,`100%! Genius level unlocked! 🧠💎`],great:[`So close to perfect! Amazing work! 🌟`,`You're really getting this! Keep it up! 💪`,`Great job! Your English is improving fast! 🚀`],good:[`Nice effort! You're learning! 📈`,`Good work! Review the mistakes and try again! 💪`,`Keep going, you're making progress! 🌱`],okay:[`Don't worry! Every mistake is a lesson! 📚`,`Practice makes progress! Try reviewing the lesson first 💪`,`You got this! Try again after reviewing! 🔄`],low:[`Hey, it's okay! Let's review the lesson together 📖`,`Learning takes time, don't give up! 🌈`,`Read the lesson again and you'll do better! 💕`]};function S(e){return e<=28?{phase:`Foundation`,weeks:`Week 1-4`,color:`phase-foundation`,icon:`🌱`}:e<=56?{phase:`Conversations`,weeks:`Week 5-8`,color:`phase-conversation`,icon:`💬`}:{phase:`Advanced`,weeks:`Week 9-12`,color:`phase-advanced`,icon:`🚀`}}function C(e){return e<50?{level:1,name:`Beginner`,icon:`🌱`,next:50}:e<150?{level:2,name:`Starter`,icon:`🌿`,next:150}:e<300?{level:3,name:`Learner`,icon:`📗`,next:300}:e<500?{level:4,name:`Speaker`,icon:`💬`,next:500}:e<800?{level:5,name:`Confident`,icon:`💪`,next:800}:e<1200?{level:6,name:`Fluent`,icon:`⭐`,next:1200}:e<2e3?{level:7,name:`Pro`,icon:`🌟`,next:2e3}:{level:8,name:`Master`,icon:`👑`,next:null}}function w(e){let t=T[e],n=t&&(t.videoUrl||t.videoUrls&&t.videoUrls.length>0),r=[];return n&&r.push({id:`watch`,label:`📺 Watch the video lesson`,sublabel:`Learn from the teacher`,xp:10}),r.push({id:`read`,label:`📖 Read today's notes`,sublabel:`Review the key points`,xp:10},{id:`vocab`,label:`💬 Practice vocabulary`,sublabel:`Learn today's new words`,xp:10},{id:`quiz`,label:`🧠 Complete the quiz`,sublabel:`Test your knowledge`,xp:15}),e<=28?r.push({id:`practice`,label:`🎤 Speak for 5 minutes`,sublabel:`Practice self-introduction`,xp:15}):e<=56?r.push({id:`practice`,label:`🎤 Role-play practice`,sublabel:`Practice a conversation`,xp:15}):r.push({id:`practice`,label:`🎤 Impromptu speaking`,sublabel:`2-min talk on a random topic`,xp:15}),r}var T={};T[1]={title:`What is a Sentence? Subject & Verb`,videoUrls:[`https://www.youtube.com/embed/G8ao2JdpDMM`,`https://www.youtube.com/embed/l9pRXG72wCY`],lesson:`
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
  `,vocabulary:[{word:`Sentence`,meaning:`A group of words that expresses a complete thought`},{word:`Subject`,meaning:`The person or thing doing the action`},{word:`Verb`,meaning:`An action word (run, eat, speak)`},{word:`Object`,meaning:`The thing receiving the action`},{word:`Grammar`,meaning:`The rules of a language`},{word:`Noun`,meaning:`A naming word (person, place, thing)`},{word:`Pronoun`,meaning:`A word used instead of a noun (he, she, it)`},{word:`Confident`,meaning:`Sure of yourself, not afraid`},{word:`Fluent`,meaning:`Able to speak smoothly and easily`},{word:`Practice`,meaning:`To do something again and again to improve`}],questions:[{type:`mcq`,question:`What are the two essential parts of every English sentence?`,options:[`Noun and Adjective`,`Subject and Verb`,`Article and Preposition`,`Pronoun and Adverb`],correct:1,explanation:`Every sentence needs a Subject (who/what does) and a Verb (the action).`},{type:`mcq`,question:`In the sentence "She reads books", what is the verb?`,options:[`She`,`reads`,`books`,`the`],correct:1,explanation:`"Reads" is the action word — it tells us what "She" does.`},{type:`truefalse`,question:`In English, the standard sentence order is Subject + Object + Verb (SOV).`,correct:!1,explanation:`English uses SVO (Subject + Verb + Object), not SOV. Hindi uses SOV which is why many learners make this mistake!`},{type:`truefalse`,question:`"I eat rice" follows the SVO pattern.`,correct:!0,explanation:`I (Subject) + eat (Verb) + rice (Object) = perfect SVO!`},{type:`fill`,question:`___ plays cricket every day.`,correct:`He`,explanation:`We need a subject (pronoun) to start the sentence. "He" fits perfectly.`},{type:`mcq`,question:`Which of these is a complete sentence?`,options:[`Running fast`,`She runs fast`,`Very beautiful`,`In the morning`],correct:1,explanation:`"She runs fast" has both a subject (She) and a verb (runs). The others are fragments.`},{type:`correct`,question:`Fix this sentence: "Rice I eat daily."`,correct:`I eat rice daily.`,explanation:`In English, we use SVO order: Subject (I) + Verb (eat) + Object (rice) + time (daily).`}]},T[2]={title:`Nouns — Naming Words`,videoUrl:`https://www.youtube.com/embed/AGIG-g_aOqY`,lesson:`
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
  `,vocabulary:[{word:`Common`,meaning:`Ordinary, shared by many`},{word:`Proper`,meaning:`Specific, belonging to one`},{word:`Countable`,meaning:`Can be counted (one, two, three...)`},{word:`Uncountable`,meaning:`Cannot be counted directly`},{word:`Abstract`,meaning:`Something you cannot touch (love, happiness)`},{word:`Concrete`,meaning:`Something you can touch (table, pen)`},{word:`Education`,meaning:`The process of learning and teaching`},{word:`Freedom`,meaning:`The state of being free`},{word:`Knowledge`,meaning:`Information and understanding`},{word:`Experience`,meaning:`Something that happens to you or that you do`}],questions:[{type:`mcq`,question:`Which of these is a proper noun?`,options:[`city`,`Delhi`,`boy`,`school`],correct:1,explanation:`Delhi is a specific place name, so it's a proper noun. Always capitalize proper nouns!`},{type:`mcq`,question:`"Water" is an example of a(n) ___ noun.`,options:[`Proper`,`Countable`,`Uncountable`,`Pronoun`],correct:2,explanation:`Water cannot be counted directly (you can't say "one water, two waters"). It's uncountable.`},{type:`truefalse`,question:`Proper nouns should always start with a capital letter.`,correct:!0,explanation:`Yes! Names of specific people, places, and things always start with a capital letter.`},{type:`truefalse`,question:`"Happiness" is a concrete noun because you can feel it.`,correct:!1,explanation:`Happiness is abstract — you cannot physically touch it. Concrete nouns are things you can touch.`},{type:`fill`,question:`My ___ is very strict but kind.`,correct:`teacher`,explanation:`Teacher is a common noun for a person.`},{type:`correct`,question:`Fix: "I need many informations about this."`,correct:`I need much information about this.`,explanation:`"Information" is uncountable. Use "much" instead of "many" with uncountable nouns.`},{type:`mcq`,question:`Which word is an abstract noun?`,options:[`Chair`,`Courage`,`Apple`,`River`],correct:1,explanation:`Courage is something you cannot see or touch — it exists as an idea. That makes it abstract.`}]},T[3]={title:`Pronouns — Words that Replace Nouns`,videoUrl:`https://www.youtube.com/embed/TOsNcqImhzI`,lesson:`
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
  `,vocabulary:[{word:`Replace`,meaning:`To take the place of something`},{word:`Possessive`,meaning:`Showing ownership (my, your, his)`},{word:`Singular`,meaning:`One person or thing`},{word:`Plural`,meaning:`More than one`},{word:`Ourselves`,meaning:`Reflexive pronoun for 'we'`},{word:`Herself`,meaning:`Reflexive pronoun for 'she'`},{word:`Someone`,meaning:`An unknown person`},{word:`Everyone`,meaning:`All people`},{word:`Nobody`,meaning:`No person`},{word:`Communicate`,meaning:`To share information with others`}],questions:[{type:`mcq`,question:`Which pronoun replaces "Priya" in a sentence?`,options:[`He`,`She`,`They`,`It`],correct:1,explanation:`Priya is a female name, so we use "She".`},{type:`fill`,question:`Rahul lost ___ phone at school.`,correct:`his`,explanation:`Rahul is male, so we use the possessive pronoun "his".`},{type:`truefalse`,question:`"Me went to the market" is grammatically correct.`,correct:!1,explanation:`"Me" is an object pronoun. The correct subject pronoun is "I". Say "I went to the market."`},{type:`correct`,question:`Fix: "Her is my best friend."`,correct:`She is my best friend.`,explanation:`"Her" is an object/possessive pronoun. Use the subject pronoun "She" when it's the doer of the action.`},{type:`mcq`,question:`Choose the correct sentence:`,options:[`Me and Ravi went to school.`,`Ravi and I went to school.`,`I and Ravi went to school.`,`Ravi and me went to school.`],correct:1,explanation:`The polite and grammatically correct form puts the other person first: "Ravi and I".`},{type:`truefalse`,question:`"They" can only refer to multiple people.`,correct:!1,explanation:`"They" can also be used as a gender-neutral singular pronoun (e.g., "Someone left their bag").`},{type:`fill`,question:`The cat licked ___ paw after eating.`,correct:`its`,explanation:`For animals/things, we use "its" (no apostrophe!) as the possessive pronoun.`}]},T[4]={title:`Verbs — Action & Being Words`,videoUrl:`https://www.youtube.com/embed/CvZm15LrL1A`,lesson:`
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
  `,vocabulary:[{word:`Action`,meaning:`Something you do`},{word:`Achieve`,meaning:`To successfully reach a goal`},{word:`Create`,meaning:`To make something new`},{word:`Develop`,meaning:`To grow or improve over time`},{word:`Establish`,meaning:`To set up or start something`},{word:`Improve`,meaning:`To make better`},{word:`Organize`,meaning:`To arrange things in order`},{word:`Recognize`,meaning:`To identify or acknowledge`},{word:`Suggest`,meaning:`To put forward an idea`},{word:`Transform`,meaning:`To change completely`}],questions:[{type:`mcq`,question:`Which is a "to be" verb?`,options:[`run`,`is`,`eat`,`play`],correct:1,explanation:`"Is" is a form of "to be" (am, is, are, was, were).`},{type:`fill`,question:`She ___ a doctor. (use correct "to be" verb)`,correct:`is`,explanation:`With "She" (third person singular), we use "is".`},{type:`correct`,question:`Fix: "They very intelligent students."`,correct:`They are very intelligent students.`,explanation:`In English, you cannot drop "are". Hindi skips it, but English needs it!`},{type:`truefalse`,question:`"I am eat food" is correct English.`,correct:!1,explanation:`"Am" and "eat" clash here. Either "I am eating food" (continuous) or "I eat food" (simple).`},{type:`mcq`,question:`Which sentence is correct?`,options:[`She happy today.`,`She is happy today.`,`She be happy today.`,`She are happy today.`],correct:1,explanation:`"She" takes "is" as the helping verb. "She is happy today."`},{type:`fill`,question:`I ___ a student of English.`,correct:`am`,explanation:`With "I", always use "am".`},{type:`truefalse`,question:`"Helping verbs" help the main verb in a sentence.`,correct:!0,explanation:`Yes! Helping verbs (do, does, did, can, will, etc.) support the main verb to form questions, negatives, and tenses.`}]},T[5]={title:`Articles — A, An, The`,videoUrl:`https://www.youtube.com/embed/2hlnMQKPdE8`,lesson:`
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
  `,vocabulary:[{word:`Article`,meaning:`A/An/The — words used before nouns`},{word:`Definite`,meaning:`Specific, known, certain`},{word:`Indefinite`,meaning:`Not specific, general`},{word:`Consonant`,meaning:`Letters that are not vowels (B, C, D, etc.)`},{word:`Vowel`,meaning:`The letters A, E, I, O, U`},{word:`Specific`,meaning:`Clearly defined, particular`},{word:`General`,meaning:`Not limited to one thing`},{word:`University`,meaning:`A place for higher education`},{word:`Honest`,meaning:`Truthful, not lying`},{word:`European`,meaning:`From Europe`}],questions:[{type:`mcq`,question:`Which is correct: "__ hour"?`,options:[`a hour`,`an hour`,`the hour`,`no article`],correct:1,explanation:`"Hour" starts with a vowel SOUND (/aʊ/), so we use "an".`},{type:`mcq`,question:`Which is correct: "__ university"?`,options:[`an university`,`a university`,`the university`,`university`],correct:1,explanation:`"University" starts with a /juː/ sound (consonant sound), so we use "a".`},{type:`truefalse`,question:`We always use "an" before words starting with a vowel letter.`,correct:!1,explanation:`Not always! It depends on the SOUND. "A university" is correct because it starts with a consonant sound /juː/.`},{type:`fill`,question:`She is ___ honest person.`,correct:`an`,explanation:`"Honest" starts with a vowel sound (/ɒ/), the "h" is silent. So we use "an".`},{type:`correct`,question:`Fix: "I want to be engineer."`,correct:`I want to be an engineer.`,explanation:`We need the article "an" before "engineer" (vowel sound). In Hindi we skip articles, but English needs them!`},{type:`mcq`,question:`"I saw ___ beautiful sunset yesterday."`,options:[`a`,`an`,`the`,`no article`],correct:0,explanation:`"A" is used because we're talking about any beautiful sunset, not a specific one. "Beautiful" starts with a consonant sound.`},{type:`truefalse`,question:`"The" is called the definite article.`,correct:!0,explanation:`Yes! "The" refers to a specific noun that both speaker and listener know about.`}]},T[6]={title:`Singular & Plural + Common Mistakes`,videoUrl:`https://www.youtube.com/embed/s11mjre1K3Y`,lesson:`
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
  `,vocabulary:[{word:`Singular`,meaning:`One (a book, one child)`},{word:`Plural`,meaning:`More than one (books, children)`},{word:`Regular`,meaning:`Following the normal pattern`},{word:`Irregular`,meaning:`Not following the normal pattern`},{word:`Exception`,meaning:`Something that doesn't follow the rule`},{word:`Memorize`,meaning:`To learn and remember exactly`},{word:`Pattern`,meaning:`A repeated design or order`},{word:`Rhythm`,meaning:`A regular beat or pattern in speaking`},{word:`Syllable`,meaning:`A unit of sound in a word`},{word:`Accent`,meaning:`The way you pronounce words`}],questions:[{type:`mcq`,question:`What is the plural of "child"?`,options:[`childs`,`childrens`,`children`,`child`],correct:2,explanation:`"Child" has an irregular plural: "children". Not "childs"!`},{type:`fill`,question:`I saw three ___ in the garden. (mouse)`,correct:`mice`,explanation:`Mouse → mice is an irregular plural. You must memorize it!`},{type:`truefalse`,question:`The plural of "fish" is "fishes".`,correct:!1,explanation:`"Fish" is usually the same in plural: "one fish, two fish". "Fishes" is only used when talking about different species.`},{type:`correct`,question:`Fix: "Many peoples came to the party."`,correct:`Many people came to the party.`,explanation:`"People" is already plural (of "person"). Don't add -s to it!`},{type:`mcq`,question:`What is the plural of "watch"?`,options:[`watchs`,`watches`,`watch`,`watchies`],correct:1,explanation:`Words ending in -ch add "-es": watch → watches.`},{type:`truefalse`,question:`"Deer" changes to "deers" in plural.`,correct:!1,explanation:`"Deer" stays the same: "one deer, many deer". It's an unchanged plural.`},{type:`mcq`,question:`Which plural is WRONG?`,options:[`knives`,`cities`,`babys`,`boxes`],correct:2,explanation:`"Baby" ends in consonant + y, so it becomes "babies", not "babys".`}]},T[7]={title:`Week 1 Review — Build Your First Paragraph!`,lesson:`
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
  `,vocabulary:[{word:`Paragraph`,meaning:`A group of sentences about one topic`},{word:`Review`,meaning:`To look at something again`},{word:`Challenge`,meaning:`A difficult but exciting task`},{word:`Introduce`,meaning:`To present yourself or someone`},{word:`Describe`,meaning:`To tell about something using words`},{word:`Express`,meaning:`To show your thoughts or feelings`},{word:`Conversation`,meaning:`A talk between two or more people`},{word:`Pronounce`,meaning:`To say a word in a specific way`},{word:`Record`,meaning:`To capture audio or video`},{word:`Progress`,meaning:`Moving forward, getting better`}],questions:[{type:`mcq`,question:`Which sentence has correct SVO order?`,options:[`Very happy I am.`,`I am very happy.`,`Happy am I very.`,`Am I very happy.`],correct:1,explanation:`"I (S) am (V) very happy" follows the correct English word order.`},{type:`correct`,question:`Fix: "My name Priya. I student."`,correct:`My name is Priya. I am a student.`,explanation:`Don't forget "is" and "am"! Also need the article "a" before "student".`},{type:`truefalse`,question:`"I have two brother" is correct.`,correct:!1,explanation:`"Two" means plural, so it should be "two brothers" with the -s.`},{type:`fill`,question:`She ___ from Mumbai. (to be verb)`,correct:`is`,explanation:`She + is. Always use "is" with he/she/it.`},{type:`mcq`,question:`Which sentence has a mistake?`,options:[`They are my friends.`,`I am an engineer.`,`She have two cats.`,`We are happy.`],correct:2,explanation:`"She" takes "has", not "have". "She has two cats."`},{type:`correct`,question:`Fix: "He go to school everyday."`,correct:`He goes to school every day.`,explanation:`With he/she/it, add -s/-es to the verb: "goes". Also "every day" is two words.`},{type:`truefalse`,question:`A paragraph is a group of related sentences about one topic.`,correct:!0,explanation:`Exactly! A paragraph focuses on one main idea, expressed through multiple sentences.`}]};var E=[`https://www.youtube.com/embed/M1aA_A9x90M`,`https://www.youtube.com/embed/Xb9x5jK0_yQ`,`https://www.youtube.com/embed/0WjQ-g9lW8s`,`https://www.youtube.com/embed/b2zYj1B8_uU`,`https://www.youtube.com/embed/uU_Hl1V7a0A`];[{day:8,title:`Adjectives — Describing Words`,focus:`big, small, beautiful, ugly, happy, sad`,videoUrl:`https://www.youtube.com/embed/tNzSrEkx6bM`},{day:9,title:`Adverbs — How, When, Where`,focus:`quickly, slowly, always, never, here, there`,videoUrl:`https://www.youtube.com/embed/dPpzLT48yKM`},{day:10,title:`Prepositions — in, on, at, to, from`,focus:`Position and direction words`,videoUrl:`https://www.youtube.com/embed/IGODTYMQaf0`},{day:11,title:`Conjunctions — and, but, or, because`,focus:`Joining words and sentences`,videoUrls:[`https://www.youtube.com/embed/XzVFbfdymas`,`https://www.youtube.com/embed/FO8ZvqTB68Y`]},{day:12,title:`Simple Present Tense`,focus:`I eat, She eats, We play`,videoUrls:[`https://www.youtube.com/embed/NA6E-NULuo8`,`https://www.youtube.com/embed/6CrZp1cwK6g`]},{day:13,title:`Present Continuous Tense`,focus:`I am eating, She is playing`,videoUrl:`https://www.youtube.com/embed/rFdhrR6Dpco`},{day:14,title:`Week 2 Review — Describe Your Daily Routine`,focus:`Practice using all parts of speech`,videoUrl:null},{day:15,title:`Simple Past Tense`,focus:`I ate, She played, They went`,videoUrl:`https://www.youtube.com/embed/92foCQ5bT2w`},{day:16,title:`Past Continuous Tense`,focus:`I was eating, They were playing`,videoUrl:`https://www.youtube.com/embed/x-IbabnLzng`},{day:17,title:`Simple Future — will & going to`,focus:`I will eat, She is going to play`,videoUrl:`https://www.youtube.com/embed/Zyg-n28rhqc`},{day:18,title:`Pronunciation — Vowel Sounds`,focus:`/ɪ/ vs /iː/, /æ/ vs /ʌ/`,videoUrls:[`https://www.youtube.com/embed/RakVcW1Ib04`,`https://www.youtube.com/embed/qniH34JylVQ`]},{day:19,title:`Pronunciation — Consonant Sounds`,focus:`th, v/w, silent letters`,videoUrl:`https://www.youtube.com/embed/WJnrveWw6uA?start=169`},{day:20,title:`Common Indian Pronunciation Mistakes`,focus:`school≠iskool, think≠tink`,videoUrl:`https://www.youtube.com/embed/zLI3Lg6Hz8g`},{day:21,title:`Week 3 Review — Record & Compare`,focus:`Record yourself reading and compare`,videoUrl:null},{day:22,title:`Question Formation — Yes/No Questions`,focus:`Do you, Does she, Is he`,videoUrl:`https://www.youtube.com/embed/YIkewDhlSwQ`},{day:23,title:`Question Formation — WH Questions`,focus:`What, Where, When, Why, How`,videoUrl:`https://www.youtube.com/embed/mDBR4UWmwKQ`},{day:24,title:`Negative Sentences`,focus:`don't, doesn't, isn't, aren't, won't`,videoUrl:`https://www.youtube.com/embed/olA4Ebvdf7w`},{day:25,title:`Self-Introduction Practice`,focus:`Name, place, hobbies, family, dreams`,videoUrl:`https://www.youtube.com/embed/4fOLmHuoFyg`},{day:26,title:`Describing a Photo Out Loud`,focus:`I can see... There is... It looks like...`,videoUrl:`https://www.youtube.com/embed/EW0R1KfZf4A`},{day:27,title:`Common Greeting & Farewell Phrases`,focus:`How are you? Nice to meet you!`,videoUrl:`https://www.youtube.com/embed/6lqNcWpb-48`},{day:28,title:`Phase 1 Final Review — Foundation Complete! 🎉`,focus:`Revise the whole thing till now!`,videoUrl:null}].forEach(e=>{T[e.day]=D(e.day,e.title,e.focus,e.videoUrl,e.videoUrls)}),[{day:29,title:`Present Perfect Tense`,focus:`I have eaten, She has gone`,videoUrl:`https://www.youtube.com/embed/XySNOXSiBMo`},{day:30,title:`Present Perfect Continuous`,focus:`I have been working, She has been studying`,videoUrl:`https://www.youtube.com/embed/Ttr7DowBUBk`},{day:31,title:`Past Perfect Tense`,focus:`I had eaten before he came`,videoUrl:`https://www.youtube.com/embed/3Ne14wX-3dc`},{day:32,title:`All 12 Tenses — Overview Chart`,focus:`Big picture of the tense system`,videoUrl:`https://www.youtube.com/embed/97ZgXLQxkpU`},{day:33,title:`Degrees of Comparison`,focus:`tall, taller, tallest; good, better, best`,videoUrl:`https://www.youtube.com/embed/4zCGUdMd3bw`},{day:34,title:`Modal Verbs — can, could, may, might`,focus:`Ability, possibility, permission`,videoUrl:`https://www.youtube.com/embed/padtwaoqogA`},{day:35,title:`Week 5 Review — Tense Practice`,focus:`Read All Tenses / Review`,videoUrl:null},{day:36,title:`Role-Play: Ordering Food at a Restaurant`,focus:`I would like... Can I have...`,videoUrl:`https://www.youtube.com/embed/bgfdqVmVjfk`},{day:37,title:`Role-Play: Visiting a Doctor`,focus:`I have been feeling... It hurts when...`,videoUrl:`https://www.youtube.com/embed/44SL8i8h0dg`},{day:38,title:`Role-Play: Asking for Directions (IMP in real life)`,focus:`How do I get to... Turn left at...`,videoUrl:`https://www.youtube.com/embed/WXIpaNU6WlE`},{day:39,title:`Role-Play: Shopping Conversations`,focus:`How much does... Do you have...`,videoUrl:`https://www.youtube.com/embed/yo1kVDmIHI4`},{day:40,title:`Passive Voice Basics`,focus:`The book was written by her`,videoUrl:`https://www.youtube.com/embed/1rHi6HGYjQc`},{day:41,title:`Direct vs Indirect Speech`,focus:`She said, 'I am happy' → She said that she was happy`},{day:42,title:`Week 6 Review — Halfway Milestone! 🎯`,focus:`Review and celebrate progress`},{day:43,title:`Punctuation Rules`,focus:`Full stop, comma, question mark, exclamation`},{day:44,title:`Common Phrasal Verbs`,focus:`give up, look for, turn off, come across`},{day:45,title:`Idioms Indians Should Know`,focus:`Break the ice, A piece of cake`},{day:46,title:`Role-Play: Job Interview Basics`,focus:`Tell me about yourself...`},{day:47,title:`Email Writing Basics`,focus:`Dear Sir, I am writing to...`},{day:48,title:`Phone Conversation Skills`,focus:`May I speak to... This is... speaking`},{day:49,title:`Week 7 Review — Voice Diary Check`,focus:`Review voice recordings`},{day:50,title:`Confusing Words — there/their/they're`,focus:`Homophones and near-homophones`},{day:51,title:`Confusing Words — affect/effect, your/you're`,focus:`More commonly mixed words`},{day:52,title:`Word Stress & Sentence Rhythm`,focus:`CONTENT words are stressed`},{day:53,title:`Intonation Patterns`,focus:`Rising for questions, falling for statements`},{day:54,title:`Active Listening Skills`,focus:`Paraphrasing, asking follow-ups`},{day:55,title:`Small Talk & Social Skills`,focus:`Weather, weekend, sports, news`},{day:56,title:`Phase 2 Final Review — Conversation Ready! 💬`,focus:`Full review of weeks 5-8`}].forEach(e=>{T[e.day]=D(e.day,e.title,e.focus,e.videoUrl,e.videoUrls)}),[{day:57,title:`Advanced Conditionals — If Clauses`,focus:`If I had known, I would have...`},{day:58,title:`Wish & Regret Expressions`,focus:`I wish I had... If only...`},{day:59,title:`Advanced Passive Voice`,focus:`It is believed that... He is said to...`},{day:60,title:`Relative Clauses`,focus:`who, which, that, where, whose`},{day:61,title:`Reported Speech — Advanced`,focus:`Complex reporting verbs`},{day:62,title:`Debate: Technology — Good or Bad?`,focus:`Arguing for and against`},{day:63,title:`Week 9 Review — Complex Structures`,focus:`Practice conditionals and clauses`},{day:64,title:`2-Minute Impromptu Talk: My Favorite Place`,focus:`Structure an unplanned speech`},{day:65,title:`2-Minute Impromptu Talk: A Life Lesson`,focus:`Tell a story with a message`},{day:66,title:`Advanced Vocabulary — Academic Words`,focus:`analyze, evaluate, significant`},{day:67,title:`Formal vs Informal English`,focus:`Register switching`},{day:68,title:`Debate: Social Media Impact`,focus:`Balanced arguments`},{day:69,title:`Mock Job Interview — Full Practice`,focus:`Strengths, weaknesses, goals`},{day:70,title:`Week 10 Review — Speaking Under Pressure`,focus:`Timed exercises`},{day:71,title:`Essay Writing — Structure & Planning`,focus:`Introduction, body, conclusion`},{day:72,title:`Essay Writing — Opinion Essays`,focus:`I believe that... In my opinion...`},{day:73,title:`Presentation Skills`,focus:`Good morning everyone, Today I will...`},{day:74,title:`Advanced Pronunciation — Connected Speech`,focus:`Linking, elision, assimilation`},{day:75,title:`Understanding Native Speakers`,focus:`Slang, contractions, speed`},{day:76,title:`Polite Disagreement & Negotiation`,focus:`I see your point, however...`},{day:77,title:`Week 11 Review — Advanced Skills`,focus:`Essay + presentation practice`},{day:78,title:`Business English Basics`,focus:`Let's touch base, moving forward`},{day:79,title:`Storytelling Techniques`,focus:`Hook, build-up, climax, resolution`},{day:80,title:`Humor in English`,focus:`Wordplay, puns, timing`},{day:81,title:`Cultural Communication`,focus:`Being direct vs indirect, politeness`},{day:82,title:`Final Speech: 5-Minute Talk About Your Journey`,focus:`Reflect on your 84-day progress`},{day:83,title:`Self-Assessment & Next Steps`,focus:`Record and analyze your growth`},{day:84,title:`Graduation Day — You Made It! 🎓🎉`,focus:`Celebrate and plan your future learning`}].forEach(e=>{T[e.day]=D(e.day,e.title,e.focus,e.videoUrl,e.videoUrls)});function D(e,t,n,r,i){let a=S(e),o=oe(e),s=se(e,t,n),c=null;r===void 0?i||(c=E[e%E.length]):c=r;let l=c||i&&i.length>0,u=``;return u=l?`
      <ul>
        <li>Watch the video lesson(s) above carefully</li>
        <li>Study the concept and practice with the vocabulary words below</li>
        <li>Complete the quiz to test your understanding</li>
        <li>Try speaking about this topic for 5 minutes</li>
      </ul>
    `:`
      <ul>
        <li>Review today's concept thoroughly and recall previous lessons</li>
        <li>Practice with the vocabulary words below</li>
        <li>Complete the quiz to test your memory</li>
        <li>Speak aloud about this topic for 5 minutes without any aids</li>
      </ul>
    `,{title:t,videoUrl:c,videoUrls:i,lesson:`
      <p>Today's focus: <span class="highlight">${n}</span></p>
      <p>This is part of <strong>${a.phase}</strong> (${a.weeks}).</p>
      <p><strong>Key Points:</strong></p>
      ${u}
      <p>💡 <strong>Remember:</strong> Consistency is more important than perfection. Even 15 minutes of daily practice makes a huge difference!</p>
    `,vocabulary:o,questions:s}}function oe(e){let t={foundation:[{word:`Achieve`,meaning:`To succeed in doing something`},{word:`Attempt`,meaning:`To try to do something`},{word:`Benefit`,meaning:`An advantage or good result`},{word:`Compare`,meaning:`To look at differences and similarities`},{word:`Determine`,meaning:`To decide or find out`},{word:`Essential`,meaning:`Very important, necessary`},{word:`Frequent`,meaning:`Happening often`},{word:`Gradually`,meaning:`Slowly, step by step`},{word:`Identify`,meaning:`To recognize or find out what something is`},{word:`Majority`,meaning:`More than half of a group`}],conversation:[{word:`Accommodate`,meaning:`To provide space or adjust to needs`},{word:`Circumstance`,meaning:`A condition or situation`},{word:`Demonstrate`,meaning:`To show how something works`},{word:`Elaborate`,meaning:`To explain in more detail`},{word:`Fluctuate`,meaning:`To go up and down`},{word:`Hesitate`,meaning:`To pause before doing something`},{word:`Inevitable`,meaning:`Certain to happen, unavoidable`},{word:`Justify`,meaning:`To give a good reason for something`},{word:`Negotiate`,meaning:`To discuss to reach an agreement`},{word:`Perspective`,meaning:`A point of view`}],advanced:[{word:`Ambiguous`,meaning:`Having more than one meaning, unclear`},{word:`Comprehensive`,meaning:`Including everything, complete`},{word:`Controversial`,meaning:`Causing disagreement or argument`},{word:`Elaborate`,meaning:`Detailed and complex`},{word:`Phenomenon`,meaning:`Something that happens or exists`},{word:`Significant`,meaning:`Important, meaningful`},{word:`Sophisticated`,meaning:`Complex and advanced`},{word:`Subsequent`,meaning:`Coming after something`},{word:`Unprecedented`,meaning:`Never happened before`},{word:`Versatile`,meaning:`Able to do many different things`}]}[e<=28?`foundation`:e<=56?`conversation`:`advanced`],n=(e-1)*3%t.length,r=[];for(let e=0;e<10;e++)r.push(t[(n+e)%t.length]);return r}function se(e,t,n){let r=[];return t.includes(`Tense`)||t.includes(`tense`)?r.push({type:`mcq`,question:`Which tense is used in: "She goes to school daily"?`,options:[`Simple Present`,`Present Continuous`,`Simple Past`,`Future`],correct:0,explanation:`"Goes" is Simple Present — used for habits and routines.`},{type:`truefalse`,question:`Simple Present Tense is used for actions happening right now.`,correct:!1,explanation:`Simple Present is for habits/routines. For right now, use Present Continuous (is/am/are + -ing).`},{type:`fill`,question:`She ___ to school every day. (go)`,correct:`goes`,explanation:`With she/he/it in Simple Present, add -s or -es to the verb.`},{type:`correct`,question:`Fix: "He go to market yesterday."`,correct:`He went to the market yesterday.`,explanation:`"Yesterday" means past tense. "Go" becomes "went". Also need "the" before "market".`}):t.includes(`Pronunciation`)||t.includes(`pronunciation`)?r.push({type:`truefalse`,question:`"School" should be pronounced as "iskool".`,correct:!1,explanation:`This is a common MTI error. The correct pronunciation starts with "sk" not "isk".`},{type:`mcq`,question:`The "th" in "think" should sound like:`,options:[`"t" sound`,`"d" sound`,`Tongue between teeth + air`,`"s" sound`],correct:2,explanation:`For "th", place your tongue tip between your teeth and blow air gently.`},{type:`truefalse`,question:`English is a phonetic language where words are pronounced exactly as written.`,correct:!1,explanation:`English is NOT phonetic! Many words have silent letters and unexpected pronunciations.`},{type:`mcq`,question:`Which word has a silent letter?`,options:[`cat`,`knowledge`,`dog`,`red`],correct:1,explanation:`The "k" in "knowledge" is silent. We say "nol-ij".`}):t.includes(`Role-Play`)||t.includes(`role-play`)?r.push({type:`mcq`,question:`How do you politely order food at a restaurant?`,options:[`Give me food!`,`I would like to have...`,`Food now please.`,`I want eat.`],correct:1,explanation:`"I would like to have..." is polite and natural English for ordering.`},{type:`fill`,question:`Excuse me, could you ___ me the way to the station?`,correct:`tell`,explanation:`"Could you tell me" is a polite way to ask for directions.`},{type:`truefalse`,question:`"I am having a headache" is the correct way to say it in English.`,correct:!1,explanation:`In English, we say "I have a headache" (not "having"). Also, "My head is paining" is wrong — use "I have a headache".`},{type:`correct`,question:`Fix: "What is your good name?"`,correct:`What is your name?`,explanation:`"Good name" is an Indian English phrase. In standard English, just say "What is your name?"`}):t.includes(`Review`)||t.includes(`review`)?r.push({type:`mcq`,question:`Which sentence is grammatically correct?`,options:[`She don't like coffee.`,`She doesn't likes coffee.`,`She doesn't like coffee.`,`She not like coffee.`],correct:2,explanation:`With doesn't/don't, the main verb stays in base form. "She doesn't like coffee."`},{type:`truefalse`,question:`"I am agree with you" is correct.`,correct:!1,explanation:`"Agree" is a main verb, not used with "am". Say "I agree with you."`},{type:`fill`,question:`They ___ playing cricket when it started raining.`,correct:`were`,explanation:`Past continuous: they + were + verb-ing.`},{type:`correct`,question:`Fix: "Yesterday I am going to market."`,correct:`Yesterday I went to the market.`,explanation:`"Yesterday" = past tense, so use "went" (not "am going"). Add "the" before "market".`}):r.push({type:`mcq`,question:`Which is a complete sentence?`,options:[`Running in park.`,`She runs in the park.`,`Very fast runner.`,`In the park running.`],correct:1,explanation:`A complete sentence needs a Subject + Verb. "She runs in the park" has both.`},{type:`truefalse`,question:`In English, the verb usually comes after the subject.`,correct:!0,explanation:`English follows SVO order: Subject first, then Verb, then Object.`},{type:`fill`,question:`My brother ___ a software engineer. (to be)`,correct:`is`,explanation:`"Brother" is third person singular, so use "is".`},{type:`correct`,question:`Fix: "She very beautiful girl."`,correct:`She is a very beautiful girl.`,explanation:`Need "is" (to be verb) and "a" (article) in English!`}),r.push({type:`mcq`,question:`What does "MTI" stand for in English learning?`,options:[`Modern Teaching Institute`,`Mother Tongue Influence`,`Multiple Training Ideas`,`Main Text Introduction`],correct:1,explanation:`MTI = Mother Tongue Influence. It's when your native language habits affect your English.`},{type:`truefalse`,question:`Practicing English for 15 minutes daily is more effective than 2 hours once a week.`,correct:!0,explanation:`Daily practice builds habits and neural pathways. Short, consistent practice beats irregular long sessions.`},{type:`fill`,question:`Practice makes ___, not perfection.`,correct:`progress`,explanation:`The saying is "Practice makes progress, not perfection" — focus on improving, not being perfect!`}),r}function O(e){return T[e]||D(e,`Day ${e} — Keep Learning!`,`Continue your English journey`)}function ce(){return Array.from({length:84},(e,t)=>{let n=t+1;return{day:n,title:O(n).title,...S(n)}})}var k=document.getElementById(`confetti-canvas`),A=k.getContext(`2d`),j=[],M=null;function N(){k.width=window.innerWidth,k.height=window.innerHeight}window.addEventListener(`resize`,N),N();var P=class{constructor(){this.x=Math.random()*k.width,this.y=-10,this.size=Math.random()*8+4,this.speedY=Math.random()*3+2,this.speedX=(Math.random()-.5)*4,this.rotation=Math.random()*360,this.rotationSpeed=(Math.random()-.5)*10,this.color=[`#ff6b6b`,`#ffd93d`,`#6bcb77`,`#a855f7`,`#60a5fa`,`#f472b6`,`#22d3ee`,`#fb923c`][Math.floor(Math.random()*8)],this.opacity=1,this.shape=Math.random()>.5?`rect`:`circle`}update(){this.y+=this.speedY,this.x+=this.speedX,this.rotation+=this.rotationSpeed,this.speedY+=.05,this.opacity-=.005}draw(){A.save(),A.translate(this.x,this.y),A.rotate(this.rotation*Math.PI/180),A.globalAlpha=Math.max(0,this.opacity),A.fillStyle=this.color,this.shape===`rect`?A.fillRect(-this.size/2,-this.size/2,this.size,this.size*.6):(A.beginPath(),A.arc(0,0,this.size/2,0,Math.PI*2),A.fill()),A.restore()}};function F(){A.clearRect(0,0,k.width,k.height),j.forEach((e,t)=>{e.update(),e.draw(),(e.y>k.height+20||e.opacity<=0)&&j.splice(t,1)}),j.length>0?M=requestAnimationFrame(F):(cancelAnimationFrame(M),M=null,A.clearRect(0,0,k.width,k.height))}function I(e=80){for(let t=0;t<e;t++){let e=new P;e.y=-Math.random()*100,j.push(e)}M||F()}function L(){for(let e=0;e<15;e++){let e=new P;e.x=k.width/2+(Math.random()-.5)*200,e.y=k.height*.3,e.speedY=(Math.random()-.5)*6,e.speedX=(Math.random()-.5)*6,e.size=Math.random()*6+2,j.push(e)}M||F()}var R={questions:[],current:0,score:0,answered:!1},z={words:[],current:0,revealed:!1};document.addEventListener(`DOMContentLoaded`,()=>{setTimeout(()=>{let e=document.getElementById(`splash-screen`);e.classList.add(`fade-out`),setTimeout(()=>{e.style.display=`none`,document.getElementById(`app`).style.display=`block`,le()},400)},1800)});function le(){g(),V(),ue(),_e(),ye(),Se(),Ce();let e=document.querySelector(`.progress-ring`);if(e){let t=document.createElementNS(`http://www.w3.org/2000/svg`,`defs`),n=document.createElementNS(`http://www.w3.org/2000/svg`,`linearGradient`);n.setAttribute(`id`,`progressGradient`),n.setAttribute(`x1`,`0%`),n.setAttribute(`y1`,`0%`),n.setAttribute(`x2`,`100%`),n.setAttribute(`y2`,`100%`);let r=document.createElementNS(`http://www.w3.org/2000/svg`,`stop`);r.setAttribute(`offset`,`0%`),r.setAttribute(`stop-color`,`#a855f7`);let i=document.createElementNS(`http://www.w3.org/2000/svg`,`stop`);i.setAttribute(`offset`,`100%`),i.setAttribute(`stop-color`,`#ff6b6b`),n.appendChild(r),n.appendChild(i),t.appendChild(n),e.insertBefore(t,e.firstChild)}}function ue(){document.querySelectorAll(`.nav-item`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.page;B(t)})}),document.querySelectorAll(`.back-btn`).forEach(e=>{e.addEventListener(`click`,()=>{B(e.dataset.page)})}),document.getElementById(`btn-admin-trigger`).addEventListener(`click`,()=>{B(`admin`)}),document.getElementById(`streak-card`).addEventListener(`click`,()=>{B(`streak`)})}function B(e){document.querySelectorAll(`.page`).forEach(e=>e.classList.remove(`active`));let t=document.getElementById(`page-${e}`);t&&(t.classList.add(`active`),t.style.animation=`none`,t.offsetHeight,t.style.animation=null),document.querySelectorAll(`.nav-item`).forEach(e=>e.classList.remove(`active`));let n=document.querySelector(`.nav-item[data-page="${e}"]`);switch(n&&n.classList.add(`active`),document.getElementById(`bottom-nav`).style.display=e===`admin`?`none`:`flex`,e){case`home`:V();break;case`learn`:de();break;case`quiz`:U();break;case`streak`:ge();break;case`vocab`:he();break;case`admin`:ve();break}}function V(){let e=r(),t=e.currentDay,n=e.days[t]||{},i=new Date().getHours(),a=i<12?`Good Morning, Tuli! ☀️`:i<17?`Hey Tuli! 🌤️`:`Good Evening, Tuli! 🌙`;document.getElementById(`greeting-text`).textContent=a;let o=new Date;document.getElementById(`date-text`).textContent=o.toLocaleDateString(`en-IN`,{weekday:`long`,day:`numeric`,month:`long`}),document.getElementById(`streak-count`).textContent=e.streak.current,document.getElementById(`xp-total`).textContent=`${e.xp} XP`;let l=document.getElementById(`streak-fire`);e.streak.current>=7?l.textContent=`🔥🔥`:e.streak.current>=3?l.textContent=`🔥`:l.textContent=`✨`,document.getElementById(`progress-day`).textContent=`Day ${t}`;let u=326.73,d=u-t/84*u;setTimeout(()=>{document.getElementById(`progress-ring-fill`).style.strokeDashoffset=d},100);let f=C(e.xp);document.getElementById(`level-text`).textContent=f.name,document.querySelector(`.level-icon`).textContent=f.icon;let m=w(t),h=document.getElementById(`tasks-card`);if(h.innerHTML=``,m.forEach(e=>{let r=n.tasks?.[e.id]||!1,i=document.createElement(`div`);i.className=`task-item${r?` completed`:``}`,i.innerHTML=`
      <div class="task-checkbox">${r?`✓`:``}</div>
      <div class="task-content">
        <div class="task-label">${e.label}</div>
        <div class="task-sublabel">${e.sublabel}</div>
      </div>
      <span class="task-xp">+${e.xp} XP</span>
    `,i.addEventListener(`click`,()=>{if(e.id===`quiz`){B(`quiz`);return}if(e.id===`vocab`){B(`vocab`);return}if(e.id===`read`){B(`learn`);return}r?c(t,e.id):(s(t,e.id),p(e.xp),g(),L(),$(`+${e.xp} XP earned! 🎉`,`success`)),H(t),V()}),h.appendChild(i)}),n.completed&&t<84){let e=document.createElement(`button`);e.className=`btn btn-primary`,e.style.marginTop=`12px`,e.textContent=`🚀 Advance to Day `+(t+1),e.addEventListener(`click`,()=>{ee(),I(50),$(`Day ${t+1} unlocked! Let's go Tuli! 🚀`,`success`),V()}),h.appendChild(e)}let _=x[Math.floor(Math.random()*x.length)];document.getElementById(`quote-text`).textContent=`"${_.text}"`,document.getElementById(`quote-author`).textContent=`— ${_.author}`}function H(e){let t=r().days[e];t&&w(e).every(e=>t.tasks?.[e.id])&&!t.completed&&(u(e),p(25),b(`complete`,`Completed Day ${e}!`),I(100),$(`🎉 Day completed! All tasks done! +25 bonus XP`,`success`))}function de(){let e=m(),t=O(e),n=S(e),r=document.getElementById(`lesson-container`),i=``;t.videoUrls&&Array.isArray(t.videoUrls)?i=t.videoUrls.map(e=>`
      <div class="video-container">
         <iframe src="${e}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
       </div>
    `).join(``):t.videoUrl&&(i=`<div class="video-container">
         <iframe src="${t.videoUrl}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
       </div>`),r.innerHTML=`
    <div class="lesson-phase-tag ${n.color}">
      ${n.icon} ${n.phase} — ${n.weeks}
    </div>
    <div class="lesson-card">
      <h3>📖 Day ${e}: ${t.title}</h3>
      ${i}
      ${t.lesson}
    </div>
    <div class="lesson-card">
      <h3>💬 Today's Vocabulary</h3>
      <div style="display:flex;flex-wrap:wrap;gap:6px;">
        ${t.vocabulary.map(e=>`
          <div class="vocab-word-card" title="${e.meaning}">
            <span class="vocab-word">${e.word}</span>
            <span class="vocab-meaning">${e.meaning}</span>
          </div>
        `).join(``)}
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
  `,document.getElementById(`btn-mark-read`).addEventListener(`click`,()=>{s(e,`read`),p(10),g(),L(),$(`+10 XP! Great job reading! 📚`,`success`),H(e),document.getElementById(`btn-mark-read`).textContent=`✅ Done!`,document.getElementById(`btn-mark-read`).disabled=!0})}function U(){let e=m(),t=O(e),n=v(e)||t.questions;if(!n||n.length===0){document.getElementById(`quiz-container`).innerHTML=`
      <div style="text-align:center;padding:40px 20px;">
        <div style="font-size:3rem;margin-bottom:16px;">📝</div>
        <h3>No quiz for today yet!</h3>
        <p style="color:var(--text-secondary);margin-top:8px;">Questions will be added soon.</p>
      </div>
    `;return}R={questions:n,current:0,score:0,answered:!1},document.getElementById(`quiz-result`).style.display=`none`,document.getElementById(`quiz-container`).style.display=`block`,W()}function W(){let{questions:e,current:t}=R;if(t>=e.length){me();return}let n=e[t],r=document.getElementById(`quiz-container`),i=t/e.length*100;document.getElementById(`quiz-progress-fill`).style.width=`${i}%`;let a=``;if(n.type===`mcq`){let e=[`A`,`B`,`C`,`D`];a=`
      <div class="quiz-options">
        ${n.options.map((t,n)=>`
          <div class="quiz-option" data-index="${n}">
            <span class="option-letter">${e[n]}</span>
            <span>${t}</span>
          </div>
        `).join(``)}
      </div>
    `}else n.type===`truefalse`?a=`
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
    `:n.type===`fill`?a=`
      <div class="fill-input-wrapper">
        <input type="text" class="fill-input" id="fill-answer" placeholder="Type your answer..." autocomplete="off" />
        <button class="btn btn-primary fill-submit" id="btn-fill-submit">Check Answer</button>
      </div>
    `:n.type===`correct`&&(a=`
      <div class="fill-input-wrapper">
        <input type="text" class="fill-input" id="fill-answer" placeholder="Type the corrected sentence..." autocomplete="off" />
        <button class="btn btn-primary fill-submit" id="btn-fill-submit">Check Answer</button>
      </div>
    `);if(r.innerHTML=`
    <div class="quiz-question-card">
      ${{mcq:`<span class="quiz-type-badge badge-mcq">MCQ</span>`,truefalse:`<span class="quiz-type-badge badge-truefalse">True / False</span>`,fill:`<span class="quiz-type-badge badge-fill">Fill in the Blank</span>`,correct:`<span class="quiz-type-badge badge-correct">Fix the Sentence</span>`}[n.type]||``}
      <p class="quiz-question-number">Question ${t+1} of ${e.length}</p>
      <p class="quiz-question-text">${n.question}</p>
      ${a}
      <div id="quiz-feedback"></div>
    </div>
  `,R.answered=!1,n.type===`mcq`)r.querySelectorAll(`.quiz-option`).forEach(e=>{e.addEventListener(`click`,()=>fe(parseInt(e.dataset.index)))});else if(n.type===`truefalse`)r.querySelectorAll(`.tf-button`).forEach(e=>{e.addEventListener(`click`,()=>pe(e.dataset.value===`true`))});else if(n.type===`fill`||n.type===`correct`){let e=document.getElementById(`btn-fill-submit`),t=document.getElementById(`fill-answer`);e.addEventListener(`click`,()=>G(t.value)),t.addEventListener(`keydown`,e=>{e.key===`Enter`&&G(t.value)})}}function fe(e){if(R.answered)return;R.answered=!0;let t=R.questions[R.current],n=document.querySelectorAll(`.quiz-option`),r=e===t.correct;r?(R.score++,n[e].classList.add(`correct`),L()):(n[e].classList.add(`wrong`),n[t.correct].classList.add(`correct`)),K(r,t.explanation)}function pe(e){if(R.answered)return;R.answered=!0;let t=R.questions[R.current],n=e===t.correct;document.querySelectorAll(`.tf-button`).forEach(r=>{let i=r.dataset.value===`true`;i===t.correct?r.classList.add(`correct`):i===e&&!n&&r.classList.add(`wrong`)}),n&&(R.score++,L()),K(n,t.explanation)}function G(e){if(R.answered)return;R.answered=!0;let t=R.questions[R.current],n=document.getElementById(`fill-answer`),r=e.trim().toLowerCase()===t.correct.toLowerCase();n.classList.add(r?`correct`:`wrong`),n.disabled=!0,r&&(R.score++,L());let i=r?``:`<br><strong>Correct answer:</strong> ${t.correct}`;K(r,t.explanation+i)}function K(e,t){let n=document.getElementById(`quiz-feedback`);n.innerHTML=`
    <div class="quiz-explanation">
      <strong>${e?`✅ Correct!`:`❌ Not quite!`}</strong><br>
      ${t}
    </div>
    <button class="btn btn-primary quiz-next-btn" id="btn-quiz-next">
      ${R.current+1<R.questions.length?`Next Question →`:`See Results 🎯`}
    </button>
  `,document.getElementById(`btn-quiz-next`).addEventListener(`click`,()=>{R.current++,W()})}function me(){let{score:e,questions:t}=R,n=t.length,r=Math.round(e/n*100),i=m();l(i,e,n),s(i,`quiz`),g(),b(`quiz`,`Quiz Day ${i}: ${e}/${n} (${r}%)`);let a;a=r===100?`perfect`:r>=80?`great`:r>=60?`good`:r>=40?`okay`:`low`;let o=ae[a],c=o[Math.floor(Math.random()*o.length)],u={perfect:`🏆`,great:`🌟`,good:`💪`,okay:`📚`,low:`🌈`};document.getElementById(`quiz-container`).style.display=`none`,document.getElementById(`quiz-progress-fill`).style.width=`100%`;let d=document.getElementById(`quiz-result`);d.style.display=`block`,d.innerHTML=`
    <div class="result-emoji">${u[a]}</div>
    <h2 class="result-title">Quiz Complete!</h2>
    <div class="result-score">${e}/${n}</div>
    <p class="result-message">${c}</p>
    <div class="result-stats">
      <div class="result-stat">
        <div class="result-stat-value" style="color:var(--accent-mint);">${e}</div>
        <div class="result-stat-label">Correct</div>
      </div>
      <div class="result-stat">
        <div class="result-stat-value" style="color:var(--accent-coral);">${n-e}</div>
        <div class="result-stat-label">Wrong</div>
      </div>
      <div class="result-stat">
        <div class="result-stat-value" style="color:var(--accent-gold);">${r}%</div>
        <div class="result-stat-label">Score</div>
      </div>
    </div>
    <button class="btn btn-primary" id="btn-retry-quiz">🔄 Try Again</button>
    <button class="btn btn-secondary" id="btn-back-home" style="margin-top:8px;">🏠 Back to Home</button>
  `,r>=80&&I(80),document.getElementById(`btn-retry-quiz`).addEventListener(`click`,()=>{U()}),document.getElementById(`btn-back-home`).addEventListener(`click`,()=>{H(i),B(`home`)})}function he(){let e=O(m()).vocabulary||[],t=document.getElementById(`vocab-container`);if(e.length===0){t.innerHTML=`<p style="text-align:center;color:var(--text-secondary);">No vocabulary for today.</p>`;return}z={words:e,current:0,revealed:!1};function n(){let r=z.words[z.current];t.innerHTML=`
      <div class="vocab-flashcard" id="vocab-flashcard">
        <div class="vocab-flashcard-word">${r.word}</div>
        <div class="vocab-flashcard-hint">Tap to reveal meaning</div>
        <div class="vocab-flashcard-meaning">${r.meaning}</div>
      </div>
      <div class="vocab-nav">
        <button class="vocab-nav-btn" id="vocab-prev" ${z.current===0?`disabled`:``}>←</button>
        <span class="vocab-counter">${z.current+1} / ${e.length}</span>
        <button class="vocab-nav-btn" id="vocab-next" ${z.current===e.length-1?`disabled`:``}>→</button>
      </div>
      <div class="lesson-card" style="margin-top:16px;">
        <h3>📋 All Words Today</h3>
        <div class="vocab-all-words">
          ${e.map((e,t)=>`
            <div class="vocab-word-card ${t===z.current?`style="border-color:var(--accent-purple);"`:``}" data-idx="${t}">
              <span class="vocab-word">${e.word}</span>
            </div>
          `).join(``)}
        </div>
      </div>
      <button class="btn btn-success" id="btn-vocab-done" style="margin-top:12px;">
        ✅ I've practiced all words
      </button>
    `,z.revealed=!1,document.getElementById(`vocab-flashcard`).addEventListener(`click`,()=>{let e=document.getElementById(`vocab-flashcard`);z.revealed?(e.classList.remove(`revealed`),z.revealed=!1):(e.classList.add(`revealed`),z.revealed=!0)}),document.getElementById(`vocab-prev`).addEventListener(`click`,()=>{z.current>0&&(z.current--,n())}),document.getElementById(`vocab-next`).addEventListener(`click`,()=>{z.current<e.length-1&&(z.current++,n())}),t.querySelectorAll(`.vocab-word-card`).forEach(e=>{e.addEventListener(`click`,()=>{z.current=parseInt(e.dataset.idx),n()})}),document.getElementById(`btn-vocab-done`).addEventListener(`click`,()=>{let e=m();s(e,`vocab`),p(10),g(),L(),$(`+10 XP! Vocabulary done! 💬`,`success`),H(e)})}n()}function ge(){let e=r(),t=document.getElementById(`streak-detail-container`),n=Object.values(e.days).filter(e=>e.completed).length,i=Object.values(e.days).filter(e=>e.quizScore).length,a=i>0?Math.round(Object.values(e.days).filter(e=>e.quizScore).reduce((e,t)=>e+t.quizScore.score/t.quizScore.total*100,0)/i):0,o=[],s=new Date;for(let t=34;t>=0;t--){let n=new Date(s);n.setDate(n.getDate()-t);let r=n.toISOString().split(`T`)[0],i=0;Object.entries(e.days).forEach(([e,t])=>{if(t.timestamp&&t.timestamp.split(`T`)[0]===r){let e=Object.values(t.tasks||{}).filter(Boolean).length;e>=4?i=4:e>=3?i=3:e>=2?i=2:e>=1&&(i=1)}}),o.push(`<div class="heatmap-cell level-${i}" title="${r}"></div>`)}let c=[];for(let t=1;t<=12;t++){let n=(t-1)*7+1,r=t*7,i=0,a=0;for(let t=n;t<=r;t++)e.days[t]?.quizScore&&(i+=e.days[t].quizScore.score,a+=e.days[t].quizScore.total);let o=a>0?Math.round(i/a*100):0;c.push(`
      <div class="week-bar-row">
        <span class="week-bar-label">Week ${t}</span>
        <div class="week-bar-track">
          <div class="week-bar-fill" style="width:${o}%"></div>
        </div>
        <span class="week-bar-value">${o}%</span>
      </div>
    `)}let l=ie.map(t=>`
      <div class="badge-item ${t.check(e)?`earned`:`locked`}">
        <span class="badge-icon">${t.icon}</span>
        <span class="badge-name">${t.name}</span>
      </div>
    `).join(``);t.innerHTML=`
    <div class="stat-cards">
      <div class="stat-card stat-coral">
        <div class="stat-card-value">${e.streak.current}</div>
        <div class="stat-card-label">Current Streak 🔥</div>
      </div>
      <div class="stat-card stat-gold">
        <div class="stat-card-value">${e.streak.longest}</div>
        <div class="stat-card-label">Longest Streak ⭐</div>
      </div>
      <div class="stat-card stat-mint">
        <div class="stat-card-value">${n}</div>
        <div class="stat-card-label">Days Done ✅</div>
      </div>
      <div class="stat-card stat-purple">
        <div class="stat-card-value">${a}%</div>
        <div class="stat-card-label">Quiz Accuracy 🎯</div>
      </div>
    </div>

    <div class="heatmap-section">
      <h3>Activity Heatmap (Last 5 Weeks)</h3>
      <div class="heatmap-day-labels">
        ${[`Mon`,`Tue`,`Wed`,`Thu`,`Fri`,`Sat`,`Sun`].map(e=>`<span class="heatmap-day-label">${e}</span>`).join(``)}
      </div>
      <div class="heatmap-grid">
        ${o.join(``)}
      </div>
    </div>

    <div class="weekly-breakdown">
      <h3>Weekly Quiz Accuracy 📈</h3>
      ${c.join(``)}
    </div>

    <div class="badges-section">
      <h3>Achievements 🏆</h3>
      <div class="badges-grid">
        ${l}
      </div>
    </div>
  `}function _e(){let e=document.querySelectorAll(`.pin-digit`);e.forEach((t,n)=>{t.addEventListener(`input`,t=>{t.target.value&&n<3&&e[n+1].focus();let r=Array.from(e).map(e=>e.value).join(``);r.length===4&&(r===_()?(document.getElementById(`admin-gate`).style.display=`none`,document.getElementById(`admin-dashboard`).style.display=`block`,q(),J(),be()):(document.getElementById(`pin-error`).style.display=`block`,e.forEach(e=>{e.value=``}),e[0].focus()))}),t.addEventListener(`keydown`,t=>{t.key===`Backspace`&&!t.target.value&&n>0&&e[n-1].focus()})})}function ve(){document.getElementById(`admin-gate`).style.display=`flex`,document.getElementById(`admin-dashboard`).style.display=`none`,document.getElementById(`pin-error`).style.display=`none`,document.querySelectorAll(`.pin-digit`).forEach(e=>{e.value=``})}function ye(){document.querySelectorAll(`.admin-tab`).forEach(e=>{e.addEventListener(`click`,()=>{document.querySelectorAll(`.admin-tab`).forEach(e=>e.classList.remove(`active`)),document.querySelectorAll(`.admin-tab-content`).forEach(e=>e.classList.remove(`active`)),e.classList.add(`active`),document.getElementById(`tab-${e.dataset.tab}`).classList.add(`active`),e.dataset.tab===`stats`&&J(),e.dataset.tab===`questions`&&Y()})})}function q(){let e=r(),t=document.getElementById(`admin-hero`),n=Object.values(e.days).filter(e=>e.completed).length,i=S(e.currentDay);t.innerHTML=`
    <div class="hero-top">
      <div class="hero-avatar">${C(e.xp).icon}</div>
      <div class="hero-info">
        <h2>Tuli's Journey</h2>
        <p>${i.icon} ${i.phase} Phase — Day ${e.currentDay} of 84</p>
      </div>
    </div>
    <div class="hero-stats-row">
      <div class="hero-stat">
        <div class="hero-stat-value" style="color:var(--accent-coral);">${e.streak.current}🔥</div>
        <div class="hero-stat-label">Streak</div>
      </div>
      <div class="hero-stat">
        <div class="hero-stat-value" style="color:var(--accent-gold);">${e.xp}</div>
        <div class="hero-stat-label">Total XP</div>
      </div>
      <div class="hero-stat">
        <div class="hero-stat-value" style="color:var(--accent-mint);">${n}</div>
        <div class="hero-stat-label">Days Done</div>
      </div>
    </div>
  `}function J(){let e=r(),t=document.getElementById(`stats-grid`),n=Object.values(e.days).filter(e=>e.completed).length,i=Object.values(e.days).filter(e=>e.quizScore),a=i.length>0?Math.round(i.reduce((e,t)=>e+t.quizScore.score/t.quizScore.total*100,0)/i.length):0,o=i.reduce((e,t)=>e+t.quizScore.total,0),s=i.reduce((e,t)=>e+t.quizScore.score,0);t.innerHTML=`
    <div class="stats-card">
      <div class="stats-card-icon" style="background:rgba(168,85,247,0.12);">📅</div>
      <div class="stats-card-data">
        <div class="stats-card-value" style="color:var(--accent-purple);">Day ${e.currentDay}</div>
        <div class="stats-card-label">Current Day</div>
      </div>
    </div>
    <div class="stats-card">
      <div class="stats-card-icon" style="background:rgba(255,107,107,0.12);">🔥</div>
      <div class="stats-card-data">
        <div class="stats-card-value" style="color:var(--accent-coral);">${e.streak.current} / ${e.streak.longest}</div>
        <div class="stats-card-label">Current / Best</div>
      </div>
    </div>
    <div class="stats-card">
      <div class="stats-card-icon" style="background:rgba(255,217,61,0.12);">⭐</div>
      <div class="stats-card-data">
        <div class="stats-card-value" style="color:var(--accent-gold);">${e.xp}</div>
        <div class="stats-card-label">Total XP</div>
      </div>
    </div>
    <div class="stats-card">
      <div class="stats-card-icon" style="background:rgba(107,203,119,0.12);">🎯</div>
      <div class="stats-card-data">
        <div class="stats-card-value" style="color:var(--accent-mint);">${a}%</div>
        <div class="stats-card-label">Avg Accuracy</div>
      </div>
    </div>
    <div class="stats-card">
      <div class="stats-card-icon" style="background:rgba(96,165,250,0.12);">✅</div>
      <div class="stats-card-data">
        <div class="stats-card-value" style="color:var(--accent-blue);">${n}/84</div>
        <div class="stats-card-label">Days Done</div>
      </div>
    </div>
    <div class="stats-card">
      <div class="stats-card-icon" style="background:rgba(244,114,182,0.12);">🧠</div>
      <div class="stats-card-data">
        <div class="stats-card-value" style="color:var(--accent-pink);">${s}/${o}</div>
        <div class="stats-card-label">Questions Answered</div>
      </div>
    </div>
  `;let c=document.getElementById(`admin-improvement`),l=n>0?Math.round(n/84*100):0,u=Math.min(100,Math.round(e.streak.current/30*100)),d=a,f=Math.min(100,Math.round(e.xp/2e3*100));c.innerHTML=`
    <h3>📈 Tuli's Improvement</h3>
    <div class="improvement-row">
      <span class="improvement-label">Progress</span>
      <div class="improvement-bar-track"><div class="improvement-bar-fill green" style="width:${l}%"></div></div>
      <span class="improvement-value" style="color:var(--accent-mint);">${l}%</span>
    </div>
    <div class="improvement-row">
      <span class="improvement-label">Streak</span>
      <div class="improvement-bar-track"><div class="improvement-bar-fill purple" style="width:${u}%"></div></div>
      <span class="improvement-value" style="color:var(--accent-purple);">${e.streak.current}d</span>
    </div>
    <div class="improvement-row">
      <span class="improvement-label">Accuracy</span>
      <div class="improvement-bar-track"><div class="improvement-bar-fill blue" style="width:${d}%"></div></div>
      <span class="improvement-value" style="color:var(--accent-blue);">${d}%</span>
    </div>
    <div class="improvement-row">
      <span class="improvement-label">XP Growth</span>
      <div class="improvement-bar-track"><div class="improvement-bar-fill gold" style="width:${f}%"></div></div>
      <span class="improvement-value" style="color:var(--accent-gold);">${e.xp}</span>
    </div>
  `;let p=document.getElementById(`activity-log`),m=e.activityLog.slice(0,20);p.innerHTML=`
    <h3>📋 Tuli's Activity Log</h3>
    ${m.length===0?`<p style="color:var(--text-muted);font-size:0.85rem;">No activity yet. Tuli hasn't started practicing!</p>`:``}
    ${m.map(e=>{let t=e.type===`complete`?`green`:e.type===`quiz`?`yellow`:`red`,n=new Date(e.timestamp).toLocaleDateString(`en-IN`,{day:`numeric`,month:`short`,hour:`2-digit`,minute:`2-digit`});return`
        <div class="activity-item">
          <div class="activity-dot ${t}"></div>
          <span class="activity-text">${e.message}</span>
          <span class="activity-time">${n}</span>
        </div>
      `}).join(``)}
  `}function be(){let e=ce(),t=[document.getElementById(`admin-day-select`),document.getElementById(`manage-day-select`)],n=m();t.forEach(t=>{t&&(t.innerHTML=e.map(e=>`<option value="${e.day}" ${e.day===n?`selected`:``}>Day ${e.day}: ${e.title}</option>`).join(``))});let r=document.getElementById(`admin-day-select`);r&&r.addEventListener(`change`,()=>Y())}function Y(){let e=parseInt(document.getElementById(`admin-day-select`)?.value||m()),t=v(e),n=O(e).questions,r=t||n,i=!!t,a=document.getElementById(`question-count-info`);a.innerHTML=`📝 <strong>${r.length}</strong> questions for Day ${e} ${i?`<span style="color:var(--accent-purple);">(Custom)</span>`:`<span style="color:var(--text-muted);">(Default)</span>`}`;let o=document.getElementById(`admin-question-list`),s={mcq:`background:rgba(96,165,250,0.15);color:var(--accent-blue);`,truefalse:`background:rgba(255,217,61,0.15);color:var(--accent-gold);`,fill:`background:rgba(107,203,119,0.15);color:var(--accent-mint);`,correct:`background:rgba(244,114,182,0.15);color:var(--accent-pink);`},c={mcq:`MCQ`,truefalse:`T/F`,fill:`Fill`,correct:`Fix`};o.innerHTML=r.map((e,t)=>`
    <div class="question-list-item" data-index="${t}">
      <span class="q-number">${t+1}</span>
      <span class="q-type-tag" style="${s[e.type]||``}">${c[e.type]||e.type}</span>
      <span class="q-text">${e.question}</span>
      <div class="q-actions">
        <button class="q-action-btn btn-edit-q" data-index="${t}" title="Edit">✏️</button>
        <button class="q-action-btn btn-delete-q" data-index="${t}" title="Delete">🗑️</button>
      </div>
    </div>
  `).join(``),o.querySelectorAll(`.btn-edit-q`).forEach(t=>{t.addEventListener(`click`,()=>{X(e,r,parseInt(t.dataset.index))})}),o.querySelectorAll(`.btn-delete-q`).forEach(t=>{t.addEventListener(`click`,()=>{let n=parseInt(t.dataset.index),i=[...r];i.splice(n,1),y(e,i),$(`Question deleted! 🗑️`,`info`),Y()})})}function X(e,t,n=-1){let r=document.getElementById(`question-modal`);r.style.display=`flex`,r.dataset.dayNum=e,r.dataset.editIndex=n;let i=n>=0;if(document.getElementById(`modal-title`).textContent=i?`Edit Question`:`Add Question`,document.getElementById(`question-form`).reset(),i){let e=t[n];document.getElementById(`q-type`).value=e.type,document.getElementById(`q-text`).value=e.question,document.getElementById(`q-explanation`).value=e.explanation||``,e.type===`mcq`&&e.options&&(document.getElementById(`q-opt-a`).value=e.options[0]||``,document.getElementById(`q-opt-b`).value=e.options[1]||``,document.getElementById(`q-opt-c`).value=e.options[2]||``,document.getElementById(`q-opt-d`).value=e.options[3]||``,document.getElementById(`q-correct-mcq`).value=e.correct),e.type===`truefalse`&&document.querySelectorAll(`.tf-btn`).forEach(t=>{t.classList.toggle(`active`,t.dataset.val===`true`===e.correct)}),e.type===`fill`&&(document.getElementById(`q-fill-answer`).value=e.correct||``),e.type===`correct`&&(document.getElementById(`q-correct-sentence`).value=e.correct||``)}xe()}function xe(){let e=document.getElementById(`q-type`).value;document.getElementById(`mcq-options`).style.display=e===`mcq`?`block`:`none`,document.getElementById(`tf-options`).style.display=e===`truefalse`?`block`:`none`,document.getElementById(`fill-options`).style.display=e===`fill`?`block`:`none`,document.getElementById(`correct-options`).style.display=e===`correct`?`block`:`none`}function Se(){document.getElementById(`q-type`).addEventListener(`change`,xe),document.querySelectorAll(`#tf-options .tf-btn`).forEach(e=>{e.addEventListener(`click`,()=>{document.querySelectorAll(`#tf-options .tf-btn`).forEach(e=>e.classList.remove(`active`)),e.classList.add(`active`)})}),document.getElementById(`modal-close`).addEventListener(`click`,Z),document.getElementById(`btn-cancel-question`).addEventListener(`click`,Z),document.getElementById(`btn-add-question`).addEventListener(`click`,()=>{let e=parseInt(document.getElementById(`admin-day-select`)?.value||m()),t=v(e),n=O(e).questions;X(e,t||n,-1)}),document.getElementById(`question-form`).addEventListener(`submit`,e=>{e.preventDefault();let t=document.getElementById(`question-modal`),n=parseInt(t.dataset.dayNum),r=parseInt(t.dataset.editIndex),i=document.getElementById(`q-type`).value,a=document.getElementById(`q-text`).value.trim(),o=document.getElementById(`q-explanation`).value.trim();if(!a){$(`Please enter a question!`,`error`);return}let s={type:i,question:a,explanation:o};i===`mcq`?(s.options=[document.getElementById(`q-opt-a`).value.trim(),document.getElementById(`q-opt-b`).value.trim(),document.getElementById(`q-opt-c`).value.trim(),document.getElementById(`q-opt-d`).value.trim()],s.correct=parseInt(document.getElementById(`q-correct-mcq`).value)):i===`truefalse`?s.correct=document.querySelector(`#tf-options .tf-btn.active`)?.dataset.val===`true`:i===`fill`?s.correct=document.getElementById(`q-fill-answer`).value.trim():i===`correct`&&(s.correct=document.getElementById(`q-correct-sentence`).value.trim());let c=v(n),l=O(n).questions,u=[...c||l];r>=0?u[r]=s:u.push(s),y(n,u),Z(),Y(),$(r>=0?`Question updated! ✏️`:`Question added! ➕`,`success`)})}function Z(){document.getElementById(`question-modal`).style.display=`none`}function Ce(){document.getElementById(`btn-mark-complete`)?.addEventListener(`click`,()=>{let e=parseInt(document.getElementById(`manage-day-select`).value);u(e),b(`admin`,`Marked Day ${e} complete for Tuli`),$(`Day ${e} marked as complete! ✅`,`success`),Q()}),document.getElementById(`btn-mark-incomplete`)?.addEventListener(`click`,()=>{let e=parseInt(document.getElementById(`manage-day-select`).value);d(e),b(`admin`,`Marked Day ${e} incomplete`),$(`Day ${e} marked as incomplete ↩️`,`info`),Q()}),document.getElementById(`btn-reset-day`)?.addEventListener(`click`,()=>{let e=parseInt(document.getElementById(`manage-day-select`).value);confirm(`Reset all progress for Day ${e}?`)&&(f(e),b(`admin`,`Reset Day ${e} progress`),$(`Day ${e} progress reset 🔄`,`info`),Q())}),document.getElementById(`btn-set-day`)?.addEventListener(`click`,()=>{let e=document.getElementById(`set-day-input`),t=parseInt(e.value);t>=1&&t<=84?(h(t),b(`admin`,`Set Tuli's current day to Day ${t}`),$(`Tuli is now on Day ${t}! 🎯`,`success`),e.value=``,q(),J()):$(`Enter a day between 1 and 84!`,`error`)}),document.getElementById(`manage-day-select`)?.addEventListener(`change`,Q),document.getElementById(`btn-change-pin`)?.addEventListener(`click`,()=>{let e=document.getElementById(`new-pin`).value;e.length===4&&/^\d{4}$/.test(e)?(te(e),document.getElementById(`new-pin`).value=``,$(`PIN updated! 🔐`,`success`)):$(`PIN must be 4 digits!`,`error`)}),document.getElementById(`btn-export-data`)?.addEventListener(`click`,()=>{let e=ne(),t=new Blob([e],{type:`application/json`}),n=URL.createObjectURL(t),r=document.createElement(`a`);r.href=n,r.download=`tulis_english_quest_${new Date().toISOString().split(`T`)[0]}.json`,r.click(),URL.revokeObjectURL(n),$(`Data exported! 📦`,`success`)}),document.getElementById(`btn-reset-all`)?.addEventListener(`click`,()=>{confirm(`⚠️ This will delete ALL of Tuli's progress. Are you sure?`)&&confirm(`Really? This cannot be undone!`)&&(re(),$(`All progress reset 🗑️`,`info`),B(`home`))})}function Q(){let e=parseInt(document.getElementById(`manage-day-select`)?.value),t=r().days[e],n=document.getElementById(`manage-day-status`);if(n)if(t?.completed){let e=Object.values(t.tasks||{}).filter(Boolean).length,r=t.quizScore?` | Quiz: ${t.quizScore.score}/${t.quizScore.total}`:``;n.className=`manage-day-status status-complete`,n.innerHTML=`✅ Completed — ${e} tasks done${r}`}else if(t){let e=Object.values(t.tasks||{}).filter(Boolean).length;n.className=`manage-day-status status-incomplete`,n.innerHTML=`⏳ In Progress — ${e} tasks done`}else n.className=`manage-day-status status-incomplete`,n.innerHTML=`📭 Not started yet`}function $(e,t=`info`){document.querySelectorAll(`.toast`).forEach(e=>e.remove());let n=document.createElement(`div`);n.className=`toast ${t}`,n.textContent=e,document.body.appendChild(n),requestAnimationFrame(()=>{n.classList.add(`show`)}),setTimeout(()=>{n.classList.remove(`show`),setTimeout(()=>n.remove(),400)},2500)}