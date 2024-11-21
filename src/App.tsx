import React, { useEffect } from "react";
import "./App.css";
import LoginPage from "./components/auth/Loginpage";
import SignUpPage from "./components/auth/SignUpPage";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Feed from "./components/Feed";
import Sidebar from "./components/layout/Sidebar";
import Friends from "./components/Friends";
import { AuthProvider } from "./context/AuthContext";
import {
  ApolloClient,
  from,
  HttpLink,
  ApolloProvider,
  InMemoryCache,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) => {
        alert(`Graphql error ${message}`);
      });
    }
  });

  const link = from([
    errorLink,
    new HttpLink({ uri: "http://localhost:8080/graphql" }),
  ]);

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: link,
  });

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/feed");
    }
  }, []);

  return (
    <div>
      <ApolloProvider client={client}>
        <AuthProvider>
          {location.pathname !== "/login" &&
            location.pathname !== "/signup" && <Sidebar />}

          <Routes>
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/friends" element={<Friends />} />
          </Routes>
        </AuthProvider>
      </ApolloProvider>
    </div>
  );
}

export default App;
