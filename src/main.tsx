import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { PomodoroStartContextFragment } from './providers/PomodoroStartContextProvider.tsx'
import { PomodoroTimeContextFragment } from './providers/PomodoroTimeContextProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PomodoroStartContextFragment>
      <PomodoroTimeContextFragment>
        <App />
      </PomodoroTimeContextFragment>
    </PomodoroStartContextFragment>
  </StrictMode>,
)