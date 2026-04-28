import "./globals.css";

export const metadata = {
  title: "Bengaluru Nexus | 3D Digital Twin",
  description: "Advanced urban planning and simulation platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}
