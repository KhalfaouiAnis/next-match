import PusherClient from "pusher-js";

// Singleton instance
let pusherClientInstance: PusherClient | null = null;

export function getPusherClientInstance(): PusherClient {
  if (!pusherClientInstance) {
    pusherClientInstance = new PusherClient(
      process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
      {
        channelAuthorization: {
          endpoint: "/api/pusher-auth",
          transport: "ajax",
        },
        cluster: "us3",
      }
    );
  }

  return pusherClientInstance;
}

export const pusherClient = getPusherClientInstance();
