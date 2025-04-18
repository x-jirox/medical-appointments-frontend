/**
 * Interfaz que define la estructura de la respuesta que recibimos al registrar un usuario.
 */
export interface RegisterResponse {
  message: string;  // Mensaje de éxito o error devuelto por el servidor
  userId: string;   // ID único del usuario registrado
  email: string;    // Correo electrónico del usuario registrado
}
