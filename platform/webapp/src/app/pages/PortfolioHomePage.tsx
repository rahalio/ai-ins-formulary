import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiGet } from '../api';

type Balance = {
  data: {
    period: string;
    discoveryShare: number;
    discoveryShareTarget: number;
    withinTarget: boolean;
    liveUseCases: number;
    killedUseCases: number;
    committedByQuadrant: Record<string, { amount: number; currency: string }>;
  };
};

const labels: Record<string, string> = {
  operations_efficacy: 'Operations efficacy',
  customer_efficacy: 'Customer efficacy',
  operations_discovery: 'Operations discovery',
  customer_discovery: 'Customer discovery',
};

export function PortfolioHomePage() {
  const [balance, setBalance] = useState<Balance['data'] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiGet<Balance>('/v1/portfolio/balance?period=2026-Q3')
      .then((res) => setBalance(res.data))
      .catch((err: Error) => setError(err.message));
  }, []);

  return (
    <section>
      <h2 className="page-title">Portfolio home</h2>
      <p className="page-lead">
        Are we balanced on discovery, and has finance booked what we claimed? Discovery share is a
        first-class dial so efficacy cost-cutting cannot silently own the envelope.
      </p>

      {error && <div className="panel">Could not load balance: {error}</div>}

      <div className="grid-2">
        <div className="panel">
          <h3>Value map</h3>
          <div className="quadrant-map" style={{ marginTop: '1rem' }}>
            {Object.keys(labels).map((key) => (
              <div className="quadrant" key={key}>
                <h3>{labels[key]}</h3>
                <p>
                  {balance?.committedByQuadrant?.[key]
                    ? `${balance.committedByQuadrant[key].amount.toLocaleString()} ${balance.committedByQuadrant[key].currency}`
                    : '—'}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="stack">
          <div className="panel">
            <h3>Discovery share</h3>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', margin: '0.4rem 0' }}>
              {balance ? `${Math.round(balance.discoveryShare * 100)}%` : '—'}
            </p>
            <span className={`badge ${balance?.withinTarget ? 'badge-mint' : 'badge-amber'}`}>
              {balance?.withinTarget ? 'Within target' : 'Below target'} · target{' '}
              {balance ? `${Math.round(balance.discoveryShareTarget * 100)}%` : '25%'}
            </span>
          </div>
          <div className="panel">
            <h3>Book status</h3>
            <p>
              Live <strong>{balance?.liveUseCases ?? 0}</strong> · Killed{' '}
              <strong>{balance?.killedUseCases ?? 0}</strong>
            </p>
            <p>
              <span className="badge badge-amber">Forecast</span> never wears the same badge as{' '}
              <span className="badge badge-mint">Booked</span>
            </p>
            <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1rem' }}>
              <Link className="btn" to="/committee">
                Open committee pack
              </Link>
              <Link className="btn btn-secondary" to="/intake">
                Admit candidate
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
