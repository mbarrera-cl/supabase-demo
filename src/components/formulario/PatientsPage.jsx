import { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import RegisterPatient from './RegisterPatient';
import PatientList from './PatientList';

export default function PatientsPage() {
  const [patients, setPatients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);

  const fetchPatients = async () => {
    const { data, error } = await supabase
      .from('patients')
      .select('*')
      .eq('disabled', false)
      .order('id', { ascending: false });

    if (!error) setPatients(data);
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleEdit = (patient) => {
    setEditingPatient(patient);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const { error } = await supabase
      .from('patients')
      .update({ disabled: true })
      .eq('id', id);

    if (!error) fetchPatients();
    else console.error(error);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingPatient(null);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Lista de Pacientes</h2>
        <button
          className="btn btn-primary"
          onClick={() => {
            setEditingPatient(null);
            setShowModal(true);
          }}
        >
          Agregar Paciente
        </button>
      </div>

      <PatientList patients={patients} onEdit={handleEdit} onDelete={handleDelete} />

      {showModal && (
        <RegisterPatient
          onClose={closeModal}
          onPatientAdded={fetchPatients}
          patientToEdit={editingPatient}
        />
      )}
    </div>
  );
}
