// defining variables from HTML page
var header = document.querySelector(".header");
var startButton = document.querySelector(".start-button");
var highScoreButton = document.querySelector(".high-scores");
var quizSection = document.querySelector(".quiz");
var timer = document.querySelector(".timer");
var questionsEl = document.querySelector(".questions");
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");
var gameOver = document.querySelector(".game-over");
var finalScore = document.querySelector(".final-score");
var submitScore = document.querySelector(".submit-score");
var highScorePage = document.querySelector(".high-score-page");
var highScoreInitials = document.querySelector(".high-score-initials");
var highScoreScore = document.querySelector(".high-score-score");
var endGameButtons = document.querySelector(".end-game-buttons");
var playAgain = document.querySelector(".play-again");
var clearHighScore = document.querySelector(".clear-high-score");
var highScoreContainer = document.querySelector(".high-score-container");
var bigContainer = document.querySelector(".big-container");
var initials = document.getElementById("initials");

// questions array along with answer choices and correct answers
var quizQuestions = [ 
    {
        question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
        choiceA: 'Javascript',
        choiceB: 'terminal/bash',
        choiceC: 'for loops',
        choiceD: 'console.log',
        correctAnswer: 'd'
    },
    {
        question: 'String values must be enclosed within _____ when being assigned to variables?',
        choiceA: 'commas',
        choiceB: 'curly brackets',
        choiceC: 'quotes',
        choiceD: 'parentheses',
        correctAnswer: 'c'
    },
    {
        question: 'Commonly used data types DO NOT include:',
        choiceA: 'Strings',
        choiceB: 'Booleans',
        choiceC: 'alerts',
        choiceD: 'numbers',
        correctAnswer: 'c'
    },
    {
        question: 'Arrays in JavaScript can be used to store _______?',
        choiceA: 'numbers and strings',
        choiceB: 'other arrays',
        choiceC: 'booleans',
        choiceD: 'all of the above',
        correctAnswer: 'd'
    },
    {
        question: 'The condition in an if/else statement is enclosed within _______?',
        choiceA: 'quotes',
        choiceB: 'curly brackets',
        choiceC: 'parentheses',
        choiceD: 'square brackets',
        correctAnswer: 'c'
    },
    {
        question: 'What is a built-in JavaScript method for generating a random number?',
        choiceA: 'Math.floor()',
        choiceB: 'Math.random()',
        choiceC: 'Math.generate()',
        choiceD: 'Math.rannum()',
        correctAnswer: 'b'
    },
    {
      question: 'What are the 3 methods used to targed HTML elements?',
      choiceA: '.getElementById(), .querySelector(), .querySelectorAll()',
      choiceB: '.getEBI(), .querySelect(), .querySelectAll()',
      choiceC: '.forEach(), .highlight(), .highlightAll()',
      choiceD: 'None of the above',
      correctAnswer: 'a'
    },
];

// a few more variables to store initial states
var timeLeft = 60;
var currentQuestionIndex = 0;
var timerInterval;
var score = 0;
var finalQuestionIndex = quizQuestions.length
var correct;

// function to generate quiz question and possible answer buttons  
function makeQuizQuestion() {
      gameOver.style.display = "none";
      if(currentQuestionIndex === finalQuestionIndex) {
        return displayScore();
      }
      var currentQuestion = quizQuestions[currentQuestionIndex];
      questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
      buttonA.innerHTML = currentQuestion.choiceA;
      buttonB.innerHTML = currentQuestion.choiceB;
      buttonC.innerHTML = currentQuestion.choiceC;
      buttonD.innerHTML = currentQuestion.choiceD;
};
  
// starts initial quiz and parameter setpoints from event listener at end of page to start the game
function startQuiz() {
    quizSection.style.display = "block";
    timer.style.display = "flex",
    buttonA.style.display = "flex"
    buttonB.style.display = "flex"
    buttonC.style.display = "flex"
    buttonD.style.display = "flex"
    gameOver.style.display = "none";
    header.style.display = "none";
    endGameButtons.style.display = "none";
    makeQuizQuestion()

    timerInterval = setInterval(function() {
        timeLeft --;
        timer.textContent = "Time left: " + timeLeft;

        if(timeLeft <= 0) {
          clearInterval(timerInterval);
          displayScore();
        }
    }, 1000);
};


// function to display the score after start quiz function completes
function displayScore() {
      quizSection.style.display = "none";
      gameOver.style.display = "flex";
      clearInterval(timerInterval);
      initials.value = "";
      finalScore.innerHTML = "You picked " + score + " correct out of " + quizQuestions.length + " correct.";
};

// event listener for submitting high score to page and local storage
submitScore.addEventListener('click', function highScore() {
    console.log("clicked!")
    if(initials.value === "") {
        alert("You must enter something!");
        return false;
    } else {
        var savedHighScores = JSON.parse(localStorage.getItem('savedHighScores')) || [];
        var currentUser = initials.value.trim();
        var currentHighScore = {
            name: currentUser,
            score: score
        };
        gameOver.style.display = "none";
        highScoreContainer.style.display = "flex";
        endGameButtons.style.display = "flex";
        highScorePage.style.display = "flex";
        
        savedHighScores.push(currentHighScore);
        localStorage.setItem("savedHighScores", JSON.stringify(savedHighScores));
        generateHighScores();
    }
});


// generates the high scores page 
function generateHighScores(){
    highScoreInitials.innerHTML = "";
    highScoreScore.innerHTML = "";
    var highScores = JSON.parse(localStorage.getItem("savedHighScores")) || [];
    for (i=0; i<highScores.length; i++){
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highScores[i].name;
        newScoreSpan.textContent = highScores[i].score + " correct";
        highScoreInitials.appendChild(newNameSpan);
        highScoreScore.appendChild(newScoreSpan);
    }
}

// creates high score list page
function showHighScore() {
    header.style.display = "none";
    // gameOver.style.display = "none";
    highScoreContainer.style.display = "flex";
    clearInterval(timerInterval);
    highScorePage.style.display = "flex";
    endGameButtons.style.display = "flex";
    quizSection.style.display = "none";
    generateHighScores()
}

// clears local storage and high scores on page
function clearScore() {
    window.localStorage.clear();
    highScoreInitials.textContent = "";
    highScoreScore.textContent = "";
}

// function to start quiz over
function replayQuiz() {
      timeLeft = 60;
      score = 0;
      currentQuestionIndex = 0;
      highScoreContainer.style.display = "none";
      gameOver.style.display = "none";
      header.style.display = "block";
}

// check answers function
function checkAnswer(answer){
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
        score++;
        alert("That Is Correct!");
        currentQuestionIndex++;
        makeQuizQuestion();
    }else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){
        alert("That Is Incorrect!")
        currentQuestionIndex++;
        timeLeft -=10;
        makeQuizQuestion();
    }else{
        displayScore();
    }
};

// event listener for mouse click to start quiz
startButton.addEventListener('click', startQuiz);
