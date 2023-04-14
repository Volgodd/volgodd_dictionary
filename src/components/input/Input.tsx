type InputProps = {
  customValue?: string
  onChangeF?: (e: React.ChangeEvent<HTMLInputElement>) => void
} 
const Input: React.FC<InputProps> = ({customValue, onChangeF} ) => {

  return (
    <input
      type="text"
      className="inputElement"
      onChange={onChangeF}
      value={customValue}
      required
      autoFocus
    />
  );
};

export default Input;
