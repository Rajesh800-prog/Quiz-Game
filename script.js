const questions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
    category: "Geography"
  },
  {
    question: "Who developed the theory of relativity?",
    options: ["Newton", "Einstein", "Bohr", "Tesla"],
    answer: "Einstein",
    category: "Science"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars",
    category: "Space"
  },
  {
    question: "Which language is used for web development?",
    options: ["Python", "HTML", "C++", "Java"],
    answer: "HTML",
    category: "Technology"
  }
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 10;
let userAnswers = [];

function loadQuestion() {
  if (currentQuestion >= questions.length) {
    showResults();
    return;
  }

  const q = questions[currentQuestion];
  document.getElementById("category").innerText = "Category: " + q.category;
  document.getElementById("question").innerText = q.question;
  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.sort(() => 0.5 - Math.random());
  q.options.forEach(option => {
    const label = document.createElement("label");
    label.classList.add("option");
    label.innerHTML = `<input type="radio" name="option" value="${option}"> ${option}`;
    optionsDiv.appendChild(label);
  });

  timeLeft = 10;
  document.getElementById("time").innerText = timeLeft;
  clearInterval(timer);
  timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
  timeLeft--;
  document.getElementById("time").innerText = timeLeft;
  if (timeLeft <= 0) {
    clearInterval(timer);
    submitAnswer(true);
  }
}

function submitAnswer(timeout = false) {
  clearInterval(timer);
  const options = document.getElementsByName("option");
  let selected = "No Answer";
  for (let opt of options) {
    if (opt.checked) {
      selected = opt.value;
    }
  }

  const correct = questions[currentQuestion].answer;
  if (selected === correct) {
    score++;
  }

  userAnswers.push({
    question: questions[currentQuestion].question,
    selected,
    correct
  });

  currentQuestion++;
  loadQuestion();
}

function showResults() {
  document.getElementById("quiz-box").classList.add("hidden");
  document.getElementById("result-box").classList.remove("hidden");
  document.getElementById("score").innerText = `${score} / ${questions.length}`;

  const review = document.getElementById("review");
  review.innerHTML = "";
  userAnswers.forEach((ans, i) => {
    review.innerHTML += `<p><strong>Q${i + 1}: ${ans.question}</strong><br>
      Your answer: ${ans.selected}<br>
      Correct answer: ${ans.correct}</p>`;
  });
}

window.onload = () => {
  questions.sort(() => 0.5 - Math.random());
  loadQuestion();
};
