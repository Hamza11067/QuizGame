class Question {
  constructor(quizContainerId) {
    this.quizContainer = document.getElementById(quizContainerId);
    this.fetchQuestions();
    this.fetchOptions();
    this.fetchCorrectOptions();
    this.isCorrect();
  }
  fetchQuestions() {
    let questions = this.quizContainer.getElementsByClassName("quiz-section");

    this.questions = Array.from(questions).map((question) => {
      return question.getElementsByClassName("question")[0].innerHTML;
    });

    console.log(this.questions);
  }
  fetchOptions() {
    let options = this.quizContainer.getElementsByClassName("quiz-options");
    this.options = Array.from(options).map((option) =>
      Array.from(option.getElementsByTagName("li")).map((opt) => opt.innerHTML)
    );
    console.log(this.options);
  }

  fetchCorrectOptions() {
    let correctOptions =
      this.quizContainer.getElementsByClassName("quiz-options");
    this.correctOptions = Array.from(correctOptions).map((correctOption) => {
      return correctOption.getElementsByClassName("correct")[0].innerHTML;
    });
    console.log(this.correctOptions);
  }
}

let question = new Question("quizContainer");
