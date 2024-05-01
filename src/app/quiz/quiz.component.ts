import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { QuizQuestion, Data } from './../interface/question';
import { QuizService } from '../services/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent {
  @Output() finalResult = new EventEmitter();

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

  constructor(private quizService: QuizService) {
    this.questions = [];
    this.reset();
  }

  showQuestion(index: number): void {
    this.selected = this.questions[index].data[index];
    console.log(this.selected?.question);
  }

  nextQuestion(): void {
    if (!this.answer || !this.selected) return;
    this.checkAnswer();
    this.index++;
    if (this.questions.length > this.index) {
      this.answer = '';
      this.showQuestion(this.index);
    } else {
      this.finishQuiz();
    }
  }

  checkAnswer(): void {
    if (this.selected && this.selected.answer) {
      const isAnswerCorrect = this.selected.answer === this.answer;
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
}
