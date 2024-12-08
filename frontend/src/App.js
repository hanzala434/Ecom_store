import {Routes,Route} from 'react-router-dom'
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PageNotFound from './pages/PageNotFound';
import Register from './pages/Register';
import Login from './pages/Login';
import ProductPage from './pages/ProductPage';
import CategoryPage from './pages/CategoryPage';
import CategoryProducts from './pages/CategoryProducts';
import CheckoutPage from './pages/CheckoutPage';
import OrdersPage from './pages/OrdersPage';
import AddressFormPage from './pages/AddressFormPage';
import AdminDashboard from './pages/AdminDashboard';
import OrderDetailAdmin from './pages/OrderDetailAdmin';
import UserOrdersPage from './pages/UserOrdersPage';
import OrderConfirmed from './pages/OrderConfirmed';


function App() {
  return (
    <>
    <Routes>  
      <Route path='/' element={<HomePage/>}/>
      <Route path='/about-us' element={<AboutPage/>}/>
      <Route path='/contact-us' element={<ContactPage/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/product/:id' element={<ProductPage/>}/>
      <Route path='/category' element={<CategoryPage/>}/>
      <Route path='/checkout' element={<CheckoutPage/>}/>
      <Route path='/addressForm' element={<AddressFormPage/>}/>
      <Route path='/orders/:id' element={<OrdersPage/>}/>
      <Route path='/category/:id' element={<CategoryProducts/>}/>
      <Route path='/your-orders/:id' element={<UserOrdersPage/>}/>
      <Route path='/your-orders/order/:id' element={<OrderConfirmed/>}/>
      <Route path='/adminDashboard' element={<AdminDashboard/>}/>
      <Route path='/adminDashboard/order/:id' element={<OrderDetailAdmin/>}/>

      <Route path='*' element={<PageNotFound/>}/>

   
    </Routes>
    </>
  );
}

export default App;
