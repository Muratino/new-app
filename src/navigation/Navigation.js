import { Route, Routes } from "react-router-dom";
import HomeScreen from "../screens/HomeScreen";
import Layout from "../screens/Layout";
import RegisterScreen from "../screens/RegisterScreen";

export const nav = {
  generalNav: [
    {
      path: "/",
      name: "Home",
    },
    {
      path: "/register",
      name: "Register",
    },
  ],
  headerNav: [
    {
      path: "/",
      name: "NEW EVENT MANAGEMENT",
    },
    {
      path: "/",
      name: "DlA ZLECENIODAWCÓW",
    },
    {
      path: "/",
      name: "BEZPIECZEŃSTWO",
    },
  ],
};

const Navigation = () => {
  return (
    <Routes>
      <Route path="" element={<Layout />}>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
      </Route>
      <Route path="*" element={<span>Error not found</span>} />
    </Routes>
  );
};

export default Navigation;
