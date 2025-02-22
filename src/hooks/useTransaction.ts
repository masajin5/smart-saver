import { useEffect, useState } from "react";
import supabase from "@/lib/supabase";

export interface Transaction {
  id: string;
  type: "income" | "expense" | "";
  amount: number;
  category: string;
  date: string;
}

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .order("date", { ascending: false });

      if (error) console.error(error);
      else setTransactions(data || []);
      setLoading(false);
    };

    fetchTransactions();
  }, []);

  return { transactions, loading };
}

export async function addTransaction(transaction: Omit<Transaction, "id">) {
  console.log("追加するデータ:", transaction); // 🔍 デバッグ用ログ

  const { data, error } = await supabase.from("transactions").insert([transaction]);

  if (error) {
    console.error("データ追加エラー:", error.message, error.details, error.hint);
  } else {
    console.log("データ追加成功:", data);
  }
}

export async function deleteTransaction(id: string) {
  const res = await fetch("/api/transactions", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    console.error("削除エラー:", errorData.error);
    return;
  }

  console.log("削除成功:", id);
}

export async function updateTransaction(transaction: Transaction) {
  const res = await fetch("/api/transactions", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(transaction),
  });

  if (!res.ok) {
    const errorData = await res.json();
    console.error("更新エラー:", errorData.error);
    return;
  }

  console.log("更新成功:", transaction.id);
}
