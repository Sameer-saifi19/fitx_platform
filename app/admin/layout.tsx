import { SidebarProvider } from "@/components/ui/sidebar";
import  AdminSidebar  from "@/components/adminSidebar"
import Navbar from "@/components/navbar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider suppressHydrationWarning>
      <AdminSidebar/>
      <main className="w-full">
        <Navbar/>
        <div className="px-4">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
