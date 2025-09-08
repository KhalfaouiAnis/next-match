"use client";

import { MessageDto } from "@/types";
import MessageBox from "./MessageBox";
import { useCallback, useEffect, useRef, useState } from "react";
import { pusherClient } from "@/lib/pusher-client";
import { formatShortDateTime } from "@/lib/util";
import { useMessageStore } from "@/hooks/useMessageStore";
import { useShallow } from "zustand/shallow";
import { Channel } from "pusher-js";

type Props = {
    initialMessages: { messages: MessageDto[], readCount: number }
    currentUserId: string
    chatId: string
}

export default function MessageList({ initialMessages, currentUserId, chatId }: Props) {
    const [messages, setMessages] = useState(initialMessages.messages);
    const updateUnreadCount = useMessageStore(useShallow(state => state.updateUnreadCount))
    const channelRef = useRef<Channel | null>(null);
    const setReadCount = useRef(false);

    const handleNewMessage = useCallback((message: MessageDto) => {
        setMessages(msgs => [...msgs, message])
    }, [])

    const handleReadMessages = useCallback((messageIds: string[]) => {
        setMessages(msgs => msgs.map(msg => messageIds.includes(msg.id) ?
            { ...msg, dateRead: formatShortDateTime(new Date()) } : msg
        ))
    }, [])

    useEffect(() => {
        if (!setReadCount.current) {
            updateUnreadCount(-initialMessages.readCount);
            setReadCount.current = true
        }
    }, [initialMessages.readCount, updateUnreadCount])

    useEffect(() => {
        if (!channelRef.current) {
            channelRef.current = pusherClient.subscribe(chatId);

            channelRef.current.bind('message:new', handleNewMessage)
            channelRef.current.bind('messages:read', handleReadMessages)
        }

        return () => {
            if (channelRef.current && channelRef.current.subscribed) {
                channelRef.current.unsubscribe();
                channelRef.current.unbind_all()
            }
        }
    }, [chatId, handleNewMessage, handleReadMessages])

    return (
        <div>
            {messages.map(msg => (
                <MessageBox key={msg.id} message={msg} currentUserId={currentUserId} />
            ))}
        </div>
    );
}
