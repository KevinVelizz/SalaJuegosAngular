import { Component } from '@angular/core';
import { CardService } from '../../../services/card.service';

@Component({
  selector: 'app-black-jack',
  standalone: true,
  imports: [],
  templateUrl: './black-jack.component.html',
  styleUrl: './black-jack.component.css'
})
export class BlackJackComponent {
  deckId!: string;
  jugador: any[] = [];
  dealer: any[] = [];
  jugadorPuntos = 0;
  dealerPuntos = 0;
  cartas: any[] = [];
  usuarioTermino: boolean = false;
  contador:number = 1;
  start: boolean = false;
  dealerJugando:boolean = false; 
  resultado:string = "";

  constructor(private CardService: CardService){
    this.generarDeck();
  }

  async generarDeck() {
    this.CardService.getNewDeck().subscribe(deck => {
      this.deckId = deck.deck_id;
    });
  }

  async jugar()
  {
    this.start = true;
    this.CardService.drawCards(this.deckId, 2).subscribe(async data => {
      this.cartas = data.cards;
      this.jugador.push(this.cartas[0]);
      this.jugadorPuntos = this.calcularValores(this.jugador);
      await this.delay(1000);
      this.dealer.push(this.cartas[1]);
      this.dealerPuntos = this.calcularValores(this.dealer);
    });
  }

  volverAJugar()
  {
    this.jugadorPuntos = 0;
    this.dealerPuntos = 0;
    this.jugador = [];
    this.dealer = [];
    this.usuarioTermino = false;
    this.dealerJugando = false;
    this.resultado = "";
    this.jugar();
  }

  async pedir() {
    if(this.jugadorPuntos < 21)
    {
      this.CardService.drawCards(this.deckId, 1).subscribe(async data => {
        this.cartas = data.cards;
        const card = this.cartas[0];
        this.jugador.push(card);
        this.jugadorPuntos = this.calcularValores(this.jugador);
        if(this.jugadorPuntos > 21)
        {
          await this.delay(1000);
          this.resultado = "Perdiste";
          this.dealerJugando = true;
        }
      });
    }
  }

  async saltar(): Promise<void> {
      this.usuarioTermino = true;
    if(this.jugadorPuntos <= 21)
    {
      this.CardService.drawCards(this.deckId, 10).subscribe(async data => {
        this.cartas = data.cards;
        this.dealerJugando = true;
        while(this.dealerPuntos < 21 && this.dealerPuntos <= this.jugadorPuntos && this.dealerPuntos != 21)
        {
          const card = this.cartas[this.contador];
          this.contador++;
          this.dealer.push(card);
          this.dealerPuntos = this.calcularValores(this.dealer);
          await this.delay(1500);
        } 

        if (this.dealerPuntos > 21) {
          this.resultado = "El dealer se pasó de 21. ¡Ganaste!";
        } else if (this.dealerPuntos > this.jugadorPuntos) {
          this.resultado = "El dealer tiene una mano mejor. ¡Perdiste!";
        } else if (this.dealerPuntos === this.jugadorPuntos) {
          this.resultado = "Empate.";
        }
        else if(this.jugadorPuntos > 21)
        {
          this.resultado = "Perdiste.";
        }
        else {
          this.resultado = "¡Ganaste!.";
        }
      });
    }
    
     

  }
    
  calcularValores(hand: any[]): number {
    let valor = 0;
    let contadorAs = 0;
  
    hand.forEach(carta => {
      if (carta.value === "ACE") {
        contadorAs++;
      } else if (["KING", "QUEEN", "JACK"].includes(carta.value)) {
        valor += 10;
      } else {
        valor += parseInt(carta.value);
      }
    });
  
    while (contadorAs > 0 && valor + 11 <= 21) {
      valor += 11;
      contadorAs--;
    }
    while (contadorAs > 0) {
      valor += 1;
      contadorAs--;
    }
    return valor;
  }

  delay(ms: number): Promise<void> {
    return new Promise<void>(resolve => setTimeout(resolve, ms));
  }
}
