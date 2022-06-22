import GlobalStyle from './styles/global';
import Main from './pages/Main';
import { AuthProvider } from './contexts/auth';
import Routes from './routes';

export function App() {
  return (
    <AuthProvider>
      <GlobalStyle />
      <Routes />
    </AuthProvider>
  )
}

export default App
