import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías hacer una petición a una API
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-base-200">
      <div className="w-full max-w-md p-8 space-y-4 bg-base-100 shadow-xl rounded-xl">
        <h2 className="text-2xl font-bold text-center">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Correo electrónico</span>
            </label>
            <input
              type="email"
              placeholder="usuario@correo.com"
              className="input input-bordered"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Contraseña</span>
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="input input-bordered"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">¿Olvidaste tu contraseña?</a>
            </label>
          </div>
          <div className="form-control">
            <button type="submit" className="btn btn-primary">Ingresar</button>
          </div>
        </form>
        <p className="text-center text-sm">
          ¿No tienes una cuenta? <a href="#" className="link link-hover text-primary">Regístrate</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
