import styled, { css } from 'styled-components'

interface DropZoneProps {
  isDragActive: boolean,
  isDragReject: boolean,
}

type MessageColors = {
  default: string,
  error: string,
  success: string,
}

type UploadMessageProps = {
  type?: keyof MessageColors
}

const dragActive = css`
  border-color: #78e5d5;
`

const dragReject = css`
  border-color: #e57878;
`

export const DropContainer = styled.div.attrs({
  className: "dropzone"
})`
  border: 1px dashed #ddd;
  border-radius: 4px;
  cursor: pointer;

  ${(props: DropZoneProps) => props.isDragActive && dragActive }
  ${(props: DropZoneProps) => props.isDragReject && dragReject}
`

const messageColors: MessageColors = {
  default: '#999',
  error: '#e57878',
  success: '#78e5d5',
}

export const UploadMessage = styled.p`
  display: flex;
  color: ${(props: UploadMessageProps) => messageColors[props.type  || 'default']};
  justify-content: center;
  align-items: center;
  padding: 15px 0;
`;
