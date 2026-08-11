const socket = io();

const screens = {
  welcome: document.getElementById('screen-welcome'),
  waiting: document.getElementById('screen-waiting'),
  question: document.getElementById('screen-question'),
  result: document.getElementById('screen-result'),
  gameOver: document.getElementById('screen-game-over')
};

let myPlayerName = "";

function showScreen(screenKey) {
  Object.values(screens).forEach(screen => screen.classList.remove('active'));
  screens[screenKey].classList.add('active');
}

function showAlert(msg) {
  document.getElementById('alert-msg').innerText = msg;
  document.getElementById('custom-alert').classList.remove('hidden');
}

document.getElementById('btn-alert-ok').addEventListener('click', () => {
  document.getElementById('custom-alert').classList.add('hidden');
});

// 1. إنشاء غرفة
document.getElementById('btn-create-room').addEventListener('click', () => {
  const name = document.getElementById('player-name').value.trim();
  if (!name) return showAlert("يرجى إدخال اسمك اللطيف أولاً! 🌼");
  
  myPlayerName = name;
  socket.emit('createRoom', { playerName: name });
});

// 2. دخول غرفة
document.getElementById('btn-join-room').addEventListener('click', () => {
  const name = document.getElementById('player-name').value.trim();
  const code = document.getElementById('room-code-input').value.trim();
  
  if (!name) return showAlert("يرجى إدخال اسمك اللطيف أولاً! 🌼");
  if (!code) return showAlert("يرجى كتابة رمز الغرفة! 🌊");
  
  myPlayerName = name;
  socket.emit('joinRoom', { playerName: name, roomCode: code });
});

socket.on('roomCreated', ({ roomCode }) => {
  document.getElementById('room-code-display').innerText = roomCode;
  showScreen('waiting');
});

document.getElementById('btn-copy-code').addEventListener('click', () => {
  const code = document.getElementById('room-code-display').innerText;
  navigator.clipboard.writeText(code);
  showAlert("تم نسخ الرمز بنجاح! 📋");
});

// 3. بدء اللعب والسؤال
socket.on('gameStarted', () => {
  showScreen('question');
});

socket.on('nextQuestion', ({ questionIndex, totalQuestions, question, choices }) => {
  showScreen('question');
  document.getElementById('waiting-opponent-badge').classList.add('hidden');
  
  document.getElementById('question-number-text').innerText = `السؤال ${questionIndex} من ${totalQuestions}`;
  document.getElementById('question-text').innerText = question;
  
  const fillPct = (questionIndex / totalQuestions) * 100;
  document.getElementById('progress-fill').style.width = `${fillPct}%`;

  const choicesContainer = document.getElementById('choices-container');
  choicesContainer.innerHTML = "";

  choices.forEach((choice, index) => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.innerHTML = `<span>${choice}</span> <span>🌼</span>`;
    btn.onclick = () => {
      document.querySelectorAll('.choice-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      socket.emit('submitAnswer', { choiceIndex: index });
    };
    choicesContainer.appendChild(btn);
  });
});

socket.on('answerReceived', () => {
  document.getElementById('waiting-opponent-badge').classList.remove('hidden');
  document.querySelectorAll('.choice-btn').forEach(b => b.style.pointerEvents = 'none');
});

// 4. إظهار النتيجة الجزئية للسؤال
socket.on('questionResult', ({ isMatch, p1, p2 }) => {
  showScreen('result');
  const matchBox = document.getElementById('match-status');
  
  if (isMatch) {
    matchBox.className = "match-status-box match";
    matchBox.innerText = "تطابق تام! 🎉 +10 نقاط";
  } else {
    matchBox.className = "match-status-box no-match";
    matchBox.innerText = "اختلاف طفيف في الآراء! 😄";
  }

  document.getElementById('p1-answer-label').innerHTML = `${p1.name}: <strong>${p1.answerText}</strong>`;
  document.getElementById('p2-answer-label').innerHTML = `${p2.name}: <strong>${p2.answerText}</strong>`;
});

document.getElementById('btn-next-question').addEventListener('click', () => {
  socket.emit('nextStep');
});

// 5. نهاية اللعبة
socket.on('gameOver', ({ percentage, title, desc }) => {
  showScreen('gameOver');
  document.getElementById('game-over-title').innerText = title;
  document.getElementById('game-over-percentage').innerText = `${percentage}%`;
  document.getElementById('game-over-desc').innerText = desc;
});

document.getElementById('btn-restart').addEventListener('click', () => {
  socket.emit('restartGame');
});

socket.on('errorMsg', (msg) => showAlert(msg));
socket.on('playerDisconnected', (msg) => {
  showAlert(msg);
  showScreen('welcome');
});