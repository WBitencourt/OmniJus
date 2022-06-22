import useAuth from '../contexts/auth';
import {Container, Header} from './styles';
import Main from '../pages/Main';

const Routes = () => {
  const {signed, loading} = useAuth();

  if (loading) {
    return (
      <Container>
        <Header>Loading...</Header>
      </Container>
    );
  }

  return signed ? <Main /> : <Main />;
};

export default Routes;
