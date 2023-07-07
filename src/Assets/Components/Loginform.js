import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button"
import "../Css/Loginform.css"
const Loginform = () => {
    return (
        <div>
            <Form className='mt-5'>
                <Form.Group className="mb-3 " controlId="formBasicText">
                    <Form.Control className='makefieldgightmore' type="text" placeholder="Name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control className='makefieldgightmore' type="password" placeholder="Password" />
                </Form.Group>
                <div className='makebtnsinrow'>
                    <div className='submitbtn'>
                        <Button className='formsubmitbutton' type="submit" href="/gamehome">
                            Submit
                        </Button>
                    </div>
                    <div className='forgetbtn'>
                        <a className='forgetbtnloginform' href='/forget'>Forgot Password?</a>
                        {/* <button className='forgetbtnloginform'  href="/forget">Forgot Password?</button> */}
                    </div>
                </div>
            </Form>
        </div>
    )
}

export default Loginform