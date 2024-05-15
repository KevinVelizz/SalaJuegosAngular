import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../interfaces/message';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { MensajeChat } from '../interfaces/mensajeChat';
import { collection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private firestore: AngularFirestore) {
    
  }
  
  agregarDatos(mensaje:MensajeChat) {

    this.firestore.collection('mensajesChat').add(mensaje)
      .then(() => {
        console.log('Datos agregados correctamente');
      })
      .catch(error => {
        console.error('Error al agregar datos:', error);
      });
  }
  actualizarDatos(id: string, mensaje:MensajeChat) {
    this.firestore.collection('mensajesChat').doc(id).set(mensaje)
      .then(() => {
        console.log('Datos actualizados correctamente');
      })
      .catch(error => {
        console.error('Error al actualizar datos:', error);
      });
  }
  getDatosMensajes()
  {
    return this.firestore.collection('mensajesChat', ref => ref.orderBy('fecha'));
  }

  // agregarMensaje(mensaje: Message) {
  //   return this.datosUserCollection.add(mensaje);
  // }
}
