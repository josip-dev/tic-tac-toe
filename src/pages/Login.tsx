import { FormEvent, useState } from 'react';
import { logIn } from '../data/user-requests';
import InputField from '../components/InputField';
import NavigationButton from '../components/NavigationButton';
import { useUserStateContext } from '../state/UserState';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { setLoginData } = useUserStateContext();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const loginData = await logIn(username, password);
        setLoginData(loginData);
        navigate('/');
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
                <button
                    type="submit"
                    disabled={!!usernameError || !!passwordError}
                >
                    Log In
                </button>
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

export default Login;
