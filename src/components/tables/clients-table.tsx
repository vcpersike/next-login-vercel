import useDeleteClients from "@/hook/client/delete-client";
import useSendEmails from "@/hook/email/send-email";
import React, { useEffect, useState } from "react";
import Toast from "../toast/toast";

const ClientsTable: React.FC<ClientsTableProps> = ({ clients }) => {
  const [selectedClients, setSelectedClients] = useState<{
    [key: string]: boolean;
  }>({});
  const [clientList, setClientList] = useState<Client[]>(clients);

  const [toast, setToast] = useState({ show: false, message: '' });

  const showToast = (message: any) => {
    setToast({ show: true, message });
  };

  const hideToast = () => {
    setToast({ show: false, message: '' });
  };

  const {
    sendEmails,
    isLoading: isLoadingSend,
    error: errorSend,
  } = useSendEmails(clients, selectedClients, showToast);
  const deleteClientsArgs = {
    clients: clientList,
    selectedClients,
    setClients: (updatedClients: Client[]) => {
      console.log(updatedClients);
      setClientList(updatedClients);
    },
    setSelectedClients
  };
  const {
    handleDeleteClients,
    isLoading: isLoadingDelete,
    error: errorDelete,
    successMessage,
  } = useDeleteClients({
    clients: clientList,
    selectedClients,
    setClients: setClientList,
    setSelectedClients,
    showToast
  });

  const handleCheckboxChange = (id: string) => {
    setSelectedClients((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
    useEffect(() => {
    if (isLoadingSend || isLoadingDelete) {
      showMessage('Processing...');
    } else if (errorSend || errorDelete) {
      showMessage(errorSend || errorDelete);
    } else if (successMessage) {
      showMessage(successMessage);
    }
  }, [isLoadingSend, isLoadingDelete, errorSend, errorDelete, successMessage]);

  const showMessage = (message: any) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
  }

  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-3/4 mx-auto my-4">
      <table className="min-w-full leading-normal rounded-lg overflow-hidden">
        <thead className="bg-white">
          <tr>
            <th className="text-left text-black px-5 py-3 border-b-2 border-gray-200 rounded-tl-lg">
              Select
            </th>
            <th className="text-left text-black px-5 py-3 border-b-2 border-gray-200">
              Name
            </th>
            <th className="text-left text-black px-5 py-3 border-b-2 border-gray-200">
              Phone
            </th>
            <th className="text-left text-black px-5 py-3 border-b-2 border-gray-200">
              Email
            </th>
            <th className="text-left text-black px-5 py-3 border-b-2 border-gray-200 rounded-tr-lg">
              Category
            </th>
          </tr>
        </thead>

        <tbody className="bg-gray-100">
          {clients.map((client) => (
            <tr key={client.id}>
              <td className="px-5 py-4 border-b border-gray-200 text-sm">
                <input
                  type="checkbox"
                  checked={selectedClients[client.id] || false}
                  onChange={() => handleCheckboxChange(client.id)}
                />
              </td>
              <td className="px-5 py-4 border-b border-gray-200 text-sm text-gray-700">
                {client.name}
              </td>
              <td className="px-5 py-4 border-b border-gray-200 text-sm text-gray-700">
                {client.phone}
              </td>
              <td className="px-5 py-4 border-b border-gray-200 text-sm text-gray-700">
                {client.email}
              </td>
              <td className="px-5 py-4 border-b border-gray-200 text-sm text-gray-700">
                {client.category}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end space-x-4">
        <button
          onClick={sendEmails}
          disabled={isLoadingSend}
          type="button"
          className="mt-4 w-auto flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Enviar
        </button>
        <button
          onClick={handleDeleteClients}
          disabled={isLoadingDelete}
          type="button"
          className="mt-4 w-auto flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Deletar
        </button>
      </div>
      <Toast message={toast.message} show={toast.show} onClose={hideToast} />

    </div>
  );
};

export default ClientsTable;
