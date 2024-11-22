import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../../types/auth";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useUserContext } from "../../hooks/useUserContext";
import { useMutation } from "@apollo/client";
import { CREATE_USER_MUTATION } from "../../GraphQL/Mutations";

const SignUpPage = () => {
  const [userData, setUserData] = useState<signUp>({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [signUpError, setSignUpError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuthContext();
  const { loggedUser, setLoggedUser } = useUserContext();
  const navigate = useNavigate();
  const [createUser, { error }] = useMutation(CREATE_USER_MUTATION);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if passwords match
    if (userData.password !== userData.confirmPassword) {
      return setSignUpError("Passwords don't match");
    }

    try {
      setSignUpError("");
      setLoading(true);

      // Sign up user
      const userCredential = await signUp(userData.email, userData.password);
   
      // Create user with GraphQL mutation
      const response = await createUser({
        variables: {
          userId: userCredential.user.uid,
          username: userData.username,
          profilePic: "https://avatar.iran.liara.run/public/boy?username=Ash",
        },
      });
      // Ensure response is correct
      const createdUser = response.data.createUser;

      // Set logged-in user data
      setLoggedUser({
        username: createdUser.username,
        userId: createdUser.userId,
        profilePic: createdUser.profilePic,
        followers: null,
      });

      // Error handling
      if (error) {
        console.log(error);
      }

      // Redirect to the feed page
      navigate("/feed");
    } catch (error) {
      setSignUpError("Failed to create an account");
      console.log(error); // Log the error for debugging
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 max-w">
          Or{" "}
          <Link to={`/login`}>
            <button
              type="button"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              sign in to your account
            </button>
          </Link>
        </p>
        <div className="text-center pt-2">
          <span className="text-red-600">{signUpError && signUpError}</span>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your email address"
                  onChange={handleChange}
                  value={userData.email}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Enter a Username"
                  onChange={handleChange}
                  value={userData.username}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Create a password"
                  onChange={handleChange}
                  value={userData.password}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <div className="mt-1">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Confirm password"
                  onChange={handleChange}
                  value={userData.confirmPassword}
                />
              </div>
            </div>

            <div>
              <button
                disabled={loading}
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
