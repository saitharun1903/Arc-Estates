import React from "react";
import AdminSidebar from "@/components/admin/admin-sidebar";

export const metadata = {
  title: "Operations Console | ARC AVENUE Builders Admin",
  description: "Administrative control center for ARC Avenue properties, leads, and site visits.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0A0C0E] text-[#F4F1EA] flex flex-col md:flex-row antialiased">
      {/* Desktop & Tablet Sidebar */}
      <AdminSidebar />

      {/* Main Admin Workspace Area */}
      <main className="flex-1 min-w-0 bg-[#0C0E11] flex flex-col overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
