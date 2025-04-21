import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './shared/authentication/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {

}

/*Investigar acerca de sokets para mensajes 

Qué debo aprender para usar Socket.IO en Angular
✅ WebSockets / Socket.IO
Cómo funciona la comunicación en tiempo real.

Métodos básicos: connect, disconnect, on, emit.

✅ Socket.IO en Angular
Uso de socket.io-client.

Crear un servicio Angular para manejar la conexión.

Escuchar y emitir eventos desde componentes.

✅ Autenticación con JWT
Obtener y guardar el token al hacer login.

Enviar el token en la conexión del socket.

Validar el token en el servidor usando io.use().

✅ Backend con Socket.IO
Inicializar el servidor Socket.IO.

Validar el token en el handshake.

Identificar al usuario conectado y manejar sus eventos.
*/
