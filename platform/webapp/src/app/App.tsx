import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppShell } from './AppShell';
import { PortfolioHomePage } from './pages/PortfolioHomePage';
import { IntakePage } from './pages/IntakePage';
import { PipelinePage } from './pages/PipelinePage';
import { CommitteePage } from './pages/CommitteePage';
import { WorkbenchPage } from './pages/WorkbenchPage';

export function App() {
  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<PortfolioHomePage />} />
          <Route path="/intake" element={<IntakePage />} />
          <Route path="/pipeline" element={<PipelinePage />} />
          <Route
            path="/readiness"
            element={
              <WorkbenchPage
                title="Data readiness"
                lead="Per-dependency verdict on availability, quality, permission, and book coverage."
                badge="badge-amber"
              />
            }
          />
          <Route
            path="/conduct"
            element={
              <WorkbenchPage
                title="Conduct gate"
                lead="Proxy and feature risk review before anything touches rating, renewal, or claims decisions."
                badge="badge-coral"
              />
            }
          />
          <Route
            path="/investment"
            element={
              <WorkbenchPage
                title="Investment gate"
                lead="First-release sizing, kill criteria, and benefit in loss-ratio and expense-ratio terms."
                badge="badge-blue"
              />
            }
          />
          <Route
            path="/registry"
            element={
              <WorkbenchPage
                title="Model registry"
                lead="Every production model needs an owner. Unowned models are incidents."
                badge="badge-coral"
              />
            }
          />
          <Route
            path="/benefits"
            element={
              <WorkbenchPage
                title="Benefit close"
                lead="Finance confirms booked movement. Forecast never equals realised."
                badge="badge-mint"
              />
            }
          />
          <Route path="/committee" element={<CommitteePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  );
}
