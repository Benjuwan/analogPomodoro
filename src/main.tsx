import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { PomodoroStartContextFragment } from './providers/PomodoroStartContext.tsx'
import { PomodoroTimeContextFragment } from './providers/PomodoroTimeContext.tsx'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PomodoroStartContextFragment>
      <PomodoroTimeContextFragment>
        <App />
      </PomodoroTimeContextFragment>
    </PomodoroStartContextFragment>
  </StrictMode>,
)
