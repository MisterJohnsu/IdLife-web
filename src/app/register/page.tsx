"use client";
import { z } from "zod";
import { api } from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

const formSchema = z.object({
  nm_paciente: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  cpf: z.string().min(11, "CPF inválido"),
  nm_sexo: z.string().min(1, "M ou F"),
  nm_tipo_sanguineo: z.string().min(1, "Tipo Sanguineo é obrigatório"),
  nm_convenio: z.string().min(1, "Insira seu convênio"),
  cd_telefone: z.string().min(11, "Telefone Precisa de 11 Caracteres"),
  dt_nascimento: z.date().min(new Date(), "Data de Nascimento é obrigatória"),
  cd_telefone_ctt_emergencia: z
    .string()
    .min(11, "Telefone Precisa de 11 Caracteres"),
  nm_ctt_emergencia: z.string().min(1, "Contato de Emergência é obrigatório"),
  password: z.string().min(6, "Senha Precisa de 6 Caracteres"),
});

type CreateUserFormData = z.infer<typeof formSchema>;

export default function Register() {
  const [showOptionalInfo, setShowOptionalInfo] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(formSchema),
  });

  const handleRegisterSubmit = async (body: CreateUserFormData) => {
    try {
      await api.post("/pacientes/register", { data: body });

      window.location.href = "/auth/login";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <main className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Registro de usuário
          </h1>
          <form
            className="space-y-6"
            onSubmit={handleSubmit(handleRegisterSubmit)}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nome
              </label>
              <input
                type="text"
                id="nm_paciente"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Digite seu nome completo"
                {...register("nm_paciente")}
              />
              {errors.nm_paciente && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.nm_paciente.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Digite seu email"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="cpf"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                CPF
              </label>
              <input
                type="text"
                id="cpf"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Digite seu CPF"
                {...register("cpf")}
              />
              {errors.cpf && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.cpf.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="sexo"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Sexo
              </label>
              <select
                {...register("nm_sexo")}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="" disabled>
                  Selecione o sexo
                </option>
                <option value="M">Masculino</option>
                <option value="F">Feminino</option>
              </select>
              {errors.nm_sexo && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.nm_sexo.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="nm_tipo_sanguineo"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Tipo Sanguíneo
              </label>
              <select
                {...register("nm_tipo_sanguineo")}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="" disabled>
                  Selecione o tipo sanguíneo
                </option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
            <div>
              <Label
                htmlFor="dt_nascimento"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Data de Nascimento
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between text-left font-normal"
                  >
                    {watch("dt_nascimento")
                      ? watch("dt_nascimento").toLocaleDateString()
                      : "Selecione a data"}
                    <ChevronDownIcon className="ml-2 h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    captionLayout="dropdown"
                    selected={watch("dt_nascimento")}
                    onSelect={(date) => {
                      if (date) setValue("dt_nascimento", date);
                    }}
                  />
                </PopoverContent>
              </Popover>
              {errors.dt_nascimento && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.dt_nascimento.message}
                </p>
              )}
            </div>
            <div>
              <Button
                type="button"
                className="w-full bg-emerald-500 text-white font-semibold rounded-md py-2"
                onClick={() => setShowOptionalInfo(!showOptionalInfo)}
              >
                Informações Adicionais
              </Button>

              {showOptionalInfo && (
                <div className="space-y-4 mt-4">
                  <div>
                    <label
                      htmlFor="nm_ctt_emergencia"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Contato de Emergência
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Nome"
                      {...register("nm_ctt_emergencia")}
                    />
                    {errors.nm_ctt_emergencia && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.nm_ctt_emergencia.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="cd_telefone_ctt_emergencia"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Telefone do Contato de Emergência
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Telefone"
                      {...register("cd_telefone_ctt_emergencia")}
                    />
                    {errors.cd_telefone_ctt_emergencia && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.cd_telefone_ctt_emergencia.message}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Senha
              </label>
              <input
                type="password"
                id="password"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Digite sua senha"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full bg-emerald-500 text-white font-semibold rounded-md py-2 hover:bg-emerald-600 transition-colors"
            >
              Criar usuário
            </Button>
          </form>
        </div>
      </main>
    </>
  );
}
