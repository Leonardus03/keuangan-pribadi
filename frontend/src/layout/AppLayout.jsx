import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AppLayout({ children, onOpenModal, onLogout }) {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar onLogout={onLogout} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar onOpenModal={onOpenModal} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
