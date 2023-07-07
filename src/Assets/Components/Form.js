import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "../Css/Form.css"

function BasicExample() {
  return (
    <Form className='marg-top-for-mb-form'>
      <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Control className='gettouchformsett' type="text" placeholder="Name" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control className='gettouchformsett' type="email" placeholder="Email" />
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Control className='gettouchformsett' as="textarea" rows={3} placeholder="Message" />
      </Form.Group>

     <div className='makebuttoncentalign'>
      <button className='formsubmitbutton' type="submit">
        Submit
      </button>
      </div>
    </Form>
  );
}

export default BasicExample;