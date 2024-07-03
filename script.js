// Quiz questions
const quizQuestions = [
    {
        question: "What is the capital of France?",
        answers: ["London", "Berlin", "Paris", "Madrid"],
        correct: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: ["Mars", "Venus", "Jupiter", "Saturn"],
        correct: 0
    },
    {
        question: "Who painted the Mona Lisa?",
        answers: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"],
        correct: 1
    }
    // Add more questions here
];

let currentQuestion = 0;
let score = 0;

const quizContainer = document.getElementById('quiz-container');
const nextBtn = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');

function loadQuestion() {
    const question = quizQuestions[currentQuestion];
    let html = `
        <div class="card-body">
            <h5 class="card-title">${question.question}</h5>
            <div class="answers">
    `;
    
    for (let i = 0; i < question.answers.length; i++) {
        html += `
            <div class="form-check">
                <input class="form-check-input" type="radio" name="answer" id="answer${i}" value="${i}">
                <label class="form-check-label" for="answer${i}">${question.answers[i]}</label>
            </div>
        `;
    }
    
    html += `
            </div>
        </div>
    `;
    
    quizContainer.innerHTML = html;
}

function checkAnswer() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (selectedAnswer) {
        if (parseInt(selectedAnswer.value) === quizQuestions[currentQuestion].correct) {
            score++;
        }
        return true;
    }
    return false;
}

nextBtn.addEventListener('click', () => {
    if (checkAnswer()) {
        currentQuestion++;
        if (currentQuestion < quizQuestions.length) {
            loadQuestion();
        } else {
            nextBtn.classList.add('d-none');
            submitBtn.classList.remove('d-none');
        }
    } else {
        alert('Please select an answer');
    }
});

submitBtn.addEventListener('click', () => {
    if (checkAnswer()) {
        showResult();
    } else {
        alert('Please select an answer');
    }
});

function showResult() {
    const resultModal = new bootstrap.Modal(document.getElementById('resultModal'));
    const resultMessage = document.getElementById('result-message');
    const percentage = (score / quizQuestions.length) * 100;
    
    let message = `You scored ${score} out of ${quizQuestions.length}. (${percentage.toFixed(2)}%)`;
    if (percentage >= 80) {
        message += " Great job!";
    } else if (percentage >= 60) {
        message += " Good effort!";
    } else {
        message += " Keep practicing!";
    }
    
    resultMessage.textContent = message;
    resultModal.show();
}

// Form validation
const feedbackForm = document.getElementById('feedback-form');

feedbackForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateForm()) {
        showToast('Feedback submitted successfully!');
        feedbackForm.reset();
    }
});

function validateForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    if (!name || !email || !subject || !message) {
        alert('Please fill in all fields');
        return false;
    }
    
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address');
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showToast(message) {
    const toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
    toastContainer.innerHTML = `
        <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <strong class="me-auto">Notification</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                ${message}
            </div>
        </div>
    `;
    document.body.appendChild(toastContainer);
    const toast = new bootstrap.Toast(toastContainer.querySelector('.toast'));
    toast.show();
}

// Load the first question when the page loads
loadQuestion(); 