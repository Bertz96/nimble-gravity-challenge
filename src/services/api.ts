import type {
  Candidate,
  Job,
  ApplicationPayload,
  ApplicationResponse,
} from "../types";

// Obtenemos la URL base de las variables de entorno.
// IMPORTANTE: Asegurarse de tener un archivo .env con esta variable definida.
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Helper genérico para procesar respuestas HTTP.
 * * @template T - El tipo de dato que esperamos recibir (Ej: Candidate, Job[]).
 * Actúa como una "caja" que toma la forma de la interfaz que le pasemos.
 * * @param response - La respuesta cruda de fetch.
 * @returns Una promesa resuelta con los datos parseados como JSON tipo T.
 * @throws Error con el mensaje del servidor si el status no es OK.
 */
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    // Leemos el error como texto plano (.text()) por seguridad,
    // ya que los errores 500/404 a veces devuelven HTML y no JSON.
    const errorBody = await response.text();
    throw new Error(
      `API Error: ${response.status} - ${errorBody || response.statusText}`,
    );
  }
  return response.json();
}

/**
 * Obtiene los datos del candidato.
 * Endpoint: GET /api/candidate/get-by-email
 * * @param email - El email del candidato. Se envía como Query Param (?email=...)
 * @returns Promesa con los datos del candidato (UUID, nombre, etc.)
 */
export const getCandidate = async (email: string): Promise<Candidate> => {
  // Nota: encodeURIComponent es buena práctica por si el email tiene caracteres raros
  // (aunque no es común en emails, es una medida de seguridad).
  const response = await fetch(
    `${BASE_URL}/api/candidate/get-by-email?email=${encodeURIComponent(email)}`,
  );
  return handleResponse<Candidate>(response);
};

/**
 * Obtiene el listado de posiciones abiertas.
 * Endpoint: GET /api/jobs/get-list
 */
export const getJobs = async (): Promise<Job[]> => {
  const response = await fetch(`${BASE_URL}/api/jobs/get-list`);
  return handleResponse<Job[]>(response);
};

/**
 * Envía la postulación del candidato a una posición específica.
 * Endpoint: POST /api/candidate/apply-to-job
 * * @param payload - Objeto con los datos necesarios (Ids y URL del repo).
 */
export const applyToJob = async (
  payload: ApplicationPayload,
): Promise<ApplicationResponse> => {
  const response = await fetch(`${BASE_URL}/api/candidate/apply-to-job`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return handleResponse<ApplicationResponse>(response);
};
