import { useState } from 'react';
import { supabase } from './supabaseClient';

export default function RegisterPatient() {
  const [form, setForm] = useState({
    full_name: '',
    rut: '',
    email: '',
    phone: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('patients').insert([form]);
    if (error) {
      setMessage('❌ Error al registrar paciente');
      console.error(error);
    } else {
      setMessage('✅ Paciente registrado exitosamente');
      setForm({ full_name: '', rut: '', email: '', phone: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-control space-y-4">
      <input
        className="input input-bordered"
        name="full_name"
        placeholder="Nombre completo"
        value={form.full_name}
        onChange={handleChange}
        required
      />
      <input
        className="input input-bordered"
        name="rut"
        placeholder="RUT"
        value={form.rut}
        onChange={handleChange}
        required
      />
      <input
        className="input input-bordered"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />
      <input
        className="input input-bordered"
        name="phone"
        placeholder="Teléfono"
        value={form.phone}
        onChange={handleChange}
      />
      <button type="submit" className="btn btn-primary">Registrar</button>
      {message && <div className="text-sm text-center mt-2">{message}</div>}
    </form>
  );
}
