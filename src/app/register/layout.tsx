import "@/app/styles/globals.css";

export const metadata = {
  title: "IDLIFE - Cadastro",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
