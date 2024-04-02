import React from 'react';
import PortfolioInitializationForm from '../components/PortfolioInitializationForm';

const DashboardPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold leading-tight text-gray-900">Initialize Your Portfolio</h1>
      <PortfolioInitializationForm />
    </div>
  );
};

export default DashboardPage;
