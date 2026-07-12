import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Vehicles from './pages/Vehicles';
import Drivers from './pages/Drivers';
import Trips from './pages/Trips';
import CreateTrip from './pages/CreateTrip';
import Maintenance from './pages/Maintenance';
import FuelExpenses from './pages/FuelExpenses';
import Reports from './pages/Reports';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/drivers" element={<Drivers />} />
          <Route path="/trips" element={<Trips />} />
          <Route path="/trips/new" element={<CreateTrip />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/fuel-expenses" element={<FuelExpenses />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
