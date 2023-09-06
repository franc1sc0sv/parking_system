import { clienteAxios } from "../config/axios";

export const obtenerParqueos = async () => {
  try {
    const { data } = await clienteAxios.get("http://localhost:8080/parqueos");
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const realziarReserva = async (datos) => {
  try {
    const { data } = await clienteAxios.post(
      "http://localhost:8080/reservas",
      datos
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const obtenerReservas = async () => {
  try {
    const { data } = await clienteAxios.get("http://localhost:8080/reservas");
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const finalizarReserva = async (id) => {
  try {
    const { data } = await clienteAxios.get(
      `http://localhost:8080//reservas/${id}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
