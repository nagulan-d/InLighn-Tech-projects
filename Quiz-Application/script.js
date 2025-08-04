const questions = [
  {
    question: "What does HTML stand for?",
    answers: ["Hyper Text Markup Language", "High Text Modern Language", "Hyper Trainer Marking Language", "Home Tool Markup Language"],
    correct: 0
  },
  {
    question: "Which language runs in a web browser?",
    answers: ["Java", "C", "Python", "JavaScript"],
    correct: 3
  },
  {
    question: "What is the full form of CSS?",
    answers: ["Cascading Style Sheets", "Creative Style System", "Colorful Style Syntax", "Control Style Sheet"],
    correct: 0
  },
  {
    question: "What does the DOM stand for?",
    answers: ["Document Object Model", "Data Object Manager", "Digital Ordinance Model", "Desktop Object Monitor"],
    correct: 0
  },
  {
    question: "Which is not a JavaScript framework?",
    answers: ["React", "Angular", "Vue", "Django"],
    correct: 3
  }
];

let currentQuestionIndex = 0;
let score = 0;
let selectedAnswers = [];

const questionNumber = document.getElementById("question-number");
const questionText = document.getElementById("question-text");
const answerButtons = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-btn");
const quizBox = document.getElementById("quiz-box");
const resultBox = document.getElementById("result-box");
const scoreDisplay = document.getElementById("score");
const summary = document.getElementById("summary");

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  selectedAnswers = [];
  quizBox.classList.remove("hide");
  resultBox.classList.add("hide");
  nextBtn.innerText = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  const current = questions[currentQuestionIndex];
  questionNumber.innerText = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
  questionText.innerText = current.question;

  current.answers.forEach((answer, index) => {
    const btn = document.createElement("button");
    btn.innerText = answer;
    btn.classList.add("answer-btn");
    btn.addEventListener("click", () => selectAnswer(index, btn));
    answerButtons.appendChild(btn);
  });
}

function resetState() {
  nextBtn.disabled = true;
  answerButtons.innerHTML = "";
}

function selectAnswer(index, button) {
  const correctIndex = questions[currentQuestionIndex].correct;
  const allButtons = answerButtons.querySelectorAll("button");

  allButtons.forEach((btn, i) => {
    btn.classList.add(i === correctIndex ? "correct" : (i === index ? "incorrect" : ""));
    btn.disabled = true;
  });

  if (index === correctIndex) {
    score++;
  }

  selectedAnswers.push({ index, correct: index === correctIndex });
  nextBtn.disabled = false;
}

nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResults();
  }
});

function showResults() {
  quizBox.classList.add("hide");
  resultBox.classList.remove("hide");
  scoreDisplay.innerText = `Your Score: ${score} / ${questions.length}`;
  summary.innerHTML = "";

  questions.forEach((q, i) => {
    const li = document.createElement("li");
    const resultText = selectedAnswers[i].correct
      ? "✅ Correct"
      : `❌ Incorrect (Correct: ${q.answers[q.correct]})`;
    li.innerText = `${i + 1}. ${q.question} - ${resultText}`;
    summary.appendChild(li);
  });
}

function restartQuiz() {
  startQuiz();
}

// Initialize
startQuiz();
