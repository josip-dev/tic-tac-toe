/* eslint-disable react-refresh/only-export-components */
import { FormEvent, useState } from 'react';
import InputField from '../components/InputField';
import NavigationButton from '../components/NavigationButton';
import useApiRequest from '../hooks/use-api-request';
import { ApiMethod } from '../constants/api-method';
import withLogin, { LoginProps } from '../components/higher-order/with-login';

interface RegisterProps extends LoginProps {}

const Register = ({ logIn }: RegisterProps) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const { performApiRequest: register } = useApiRequest(
        'register',
        ApiMethod.Post
    );

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await register({
            username,
            password,
        });
        await logIn(username, password);
    };

    const usernameError =
        username.length < 3
            ? 'Username must contain at least 3 characters'
            : undefined;
    const passwordError =
        password.length < 3
            ? 'Password must contain at least 3 characters'
            : undefined;
    const passwordConfirmationError =
        password !== passwordConfirmation
            ? 'Password must match the one above'
            : undefined;

    return (
        <div className="flex justify-center items-center min-h-screen">
            <form onSubmit={onSubmit} className="w-full max-w-md mx-auto">
                <h1 className="text-xl text-center">Welcome!</h1>
                <h5 className="text-sm text-center mb-2">
                    Please fill in the information below in order to start
                    playing.
                </h5>
                <InputField
                    name="username"
                    label="Username"
                    error={usernameError}
                    value={username}
                    setValue={setUsername}
                />
                <InputField
                    name="password"
                    label="Password"
                    error={passwordError}
                    forPassword={true}
                    value={password}
                    setValue={setPassword}
                />
                <InputField
                    name="confirmPassword"
                    label="Confirm Password"
                    error={passwordConfirmationError}
                    forPassword={true}
                    value={passwordConfirmation}
                    setValue={setPasswordConfirmation}
                />
                <button
                    type="submit"
                    disabled={
                        !!usernameError ||
                        !!passwordError ||
                        !!passwordConfirmationError
                    }
                >
                    Register
                </button>
                <p className="mt-2">
                    Already have an account?{' '}
                    <NavigationButton destination="/login">
                        Log in
                    </NavigationButton>{' '}
                    now!
                </p>
            </form>
        </div>
    );
};

export default withLogin(Register);
