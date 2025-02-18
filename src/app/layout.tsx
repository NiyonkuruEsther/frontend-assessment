
import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/contexts/AppContext";
import { PatientProvider } from "@/contexts/PatientContext";


export const metadata: Metadata = {
  title: "Nimucure",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        <AppProvider> 
        <PatientProvider>  {children}</PatientProvider>
        </AppProvider>
      
      </body>
    </html>
  );
}