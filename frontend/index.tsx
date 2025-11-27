
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Landing } from './components/Landing';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { Store } from './components/Store';
import { Admin } from './components/Admin';
import { User, Page, Product, Customer, Transaction, CartItem, PaymentMethod } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [user, setUser] = useState<User | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // App State
  const [products, setProducts] = useState<Product[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, customersRes, usersRes] = await Promise.all([
          fetch('http://localhost:3001/api/products'),
          fetch('http://localhost:3001/api/customers'),
          fetch('http://localhost:3001/api/users')
        ]);
        const productsData = await productsRes.json();
        const customersData = await customersRes.json();
        const usersData = await usersRes.json();
        setProducts(productsData);
        setCustomers(customersData);
        setUsers(usersData);
      } catch (error) {
        console.error("Failed to fetch initial data:", error);
      }
    };
    fetchData();
  }, []);

  // Dark Mode Effect
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    if (loggedInUser.role === 'admin') {
      setCurrentPage('admin');
    } else {
      setCurrentPage('store');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('landing');
  };

  const handleSignup = (newUser: User) => {
    setUsers(prev => [...prev, newUser]);
    setUser(newUser);
    setCurrentPage('store');
  };

  const handleCheckout = async (transactionData: {
    items: CartItem[];
    subtotal: number;
    tax: number;
    discount: number;
    total: number;
    amountPaid: number;
    paymentMethod: PaymentMethod;
    customerId?: string;
  }) => {
    try {
      const response = await fetch('http://localhost:3001/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transactionData),
      });

      if (response.ok) {
        const newTransaction: Transaction = {
          id: crypto.randomUUID(),
          date: new Date().toISOString(),
          ...transactionData
        };
        setTransactions(prev => [newTransaction, ...prev]);

        // Refetch customers to get updated debt info
        const customersRes = await fetch('http://localhost:3001/api/customers');
        const customersData = await customersRes.json();
        setCustomers(customersData);
        
      } else {
        console.error("Checkout failed");
      }
    } catch (error) {
      console.error("Failed to connect to the server for checkout:", error);
    }
  };

  const handleAddCustomer = async (newCustomer: Omit<Customer, 'debt' | 'lastVisit'>) => {
    try {
      const response = await fetch('http://localhost:3001/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCustomer),
      });
      if (response.ok) {
        const addedCustomer = await response.json();
        setCustomers(prev => [...prev, addedCustomer]);
      } else {
        console.error("Failed to add customer");
      }
    } catch (error) {
      console.error("Error adding customer:", error);
    }
  };

  const handleDeleteCustomer = async (customerId: string) => {
    try {
      const response = await fetch(`http://localhost:3001/api/customers/${customerId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setCustomers(prev => prev.filter(c => c.id !== customerId));
      } else {
        console.error("Failed to delete customer");
      }
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  // Router
  const renderPage = () => {
    const commonProps = {
      isDarkMode,
      toggleDarkMode
    };

    switch (currentPage) {
      case 'landing':
        return <Landing onNavigate={setCurrentPage} {...commonProps} />;
      case 'login':
        return <Login onLogin={handleLogin} onNavigate={setCurrentPage} {...commonProps} />;
      case 'signup':
        return <Signup onSignup={handleSignup} onNavigate={setCurrentPage} {...commonProps} />;
      case 'store':
        return (
          <Store 
            user={user} 
            products={products}
            customers={customers} 
            onLogout={handleLogout} 
            onNavigate={setCurrentPage}
            onCheckout={handleCheckout}
            {...commonProps}
          />
        );
      case 'admin':
        if (user?.role !== 'admin') {
          return (
            <Store 
              user={user} 
              products={products} 
              customers={customers} 
              onLogout={handleLogout} 
              onNavigate={setCurrentPage} 
              onCheckout={handleCheckout}
              {...commonProps}
            />
          );
        }
        return (
          <Admin 
            customers={customers} 
            transactions={transactions} 
            onNavigate={setCurrentPage}
            onAddCustomer={handleAddCustomer}
            onDeleteCustomer={handleDeleteCustomer}
            {...commonProps}
          />
        );
      default:
        return <Landing onNavigate={setCurrentPage} {...commonProps} />;
    }
  };

  return (
    <div className="font-sans text-gray-900 dark:text-gray-100 min-h-screen">
      {renderPage()}
    </div>
  );
}

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
