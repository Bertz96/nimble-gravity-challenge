import { useState } from "react";
import { Card } from "./ui/Card";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import type { Job } from "../types";

interface JobCardProps {
  job: Job;
  onApply: (jobId: string, repoUrl: string) => void;
  isSubmitting: boolean;
}

export const JobCard = ({ job, onApply, isSubmitting }: JobCardProps) => {
  const [repoUrl, setRepoUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUrl = repoUrl.trim();

    if (cleanUrl) {
      onApply(job.id, cleanUrl);
    }
  };

  return (
    <Card>
      <div className='flex justify-between items-start gap-4 mb-4'>
        <h3 className='text-xl font-bold text-slate-800 leading-tight'>
          {job.title}
        </h3>

        <span
          title={`Job ID: ${job.id}`}
          className='shrink-0 text-xs font-mono font-medium text-slate-500 bg-slate-100 border border-slate-200 px-2 py-1 rounded select-all'>
          Job ID: {job.id}
        </span>
      </div>

      <form
        onSubmit={handleSubmit}
        className='flex flex-col gap-3'>
        <label
          htmlFor={`repo-${job.id}`}
          className='text-sm font-medium text-slate-500'>
          URL del Repositorio GitHub
        </label>

        <div className='flex flex-col sm:flex-row gap-3'>
          <Input
            id={`repo-${job.id}`}
            type='url'
            required
            placeholder='https://github.com/tu-usuario/tu-repo'
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            disabled={isSubmitting}
            className='flex-1'
          />

          <Button
            type='submit'
            isLoading={isSubmitting}
            disabled={!repoUrl.trim()}>
            Submit
          </Button>
        </div>
      </form>
    </Card>
  );
};
