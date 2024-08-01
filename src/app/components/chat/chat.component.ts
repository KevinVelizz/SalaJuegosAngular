import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { text } from 'stream/consumers';
import { MessageService } from '../../services/message.service';
import { MensajeChat } from '../../interfaces/mensajeChat';
import * as firebase from 'firebase/app';
import 'firebase/firestore'; 
import { doc } from '@angular/fire/firestore';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  
  nuevoMensaje:string = "";
  usuarioUid:string = "";
  mensajes?:any = [];
  mostrarChat = false;

  constructor(private AuthService:AuthService, private MessageService:MessageService)
  {
    this.AuthService.user$.subscribe(usuario =>{
      if(usuario)
      {
        this.usuarioUid = usuario.uid;
      }
    });
    MessageService.getDatosMensajes().valueChanges().forEach(elemento=>{
      this.mensajes = elemento;
    });
  }

  mostrar(bool:boolean)
  {
    this.mostrarChat = bool;
    setTimeout(() => {
      this.scrollToTheLastElementByClassName();
    }, 30);
  }

  enviarMensaje()
  {
    if(this.nuevoMensaje == "") return
    let mensaje = {
      uid: this.usuarioUid,
      mensajes: this.nuevoMensaje,
      fecha: Date()
    }
    this.MessageService.agregarDatos(mensaje);
    this.nuevoMensaje = "";
    setTimeout(() => {
      this.scrollToTheLastElementByClassName();
    }, 30);
  }

  scrollToTheLastElementByClassName()
  {
    const elements = document.getElementsByClassName('msj');
    const ultimo: any = elements[(elements.length - 1)];
    const toppos = ultimo.offsetTop;
    const cardBody = document.querySelector("#card-body") as HTMLElement | null;
    if (cardBody) {
      cardBody.scrollTop = toppos;
    }
  }
}
