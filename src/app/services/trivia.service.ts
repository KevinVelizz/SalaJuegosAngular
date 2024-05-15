import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TriviaService {

  private apiUrl = 'https://opentdb.com/api.php?amount=10&type=multiple';

  constructor(private http: HttpClient) { }

  getPreguntas() {
    return this.http.get<any>(this.apiUrl);
  }
}
