import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { UserContextProvider } from './context/userContext.jsx'
import { CourseContextProvider } from './context/courseContext.jsx'
export const server='http://localhost:8080'
createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <UserContextProvider>
      <CourseContextProvider>
        <App/>
      </CourseContextProvider>
    </UserContextProvider>
  // </StrictMode>,
)
