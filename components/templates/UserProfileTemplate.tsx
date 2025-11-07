interface TEMP_UserDetail {
  loginEmail: string;
  createdAt: string;
}

export const UserProfileTemplate = ({ users }: { users: TEMP_UserDetail }) => {
  return <>hello World!</>;
};
