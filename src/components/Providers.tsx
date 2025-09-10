'use client'

import { getUnreadMessageCount } from '@/app/actions/messageActions'
import { useMessageStore } from '@/hooks/useMessageStore'
import { useNotificationChannel } from '@/hooks/useNotificationChannel'
import { usePresenceChannel } from '@/hooks/usePresenceChannel'
import { HeroUIProvider } from '@heroui/system'
import { SessionProvider } from 'next-auth/react'
import { useCallback, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { useShallow } from 'zustand/shallow'

export function Providers({ children, userId, profileComplete }:
    { children: React.ReactNode, userId: string | null, profileComplete: boolean }) {
    const { updateUnreadCount } = useMessageStore(useShallow(state => state));

    const setUnreadCount = useCallback((amount: number) => {
        updateUnreadCount(amount)
    }, [updateUnreadCount])

    useEffect(() => {
        if (userId) {
            getUnreadMessageCount().then(count => {
                setUnreadCount(count)
            })
        }
    }, [userId, setUnreadCount])

    usePresenceChannel(userId, profileComplete);
    useNotificationChannel(userId, profileComplete)

    return (
        <SessionProvider>
            <HeroUIProvider>
                <ToastContainer position='top-right' hideProgressBar className="z-50" />
                {children}
            </HeroUIProvider>
        </SessionProvider>
    )
}