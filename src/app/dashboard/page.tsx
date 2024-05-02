'use client';
import React, { useEffect, useState } from "react";
import ClientForm from "../../components/client/client-forms"; // Ajuste o caminho conforme necessário
import ClientsTable from "@/components/tables/clients-table";
import { fetchClients } from "@/config/firebase/register-client";

const DashboardPage = () => {
  const [clients, setClients] = useState<{ id: string }[]>([]);

  useEffect(() => {
    updateClients();
  }, []);

  const updateClients = async () => {
    const clientsData = await fetchClients();
    setClients(clientsData);
  };

  return (
    <div className="flex flex-col justify-start items-center min-h-screen bg-gray-100">
      <h1 className="text-xl font-bold my-4 text-gray-700">Dashboard</h1>
      <ClientForm onClientAdded={updateClients} />
      <ClientsTable clients={clients} />
    </div>
  );
};

export default DashboardPage;