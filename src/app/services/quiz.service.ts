import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QuizQuestion } from '../interface/question';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private url = 'https://53d6-14-174-208-124.ngrok-free.app/pdf';

  constructor(private http: HttpClient) {}

  // getQuizQuestions(): Observable<QuizQuestion[]> {
  //   return this.http.get<QuizQuestion[]>(this.url);
  // }
  // uploadPDF(pdfFile: File): Observable<any> {
  //   console.log('hello');
  //   // Tạo FormData để định dạng dữ liệu gửi lên
  //   const formData: FormData = new FormData();
  //   formData.append('input_pdf', pdfFile); // Tên trường "pdfFile" phải khớp với tên trường được yêu cầu bởi API
  //   console.log(typeof pdfFile);
  //   fetch(this.url, {
  //     method: 'POST',
  //     body: formData,
  //   })
  //     .then((response) => {
  //       console.log(response);
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log('Server response:', data);
  //     })
  //     .catch((error) => {
  //       console.error(
  //         'There was a problem with the fetch operation:',
  //         error.message
  //       );
  //     });

  //   // Gửi yêu cầu POST với tệp PDF đã chọn
  //   return this.http.post<any>(this.url, formData);
  // }
  uploadPDF(formData: FormData): Observable<QuizQuestion[]> {
    return this.http.post<QuizQuestion[]>(
      'https://53d6-14-174-208-124.ngrok-free.app/pdf',
      formData
    );
  }
}
