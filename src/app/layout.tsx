import type { Metadata } from "next";
import { Provider } from "@/components/ui/provider";
import Layout from "@/components/layout";

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
        <Provider>
          <Layout>
            {children}
          </Layout>
        </Provider>
      </body>
    </html>
  );
};
