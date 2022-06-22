import { Container, FileInfo, Preview } from "./styles";
import { CircularProgressbar } from 'react-circular-progressbar';
import {MdCheckCircle, MdError, MdLink} from 'react-icons/md';

interface UploadedFiles {
  file: any,
  id: string,
  name: string,
  readableSize: string,
  preview: string,
  progress: number,
  uploaded: boolean,
  error: boolean,
  url: string,
}

export default function FileList({files}: any) {
  return (
    <Container>
      {files.map((uploadedFile: UploadedFiles) => (
        <li key={uploadedFile.id}>
        <FileInfo>
          <Preview src={uploadedFile.preview} />
          <div>
            <strong>{uploadedFile.name}</strong>
            <span>{uploadedFile.readableSize}
              { !!uploadedFile.url && 
                <button onClick={() => {}}>Excluir</button>
              }
            </span>
          </div>
        </FileInfo>

        <div>
          {!uploadedFile.uploaded && !uploadedFile.error && (
              <CircularProgressbar 
              styles={{
                root: {width: 24},
                path: { stroke: '#ff9c31'}
              }}
              strokeWidth={10}
              value={uploadedFile.progress}
            />
          )}

          {uploadedFile.url && (
            <a
              href={uploadedFile.url}
              target="_blank"
            >
              <MdLink style={{marginRight: 8}} size={24} color="#222" />
            </a>
          )}

          { uploadedFile.uploaded && <MdCheckCircle size={24} color="#78e5d5" />}

          { uploadedFile.error && <MdError size={24} color="#e57878" /> }

        </div>
      </li>
      ))}
    </Container>
  );
}