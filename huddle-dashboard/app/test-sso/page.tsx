import { auth } from "@/auth"
import { SignInButton, SignOutButton } from "../ui/test-sso/auth-buttons"

export default async function TestSSO() {
  const session = await auth()

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">SSO Test</h1>
      
      {session ? (
        <div className="space-y-2">
          <p>✅ Logged in!</p>
          <p>ID: {session.user?.id}</p>
          <p>Name: {session.user?.name}</p>
          <p>Email: {session.user?.email}</p>
          <pre className="bg-gray-100 p-4 rounded">
            {JSON.stringify(session, null, 2)}
          </pre>
         <SignOutButton />
        </div>
      ) : (
        <div>
          <p>❌ Not logged in</p>
          <SignInButton />
        </div>
      )}
    </div>
  )
}