import { render, screen } from '@testing-library/react';
import UserTable from '../ui/UserTable';

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
    status: 'Inativo',
  },
];

const mockOnEdit = jest.fn();
const mockOnDelete = jest.fn();

describe('UserTable - Renderização da Listagem', () => {
  it('deve renderizar a tabela com os usuários corretamente', () => {
    render(
      <UserTable
        users={mockUsers}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText('Nome')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Ações')).toBeInTheDocument();

    expect(screen.getByText('Maria Silva')).toBeInTheDocument();
    expect(screen.getByText('mariasilva@gmail.com')).toBeInTheDocument();
    expect(screen.getByText('João Santos')).toBeInTheDocument();
    expect(screen.getByText('joaosantos@hotmail.com')).toBeInTheDocument();

    expect(screen.getByText('Ativo')).toBeInTheDocument();
    expect(screen.getByText('Inativo')).toBeInTheDocument();
  });
});
