'use client'
import React, { useState } from "react";

interface Client {
    id: string;
    name?: string;
    phone?: string;
    email?: string;
    category?: string;
}

interface ClientsTableProps {
    clients: Client[];
}

const ClientsTable: React.FC<ClientsTableProps> = ({ clients }) => {
    const [selectedClients, setSelectedClients] = useState<{[key: string]: boolean}>({});

    const handleCheckboxChange = (id: string) => {
        setSelectedClients(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const handleSendEmails = async () => {
        const selectedEmails = clients.filter(client => selectedClients[client.id]).map(client => client.email);

        if (selectedEmails.length > 0) {
            try {
                const response = await fetch('/api/email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        recipients: selectedEmails,
                        subject: "Important Information",
                        text: "Here is some important information we need to share with you."
                    })
                });
                if (response.ok) {
                    const data = await response.json();
                    alert(data.message);
                    console.log('Emails sent successfully:', data);
                } else {
                    throw new Error('Failed to send email');
                }
            } catch (error) {
                console.error('Failed to send emails:', error);
                alert('Failed to send emails.');
            }
        } else {
            alert('No clients selected.');
        }
    };

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
                            <td><input type="checkbox" checked={selectedClients[client.id] || false} onChange={() => handleCheckboxChange(client.id)} /></td>
                            <td className="text-gray-400">{client.name}</td>
                            <td className="text-gray-400">{client.phone}</td>
                            <td className="text-gray-400">{client.email}</td>
                            <td className="text-gray-400">{client.category}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-end">
                <button onClick={handleSendEmails} type="button"
                        className="mt-4 w-auto flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Enviar
                </button>
            </div>
        </div>
    );
};

export default ClientsTable;
