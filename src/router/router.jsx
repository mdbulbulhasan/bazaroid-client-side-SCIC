import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Authentication/Login/Login";
import Register from "../pages/Authentication/Register/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "../routes/PrivateRoute";
import MyProducts from "../pages/Dashboard/Vendor/MyProducts/MyProducts";
import AllUsers from "../pages/Dashboard/Admin/AllUsers/AllUsers";
import UserDashboard from "../pages/Dashboard/User/UserDashboard/UserDashboard";
import MyOrders from "../pages/Dashboard/User/MyOrders/MyOrders";
import VendorDashBoard from "../pages/Dashboard/Vendor/VendorDashboard/VendorDashBoard";
import AdminDashBoard from "../pages/Dashboard/Admin/AdminDashboard/AdminDashBoard";
import AddProduct from "../pages/Dashboard/Vendor/AddProduct/AddProduct";
import AddAdvertisements from "../pages/Dashboard/Vendor/AddAdvertisements/AddAdvertisements";
import MyAdvertisements from "../pages/Dashboard/Vendor/MyAdvertisements/MyAdvertisements";
import UpdateProduct from "../pages/Dashboard/Vendor/UpdateProduct/UpdateProduct";
import AllProducts from "../pages/AllProducts/AllProducts";
import ProductDetails from "../pages/ProductDetails.jsx/ProductDetails";
import axios from "axios";
import MyWatchList from "../pages/Dashboard/User/MyWatchList/MyWatchList";
import ViewPriceTrends from "../pages/Dashboard/User/ViewPriceTrends/ViewPriceTrends";
import PendingMerchant from "../pages/Dashboard/Admin/PendingMerchant/PendingMerchant";
import AdminAllProducts from "../pages/Dashboard/Admin/AdminAllProducts/AdminAllProducts";
import AllAdvertisements from "../pages/Dashboard/Admin/AllAdvertisements/AllAdvertisements";
import AllOrders from "../pages/Dashboard/Admin/AllOrders/AllOrders";
import MerchantRequestForm from "../pages/BeAMerchantForm.jsx/BeMerchantForm";
import AboutUs from "../pages/AboutUs/AboutUs";
import ContactUs from "../pages/ContactUs/ContactUs";
import ErrorPage from "../pages/Error/ErrorPage";
export const router = createBrowserRouter([
  // Main Layout
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/allProducts",
        element: <AllProducts></AllProducts>,
      },
      {
        path: "/aboutUs",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "/contactUs",
        element: <ContactUs></ContactUs>,
      },
      {
        path: "/merchantRequestForm",
        element: (
          <PrivateRoute>
            <MerchantRequestForm></MerchantRequestForm>
          </PrivateRoute>
        ),
      },
      {
        path: "/productDetails/:id",
        loader: async ({ params }) => {
          const { id } = params;
          const res = await axios.get(
            `https://bazaroid-server-side.vercel.app/products/${id}`
          );
          return res.data;
        },
        element: (
          <PrivateRoute>
            <ProductDetails />
          </PrivateRoute>
        ),
      },
    ],
  },
  // Dashboard Layout
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),

    children: [
      // User Dashboard
      {
        path: "/dashboard/userDashboard",
        element: <UserDashboard />,
        children: [
          {
            index: true,
            element: <MyOrders />,
          },
          {
            path: "/dashboard/userDashboard/MyWatchList",
            element: <MyWatchList></MyWatchList>,
          },
          {
            path: "/dashboard/userDashboard/viewPriceTrends",
            element: <ViewPriceTrends></ViewPriceTrends>,
          },
        ],
      },
      // Vendor Dashboard
      {
        path: "/dashboard/vendorDashboard",
        element: <VendorDashBoard />,
        children: [
          { index: true, element: <MyProducts /> },
          {
            path: "/dashboard/vendorDashboard/addProduct",
            element: <AddProduct></AddProduct>,
          },
          {
            path: "/dashboard/vendorDashboard/updateProduct/:id",
            element: <UpdateProduct />,
          },
          {
            path: "/dashboard/vendorDashboard/addAdvertisements",
            element: <AddAdvertisements></AddAdvertisements>,
          },
          {
            path: "/dashboard/vendorDashboard/myAdvertisements",
            element: <MyAdvertisements></MyAdvertisements>,
          },
        ],
      },
      // Admin Dashboard
      {
        path: "/dashboard/adminDashboard",
        element: <AdminDashBoard />,
        children: [
          {
            index: true,
            element: <AllUsers />,
          },
          {
            path: "/dashboard/adminDashboard/allOrders",
            element: <AllOrders></AllOrders>,
          },
          {
            path: "/dashboard/adminDashboard/pendingMerchant",
            element: <PendingMerchant></PendingMerchant>,
          },
          {
            path: "/dashboard/adminDashboard/adminAllProducts",
            element: <AdminAllProducts></AdminAllProducts>,
          },
          {
            path: "/dashboard/adminDashboard/allAdvertisements",
            element: <AllAdvertisements></AllAdvertisements>,
          },
        ],
      },
    ],
  },

  // Auth Layout
  {
    path: "/",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
