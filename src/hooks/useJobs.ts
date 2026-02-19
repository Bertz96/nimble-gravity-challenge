import { useState, useEffect } from "react";
import { getJobs } from "../services/api";
import type { Job } from "../types";

/**
 * Custom hook para gestionar la obtención de trabajos disponibles.
 * Se encarga de manejar el ciclo de vida de la petición (carga, éxito, error).
 * * @returns Un objeto con:
 * - `jobs`: Array de trabajos (vacío inicialmente).
 * - `loading`: Estado de carga (true mientras se obtienen datos).
 * - `error`: Mensaje de error si la petición falla, o null si todo va bien.
 */
export const useJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Definimos la lógica asíncrona dentro del useEffect para evitar raceconditions y manejar el ciclo de vida correctamente.
    const fetchJobs = async () => {
      try {
        setLoading(true); // Iniciamos el estado de carga
        const data = await getJobs();
        setJobs(data);
      } catch (err) {
        // En TypeScript, el error en catch es de tipo 'unknown'.
        // Verificamos si es una instancia de Error para acceder al mensaje de forma segura.
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Ocurrió un error inesperado al cargar los trabajos.");
        }
      } finally {
        // El bloque finally se ejecuta siempre, haya error o éxito.
        // Aseguramos que el spinner de carga desaparezca.
        setLoading(false);
      }
    };

    fetchJobs();
  }, []); // Array de dependencias vacío = Se ejecuta solo una vez al montar el componente.

  return { jobs, loading, error };
};
