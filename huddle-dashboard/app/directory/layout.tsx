import NavBar from "../ui/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900">

       {/* Animated Gradient Orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="w-full flex-none md:w-2">
        <NavBar />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}
