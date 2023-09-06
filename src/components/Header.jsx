import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="p-4 bg-gray-800">
      <nav className="container flex items-center justify-between mx-auto">
        <Link to="/" className="text-2xl font-bold">
          Tu Parqueo
        </Link>
        <div className="hidden space-x-4 md:flex">
          <Link to="/" className="text-white">
            Inicio
          </Link>
          <Link to="/parkingSlot" className="text-white">
            Parqueos
          </Link>
          <Link to="/reserves" className="text-white">
            Mis reservas
          </Link>
        </div>
        {/* <div className="space-x-4">
          <Link to="/login" className="text-white">
            Iniciar Sesión
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Registrarse
          </Link>
        </div> */}
      </nav>
    </header>
  );
};

export default Header;
