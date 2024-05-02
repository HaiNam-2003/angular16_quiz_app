import { Component, ViewChild } from '@angular/core';
import { QuizComponent } from '../quiz/quiz.component';
import { ResultComponent } from '../result/result.component';
import { QuizService } from '../services/quiz.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public showMainMenu: boolean = true;
  public showQuizScreen: boolean = false;
  public showResultScreen: boolean = false;
  public spinner: boolean = false;

  @ViewChild(QuizComponent) quizComponent!: QuizComponent;
  @ViewChild(ResultComponent) resultComponent!: ResultComponent;

  constructor(private quizService: QuizService) {}

  // quizQuestions(formData: FormData): void {
  //   this.toggleSpinner();
  //   this.quizService.uploadPDF(formData).subscribe((response) => {
  //     if (response && response.length > 0) {
  //       this.quizComponent.questions = response;
  //       console.log(this.quizComponent.questions[0].data[0]);
  //       this.quizComponent.reset();
  //       this.quizComponent.showQuestion(0);
  //       this.showMainMenu = false;
  //       this.showQuizScreen = true;
  //       this.toggleSpinner();
  //     } else {
  //       console.error('No quiz questions received from the API.');
  //     }
  //     this.toggleSpinner();
  //   });
  // }

  handleFileInput(event: any) {
    this.toggleSpinner();

    const inputFile = (document.getElementById('input_pdf') as HTMLInputElement)
      ?.files ?? [0];

    if (!inputFile) {
      console.error('No file selected.');
      return;
    }

    const formData = new FormData();

    for (let i = 0; i < inputFile.length; i++) {
      if (inputFile[i] instanceof File) {
        formData.append('input_pdf', inputFile[i] as File);
      } else {
        console.error('Invalid file selected.');
        return;
      }
    }

    this.quizService.uploadPDF(formData).subscribe(
      (response) => {
        console.log(response);
        this.quizComponent.questions = response.data;
        console.log(this.quizComponent.questions[0]);
        this.quizComponent.reset();
        this.quizComponent.showQuestion(0);
        this.showMainMenu = false;
        this.showQuizScreen = true;
        this.toggleSpinner();
      },

      (error) => {
        console.error(
          'There was a problem with the fetch operation:',
          error.message
        );
      }
    );
  }

  // uploadPDF(pdfFile: any) {
  //   this.toggleSpinner(); // Hiển thị spinner khi bắt đầu tải lên tệp PDF
  //   this.quizQuestions(pdfFile);
  // }

  finalResult(result: any): void {
    this.resultComponent.finalResult = result;
    this.showQuizScreen = false;
    this.showResultScreen = true;
  }

  showMainMenuScreen(event: any): void {
    this.showResultScreen = false;
    this.showMainMenu = true;
  }

  toggleSpinner() {
    this.spinner = !this.spinner;
  }
}
