// initialize variables
var questionID, question, choiceA, choiceB, choiceC, choiceD, userChoice, questions, numQuestions, qInfo,
current = 0,
score = 0,
points = [];


var defaultQuestions = [
    {
        question: " Which of the following keywords is used to define a variable in Javascript?",
        choiceA: "var",
        choiceB: "let",
        choiceC: "Both A and B",
        choiceD: "None of the above",
        correct: "C"
    },
    {
        question: "Which of the following methods is used to access HTML elements using Javascript?",
        choiceA: "getElementById()",
        choiceB: "getElementByClassName()",
        choiceC: "Both A and B",
        choiceD: "None of the above",
        correct: "C"
    },
    {
        question: "Upon encountering empty statements, what does the Javascript Interpreter do?",
        choiceA: "Throws an error",
        choiceB: "Ignores the statements",
        choiceC: "gives a warning",
        choiceD: "None of the above",
        correct: "C"
    },
    {
        question: "What is 10/2?",
        choiceA: "5",
        choiceB: "2",
        choiceC: "8",
        choiceD: "9",
        correct: "B"
    },
    {
        question: "How can a datatype be declared to be a constant type?",
        choiceA: "Const",
        choiceB: "Var",
        choiceC: "Let",
        choiceD: "Constant",
        correct: "A"
    }
];

var elQuiz = document.getElementById("quiz");
var elQuizStatus = document.getElementById("quizStatus");

var elQuestion = document.getElementById("question");
var elChoiceA = document.getElementById("choiceA");
var elChoiceB = document.getElementById("choiceB");
var elChoiceC = document.getElementById("choiceC");
var elChoiceD = document.getElementById("choiceD");
var elChoices = document.getElementsByName('choices');

// start quiz
populateQuestions();
renderQuestion();
document.getElementById("submit").onclick = gradeQuestion;

function populateQuestions(){
    // populate with default questions
    questions = defaultQuestions;
    // if local storage contains questions, add to question set
    if(localStorage.getItem("questions")){
        var storedQuestions = JSON.parse(localStorage.getItem("questions"));
        for(var i = 0; i < storedQuestions.length; i++){
            questions.push(storedQuestions[i]);
        }
    }
    numQuestions = questions.length;
}

function populateQuestionInfo(){
    question = questions[current].question;
    qInfo = questions[current];
    choiceA = qInfo.choiceA;
    choiceB = qInfo.choiceB;
    choiceC = qInfo.choiceC;
    choiceD = qInfo.choiceD;
    correct = qInfo.correct;
}

function renderQuestion(){
    questionID = current + 1;
    elQuizStatus.innerHTML = "Question " + (questionID) + " of " + (numQuestions);
    populateQuestionInfo();
    elQuestion.innerHTML = question;
    elChoiceA.innerHTML = choiceA;
    elChoiceB.innerHTML = choiceB;
    elChoiceC.innerHTML = choiceC;
    elChoiceD.innerHTML = choiceD;
}

function gradeQuestion(){
    if(getUserChoice()){
        if(userChoice == questions[current].correct){
            score++;
            points[current] = 1;
        }
        else{
            points[current] = 0;
        }

        if(current == questions.length-1){
            endGame();
        }
        else{
            // next question
            current++;
            renderQuestion();
        }
    }
}

function getUserChoice(){
    for (var i = 0, length = elChoices.length; i < length; i++)
    {
        if (elChoices[i].checked)
        {
            userChoice = elChoices[i].value;

            // clear radio input for next question
            elChoices[i].checked = false;

            return true;
        }
    }
    // user didn't select an answer
    alert("Please select an answer before continuing");
    return false;
}

function endGame(){
    elQuiz.innerHTML = "<h2>Your Score: " + score + " out of " + numQuestions + "</h2>";
    for(var i = 0; i < points.length; i++){
        var summary = document.createElement("p");
        if(points[i] == 0){
            summary.innerHTML = "Question #" + (i+1) + ": INCORRECT";
            summary.style.color = "red";
        }
        else{
            summary.innerHTML = "Question #" + (i+1) + ": CORRECT!";
            summary.style.color = "green";
        }
        elQuiz.appendChild(summary); 
    }
    document.getElementById("options").style.display = "block";

}