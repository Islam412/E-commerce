export type AppUser = {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    is_staff: boolean;
    is_superuser: boolean;
    is_active: boolean;
    groups: string[];
    user_permissions: string[];
  };
  

  export  type LoginResponse = {
    user?: AppUser;
    access?: string;
    refresh?: string;
    message?: string;
  };