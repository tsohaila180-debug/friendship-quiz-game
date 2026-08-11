const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// بنك الأسئلة الشخصية والمضحكة للتوافق
const QUESTION_BANK = [
  { question: "من هو الشخص الأقرب إليك عندما تحتاج لنصيحة صادقة؟ 💡", choices: ["صديقي المفضّل", "والداي / عائلتي", "نفسي وأفكاري", "أبحث في جوجل/الإنترنت"] },
  { question: "ما هو تصرفك المفاجئ إذا رأيت صرصوراً طائراً؟ 🪳💥", choices: ["الصراخ والجري للغرفة المجاورة", "القتال بشجاعة حتى النصر", "التجمد في مكاني من الصدمة", "الاستعانة بصديق/فرد من العائلة"] },
  { question: "إذا طلب منك صديقك مشاركته آخر قطعة بيتزا، ماذا تفعل؟ 🍕✨", choices: ["أعطيها له بحب وابتسامة", "نقسمها بالنصف بالضبط", "آكلها بسرعة قبل أن ينتبه!", "أطلب بيتزا جديدة للجميع"] },
  { question: "ما هي أسلوبك المفضل لقضاء ويك إند مثالي؟ 🏖️🍿", choices: ["النوم والمتابعة تحت البطانية", "الخروج مع الأصدقاء والمغامرة", "التسوق وطلب الأكل اللذيذ", "العمل على مشروع شخصي/دراسة"] },
  { question: "لو استيقظت ووجدت نفسك بحساب بنكي فيه مليون دولار، أول شيء تفعله؟ 💰✨", choices: ["حجز طيران وسفر فوراً", "شراء كل الأغراض في قائمة أمنياتي", "إهداء أصدقائي وعائلتي هدايا", "استثمار المبلغ والهدوء"] },
  { question: "ما هو الموقف الأكثر إحراجاً بالنسبة لك؟ 🙈", choices: ["التعثر والسقوط أمام ناس كثيرين", "نداء شخص باسم خاطئ بثقة", "إرسال رسالة للشخص الخطأ", "نسيان اسم شخص يحييك بحرارة"] },
  { question: "إذا أردتم التخطيط لمشروع أو رحلة، ما هو دورك في المجموعة؟ 🗺️✨", choices: ["المنظم والمخطط لكل التفاصيل", "المتحمس الذي يوافق على أي شيء", "الذي يكتفي بالحضور والتذوق", "الذي يتأخر دائماً عن الموعد"] },
  { question: "لو كنت تمتلك قوة خارقة واحدة، ماذا تختار؟ 🦸‍♂️✨", choices: ["الطيران واكتشاف العالم", "قراءة الأفكار", "التنقل الخاطف للأماكن", "الإخفاء والتسلل"] }
];

const rooms = {};

function generateRoomCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  let code = '';
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

io.on('connection', (socket) => {
  // إنشاء غرفة
  socket.on('createRoom', ({ playerName }) => {
    let roomCode = generateRoomCode();
    while (rooms[roomCode]) {
      roomCode = generateRoomCode();
    }

    rooms[roomCode] = {
      code: roomCode,
      players: [{ id: socket.id, name: playerName, score: 0 }],
      currentQuestionIndex: 0,
      p1Answer: null,
      p2Answer: null,
      status: 'waiting'
    };

    socket.join(roomCode);
    socket.roomCode = roomCode;
    socket.emit('roomCreated', { roomCode, player: rooms[roomCode].players[0] });
  });

  // انضمام للغرفة
  socket.on('joinRoom', ({ playerName, roomCode }) => {
    const code = roomCode.toUpperCase();
    const room = rooms[code];

    if (!room) {
      return socket.emit('errorMsg', 'رمز الغرفة غير صحيح! 🐥');
    }
    if (room.players.length >= 2) {
      return socket.emit('errorMsg', 'الغرفة ممتلئة باللاعبين! 🌊');
    }

    const newPlayer = { id: socket.id, name: playerName, score: 0 };
    room.players.push(newPlayer);
    room.status = 'playing';
    socket.join(code);
    socket.roomCode = code;

    io.to(code).emit('gameStarted', {
      players: room.players,
      questionCount: QUESTION_BANK.length
    });

    sendQuestion(room);
  });

  function sendQuestion(room) {
    const qData = QUESTION_BANK[room.currentQuestionIndex];
    room.p1Answer = null;
    room.p2Answer = null;

    io.to(room.code).emit('nextQuestion', {
      questionIndex: room.currentQuestionIndex + 1,
      totalQuestions: QUESTION_BANK.length,
      question: qData.question,
      choices: qData.choices
    });
  }

  // إرسال الإجابة
  socket.on('submitAnswer', ({ choiceIndex }) => {
    const room = rooms[socket.roomCode];
    if (!room || room.status !== 'playing') return;

    if (room.players[0].id === socket.id) {
      room.p1Answer = choiceIndex;
    } else if (room.players[1].id === socket.id) {
      room.p2Answer = choiceIndex;
    }

    socket.emit('answerReceived');

    // عند إجابة كلا اللاعبين
    if (room.p1Answer !== null && room.p2Answer !== null) {
      const isMatch = room.p1Answer === room.p2Answer;
      if (isMatch) {
        room.players[0].score += 10;
        room.players[1].score += 10;
      }

      const qData = QUESTION_BANK[room.currentQuestionIndex];

      io.to(room.code).emit('questionResult', {
        isMatch,
        p1: { name: room.players[0].name, answerText: qData.choices[room.p1Answer] },
        p2: { name: room.players[1].name, answerText: qData.choices[room.p2Answer] },
        matchCount: room.players[0].score / 10,
        scores: room.players.map(p => ({ name: p.name, score: p.score }))
      });
    }
  });

  // الانتقال للسؤال التالي
  socket.on('nextStep', () => {
    const room = rooms[socket.roomCode];
    if (!room) return;

    room.currentQuestionIndex++;

    if (room.currentQuestionIndex < QUESTION_BANK.length) {
      sendQuestion(room);
    } else {
      room.status = 'over';
      const totalScore = room.players[0].score;
      const maxScore = QUESTION_BANK.length * 10;
      const percentage = Math.round((totalScore / maxScore) * 100);

      let title = "صداقة لطيفة! 🐥✨";
      let desc = "تحتاجان لقضاء وقت أطول معاً للتعرف أكثر!";
      
      if (percentage >= 80) {
        title = "توأم روح حقيقي! 👑🌊";
        desc = "عقولكم وتفكيركم متطابقان تماماً! تناغم رهيب وسريع!";
      } else if (percentage >= 50) {
        title = "أصدقاء مقربون رائعون! 🤝💛";
        desc = "تتشاركون الكثير من الأفكار واللحظات الممتعة!";
      }

      io.to(room.code).emit('gameOver', {
        totalScore,
        maxScore,
        percentage,
        title,
        desc
      });
    }
  });

  // إعادة اللعب
  socket.on('restartGame', () => {
    const room = rooms[socket.roomCode];
    if (!room) return;

    room.players.forEach(p => p.score = 0);
    room.currentQuestionIndex = 0;
    room.status = 'playing';

    io.to(room.code).emit('gameStarted', {
      players: room.players,
      questionCount: QUESTION_BANK.length
    });

    sendQuestion(room);
  });

  // انقطاع الاتصال
  socket.on('disconnect', () => {
    if (socket.roomCode && rooms[socket.roomCode]) {
      io.to(socket.roomCode).emit('playerDisconnected', 'غادر صديقك اللعبة! 🐥');
      delete rooms[socket.roomCode];
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});