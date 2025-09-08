import CardInnerWrapper from "@/components/CardInnerWrapper";
import ChatForm from "./ChatForm";
import { getMessageThread } from "@/app/actions/messageActions";
import MessageList from "./MessageList";
import { createChatId } from "@/lib/util";
import { getAuthUserId } from "@/app/actions/authActions";

export default async function ChatPage({ params }: { params: Promise<{ userId: string }> }) {
    const currentUserId = await getAuthUserId();
    const { userId } = await params
    const messages = await getMessageThread(userId);
    const chatId = createChatId(userId, currentUserId)

    return (
        <CardInnerWrapper
            header="Chat"
            body={
                <MessageList
                    initialMessages={messages}
                    currentUserId={currentUserId}
                    chatId={chatId}
                />
            }
            footer={
                <ChatForm />
            }
        />
    )
}