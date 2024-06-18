import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { QuizService } from '../services/quiz.service';
import { HistoryComponent } from '../history/history.component';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent {
  @Output() showMainMenuScreen = new EventEmitter();
  @Output() showHistoryScreen = new EventEmitter();

  @ViewChild(HistoryComponent) historyComponent!: HistoryComponent;

  public finalResult: any;
  public data: any;
  public token: any;

  constructor(
    private messageService: MessageService,
    private quizService: QuizService
  ) {}

  showMainMenu() {
    this.showMainMenuScreen.emit(true);
    localStorage.removeItem('data');
  }

  showHistory() {
    this.showHistoryScreen.emit(true);

    this.quizService.getDataFromServer().subscribe((response) => {
      console.log(response);
      this.historyComponent.questions = response[0];
      console.log(this.historyComponent.questions[0]);
      this.historyComponent.showQuestions(0);
    });
  }

  getData() {
    this.quizService.getDataFromServer().subscribe((response) => {
      console.log(response);
      this.historyComponent.questions = response[0];
      console.log(this.historyComponent.questions[0]);
      this.historyComponent.showQuestions(0);
    });
  }

  saveDataFromLocalStorage() {
    const storedData = localStorage.getItem('data');
    const storedToken = localStorage.getItem('token');

    if (storedData && storedToken) {
      this.data = JSON.parse(storedData);
      this.token = JSON.stringify(storedToken);

      const formattedData = {
        data: this.data,
      };
      console.log(formattedData);

      if (this.data.length > 0) {
        this.quizService.saveQuizData(formattedData).subscribe({
          next: (response) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Successfully',
              detail: 'Successfully saved quiz data',
            });
            this.showMainMenu();
          },
          error: (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Error saving quiz data',
            });
            console.error('Error:', error);
          },
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No data or token found in local storage',
        });
      }
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Thông báo lỗi',
        detail: 'No data or token found in local storage',
      });
    }
  }
}
