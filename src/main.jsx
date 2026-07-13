import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// ===================================================
// SECURITY: Block right-click, DevTools shortcuts,
// and image saving attempts
// ===================================================

// Disable right-click context menu globally
document.addEventListener('contextmenu', (e) => e.preventDefault());

// Block keyboard shortcuts that open DevTools or save content
document.addEventListener('keydown', (e) => {
  // F12
  if (e.key === 'F12') { e.preventDefault(); return; }
  // Ctrl/Cmd + Shift + I (Inspect)
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'I') { e.preventDefault(); return; }
  // Ctrl/Cmd + Shift + J (Console)
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'J') { e.preventDefault(); return; }
  // Ctrl/Cmd + Shift + C (Inspector)
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'C') { e.preventDefault(); return; }
  // Ctrl/Cmd + U (View Source)
  if ((e.ctrlKey || e.metaKey) && e.key === 'u') { e.preventDefault(); return; }
  // Ctrl/Cmd + S (Save)
  if ((e.ctrlKey || e.metaKey) && e.key === 's') { e.preventDefault(); return; }
  // Ctrl/Cmd + A (Select all)
  if ((e.ctrlKey || e.metaKey) && e.key === 'a') { e.preventDefault(); return; }
  // Ctrl/Cmd + P (Print)
  if ((e.ctrlKey || e.metaKey) && e.key === 'p') { e.preventDefault(); return; }
});

// Disable drag on all images
document.addEventListener('dragstart', (e) => {
  if (e.target.tagName === 'IMG') e.preventDefault();
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
