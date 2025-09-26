export interface Role {
    id: number;
    role_name: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface User {
    createdAt: string | number | Date;
    id: string;
    full_name: string;
    email: string;
    password?: string;
    emailVerified: string;
    avatar: string;
    role_id: number;
    role?: Role;
        createdAt: Date;
    updatedAt: Date;
}