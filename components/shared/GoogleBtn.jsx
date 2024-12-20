import { Google } from "@mui/icons-material";
import { Component } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";

const CLIENT_ID = "<client_id>";

class GoogleBtn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogined: false,
      accessToken: "",
    };

    this.login = this.login.bind(this);
    this.handleLoginFailure = this.handleLoginFailure.bind(this);
    this.logout = this.logout.bind(this);
    this.handleLogoutFailure = this.handleLogoutFailure.bind(this);
  }

  login(response) {
    if (response.accessToken) {
      this.setState((state) => ({
        isLogined: true,
        accessToken: response.accessToken,
      }));
    }
  }

  logout(response) {
    this.setState((state) => ({
      isLogined: false,
      accessToken: "",
    }));
  }

  handleLoginFailure(response) {
    alert("Failed to log in with Google. Please try again later.");
  }

  handleLogoutFailure(response) {
    alert("Failed to log out with Google. Please try again later.");
  }

  render() {
    return (
      <div>
        {this.state.isLogined ? (
          <GoogleLogout
            clientId={CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={this.logout}
            onFailure={this.handleLogoutFailure}
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
            onSuccess={this.login}
            onFailure={this.handleLoginFailure}
            cookiePolicy={"single_host_origin"}
            responseType="code,token"
            render={(renderProps) => (
              <button
                type="button"
                className="mt-6 flex justify-evenly items-center bg-slate-100 w-full py-3 px-4 hover:bg-gray-50  hover:text-green-500 transition duration-300 cursor-pointer"
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
  }
}

export default GoogleBtn;
