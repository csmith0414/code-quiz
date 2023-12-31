var questions = [
    {
        prompt: "Where does the CSS stylesheet link get stored?",
        options: ["head", "body", "footer"],
        answer: "head"
    },

    {
        prompt: "How would you refer to class=card in a stylesheet?",
        options: [".card", "#card", "card"],
        answer: ".card"
    },

    {
        prompt: "What statement is used within a function to set specified conditions?",
        options: ["if", "it", "as if", "because"],
        answer: "if"
    },
    {
      prompt: "What is the name of the program used in this course for repositories?",
      options: ["GitHub","RepoBuilder","MyCode"],
      answer: "GitHub"
  },
  {
    prompt: "What is used to check is two values are completely equal to one another?",
    options: ["=","==","==="],
    answer: "==="
}];

    var questionsEl = document.querySelector("#questions");
    var timerEl = document.querySelector("#timer");
    var choicesEl = document.querySelector("#options");
    var submitBtn = document.querySelector("#submit-score");
    var startBtn = document.querySelector("#start");
    var nameEl = document.querySelector("#name");
    var feedbackEl = document.querySelector("#feedback");
    var reStartBtn = document.querySelector("#restart");
    
    // Quiz's starting state
    
    var currentQuestionIndex = 0;
    var time = questions.length * 15;
    var timerId;
    
    // Start quiz and hide frontpage
    
    function quizStart() {
        timerId = setInterval(clockTick, 1000);
        timerEl.textContent = time;
        var landingScreenEl = document.getElementById("start-screen");
        landingScreenEl.setAttribute("class", "hide");
        questionsEl.removeAttribute("class");
        getQuestion();
    }
    
    // Start quiz
    
    startBtn.onclick = quizStart;

    // Loop through questions and answers and create list with buttons
    
    function getQuestion() {
        var currentQuestion = questions[currentQuestionIndex];
      var promptEl = document.getElementById("question-words")
        promptEl.textContent = currentQuestion.prompt;
        choicesEl.textContent = "";
        currentQuestion.options.forEach(function(choice, i) {
            var choiceBtn = document.createElement("button");
            choiceBtn.setAttribute("value", choice);
            choiceBtn.textContent = i + 1 + ". " + choice;
            choiceBtn.onclick = questionClick;
            choicesEl.appendChild(choiceBtn);
        });
    }
    
    // Check for right answers and deduct time for wrong answer, go to next question
    
    function questionClick() {
        if (this.value !== questions[currentQuestionIndex].answer) {
          time -= 10;
          if (time < 0) {
            time = 0;
          }
          timerEl.textContent = time;
          feedbackEl.textContent = "That is wrong!";
          feedbackEl.style.color = "red";
        } else {
          feedbackEl.textContent = "That is right!";
          feedbackEl.style.color = "green";
        }
        feedbackEl.setAttribute("class", "feedback");
        setTimeout(function() {
          feedbackEl.setAttribute("class", "feedback hide");
        }, 2000);
        currentQuestionIndex++;
        if (currentQuestionIndex === questions.length) {
          quizEnd();
        } else {
          getQuestion();
        }
    }
    
    // End quiz by hiding questions, stop timer and show final score
    
    function quizEnd() {
        clearInterval(timerId);
        var endScreenEl = document.getElementById("quiz-end");
        endScreenEl.removeAttribute("class");
        var finalScoreEl = document.getElementById("score-final");
        finalScoreEl.textContent = time;
        questionsEl.setAttribute("class", "hide");
    }
    
    // End quiz if timer reaches 0
    
    function clockTick() {
        time--;
        timerEl.textContent = time;
        if (time <= 0) {
          quizEnd();
        }
    }


