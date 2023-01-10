import React, { useState, useCallback } from "react";
import InputMask from "react-input-mask";
import Error from "../Error";
import classes from "./index.module.scss";

export interface InputDefaultProps {
  wrapperStyle?: React.CSSProperties;
  event_handler?: (e: React.ChangeEvent) => void;
  text: string;
  default_value: string;
  error?: string;
  showErrorMessage?: boolean;
  enableTogglePassword?: boolean;
  mask: string;
  maskPlaceholder: string;
  type?: string;
  name: string;
  autoComplete: string;
  inputMode: "none" | "text" | "search" | "tel" | "url" | "email" | "numeric" | "decimal" | undefined;
  showLabel?: boolean;
  placeholder?: string;
}

const InputDefault: React.FC<InputDefaultProps> = ({
  wrapperStyle = {},
  event_handler,
  text,
  default_value = "",
  error = "",
  showErrorMessage = true,
  enableTogglePassword = false,
  mask,
  maskPlaceholder = "",
  showLabel = true,
  ...inputAttrs
}) => {
  const [visiblePassword, setVisiblePassword] = useState(false);
  const fieldId = `input-${inputAttrs.name.toLowerCase().split(" ").join("-")}`;
  const inputType = inputAttrs.type === "password" && visiblePassword ? "text" : inputAttrs.type;

  const Input = useCallback(
    ({ defaultValue }) => {
      const inputProps = {
        ...inputAttrs,
        id: fieldId,
        className: classes.input_text,
        type: inputType,
        onChange: event_handler,
      };

      if (mask) {
        return <InputMask mask={defaultValue ? mask : ""} placeholder={maskPlaceholder || text} {...inputProps} value={defaultValue} />;
      }
      return <input placeholder={text} defaultValue={defaultValue} {...inputProps} aria-label={!showLabel ? text : undefined} />;
    },
    [inputType, showLabel]
  );

  return (
    <div className={classes.input_wrapper} style={wrapperStyle}>
      {showLabel && <label htmlFor={fieldId}>{(default_value && default_value.length > 0) || mask ? text : null}</label>}
      <div className={classes.input_inner_wrapper}>
        <Input defaultValue={default_value} />
        {enableTogglePassword && inputAttrs.type === "password" && (
          <button className={classes.toggle_btn} onClick={() => setVisiblePassword(!visiblePassword)} type="button"></button>
        )}
      </div>
      {showErrorMessage && <Error error={error} />}
    </div>
  );
};

export default InputDefault;
