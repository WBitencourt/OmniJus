import { Container } from './styles'
import File from './File';
import FileList from './FileList';

export function Upload() {
  return (
    <Container>
      <File />
      <FileList />
    </Container>
  );
}