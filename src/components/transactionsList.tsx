"use client";

import {
  useTransactions,
  deleteTransaction,
  updateTransaction,
  Transaction,
} from "@/hooks/useTransaction";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";

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
    await deleteTransaction(id);
    window.location.reload(); // 削除後に一覧を更新
  };

  const handleEdit = (transaction: any) => {
    setEditingId(transaction.id);
    setEditData({
      id: transaction.id,
      amount: Number(transaction.amount),
      category: transaction.category,
      type: transaction.type,
      date: transaction.date,
    });
  };

  const handleUpdate = async () => {
    if (!editingId) return;

    await updateTransaction({
      ...editData,
      id: editingId,
      amount: Number(editData.amount),
    });

    setEditingId(null);
    window.location.reload(); // 更新後に一覧を更新
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-lg">
        <h2 className="text-xl font-bold text-gray-800">取引一覧</h2>
        {loading ? (
          <p className="text-gray-600">読み込み中...</p>
        ) : transactions.length === 0 ? (
          <p className="text-gray-600">取引がありません</p>
        ) : (
          <ul>
            {transactions.map((t) => (
              <li
                key={t.id}
                className="border border-gray-300 p-3 my-2 flex justify-between items-center"
              >
                <span className="font-medium">
                  {t.date} - {t.category} - {t.amount}円 ({t.type === "income" ? "収入" : "支出"})
                </span>
                <div className="flex gap-4">
                  <Button
                    onClick={() => handleEdit(t)}
                    variant="outline"
                    className="text-black w-16 h-8"
                  >
                    編集
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="destructive" className="w-16 h-8">
                        削除
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>本当に削除しますか？</DialogHeader>
                      <DialogFooter>
                        <Button onClick={() => handleDelete(t.id)} variant="destructive">
                          削除
                        </Button>
                        <Button variant="secondary">キャンセル</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
