import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TablePagination,
} from "@mui/material";
import { useState } from "react";
import CheckIcon from '@mui/icons-material/Check';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';


export const TableFishing = ({ dataTable, collums }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {collums.map((col) => (
                <TableCell align="left" key={col.id}>
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {dataTable
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.registro_id}>
                  <TableCell align="left">{row?.registro_id}</TableCell>
                  <TableCell align="left">{row?.referencia_id}</TableCell>
                  <TableCell align="left">{row?.data_descarga}</TableCell>
                  <TableCell align="left">{row?.unidade_produtiva}</TableCell>
                  <TableCell align="left">{row?.entrevistador}</TableCell>
                  <TableCell align="left">
                    {row?.validado  ? (
                      <CheckIcon sx={{ color: 'green' }} />
                    ) : (
                      <WarningAmberIcon sx={{ color: 'goldenrod' }} />
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={dataTable.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </>
  );
};
