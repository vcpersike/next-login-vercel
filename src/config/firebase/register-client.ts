import { addDoc, collection, deleteDoc, doc, getDocs, query } from "firebase/firestore";
import { firestore } from "./firebase-config";
import { v4 as uuidv4 } from 'uuid';

export const registerClient = async ({ name, phone, email, category }: any) => {
    try {
        const clientsCollection = collection(firestore, 'clients');
        const id = uuidv4();
        const newClientRef = doc(clientsCollection, id);
        await addDoc(clientsCollection, {
            id,
            name,
            phone,
            email,
            category,
        });
        return { success: true, message: 'Cliente cadastrado com sucesso!' };
    } catch (error: any) {
        return { success: false, message: 'Falha ao cadastrar cliente: ' + error.message };
    }
};

export const deleteClients = async (clientIds: any[]) => {
  try {
    await Promise.all(clientIds.map(clientId => {
      const clientRef = doc(firestore, "clients", clientId);
      return deleteDoc(clientRef);
    }));
    return { success: true, message: 'Clientes deletados com sucesso!' };
  } catch (error: any) {
    console.error("Erro ao deletar cliente:", error);
    return { success: false, message: `Falha ao deletar clientes: ${error.message}` };
  }
};

export const fetchClients = async () => {
    const q = query(collection(firestore, "clients"));
    const querySnapshot = await getDocs(q);
    const clientsData = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return clientsData;
  };