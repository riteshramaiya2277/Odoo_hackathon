
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, CreditCard, CheckCircle, X } from 'lucide-react';

const Payment = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([
    { id: 1, last4: '4242', brand: 'Visa', isDefault: true },
    { id: 2, last4: '8888', brand: 'Mastercard', isDefault: false },
  ]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddCard = (e) => {
    e.preventDefault();
    // In real app, this would save to backend
    alert('Card added successfully!');
    setIsAddModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white px-4 py-4 flex items-center justify-between shadow-sm z-20 sticky top-0">
        <div className="flex items-center">
          <button onClick={() => navigate(-1)} className="p-2 mr-4 rounded-full hover:bg-gray-100 transition-colors">
            <ArrowLeft className="w-6 h-6 text-black" />
          </button>
          <h1 className="text-xl font-bold tracking-tight">Payment</h1>
        </div>
        <button onClick={() => setIsAddModalOpen(true)} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <Plus className="w-6 h-6 text-black" />
        </button>
      </div>

      <div className="px-6 py-8">
        <div className="space-y-4">
          {cards.map(card => (
            <div key={card.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                <CreditCard className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{card.brand} •••• {card.last4}</h3>
                {card.isDefault && (
                  <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> Default
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Card Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-t-2xl sm:rounded-xl shadow-xl w-full max-w-lg">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Add Payment Method</h2>
              <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddCard} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                <input className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-blue-500" placeholder="1234 5678 9012 3456" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                  <input className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-blue-500" placeholder="MM/YY" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                  <input className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-blue-500" placeholder="123" />
                </div>
              </div>
              <div className="pt-4 flex gap-3 justify-end">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 border border-gray-200 rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">Add Card</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
