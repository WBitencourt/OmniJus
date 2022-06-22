import GlobalStyle from './styles/global';
import Main from './pages/Main';
import { AuthProvider } from './contexts/auth';

export function App() {
  return (
    <AuthProvider>
      <GlobalStyle />
      <Main />
    </AuthProvider>
  )
}

export default App
