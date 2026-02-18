/**
 * Representa al candidato obtenido de la API.
 * Endpoint: GET {BASE_URL}/api/candidate/get-by-email?email={TU_EMAIL}
 */
export interface Candidate {
  /** Identificador único universal del usuario */
  uuid: string;
  /** ID corto del candidato, usado para aplicar */
  candidateId: string;
  /** ID de la aplicación, parece redundante con candidateId pero la API lo devuelve */
  applicationId: string;
  firstName: string;
  lastName: string;
  email: string;
}

/**
 * Representa una posición laboral disponible.
 * Endpoint: GET {BASE_URL}/api/jobs/get-list
 */
export interface Job {
  /** ID numérico (en string) del trabajo. Ej: "4416372005" */
  id: string;
  /** Título del puesto. Ej: "Fullstack developer" */
  title: string;
}

/**
 * Payload necesario para enviar la postulación.
 * Endpoint: POST {BASE_URL}/api/candidate/apply-to-job
 */
export interface ApplicationPayload {
  uuid: string;
  jobId: string;
  candidateId: string;
  /** URL del repositorio público de GitHub */
  repoUrl: string;
}

export interface ApplicationResponse {
  ok: boolean;
}
