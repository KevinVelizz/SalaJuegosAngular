import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../interfaces/message';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private mensajesCollection: AngularFirestoreCollection<Message>;
  mensajes: Observable<Message[]>;

  constructor(private firestore: AngularFirestore) {
    this.mensajesCollection = this.firestore.collection<Message>('mensajes');
    this.mensajes = this.mensajesCollection.valueChanges();
  }

  agregarMensaje(mensaje: Message) {
    return this.mensajesCollection.add(mensaje);
  }
}
