'use client'

import { HeroUIProvider } from '@heroui/system'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <HeroUIProvider>
            <ToastContainer position='top-right' hideProgressBar className="z-50" />
            {children}
        </HeroUIProvider>
    )
}