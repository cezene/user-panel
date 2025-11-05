import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { UserProvider, useUserContext } from '../../context/UserContext';

const TestComponent = () => {
  const {
    state,
    addUser,
    updateUser,
    deleteUser,
    setSearchTerm,
    toggleSort,
    getFilteredUsers,
  } = useUserContext();

  const handleAddUser = () => {
    addUser({
      name: 'Usuário Teste',
      email: 'teste@teste.com',
      status: 'Ativo',
    });
  };

  const handleUpdateUser = () => {
    if (state.users.length > 0) {
      const firstUser = state.users[0];
      updateUser({
        ...firstUser,
        name: 'Usuário Atualizado',
      });
    }
  };

  const handleDeleteUser = () => {
    if (state.users.length > 0) {
      deleteUser(state.users[0].id);
    }
  };

  const handleSearch = () => {
    setSearchTerm('teste');
  };

  const handleToggleSort = () => {
    toggleSort();
  };

  const filteredUsers = getFilteredUsers();

  return (
    <div>
      <span data-testid="users-count">{state.users.length}</span>
      <span data-testid="filtered-users-count">{filteredUsers.length}</span>
      <span data-testid="search-term">{state.searchTerm}</span>
      <span data-testid="is-sorted">{state.isSorted.toString()}</span>

      <button onClick={handleAddUser}>Adicionar Usuário</button>
      <button onClick={handleUpdateUser}>Atualizar Usuário</button>
      <button onClick={handleDeleteUser}>Deletar Usuário</button>
      <button onClick={handleSearch}>Buscar</button>
      <button onClick={handleToggleSort}>Ordenar</button>

      {state.users.map((user: User) => (
        <div key={user.id} data-testid={`user-${user.id}`}>
          <span data-testid={`user-name-${user.id}`}>{user.name}</span>
          <span data-testid={`user-status-${user.id}`}>{user.status}</span>
        </div>
      ))}
    </div>
  );
};

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

global.fetch = jest.fn();

describe('Updates global state', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    (global.fetch as jest.Mock).mockClear();
  });

  it('deve adicionar um usuário ao estado global', async () => {
    localStorageMock.getItem.mockReturnValue(null);
    (global.fetch as jest.Mock).mockResolvedValue({
      json: async () => [],
    });

    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('users-count')).toHaveTextContent('0');
    });

    fireEvent.click(screen.getByText('Adicionar Usuário'));

    await waitFor(() => {
      expect(screen.getByTestId('users-count')).toHaveTextContent('1');
    });

    await waitFor(() => {
      expect(screen.getByTestId('user-name-1')).toHaveTextContent(
        'Usuário Teste'
      );
    });

    expect(localStorageMock.setItem).toHaveBeenCalled();
  });

  it('updates existing user', async () => {
    const mockUsers = [
      {
        id: 1,
        name: 'Usuário Original',
        email: 'original@teste.com',
        status: 'Ativo',
      },
    ];
    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockUsers));

    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('users-count')).toHaveTextContent('1');
    });

    await waitFor(() => {
      expect(screen.getByTestId('user-name-1')).toHaveTextContent(
        'Usuário Original'
      );
    });

    fireEvent.click(screen.getByText('Atualizar Usuário'));

    await waitFor(() => {
      expect(screen.getByTestId('user-name-1')).toHaveTextContent(
        'Usuário Atualizado'
      );
    });
  });

  it('change user status to inactive', async () => {
    const mockUsers = [
      {
        id: 1,
        name: 'Usuário Para Deletar',
        email: 'deletar@teste.com',
        status: 'Ativo',
      },
    ];
    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockUsers));

    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('user-status-1')).toHaveTextContent('Ativo');
    });

    fireEvent.click(screen.getByText('Deletar Usuário'));

    await waitFor(() => {
      expect(screen.getByTestId('user-status-1')).toHaveTextContent('Inativo');
    });
  });

  it('filters users', async () => {
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
    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockUsers));

    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('users-count')).toHaveTextContent('2');
    });

    await waitFor(() => {
      expect(screen.getByTestId('filtered-users-count')).toHaveTextContent('2');
    });
  });

  it('order users', async () => {
    const mockUsers = [
      {
        id: 2,
        name: 'Bruno',
        email: 'bruno@teste.com',
        status: 'Ativo',
      },
      {
        id: 1,
        name: 'Ana',
        email: 'ana@teste.com',
        status: 'Ativo',
      },
    ];
    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockUsers));

    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('is-sorted')).toHaveTextContent('false');
    });

    fireEvent.click(screen.getByText('Ordenar'));

    await waitFor(() => {
      expect(screen.getByTestId('is-sorted')).toHaveTextContent('true');
    });
  });

  it('deve carregar usuários da API quando não há cache', async () => {
    localStorageMock.getItem.mockReturnValue(null);
    (global.fetch as jest.Mock).mockResolvedValue({
      json: async () => [
        { id: 1, name: 'Leanne Graham', email: 'Sincere@april.biz' },
      ],
    });

    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'https://jsonplaceholder.typicode.com/users'
      );
    });

    await waitFor(() => {
      expect(screen.getByTestId('users-count')).toHaveTextContent('1');
    });
  });

  it('deve carregar usuários do localStorage quando disponível', async () => {
    const cachedUsers = [
      {
        id: 1,
        name: 'Usuário Cache',
        email: 'cache@teste.com',
        status: 'Ativo',
      },
    ];

    localStorageMock.getItem.mockReturnValue(JSON.stringify(cachedUsers));

    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );

    await waitFor(() => {
      expect(global.fetch).not.toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(screen.getByTestId('users-count')).toHaveTextContent('1');
    });

    await waitFor(() => {
      expect(screen.getByTestId('user-name-1')).toHaveTextContent(
        'Usuário Cache'
      );
    });
  });
});
