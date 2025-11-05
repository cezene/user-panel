import { useState } from 'react';
import { Box, Container, Button, Stack, IconButton } from '@mui/material';
import { Add, Sort } from '@mui/icons-material';
import UserTable from './ui/UserTable';
import SearchBar from './ui/SearchBar';

const mockUsers: User[] = [
  {
    id: 1,
    name: 'Maria Silva',
    email: 'mariasilva@gmail.com',
    status: 'Ativo',
  },
  {
    id: 2,
    name: 'João Santos',
    email: 'joaosantos@hotmail.com',
    status: 'Ativo',
  },
  {
    id: 3,
    name: 'Ana Oliveira',
    email: 'ana.oliveira@company.com',
    status: 'Ativo',
  },
  {
    id: 4,
    name: 'Carlos Eduardo',
    email: 'carlos.eduardo@empresa.com',
    status: 'Inativo',
  },
];

const UserTableContainer = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSorted, setIsSorted] = useState(false);
  const [users, setUsers] = useState(mockUsers);

  const handleEdit = (user: User) => {
    console.log('Editar usuário:', user.name);
  };

  const handleDelete = (user: User) => {
    console.log('Deletar usuário:', user.name);
  };

  const handleAddUser = () => {
    console.log('Adicionar novo usuário');
  };

  const handleSort = () => {
    if (isSorted) {
      setUsers(mockUsers);
    } else {
      const sortedUsers = [...users].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setUsers(sortedUsers);
    }
    setIsSorted(!isSorted);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        sx={{
          mb: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="center"
          sx={{ width: '100%', maxWidth: '800px' }}
        >
          <SearchBar value={searchTerm} onChange={setSearchTerm} />

          <IconButton
            onClick={handleSort}
            sx={{
              border: '1px solid',
              borderColor: 'gray.300',
              borderRadius: 2,
              backgroundColor: isSorted ? '#b6d5f0' : 'transparent',
              color: 'primary.main',
              '&:hover': {
                backgroundColor: 'action.hover',
              },
              minWidth: 48,
              minHeight: 48,
            }}
            aria-label={
              isSorted ? 'Remover ordenação' : 'Ordenar alfabeticamente'
            }
          >
            <Sort />
          </IconButton>

          <Button
            className="add-user-button"
            variant="contained"
            startIcon={<Add />}
            onClick={handleAddUser}
          >
            Novo Usuário
          </Button>
        </Stack>
      </Box>

      <UserTable
        users={filteredUsers}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </Container>
  );
};

export default UserTableContainer;
