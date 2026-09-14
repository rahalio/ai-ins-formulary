import { useEffect, useState } from 'react';
import { apiGet } from '../api';

export function CommitteePage() {
  const [pack, setPack] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiGet<{ data: Record<string, unknown> }>('/v1/portfolio/committee-pack?period=2026-Q3')
      .then((res) => setPack(res.data))
      .catch((err: Error) => setError(err.message));
  }, []);

  return (
    <section>
      <h2 className="page-title">Committee pack</h2>
      <p className="page-lead">
        Sole quarterly basis for further funding: spend, balance, booked benefit, kills, and
        blockers.
      </p>
      {error && <div className="panel">{error}</div>}
      <div className="panel">
        <pre style={{ whiteSpace: 'pre-wrap', margin: 0 }}>
          {pack ? JSON.stringify(pack, null, 2) : 'Loading pack…'}
        </pre>
      </div>
    </section>
  );
}
