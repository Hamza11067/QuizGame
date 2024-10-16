class Question {
  constructor(quizContainerId) {
    this.quizContainer = document.getElementById(quizContainerId);
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.TimeLimit = 10;
    this.TimeInterval = null;
    this.startTimer();
    this.fetchQuestions();
    this.fetchOptions();
    this.fetchCorrectOptions();
    this.renderQuestion();
    this.addEventListeners();
  }

  fetchQuestions() {
    let questions = this.quizContainer.getElementsByClassName("quiz-section");

    this.questions = Array.from(questions).map((question) => {
      return question.getElementsByClassName("question");
    });
  }

  fetchOptions() {
    let options = this.quizContainer.getElementsByClassName("quiz-options");
    this.options = Array.from(options).map((option) =>
      Array.from(option.getElementsByTagName("li")).map((opt) => opt.innerHTML)
    );
  }

  fetchCorrectOptions() {
    let correctOptions =
      this.quizContainer.getElementsByClassName("quiz-options");
    this.correctOptions = Array.from(correctOptions).map((correctOption) => {
      return correctOption.getElementsByClassName("correct")[0].innerHTML;
    });
  }

  renderQuestion() {
    let quizBlocks = this.quizContainer.getElementsByClassName("quiz-section");

    Array.from(quizBlocks).forEach((questionBlock, index) => {
      if (index == this.currentQuestionIndex) {
        questionBlock.style.display = "block";
      } else {
        questionBlock.style.display = "none";
      }
    });
    this.startTimer();
  }

  addEventListeners() {
    const optionsList = this.quizContainer.getElementsByTagName("li");
    Array.from(optionsList).forEach((option) => {
      option.addEventListener("click", (e) => this.handleAnswerClick(e));
    });
  }

  handleAnswerClick(event) {
    clearInterval(this.TimeInterval);
    const selectedOption = event.target.innerHTML;
    const correctAnswer = this.correctOptions[this.currentQuestionIndex];

    if (selectedOption === correctAnswer) {
      this.score++;
      alert("Correct Answer!");
    } else {
      alert("Wrong Answer!");
    }

    this.nextQuestion();
  }

  nextQuestion() {
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex < this.questions.length) {
      this.renderQuestion();
    } else {
      this.endQuiz();
    }
  }

  endQuiz() {
    clearInterval(this.TimeInterval);
    this.quizContainer.innerHTML += `
      <div id="finalScreen">
        <h2>Quiz completed!</h2>
        <p>Your final score is ${this.score}/${this.questions.length}</p>
        <button id="restartButton">Restart Quiz</button>
      </div>
    `;
    document
      .getElementById("restartButton")
      .addEventListener("click", () => this.restartQuiz());
  }

  restartQuiz() {
    this.currentQuestionIndex = 0;
    this.score = 0;

    const finalScreen = document.getElementById("finalScreen");
    finalScreen.parentNode.removeChild(finalScreen);
    this.renderQuestion();
    this.addEventListeners();
  }

  startTimer() {
    let timer = this.quizContainer.getElementsByClassName("timer")[0];
    let timeLeft = this.TimeLimit;
    // window.time = 0;

    if (this.TimeInterval) {
      clearInterval(this.TimeInterval);
    }

    this.TimeInterval = setInterval(() => {
      timeLeft--;
      timer.innerHTML = timeLeft;

      if (timeLeft <= 0) {
        clearInterval(this.TimeInterval);
        alert("Time up");
        this.nextQuestion();
      }
    }, 1000);

    // setInterval(function (time) {
    //   window.time += 1;
    //   timer.innerHTML = window.time;
    // }, 1000);
  }
}

let question = new Question("quizContainer");
