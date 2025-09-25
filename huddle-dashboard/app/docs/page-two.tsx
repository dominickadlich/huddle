import { BellIcon } from "@heroicons/react/24/outline";
import SideNav from "../ui/docs/sidenav";
import Form from "../ui/dashboard/create-form";

export default function Example() {
  return (
    <div className="flex min-h-full w-screen flex-col border">
      <div className="mx-auto flex max-w-7xl items-start gap-x-8 px-4 py-10 sm:px-6 lg:px-8">
        <aside className="sticky mt-10 top-8 hidden w-76 shrink-0 lg:block border">
          {/* Left column area */}
          <SideNav />
        </aside>

        <main className="flex-1 border">
          {/* Main area */}
          <Form />
        </main>

        <aside className="mt-10 sticky top-8 hidden w-76 shrink-0 xl:block border">
          {/* Right column area */}
          <SideNav />
        </aside>
      </div>
    </div>
  );
}
