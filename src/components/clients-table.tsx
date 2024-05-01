'use client'
import React from "react";

interface ClientsTableProps {
    clients: {
        id: string;
        name?: string;
        phone?: string;
        email?: string;
        category?: string;
    }[];
}

const ClientsTable: React.FC<ClientsTableProps> = ({ clients }) => {
    return (
        <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-3/4 mx-auto my-4">
            <table className="min-w-full leading-normal">
                <thead>
                    <tr>
                        <th className="text-gray-400">Select</th>
                        <th className="text-gray-400">Name</th>
                        <th className="text-gray-400">Phone</th>
                        <th className="text-gray-400">Email</th>
                        <th className="text-gray-400">Category</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map(client => (
                        <tr key={client.id}>
                            <td><input type="checkbox" /></td>
                            <td className="text-gray-400">{client.name}</td>
                            <td className="text-gray-400">{client.phone}</td>
                            <td className="text-gray-400">{client.email}</td>
                            <td className="text-gray-400">{client.category}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-end">
                <button type="button"
                        className="mt-4 w-auto flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Enviar
                </button>
            </div>
        </div>
    );
};

export default ClientsTable;