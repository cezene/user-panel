import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
} from '@mui/material';
import { useState, useEffect } from 'react';

const UserForm = ({ user, open, onClose, onSubmit }: UserFormProps) => {
  const [formData, setFormData] = useState<User>({
    id: 0,
    name: '',
    email: '',
    status: 'Ativo',
  });

  useEffect(() => {
    if (open) {
      if (user) {
        setFormData(user);
      } else {
        setFormData({
          id: 0,
          name: '',
          email: '',
          status: 'Ativo',
        });
      }
    }
  }, [open, user]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange =
    (field: keyof User) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  const isEditing = !!user;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      aria-labelledby="user-form-title"
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle id="user-form-title">
          {isEditing ? 'Editar Usuário' : 'Novo Usuário'}
        </DialogTitle>

        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 1 }}>
            <TextField
              label="Nome"
              value={formData.name}
              onChange={handleChange('name')}
              fullWidth
              autoFocus
              required
              aria-required="true"
            />

            <TextField
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange('email')}
              fullWidth
              required
              aria-required="true"
            />
            {!!isEditing && (
              <FormControl component="fieldset">
                <FormLabel component="legend">Status</FormLabel>
                <RadioGroup
                  row
                  value={formData.status}
                  onChange={handleChange('status')}
                  aria-label="Status do usuário"
                >
                  <FormControlLabel
                    value="Ativo"
                    control={<Radio />}
                    label="Ativo"
                  />
                  <FormControlLabel
                    value="Inativo"
                    control={<Radio />}
                    label="Inativo"
                  />
                </RadioGroup>
              </FormControl>
            )}
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="contained">
            {isEditing ? 'Atualizar' : 'Criar'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
export default UserForm;
