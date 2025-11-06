import { memo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Box,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const UserTable = memo(({ users, onEdit, onDelete }: UserTableProps) => {
  return (
    <TableContainer className="table-container">
      <Table aria-label="Lista de usuários">
        <TableHead>
          <TableRow>
            <TableCell className="table-header-cell" scope="col">
              Nome
            </TableCell>
            <TableCell className="table-header-cell" scope="col">
              Email
            </TableCell>
            <TableCell className="table-header-cell" scope="col">
              Status
            </TableCell>
            <TableCell className="table-header-cell" align="center" scope="col">
              Ações
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => (
            <TableRow
              key={user.id}
              className="table-body-row"
              aria-rowindex={index + 2}
            >
              <TableCell className="table-body-cell" scope="row">
                {user.name}
              </TableCell>
              <TableCell className="table-body-cell">{user.email}</TableCell>
              <TableCell className="table-body-cell">
                <Chip
                  className={`status-chip ${
                    user.status === 'Ativo'
                      ? 'status-active'
                      : 'status-inactive'
                  }`}
                  label={user.status}
                  size="small"
                  variant="filled"
                  aria-label={`Status: ${user.status}`}
                />
              </TableCell>
              <TableCell className="table-body-cell" align="center">
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                  <IconButton
                    size="small"
                    onClick={() => onEdit(user)}
                    aria-label={`Editar usuário ${user.name}`}
                    className="table-action-button"
                    tabIndex={0}
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => onDelete(user)}
                    aria-label={`Deletar usuário ${user.name}`}
                    className="table-action-button"
                    tabIndex={0}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
});

export default UserTable;
