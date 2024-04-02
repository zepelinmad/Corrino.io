import React from 'react';
import Head from 'next/head';
import TransactionsComponent from '../components/TransactionsComponent'; // Adjust the import path as necessary

const TransactionsPage: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Transactions</title>
        <meta name="description" content="View and manage your transactions" />
      </Head>

      <main>
        <h1 className="text-2xl font-bold text-center my-8">My Transactions</h1>
        <TransactionsComponent />
      </main>
    </div>
  );
};

export default TransactionsPage;
