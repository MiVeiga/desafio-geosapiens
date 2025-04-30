import { api } from "./api";

export const fishingService = {
  getPesca: async () => {
    const { data } = await api.get("v1/pesca/list");

    return data;
  },
  getFilter: async () => {
    const { data } = await api.get("v1/pesca/filtros");

    return data;
  },
};
