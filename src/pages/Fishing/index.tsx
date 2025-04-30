import { useEffect, useState } from "react";
import { TableFishing } from "../../components/tableFishing";
import { fishingService } from "../../services/fishingService";
import { Filters } from "../../components/filters";

const collums = [
  {
    id: 1,
    label: "Código de Registro",
  },
  {
    id: 2,
    label: "Código de Referência",
  },
  {
    id: 3,
    label: "Data de descarga",
  },
  {
    id: 4,
    label: "Unidade produtiva",
  },
  {
    id: 5,
    label: "Entrevistador",
  },
  {
    id: 6,
    label: "Ação",
  },
];

export const Fishing = () => {
  const [dataTable, setDataTable] = useState([]);
  const [dataTableFiltrada, setDataTableFiltrada] = useState([]);
  const [dataFilters, setDataFilters] = useState([]);
  const getPesca = async () => {
    try {
      const data = await fishingService.getPesca();
      setDataTable(data);
      setDataTableFiltrada(data)
    } catch (error) {
      console.error("Erro", error);
    }
  };

  const getFilters = async () => {
    try {
      const data = await fishingService.getFilter();
      setDataFilters(data);
    } catch (error) {
      console.error("Erro", error);
    }
  };

  useEffect(() => {
    getPesca();
  }, []);
  useEffect(() => {
    getFilters();
  }, []);

  return (
    <>
      <Filters
        dataFilters={dataFilters}
        dataOriginal={dataTable}
        onFiltrado={(dadosFiltrados) => setDataTableFiltrada(dadosFiltrados)}
      />
      <TableFishing dataTable={dataTableFiltrada} collums={collums} />
    </>
  );
};
