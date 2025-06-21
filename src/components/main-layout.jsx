"use client";
import { Sidebar } from "./sidebar"

export function MainLayout({
  children
}) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="lg:pl-64">
        <main className="p-4 lg:p-8 pt-16 lg:pt-8">{children}</main>
      </div>
    </div>
  );
}
