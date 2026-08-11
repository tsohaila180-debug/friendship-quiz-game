@import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;600;700&family=Tajawal:wght@400;700;900&display=swap');

:root {
  --yellow-light: #fff8d6;
  --yellow-accent: #f7d070;
  --cyan-light: #e0f7fa;
  --cyan-accent: #4dd0e1;
  --cyan-dark: #00838f;
  --text-color: #263238;
  --card-bg: rgba(255, 255, 255, 0.95);
  --border-radius: 24px;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Tajawal', 'Fredoka', sans-serif;
}

body {
  background: linear-gradient(135deg, var(--yellow-light) 0%, #d4f8e8 50%, var(--cyan-light) 100%);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--text-color);
  position: relative;
  overflow-x: hidden;
}

/* الأشكال العائمة في الخلفية */
.decorations .bubble {
  position: absolute;
  font-size: 2.2rem;
  animation: float 5s ease-in-out infinite alternate;
  user-select: none;
  opacity: 0.85;
}
.bubble-1 { top: 8%; left: 6%; animation-delay: 0s; }
.bubble-2 { top: 75%; left: 8%; animation-delay: 1s; }
.bubble-3 { top: 12%; right: 8%; animation-delay: 2s; }
.bubble-4 { top: 80%; right: 6%; animation-delay: 3s; }
.bubble-5 { top: 45%; left: 88%; animation-delay: 1.5s; }

@keyframes float {
  0% { transform: translateY(0px) rotate(0deg); }
  100% { transform: translateY(-18px) rotate(8deg); }
}

.game-container {
  width: 100%;
  max-width: 580px;
  padding: 20px;
  z-index: 10;
}

.game-header {
  text-align: center;
  margin-bottom: 24px;
}

.cute-title {
  color: var(--cyan-dark);
  font-size: 2.3rem;
  font-weight: 900;
  text-shadow: 2px 2px 0px #ffffff;
}

.tagline {
  font-size: 1.05rem;
  color: #455a64;
  margin-top: 4px;
  font-weight: 700;
}

.screen {
  display: none;
}
.screen.active {
  display: block;
  animation: popIn 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes popIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

.card {
  background: var(--card-bg);
  padding: 28px 24px;
  border-radius: var(--border-radius);
  box-shadow: 0 12px 30px rgba(0, 131, 143, 0.12);
  border: 3px solid #ffffff;
  text-align: center;
}

.cute-label {
  display: block;
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 14px;
  color: var(--cyan-dark);
}

input[type="text"] {
  width: 100%;
  padding: 14px 20px;
  border: 2px solid var(--yellow-accent);
  border-radius: 16px;
  outline: none;
  font-size: 1.1rem;
  text-align: center;
  background: #ffffff;
  margin-bottom: 16px;
  transition: 0.25s;
}

input[type="text"]:focus {
  border-color: var(--cyan-accent);
  box-shadow: 0 0 12px rgba(77, 208, 225, 0.3);
}

.btn {
  width: 100%;
  padding: 14px 20px;
  border: none;
  border-radius: 18px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn:active {
  transform: scale(0.98);
}

.btn-primary {
  background-color: #ffd54f;
  color: #424242;
}
.btn-primary:hover {
  background-color: #ffca28;
}

.btn-secondary {
  background-color: var(--cyan-accent);
  color: #ffffff;
}
.btn-secondary:hover {
  background-color: #26c6da;
}

.divider {
  margin: 16px 0;
  font-weight: bold;
  color: #78909c;
}

.room-code-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  background: var(--yellow-light);
  padding: 16px;
  border-radius: 18px;
  margin: 20px 0;
  border: 2px dashed var(--yellow-accent);
}

.room-code-text {
  font-size: 2.2rem;
  letter-spacing: 5px;
  font-weight: 900;
  color: var(--cyan-dark);
}

.btn-copy {
  background: var(--cyan-accent);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: bold;
}

/* شريط التقدم والأسئلة */
.progress-bar-container {
  background: #e0e0e0;
  border-radius: 12px;
  height: 12px;
  overflow: hidden;
  margin-bottom: 20px;
}
.progress-bar-fill {
  background: linear-gradient(90deg, #ffd54f, var(--cyan-accent));
  height: 100%;
  width: 0%;
  transition: width 0.3s ease;
}

.question-title {
  font-size: 1.35rem;
  color: var(--text-color);
  margin-bottom: 24px;
  line-height: 1.5;
  font-weight: 700;
}

.choices-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.choice-btn {
  background: #fcfcfc;
  border: 2px solid #e0f2f1;
  padding: 16px;
  border-radius: 16px;
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--text-color);
  cursor: pointer;
  transition: 0.2s;
  text-align: right;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.choice-btn:hover {
  border-color: var(--cyan-accent);
  background: var(--cyan-light);
}

.choice-btn.selected {
  border-color: var(--cyan-dark);
  background: #b2ebf2;
}

.waiting-badge {
  margin-top: 20px;
  background: var(--yellow-light);
  padding: 12px;
  border-radius: 14px;
  font-weight: bold;
  color: #795548;
}

/* شاشة كشف الإجابات */
.match-status-box {
  padding: 16px;
  border-radius: 16px;
  margin-bottom: 20px;
  font-size: 1.3rem;
  font-weight: 900;
}
.match-status-box.match {
  background: #e8f5e9;
  color: #2e7d32;
  border: 2px solid #a5d6a7;
}
.match-status-box.no-match {
  background: #fff3e0;
  color: #e65100;
  border: 2px solid #ffcc80;
}

.answers-comparison {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
}

.player-answer-card {
  background: #f5f5f5;
  padding: 14px 18px;
  border-radius: 14px;
  text-align: right;
}

.player-answer-card strong {
  color: var(--cyan-dark);
}

.score-badge {
  font-size: 3rem;
  font-weight: 900;
  color: var(--cyan-dark);
  margin: 15px 0;
}

.custom-alert-overlay {
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0,0,0,0.35);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}
.custom-alert-overlay.hidden { display: none; }

.alert-modal {
  background: white;
  padding: 25px;
  border-radius: 20px;
  text-align: center;
  max-width: 320px;
  border: 3px solid var(--cyan-accent);
}

.hidden { display: none !important; }
