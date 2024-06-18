import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { QuizQuestion, Data } from '../interface/question';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private url = 'http://127.0.0.1:8000/pdf';

  constructor(private http: HttpClient) {}

  public dataSubject = new Subject<any>();

  uploadPDF(formData: FormData): Observable<Data> {
    return this.http.post<Data>(this.url, formData);
  }

  saveQuizData(data: any): Observable<Data> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const quizData = localStorage.getItem('data');
    if (quizData) {
      console.log(data);
      return this.http.post<Data>('http://127.0.0.1:8000/save_quiz', data, {
        headers,
      });
    } else {
      throw new Error('No quiz data found in local storage');
    }
  }

  getDataFromServer(): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:8000/test');
  }
}
