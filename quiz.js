const quesJSON = [
  {
    category: "General Knowledge",
    id: "qa-1",
    correctAnswer: "Paris",
    options: ["Paris", "London", "Rome", "Berlin"],
    question: "What is the capital of France?",
  },
  {
    category: "General Knowledge",
    id: "qa-2",
    correctAnswer: "Mount Everest",
    options: ["K2", "Kangchenjunga", "Mount Everest", "Makalu"],
    question: "What is the highest mountain in the world?",
  },
  {
    category: "General Knowledge",
    id: "qa-3",
    correctAnswer: "Leonardo da Vinci",
    options: [
      "Vincent van Gogh",
      "Pablo Picasso",
      "Leonardo da Vinci",
      "Claude Monet",
    ],
    question: "Who painted the Mona Lisa?",
  },
  {
    category: "General Knowledge",
    id: "qa-4",
    correctAnswer: "Jupiter",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    question: "Which planet is known as the largest in our solar system?",
  },
  {
    category: "General Knowledge",
    id: "qa-5",
    correctAnswer: "Alexander Graham Bell",
    options: [
      "Thomas Edison",
      "Nikola Tesla",
      "Alexander Graham Bell",
      "Michael Faraday",
    ],
    question: "Who is credited with inventing the telephone?",
  },
  {
    category: "General Knowledge",
    id: "qa-6",
    correctAnswer: "William Shakespeare",
    options: [
      "Charles Dickens",
      "William Shakespeare",
      "Jane Austen",
      "Mark Twain",
    ],
    question: "Who wrote 'Romeo and Juliet'?",
  },
  {
    category: "General Knowledge",
    id: "qa-7",
    correctAnswer: "Water",
    options: ["Oxygen", "Water", "Carbon Dioxide", "Nitrogen"],
    question: "What is the most abundant substance on Earth’s surface?",
  },
  {
    category: "General Knowledge",
    id: "qa-8",
    correctAnswer: "The Great Wall of China",
    options: [
      "Machu Picchu",
      "The Great Wall of China",
      "Christ the Redeemer",
      "The Colosseum",
    ],
    question: "Which structure is the longest wall in the world?",
  },
  {
    category: "General Knowledge",
    id: "qa-9",
    correctAnswer: "Harper Lee",
    options: [
      "Harper Lee",
      "J.K. Rowling",
      "George Orwell",
      "F. Scott Fitzgerald",
    ],
    question: "Who wrote 'To Kill a Mockingbird'?",
  },
  {
    category: "General Knowledge",
    id: "qa-10",
    correctAnswer: "Nile",
    options: ["Amazon", "Yangtze", "Nile", "Mississippi"],
    question: "What is the longest river in the world?",
  },
];

let score = 0;
let currentQuestion = 0;
const totalScore = quesJSON.length;
let selectedOption = null;

const questionEl = document.getElementById("question");
const optionEl = document.getElementById("options");
const scoreEl = document.getElementById("score");
const submitEl = document.getElementById("submit");
const nextEl = document.getElementById("next");
const clearEl = document.getElementById("clear");

showQuestion();

submitEl.addEventListener("click", () => {
  if (selectedOption) {
    if (
      selectedOption.textContent === quesJSON[currentQuestion].correctAnswer
    ) {
      score++;
    } else {
      score -= 0.25;
    }
    nextQuestion();
    submitEl.disabled = true;
    nextEl.disabled = false;
    scoreEl.style.display = "block"; // Show score after the first question
  }
});

nextEl.addEventListener("click", () => {
  nextQuestion();
  nextEl.disabled = false;
  submitEl.disabled = true;
  scoreEl.style.display = "block"; // Show score after the first question
});

clearEl.addEventListener("click", () => {
  clearSelected(); // Clear any selected option
  submitEl.disabled = true; // Disable submit button
  nextEl.disabled = false; // Enable next button
});

function showQuestion() {
  const { correctAnswer, options, question } = quesJSON[currentQuestion];

  questionEl.textContent = question;
  optionEl.innerHTML = "";

  const shuffledOptions = shuffleOptions(options);

  shuffledOptions.forEach((opt) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    optionEl.appendChild(btn);

    btn.addEventListener("click", () => {
      clearSelected(); // Clear any previously selected button
      btn.classList.add("selected"); // Highlight the selected button
      selectedOption = btn; // Store the selected option
      submitEl.disabled = false; // Enable submit button
      nextEl.disabled = true; // Disable next button
    });
  });

  // Hide score card on the first question
  if (currentQuestion === 0) {
    scoreEl.style.display = "none";
  }
}

function nextQuestion() {
  currentQuestion++;
  optionEl.textContent = "";
  if (currentQuestion >= quesJSON.length) {
    questionEl.textContent = "Quiz Completed!";
    submitEl.style.display = "none";
    nextEl.style.display = "none";
    clearEl.style.display = "none";
    scoreEl.textContent = `Final Score: ${score}/${totalScore}`;
    scoreEl.style.display = "block";
  } else {
    scoreEl.textContent = `Current Score: ${score}/${totalScore}`;
    showQuestion();
  }
}

function shuffleOptions(options) {
  for (let i = options.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  return options;
}

function clearSelected() {
  const buttons = document.querySelectorAll("#options button");
  buttons.forEach((button) => button.classList.remove("selected"));
}
