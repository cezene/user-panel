import { useState, useCallback, useMemo } from 'react';
import { Box, Container, Button, Stack } from '@mui/material';
import { Add } from '@mui/icons-material';
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

  const handleEdit = useCallback((user: User) => {
    setEditingUser(user);
    setFormOpen(true);
  }, []);

  const handleDeleteClick = useCallback((user: User) => {
    setDeletingUser(user);
    setDeleteOpen(true);
  }, []);

  const handleDeleteConfirm = useCallback(() => {
    if (deletingUser) {
      deleteUser(deletingUser.id);
      setDeleteOpen(false);
      setDeletingUser(null);
    }
  }, [deletingUser, deleteUser]);

  const handleAddUser = useCallback(() => {
    setEditingUser(null);
    setFormOpen(true);
  }, []);

  const handleFormClose = useCallback(() => {
    setFormOpen(false);
    setEditingUser(null);
  }, []);

  const handleDeleteClose = useCallback(() => {
    setDeleteOpen(false);
    setDeletingUser(null);
  }, []);

  const handleFormSubmit = useCallback(
    (formData: User) => {
      if (editingUser) {
        updateUser({ ...formData, id: editingUser.id });
      } else {
        addUser(formData);
      }
      setFormOpen(false);
      setEditingUser(null);
    },
    [editingUser, addUser, updateUser]
  );

  const filteredUsers = useMemo(() => getFilteredUsers(), [getFilteredUsers]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <UserForm
        user={editingUser}
        open={formOpen}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
      />

      <DeleteConfirmation
        open={deleteOpen}
        user={deletingUser}
        onClose={handleDeleteClose}
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
        onSort={toggleSort}
        isSorted={state.isSorted}
      />
    </Container>
  );
};

export default UserTableContainer;
