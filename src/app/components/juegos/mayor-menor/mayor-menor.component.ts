import { Component } from '@angular/core';
import { CardService } from '../../../services/card.service';

@Component({
  selector: 'app-mayor-menor',
  standalone: true,
  imports: [],
  templateUrl: './mayor-menor.component.html',
  styleUrl: './mayor-menor.component.css'
})
export class MayorMenorComponent {
  deckId = '';
  cartas: any[] = [];
  cartaActual: any;
  puntos = 0;
  perdiste = false;

  constructor(private cardService: CardService) { }

  iniciarJuego() {
    this.puntos = 0;
    this.perdiste = false;
    this.cardService.getNewDeck().subscribe(deck => {
      this.deckId = deck.deck_id;
      this.drawCards(2);
    });
  }

  drawCards(count: number) {
    this.cardService.drawCards(this.deckId, count).subscribe(data => {
      if (data.success && data.cards.length >= count) {
        this.cartas = data.cards;
        this.cartaActual = this.cartas[0];
      } else {
        this.perdiste = true;
      }
    });
  }

  play(guess: string) {
    if (this.perdiste) return;

    const nextCard = this.cartas[1];
    if (
      (guess === 'mayor' && nextCard.value > this.cartaActual.value) ||
      (guess === 'menor' && nextCard.value < this.cartaActual.value)
    ) {
      this.puntos++;
    } else if(this.puntos > 0) {
      this.puntos--;
    }

    this.cartas.shift();
    this.cartaActual = nextCard;

    if (this.cartas.length > 1) {
      this.drawCards(1);
    } else {
      this.perdiste = true;
    }

    if (this.perdiste) return;
  }
}
