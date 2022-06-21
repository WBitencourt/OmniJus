import { DropContainer, UploadMessage } from './styles'
import Dropzone, { Accept } from 'react-dropzone';

const filesAllow: Accept = {
  'image/*': ['.png', '.jpg', 'jpeg'],
  'application/*': ['.pdf'],
};

function renderDragMessage(isDragActive: boolean, isDragReject: boolean) {
  if(!isDragActive) {
    return <UploadMessage>Click or drop your files here...</UploadMessage>
  } 

  if(isDragReject) {
    return <UploadMessage type="error">File not supported</UploadMessage>
  } 

  return <UploadMessage type="success">Release your file here</UploadMessage>
}

export default function File() {
  return (
    <>
      <Dropzone 
        accept={filesAllow}
        onDropAccepted={() => {}}>
        {({getRootProps, getInputProps, isDragActive, isDragReject}) => (
          <DropContainer 
            {...getRootProps()} 
            isDragActive={isDragActive}
            isDragReject={isDragReject}
          >
            <input {...getInputProps()} />
            {renderDragMessage(isDragActive, isDragReject)}
          </DropContainer>
        )}
      </Dropzone>
    </>
  );
}