import localFont from "next/font/local";
import "./globals.css";
import NextAuSessionProvider from "@/provider/NextAuSessionProvider";
import { ProvidersChakra } from "@/provider/ChakraProviders";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900"
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900"
});

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <NextAuSessionProvider>
          <ProvidersChakra>{children}</ProvidersChakra>
        </NextAuSessionProvider>
      </body>
    </html>
  );
}
