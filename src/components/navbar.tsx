"use client";

import supabase from "@/lib/supabase";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) setUser(data.user);
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between">
      <h1 className="text-lg font-bold">SmartSaver</h1>
      {user ? (
        <div className="flex gap-4">
          <span>{user.email}</span>
          <Button onClick={handleLogout}>ログアウト</Button>
        </div>
      ) : (
        <div className="flex gap-4">
          <Button asChild>
            <Link href="/auth/signin">ログイン</Link>
          </Button>
          <Button asChild>
            <Link href="/auth/signup">新規登録</Link>
          </Button>
        </div>
      )}
    </nav>
  );
}
