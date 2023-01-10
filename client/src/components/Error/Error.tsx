import React from "react";

const Error: React.FC<{ className?: string; error: string; style?: any }> = ({ className = "red left pad-0 marg-0 weight_normal", error = "", style = {} }) => (
  <p className={className} style={style}>
    {error}
  </p>
);

export default Error;
