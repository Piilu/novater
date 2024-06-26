import "~/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { TRPCReactProvider } from "~/trpc/react";
import { ToastContainer } from 'react-toastify';

export const metadata = {
  title: "Novater | Projekt",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
})
{
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <ToastContainer />
        <main className="container w-full py-5 px-2 md:w-[70%] md:px-4">
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </main>
      </body>
    </html>
  );
}
