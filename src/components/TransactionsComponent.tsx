import React, { useState, useEffect } from 'react';
import { useUser, useAuth } from '@clerk/clerk-react';

interface Transaction {
  id: string;
  date: string;
  ticker: string;
  price: number;
  quantity: number;
  commission: number;
}

const TransactionsComponent: React.FC = () => {
  const { user } = useUser();
  const { getToken } = useAuth(); // useAuth hook to get the session token
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newTransaction, setNewTransaction] = useState({
    date: '',
    ticker: '',
    price: '',
    quantity: '',
    commission: '',
  });

  useEffect(() => {
    // Fetch transactions when the component mounts and the user is signed in
    if (user) {
      fetchTransactions();
    }
  }, [user]);

  const fetchTransactions = async () => {
    try {
      const token = await getToken(); // Get the session token
      const response = await fetch('/api/transactions', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setTransactions(data);
      } else {
        console.error('Failed to fetch transactions');
      }
    } catch (error) {
      console.error('There was an error fetching the transactions:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTransaction({ ...newTransaction, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      console.error('No authenticated user found.');
      return;
    }

    try {
      const token = await getToken(); // Use getToken for the session token
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...newTransaction,
          price: parseFloat(newTransaction.price),
          quantity: parseInt(newTransaction.quantity, 10),
          commission: parseFloat(newTransaction.commission),
        }),
      });

      if (response.ok) {
        const addedTransaction = await response.json();
        setTransactions([...transactions, addedTransaction]);
        setIsModalOpen(false);
        setNewTransaction({
          date: '',
          ticker: '',
          price: '',
          quantity: '',
          commission: '',
        });
      } else {
        console.error('Failed to submit transaction');
      }
    } catch (error) {
      console.error('There was an error submitting the transaction:', error);
    }
  };

  return (
    <div>
      <h2>Transactions</h2>
      <button onClick={() => setIsModalOpen(true)}>Add Transaction</button>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Ticker</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Commission</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.date}</td>
              <td>{transaction.ticker}</td>
              <td>{transaction.price}</td>
              <td>{transaction.quantity}</td>
              <td>{transaction.commission}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div style={{ background: 'white', padding: '20px' }}>
          <form onSubmit={handleSubmit}>
            <label>Date:</label>
            <input
              type="date"
              name="date"
              value={newTransaction.date}
              onChange={handleInputChange}
            />
            <label>Ticker:</label>
            <input
              type="text"
              name="ticker"
              value={newTransaction.ticker}
              onChange={handleInputChange}
            />
            <label>Price:</label>
            <input
              type="number"
              name="price"
              value={newTransaction.price}
              onChange={handleInputChange}
            />
            <label>Quantity:</label>
            <input
              type="number"
              name="quantity"
              value={newTransaction.quantity}
              onChange={handleInputChange}
            />
            <label>Commission:</label>
            <input
              type="number"
              name="commission"
              value={newTransaction.commission}
              onChange={handleInputChange}
            />
            <button type="submit">Submit Transaction</button>
            <button type="button" onClick={() => setIsModalOpen(false)}>Close</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default TransactionsComponent;