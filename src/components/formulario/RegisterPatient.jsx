import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';

export default function RegisterPatient({ onClose, onPatientAdded, patientToEdit }) {
  const isEditing = !!patientToEdit;

  const [form, setForm] = useState({
    full_name: '',
    rut: '',
    email: '',
    phone: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (isEditing) {
      setForm({
        full_name: patientToEdit.full_name || '',
        rut: patientToEdit.rut || '',
        email: patientToEdit.email || '',
        phone: patientToEdit.phone || '',
      });
    }
  }, [patientToEdit]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError(false);

    let result;
    if (isEditing) {
      result = await supabase
        .from('patients')
        .update(form)
        .eq('id', patientToEdit.id);
    } else {
      result = await supabase.from('patients').insert([form]);
    }

    if (result.error) {
      setMessage('❌ Error al guardar paciente');
      setError(true);
      console.error(result.error);
    } else {
      setMessage('✅ Paciente guardado');
      setError(false);
      setForm({ full_name: '', rut: '', email: '', phone: '' });
      onPatientAdded();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-20 z-50">
      <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6 relative">
        <button className="absolute top-2 right-2 btn btn-sm btn-circle" onClick={onClose}>
          ✕
        </button>
        <h3 className="text-xl font-bold mb-4 text-center">
          {isEditing ? 'Editar Paciente' : 'Registrar Paciente'}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          {['full_name', 'rut', 'email', 'phone'].map((field) => (
            <div key={field}>
              <label className="label">
                <span className="label-text">
                  {{
                    full_name: 'Nombre completo',
                    rut: 'RUT',
                    email: 'Correo electrónico',
                    phone: 'Teléfono',
                  }[field]}
                </span>
              </label>
              <input
                name={field}
                type={field === 'email' ? 'email' : 'text'}
                value={form[field]}
                onChange={handleChange}
                className="input input-bordered w-full"
                required={field === 'full_name' || field === 'rut'}
              />
            </div>
          ))}

          <button type="submit" className="btn btn-primary w-full">
            {isEditing ? 'Guardar Cambios' : 'Registrar'}
          </button>

          {message && (
            <div className={`text-center text-sm mt-2 ${error ? 'text-red-600' : 'text-green-600'}`}>
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
