import Image from "next/image";
import { Card } from "@/app/ui/card";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24"> 
      <Card title="Skwarma" value="" type="invoices"/>
    </main>
  );
}
