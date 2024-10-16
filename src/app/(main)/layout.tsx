import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-grow overflow-y-auto ">
        <Header />
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
