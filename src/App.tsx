/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import Shell from './components/layout/Shell';
import Dashboard from './components/dashboard/Overview';
import ReservoirMap from './components/map/ReservoirMap';
import ReservoirTable from './components/list/ReservoirTable';

export default function App() {
  const [activeTab, setActiveTab] = React.useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'map':
        return <ReservoirMap />;
      case 'data':
        return <ReservoirTable />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen">
      <Shell activeTab={activeTab} onTabChange={setActiveTab}>
        {renderContent()}
      </Shell>
    </div>
  );
}

