const questions = [
    {
        icon: "vpn_key",
        answers: ["Wallet", "Card", "Key"],
        correct: "Key"
    },
    {
        icon: "menu_book",
        answers: ["Book", "Pencil", "Eraser"],
        correct: "Book"
    },
    {
        icon: "auto_towing",
        answers: ["Car", "Towing Truck", "Bicycle"],
        correct: "Towing Truck"
    },
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 10;

function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
        showResult();
        return;
    }

    const questionData = questions[currentQuestionIndex];
    document.getElementById('question-icon').innerText = questionData.icon;

    const answersContainer = document.getElementById('answers-container');
    answersContainer.innerHTML = '';

    questionData.answers.forEach(answer => {
        const answerDiv = document.createElement('div');
        answerDiv.classList.add('answer');
        answerDiv.innerText = answer;
        answerDiv.onclick = () => selectAnswer(answer);
        answersContainer.appendChild(answerDiv);
    });

    startTimer();
}

function selectAnswer(selectedAnswer) {
    const questionData = questions[currentQuestionIndex];
    clearInterval(timer);

    const answers = document.querySelectorAll('.answer');
    answers.forEach(answerDiv => {
        answerDiv.classList.add('incorrect');
        if (answerDiv.innerText === questionData.correct) {
            answerDiv.classList.remove('incorrect');
            answerDiv.classList.add('correct');
        }
        answerDiv.onclick = null;
    });

    if (selectedAnswer === questionData.correct) {
        score++;
    }

    setTimeout(() => {
        currentQuestionIndex++;
        loadQuestion();
    }, 2000);
}

function startTimer() {
    timeLeft = 100;
    const progressBar = document.getElementById('progress-bar');
    progressBar.style.width = '0%';

    timer = setInterval(() => {
        timeLeft--;
        progressBar.style.width = `${100 - (timeLeft / 100) * 100}%`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            currentQuestionIndex++;
            loadQuestion();
        }
    }, 100);
}

function showResult() {
    fetch('result.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('quiz').style.display = 'none';
            document.getElementById('result-container').innerHTML = data;

            const resultMessage = document.getElementById('result-message');
            const stars = document.querySelectorAll('.star');
            const pointsEarned = document.getElementById('points-earned');

            let messageClass;
            if (score === 3) {
                resultMessage.innerText = 'Perfect Work';
                messageClass = 'perfect';
            } else if (score === 2) {
                resultMessage.innerText = 'Nice Work';
                messageClass = 'nice';
            } else if (score === 1) {
                resultMessage.innerText = 'Poor Result';
                messageClass = 'poor';
            } else {
                resultMessage.innerText = 'Bad Result';
                messageClass = 'bad';
            }

            resultMessage.className = `result-message ${messageClass}`;

            stars.forEach((star, index) => {
                star.className = 'material-symbols-outlined star';
                if (index < score) {
                    star.classList.add('full');
                }
            });

            const points = Math.round((score / questions.length) * 100);
            pointsEarned.innerText = `You Earned ${points} pts`;

            const playAgainButton = document.querySelector('.again-button');
            playAgainButton.addEventListener('click', restartQuiz);
        });
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('quiz').style.display = 'block';
    document.getElementById('result-container').innerHTML = '';
    loadQuestion();
}


document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('start-button')) {
        document.getElementById('start-button').addEventListener('click', startGame);
    } else {
        loadQuestion();
    }
});

function startGame() {
    window.location.href = 'index.html';
}



































































































