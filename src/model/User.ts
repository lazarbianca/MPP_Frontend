export default interface User {
    userId: number;
    username: string;
    password: string;
    role: UserRoles;
}

export enum UserRoles {
    user = 'user',
    admin = 'admin',
    manager = 'manager',
}
