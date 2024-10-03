import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="h-screen w-full flex overflow-hidden ">
      <Sidebar />
      <div className="flex-1 h-full ">
        <Header />
        <main className="p-4  h-full overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
