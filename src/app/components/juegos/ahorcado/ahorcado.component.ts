import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ahorcado',
  standalone: true,
  imports: [],
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.css'
})
export class AhorcadoComponent {
  letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  palabra = '';
  palabraSecreta = '';
  letraClick: string[] = [];
  errors = 0;
  perdiste:boolean = false;
  ganaste:boolean = false;
  empezo:boolean = false;
  vidas:number = 7;
  ahorcado:number = 1;

  constructor(private http: HttpClient) {}

  ngOnInit() {
  }
    
  iniciarJuego()
  {
    this.http.get<any>('assets/palabras.json').subscribe(data => {
      const palabras = data.palabras;
      this.palabraSecreta = palabras[Math.floor(Math.random() * palabras.length)];
      this.palabra = '_'.repeat(this.palabraSecreta.length);
      this.perdiste = false;
      this.letraClick = [];
      this.errors = 0;
      this.empezo = true;
      this.vidas = 6;
      this.ahorcado = 1;
    });
  }

  verLetras(letter: string) {
    if (this.palabra.includes(letter)) {
      return;
    }
    this.letraClick.push(letter);
    if (this.palabraSecreta.includes(letter)) {
      let newpalabra = '';
      for (let i = 0; i < this.palabraSecreta.length; i++) {
        if (this.palabraSecreta[i] === letter) {
          newpalabra += letter;
        } else {
          newpalabra += this.palabra[i];
        }
      }
      this.palabra = newpalabra;

      if (this.palabra === this.palabraSecreta) {
    
        this.perdiste = true;
        this.ganaste = true;
        this.empezo = false;
      }
    } else {
      this.errors++;
      this.vidas--;
      this.ahorcado++;
      if (this.errors === 6) {
        this.ahorcado++;
        this.perdiste = true;
        this.empezo = false;
      }
    }
  }

  nuevoJuego() {
    this.palabra = '';
    this.letraClick = [];
    this.errors = 0;
    this.perdiste = false;
    this.ganaste = false;
    this.empezo = false;
    this.vidas = 7;
    this.ahorcado = 1;
    this.iniciarJuego();
  }
}
