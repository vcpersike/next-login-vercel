import React, { useState } from "react";
import { registerClient } from "@/config/firebase/register-client";
import InputMask from 'react-input-mask';
import Toast from "../toast/toast";

const ClientForm: React.FC<ClientFormProps> = ({ onClientAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    category: ""
  });
  const [toast, setToast] = useState({ show: false, message: '' });

  const showToast = (message: string) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = await registerClient(formData);
    if (result.success) {
      showToast(result.message);
      setFormData({ name: "", phone: "", email: "", category: "" });
      onClientAdded();
    } else {
      showToast(result.message);
    }
  };

  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-3/4 mx-auto my-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Nome"
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        <InputMask
          mask="(99) 99999-9999"
          value={formData.phone}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          type="text"
          name="phone"
          placeholder="Telefone"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="E-mail"
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleInputChange}
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
      <Toast message={toast.message} show={toast.show} onClose={() => setToast({ show: false, message: '' })} />

    </div>
  );
};

export default ClientForm;
