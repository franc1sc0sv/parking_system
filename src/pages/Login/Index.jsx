import React from "react";
import { Link } from "react-router-dom";
import InputField from "../../components/Form/Input";

const Login = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full sm:w-96">
        <h2 className="text-3xl font-semibold mb-4">Iniciar Sesión</h2>
        <form>
          <InputField
            label="Correo Electrónico"
            type="email"
            id="email"
            placeholder="correo@example.com"
          />
          <InputField
            label="Contraseña"
            type="password"
            id="password"
            placeholder="********"
          />
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Iniciar Sesión
            </button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <Link to="/" className="text-gray-400 hover:text-gray-200">
            Volver al Inicio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
