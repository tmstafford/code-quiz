// var quiz questions as array 
var quizQuestions = [
    {
        title: "Commonly used data types do NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed with _______.",
        choices: ["quotes", "curly brackets", "parenthesis", "square brackets"],
        answer: "parenthesis"
    },
    {
        title: "Arrays in JavaScript can be used to store ________.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        title: "String values must be enclosed within _______ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: "parenthesis"
    },
    {
        title: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["JavaScript", "terminal/bash", "for loops", "console.log"],
        answer: "console.log"
    },
];

let startPageEl = document.getElementById("startPage");
let startButtonEl = document.getElementById("startButton");
let timeEl = document.getElementById("time");
let questionDivEl = document.getElementById("questionDiv");
let questionTitleEl = document.getElementById("questionTitle");
let questionChoicesEl = document.getElementById("questionChoices");
let feedbackEl = document.getElementById("feedback");
let endQuizEl = document.getElementById("endQuizDiv");

let timeLeft = 75;
let timer; 
let questionIndex = 0;
let currentQuestion = quizQuestions[questionIndex];
let buttonID; 
let buttonLoop = questionChoicesEl.querySelectorAll("button");

let startTimer = function() {
    timer = setInterval(function() {
        timeLeft--;
        timeEl.textContent = "Time: " + timeLeft;

        if (timeLeft === 0) { // or no questions left
            timeEl.textContent = "Time: 0";
            clearInterval(timer);
            // function to end game results
        }

    }, 1000);
};

let startQuiz = function() {
    startTimer();
    startPageEl.style.display = "none";
    questionDivEl.style.display = "flex";
    generateQuestion();

};


let generateQuestion = function() {
    let currentQuestion = quizQuestions[questionIndex];
    questionTitleEl = document.getElementById("questionTitle");
    questionTitleEl.textContent = currentQuestion.title;
    questionChoicesEl.innerHTML = "";

    // create each choice button using a for loop
    currentQuestion.choices.forEach(function(choice, i) {
        let eachChoice = document.createElement("button");
        eachChoice.setAttribute("class", "choiceButton");
        eachChoice.setAttribute("value", choice);
        eachChoice.textContent = i + 1 + ". " + choice;

        eachChoice.addEventListener("click", nextQuestion);
        questionChoicesEl.appendChild(eachChoice);
    });
};

let nextQuestion = function() {
    let feedback = document.createElement("h2");
    feedback.setAttribute("class", "feedback");
    feedbackEl.appendChild(feedback);

    if (this.value !== quizQuestions[questionIndex].answer) {
        feedback.textContent = "Wrong!";
        timeLeft -= 10;
        if (timeLeft <=10) {
            timeLeft = 0;
            clearInterval(timer);
        }
    } 
    else {
        feedback.textContent = "Correct!";
    }

    let removeFeedback = setTimeout(function() {
        feedbackEl.removeChild(feedback);
    }, 1000);

    questionIndex++;

    generateQuestion();
};


startButtonEl.addEventListener("click", startQuiz);