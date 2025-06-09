"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@radix-ui/themes";
import { Label } from "@radix-ui/react-label";
import { toast } from "react-hot-toast";

function validarCPF(cpf: string) {
  cpf = cpf.replace(/\D/g, "");
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  const calc = (base: number) =>
    cpf
      .slice(0, base)
      .split("")
      .reduce((soma, dig, i) => soma + parseInt(dig) * (base + 1 - i), 0);

  const dig1 = ((calc(9) * 10) % 11) % 10;
  const dig2 = ((calc(10) * 10) % 11) % 10;

  return dig1 === parseInt(cpf[9]) && dig2 === parseInt(cpf[10]);
}

export default function CadastroPage() {
  const router = useRouter();
  const [form, setForm] = useState({ cpfOuEmail: "", senha: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const { cpfOuEmail, senha } = form;
    const isEmail = /\S+@\S+\.\S+/.test(cpfOuEmail);
    const isCPF = /^\d{11}$/.test(cpfOuEmail.replace(/\D/g, ""));

    if (!isEmail && !isCPF) {
      toast.error("Informe um e-mail válido ou um CPF com 11 dígitos.");
      return;
    }

    if (isCPF && !validarCPF(cpfOuEmail)) {
      toast.error("CPF inválido.");
      return;
    }

    // Aqui envia para o backend (AdonisJS)
    const res = await fetch("/api/cadastrar", {
      method: "POST",
      body: JSON.stringify({ identificador: cpfOuEmail, senha }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      toast.success("Cadastro realizado com sucesso!");
      router.push("/login");
    } else {
      toast.error("Erro ao cadastrar. Verifique os dados.");
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow">
      <h1 className="text-xl font-semibold mb-4">Cadastro</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="cpfOuEmail">CPF ou E-mail</Label>
          <input
            id="cpfOuEmail"
            name="cpfOuEmail"
            type="text"
            placeholder="Digite seu CPF ou e-mail"
            value={form.cpfOuEmail}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="senha">Senha</Label>
          <input
            id="senha"
            name="senha"
            type="password"
            placeholder="Digite sua senha"
            value={form.senha}
            onChange={handleChange}
            required
          />
        </div>
        <Button type="submit" className="w-full">
          Cadastrar
        </Button>
      </form>
    </div>
  );
}
