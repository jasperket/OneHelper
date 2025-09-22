export type LoginFormValues = {
  Username: string;
  Password: string;
};

export type LoginFormErrors = Partial<Record<keyof LoginFormValues, string>>;

export function validateLogin(values: LoginFormValues): LoginFormErrors {
  const errors: LoginFormErrors = {};
  if (!values.Username.trim()) {
    errors.Username = "Username is required";
  }

  if (!values.Password.trim()) {
    errors.Password = "Password is required";
  }
  return errors;
}
