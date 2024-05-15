import { Component } from '@angular/core';
import { TriviaService } from '../../../services/trivia.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-preguntados',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './preguntados.component.html',
  styleUrl: './preguntados.component.css'
})
export class PreguntadosComponent {
  preguntas: any[] = [];
  iniciar:boolean = false;
  preguntaActual: any;
  opcionesSeleccionadas: string[] = [];
  respuestaUsuario: string | null = null;
  resultado: string | null = null;
  lose:boolean = false;
  verificar:boolean = false;
  vidas: number = 5;

  constructor(private TriviaService: TriviaService) { }


  iniciarJuego() {
    this.iniciar = true;
    this.lose = false;
    this.TriviaService.getPreguntas().subscribe(data => {
      if (data.results) {
        this.preguntas = data.results;
        this.cargarNuevaPregunta();
      }
    });
  }

  cargarNuevaPregunta() {
    this.verificar = false;
    const indice = Math.floor(Math.random() * this.preguntas.length);
    this.preguntaActual = this.preguntas[indice];
    this.opcionesSeleccionadas = this.shuffle(
      this.preguntaActual.incorrect_answers.concat(this.preguntaActual.correct_answer)
    );
    this.respuestaUsuario = null;
    this.resultado = null;
  }

  verificarRespuesta() {
    this.verificar = true;
    if (this.respuestaUsuario === this.preguntaActual.correct_answer) {
      this.resultado = '¡Respuesta correcta!';
    } else {
      this.resultado = 'Respuesta incorrecta. La respuesta correcta es: ' + this.preguntaActual.correct_answer;
      this.vidas--;
      if (this.vidas === 0) {
        this.resultado = '¡Perdiste! Te quedaste sin vidas.';
        this.lose = true;
      }
    }
  }

  private shuffle(array: any[]) {
    return array.sort(() => Math.random() - 0.5);
  }

  reiniciar()
  {
    this.vidas = 5;
    this.iniciarJuego();
  }
}
