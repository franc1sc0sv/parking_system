import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";

const Home = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Header />

      <section className="bg-gray-900 py-16">
        <div className="container mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl font-bold mb-4">
              ¡Bienvenido a Tu Parqueo!
            </h1>
            <p className="text-xl mb-4">
              Encuentra el lugar perfecto para estacionar tu vehículo.
            </p>
            <Link
              to="/search"
              className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
            >
              Empezar
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
