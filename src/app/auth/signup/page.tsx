"use client";

import { useState } from "react";
import supabase from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      alert("登録失敗: " + error.message);
      return;
    }
    alert("登録成功！ログインしてください。");
    router.push("/auth/signin");
  };

  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-md p-6">
        <CardHeader>
          <h2 className="text-xl font-bold">新規登録</h2>
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
          <Button onClick={handleSignUp} className="w-full mt-4">
            登録
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
