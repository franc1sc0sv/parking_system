import React from "react";
import Header from "../../components/Header";
import { useFetch } from "../../hooks/useFetch";
import { finalizarReserva, obtenerReservas } from "../../api";
import { useNavigate } from "react-router-dom";

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
  if (isLoading) return <p>Cargando . . .</p>;
  const navigate = useNavigate();

  const handlefinalizarReserva = async (id) => {
    await finalizarReserva(id);
    navigate("/parkingSlot");
  };

  return (
    <div className="min-h-screen text-white bg-gray-900">
      <Header />

      <section className="py-16 bg-gray-900">
        <div className="container mx-auto text-center">
          <h1 className="mb-4 text-2xl font-bold text-white">Mis reservas</h1>
          <div className="overflow-x-auto">
            <Table data={reservas} />
          </div>
        </div>
      </section>
    </div>
  );
};

const Table = ({ data }) => {
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
                <button className="px-2 py-1 mx-1 text-white bg-green-500 rounded">
                  Abrir Puerta
                </button>
                <button className="px-2 py-1 mx-1 text-white bg-red-500 rounded">
                  Cerrar Puerta
                </button>
                <button className="px-2 py-1 mx-1 text-white bg-yellow-500 rounded">
                  Finalizar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reservations;
