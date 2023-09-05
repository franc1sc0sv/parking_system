import React from "react";
import Header from "../../components/Header";

const ParkingSlot = () => {
  return (
    <div className="min-h-screen text-white bg-gray-900">
      <Header />

      <section className="py-16 bg-gray-900">
        <div className="container mx-auto text-center">
          <h1 className="mb-4 text-2xl font-bold text-white">
            Parqueos disponibles
          </h1>
          <div className="overflow-x-auto"></div>
        </div>
      </section>
    </div>
  );
};

export default ParkingSlot;
