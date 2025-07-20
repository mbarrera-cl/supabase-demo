import { Outlet, Navigate, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';

export default function Layout() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setLoading(false);
    };

    getSession();
  }, []);

  const handleLogout = async () => {
    
    await supabase.auth.signOut();
    navigate('/login', { replace: true });
  };

  if (loading) return <div className="p-6">Cargando sesión...</div>;
  if (!session) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 hidden md:block">
        <h1 className="text-2xl font-bold mb-6">DentistaApp</h1>
        <nav className="space-y-4">
          <Link to="/dashboard" className="block text-gray-700 hover:text-blue-600">Dashboard</Link>
          <Link to="/pacientes" className="block text-gray-700 hover:text-blue-600">Pacientes</Link>
          <Link to="/citas" className="block text-gray-700 hover:text-blue-600">Presupuestos</Link>
          <Link to="/configuracion" className="block text-gray-700 hover:text-blue-600">Configuración</Link>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow p-4 flex items-center justify-between">
          <span className="text-xl font-semibold">Panel Principal</span>
          <div className="flex items-center gap-4">
            <span className="text-gray-700">{session.user.email}</span>
     <button
        onClick={handleLogout}
        className="btn btn-sm btn-outline btn-error"
      >
        Cerrar sesión
      </button>
          </div>
        </header>

        <main className="p-6">
          <div className="bg-white rounded-lg shadow p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
