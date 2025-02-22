"use client";

import {
  useTransactions,
  deleteTransaction,
  updateTransaction,
  Transaction,
} from "@/hooks/useTransaction";
import { useState } from "react";

export default function TransactionsList() {
  const { transactions, loading } = useTransactions();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Transaction>({
    id: "",
    amount: 0,
    category: "",
    type: "expense",
    date: "",
  });

  const handleDelete = async (id: string) => {
    if (!confirm("本当に削除しますか？")) return;
    await deleteTransaction(id);
    window.location.reload(); // 削除後に一覧を更新
  };

  const handleEdit = (transaction: any) => {
    setEditingId(transaction.id);
    setEditData({
      ...editData,
      amount: Number(transaction.amount),
      category: transaction.category,
      type: transaction.type,
    });
  };

  const handleUpdate = async () => {
    if (!editingId) return;

    await updateTransaction({
      ...editData,
      id: editingId,
      amount: Number(editData.amount),
      date: new Date().toISOString(),
    });

    setEditingId(null);
    window.location.reload(); // 更新後に一覧を更新
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
              {editingId === t.id ? (
                <div className="flex flex-col">
                  <input
                    type="number"
                    value={editData.amount}
                    onChange={(e) => setEditData({ ...editData, amount: Number(e.target.value) })}
                    className="border p-1"
                  />
                  <input
                    type="text"
                    value={editData.category}
                    onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                    className="border p-1 my-1"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleUpdate}
                      className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                    >
                      更新
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600"
                    >
                      キャンセル
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <span>
                    {t.date} - {t.category} - {t.amount}円 ({t.type === "income" ? "収入" : "支出"})
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(t)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                    >
                      編集
                    </button>
                    <button
                      onClick={() => handleDelete(t.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      削除
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
