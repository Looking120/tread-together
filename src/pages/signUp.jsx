import { Helmet } from 'react-helmet-async';
import { SignUpView } from '../sections/SignUp';



// ----------------------------------------------------------------------

export default function SignUpPage({ onSignUp }) {
    return (
        <>
        <Helmet>
            <title> Sign Up</title>
        </Helmet>

        <SignUpView onLogin={ onSignUp } />;
        </> 
    );
}
