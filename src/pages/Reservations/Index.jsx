import React, { useState } from "react";
import Header from "../../components/Header";
import { useFetch } from "../../hooks/useFetch";
import { finalizarReserva, obtenerReservas } from "../../api";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { motion } from "framer-motion";

export const fechaNormal = (date, languaje = "es") => {
  return new Date(date).toLocaleDateString(languaje, {
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });
};

const Reservations = () => {
  const { reservas, isLoading } = useFetch("reservas", obtenerReservas);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handlefinalizarReserva = async (id) => {
    await finalizarReserva(id);
    navigate("/parkingSlot");
  };

  const handleAbrir = (id) => {
    setOpen(true);
  };

  const handleCerrar = (id) => {
    setOpen(true);
  };

  if (isLoading) return <p>Cargando . . .</p>;

  return (
    <div className="min-h-screen text-white bg-gray-900">
      <Header />

      <section className="py-16 bg-gray-900">
        <div className="container mx-auto text-center">
          <h1 className="mb-4 text-2xl font-bold text-white">Mis reservas</h1>
          <div className="overflow-x-auto">
            <Table
              handleAbrir={handleAbrir}
              handleCerrar={handleCerrar}
              handlefinalizarReserva={handlefinalizarReserva}
              data={reservas}
            />
          </div>
        </div>
      </section>

      <Alerta
        open={open}
        setOpen={setOpen}
        title={"Accion completada"}
        subtitle={"Tu solicitud se ha completado com exito"}
      />
    </div>
  );
};

const Table = ({ data, handlefinalizarReserva, handleAbrir, handleCerrar }) => {
  return (
    <div className="w-full p-4 overflow-x-auto">
      <table className="w-full mx-auto text-left bg-gray-800 border-collapse rounded-lg">
        <thead className="text-white">
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Número de Parqueo</th>
            <th className="px-4 py-2">Hora de Reserva Inicial</th>
            <th className="px-4 py-2">Hora de Reserva Final</th>
            <th className="px-4 py-2">Estado</th>
            <th className="px-4 py-2">Acciones</th>
          </tr>
        </thead>

        <tbody className="text-gray-700">
          {data.map((reservation, index) => (
            <tr
              key={reservation.id}
              className={index % 2 === 0 ? "bg-gray-600" : "bg-gray-700"}
            >
              <td className="px-4 py-2 text-white ">{reservation.id}</td>
              <td className="px-4 py-2 text-white ">
                {reservation.idParqueo >= 10 ? "" : "0"}
                {reservation.idParqueo}
              </td>
              <td className="px-4 py-2 text-white ">
                {fechaNormal(reservation.fechaInicial)}
              </td>
              <td className="px-4 py-2 text-white ">
                {fechaNormal(reservation.fechaFinal)}
              </td>
              <td className="px-4 py-2 text-white ">
                {reservation.estado === "activo" ? (
                  <span className="text-green-500">Activo</span>
                ) : (
                  <span className="text-red-500">Finalizado</span>
                )}
              </td>
              <td className="px-4 py-2">
                {reservation.estado === "activo" && (
                  <>
                    <button
                      onClick={() => {
                        handleAbrir(reservation.id);
                      }}
                      className="px-2 py-1 mx-1 text-white bg-green-500 rounded"
                    >
                      Abrir Puerta
                    </button>
                    <button
                      onClick={() => {
                        handleCerrar(reservation.id);
                      }}
                      className="px-2 py-1 mx-1 text-white bg-red-500 rounded"
                    >
                      Cerrar Puerta
                    </button>
                    <button
                      onClick={() => {
                        handlefinalizarReserva(reservation.id);
                      }}
                      className="px-2 py-1 mx-1 text-white bg-yellow-500 rounded"
                    >
                      Finalizar
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Alerta = ({ open, setOpen, title, subtitle }) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ translateY: "100%", opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          exit={{ translateY: "100%", opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{ translateX: "-50%" }}
          role="alert"
          className="fixed p-4 -translate-x-1/2 bg-white border border-gray-100 shadow-xl rounded-xl top-5 left-1/2"
        >
          <div className="flex items-start gap-4">
            <span className="text-green-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>

            <div className="flex-1">
              <strong className="block font-medium text-gray-900">
                {title}
              </strong>

              <p className="mt-1 text-sm text-gray-700">{subtitle}</p>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="text-gray-500 transition hover:text-gray-600"
            >
              <span className="sr-only">{"dismissPopup"}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Reservations;
