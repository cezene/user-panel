import './App.css';
import Header from './components/ui/Header';
import UserTableContainer from './components/UserTableContainer';
import { UserProvider } from './context/UserContext';
function App() {
  return (
    <UserProvider>
      <Header />
      <UserTableContainer />
    </UserProvider>
  );
}

export default App;
