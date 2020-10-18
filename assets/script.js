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
        answer: "quotes"
    },
    {
        title: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["JavaScript", "terminal/bash", "for loops", "console.log"],
        answer: "console.log"
    },
];

// global and DOM element variables 
let mainEl = document.getElementById("main");
let scoreLinkEl = document.getElementById("scoreLink");
let startPageEl = document.getElementById("startPage");
let startButtonEl = document.getElementById("startButton");
let timeEl = document.getElementById("time");
let questionDivEl = document.getElementById("questionDiv");
let questionTitleEl = document.getElementById("questionTitle");
let questionChoicesEl = document.getElementById("questionChoices");
let feedbackEl = document.getElementById("feedback");
let endQuizEl = document.getElementById("endQuizDiv");
let finalScoreEl = document.getElementById("finalScore");
let enterInitialsEl = document.getElementById("enterInitials");
let submitButtonEl = document.getElementById("submitButton");

let scoresDivEl = document.getElementById("scoresDiv");
let scoreListEl = document.getElementById("scoreList");
let goBackButton = document.getElementById("goBack");
let clearScoresButton = document.getElementById("clearScores");


let timeLeft = 75;
let timer; 
let questionIndex = 0;
let currentQuestion = quizQuestions[questionIndex];

// function to start countdown timer 
let startTimer = function() {
    timer = setInterval(function() {
        timeLeft--;
        timeEl.textContent = "Time: " + timeLeft;

        if (timeLeft === 0) { 
            timeEl.textContent = "Time: 0";
            clearInterval(timer);
            endQuiz();
        }

    }, 1000);
};

// function to start quiz 
let startQuiz = function() {
    startTimer();
    startPageEl.style.display = "none";
    questionDivEl.style.display = "flex";
    endQuizEl.style.display = "none";
    generateQuestion();
};

// function to go through question array and display questions 
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

// function to check right or wrong answers and go to next question 
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

    if (questionIndex === quizQuestions.length) {
        endQuiz();
    }
    else {
        generateQuestion();
    }
};

// function to end quiz and display final score 
let endQuiz = function () {
    timeEl.textContent = "Time: " + timeLeft;
    clearInterval(timer);

    questionDivEl.style.display = "none";
    endQuizEl.style.display = "flex";

    finalScoreEl.textContent = "Your final score is " + timeLeft + ".";

};

let highScores = [];
let newScore;
let newUserScore;

// function to save score to local storage and display to users 
let saveScore = function() {
    mainEl.innerHTML = "";
    scoresDivEl.style.display = "flex";

    let highScores = JSON.parse(localStorage.getItem("scores")) || [];

    let newScore = {
        initials: enterInitialsEl.value,
        score: timeLeft
    };
    console.log(newScore);
    highScores.push(newScore);
    localStorage.setItem("scores", JSON.stringify(highScores));

    for (i = 0; i < highScores.length; i++) {
        let newUserScore = document.createElement("p");
        newUserScore.setAttribute("class", "newUserScore");
        newUserScore.textContent = highScores[i].initials + " - " + highScores[i].score;
        scoreListEl.appendChild(newUserScore);
    };
}; 

// function to reset quiz 
let restartQuiz = function() {
    document.location.reload();
};

// function to clear all local storage and score list 
let clearHighScores = function() {
    mainEl.innerHTML = "";
    scoresDivEl.style.display = "flex";
    scoreListEl.innerHTML = "";

    localStorage.clear();
};

// function for link in header to see high scores page 
// not displaying scores div for somereason 
let showScoresLink = function() {
    mainEl.innerHTML = "";
    scoresDivEl.style.display = "flex";
    console.log("what is happening");
};

// event listeners to run the quiz when buttons are clicked 
startButtonEl.addEventListener("click", startQuiz);
submitButtonEl.addEventListener("click", saveScore);
goBackButton.addEventListener("click", restartQuiz);
clearScoresButton.addEventListener("click", clearHighScores);
scoreLinkEl.addEventListener("click", showScoresLink);