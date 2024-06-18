import { Component } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { QuizComponent } from '../quiz/quiz.component';
import { DataQuestion } from './../interface/question';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent {
  public questions: Array<any>;
  public selected: DataQuestion | null = null;
  public index: number = 0;
  public answer: string = '';

  public result = {
    total: 0,
    correct: 0,
    wrong: 0,
    correctPercentage: 0,
    wrongPercentage: 0,
  };

  constructor(private quizService: QuizService) {
    this.questions = [];
  }

  showQuestions(index: number): void {
    this.selected = this.questions[index];
    console.log(this.selected?.choice);
  }

  nextQuestion(): void {
    if (!this.answer || !this.selected) return;
    this.checkAnswer();
    console.log(this.index, this.answer);
    this.index++;
    if (this.questions.length > this.index) {
      this.answer = '';
      this.showQuestions(this.index);
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

  getChoicesKeys(): string[] {
    return this.selected?.choices ? Object.keys(this.selected.choices) : [];
  }
}
