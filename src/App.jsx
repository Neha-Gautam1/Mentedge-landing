import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CollectionPage from "./pages/CollectionPage";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ManageProducts from "./pages/ManageProducts";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import CareInstructionsPage from "./pages/CareInstructions";
import SizeGuide from "./pages/SizeGuide";
import FAQPage from "./pages/FAQPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Wishlist from "./pages/Wishlist.jsx";
import Profile from "./pages/Profile.jsx";
import Orders from "./pages/Orders.jsx";
import AdminOrders from "./pages/AdminOrders.jsx";
import AdminUsers from "./pages/AdminUsers.jsx";
import Sales from "./pages/Sales.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import DeliveryHistory from "./pages/DeliveryHistory.jsx";
import OrderDetails from "./pages/OrderDetails.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";

function App() {
  return (
    <>
    <Router>
      <Routes>

        <Route path="/admin-dashboard" element={ <ProtectedRoute role="Admin">
          <AdminDashboard/> </ProtectedRoute>}/>

          <Route path="/reset-password/:token" element={<ResetPassword />} />


        <Route path="/admin/manage-products" element={
           <ProtectedRoute role="Admin">
          <ManageProducts/> </ProtectedRoute>}/>

          <Route path="/admin/orders" element={
           <ProtectedRoute role="Admin">
          <AdminOrders/> </ProtectedRoute>}/>
          
          <Route path="/admin/sales" element={
           <ProtectedRoute role="Admin">
          <Sales/> </ProtectedRoute>}/>

          <Route path="/admin/users" element={
           <ProtectedRoute role="Admin">
         <AdminUsers/> </ProtectedRoute>}/>
       
        <Route path="/cart" element={
          <ProtectedRoute role="User">
          <Cart/> </ProtectedRoute>}/>

          <Route path="/wishlist" element={
          <ProtectedRoute role="User">
          <Wishlist/> </ProtectedRoute>}/>

            <Route path="/user-dashboard" element={ 
          <ProtectedRoute role="User">
          <UserDashboard/> </ProtectedRoute>}/>

           <Route path="/product/:id" element={ 
          <ProtectedRoute role="User">
          <ProductDetails/> </ProtectedRoute>}/>

           <Route path="/order" element={
          <ProtectedRoute role="User">
          <Orders/> </ProtectedRoute>}/>

          <Route path="/order/:id" element={
            <ProtectedRoute role="User">
            <OrderDetails /> </ProtectedRoute>} />


        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<CollectionPage />} />
        <Route path="/care" element={<CareInstructionsPage/>}/>
        <Route path="/size" element={<SizeGuide/>}/>
        <Route path="/faqs" element={<FAQPage/>}/>
        <Route path="/profile" element={<Profile/>}/>
         <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>

        <Route path="/delivery/history" element={
          <ProtectedRoute role="Delivery"> <DeliveryHistory/></ProtectedRoute>
        }/>

      </Routes>
    </Router>
    </>
  )
}

export default App;
