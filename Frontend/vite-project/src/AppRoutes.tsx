import { Navigate, Routes, Route } from "react-router-dom";
import Layout from "./layout/layout";
import HomePage from "./pages/HomePage";
import AuthCallbackPage from "./pages/AuthCallbackPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout> <HomePage/></Layout>}>
        {" "}
      </Route>
      {/* add a layout and add a userprofilepage  */}
      <Route path="/user-profile" element={<Layout> <UserProfilePage/></Layout>}>
        {" "}
      </Route>
      <Route path="*" element={<Navigate to="/"></Navigate>}>
        {" "}
      </Route>
      <Route path="/auth-callback" element={<AuthCallbackPage/>}> 

      </Route>
    </Routes>
  );
};

export default AppRoutes;
