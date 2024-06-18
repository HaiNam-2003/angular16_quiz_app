import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { QuizQuestion, Data } from './../interface/question';
import { QuizService } from '../services/quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent {
  @Output() finalResult = new EventEmitter();
  @Output() showMainMenuFromQuizz = new EventEmitter();

  public questions: Array<any>;
  public selected: QuizQuestion | null = null;
  public result = {
    total: 0,
    correct: 0,
    wrong: 0,
    correctPercentage: 0,
    wrongPercentage: 0,
  };
  public index: number = 0;
  public answer: string = '';

  constructor(private quizService: QuizService, private router: Router) {
    this.questions = [];
    this.reset();
  }

  showQuestion(index: number): void {
    this.selected = this.questions[index];
    console.log(this.selected);
  }

  showMainMenu() {
    this.showMainMenuFromQuizz.emit(true);
  }

  nextQuestion(): void {
    if (!this.answer || !this.selected) return;
    this.checkAnswer();
    console.log(this.index, this.answer);
    this.addChoiceToQuestion(this.index, this.answer);
    this.index++;
    if (this.questions.length > this.index) {
      this.answer = '';
      this.showQuestion(this.index);
    } else {
      this.finishQuiz();
    }
  }
  checkAnswer(): void {
    if (this.selected && typeof this.selected.answer === 'string') {
      const selectedAnswer = this.selected.answer.trim(); // anwser correct
      const enteredAnswer = this.answer.trim(); // user selected anwser

      const isAnswerCorrect = selectedAnswer === enteredAnswer;
      console.log(isAnswerCorrect);

      if (isAnswerCorrect) {
        this.result.correct++;
      } else {
        this.result.wrong++;
      }
    }
  }

  finishQuiz(): void {
    this.result.total = this.questions.length;
    this.result.correctPercentage =
      (this.result.correct / this.result.total) * 100;
    this.result.wrongPercentage = (this.result.wrong / this.result.total) * 100;

    localStorage.setItem('data', JSON.stringify(this.questions));

    this.finalResult.emit(this.result);
  }

  reset(): void {
    this.answer = '';
    this.index = 0;
    this.result = {
      total: 0,
      correct: 0,
      wrong: 0,
      correctPercentage: 0,
      wrongPercentage: 0,
    };
    this.selected = null;
  }

  getChoicesKeys(): string[] {
    return this.selected?.choices ? Object.keys(this.selected.choices) : [];
  }

  addChoiceToQuestion(questionIndex: any, choice: any) {
    // Kiểm tra chỉ số câu hỏi có hợp lệ không
    if (questionIndex >= 0 && questionIndex < this.questions.length) {
      this.questions[questionIndex]['choice'] = choice;
      console.log(this.questions);
    } else {
      console.error('Invalid question index');
    }
  }
}
