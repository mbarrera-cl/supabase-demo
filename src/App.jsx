import RegisterPatient from './RegisterPatient';

export default function App() {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <div className="card w-full max-w-md shadow-xl bg-white p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Clínica Dental</h1>
        <RegisterPatient />
      </div>
    </div>
  );
}
