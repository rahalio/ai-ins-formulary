import { useEffect, useMemo, useState } from 'react';
import { apiGet } from '../api';

type Candidate = {
  id: string;
  title: string;
  stage: string;
  valuePosition?: { quadrant?: string };
};

const columns = [
  'submitted',
  'formula_accepted',
  'readiness_assessment',
  'conduct_gate',
  'awaiting_investment',
  'in_delivery',
  'live',
  'benefit_close',
  'killed',
  'closed',
] as const;

const visible = [
  'formula_accepted',
  'readiness_assessment',
  'conduct_gate',
  'awaiting_investment',
  'in_delivery',
  'benefit_close',
] as const;

export function PipelinePage() {
  const [items, setItems] = useState<Candidate[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiGet<{ data: { items: Candidate[] } }>('/v1/candidates')
      .then((res) => setItems(res.data.items))
      .catch((err: Error) => setError(err.message));
  }, []);

  const byStage = useMemo(() => {
    const map: Record<string, Candidate[]> = Object.fromEntries(
      columns.map((stage) => [stage, []])
    );
    for (const item of items) {
      (map[item.stage] ??= []).push(item);
    }
    return map;
  }, [items]);

  return (
    <section>
      <h2 className="page-title">Gated pipeline</h2>
      <p className="page-lead">
        Every candidate by gate stage with owning function visible. Readiness ≠ conduct ≠ investment.
      </p>
      {error && <div className="panel">{error}</div>}
      <div className="pipeline">
        {visible.map((stage) => (
          <div className="pipeline-col" key={stage}>
            <h3>{stage.replaceAll('_', ' ')}</h3>
            {(byStage[stage] ?? []).map((item) => (
              <div className="pill-card" key={item.id}>
                <strong>{item.title}</strong>
                <div>
                  <span className="badge badge-blue">{item.id.slice(0, 12)}…</span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
