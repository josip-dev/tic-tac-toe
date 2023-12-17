import { OptionHTMLAttributes, useState } from 'react';
import { GameStatus } from '../constants/game-status';

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
                className="block text-gray-700 text-md font-semibold mb-2"
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
                    className="py-3 px-4 pe-9 block w-full border-cyan-200 rounded-lg text-md focus:border-cyan-500 focus:ring-cyan-500 disabled:opacity-30 disabled:pointer-events-none disabled:cursor-not-allowed"
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
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            )}

            {isDirty && error && (
                <p className="text-red-500 text-sm italic mt-2">{error}</p>
            )}
        </div>
    );
};

export default InputField;
