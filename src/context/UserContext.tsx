import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
} from 'react';

type UserAction =
  | { type: 'SET_USERS'; payload: User[] }
  | { type: 'ADD_USER'; payload: User }
  | { type: 'UPDATE_USER'; payload: User }
  | { type: 'DELETE_USER'; payload: number }
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'TOGGLE_SORT' };

const initialState: UserState = {
  users: [],
  searchTerm: '',
  isSorted: false,
};

const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case 'SET_USERS':
      return { ...state, users: action.payload };

    case 'ADD_USER':
      return {
        ...state,
        users: [...state.users, action.payload],
      };

    case 'UPDATE_USER':
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
      };

    case 'DELETE_USER':
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload
            ? { ...user, status: 'Inativo' as const }
            : user
        ),
      };

    case 'SET_SEARCH':
      return { ...state, searchTerm: action.payload };

    case 'TOGGLE_SORT':
      const sortedUsers = state.isSorted
        ? [...state.users].sort((a, b) => a.id - b.id)
        : [...state.users].sort((a, b) => a.name.localeCompare(b.name));

      return {
        ...state,
        users: sortedUsers,
        isSorted: !state.isSorted,
      };

    default:
      return state;
  }
};

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users'
      );

      const data = await response.json();

      const users: User[] = data.map((user: any) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        status: 'Ativo' as const,
      }));

      dispatch({ type: 'SET_USERS', payload: users });
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const addUser = (userData: Omit<User, 'id'>) => {
    const newUser: User = {
      ...userData,
      id: Math.max(...state.users.map((u) => u.id), 0) + 1,
    };
    dispatch({ type: 'ADD_USER', payload: newUser });
  };

  const updateUser = (user: User) => {
    dispatch({ type: 'UPDATE_USER', payload: user });
  };

  const deleteUser = (id: number) => {
    dispatch({ type: 'DELETE_USER', payload: id });
  };

  const setSearchTerm = (term: string) => {
    dispatch({ type: 'SET_SEARCH', payload: term });
  };

  const toggleSort = () => {
    dispatch({ type: 'TOGGLE_SORT' });
  };

  const getFilteredUsers = () => {
    return state.users.filter(
      (user) =>
        user.name.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(state.searchTerm.toLowerCase())
    );
  };

  const value: UserContextType = {
    state,
    addUser,
    updateUser,
    deleteUser,
    setSearchTerm,
    toggleSort,
    getFilteredUsers,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext deve ser usado dentro de UserProvider');
  }
  return context;
};

export default UserContext;
