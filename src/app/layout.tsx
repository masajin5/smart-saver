import "@/app/globals.css";

export const metadata = {
  title: "Smart Saver - 家計簿アプリ",
  description: "シンプルな家計簿アプリ",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="bg-gray-100">
        <main className="container mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
