import { useState } from "react";
import { useJobs } from "./hooks/useJobs";
import { useCandidate } from "./hooks/useCandidate";
import { applyToJob } from "./services/api";
import { JobCard } from "./components/JobCard";
import { Card } from "./components/ui/Card";
import type { ApplicationPayload } from "./types";

const CANDIDATE_EMAIL = "cervinobernabe@gmail.com";

function App() {
  const { jobs, loading: loadingJobs, error: errorJobs } = useJobs();
  const {
    candidate,
    loading: loadingCandidate,
    error: errorCandidate,
  } = useCandidate(CANDIDATE_EMAIL);

  const [submittingId, setSubmittingId] = useState<string | null>(null);

  const handleApply = async (jobId: string, repoUrl: string) => {
    // Validar que existen datos de sesión antes de intentar el envío
    if (!candidate) {
      alert("Error: No se han cargado los datos del candidato.");
      return;
    }

    try {
      setSubmittingId(jobId);

      // Construcción del payload según especificación del Step 5
      const payload: ApplicationPayload = {
        uuid: candidate.uuid,
        candidateId: candidate.candidateId,
        jobId: jobId,
        repoUrl: repoUrl,
      };

      // Log para auditoría de datos antes del envío
      console.log("Submitting application payload:", payload);

      await applyToJob(payload);

      alert("Postulación enviada correctamente.");
    } catch (error) {
      console.error("Error submitting application:", error);
      const message =
        error instanceof Error ? error.message : "Error desconocido";
      alert(`Error al enviar: ${message}`);
    } finally {
      setSubmittingId(null);
    }
  };

  return (
    <div className='min-h-screen bg-slate-50 py-12 px-4 flex justify-center font-sans'>
      <div className='w-full max-w-2xl space-y-8'>
        {/* Header */}
        <div className='text-center space-y-2'>
          <h1 className='text-3xl font-bold text-slate-900'>
            Challenge: Job List
          </h1>

          {/* Estado de carga del candidato */}
          <div className='flex justify-center h-6'>
            {loadingCandidate && (
              <span className='text-xs font-medium text-blue-600 animate-pulse'>
                Cargando sesión...
              </span>
            )}

            {errorCandidate && (
              <span className='text-xs font-medium text-red-500'>
                Error de conexión
              </span>
            )}

            {candidate && (
              <div className='flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-full shadow-sm'>
                <span className='w-2 h-2 rounded-full bg-emerald-500'></span>
                <span className='text-xs font-medium text-slate-600'>
                  {candidate.firstName} {candidate.lastName}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Listado de trabajos */}
        <section className='space-y-4'>
          {loadingJobs && (
            <p className='text-center text-slate-400 text-sm'>
              Cargando posiciones...
            </p>
          )}

          {errorJobs && (
            <Card className='bg-red-50 border-red-200 text-red-700 text-center p-4'>
              {errorJobs}
            </Card>
          )}

          <div className='grid gap-4'>
            {jobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onApply={handleApply}
                isSubmitting={submittingId === job.id}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
