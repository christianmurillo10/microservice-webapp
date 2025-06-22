import type { Metadata } from "next"
import { Provider } from "@/components/ui/provider"

export const metadata: Metadata = {
  title: "Microservice Webapp",
  description: "Web-based dashboard/portal application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
