"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginRegister() {
  const router = useRouter();
  const [isFlipped, setIsFlipped] = useState(false);
  const [error, setError] = useState("");
  const [regError, setRegError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Initialize Google Sign-In
    if (typeof window !== "undefined" && window.google) {
      window.google.accounts.id.initialize({
        client_id:
          "1054962718888-1q0f5m7hbnqjkvo241mj7jbhh5ljmji2.apps.googleusercontent.com",
        callback: handleCredentialResponse,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("googleButton"),
        { theme: "outline", size: "large" }
      );
    }
  }, []);

  const handleLogin = async () => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const form = e.target;
    const username = form.elements.namedItem("username");
    const password = form.elements.namedItem("password");

    if (!username || !password) {
      setError("Please enter both username and password.");
      setIsLoading(false);
      return;
    } 

    try {
      const response = await fetch("http://localhost:8000/auth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username,
          password,
        }).toString(),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("access_token", data.access_token);
        setError("Successful Entry");
        setTimeout(() => {
          router.push("/CLIENT");
        }, 3000);
      } else {
        setError(data.detail || "Login failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async () => {
    e.preventDefault();
    setIsLoading(true);
    setRegError("");

    const form = e.target;
    const username = form.elements.namedItem("username");
    const email = form.elements.namedItem("email");
    const password = form.elements.namedItem("password");
    const passwordConfirm = form.elements.namedItem("passwordConfirm");
    const isOrganizer = form.elements.namedItem("is_organizer");

    if (!username || !email || !password || !passwordConfirm) {
      setRegError("Please fill all fields");
      setIsLoading(false);
      return;
    }

    if (password !== passwordConfirm) {
      setRegError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          first_name: "string",
          last_name: "string",
          is_organizer: isOrganizer ? 1 : 0,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setRegError("Registration successful!");
        setIsFlipped(false); // Switch back to login
      } else {
        setRegError(data.detail || "Registration failed");
      }
    } catch (err) {
      setRegError("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCredentialResponse = async () => {
    const tokens = response.credential.split(".");
    const payload = JSON.parse(atob(tokens[1]));

    try {
      const googleResponse = await fetch(
        "http://localhost:8000/social_auth/google",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: payload.sub,
            email: payload.email,
            picture: payload.picture,
            provider: "google",
            first_name: payload.given_name || "",
            last_name: payload.family_name || "",
            display_name: payload.name || "",
          }),
        }
      );

      const data = await googleResponse.json();

      if (googleResponse.ok) {
        localStorage.setItem("access_token", data.access_token);
        setError("Successful Entry");
        setTimeout(() => {
          router.push("/CLIENT");
        }, 3000);
      } else {
        setError(data.detail || "Google login failed");
      }
    } catch (err) {
      setError("An error occurred during Google login");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 relative">
        <div
          className={`bg-white rounded-2xl shadow-2xl transition-all duration-500 ${
            isFlipped ? "rotate-y-180" : ""
          }`}
        >
          {/* Login Form */}
          <div className={`p-8 ${isFlipped ? "hidden" : ""}`}>
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
              Login
            </h2>
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <div className="relative">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Username"
                  />
                  <i className="fas fa-user absolute right-3 top-3 text-gray-400" />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Password"
                  />
                  <i className="fas fa-lock absolute right-3 top-3 text-gray-400" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <a
                  href="#"
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {isLoading ? "Loading..." : "Sign in"}
              </button>

              <div id="googleButton" className="mt-4" />

              {error && (
                <div
                  className={`text-center ${
                    error === "Successful Entry"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {error}
                </div>
              )}
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => setIsFlipped(true)}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Don't have an account? Sign up
              </button>
            </div>
          </div>

          {/* Register Form */}
          <div className={`p-8 ${!isFlipped ? "hidden" : ""}`}>
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
              Sign Up
            </h2>
            <form onSubmit={handleRegister} className="space-y-6">
              <div>
                <label htmlFor="reg-username" className="sr-only">
                  Username
                </label>
                <div className="relative">
                  <input
                    id="reg-username"
                    name="username"
                    type="text"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Username"
                  />
                  <i className="fas fa-user absolute right-3 top-3 text-gray-400" />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Email"
                  />
                  <i className="fas fa-envelope absolute right-3 top-3 text-gray-400" />
                </div>
              </div>

              <div>
                <label htmlFor="reg-password" className="sr-only">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="reg-password"
                    name="password"
                    type="password"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Password"
                  />
                  <i className="fas fa-lock absolute right-3 top-3 text-gray-400" />
                </div>
              </div>

              <div>
                <label htmlFor="passwordConfirm" className="sr-only">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="passwordConfirm"
                    name="passwordConfirm"
                    type="password"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Confirm Password"
                  />
                  <i className="fas fa-lock absolute right-3 top-3 text-gray-400" />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="is_organizer"
                  name="is_organizer"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="is_organizer" className="text-sm text-gray-700">
                  I am an organizer
                </label>
                <div className="relative group">
                  <span className="cursor-help text-gray-400">?</span>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 invisible group-hover:visible bg-gray-800 text-white text-xs rounded py-1 px-2 w-48">
                    Organizers can create events on our site.
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {isLoading ? "Loading..." : "Register"}
              </button>

              {regError && (
                <div
                  className={`text-center ${
                    regError === "Registration successful!"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {regError}
                </div>
              )}
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => setIsFlipped(false)}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Already have an account? Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
