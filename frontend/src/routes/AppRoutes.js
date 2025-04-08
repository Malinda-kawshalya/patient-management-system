import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import Dashboard from '../pages/Dashboard';
import Patients from '../pages/Patients';
import Appointments from '../pages/Appointments';
import Doctors from '../pages/Doctors';
import Settings from '../pages/Settings';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout><Dashboard /></MainLayout>} />
      <Route path="/patients" element={<MainLayout><Patients /></MainLayout>} />
      <Route path="/appointments" element={<MainLayout><Appointments /></MainLayout>} />
      <Route path="/doctors" element={<MainLayout><Doctors /></MainLayout>} />
      <Route path="/settings" element={<MainLayout><Settings /></MainLayout>} />
    </Routes>
  );
};

export default AppRoutes;