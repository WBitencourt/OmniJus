import { Container, FileInfo, Preview } from "./styles";
import { CircularProgressbar } from 'react-circular-progressbar';
import {MdCheckCircle, MdError, MdLink} from 'react-icons/md';

export default function FileList() {
  return (
    <Container>
      <li>
        <FileInfo>
          <Preview src="http://localhost:3333/files/559c49142833293e3c15cbc9e6d6a421-spiderman.jpg" />
          <div>
            <strong>profile.png</strong>
            <span>64kb 
              <button onClick={() => {}}>Excluir</button>
            </span>
          </div>
        </FileInfo>

        <div>
          <CircularProgressbar 
            styles={{
              root: {width: 24},
              path: { stroke: '#ff9c31'}
            }}
            strokeWidth={10}
            value={60}
          />

          <a
            href="http://localhost:3333/files/559c49142833293e3c15cbc9e6d6a421-spiderman.jpg"
            target="_blank"
          >
            <MdLink style={{marginRight: 8}} size={24} color="#222" />
          </a>

          <MdCheckCircle size={24} color="#78e5d5" />

          <MdError size={24} color="#e57878" />

        </div>
      </li>
    </Container>
  );
}