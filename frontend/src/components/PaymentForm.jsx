import React, { useState } from 'react';

const PaymentForm = ({ onPaymentSuccess }) => {
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expMonth: '',
    expYear: '',
    cvv: '',
  });

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setCardDetails({ ...cardDetails, [name]: value });
  // };

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cardDetails),
      });
      const result = await response.json();
      if (result.success) {
        onPaymentSuccess(result.transactionDetails);
      } else {
        alert(result.message || 'Payment failed');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Something went wrong');
    }
  };

  return (
    <section className='mt-24'>
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
        Payment Form
      </h2>
      <form onSubmit={handlePayment} className="space-y-4">
        <div>
          <label className="block text-gray-600 font-medium mb-1">Card Number</label>
          <input
            type="text"
            name="cardNumber"
            placeholder="1234 5678 9012 3456"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={cardDetails.cardNumber}
            onChange={(e) => {
              let value = e.target.value.replace(/\D/g, ''); // Allow only numbers
              value = value.replace(/(\d{4})/g, '$1 ').trim(); // space after 4 digits
              setCardDetails({ ...cardDetails, cardNumber: value });
            }}
            maxLength="19"
          />

        </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-600 font-medium mb-1">Exp Month</label>
          <input
            type="text"
            name="expMonth"
            placeholder="MM"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={cardDetails.expMonth}
            onChange={(e) => {
              let value = e.target.value.replace(/\D/g, ''); // Allow only numbers
              if (value.length > 2) value = value.slice(0, 2); // Limit to 2 digits
              if (value > 12) value = '12'; 
              setCardDetails({ ...cardDetails, expMonth: value });
            }}
            required
          />
        </div>

        <div>
          <label className="block text-gray-600 font-medium mb-1">Exp Year</label>
          <input
            type="text"
            name="expYear"
            placeholder="YYYY"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={cardDetails.expYear}
            onChange={(e) => {
              let value = e.target.value.replace(/\D/g, ''); // Allow only numbers
              if (value.length > 4) value = value.slice(0, 4); // Limit to 4 digits
              setCardDetails({ ...cardDetails, expYear: value });
            }}
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-gray-600 font-medium mb-1">CVV</label>
        <input
          type="text"
          name="cvv"
          placeholder="123"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={cardDetails.cvv}
          onChange={(e) => {
            let value = e.target.value.replace(/\D/g, ''); // Allow only numbers
            if (value.length > 3) value = value.slice(0, 3); // Limit to 3 digits
            setCardDetails({ ...cardDetails, cvv: value });
          }}
          required
        />
      </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Pay
        </button>
      </form>
    </div>
    </section>
  );
};

export default PaymentForm;
