import { Google } from "@mui/icons-material";
import { useState } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { Button } from "../ui/button";

const CLIENT_ID =
  "127169050270-81u8fvgm03vf7velq72rdnj69t79krbj.apps.googleusercontent.com";

const GoogleBtn = () => {
  const [isLogined, setIsLogined] = useState(false);
  const [accessToken, setAccessToken] = useState("");

  const login = (response) => {
    if (response.accessToken) {
      setIsLogined(true);
      setAccessToken(response.accessToken);
    }
  };

  const logout = () => {
    setIsLogined(false);
    setAccessToken("");
  };

  const handleLoginFailure = () => {
    alert("Failed to log in with Google. Please try again later.");
  };

  const handleLogoutFailure = () => {
    alert("Failed to log out with Google. Please try again later.");
  };

  return (
    <div>
      {isLogined ? (
        <GoogleLogout
          clientId={CLIENT_ID}
          buttonText="Logout"
          onLogoutSuccess={logout}
          onFailure={handleLogoutFailure}
          render={(renderProps) => (
            <Button onClick={renderProps.onClick} size="small">
              Logout
            </Button>
          )}
        />
      ) : (
        <GoogleLogin
          clientId={CLIENT_ID}
          buttonText="Login"
          onSuccess={login}
          // onFailure={handleLoginFailure}
          cookiePolicy={"single_host_origin"}
          responseType="code,token"
          render={(renderProps) => (
            <button
              type="button"
              className="mt-6 flex justify-evenly items-center bg-slate-100 w-full py-3 px-4 hover:bg-gray-50 hover:text-green-500 transition duration-300 cursor-pointer"
              onClick={renderProps.onClick}
            >
              <Google />
              Sign In With Google
            </button>
          )}
        />
      )}
    </div>
  );
};

export default GoogleBtn;
