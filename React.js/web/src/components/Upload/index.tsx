import { Container } from './styles'
import File from './File';
import FileList from './FileList';
import { useEffect, useState } from 'react';
import { uid } from '../../utils/UniqueID';
import { fileSize } from '../../utils/FileSize';
import api from '../../services/api';
import useAuth from '../../contexts/auth';

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

export interface ResponseGetFiles {
  id: number,
  createdAt: Date,
  name: string,
  size: number,
  key: string,
  url: string,
  userID: number
}

const userID = 20

export function Upload() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFiles[]>([]);
  const [pendingFilesUpload, setPendingFilesUpload] = useState<UploadedFiles[]>([]);
  const {user} = useAuth();

  //const userID = user.id;

  useEffect(() => {
    async function GetFiles() {
      const response = await api.get(`files/user/${userID}`);

      const files: UploadedFiles[] = response.data.map((file: ResponseGetFiles): UploadedFiles => ({
        id: file.id.toString(),
        name: file.name,
        readableSize: fileSize(file.size),
        preview: file.url,
        uploaded: true,
        url: file.url,
      } as UploadedFiles) )

      setUploadedFiles(files);
    }

    GetFiles();

    // return () => {
    //   //Remove Object URL to cache
    //   uploadedFiles.forEach(file => URL.revokeObjectURL(file.preview))
    // }
  }, [])

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
    setUploadedFiles((prevState) => [...prevState, ...File]);
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
    data.append('userID', userID.toString());

    api.post('files', data, {
      onUploadProgress: event => {
        const progress = parseInt(Math.round((event.loaded * 100) / event.total).toString())

        updateFile(id, {progress})
      }
    }).then((response) => {
      updateFile(id, {
        uploaded: true,
        id: response.data.id,
        url: response.data.url
      })
    }).catch(() => {
      updateFile(id, {
        error: true,
      })
    })
  } 

  async function handleDelete(id: string) {
    try {
      await api.delete(`files/${id}`)

      setUploadedFiles((prevState) => prevState.filter(file => file.id != id));
    } catch(error: any) {

      if (error.response.status != 200 )
      {
        alert("Fail to delete file, check your connection with the internet.");
      }
    }
  }

  return (
    <Container>
      <File onUpload={(files) => handleUpload(files)} />
      { !!uploadedFiles.length && (
        <FileList files={uploadedFiles} onDelete={handleDelete} />
      )}
      {/* <p style={{color: 'red'}}>{JSON.stringify(user)}</p> */}
    </Container>
  );
}