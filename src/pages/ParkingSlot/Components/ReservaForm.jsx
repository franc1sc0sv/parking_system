import React, { useEffect, useState } from "react";
import { parqueoIDs } from "../../../store/parqueo";
import { useFormulario } from "../../../hooks/useFormulario";
import { useNavigate } from "react-router-dom";
import { realziarReserva } from "../../../api";

const ReservaForm = () => {
  const { parqueo } = parqueoIDs();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    mensajeError,
    registroExitoso,
    formState,
    data,
    reset,
    isLoading,
  } = useFormulario(realziarReserva);

  useEffect(() => {
    setValue("idParqueo", parqueo);
  }, []);

  useEffect(() => {
    if (registroExitoso) {
      navigate("/reserves");
    }
  }, [registroExitoso]);

  return (
    <div className="px-8 pb-8 mb-4 bg-white rounded shadow-md">
      <h2 className="mb-4 text-base text-black">
        Parqueo a reservar {parqueo >= 10 ? "" : "0"}
        {parqueo}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="fechaFinal"
          >
            Fecha Final:
          </label>
          <input
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="fechaFinal"
            type="datetime-local"
            placeholder="Fecha Final"
            {...register("fechaFinal")}
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Crear Reserva
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReservaForm;
