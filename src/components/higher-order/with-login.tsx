import { ComponentType } from 'react';
import { ApiMethod } from '../../constants/api-method';
import useApiRequest from '../../hooks/use-api-request';
import { UserLoginData } from '../../models/user';
import { useUserStateContext } from '../../state/UserState';
import { useNavigate } from 'react-router-dom';

export interface LoginProps {
    logIn: (
        username: string,
        password: string
    ) => Promise<UserLoginData | undefined>;
}

const withLogin = <T extends LoginProps>(Component: ComponentType<T>) => {
    const WrappedComponent: React.FC<Omit<T, 'logIn'>> = (props) => {
        const { setUser } = useUserStateContext();
        const { performApiRequest: logIn } = useApiRequest<UserLoginData>(
            'login',
            ApiMethod.Post
        );
        const navigate = useNavigate();

        return (
            <Component
                {...(props as T)}
                logIn={async (username, password) => {
                    const loginData = await logIn({ username, password });
                    if (loginData) {
                        setUser(loginData);
                        navigate('/');
                        return loginData;
                    }
                }}
            />
        );
    };

    return WrappedComponent;
};

export default withLogin;
