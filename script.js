// Shuffle array using Fisher-Yates algorithm
function shuffle(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}
// Quiz questions array
const questions = [
	{
		text: "Which piece can only move diagonally?",
		answers: [
			{ text: "Rook", correct: false },
			{ text: "Bishop", correct: true },
			{ text: "Queen", correct: false },
			{ text: "Knight", correct: false }
		]
	},
	{
		text: "What is the only piece that can jump over others?",
		answers: [
			{ text: "Pawn", correct: false },
			{ text: "Knight", correct: true },
			{ text: "King", correct: false },
			{ text: "Queen", correct: false }
		]
	},
	{
		text: "How many squares does a king move at a time?",
		answers: [
			{ text: "One", correct: true },
			{ text: "Two", correct: false },
			{ text: "Any number", correct: false },
			{ text: "Depends", correct: false }
		]
	},
	{
		text: "Which piece starts next to the king?",
		answers: [
			{ text: "Queen", correct: true },
			{ text: "Bishop", correct: false },
			{ text: "Rook", correct: false },
			{ text: "Knight", correct: false }
		]
	},
	{
		text: "What is it called when a king cannot escape capture?",
		answers: [
			{ text: "Checkmate", correct: true },
			{ text: "Stalemate", correct: false },
			{ text: "Draw", correct: false },
			{ text: "Resign", correct: false }
		]
	}
];

let currentQuestion = 0;
let score = 0;

const questionText = document.getElementById('question-text');
const answersDiv = document.getElementById('answers');
const nextBtn = document.getElementById('next-btn');
const scorePanel = document.getElementById('score-panel');
const scoreText = document.getElementById('score-text');
const restartBtn = document.getElementById('restart-btn');
const questionSection = document.getElementById('question-section');

function startQuiz() {
	shuffle(questions);
	currentQuestion = 0;
	score = 0;
	scorePanel.style.display = 'none';
	questionSection.style.display = 'block';
	renderQuestion();
}

function renderQuestion() {
	// Clear previous answers
	answersDiv.innerHTML = '';
	nextBtn.style.display = 'none';
	const q = questions[currentQuestion];
	questionText.textContent = q.text;
	q.answers.forEach((ans, idx) => {
		const btn = document.createElement('button');
		btn.className = 'answer-btn btn';
		btn.textContent = ans.text;
		btn.onclick = () => selectAnswer(btn, ans.correct);
		answersDiv.appendChild(btn);
	});
}

function selectAnswer(selectedBtn, isCorrect) {
	// Disable all buttons
	Array.from(answersDiv.children).forEach(btn => {
		btn.disabled = true;
		const ansObj = questions[currentQuestion].answers.find(a => a.text === btn.textContent);
		if (ansObj.correct) {
			btn.classList.add('correct');
		} else {
			btn.classList.add('incorrect');
		}
	});
	if (isCorrect) score++;
	nextBtn.style.display = 'inline-block';
	nextBtn.textContent = currentQuestion < questions.length - 1 ? 'Next' : 'Show Score';
}

nextBtn.onclick = () => {
	currentQuestion++;
	if (currentQuestion < questions.length) {
		renderQuestion();
	} else {
		showScore();
	}
};

function showScore() {
	questionSection.style.display = 'none';
	scorePanel.style.display = 'block';
	scoreText.textContent = `You answered ${score} out of ${questions.length} correctly.`;
}

restartBtn.onclick = startQuiz;

// Start quiz on page load
window.onload = startQuiz;
 