"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToggleGroup, ToggleGroupItem } from "@radix-ui/react-toggle-group";
import { Button } from "@radix-ui/themes";
import { Label } from "@radix-ui/react-label";

export default function Home() {
  const router = useRouter();
  const [User, setUser] = useState<"paciente" | "medico">("paciente");
  const [cpfOuCrm, setCpfOuCrm] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async () => {
    const endpoint =
      User === "paciente" ? "/pacientes/login" : "/medicos/login";

    try {
      const res = await fetch(`http://localhost:3333${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identificador: cpfOuCrm,
          senha,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        // Redireciona para dashboard após login
        router.push(`/${User}/dashboard`);
      } else {
        // Usuário não encontrado → redirecionar para cadastro
        router.push("/register");
      }
    } catch (error) {
      console.error("Erro ao tentar login:", error);
      router.push("/register");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-4">
      <h1 className="text-3xl font-bold">Bem-vindo ao IDLife</h1>

      <ToggleGroup
        type="single"
        value={User}
        onValueChange={(val: any) => setUser(val as "paciente" | "medico")}
        className="mb-4"
      >
        <ToggleGroupItem value="paciente">Paciente</ToggleGroupItem>
        <ToggleGroupItem value="medico">Médico</ToggleGroupItem>
      </ToggleGroup>

      <div className="w-full max-w-md space-y-4">
        <div>
          <Label htmlFor="identificador">
            {User === "paciente" ? "CPF" : "CRM"}
          </Label>
          <input
            id="identificador"
            placeholder={
              User === "paciente" ? "Digite seu CPF" : "Digite seu CRM"
            }
            value={cpfOuCrm}
            onChange={(e: any) => setCpfOuCrm(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="senha">Senha</Label>
          <input
            id="senha"
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e: any) => setSenha(e.target.value)}
          />
        </div>

        <Button className="w-full" onClick={handleLogin}>
          Entrar
        </Button>
      </div>
    </div>
  );
}
