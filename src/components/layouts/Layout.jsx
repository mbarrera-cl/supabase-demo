import { Outlet, Link } from 'react-router-dom';

export default function Layout() {
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
            <span className="text-gray-700">Dra. Martínez</span>
            <button className="text-sm text-blue-600 hover:underline">Cerrar sesión</button>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <div className="bg-white rounded-lg shadow p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
