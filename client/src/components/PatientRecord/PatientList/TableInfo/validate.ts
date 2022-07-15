import * as Yup from "yup";
import { isValid } from "utils/date";

const identityRegExp = /^[0-9]*$/;
export const validationDefault = {
  fullName: Yup.string().required("Required"),
  dob: Yup.string()
    .test("validateDOBDate", "Invalid DOB", (date?: string) => {
      return !!date && isValid(date);
    }),
  email: Yup.string().required("Email is required"),
  identity: Yup.string().matches(identityRegExp, "Identity number wrong format").min(12, "Identity number wrong format").max(12, "Identity number wrong format"),
};
