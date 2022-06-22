import { Container } from './styles'
import File from './File';
import FileList from './FileList';
import { useEffect, useState } from 'react';
import { uid } from '../../utils/UniqueID';
import { fileSize } from '../../utils/FileSize';
import api from '../../services/api';

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

export function Upload() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFiles[]>([]);
  const [pendingFilesUpload, setPendingFilesUpload] = useState<UploadedFiles[]>([]);

  function handleUpload(files: any) {
    const File: UploadedFiles[] = files.map((file: any) => ({
      file,
      id: uid(),
      name: file.name,
      readableSize: fileSize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: null,
    }));
    console.log(File)

    setPendingFilesUpload(File);
    setUploadedFiles((prevState) => [ ...prevState, ...File ]);

    //uploadedFiles.forEach(processUpload)
  }

  useEffect(() => {
    pendingFilesUpload.forEach(processUpload);
  }, [pendingFilesUpload]);


  function updateFile(id: string, data: any) {
    setUploadedFiles((prevState) => {
      const fileUpdated = prevState.map((file) => {
        return file.id === id ? {...file, ...data} : file
      })

      return fileUpdated;
    });
  }

  function processUpload({id, name, file}: UploadedFiles) {
    const data = new FormData();

    data.append('file', file, name);

    api.post('files', data, {
      onUploadProgress: event => {
        const progress = parseInt(Math.round((event.loaded * 100) / event.total).toString())

        updateFile(id, {progress})
      }
    }).then(() => {

    }).catch(() => {

    })
  } 

  return (
    <Container>
      <File onUpload={(files) => handleUpload(files)} />
      { !!uploadedFiles.length && (
        <FileList files={uploadedFiles} />
      )}
      {/* <p style={{color: 'red'}}>{JSON.stringify(uploadedFiles)}</p> */}
    </Container>
  );
}