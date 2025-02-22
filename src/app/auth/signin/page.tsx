"use client";

import { useState } from "react";
import supabase from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert("ログイン失敗: " + error.message);
      return;
    }
    router.push("/");
  };

  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-md p-6">
        <CardHeader>
          <h2 className="text-xl font-bold">ログイン</h2>
        </CardHeader>
        <CardContent>
          <Input
            type="email"
            placeholder="メールアドレス"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleLogin} className="w-full mt-4">
            ログイン
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
