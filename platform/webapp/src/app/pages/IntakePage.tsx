import { useState } from 'react';
import type { FormEvent } from 'react';
import { apiSend } from '../api';

export function IntakePage() {
  const [title, setTitle] = useState('');
  const [functionality, setFunctionality] = useState('recommend');
  const [dataType, setDataType] = useState('company');
  const [need, setNeed] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!title || !need) {
      setMessage('All three formula slots are required.');
      return;
    }
    setBusy(true);
    setMessage(null);
    try {
      const result = await apiSend<{ data: { id: string } }>(
        '/v1/candidates',
        'POST',
        {
          title,
          sponsorId: 'usr_demo',
          valueChainStep: 'claims_management',
          formula: {
            functionalitySpec: {
              functionality,
              description: `${functionality} for ${title}`,
            },
            dataDependencies: [
              {
                id: 'dep_intake',
                dataType,
                name: `${dataType} dependency`,
              },
            ],
            need: {
              audience: 'internal_customer',
              needCategory: 'operations',
              statement: need,
            },
          },
        },
        `intake-${Date.now()}`
      );
      setMessage(`Admitted ${result.data.id}`);
      setTitle('');
      setNeed('');
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Submit failed');
    } finally {
      setBusy(false);
    }
  }

  return (
    <section>
      <h2 className="page-title">Candidate intake</h2>
      <p className="page-lead">
        Admit only complete functionality × data × need formulas. Solution-first submissions stay
        out of the book.
      </p>
      <form className="panel stack" onSubmit={onSubmit}>
        <div className="field">
          <label htmlFor="title">Use-case title</label>
          <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="grid-2">
          <div className="field">
            <label htmlFor="x">x — Functionality</label>
            <select
              id="x"
              value={functionality}
              onChange={(e) => setFunctionality(e.target.value)}
            >
              <option value="inform">inform</option>
              <option value="recommend">recommend</option>
              <option value="decide">decide</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="y">y — Data</label>
            <select id="y" value={dataType} onChange={(e) => setDataType(e.target.value)}>
              <option value="company">company</option>
              <option value="public">public</option>
              <option value="third_party">third_party</option>
              <option value="customer">customer</option>
            </select>
          </div>
        </div>
        <div className="field">
          <label htmlFor="z">z — Need (not a solution)</label>
          <textarea
            id="z"
            rows={3}
            value={need}
            onChange={(e) => setNeed(e.target.value)}
            placeholder="e.g. Reduce time to first claims decision on motor glass"
          />
        </div>
        <button className="btn" type="submit" disabled={busy || !title || !need}>
          Submit for formula check
        </button>
        {message && <p>{message}</p>}
      </form>
    </section>
  );
}
