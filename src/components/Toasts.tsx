import { MessageDto } from "@/types";
import { toast } from "react-toastify";
import NotificationToast from "./NotificationToast";

export const newMessageToast = (message: MessageDto) => {
    toast(
        <NotificationToast
            href={`/members/${message.senderId}/chat`}
            title={`${message.senderName} has sent you a new message`}
            image={message.senderImage}
        />
    );
}

export const newLikeToast = (name: string, image: string | null, userId: string) => {
    toast(
        <NotificationToast
            href={`/members/${userId}`}
            title={`You have been liked by ${name}`}
            image={image}
        />
    )
}