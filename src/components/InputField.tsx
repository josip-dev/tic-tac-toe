import { useState } from 'react';

export interface InputFieldProps {
    id?: string;
    name: string;
    label?: string;
    error?: string;
    value?: string | readonly string[] | number | undefined;
    setValue: (value: string) => void;
    forPassword?: boolean;
}

const InputField = ({
    id,
    name,
    label,
    error,
    value,
    setValue,
    forPassword,
}: InputFieldProps) => {
    const [isDirty, setIsDirty] = useState(false);

    return (
        <div className="mb-4">
            <label
                htmlFor={id || name}
                className="block text-gray-700 text-sm font-bold mb-2"
            >
                {label || name.toUpperCase()}
            </label>
            <input
                type={!forPassword ? 'text' : 'password'}
                id={id || name}
                placeholder=" "
                value={value}
                onChange={(e) => {
                    const { value } = e.target;
                    if (!isDirty) {
                        if (value.length > 0) {
                            setIsDirty(true);
                        } else {
                            return;
                        }
                    }

                    setValue(e.target.value);
                }}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {isDirty && error && (
                <p className="text-red-500 text-xs italic mt-2">{error}</p>
            )}
        </div>
    );
};

export default InputField;
