import { useState } from 'react';
import { deleteClients } from "@/config/firebase/register-client";

const useDeleteClients = ({
  clients,
  selectedClients,
  setClients,
  setSelectedClients,
  showToast
}: DeleteClientsHook) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleDeleteClients = async () => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    const clientIdsToDelete = Object.keys(selectedClients ?? {}).filter(key => selectedClients?.[key]);
    if (clientIdsToDelete.length === 0) {
      showToast('Nenhum cliente selecionado para deletar.');
      setIsLoading(false);
      return;
    }

    try {
      const result = await deleteClients(clientIdsToDelete);
      if (result.success) {
        setSuccessMessage(result.message);
        showToast(result.message);
        const updatedClients = clients.filter(client => !clientIdsToDelete.includes(client.id));
        setClients(updatedClients);
        setSelectedClients({});
      } else {
        setError(result.message);
        showToast(result.message);
      }
    } catch (error: any) {
      setError('Falha ao deletar clientes: ' + error.message);
      showToast('Falha ao deletar clientes: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleDeleteClients, isLoading, error, successMessage };
};

export default useDeleteClients;
