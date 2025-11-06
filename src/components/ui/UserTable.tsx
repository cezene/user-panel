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
import { Edit, Delete, Sort } from '@mui/icons-material';

const UserTable = memo(
  ({ users, onEdit, onDelete, onSort, isSorted }: UserTableProps) => {
    return (
      <TableContainer className="table-container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="table-header-cell">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  Nome
                  <IconButton
                    size="small"
                    onClick={onSort}
                    sx={{
                      backgroundColor: isSorted ? '#e3f2fd' : 'transparent',
                      color: isSorted ? 'primary.main' : 'white',
                      '&:hover': {
                        backgroundColor: isSorted ? '#bbdefb' : 'action.hover',
                      },
                    }}
                    aria-label={
                      isSorted ? 'Remover ordenação' : 'Ordenar alfabeticamente'
                    }
                  >
                    <Sort fontSize="small" />
                  </IconButton>
                </Box>
              </TableCell>
              <TableCell className="table-header-cell">Email</TableCell>
              <TableCell className="table-header-cell">Status</TableCell>
              <TableCell className="table-header-cell" align="center">
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
                  <Box
                    sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => onEdit(user)}
                      aria-label={`Editar usuário ${user.name}`}
                      tabIndex={0}
                      className="table-action-button"
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => onDelete(user)}
                      aria-label={`Deletar usuário ${user.name}`}
                      tabIndex={0}
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
  }
);

export default UserTable;
