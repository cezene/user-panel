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
import { useState } from 'react';

const UserForm = ({ user, open, onClose, onSubmit }: UserFormProps) => {
  const [formData, setFormData] = useState<User>({
    id: user?.id || 0,
    name: user?.name || '',
    email: user?.email || '',
    status: user?.status || 'Ativo',
  });

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
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
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
            />

            <TextField
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange('email')}
              fullWidth
            />
            {!!isEditing && (
              <FormControl component="fieldset">
                <FormLabel component="legend">Status</FormLabel>
                <RadioGroup
                  row
                  value={formData.status}
                  onChange={handleChange('status')}
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
