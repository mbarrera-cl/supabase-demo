import { Routes, Route } from 'react-router-dom';
import Login from '../components/login/Login';
import Layout from '../components/layouts/Layout';
import PatientsPage from '../components/formulario/PatientsPage';
import ProtectedRoute from './ProtectedRoute';

export default function AppRouter() {
  return (
    <Routes>
      {/* Pública */}
      <Route path="/login" element={<Login />} />

      {/* Rutas protegidas, gestionadas por el router */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/pacientes" element={<PatientsPage />} />
          {/* más rutas seguras aquí */}
        </Route>
      </Route>
    </Routes>
  );
}
