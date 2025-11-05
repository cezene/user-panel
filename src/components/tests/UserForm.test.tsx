import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UserForm from '../ui/UserForm';

const mockOnSubmit = jest.fn();
const mockOnClose = jest.fn();

describe('Creates new user', () => {
  it('creates new user', async () => {
    render(
      <UserForm open={true} onClose={mockOnClose} onSubmit={mockOnSubmit} />
    );

    fireEvent.change(screen.getByLabelText(/nome/i), {
      target: { value: 'Novo Usuário' },
    });

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'novo@email.com' },
    });

    fireEvent.click(screen.getByText('Criar'));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        id: 0,
        name: 'Novo Usuário',
        email: 'novo@email.com',
        status: 'Ativo',
      });
    });
  });

  it('validate fields', async () => {
    render(
      <UserForm open={true} onClose={mockOnClose} onSubmit={mockOnSubmit} />
    );

    fireEvent.click(screen.getByText('Criar'));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled();
    });
  });
});
