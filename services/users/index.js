"use server";

import { BASE_URL } from "@/constants";

export async function handleRegister(values) {
  try {
    console.log("values", values);
    const response = await fetch(`${BASE_URL}/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    if (response.status < 400) {
      return {
        message: response.message,
        success: true,
      };
    }
    const data = await response.json();
    return {
      success: false,
      detail: data?.detail,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function handleLogin(values) {
  try {
    if (!(values instanceof FormData)) {
      throw new Error("Input values must be FormData");
    }

    const response = await fetch(`${BASE_URL}/auth/token`, {
      method: "POST",
      body: values,
    });
    const data = await response.json();
    if (response.status < 400) {
      return {
        success: true,
        message: "Login successful",
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
      };
    }
    return {
      success: false,
      message: data?.detail,
    };
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
    };
  }
}

export async function getCurrentUser(token) {
  try {
    const response = await fetch(`${BASE_URL}/auth/user`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (response.status < 400) {
      console.log("response", response);

      return {
        success: true,
        user: data,
      };
    }
    return {
      success: false,
      message: "User not found",
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function handleResetPassword(values) {
  try {
    const response = await fetch(`${BASE_URL}/auth/reset-password`, {
      method: "POST",
      body: values,
    });
    const data = await response.json();
    if (response.status < 400) {
      return {
        success: true,
        message: data.message,
        accessToken: data.access_token,
      };
    }
    return {
      success: false,
      message: data?.detail,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

// export async function google_auth(payload) {
//   let data = {
//     id: payload["sub"],
//     email: payload["email"],
//     picture: payload["picture"],
//     provider: "google",
//   };
//   if (payload["given_name"]) {
//     data["first_name"] = payload["given_name"];
//   } else {
//     data["first_name"] = "";
//   }

//   if (payload["family_name"]) {
//     data["last_name"] = payload["family_name"];
//   } else {
//     data["last_name"] = "";
//   }

//   if (payload["name"]) {
//     data["display_name"] = payload["name"];
//   } else {
//     data["display_name"] = "";
//   }

//   return data;
// }

// export async function handleCredentialResponse(response) {
//   const errorMessageContainer = document.getElementById("error-message");
//   var tokens = response.credential.split(".");
//   var payload = JSON.parse(atob(tokens[1]));

//   try {
//     const googleAuthData = await google_auth(payload);
//     const response = await sendGoogleAuthRequest(googleAuthData);
//     const responseData = await response.json();

//     if (response.ok) {
//       const token = responseData.access_token;
//       if (token) {
//         localStorage.setItem("access_token", token);
//         console.log("Token saved to localStorage");

//         errorMessageContainer.style.display = "block";
//         errorMessageContainer.style.textAlign = "center";
//         errorMessageContainer.textContent = "Successful Entry";
//         errorMessageContainer.style.color = "green";

//         setTimeout(() => {
//           window.location.href = "http://127.0.0.1:3000/CLIENT";
//         }, 3000);
//       } else {
//         console.error("No token received in response");
//         errorMessageContainer.style.display = "block";
//         errorMessageContainer.style.textAlign = "center";
//         errorMessageContainer.textContent =
//           "No token received. Please try again.";
//         errorMessageContainer.style.color = "red";
//       }
//     } else {
//       console.error("Failed to authenticate:", responseData);
//       errorMessageContainer.style.display = "block";
//       errorMessageContainer.style.textAlign = "center";
//       errorMessageContainer.textContent = responseData.detail;
//       errorMessageContainer.style.color = "red";
//     }
//   } catch (error) {
//     console.error("Error during login request:", error);
//     errorMessageContainer.style.display = "block";
//     errorMessageContainer.textContent =
//       "An error occurred. Please try again later.";
//     errorMessageContainer.style.color = "red";
//   }
// }

// window.onload = function () {
//   google.accounts.id.initialize({
//     client_id:
//       "1054962718888-1q0f5m7hbnqjkvo241mj7jbhh5ljmji2.apps.googleusercontent.com",
//     callback: handleCredentialResponse,
//   });
//   google.accounts.id.renderButton(
//     document.getElementById("buttonDiv"),
//     { theme: "outline", size: "large" } // customization attributes
//   );
//   google.accounts.id.prompt(); // also display the One Tap dialog
// };
