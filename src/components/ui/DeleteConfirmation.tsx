import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';

const DeleteConfirmation = ({
  open,
  user,
  onClose,
  onConfirm,
}: DeleteConfirmationProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmar Exclusão</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Tem certeza que deseja marcar o usuário <strong>{user?.name}</strong>{' '}
          como inativo?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          Sim, Marcar como Inativo
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmation;
