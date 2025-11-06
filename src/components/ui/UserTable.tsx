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
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className="table-header-cell">Nome</TableCell>
            <TableCell className="table-header-cell">Email</TableCell>
            <TableCell className="table-header-cell">Status</TableCell>
            <TableCell className="table-header-cell" align="center">
              Ações
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} className="table-body-row">
              <TableCell className="table-body-cell">{user.name}</TableCell>
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
                />
              </TableCell>
              <TableCell className="table-body-cell" align="center">
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                  <IconButton
                    size="small"
                    onClick={() => onEdit(user)}
                    aria-label="editar"
                    className="table-action-button"
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => onDelete(user)}
                    aria-label="deletar"
                    className="table-action-button"
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
