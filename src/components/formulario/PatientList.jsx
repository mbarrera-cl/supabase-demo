export default function PatientList({ patients, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto shadow rounded-lg bg-white">
      <table className="table w-full">
        <thead className="bg-base-200">
          <tr>
            <th>Nombre</th>
            <th>RUT</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {patients.length > 0 ? (
            patients.map((patient) => (
              <tr key={patient.id}>
                <td>{patient.full_name}</td>
                <td>{patient.rut}</td>
                <td>{patient.email}</td>
                <td>{patient.phone}</td>
                <td className="flex gap-2">
                  <button className="btn btn-sm btn-outline" onClick={() => onEdit(patient)}>
                    Editar
                  </button>
                  <button
                    className="btn btn-sm btn-error text-white"
                    onClick={() => onDelete(patient.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center text-gray-500 py-4">
                No hay pacientes activos.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
