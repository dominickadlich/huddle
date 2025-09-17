import NavBar from "../ui/navbar";
import SideNav from "../ui/side-nav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex flex-col">
      {/* Top Navigation - Full Width */}
      <NavBar />

      <div className="flex-1 flex overflow-hidden">
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-12">{children}</main>
      </div>
    </div>
  );
}
