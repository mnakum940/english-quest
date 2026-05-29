# 🌟 Tuli's English Quest

Welcome to **Tuli's English Quest**, a personalized 84-day roadmap and tracking application designed to help you master spoken English! 

This app is a custom-built, interactive learning dashboard that tracks your daily progress, manages video lessons, tests your vocabulary, and builds your daily speaking streak.

![English Quest](https://img.shields.io/badge/Status-Active-success) ![Vite](https://img.shields.io/badge/Built_with-Vite-646CFF?logo=vite&logoColor=white) ![Vanilla JS](https://img.shields.io/badge/Language-Vanilla_JS-F7DF1E?logo=javascript&logoColor=black)

---

## 🚀 Features

- **📖 84-Day Structured Curriculum:** Broken down into 3 distinct phases, from basic sentences to advanced storytelling.
- **🎥 Integrated YouTube Lessons:** Watch curated English lessons directly inside the app.
- **🔥 Streak Tracking & XP:** Stay motivated by earning XP and keeping your daily streak alive.
- **🧠 Interactive Quizzes:** Test your knowledge at the end of each day with dynamic MCQs, Fill-in-the-blanks, and True/False questions.
- **🛠️ Hidden Admin Panel:** Manage your progress, review analytics, and manually set your current day.
- **📱 Mobile Optimized:** Designed with a beautiful, responsive, "glassmorphism" UI that looks amazing on any phone.

---

## 💻 How to Run Locally

If you want to run this app on your own computer:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your computer.

### Setup
1. Open your terminal and navigate to the `app` directory:
   ```bash
   cd app
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and go to `http://localhost:5173/`

---

## 🛠️ How to Update Video Links

You can easily update the daily curriculum and YouTube video links without touching any of the complex UI code. All the curriculum data is stored in one single file.

1. Open `app/js/data.js` in any text editor (or directly on GitHub).
2. Scroll down to find the topic arrays (e.g., `weekTwoToFourTopics` or `phaseTwoTopics`).
3. Add or replace the `videoUrl` property for the specific day using a YouTube **embed** link.

**Example:**
```javascript
{ 
  day: 41, 
  title: "Direct vs Indirect Speech", 
  focus: "She said, 'I am happy'", 
  videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID" 
}
```
*Note: Make sure you use the `/embed/` format for YouTube links!*

---

## 🌐 Hosting

This project is fully ready to be hosted for free on platforms like **Netlify** or **Vercel**. 
Simply link this GitHub repository to Netlify, and set the build command to `npm run build` and the publish directory to `dist`. 

Any changes you push to the `main` branch (like updating video links in `data.js`) will automatically trigger a new deployment!

---
*Built with ❤️ for Tuli.*
