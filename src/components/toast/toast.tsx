import React from 'react';
import { useEffect } from 'react';

const Toast = ({ message, show, onClose, duration = 3000 }: { message: string, show: boolean, onClose: () => void, duration?: number }) => {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [show, onClose, duration]);

    if (!show) return null;

    return (
        <div className={`fixed bottom-5 right-5 p-3 bg-gray-800 text-white rounded-lg shadow-lg ${
            show ? 'animate-enter' : 'animate-leave'
        }`}>
            {message}
        </div>
    );
};

export default Toast;
