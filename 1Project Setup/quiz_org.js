const quesJSON = [
  {
    category: "Food & Drink",
    id: "qa-1",
    correctAnswer: "Three",
    options: ["Two", "Three", "Four", "Five"],
    question: "How many pieces of bun are in a Mcdonald's Big Mac?",
  },
  {
    category: "Food & Drink",
    id: "qa-1",
    correctAnswer: "Three",
    options: ["Two", "Three", "Four", "Five"],
    question: "How many pieces of tomatoes are in a Mcdonald's Big Mac?",
  },
];

let score = 0;
let currentQuestion = 0;
const totalScore = quesJSON.length;

const questionEl = document.getElementById("question");
const optionEl = document.getElementById("options");
const scoreEl = document.getElementById("score");
const submitEl = document.getElementById("submit");
const nextEl = document.getElementById("next");

showQuestion();

submitEl.addEventListener("click", () => {
  nextQuestion();
});

nextEl.addEventListener("click", () => {
  scoreEl.textContent = `Score: ${score}/${totalScore}`;
  nextQuestion();
});

function showQuestion() {
  const { correctAnswer, options, question } = quesJSON[currentQuestion];

  questionEl.textContent = question;

  const shuffledOptions = shuffleOptions(options);

  shuffledOptions.forEach((opt) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    optionEl.appendChild(btn);

    btn.addEventListener("click", () => {
      if (opt === correctAnswer) {
        score++;
      } else {
        score = score - 0.25;
      }
      scoreEl.textContent = `Score: ${score}/${totalScore}`;
      nextQuestion();
    });
  });
}

function nextQuestion() {
  currentQuestion++;
  optionEl.textContent = "";
  if (currentQuestion >= quesJSON.length) {
    scoreEl.textContent = `Score: ${score}/${totalScore}`;
    questionEl.textContent = "Quiz Completed!";
    nextEl.remove();
    submitEl.remove();
  } else {
    showQuestion();
  }
}

function shuffleOptions(options) {
  for (let i = options.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * i + 1);
    [options[i], options[j]] = [options[j], options[i]];
  }
  return options;
}
