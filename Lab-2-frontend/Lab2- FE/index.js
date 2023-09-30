/** Activity: 1 --> Creating Functions for quiz Which will have score, list of questions, question index and each Question will have its question text, correct answer and option */
function Quiz(questions) {
  this.score = 0;
  this.questions = questions;
  this.questionIndex = 0;
}

function Question(text, options, answer) {
  this.text = text;
  this.options = options;
  this.answer = answer;
}

Quiz.prototype.getQuestionByIndex = function () {
  return this.questions[this.questionIndex];
};

Quiz.prototype.checkOptionWithAnswer = function (ans) {
  if (this.getQuestionByIndex().answer == ans) {
    this.score++;
  }
  this.questionIndex++;
};

Quiz.prototype.isEnded = function () {
  return this.questionIndex == this.questions.length;
};

/** Activity:2 --> Create the array of questions with its respective text, options and answer and then create a quiz with the list of questions created and score and questionIdex initially will be 0. */

let questions = [
  new Question(
    "Javascripts supports",
    ["Functions", "XHTML", "CSS", "HTML"],
    "Functions"
  ),
  new Question(
    "Which language is used for styling web pages?",
    ["HTML", "JQuery", "CSS", "HTML"],
    "CSS"
  ),
  new Question(
    "Which is not a JavaScript framework?",
    ["Python Script", "JQuery", "DJango", "NodeJS"],
    "Python Script"
  ),
  new Question(
    "What is used to connect to the database?",
    ["PHP", "HTML", "JS", "ALL"],
    "PHP"
  ),
  new Question(
    " JavaScript is a type of?",
    ["Language", "Programming Language", "Development", "ALL"],
    "Programming Language"
  ),
];

let quiz = new Quiz(questions);

/** Actvity: 3 --> Display/load Quiz questions on HTML */
function displayQuestions() {
  /** Check is quiz ended if not show another question else show result page */
  if (quiz.isEnded()) {
    showScores();
  } else {
    let questionElem = document.getElementById("question");
    questionElem.innerHTML = quiz.getQuestionByIndex().text;

    let choices = quiz.getQuestionByIndex().options;
    for (let i = 0; i < choices.length; i++) {
      let elem = document.getElementById("choice" + i);
      elem.innerHTML = choices[i];
      handleClickOnBtn("btn" + i, choices[i]);
    }
    showProgress();
  }
}
/** Show the progress at footer as Question 1 of 5 */
function showProgress() {
  let curr = quiz.questionIndex + 1;
  let elem = document.getElementById("progress");
  elem.innerHTML = `Question ${curr} of ${quiz.questions.length}`;
}
/** Handle click on option and based on that verify answer of that question and update score   accordingly */
function handleClickOnBtn(id, choice) {
  let buttonElem = document.getElementById(id);
  buttonElem.onclick = function () {
    quiz.checkOptionWithAnswer(choice);
    displayQuestions();
  };
}

/**showScore which will calculate score and show the page of result after last  question along with percentage */
function showScores() {
  let result = `<h1>Result</h1><h2>Your scores: ${
    quiz.score
  }.And mark percentage is: ${(quiz.score / questions.length) * 100}</h2`;
  let quizElem = document.getElementById("quiz");
  quizElem.innerHTML = result;
}
displayQuestions();
