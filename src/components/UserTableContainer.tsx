import { useState } from 'react';
import { Box, Container, Button, Stack, IconButton } from '@mui/material';
import { Add, Sort } from '@mui/icons-material';
import UserTable from './ui/UserTable';
import SearchBar from './ui/SearchBar';
import UserForm from './ui/UserForm';
import DeleteConfirmation from './ui/DeleteConfirmation';
import { useUserContext } from '../context/UserContext';

const UserTableContainer = () => {
  const {
    state,
    addUser,
    updateUser,
    deleteUser,
    setSearchTerm,
    toggleSort,
    getFilteredUsers,
  } = useUserContext();

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
      deleteUser(deletingUser.id);
      setDeleteOpen(false);
      setDeletingUser(null);
    }
  };

  const handleAddUser = () => {
    setEditingUser(null);
    setFormOpen(true);
  };

  const handleFormSubmit = (formData: User) => {
    if (editingUser) {
      updateUser({ ...formData, id: editingUser.id });
    } else {
      addUser(formData);
    }

    setFormOpen(false);
    setEditingUser(null);
  };

  const filteredUsers = getFilteredUsers();

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
          <SearchBar value={state.searchTerm} onChange={setSearchTerm} />

          <IconButton
            onClick={toggleSort}
            sx={{
              border: '1px solid',
              borderColor: 'gray.300',
              borderRadius: 2,
              backgroundColor: state.isSorted ? '#b6d5f0' : 'transparent',
              color: 'primary.main',
              '&:hover': {
                backgroundColor: 'action.hover',
              },
              minWidth: 48,
              minHeight: 48,
            }}
            aria-label={
              state.isSorted ? 'Remover ordenação' : 'Ordenar alfabeticamente'
            }
          >
            <Sort />
          </IconButton>

          <Button
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
