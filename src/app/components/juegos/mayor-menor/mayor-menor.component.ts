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
  cartaSiguiente: any;
  puntos = 0;
  perdiste = false;

  constructor(private cardService: CardService) { }

  iniciarJuego() {
    this.puntos = 0;
    this.perdiste = false;
    this.cardService.getNewDeck().subscribe(deck => {
      this.deckId = deck.deck_id;
      this.drawCards(1);
    });
  }

  drawCards(count: number) {
    this.cardService.drawCards(this.deckId, count).subscribe(data => {
      const cartas = data.cards;
      this.cartaActual = this.sanitizarValor(cartas[0]);
    });
  }

  play(cartaAdivinar: string) { 
    this.cardService.drawCards(this.deckId, 1).subscribe(data => {
      const cartas = data.cards;
      this.cartaSiguiente = this.sanitizarValor(cartas[0]);
      if (
        (cartaAdivinar === 'mayor' && parseInt(this.cartaActual.value) < parseInt(this.cartaSiguiente.value)) ||
        (cartaAdivinar === 'menor' && parseInt(this.cartaActual.value) > parseInt(this.cartaSiguiente.value))
      ) {
        this.puntos = this.puntos + 10;
      } else if(this.puntos > 0 && this.cartaActual.value != this.cartaSiguiente.value) {
        this.puntos = this.puntos - 5;
      }
      this.cartaActual = this.cartaSiguiente;
    });
  }

  sanitizarValor(carta:any)
  {
    if (["KING", "QUEEN", "JACK"].includes(carta.value))
    {
      carta.value = 10;
    }
    else if(carta.value === "ACE")
    {
      carta.valor = 1;
    }
    return carta;
  }

}
