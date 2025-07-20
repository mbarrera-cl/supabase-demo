import { Routes, Route } from 'react-router-dom';
import Login from '../components/login/Login';
import Layout from "../components/layouts/Layout";
import PatientsPage from '../components/formulario/PatientsPage';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

     <Route element={<Layout />}>
        <Route path="/registrar" element={<PatientsPage />} />
      </Route>

    </Routes>
  );
}
