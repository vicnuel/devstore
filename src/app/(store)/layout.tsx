import { Header } from "@/components/header";
import { CardProvider } from "@/context/card-context";

export default function StoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CardProvider>
      <div className="mx-auto grid min-h-screen w-full max-w-[1600px] grid-rows-app gap-6 p-8">
        <Header />
        {children}
      </div>
    </CardProvider>
  );
}
