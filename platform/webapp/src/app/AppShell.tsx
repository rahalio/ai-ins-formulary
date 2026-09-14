import { NavLink } from 'react-router-dom';
import type { ReactNode } from 'react';

const links = [
  { to: '/', label: 'Portfolio home' },
  { to: '/intake', label: 'Candidate intake' },
  { to: '/pipeline', label: 'Gated pipeline' },
  { to: '/readiness', label: 'Data readiness' },
  { to: '/conduct', label: 'Conduct gate' },
  { to: '/investment', label: 'Investment' },
  { to: '/registry', label: 'Model registry' },
  { to: '/benefits', label: 'Benefit close' },
  { to: '/committee', label: 'Committee pack' },
];

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="app-shell">
      <aside className="side-nav">
        <h1 className="brand">Formulary</h1>
        <p className="brand-sub">Pharmacy-style register for insurance AI use cases</p>
        <nav className="nav-list">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="main">{children}</main>
    </div>
  );
}
