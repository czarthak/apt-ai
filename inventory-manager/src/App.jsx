// App.jsx
import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ThemeProvider, createTheme } from "@mui/material/styles"; // Import ThemeProvider and createTheme

import Home from "./components/Home";

import { ChatBotPage } from "./components/user/index";
import PersonalityTest from "./components/user/PersonalityTest";
import {
  DeleteUser,
  Login,
  Register,
  UpdatePassword,
  CreateOrganization,
  CreateRequest,
  ListAllOrganizations,
  OrganizationSearch,
  ListingDetails,
} from "./components/user/index";
import useToken from "./components/useToken";
import AccountInformation from "./components/user/AccountInformation";
import PrivateRoutes from "./routes/PrivateRoutes";
import NotFound from "./components/error/NotFound";
import Dashboard2 from "./components/map/Dashboard";
import { SearchAllListings } from "./components/listing/SearchAllListings";

function App() {
  const { token, setToken } = useToken();
  const API_KEY = `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;

  console.log(token);

  // Create a custom theme with 'Quicksand' as the default font
  const theme = createTheme({
    typography: {
      fontFamily: "'Quicksand', sans-serif",
      fontSize: 18
    },
  });

  return (
    <ThemeProvider theme={theme}> {/* Wrap your app with ThemeProvider */}
      <div className="App">
        <Navbar token={token} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/bot" element={<ChatBotPage />} />
          <Route element={<PrivateRoutes token={token} />}>
            <Route
              path="/dashboard/:userEmail"
              element={<Dashboard2 token={token} />}
            />
            <Route path="/personality-test" element={<PersonalityTest />} />
            <Route
              path="/accountinfo"
              element={<AccountInformation token={token} />}
            />
            <Route path="/searchListings" element={<SearchAllListings />} />
          </Route>
          <Route path="/listing/:id" element={<ListingDetails />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/404" element={<NotFound />} />
          <Route
            path="/listallorganizations"
            element={<ListAllOrganizations />}
          />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
