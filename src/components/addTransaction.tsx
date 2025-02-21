"use client";

import { useState } from "react";
import { addTransaction } from "@/hooks/useTransaction";

export default function AddTransaction() {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState<"income" | "expense">("expense");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // ← フォーム送信を防ぐ
    console.log("handleSubmit が呼ばれました！"); // デバッグログ

    if (!amount || !category) {
      alert("すべての項目を入力してください！");
      return;
    }

    await addTransaction({
      type,
      amount: Number(amount),
      category,
      date: new Date().toISOString(),
    });

    alert("取引を追加しました！");
    setAmount("");
    setCategory("");
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h2 className="text-xl font-bold">新しい取引を追加</h2>
      <input
        type="number"
        placeholder="金額"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="input"
      />
      <input
        type="text"
        placeholder="カテゴリ"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="input my-2"
      />
      <select
        value={type}
        onChange={(e) => setType(e.target.value as "income" | "expense")}
        className="input"
      >
        <option value="income">収入</option>
        <option value="expense">支出</option>
      </select>
      <button type="submit" className="button">
        追加
      </button>
    </form>
  );
}
