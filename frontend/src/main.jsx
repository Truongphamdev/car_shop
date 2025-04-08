import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Header from './pages/Header';
import { CartProvider } from './pages/CartContext';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
<CartProvider>
        <App />
</CartProvider>
    </React.StrictMode>
);