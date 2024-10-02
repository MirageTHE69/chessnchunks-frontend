import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="h-screen w-full flex">
      <Sidebar />
      <div className="flex-1 ">
        <Header />
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
}
