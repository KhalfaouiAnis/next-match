import PusherServer from "pusher";

// Singleton instance
let pusherServerInstance: PusherServer | null = null;

export function getPusherServerInstance(): PusherServer {
  if (!pusherServerInstance) {
    pusherServerInstance = new PusherServer({
      appId: process.env.PUSHER_APP_ID!,
      key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
      secret: process.env.PUSHER_SECRET!,
      cluster: "us3",
      useTLS: true,
    });
  }

  return pusherServerInstance;
}

export const pusherServer = getPusherServerInstance();
