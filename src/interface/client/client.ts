interface Client {
    id: string;
    name?: string;
    phone?: string;
    email?: string;
    category?: string;
}

interface DeleteClientsHook {
    clients: any[];
    selectedClients: { [key: string]: boolean } | undefined;
    setClients: (clients: any[]) => void;
    setSelectedClients: (selectedClients: { [key: string]: boolean }) => void;
    showToast: (message: string) => void;
  }

interface ClientsTableProps {
    clients: Client[];
}

interface ClientFormProps {
    onClientAdded: () => void;
  }