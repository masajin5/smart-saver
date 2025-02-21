"use client";

import { useTransactions, deleteTransaction } from "@/hooks/useTransaction";

export default function TransactionsList() {
  const { transactions, loading } = useTransactions();

  const handleDelete = async (id: string) => {
    if (!confirm("本当に削除しますか？")) return;
    await deleteTransaction(id);
    window.location.reload(); // 削除後に一覧を更新
  };

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-bold text-gray-800">取引一覧</h2>
      {loading ? (
        <p className="text-gray-600">読み込み中...</p>
      ) : transactions.length === 0 ? (
        <p className="text-gray-600">取引がありません</p>
      ) : (
        <ul>
          {transactions.map((t) => (
            <li key={t.id} className="border border-gray-300 p-2 my-2 flex justify-between">
              <span>
                {t.date} - {t.category} - {t.amount}円 ({t.type === "income" ? "収入" : "支出"})
              </span>
              <button
                onClick={() => handleDelete(t.id)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                削除
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
