declare interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

declare interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

declare interface User {
  id: number;
  name: string;
  email: string;
  status: 'Ativo' | 'Inativo';
}

declare interface UserFormProps {
  user?: User | null;
  open: boolean;
  onClose: () => void;
  onSubmit: (userData: User) => void;
}

declare interface DeleteConfirmationProps {
  open: boolean;
  user: User | null;
  onClose: () => void;
  onConfirm: () => void;
}

declare interface UserState {
  users: User[];
  searchTerm: string;
  isSorted: boolean;
}
declare interface UserContextType {
  state: UserState;
  addUser: (user: Omit<User, 'id'>) => void;
  updateUser: (user: User) => void;
  deleteUser: (id: number) => void;
  setSearchTerm: (term: string) => void;
  toggleSort: () => void;
  getFilteredUsers: () => User[];
}
