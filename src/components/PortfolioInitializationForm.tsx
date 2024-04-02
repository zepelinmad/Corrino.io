import React, { useState } from 'react';

interface PortfolioFormValues {
  balance: number;
  currency: string;
}

const PortfolioInitializationForm: React.FC = () => {
  const [formValues, setFormValues] = useState<PortfolioFormValues>({ balance: 0, currency: 'USD' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Replace `YOUR_API_ENDPOINT` with your actual portfolio creation endpoint
    const response = await fetch('/api/portfolio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formValues),
    });

    if (response.ok) {
      console.log('Portfolio created successfully');
      // Handle success, e.g., navigate to the dashboard or show a success message
    } else {
      console.error('Failed to create portfolio');
      // Handle error, e.g., show an error message
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="balance" className="block text-sm font-medium text-gray-700">Starting Balance</label>
        <input
          type="number"
          id="balance"
          name="balance"
          required
          value={formValues.balance}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        />
      </div>
      <div>
        <label htmlFor="currency" className="block text-sm font-medium text-gray-700">Currency</label>
        <select
          id="currency"
          name="currency"
          required
          value={formValues.currency}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 bg-white p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          {/* Add more currencies as needed */}
        </select>
      </div>
      <div>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Initialize Portfolio
        </button>
      </div>
    </form>
  );
};

export default PortfolioInitializationForm;
