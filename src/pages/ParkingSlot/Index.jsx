import React, { useEffect } from "react";
import Header from "../../components/Header";
import ParkingContainer from "./Components/ParkingContainer";
import { useFetch } from "../../hooks/useFetch";
import { obtenerParqueos } from "../../api";
import { useModal } from "../../hooks/useModal";
import ReservaForm from "./Components/ReservaForm";
import { parqueoIDs } from "../../store/parqueo";

const ParkingSlot = () => {
  const { parqueos, isLoading } = useFetch("parqueos", obtenerParqueos);
  const [Modal, { modalState, toggleModal }] = useModal();
  const { setParqueo } = parqueoIDs();

  const handleReservar = (parqueo, sePuedeReservar) => {
    if (sePuedeReservar) {
      setParqueo(parqueo);
      toggleModal(true);
    }
  };

  if (isLoading) return <p>Cargando . . .</p>;
  return (
    <div className="min-h-screen text-white bg-gray-900">
      <Header />

      <section className="py-16 bg-gray-900">
        <div className="container mx-auto text-center">
          <h1 className="mb-4 text-2xl font-bold text-white">
            Parqueos disponibles
          </h1>
          <ParkingContainer
            handleReservar={handleReservar}
            parqueos={parqueos}
          />
        </div>
      </section>
      <Modal
        modalState={modalState}
        toggleModal={toggleModal}
        desktopTitle={"Realiza una reserva"}
      >
        <ReservaForm />
      </Modal>
    </div>
  );
};

export default ParkingSlot;
