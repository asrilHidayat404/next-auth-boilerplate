export interface Role {
    id: number;
    role_name: string;
    createdAt: string | number | Date;
    updatedAt: string | number | Date;
}

export interface User {
    id: string;
    full_name: string;
    email: string;
    password?: string;
    emailVerified: string;
    avatar: string;
    role_id: number;
    role?: Role;
    createdAt: string | number | Date;
    updatedAt: string | number | Date;
}