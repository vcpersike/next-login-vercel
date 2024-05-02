import { useCallback, useState } from 'react';

const useSendEmails = (clients: any, selectedClients: any, showToast: (message: any) => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendEmails = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    const selectedEmails = clients.filter((client: { id: string | number; }) => selectedClients[client.id]).map((client: { email: any; }) => client.email);

    if (selectedEmails.length === 0) {
      alert('No clients selected.');
      setIsLoading(false);
      return;
    }

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

      if (!response.ok) throw new Error('Failed to send email');
      const data = await response.json();
      alert(data.message);
    } catch (error: any) {
      alert('Failed to send emails.');
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [clients, selectedClients]);

  return { sendEmails, isLoading, error };
};

export default useSendEmails;
