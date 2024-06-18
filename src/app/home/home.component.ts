import { Component, Input, ViewChild } from '@angular/core';
import { QuizComponent } from '../quiz/quiz.component';
import { ResultComponent } from '../result/result.component';
import { QuizService } from '../services/quiz.service';
import { SideNavToggle } from '../interface/sidenav';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public showMainMenu: boolean = true;
  public showQuizScreen: boolean = false;
  public showResultScreen: boolean = false;
  public showHistoryScreen: boolean = false;

  public spinner: boolean = false;
  isSideNavCollapsed = false;
  screenWidth = 0;

  @ViewChild(QuizComponent) quizComponent!: QuizComponent;
  @ViewChild(ResultComponent) resultComponent!: ResultComponent;

  constructor(private quizService: QuizService) {}

  onToggleSideNav(data: SideNavToggle): void {
    this.isSideNavCollapsed = data.collapsed;
    this.screenWidth = data.screenWidth;
  }

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
        let data = response;
        // console.log(response.data);
        // localStorage.setItem('data', JSON.stringify(response.data));
        // in data from local storage
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

  finalResult(result: any): void {
    this.resultComponent.finalResult = result;
    this.showQuizScreen = false;
    this.showResultScreen = true;
  }

  showMainMenuScreen(event: any): void {
    this.showResultScreen = false;
    this.showMainMenu = true;
  }

  showHistoryScreenFromSidebar(event: any): void {
    this.showResultScreen = false;
    this.showHistoryScreen = true;
  }

  showMainMenuFromQuizz(event: any): void {
    this.showQuizScreen = false;
    this.showMainMenu = true;
  }

  toggleSpinner() {
    this.spinner = !this.spinner;
  }
}
