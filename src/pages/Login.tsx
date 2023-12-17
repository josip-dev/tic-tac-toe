/* eslint-disable react-refresh/only-export-components */
import { FormEvent, useState } from 'react';
import InputField from '../components/InputField';
import NavigationButton from '../components/NavigationButton';
import withLogin, {
    LoginProps as HocLoginProps,
} from '../components/higher-order/with-login';
import Button from '../components/Button';

interface LoginProps extends HocLoginProps {}

const Login = ({ logIn }: LoginProps) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
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

    return (
        <div className="flex justify-center items-center min-h-screen">
            <form onSubmit={onSubmit} className="w-full max-w-md mx-auto">
                <h1 className="text-xl text-center">Welcome Back!</h1>
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
                <Button
                    type="submit"
                    disabled={!!usernameError || !!passwordError}
                    fullWidth
                >
                    Log In
                </Button>
                <p className="mt-2">
                    Don't have an account?{' '}
                    <NavigationButton destination="/register">
                        Register
                    </NavigationButton>{' '}
                    now!
                </p>
            </form>
        </div>
    );
};

export default withLogin(Login);
