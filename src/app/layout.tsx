import "@/app/globals.css";
import Navbar from "@/components/navbar";

export const metadata = {
  title: "Smart Saver - 家計簿アプリ",
  description: "シンプルな家計簿アプリ",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="bg-gray-100">
        <Navbar />
        <main className="container mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
