import { clienteAxios } from "../config/axios";

export const obtenerParqueos = async () => {
  try {
    const { data } = await clienteAxios.get("/parqueos");
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const realziarReserva = async (datos) => {
  try {
    const { data } = await clienteAxios.post("/reservas", datos);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const obtenerReservas = async () => {
  try {
    const { data } = await clienteAxios.get("/reservas");
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const finalizarReserva = async (id) => {
  try {
    const { data } = await clienteAxios.put(`/reservas/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const obtenerParkeos = async () => {
  try {
    const { data } = await clienteAxios.get("/reservas");
    return data;
  } catch (error) {
    console.log(error);
  }
};
