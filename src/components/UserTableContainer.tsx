import { useState } from 'react';
import { Box, Container, Button, Stack, IconButton } from '@mui/material';
import { Add, Sort } from '@mui/icons-material';
import UserTable from './ui/UserTable';
import SearchBar from './ui/SearchBar';
import UserForm from './ui/UserForm';
import DeleteConfirmation from './ui/DeleteConfirmation';

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
  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null); 

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setFormOpen(true);
  };

  const handleDeleteClick = (user: User) => {
    setDeletingUser(user);
    setDeleteOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (deletingUser) {
      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u.id === deletingUser.id ? { ...u, status: 'Inativo' } : u
        )
      );
      setDeleteOpen(false);
      setDeletingUser(null);
    }
  };

  const handleAddUser = () => {
    setEditingUser(null);
    setFormOpen(true);
  };

  const handleSort = () => {
    if (isSorted) {
      setUsers((prevUsers) => [...prevUsers].sort((a, b) => a.id - b.id));
    } else {
      setUsers((prevUsers) =>
        [...prevUsers].sort((a, b) => a.name.localeCompare(b.name))
      );
    }
    setIsSorted(!isSorted);
  };

  const handleFormSubmit = (formData: User) => {
    if (editingUser) {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === editingUser.id
            ? { ...formData, id: editingUser.id }
            : user
        )
      );
    } else {
      const newUser: User = {
        ...formData,
        id: Math.max(...users.map((u) => u.id)) + 1,
      };
      setUsers((prevUsers) => [...prevUsers, newUser]);
    }

    setFormOpen(false);
    setEditingUser(null);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <UserForm
        user={editingUser}
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditingUser(null);
        }}
        onSubmit={handleFormSubmit}
      />

      <DeleteConfirmation
        open={deleteOpen}
        user={deletingUser}
        onClose={() => {
          setDeleteOpen(false);
          setDeletingUser(null);
        }}
        onConfirm={handleDeleteConfirm}
      />

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
        onDelete={handleDeleteClick}
      />
    </Container>
  );
};

export default UserTableContainer;
