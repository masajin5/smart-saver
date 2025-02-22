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
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

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

  const handleEdit = (transaction: Transaction) => {
    setEditingId(transaction.id);
    setEditData({ ...transaction });
  };

  const handleUpdate = async () => {
    if (!editingId) return;
    await updateTransaction({ ...editData });
    setEditingId(null);
    window.location.reload(); // 更新後に一覧を更新
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-4xl">
        <h2 className="text-xl font-bold text-gray-800 mb-4">取引一覧</h2>
        {loading ? (
          <p className="text-gray-600">読み込み中...</p>
        ) : transactions.length === 0 ? (
          <p className="text-gray-600">取引がありません</p>
        ) : (
          <Table className="w-full border border-gray-300 rounded-md shadow-sm">
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="p-2">日付</TableHead>
                <TableHead className="p-2">カテゴリ</TableHead>
                <TableHead className="p-2">金額</TableHead>
                <TableHead className="p-2">種類</TableHead>
                <TableHead className="p-2 text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((t) => (
                <TableRow key={t.id} className="border-b">
                  {editingId === t.id ? (
                    <>
                      <TableCell>
                        <Input
                          type="date"
                          value={editData.date}
                          onChange={(e) => setEditData({ ...editData, date: e.target.value })}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="text"
                          value={editData.category}
                          onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={editData.amount}
                          onChange={(e) =>
                            setEditData({ ...editData, amount: Number(e.target.value) })
                          }
                        />
                      </TableCell>
                      <TableCell>{editData.type === "income" ? "収入" : "支出"}</TableCell>
                      <TableCell className="flex gap-2 justify-end">
                        <Button onClick={handleUpdate} variant="default">
                          更新
                        </Button>
                        <Button onClick={() => setEditingId(null)} variant="secondary">
                          キャンセル
                        </Button>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell>{t.date.split("T")[0]}</TableCell>
                      <TableCell>{t.category}</TableCell>
                      <TableCell>{t.amount}円</TableCell>
                      <TableCell
                        className={t.type === "income" ? "text-green-600" : "text-red-600"}
                      >
                        {t.type === "income" ? "収入" : "支出"}
                      </TableCell>
                      <TableCell className="flex gap-2 justify-end">
                        <Button
                          onClick={() => handleEdit(t)}
                          variant="outline"
                          className="text-black"
                        >
                          編集
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="destructive">削除</Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>削除の確認</DialogTitle>
                            </DialogHeader>
                            <p>本当に削除しますか？</p>
                            <DialogFooter>
                              <Button onClick={() => handleDelete(t.id)} variant="destructive">
                                削除
                              </Button>
                              <Button variant="secondary">キャンセル</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
