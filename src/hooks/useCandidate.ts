import { useState, useEffect } from "react";
import { getCandidate } from "../services/api";
import type { Candidate } from "../types";

/**
 * Custom hook para obtener la información del candidato.
 * * @param email - El correo electrónico del candidato a buscar.
 * @returns Un objeto con:
 * - `candidate`: Datos del candidato o null si no se ha cargado.
 * - `loading`: Estado de carga.
 * - `error`: Mensaje de error si falla.
 */
export const useCandidate = (email: string) => {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Si no hay email, no tiene sentido hacer la petición.
    if (!email) return;

    const fetchCandidate = async () => {
      try {
        setLoading(true);
        const data = await getCandidate(email);
        setCandidate(data);
        setError(null); // Limpiamos errores previos en caso de reintentos
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Error desconocido al obtener candidato.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCandidate();
  }, [email]); // Dependencia: Si el email cambia, se vuelve a ejecutar el useEffect.

  return { candidate, loading, error };
};
