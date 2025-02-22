import AddTransaction from "@/components/transactions/addTransaction";
import TransactionsList from "@/components/transactions/transactionsList";

export default function Home() {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">家計簿</h1>
      <AddTransaction />
      <TransactionsList />
    </div>
  );
}
