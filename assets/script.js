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
let finalScoreEl = document.getElementById("finalScore");
let enterInitialsEl = document.getElementById("enterInitials");
let submitButtonEl = document.getElementById("submitButton");
let highScoresDivEl = document.getElementById("highScoresDiv");
let goBackEl = document.getElementById("goBack");
let clearScoresEl = document.getElementById("clearScores");
let scoreContainerEl = document.getElementById("scoreContainer");

let timeLeft = 75;
let timer; 
let questionIndex = 0;
let currentQuestion = quizQuestions[questionIndex];
let highScores = [];

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

let startQuiz = function() {
    startTimer();
    startPageEl.style.display = "none";
    questionDivEl.style.display = "flex";
    endQuizEl.style.display = "none";
    highScoresDivEl.style.display = "none";
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

    if (questionIndex === quizQuestions.length) {
        endQuiz();
    }
    else {
        generateQuestion();
    }
};

let endQuiz = function () {
    clearInterval(timer);

    questionDivEl.style.display = "none";
    endQuizEl.style.display = "flex";

    finalScoreEl.textContent = "Your final score is " + timeLeft + ".";

};

let userHighScores = function() {
    clearInterval(timer);
    highScoresDivEl.style.display = "block";
    endQuizEl.style.display = "none";
    startPageEl.style.display = "none";
    questionDivEl.style.display = "none";

    // enterInitialsEl.value and timeLeft saved in array to localStorage
    let newScore = {
        userInits: enterInitialsEl.value,
        userScore: timeLeft
    };
    highScores.push(newScore);
    localStorage.setItem("scores", JSON.stringify(highScores));

    let getScores = JSON.parse(localStorage.getItem("scores"));

    if (getScores !== null) {
        for (i = 0; i < getScores.length; i++) {
            let scoreList = document.createElement("li");
            scoreList.setAttribute("class", "scoreEntry");
    
            scoreList.innerHTML = getScores[i].userInits + " - " + getScores[i].userScore;
            scoreContainerEl.appendChild(scoreList);
        }
    }
};

let restartGame = function() {
    startPageEl.style.display = "flex";
    highScoresDivEl.style.display = "none";
    questionDivEl.style.display = "none";
    endQuizEl.style.display = "none";
};

let clearHighScores = function() {
    localStorage.setItem("scores", "");
    restartGame();
};

startButtonEl.addEventListener("click", startQuiz);
submitButtonEl.addEventListener("click", userHighScores);
goBackEl.addEventListener("click", restartGame);
clearScoresEl.addEventListener("click", clearHighScores);


// once submit is pressed, save score function page will appear 
