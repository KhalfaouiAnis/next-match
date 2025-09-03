import CardInnerWrapper from "@/components/CardInnerWrapper";
import ChatForm from "./ChatForm";
import { getMessageThread } from "@/app/actions/messageActions";
import MessageBox from "./MessageBox";

export default async function ChatPage({ params }: { params: Promise<{ userId: string }> }) {
    const { userId } = await params
    const messages = await getMessageThread(userId);

    const body = (
        <div>
            {messages.length === 0 ? 'No messages' : (
                <div>
                    {messages.map(msg => (
                        <MessageBox key={msg.id} message={msg} currentUserId={userId} />
                    ))}
                </div>
            )}
        </div>
    )
    return (
        <CardInnerWrapper
            header="Chat"
            body={body}
            footer={
                <ChatForm />
            }
        />
    )
}