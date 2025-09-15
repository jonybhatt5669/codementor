import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter} from "react-router";
import './index.css'
import App from './App.tsx'
import {Toaster} from 'sonner'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

const queryClient = new QueryClient()
createRoot(document.getElementById('root')!).render(<StrictMode>
    <BrowserRouter>
        <QueryClientProvider client={queryClient}>
            <App/>
        </QueryClientProvider>
        <Toaster/>
    </BrowserRouter>
</StrictMode>,)
