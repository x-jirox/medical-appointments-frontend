export interface LoginResponse {
    token: string;  // El JWT token
    role: string;   // El rol del usuario (patient, doctor, admin)
  }
  