"use client";
import { useState } from "react";
import { registerClient } from "@/config/firebase/register-client";

interface ClientFormProps {
  onClientAdded: () => void; // Definição da prop de callback
}

const ClientForm: React.FC<ClientFormProps> = ({ onClientAdded }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Formulário enviado!");

    const result = await registerClient({ name, phone, email, category });
    if (result.success) {
      alert(result.message);
      setName("");
      setPhone("");
      setEmail("");
      setCategory("");
      onClientAdded();
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-:xl w-3/4 mx-auto my-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome"
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Telefone"
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Selecione uma categoria</option>
          <option value="pos-venda">Pós-venda</option>
          <option value="duvidas">Dúvidas</option>
          <option value="instalacao">Instalação</option>
        </select>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cadastrar Cliente
        </button>
      </form>
    </div>
  );
};

export default ClientForm;
