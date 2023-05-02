type InputProps = {
  customValue?: string
  onChangeF?: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
} 
const Input: React.FC<InputProps> = ({customValue, onChangeF, required=true} ) => {

  return (
    <input
      type="text"
      className="inputElement"
      onChange={onChangeF}
      value={customValue}
      required={required}
      autoFocus
    />
  );
};

export default Input;
