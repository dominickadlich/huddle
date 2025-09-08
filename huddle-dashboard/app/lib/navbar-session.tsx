// NavBar.tsx (Server Component)
import { auth } from '@/auth'
import NavBar from '../ui/navbar'
import { handleSignOut } from './auth-actions'

export default async function NavBarSession() {
  const session = await auth() // This handles the session logic

  return (
    <NavBar
      hasSession={!!session?.user}
      signOutAction={handleSignOut}
    />
  )
}