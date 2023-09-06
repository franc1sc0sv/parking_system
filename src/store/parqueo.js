import { create } from "zustand";

const parqueoIDs = create((set) => ({
  parqueo: null,
  setParqueo: (value) =>
    set(({ parqueo }) => ({
      parqueo: typeof value === "undefined" ? !parqueo : value,
    })),
}));

export { parqueoIDs };
