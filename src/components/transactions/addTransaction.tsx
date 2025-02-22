"use client";

import { useState } from "react";
import { addTransaction } from "@/hooks/useTransaction";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function AddTransaction() {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState<"income" | "expense">("expense");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // フォーム送信を防ぐ
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
    <div className="flex justify-center">
      <Card className="w-full max-w-lg p-6">
        <CardHeader>
          <h2 className="text-xl font-bold text-gray-800">新しい取引を追加</h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              type="number"
              placeholder="金額"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <Input
              type="text"
              placeholder="カテゴリ"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <Select value={type} onValueChange={(value) => setType(value as "income" | "expense")}>
              <SelectTrigger className="bg-white text-black">
                <SelectValue placeholder="取引の種類" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="income">収入</SelectItem>
                <SelectItem value="expense">支出</SelectItem>
              </SelectContent>
            </Select>
            <Button type="submit" className="w-full h-10" variant="default">
              追加
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
