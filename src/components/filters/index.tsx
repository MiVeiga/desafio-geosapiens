import React, { useState } from "react";
import { Box, Button, MenuItem, Select, TextField, RadioGroup, FormControlLabel, Radio } from "@mui/material";

type TipoCampo = "text" | "number" | "date" | "bool";

interface Filtro {
  campo: string;
  operador: string;
  valor: string;
}

interface DefinicaoCampo {
  identificador: string;
  campo: string;
  tipo: TipoCampo;
  operadores: string[];
}

export const Filters = ({ dataFilters, dataOriginal, onFiltrado }) => {
  const [filtros, setFiltros] = useState<any>([]);

  const adicionarFiltro = () => setFiltros([...filtros, {}]);
  const limpar = () => {
    setFiltros([]);
    onFiltrado(dataOriginal);
  };

  const handleCampoChange = (i: number, campo: string) => {
    setFiltros((prev) =>
      prev.map((f, idx) =>
        idx === i ? { campo, operador: undefined, valor: "" } : f
      )
    );
  };
  const handleOperadorChange = (i: number, operador: string) => {
    setFiltros((prev) =>
      prev.map((f, idx) => (idx === i ? { ...f, operador, valor: "" } : f))
    );
  };

  const handleValorChange = (i: number, valor: string) => {
    setFiltros((prev) =>
      prev.map((f, idx) => (idx === i ? { ...f, valor } : f))
    );
  };

  function compararValoresPorTipo(
    valItem: any,
    valor: string,
    operador: string,
    tipo: "text" | "number" | "date" | "bool"
  ): boolean {
    let valorComparado: any;

    switch (tipo) {
      case "number":
        valorComparado = Number(valor);
        break;
      case "bool":
        valorComparado = valor === "true" || valor === "1";
        break;
      case "date":
        valorComparado = valor;
        break;
      default:
        valorComparado = String(valor);
    }

    switch (operador) {
      case "=":
        return tipo === "number" || tipo === "bool"
          ? valItem === valorComparado
          : String(valItem) === String(valorComparado);

      case "!=":
        return tipo === "number" || tipo === "bool"
          ? valItem !== valorComparado
          : String(valItem) !== String(valorComparado);

      case ">":
        return Number(valItem) > Number(valorComparado);

      case "<":
        return Number(valItem) < Number(valorComparado);

      case ">=":
        return Number(valItem) >= Number(valorComparado);

      case "<=":
        return Number(valItem) <= Number(valorComparado);

      case "contém":
        return String(valItem)
          .toLowerCase()
          .includes(String(valorComparado).toLowerCase());

      case "não contém":
        return !String(valItem)
          .toLowerCase()
          .includes(String(valorComparado).toLowerCase());

      case "entre": {
        const [inicio, fim] = valor.split(",").map((v) => v.trim());
        if (tipo === "number") {
          return (
            Number(valItem) >= Number(inicio) && Number(valItem) <= Number(fim)
          );
        }
        if (tipo === "date") {
          return valItem >= inicio && valItem <= fim;
        }
        return false;
      }

      default:
        return true;
    }
  }

  const aplicar = () => {
    const filtrosValidos = filtros.filter(
      (f: Filtro) => f.campo && f.operador && f.valor !== undefined && f.valor !== ""
    );

    const resultadoFiltrado = dataOriginal.filter((item: any) =>
      filtrosValidos.every(({ campo, operador, valor }) => {
        const definicaoCampo = dataFilters.find((c: DefinicaoCampo) => c.identificador === campo);
        if (!definicaoCampo) return true;
        return compararValoresPorTipo(item[campo], valor, operador, definicaoCampo.tipo);
      })
    );

    onFiltrado(resultadoFiltrado);
  };
  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 4 }}>
        {filtros.map((filtro, i) => {
          const campo = dataFilters.find(
            (c) => c.identificador === filtro.campo
          );
          return (
            <Box key={i} sx={{ display: "flex", gap: 2 }}>
              <Select
                value={filtro.campo || ""}
                displayEmpty
                onChange={(e) => handleCampoChange(i, e.target.value)}
                sx={{ width: 200 }}
              >
                <MenuItem value="" disabled>
                  Campo
                </MenuItem>
                {dataFilters.map((c) => (
                  <MenuItem key={c.identificador} value={c.identificador}>
                    {c.campo}
                  </MenuItem>
                ))}
              </Select>
              <Select
                value={filtro.operador || ""}
                displayEmpty
                disabled={!filtro.campo}
                onChange={(e) => handleOperadorChange(i, e.target.value)}
                sx={{ width: 150 }}
              >
                <MenuItem value="" disabled>
                  Operador
                </MenuItem>
                {campo?.operadores.map((op) => (
                  <MenuItem key={op} value={op}>
                    {op}
                  </MenuItem>
                ))}
              </Select>
              {campo?.tipo === 'bool' && filtro.operador ? (
                <RadioGroup
                  row
                  value={filtro.valor || ''}
                  onChange={(e) => handleValorChange(i, e.target.value)}
                >
                  <FormControlLabel value="true" control={<Radio />} label="Sim" />
                  <FormControlLabel value="false" control={<Radio />} label="Não" />
                </RadioGroup>
              ) : (
                <TextField
                  type={
                    campo?.tipo === "number"
                      ? "number"
                      : campo?.tipo === "date"
                      ? "date"
                      : "text"
                  }
                  placeholder={
                    campo?.tipo === "date" && filtro.operador === "entre"
                      ? "AAAA-MM-DD,AAAA-MM-DD"
                      : "Valor"
                  }
                  value={filtro.valor || ""}
                  onChange={(e) => handleValorChange(i, e.target.value)}
                  disabled={!filtro.operador || campo?.tipo === 'bool'}
                  sx={{ width: 200 }}
                />
              )}
            </Box>
          );
        })}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button variant="contained" onClick={() => adicionarFiltro()}>
            Adicionar Filtro
          </Button>
          <Button variant="outlined" onClick={() => limpar()}>
            Limpar
          </Button>
          <Button variant="contained" color="success" onClick={() => aplicar()}>
            Aplicar
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
