import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { PatientView } from './pages/PatientView';
import { AmbulanceView } from './pages/AmbulanceView';
import { HospitalView } from './pages/HospitalView';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/patient" element={<PatientView />} />
          <Route path="/ambulance" element={<AmbulanceView />} />
          <Route path="/hospital" element={<HospitalView />} />
          <Route path="/" element={<Navigate to="/patient" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;