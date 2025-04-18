/**
 * Claves para el almacenamiento local del token de autenticación y el rol del usuario.
 */
export const AUTH_TOKEN_KEY = 'authToken';
export const USER_ROLE_KEY = 'userRole';

/**
 * Tipos válidos de rol de usuario.
 */
export type UserRole = 'patient' | 'doctor' | 'admin';
