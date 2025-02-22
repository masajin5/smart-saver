import { useEffect, useState } from "react";
import supabase from "@/lib/supabase";

export interface Transaction {
  id: string;
  type: "income" | "expense" | "";
  amount: number;
  category: string;
  date: string;
  user_id?: string;
}

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      const { data: user, error: userError } = await supabase.auth.getUser();
      if (userError || !user?.user) {
        console.error("ユーザー取得エラー:", userError);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .eq("user_id", user.user.id) // 🔥 ログインユーザーのデータのみ取得
        .order("date", { ascending: false });

      if (error) {
        console.error("取引データ取得エラー:", error);
      } else {
        setTransactions(data || []);
      }
      setLoading(false);
    };

    fetchTransactions();
  }, []);

  return { transactions, loading };
}

export async function addTransaction(transaction: Omit<Transaction, "id">) {
  const { data: user, error: userError } = await supabase.auth.getUser();
  if (userError || !user?.user) {
    console.error("ユーザー情報取得エラー:", userError);
    return;
  }

  const { error } = await supabase
    .from("transactions")
    .insert([{ ...transaction, user_id: user.user.id }]); // 🔥 ユーザーIDを設定

  if (error) console.error("データ追加エラー:", error);
}

export async function deleteTransaction(id: string) {
  const { data: user, error: userError } = await supabase.auth.getUser();
  if (userError || !user?.user) {
    console.error("ユーザー情報取得エラー:", userError);
    return;
  }

  const { error } = await supabase
    .from("transactions")
    .delete()
    .eq("id", id)
    .eq("user_id", user.user.id); // 🔥 自分のデータのみ削除可能

  if (error) console.error("データ削除エラー:", error);
}

export async function updateTransaction(transaction: Transaction) {
  const { data: user, error: userError } = await supabase.auth.getUser();
  if (userError || !user?.user) {
    console.error("ユーザー情報取得エラー:", userError);
    return;
  }

  const { error } = await supabase
    .from("transactions")
    .update({
      amount: transaction.amount,
      category: transaction.category,
      type: transaction.type,
      date: transaction.date,
    })
    .eq("id", transaction.id)
    .eq("user_id", user.user.id); // 🔥 自分のデータのみ更新可能

  if (error) console.error("データ更新エラー:", error);
}
