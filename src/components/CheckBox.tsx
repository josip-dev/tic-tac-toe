export interface CheckBoxProps {
    id?: string;
    name: string;
    label?: string;
    error?: string;
    value?: string | readonly string[] | number | undefined;
    isChecked: boolean;
    setIsChecked: (isChecked: boolean) => void;
}
const CheckBox = ({
    id,
    name,
    label,
    value,
    isChecked,
    setIsChecked,
}: CheckBoxProps) => {
    return (
        <div className="flex items-center hover:cursor-pointer">
            <input
                id={id || name}
                type="checkbox"
                value={value}
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                className="w-4 h-4 text-cyan-600 bg-cyan-100 border-cyan-300 rounded focus:ring-cyan-500 focus:ring-1 hover:cursor-pointer"
            />
            <label
                htmlFor={id || name}
                className="ms-1 text-sm font-medium text-cyan-900 hover:cursor-pointer"
            >
                {label}
            </label>
        </div>
    );
};

export default CheckBox;
