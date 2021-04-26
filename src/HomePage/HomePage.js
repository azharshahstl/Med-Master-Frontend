import React from 'react';
// import { Button, Container } from "reactstrap";
import { useHistory } from 'react-router-dom'
import classes from './HomePage.module.css';

// const HomePage = () => {

//     let history = useHistory()

//     return (
//         <div className="page-header">
//             <Container className='welcome-page'>
//                 <h1>Medicine</h1>
//                 <h3>Medicine</h3>
//                 <br />
//                 <Button className="login-button" onClick={() => history.push('/user_signup')}> User Sign Up</Button>
//                 <Button className="login-button" onClick={() => history.push('/user_login')}>User Login</Button>
//             </Container>
//         </div>
//     );
// }
// export default HomePage;

const HomePage = () => {

    let history = useHistory()

    return (
        <div className={classes.Buttons}>
                <h1>Welcome to  <em>MedMaster</em></h1>
                {/* <br /> */}
                <button onClick={() => history.push('/user_signup')}> User Sign Up</button>
                <button onClick={() => history.push('/user_login')}>User Login</button>
        </div>
    );
}
export default HomePage;