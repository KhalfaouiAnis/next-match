import { auth, signOut } from "@/auth";
import { Button } from "@heroui/button"

export default async function Home() {
  const session = await auth();

  return (
    <div className="flex flex-col justify-center items-center mt-20 gap-6 text-secondary">
      <h3 className="text-2xl font-semibold">User session data</h3>
      {
        session ? (
          <div>
            <pre>
              {JSON.stringify(session, null, 2)}
            </pre>
            <form action={async () => {
              'use server';
              await signOut();
            }}>
              <Button type="submit" color="primary" variant="bordered">Sign out</Button>
            </form>
          </div>
        ) : (
          <div>Not signed in</div>
        )
      }
    </div>
  );
}
