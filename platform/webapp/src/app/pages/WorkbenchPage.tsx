export function WorkbenchPage({
  title,
  lead,
  badge,
}: {
  title: string;
  lead: string;
  badge: string;
}) {
  return (
    <section>
      <h2 className="page-title">{title}</h2>
      <p className="page-lead">{lead}</p>
      <div className="panel">
        <span className={`badge ${badge}`}>Queue</span>
        <p style={{ marginTop: '1rem' }}>
          Workbench scaffold is wired to the Formulary shell. Domain clients live under{' '}
          <code>src/services/domains/</code> and feature views under <code>src/features/</code>.
        </p>
      </div>
    </section>
  );
}
