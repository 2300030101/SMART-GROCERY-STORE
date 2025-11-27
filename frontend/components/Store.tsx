
import React, { useState, useEffect, useRef } from 'react';
import { Search, ShoppingCart, Plus, Minus, Trash2, UserCircle, LogOut, Home, X, CreditCard, Banknote, Smartphone, CheckCircle, AlertTriangle, Printer, Tag, FileDown, Loader, Moon, Sun, LayoutGrid, User } from 'lucide-react';
import { Product, CartItem, User as UserType, Page, Customer, PaymentMethod } from '../types';
import { CATEGORIES } from '../data';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

interface StoreProps {
  user: UserType | null;
  products: Product[];
  customers: Customer[];
  onLogout: () => void;
  onNavigate: (page: Page) => void;
  onCheckout: (data: {
    items: CartItem[];
    subtotal: number;
    tax: number;
    discount: number;
    total: number;
    amountPaid: number;
    paymentMethod: PaymentMethod;
    customerId?: string;
  }) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export function Store({ user, products, customers, onLogout, onNavigate, onCheckout, isDarkMode, toggleDarkMode }: StoreProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  
  // UI Visibility State
  const [showCart, setShowCart] = useState(true);
  const [showCategories, setShowCategories] = useState(true);
  const [showAccountModal, setShowAccountModal] = useState(false);

  // Checkout Modal State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [customerSearch, setCustomerSearch] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash');
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Enhanced Billing State
  const [discountType, setDiscountType] = useState<'fixed' | 'percent'>('fixed');
  const [discountValue, setDiscountValue] = useState<number>(0);
  const [amountPaid, setAmountPaid] = useState<number>(0);
  const [lastTransactionId, setLastTransactionId] = useState<string>('');
  
  // PDF State
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const receiptRef = useRef<HTMLDivElement>(null);

  // Identify current customer if logged in
  const currentLoggedCustomer = user?.role === 'customer' 
    ? customers.find(c => c.phone === user.phone) 
    : null;

  // Filter products
  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Filter customers for checkout
  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(customerSearch.toLowerCase()) || 
    c.phone.includes(customerSearch)
  );

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    // Auto-open cart on add if closed
    if (!showCart) setShowCart(true);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.05; // 5% tax
  
  // Calculate Discount
  const discountAmount = discountType === 'percent' 
    ? (subtotal * discountValue) / 100 
    : discountValue;
  
  const total = Math.max(0, subtotal + tax - discountAmount);
  
  // Remaining Balance (to Debt)
  const remainingBalance = Math.max(0, total - amountPaid);

  // Initialize Checkout Modal
  const handleInitialCheckoutClick = () => {
    if (cart.length === 0) return;
    setIsCheckoutOpen(true);
    setIsSuccess(false);
    setDiscountValue(0);
    setDiscountType('fixed');
    setLastTransactionId('');
    
    // Auto-select logged-in customer
    if (currentLoggedCustomer) {
      setSelectedCustomer(currentLoggedCustomer);
    } else {
      setSelectedCustomer(null);
    }
    
    setPaymentMethod('cash');
    setCustomerSearch("");
  };

  useEffect(() => {
    if (isCheckoutOpen && !isSuccess) {
        if (paymentMethod === 'credit') {
            setAmountPaid(0);
        } else {
            setAmountPaid(total);
        }
    }
  }, [total, paymentMethod, isCheckoutOpen]);

  const processPayment = () => {
    if (remainingBalance > 0 && !selectedCustomer) {
      alert("Please select a customer to record the unpaid balance as debt.");
      return;
    }

    const finalPaymentMethod = remainingBalance > 0 && amountPaid > 0 ? 'split' : paymentMethod;

    onCheckout({
      items: cart,
      subtotal,
      tax,
      discount: discountAmount,
      total,
      amountPaid,
      paymentMethod: finalPaymentMethod,
      customerId: selectedCustomer?.id
    });
    
    setLastTransactionId(crypto.randomUUID().slice(0,8).toUpperCase());
    setIsSuccess(true);
  };
  
  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = async () => {
    if (!receiptRef.current) return;
    
    setIsGeneratingPdf(true);
    try {
      const canvas = await html2canvas(receiptRef.current, {
        scale: 2,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`receipt-${lastTransactionId}.pdf`);
      
    } catch (error) {
      console.error("PDF generation failed", error);
      alert("Failed to generate PDF. Please use the Print option.");
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const closeCheckout = () => {
    setIsSuccess(false);
    setIsCheckoutOpen(false);
    setCart([]);
  };

  const paymentMethodOptions = [
    { id: 'cash', icon: Banknote, label: 'Cash' },
    { id: 'online', icon: Smartphone, label: 'Online' },
    { id: 'credit', icon: CreditCard, label: 'Credit' }
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden relative print:bg-white transition-colors duration-200">
      {/* Persistent Navigation Bar */}
      <header className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 shadow-sm z-20 print:hidden transition-colors flex flex-col">
        {/* Top Row: Brand & Controls */}
        <div className="px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 cursor-pointer shrink-0" onClick={() => onNavigate('landing')}>
            <div className="bg-emerald-100 dark:bg-emerald-900/50 p-2 rounded-lg">
              <ShoppingCart className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h1 className="text-xl font-bold text-gray-800 dark:text-white hidden sm:block">Smart Store</h1>
          </div>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-1 bg-gray-100 dark:bg-gray-700/50 p-1 rounded-lg">
            <button 
              onClick={() => onNavigate('landing')}
              className="px-4 py-1.5 rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-600 hover:shadow-sm transition-all flex items-center gap-2"
            >
              <Home className="w-4 h-4" /> Home
            </button>
            <button 
              onClick={() => setShowCategories(!showCategories)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${showCategories ? 'bg-white dark:bg-gray-600 text-emerald-600 dark:text-emerald-400 shadow-sm' : 'text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-600'}`}
            >
              <LayoutGrid className="w-4 h-4" /> Categories
            </button>
            <button 
              onClick={() => setShowCart(!showCart)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${showCart ? 'bg-white dark:bg-gray-600 text-emerald-600 dark:text-emerald-400 shadow-sm' : 'text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-600'}`}
            >
              <ShoppingCart className="w-4 h-4" /> Cart
              {cart.length > 0 && <span className="bg-emerald-500 text-white text-[10px] px-1.5 rounded-full">{cart.length}</span>}
            </button>
            <button 
              onClick={() => setShowAccountModal(true)}
              className="px-4 py-1.5 rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-600 hover:shadow-sm transition-all flex items-center gap-2"
            >
              <User className="w-4 h-4" /> My Account
            </button>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
             <div className="relative hidden sm:block w-64">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400 dark:text-gray-500" />
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border-transparent focus:bg-white dark:focus:bg-gray-600 border focus:border-emerald-500 dark:focus:border-emerald-400 rounded-lg outline-none transition-all text-sm dark:text-white dark:placeholder-gray-400"
                />
              </div>

              <button 
                onClick={toggleDarkMode}
                className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {user ? (
                <button 
                  onClick={() => setShowAccountModal(true)}
                  className="w-9 h-9 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center text-emerald-700 dark:text-emerald-300 font-bold hover:ring-2 ring-emerald-500 transition-all"
                >
                  {user.username.charAt(0).toUpperCase()}
                </button>
              ) : (
                <button onClick={() => onNavigate('login')} className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                  Login
                </button>
              )}
          </div>
        </div>
        
        {/* Mobile Navigation Bar */}
        <nav className="md:hidden flex items-center justify-around border-t dark:border-gray-700 py-2 bg-white dark:bg-gray-800">
            <button onClick={() => onNavigate('landing')} className="flex flex-col items-center gap-1 text-xs font-medium text-gray-500 dark:text-gray-400">
              <Home className="w-5 h-5" /> Home
            </button>
            <button onClick={() => setShowCategories(!showCategories)} className={`flex flex-col items-center gap-1 text-xs font-medium ${showCategories ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-500 dark:text-gray-400'}`}>
              <LayoutGrid className="w-5 h-5" /> Categories
            </button>
            <button onClick={() => setShowCart(!showCart)} className={`flex flex-col items-center gap-1 text-xs font-medium ${showCart ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-500 dark:text-gray-400'}`}>
              <div className="relative">
                <ShoppingCart className="w-5 h-5" />
                {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-[8px] w-3 h-3 flex items-center justify-center rounded-full">{cart.length}</span>}
              </div> 
              Cart
            </button>
            <button onClick={() => setShowAccountModal(true)} className="flex flex-col items-center gap-1 text-xs font-medium text-gray-500 dark:text-gray-400">
              <User className="w-5 h-5" /> Account
            </button>
        </nav>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden print:hidden">
        {/* Left: Product Grid */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          
          {/* Categories Bar (Collapsible) */}
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${showCategories ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
             <div className="px-4 py-3 flex gap-2 overflow-x-auto border-b dark:border-gray-700 bg-white dark:bg-gray-800 no-scrollbar">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    activeCategory === cat 
                      ? 'bg-emerald-600 text-white shadow-md' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50 dark:bg-gray-900 transition-colors">
            {/* Mobile Search Bar (if visible on mobile header) */}
            <div className="sm:hidden mb-4">
                <div className="relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400 dark:text-gray-500" />
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg outline-none text-sm dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredProducts.map(product => (
                <div key={product.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-3 hover:shadow-md transition-all flex flex-col group">
                  <div className="aspect-square bg-gray-50 dark:bg-gray-700 rounded-lg mb-3 flex items-center justify-center overflow-hidden relative">
                    {product.image ? (
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://placehold.co/500x500/e2e8f0/1e293b?text=Box";
                        }}
                      />
                    ) : (
                      <span className="text-4xl">📦</span>
                    )}
                    <button 
                      onClick={() => addToCart(product)}
                      className="absolute bottom-2 right-2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity text-emerald-600 dark:text-emerald-400"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200 line-clamp-1 text-sm md:text-base" title={product.name}>{product.name}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{product.category}</p>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">₹{product.price}</span>
                    <button 
                      onClick={() => addToCart(product)}
                      className="md:hidden p-1.5 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Cart (Sidebar) */}
        {showCart && (
          <div className="w-full md:w-96 bg-white dark:bg-gray-800 border-l dark:border-gray-700 shadow-xl flex flex-col z-20 transition-all absolute inset-0 md:relative md:flex">
            <div className="p-4 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Current Bill
              </h2>
              <button onClick={() => setShowCart(false)} className="md:hidden p-2 text-gray-500 hover:bg-gray-200 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center text-gray-400 dark:text-gray-500 mt-10">
                  <ShoppingCart className="w-12 h-12 mx-auto mb-3 opacity-20" />
                  <p>Cart is empty</p>
                  <p className="text-sm">Select items to add</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex items-center gap-3 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg border border-gray-100 dark:border-gray-600">
                    <div className="w-12 h-12 bg-white dark:bg-gray-600 rounded-md flex items-center justify-center text-xl shadow-sm overflow-hidden shrink-0">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <span>📦</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 dark:text-white truncate text-sm">{item.name}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-300">₹{item.price} x {item.quantity}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-6 h-6 flex items-center justify-center bg-white dark:bg-gray-600 border dark:border-gray-500 rounded hover:bg-gray-50 dark:hover:bg-gray-500 dark:text-white"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-4 text-center text-sm font-medium dark:text-white">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-6 h-6 flex items-center justify-center bg-white dark:bg-gray-600 border dark:border-gray-500 rounded hover:bg-gray-50 dark:hover:bg-gray-500 dark:text-white"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600 p-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="p-4 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 space-y-3">
              <div className="flex justify-between text-gray-600 dark:text-gray-400 text-sm">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400 text-sm">
                <span>Tax (5%)</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white pt-2 border-t dark:border-gray-600">
                <span>Total</span>
                <span>₹{(subtotal + tax).toFixed(2)}</span>
              </div>
              
              <button 
                onClick={handleInitialCheckoutClick}
                disabled={cart.length === 0}
                className="w-full bg-emerald-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:bg-emerald-700 transition-colors mt-2"
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Account Modal */}
      {showAccountModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-sm overflow-hidden transform transition-all">
             <div className="bg-emerald-600 dark:bg-emerald-700 p-6 text-center relative">
               <button 
                 onClick={() => setShowAccountModal(false)}
                 className="absolute top-4 right-4 text-emerald-100 hover:text-white"
               >
                 <X className="w-5 h-5" />
               </button>
               <div className="w-20 h-20 bg-white rounded-full mx-auto flex items-center justify-center text-3xl font-bold text-emerald-600 shadow-lg mb-3">
                 {user?.username.charAt(0).toUpperCase() || <UserCircle className="w-12 h-12" />}
               </div>
               <h2 className="text-xl font-bold text-white">{user?.name || user?.username || 'Guest'}</h2>
               <p className="text-emerald-100 capitalize">{user?.role || 'Visitor'}</p>
             </div>
             
             <div className="p-6 space-y-4">
               {user ? (
                 <>
                   <div className="flex justify-between items-center py-2 border-b dark:border-gray-700">
                     <span className="text-gray-500 dark:text-gray-400 text-sm">Phone</span>
                     <span className="font-medium text-gray-900 dark:text-white">{user.phone || 'N/A'}</span>
                   </div>
                   {currentLoggedCustomer && (
                     <div className="flex justify-between items-center py-2 border-b dark:border-gray-700">
                       <span className="text-gray-500 dark:text-gray-400 text-sm">My Debt</span>
                       <span className={`font-bold ${currentLoggedCustomer.debt > 0 ? 'text-red-500' : 'text-green-500'}`}>
                         ₹{currentLoggedCustomer.debt}
                       </span>
                     </div>
                   )}
                   {user.role === 'admin' && (
                     <button 
                       onClick={() => onNavigate('admin')}
                       className="w-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white py-2 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                     >
                       Admin Dashboard
                     </button>
                   )}
                   <button 
                     onClick={onLogout}
                     className="w-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 py-2 rounded-lg font-medium hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors flex items-center justify-center gap-2"
                   >
                     <LogOut className="w-4 h-4" /> Logout
                   </button>
                 </>
               ) : (
                 <div className="text-center">
                   <p className="text-gray-500 mb-4">Please login to access account details.</p>
                   <button 
                     onClick={() => onNavigate('login')}
                     className="w-full bg-emerald-600 text-white py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                   >
                     Login
                   </button>
                 </div>
               )}
             </div>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 print:hidden">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] transition-colors">
            
            {/* Success View */}
            {isSuccess ? (
              <div className="w-full flex flex-col items-center justify-center p-12 text-center">
                <div className="bg-green-100 dark:bg-green-900/30 p-6 rounded-full mb-6">
                  <CheckCircle className="w-16 h-16 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Payment Successful!</h2>
                <p className="text-gray-500 dark:text-gray-400">Transaction #{lastTransactionId}</p>
                <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600 w-full max-w-md space-y-3">
                   <div className="flex justify-between border-b dark:border-gray-600 pb-2">
                     <span className="text-gray-600 dark:text-gray-300">Amount Paid</span>
                     <span className="font-bold text-gray-900 dark:text-white">₹{amountPaid.toFixed(2)}</span>
                   </div>
                   {remainingBalance > 0 && (
                     <div className="flex justify-between border-b dark:border-gray-600 pb-2 text-red-600 dark:text-red-400">
                       <span>Added to Debt</span>
                       <span className="font-bold">₹{remainingBalance.toFixed(2)}</span>
                     </div>
                   )}
                   <div className="flex justify-between pt-1">
                     <span className="text-gray-600 dark:text-gray-300">Total Bill</span>
                     <span className="font-bold text-emerald-700 dark:text-emerald-400 text-lg">₹{total.toFixed(2)}</span>
                   </div>
                </div>
                
                <div className="flex flex-wrap gap-4 mt-8 justify-center">
                  <button 
                    onClick={handlePrint}
                    className="px-6 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-xl font-medium flex items-center gap-2 hover:bg-gray-800 dark:hover:bg-gray-600"
                  >
                    <Printer className="w-5 h-5" /> Print / Save PDF
                  </button>

                  <button 
                    onClick={handleDownloadPdf}
                    disabled={isGeneratingPdf}
                    className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium flex items-center gap-2 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isGeneratingPdf ? <Loader className="w-5 h-5 animate-spin"/> : <FileDown className="w-5 h-5" />}
                    Download PDF
                  </button>

                  <button 
                    onClick={closeCheckout}
                    className="px-6 py-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-xl font-medium hover:bg-emerald-200 dark:hover:bg-emerald-900/50"
                  >
                    New Order
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Left: Bill Summary & Adjustments */}
                <div className="flex-1 bg-gray-50 dark:bg-gray-900/50 p-6 flex flex-col border-b md:border-b-0 md:border-r dark:border-gray-700 overflow-hidden">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> Order Details
                  </h3>
                  
                  {/* Items List */}
                  <div className="flex-1 overflow-y-auto space-y-3 pr-2 mb-4 bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    {cart.map(item => (
                      <div key={item.id} className="flex justify-between text-sm items-center">
                        <div className="flex items-center gap-2">
                           <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded text-xs font-bold">{item.quantity}x</span>
                           <span className="text-gray-800 dark:text-gray-200 font-medium">{item.name}</span>
                        </div>
                        <span className="font-medium text-gray-600 dark:text-gray-400">₹{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  {/* Calculations & Discounts */}
                  <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between text-gray-600 dark:text-gray-400 text-sm">
                      <span>Subtotal</span>
                      <span>₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600 dark:text-gray-400 text-sm">
                      <span>Tax (5%)</span>
                      <span>₹{tax.toFixed(2)}</span>
                    </div>
                    
                    {/* Enhanced Discount Controls */}
                    <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 space-y-3">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                <Tag className="w-4 h-4 text-emerald-500" />
                                Apply Discount
                            </label>
                            {discountAmount > 0 && (
                                <span className="text-xs font-medium text-red-500 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded-full">
                                    -₹{discountAmount.toFixed(2)}
                                </span>
                            )}
                        </div>
                        
                        <div className="flex gap-2">
                            <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                                <button 
                                    onClick={() => setDiscountType('fixed')}
                                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${discountType === 'fixed' ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'}`}
                                >
                                    ₹ Fixed
                                </button>
                                <button 
                                    onClick={() => setDiscountType('percent')}
                                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${discountType === 'percent' ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'}`}
                                >
                                    % Percent
                                </button>
                            </div>
                            <div className="relative flex-1">
                                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                     <span className="text-gray-500 dark:text-gray-400 font-bold sm:text-sm">
                                         {discountType === 'fixed' ? '₹' : '%'}
                                     </span>
                                 </div>
                                 <input
                                     type="number"
                                     min="0"
                                     value={discountValue || ''}
                                     onChange={(e) => setDiscountValue(Math.max(0, parseFloat(e.target.value) || 0))}
                                     placeholder="0"
                                     className="block w-full pl-8 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition duration-150 ease-in-out"
                                 />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between text-2xl font-bold text-emerald-700 dark:text-emerald-400 pt-3 border-t dark:border-gray-700">
                      <span>Total</span>
                      <span>₹{total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Right: Payment & Customer */}
                <div className="flex-1 p-6 flex flex-col bg-white dark:bg-gray-800 overflow-y-auto">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">Finalize Payment</h3>
                    <button onClick={() => setIsCheckoutOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  {/* Customer Search */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Customer (Optional)</label>
                    <div className="relative">
                      {selectedCustomer ? (
                        <div className="flex items-center justify-between p-3 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="bg-emerald-200 dark:bg-emerald-800 p-2 rounded-full">
                              <UserCircle className="w-5 h-5 text-emerald-800 dark:text-emerald-200" />
                            </div>
                            <div>
                              <p className="font-bold text-emerald-900 dark:text-emerald-100">{selectedCustomer.name}</p>
                              <p className="text-xs text-emerald-700 dark:text-emerald-300">{selectedCustomer.phone}</p>
                            </div>
                          </div>
                          <div className="text-right">
                             <p className="text-xs text-emerald-600 dark:text-emerald-400">Debt</p>
                             <p className="font-bold text-emerald-800 dark:text-emerald-200">₹{selectedCustomer.debt}</p>
                          </div>
                          {!currentLoggedCustomer && (
                             <button onClick={() => setSelectedCustomer(null)} className="ml-2 text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-200">
                               <X className="w-4 h-4" />
                             </button>
                          )}
                        </div>
                      ) : (
                        <div>
                          <div className="relative">
                            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400 dark:text-gray-500" />
                            <input 
                              type="text"
                              placeholder="Search Customer..."
                              value={customerSearch}
                              onChange={(e) => setCustomerSearch(e.target.value)}
                              className="w-full pl-9 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                          </div>
                          {customerSearch && (
                            <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg mt-1 max-h-48 overflow-y-auto z-20">
                              {filteredCustomers.map(c => (
                                <button 
                                  key={c.id} 
                                  onClick={() => { setSelectedCustomer(c); setCustomerSearch(""); }}
                                  className="w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 flex justify-between items-center"
                                >
                                  <div>
                                    <p className="font-medium text-gray-800 dark:text-gray-200">{c.name}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{c.phone}</p>
                                  </div>
                                  {c.debt > 0 && <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-2 py-1 rounded">Debt: ₹{c.debt}</span>}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="mb-6">
                    <label className="block text-sm font-bold text-gray-800 dark:text-gray-200 mb-3">Select Payment Mode</label>
                    <div className="grid grid-cols-3 gap-4">
                      {paymentMethodOptions.map((method) => {
                          const isSelected = paymentMethod === method.id;
                          let activeClass = '';
                          
                          if (method.id === 'cash') {
                              activeClass = 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-500 text-emerald-700 dark:text-emerald-400';
                          } else if (method.id === 'online') {
                              activeClass = 'bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-700 dark:text-blue-400';
                          } else { // credit
                              activeClass = 'bg-orange-50 dark:bg-orange-900/20 border-orange-500 text-orange-700 dark:text-orange-400';
                          }

                          return (
                              <button
                                  key={method.id}
                                  onClick={() => setPaymentMethod(method.id as PaymentMethod)}
                                  className={`relative p-4 rounded-xl border-2 flex flex-col items-center gap-3 transition-all duration-200 ${
                                      isSelected 
                                      ? `${activeClass} shadow-md transform scale-[1.02]` 
                                      : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                                  }`}
                              >
                                  {isSelected && (
                                      <div className="absolute top-2 right-2">
                                         <CheckCircle className="w-5 h-5" />
                                      </div>
                                  )}
                                  <method.icon className={`w-8 h-8 ${isSelected ? '' : 'opacity-60 grayscale'}`} />
                                  <span className="font-bold text-sm">{method.label}</span>
                              </button>
                          )
                      })}
                    </div>
                  </div>

                  {/* Amount Paid / Split Payment */}
                  <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-xl border border-gray-100 dark:border-gray-700">
                     <div className="flex justify-between items-center mb-2">
                       <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Amount Paying Now</label>
                       {remainingBalance > 0 && <span className="text-xs text-red-500 dark:text-red-400 font-medium">Partial Payment</span>}
                     </div>
                     <div className="relative">
                       <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 font-bold">₹</span>
                       <input 
                         type="number"
                         min="0"
                         max={total}
                         value={amountPaid}
                         disabled={paymentMethod === 'credit'}
                         onChange={(e) => {
                           let val = parseFloat(e.target.value);
                           if (isNaN(val)) val = 0;
                           setAmountPaid(val);
                         }}
                         className={`w-full pl-8 pr-4 py-3 text-xl font-bold border rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 ${
                            remainingBalance > 0 ? 'border-orange-300 dark:border-orange-700 text-orange-800 dark:text-orange-300' : 'border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white'
                         } ${paymentMethod === 'credit' ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500' : 'bg-white dark:bg-gray-700'}`}
                       />
                     </div>
                     
                     {remainingBalance > 0 && (
                       <div className="mt-3 flex items-center gap-2 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-2 rounded-lg border border-red-100 dark:border-red-800">
                         <AlertTriangle className="w-4 h-4 shrink-0" />
                         <span>₹{remainingBalance.toFixed(2)} will be added to Customer Debt</span>
                       </div>
                     )}
                     
                     {!selectedCustomer && remainingBalance > 0 && (
                       <p className="text-xs text-red-500 mt-2">
                         * You must select a customer to allow partial payment.
                       </p>
                     )}
                  </div>

                  {/* Action */}
                  <div className="mt-auto">
                    <button 
                      onClick={processPayment}
                      className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
                    >
                      Confirm Order
                      <span className="bg-emerald-800/30 px-2 py-0.5 rounded text-sm">₹{total.toFixed(2)}</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Print Receipt Template - Positioned off-screen for HTML2Canvas but available for window.print() via CSS */}
      <div 
        ref={receiptRef}
        className="fixed -left-[9999px] top-0 w-[210mm] bg-white p-8 text-black print:left-0 print:z-[9999] print:block"
      >
         <div className="text-center mb-6 border-b pb-4 border-dashed border-gray-400">
           <h1 className="text-3xl font-bold mb-1">Smart Store</h1>
           <p className="text-sm text-gray-600">General Store & Supplies</p>
           <p className="text-sm text-gray-600">Phone: +91 98765 43210</p>
           <div className="mt-4 flex justify-between text-sm">
             <span>Date: {new Date().toLocaleDateString()}</span>
             <span>Time: {new Date().toLocaleTimeString()}</span>
           </div>
           {selectedCustomer && (
             <div className="mt-2 text-left text-sm border-t border-dashed border-gray-300 pt-2">
               <p>Customer: {selectedCustomer.name}</p>
               <p>Phone: {selectedCustomer.phone}</p>
             </div>
           )}
         </div>

         <div className="flex-1">
           <table className="w-full text-sm mb-6">
             <thead>
               <tr className="border-b border-black">
                 <th className="text-left py-2">Item</th>
                 <th className="text-center py-2">Qty</th>
                 <th className="text-right py-2">Price</th>
                 <th className="text-right py-2">Total</th>
               </tr>
             </thead>
             <tbody>
               {cart.map((item, idx) => (
                 <tr key={idx} className="border-b border-gray-200 border-dashed">
                   <td className="py-2">{item.name}</td>
                   <td className="text-center py-2">{item.quantity}</td>
                   <td className="text-right py-2">{item.price}</td>
                   <td className="text-right py-2">{(item.price * item.quantity).toFixed(2)}</td>
                 </tr>
               ))}
             </tbody>
           </table>
         </div>

         <div className="border-t border-black pt-4 space-y-1 text-sm">
           <div className="flex justify-between">
             <span>Subtotal</span>
             <span>{subtotal.toFixed(2)}</span>
           </div>
           <div className="flex justify-between">
             <span>Tax (5%)</span>
             <span>{tax.toFixed(2)}</span>
           </div>
           {discountAmount > 0 && (
             <div className="flex justify-between">
               <span>Discount</span>
               <span>-{discountAmount.toFixed(2)}</span>
             </div>
           )}
           <div className="flex justify-between text-lg font-bold border-t border-dashed border-gray-400 pt-2 mt-2">
             <span>Total</span>
             <span>₹{total.toFixed(2)}</span>
           </div>
           <div className="flex justify-between mt-2">
             <span>Amount Paid</span>
             <span>{amountPaid.toFixed(2)}</span>
           </div>
           {remainingBalance > 0 && (
             <div className="flex justify-between font-bold">
               <span>Balance (Debt)</span>
               <span>{remainingBalance.toFixed(2)}</span>
             </div>
           )}
         </div>

         <div className="text-center mt-12 text-sm text-gray-600">
           <p>Thank you for shopping with us!</p>
           <p className="text-xs mt-2">Powered by Smart POS</p>
         </div>
      </div>

    </div>
  );
}
