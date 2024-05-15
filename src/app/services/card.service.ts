import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private apiUrl = 'https://deckofcardsapi.com/api/deck';

  constructor(private http: HttpClient) { }

  getNewDeck() {
    return this.http.get<any>(`${this.apiUrl}/new/shuffle/?deck_count=1`);
  }

  drawCards(deckId: string, count: number) {
    return this.http.get<any>(`${this.apiUrl}/${deckId}/draw/?count=${count}`);
  }
}
