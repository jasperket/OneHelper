export type RegisterFormValues = {
  Username: string;
  Password: string;
  FirstName: string;
  LastName: string;
  Gender: string; // now plain string
  DOB?: Date;
  Height: string;
  Weight: string;
  Email: string;
  PhoneNumber: string;
};

export type RegisterFormErrors = Partial<
  Record<keyof RegisterFormValues, string>
>;

export function validateRegister(
  values: RegisterFormValues,
): RegisterFormErrors {
  const errors: RegisterFormErrors = {};

  if (!values.Username.trim()) {
    errors.Username = "Username is required";
  }

  const password = values.Password.trim();
  if (!password) {
    errors.Password = "Password is required";
  } else {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;
    if (!passwordRegex.test(password)) {
      errors.Password =
        "Password must be at least 8 characters, include uppercase, lowercase, number, and symbol";
    }
  }

  if (!values.FirstName.trim()) {
    errors.FirstName = "First name is required";
  }

  if (!values.LastName.trim()) {
    errors.LastName = "Last name is required";
  }

  if (!values.Gender.trim()) {
    errors.Gender = "Gender is required";
  } else if (
    values.Gender.toLowerCase() !== "male" &&
    values.Gender.toLowerCase() !== "female"
  ) {
    errors.Gender = "Gender must be either Male or Female";
  }

  if (!values.DOB) {
    errors.DOB = "Date of birth is required";
  } else if (!(values.DOB instanceof Date) || isNaN(values.DOB.getTime())) {
    errors.DOB = "Invalid date";
  }

  if (!values.Height.trim()) {
    errors.Height = "Height is required";
  } else if (isNaN(Number(values.Height)) || Number(values.Height) <= 0) {
    errors.Height = "Height must be a positive number";
  }

  if (!values.Weight.trim()) {
    errors.Weight = "Weight is required";
  } else if (isNaN(Number(values.Weight)) || Number(values.Weight) <= 0) {
    errors.Weight = "Weight must be a positive number";
  }

  if (!values.Email.trim()) {
    errors.Email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.Email)) {
    errors.Email = "Invalid email format";
  }

  if (!values.PhoneNumber.trim()) {
    errors.PhoneNumber = "Phone number is required";
  } else if (!/^\+?\d{10,15}$/.test(values.PhoneNumber)) {
    errors.PhoneNumber = "Invalid phone number format";
  }

  console.log(errors);
  return errors;
}

