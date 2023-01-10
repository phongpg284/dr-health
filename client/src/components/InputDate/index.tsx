/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import InputDefault from "../InputDefault";

interface InputProps {
  default_value: string;
  type?: string;
  event_handler?: (e: React.ChangeEvent) => void;
  error?: string;
  disabled?: boolean;
}

const InputDate: React.FC<InputProps> = ({ default_value, ...props }) => {
  return (
    <InputDefault
      default_value={default_value}
      text={""}
      autoComplete="bday"
      name="dob"
      mask="99/99/9999"
      maskPlaceholder="Date of Birth (dd/mm/yyyy)"
      inputMode="numeric"
      {...props}
    />
  );
};
export default InputDate;
