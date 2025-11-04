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
  status: "Ativo" | "Inativo";
}
