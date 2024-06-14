import { Navigate, Routes, Route } from "react-router-dom";
import Layout from "./layout/layout";
import HomePage from "./pages/HomePage";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import UserProfilePage from "./pages/UserProfilePage";
import ProtectedRoute from "./auth/ProtectedRoute";
import ManageRestaurantPage from "./pages/ManageRestaurantPage";
import SearchPage from "./pages/SearchPage";
import DetailPage from "./pages/DetailPage";
import OrderStatusPage from "./pages/OrderStatusPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout showHero={true}>
            <HomePage />
          </Layout>
        }
      ></Route>
      {/* add a layout and add a userprofilepage  */}
      <Route element={<ProtectedRoute />}>
        <Route
          path="/user-profile"
          element={
            <Layout>
              <UserProfilePage />
            </Layout>
          }
        ></Route>{" "}
              <Route
          path="/order-status"
          element={
            <Layout>
              <OrderStatusPage />
            </Layout>
          }
        ></Route>{" "}
        <Route
          path="/manage-restaurant"
          element={
            <Layout>
              {" "}
              <ManageRestaurantPage />
            </Layout>
          }
        ></Route>
      </Route>
      <Route path="*" element={<Navigate to="/"></Navigate>}>
        {" "}
      </Route>
      <Route path="/auth-callback" element={<AuthCallbackPage />}></Route>
      <Route
        path="/search/:city"
        element={
          <Layout showHero={false}>
            <SearchPage />{" "}
          </Layout>
        }
      >
        {" "}
      </Route>
      <Route
        path="/detail/:restaurantId"
        element={
          <Layout showHero={false}>
            <DetailPage />{" "}
          </Layout>
        }
      >
        {" "}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
