import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import ProductsForm from './components/backoffice/productForm';
import Footer from './components/footer/Footer';
import LoginForm from './components/forms/LoginForm';
import RegistrationForm from './components/forms/RegistrationForm';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import AboutUsPage from './pages/AboutUsPage';
import SetProductsPage from './pages/backoffice/setProducts';
import CheckoutPage from './pages/CheckoutPage';
import ContactPage from './pages/ContactPage';
import ShopPage from './pages/E-ShopPage';
import HomePage from './pages/HomePage';
import Checkout from './components/checkout/CheckOut'
// import Carrusel from "./components/carrusel/Carrusel";
import ProductsPage from './pages/ProductsPage';
import MessagesPage from './pages/backoffice/messages';
import MessageDetailsPage from './components/backoffice/messageDetail';
import ProductCard from './components/cards/productsCard/ProductCard';
import SetCarrousel from './pages/backoffice/setCarrousel';
import SlideForm from './components/backoffice/slideForm';

function App() {
  return (
    <BrowserRouter>
      <ResponsiveAppBar />
      <section className='main_container'>
        <Routes>
            <Route path='/' element={ <HomePage/>} />
            <Route path='/Home' element={ <HomePage/>}/>
            <Route path='/Nosotros' element={ <AboutUsPage/>} />
            <Route path='/Productos' element={ <ProductsPage/>} />
            <Route path='/Tienda' element={ <ShopPage/>} />
            <Route path='/micarrito' element={ <CheckoutPage/>} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/Contacto' element={ <ContactPage/>} />
            <Route path='/backoffice' element={ <SetProductsPage />} />
            <Route path='/backoffice/message' element={ <MessagesPage />} />
            <Route path='/backoffice/message/:id' element={ <MessageDetailsPage />} />
            <Route path='/backoffice/productsform' element={ <ProductsForm />} />
            <Route path='/backoffice/productsform/:id' element={ <ProductsForm />} />
            <Route path='/backoffice/slideform' element={ <SlideForm />} />
            <Route path='/backoffice/slideform/:id' element={ <SlideForm />} />
            <Route path='/backoffice/setcarrousel' element={ <SetCarrousel />} />
            <Route path='/register' element={ <RegistrationForm />} />
            <Route path='/login' element={ <LoginForm />} />
            <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </section>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
