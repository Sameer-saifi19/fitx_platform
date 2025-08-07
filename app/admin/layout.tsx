import { SidebarProvider } from "@/components/ui/sidebar";
import  AppSidebar  from "@/components/appsidebar"
import Navbar from "@/components/navbar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider suppressHydrationWarning>
      <AppSidebar/>
      <main className="w-full">
        <Navbar/>
        <div className="px-4">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
