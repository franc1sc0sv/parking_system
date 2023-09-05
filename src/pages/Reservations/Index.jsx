import React from "react";
import Header from "../../components/Header";

const Reservations = () => {
  const reservationsData = [
    {
      id: 1,
      parkingNumber: "A1",
      startTime: "08:00 AM",
      endTime: "09:00 AM",
      isActive: true,
    },
    {
      id: 2,
      parkingNumber: "A2",
      startTime: "09:30 AM",
      endTime: "10:30 AM",
      isActive: false,
    },
    {
      id: 3,
      parkingNumber: "A3",
      startTime: "10:45 AM",
      endTime: "11:45 AM",
      isActive: true,
    },
    {
      id: 4,
      parkingNumber: "A4",
      startTime: "12:00 PM",
      endTime: "01:00 PM",
      isActive: false,
    },
    {
      id: 5,
      parkingNumber: "A5",
      startTime: "01:15 PM",
      endTime: "02:15 PM",
      isActive: true,
    },
    // Puedes agregar más datos de muestra según sea necesario
  ];

  return (
    <div className="min-h-screen text-white bg-gray-900">
      <Header />

      <section className="py-16 bg-gray-900">
        <div className="container mx-auto text-center">
          <h1 className="mb-4 text-2xl font-bold text-white">Mis reservas</h1>
          <div className="overflow-x-auto">
            <Table data={reservationsData} />
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
                {reservation.parkingNumber}
              </td>
              <td className="px-4 py-2 text-white ">{reservation.startTime}</td>
              <td className="px-4 py-2 text-white ">{reservation.endTime}</td>
              <td className="px-4 py-2 text-white ">
                {reservation.isActive ? (
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
