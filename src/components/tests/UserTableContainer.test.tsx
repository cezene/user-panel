import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserProvider } from '../../context/UserContext';
import UserTableContainer from '../UserTableContainer';

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
  removeItem: jest.fn(),
  key: jest.fn(),
  length: 0,
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

global.fetch = jest.fn();

jest.mock('../ui/SearchBar', () => {
  return function MockSearchBar({
    value,
    onChange,
  }: {
    value: string;
    onChange: (value: string) => void;
  }) {
    return (
      <input
        data-testid="search-bar"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Pesquisar..."
      />
    );
  };
});

jest.mock('../ui/UserForm', () => {
  return function MockUserForm({
    user,
    open,
    onClose,
    onSubmit,
  }: {
    user?: any;
    open: boolean;
    onClose: () => void;
    onSubmit: (userData: any) => void;
  }) {
    if (!open) return null;

    return (
      <div data-testid="user-form" role="dialog">
        <h2>{user ? 'Edit User' : 'New User'}</h2>
        <button
          data-testid="submit-form"
          onClick={() =>
            onSubmit({
              id: user?.id || Date.now(),
              name: 'Marta Pereira',
              email: 'marta@gmail.com',
              status: 'Ativo',
            })
          }
        >
          {user ? 'Update' : 'Create'}
        </button>
        <button data-testid="close-form" onClick={onClose}>
          Cancel
        </button>
      </div>
    );
  };
});

jest.mock('../ui/DeleteConfirmation', () => {
  return function MockDeleteConfirmation({
    open,
    user,
    onClose,
    onConfirm,
  }: {
    open: boolean;
    user: any;
    onClose: () => void;
    onConfirm: () => void;
  }) {
    if (!open) return null;

    return (
      <div data-testid="delete-confirmation" role="dialog">
        <h2>Confirm Delete</h2>
        <p>Delete {user?.name}?</p>
        <button data-testid="confirm-delete" onClick={onConfirm}>
          Confirm
        </button>
        <button data-testid="cancel-delete" onClick={onClose}>
          Cancel
        </button>
      </div>
    );
  };
});

const mockUsers = [
  {
    id: 1,
    name: 'João Silva',
    email: 'joao@teste.com',
    status: 'Ativo',
  },
  {
    id: 2,
    name: 'Maria Teste',
    email: 'maria@teste.com',
    status: 'Ativo',
  },
];

describe('Integration Test', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    localStorageMock.clear.mockClear();
    (global.fetch as jest.Mock).mockClear();
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockUsers,
    });
    localStorageMock.getItem.mockReturnValue(null);
  });

  it('Load API users', async () => {
    render(
      <UserProvider>
        <UserTableContainer />
      </UserProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('João Silva')).toBeInTheDocument();
    });

    expect(screen.getByText('João Silva')).toBeInTheDocument();
    expect(screen.getByText('joao@teste.com')).toBeInTheDocument();
    expect(screen.getByText('Maria Teste')).toBeInTheDocument();
    expect(screen.getByText('maria@teste.com')).toBeInTheDocument();
  });

  it("Change user's status", async () => {
    const user = userEvent.setup();

    render(
      <UserProvider>
        <UserTableContainer />
      </UserProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('João Silva')).toBeInTheDocument();
    });

    const rows = screen.getAllByRole('row');
    const userRow = rows.find((row) => within(row).queryByText('João Silva'));
    expect(userRow).toBeDefined();

    const activeStatus = within(userRow!).getByText('Ativo');
    expect(activeStatus).toBeInTheDocument();

    const deleteButton = within(userRow!).getByLabelText(/deletar/i);
    await user.click(deleteButton);

    await waitFor(() => {
      expect(screen.getByTestId('delete-confirmation')).toBeInTheDocument();
    });

    const confirmButton = screen.getByTestId('confirm-delete');
    await user.click(confirmButton);

    await waitFor(() => {
      const inactiveStatus = within(userRow!).getByText('Inativo');
      expect(inactiveStatus).toBeInTheDocument();
    });

    expect(within(userRow!).queryByText('Ativo')).not.toBeInTheDocument();
  });

  it('creates new user', async () => {
    const user = userEvent.setup();

    render(
      <UserProvider>
        <UserTableContainer />
      </UserProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('João Silva')).toBeInTheDocument();
    });

    await user.click(screen.getByText(/novo usuário/i));

    await waitFor(() => {
      expect(screen.getByTestId('user-form')).toBeInTheDocument();
    });

    await user.click(screen.getByTestId('submit-form'));

    await waitFor(() => {
      expect(screen.getByText('Marta Pereira')).toBeInTheDocument();
    });
  });
});
