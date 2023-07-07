import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "../Css/Game/Gameregistrationform.css"
const Gameregistrationform = () => {
  return (
    <div>
         <Form>
         <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Label className='registrationformlabel'>Player Name</Form.Label>
        <Form.Control className='gameregisterfield' type="text" placeholder="Player Name" />
      </Form.Group>

      <Form.Group className="mb-3 " controlId="formBasicEmail">
        <Form.Label className='registrationformlabel'>Email</Form.Label>
        <Form.Control className='gameregisterfield' type="email" placeholder="Email" />
      </Form.Group>
     <div className='formbuttonregistercenter'>
      <Button className='registrationformsubmit' type="submit">
        Submit
      </Button>
      </div>
    </Form>
    </div>
  )
}

export default Gameregistrationform