import { OptionHTMLAttributes, useState } from 'react';
import { GameStatus } from '../constants/game-status';
import ErrorMessage from './ErrorMessage';

export interface InputFieldProps {
    id?: string;
    name: string;
    label?: string;
    error?: string;
    value?: string | readonly string[] | number | undefined;
    setValue: (value: string) => void;
    dropdownValues?: OptionHTMLAttributes<HTMLOptionElement>[];
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
    dropdownValues,
}: InputFieldProps) => {
    const [isDirty, setIsDirty] = useState(false);

    return (
        <div className="mb-4">
            <label
                htmlFor={id || name}
                className="block text-cyan-700 text-md font-semibold mb-2"
            >
                {label || name.toUpperCase()}
            </label>
            {dropdownValues ? (
                <select
                    id={id || name}
                    value={value}
                    onChange={(e) => {
                        const { value } = e.target;

                        if (!isDirty) {
                            setIsDirty(true);
                        }

                        setValue(value);
                    }}
                    className="bg-cyan-300 text-cyan-900 border border-cyan-500 hover:bg-cyan-700 hover:text-cyan-100 text-md rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5 disabled:opacity-30 disabled:pointer-events-none disabled:cursor-not-allowed"
                >
                    {dropdownValues.map((dropdownValue) => (
                        <option
                            key={dropdownValue.value as GameStatus}
                            {...dropdownValue}
                        >
                            {dropdownValue.title}
                        </option>
                    ))}
                </select>
            ) : (
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

                        setValue(value);
                    }}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-cyan-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            )}

            {isDirty && <ErrorMessage error={error} classes="mt-1" />}
        </div>
    );
};

export default InputField;
