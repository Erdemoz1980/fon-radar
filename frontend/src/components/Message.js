import React from 'react';
import { Alert } from 'react-bootstrap';

const Message = ({variant, children}) => {
  return (
    <Alert
      variant={variant}
      className='mt-4 text-center'
    >{children}</Alert>
  )
}

export default Message