import './App.css';
import { lazy, Suspense } from 'react';
import { UserProvider } from './context/UserContext';
import Header from './components/ui/Header';
import Loading from './components/ui/Loading';

const UserTableContainer = lazy(
  () => import('./components/UserTableContainer')
);

function App() {
  return (
    <UserProvider>
      <Suspense fallback={<Loading />}>
        <Header />
        <UserTableContainer />
      </Suspense>
    </UserProvider>
  );
}

export default App;
