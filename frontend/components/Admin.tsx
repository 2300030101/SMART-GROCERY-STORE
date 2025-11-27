
import React, { useState } from 'react';
import { Users, BarChart3, ArrowLeft, DollarSign, List, Search, Trash2, X, Clock, FileText, Smartphone, Moon, Sun } from 'lucide-react';
import { Customer, Transaction, Page } from '../types';
import { AiInsights } from './AiInsights';

interface AdminProps {
  customers: Customer[];
  transactions: Transaction[];
  onNavigate: (page: Page) => void;
  onAddCustomer: (customer: Omit<Customer, 'debt' | 'lastVisit'>) => void;
  onDeleteCustomer: (customerId: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export function Admin({ customers, transactions, onNavigate, onAddCustomer, onDeleteCustomer, isDarkMode, toggleDarkMode }: AdminProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'katha'>('overview');
  const [newCustName, setNewCustName] = useState('');
  const [newCustPhone, setNewCustPhone] = useState('');
  const [customerSearch, setCustomerSearch] = useState('');
  
  // Customer Details Modal State
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const totalRevenue = transactions.reduce((sum, t) => sum + t.total, 0);
  const totalDebt = customers.reduce((sum, c) => sum + c.debt, 0);

  // Calculate Weekly Sales Data
  const getWeeklyData = () => {
    const data = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      
      const dayTotal = transactions
        .filter(t => t.date.startsWith(dateStr))
        .reduce((sum, t) => sum + t.total, 0);

      data.push({
        day: d.toLocaleDateString('en-US', { weekday: 'short' }),
        amount: dayTotal
      });
    }
    return data;
  };

  const weeklyData = getWeeklyData();
  const maxRevenue = Math.max(...weeklyData.map(d => d.amount), 100); // Default to 100 scale if 0

  const handleAddCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustName || !newCustPhone) return;
    
    onAddCustomer({
      id: `c${Date.now()}`,
      name: newCustName,
      phone: newCustPhone,
    });
    setNewCustName('');
    setNewCustPhone('');
  };

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(customerSearch.toLowerCase()) || 
    c.phone.includes(customerSearch)
  );

  // Get transactions for selected customer
  const customerTransactions = selectedCustomer 
    ? transactions.filter(t => t.customerId === selectedCustomer.id) 
    : [];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col relative transition-colors">
      {/* Admin Header */}
      <header className="bg-slate-900 dark:bg-slate-950 text-white p-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => onNavigate('store')}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <div className="text-sm text-slate-400">
              {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 max-w-7xl w-full mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Sidebar / Stats */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-emerald-100 dark:bg-emerald-900/30 p-2 rounded-lg">
                  <DollarSign className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <span className="text-gray-500 dark:text-gray-400 font-medium">Total Revenue</span>
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">₹{totalRevenue.toFixed(0)}</p>
              <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-1">Lifetime Sales</p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-lg">
                  <List className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <span className="text-gray-500 dark:text-gray-400 font-medium">Katha (Debt)</span>
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">₹{totalDebt.toFixed(0)}</p>
              <p className="text-sm text-red-500 dark:text-red-400 mt-1">Outstanding</p>
            </div>
          </div>

          {/* Weekly Sales Chart */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-6 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              Weekly Revenue
            </h3>
            <div className="h-48 flex items-end justify-between gap-2">
              {weeklyData.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="relative w-full flex items-end justify-center h-full">
                     {/* Tooltip */}
                     <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 dark:bg-black text-white text-xs py-1 px-2 rounded pointer-events-none whitespace-nowrap z-10">
                       ₹{data.amount.toFixed(0)}
                     </div>
                     {/* Bar */}
                     <div 
                       className="w-full max-w-[40px] bg-emerald-500 hover:bg-emerald-600 transition-all cursor-pointer relative rounded-t-sm"
                       style={{ height: `${(data.amount / maxRevenue) * 100}%`, minHeight: '4px' }}
                     >
                       <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                     </div>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">{data.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Section */}
          <AiInsights customers={customers} transactions={transactions} />

          {/* Customer / Katha Management */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
             <div className="flex border-b dark:border-gray-700">
               <button 
                 onClick={() => setActiveTab('overview')}
                 className={`flex-1 py-4 font-medium text-sm border-b-2 transition-colors ${activeTab === 'overview' ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-900/10' : 'border-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
               >
                 All Customers
               </button>
               <button 
                 onClick={() => setActiveTab('katha')}
                 className={`flex-1 py-4 font-medium text-sm border-b-2 transition-colors ${activeTab === 'katha' ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-900/10' : 'border-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
               >
                 Debt Management
               </button>
             </div>

             <div className="p-6">
               {activeTab === 'overview' ? (
                 <div className="space-y-4">
                   <div className="flex justify-between items-center mb-4">
                     <h3 className="font-bold text-gray-800 dark:text-gray-200">Add New Customer</h3>
                   </div>
                   
                   <form onSubmit={handleAddCustomer} className="flex gap-2">
                     <input 
                       type="text" 
                       placeholder="Name" 
                       value={newCustName}
                       onChange={e => setNewCustName(e.target.value)}
                       className="flex-1 border dark:border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                     />
                     <input 
                       type="text" 
                       placeholder="Phone" 
                       value={newCustPhone}
                       onChange={e => setNewCustPhone(e.target.value)}
                       className="w-40 border dark:border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                     />
                     <button type="submit" className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700">Add</button>
                   </form>

                   <div className="mt-8">
                     <div className="flex items-center gap-2 mb-4 bg-gray-50 dark:bg-gray-700 p-2 rounded-lg border border-gray-200 dark:border-gray-600">
                       <Search className="w-5 h-5 text-gray-400 dark:text-gray-400" />
                       <input 
                          type="text"
                          placeholder="Search customers by name or phone..."
                          value={customerSearch}
                          onChange={e => setCustomerSearch(e.target.value)}
                          className="flex-1 bg-transparent outline-none text-sm dark:text-white placeholder-gray-400"
                       />
                     </div>
                     
                     <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                       {filteredCustomers.length === 0 ? (
                         <div className="text-center text-gray-500 dark:text-gray-400 py-4">No customers found</div>
                       ) : (
                         filteredCustomers.map(c => (
                           <div key={c.id} className="flex justify-between items-center p-3 bg-white dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-lg hover:shadow-sm transition-shadow">
                             <div 
                              className="flex items-center gap-3 cursor-pointer flex-1"
                              onClick={() => setSelectedCustomer(c)}
                             >
                               <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center text-emerald-700 dark:text-emerald-300 font-bold">
                                 {c.name.charAt(0)}
                               </div>
                               <div>
                                 <p className="font-medium text-gray-900 dark:text-white group-hover:text-emerald-700">{c.name}</p>
                                 <p className="text-xs text-gray-500 dark:text-gray-400">{c.phone}</p>
                               </div>
                             </div>
                             <div className="flex items-center gap-3">
                               <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${c.debt > 0 ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'}`}>
                                 {c.debt > 0 ? `₹${c.debt}` : 'Paid'}
                               </span>
                               <button 
                                onClick={() => onDeleteCustomer(c.id)}
                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                title="Delete Customer"
                               >
                                 <Trash2 className="w-4 h-4" />
                               </button>
                             </div>
                           </div>
                         ))
                       )}
                     </div>
                   </div>
                 </div>
               ) : (
                 <div className="space-y-4">
                   <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-4">Debt Tracker (Katha)</h3>
                   {customers.filter(c => c.debt > 0).length === 0 ? (
                     <div className="text-center text-gray-500 dark:text-gray-400 py-8">No active debts found. Great job!</div>
                   ) : (
                      customers.filter(c => c.debt > 0).map(c => (
                       <div 
                         key={c.id} 
                         onClick={() => setSelectedCustomer(c)}
                         className="flex justify-between items-center p-4 border border-red-100 dark:border-red-900/30 bg-red-50/50 dark:bg-red-900/10 rounded-xl cursor-pointer hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors"
                       >
                         <div className="flex items-center gap-3">
                           <div className="w-10 h-10 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center text-red-600 dark:text-red-400 font-bold">
                             ₹
                           </div>
                           <div>
                             <p className="font-bold text-gray-900 dark:text-white">{c.name}</p>
                             <p className="text-sm text-red-600 dark:text-red-400">Pending: ₹{c.debt}</p>
                           </div>
                         </div>
                         <button className="text-sm border border-red-200 dark:border-red-800 bg-white dark:bg-gray-800 text-red-600 dark:text-red-400 px-3 py-1.5 rounded hover:bg-red-50 dark:hover:bg-red-900/30">
                           Details
                         </button>
                       </div>
                     ))
                   )}
                 </div>
               )}
             </div>
          </div>
        </div>

        {/* Right Panel: Recent Transactions Log */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col h-[600px] sticky top-6">
          <div className="p-4 border-b dark:border-gray-700">
            <h3 className="font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              Recent Transactions
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {transactions.length === 0 ? (
              <p className="text-gray-400 dark:text-gray-500 text-center mt-10">No transactions yet.</p>
            ) : (
              transactions.map(t => (
                <div key={t.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-100 dark:border-gray-600">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-mono text-gray-400 dark:text-gray-500">#{t.id.slice(-6)}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{new Date(t.date).toLocaleTimeString()}</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      {t.items.length} items
                    </div>
                    <div className="font-bold text-gray-900 dark:text-white">₹{t.total.toFixed(2)}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Customer Details Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden max-h-[80vh] flex flex-col transition-colors">
            <div className="p-6 bg-slate-900 dark:bg-slate-950 text-white flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">{selectedCustomer.name}</h2>
                <p className="text-slate-400 flex items-center gap-2 text-sm mt-1">
                  <Smartphone className="w-4 h-4" /> {selectedCustomer.phone}
                </p>
              </div>
              <button 
                onClick={() => setSelectedCustomer(null)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 flex-1 overflow-y-auto">
              <div className="flex gap-4 mb-8">
                <div className={`flex-1 p-4 rounded-xl border ${selectedCustomer.debt > 0 ? 'bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-800' : 'bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-800'}`}>
                   <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Current Debt</p>
                   <p className={`text-3xl font-bold ${selectedCustomer.debt > 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                     ₹{selectedCustomer.debt}
                   </p>
                </div>
                <div className="flex-1 p-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
                   <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Last Visit</p>
                   <p className="text-xl font-semibold text-gray-800 dark:text-white">
                     {selectedCustomer.lastVisit}
                   </p>
                </div>
              </div>

              <h3 className="font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-gray-400" /> Transaction History
              </h3>
              
              <div className="space-y-3">
                {customerTransactions.length === 0 ? (
                  <p className="text-gray-500 italic text-center py-4">No transaction history found.</p>
                ) : (
                  customerTransactions.map(t => (
                    <div key={t.id} className="border border-gray-100 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <div className="flex justify-between items-center mb-2">
                         <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                           <Clock className="w-4 h-4" />
                           {new Date(t.date).toLocaleDateString()} at {new Date(t.date).toLocaleTimeString()}
                         </div>
                         <span className={`px-2 py-0.5 rounded text-xs uppercase font-bold ${t.paymentMethod === 'credit' ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' : 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'}`}>
                           {t.paymentMethod}
                         </span>
                      </div>
                      <div className="flex justify-between items-end">
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {t.items.map(i => i.name).join(', ').slice(0, 50)}
                          {t.items.length > 2 && '...'}
                        </div>
                        <div className="font-bold text-lg text-gray-900 dark:text-white">₹{t.total.toFixed(2)}</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
            
            <div className="p-4 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-right">
              <button 
                onClick={() => setSelectedCustomer(null)}
                className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
