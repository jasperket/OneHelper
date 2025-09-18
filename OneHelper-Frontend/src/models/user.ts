export interface User {
    Username: string,
    Password: string,
    Gender: string,
    DateOfBirth: string,
    Email: string,
    PhoneNumber: string, 
    FirstName: string,
    LastName: string,
    Height: number,
    Weight: number
}

export interface UserLogin {
    LoginInformation: string,
    Password: string
}
