import { useAuthenticationContext } from "./authentication/AuthenticationProvider";
import { Login } from "./Login";
import { UserInfo } from "./UserInfo";

export function AuthenticationBar() {
  const { isAuthenticated, user, logout, refreshAccessToken } = useAuthenticationContext();

  return (
    <>
      {isAuthenticated && user ? (
        <UserInfo user={user} logout={logout} refreshAccessToken={refreshAccessToken} />
      ) : (
        <Login />
      )}
    </>
  );
}
