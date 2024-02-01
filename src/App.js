
import Contact from './components/Contact';
import About from './components/About';
import Header from './components/Header';
import Home from './components/Home';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Details from './components/Details';
import { getRestaurants } from './components/redux/restaurantSlice';
import { useDispatch, useSelector } from 'react-redux';
import Addrestaurants from './components/Addrestaurants';
import Register from './components/Register';
import ProtectedRoute from './utils/ProtectedRoute';
import Login from './components/Login';
import Users from './components/Users';
import User from './components/User';
import instance from './axios';




function App() {

const dispatch = useDispatch();
const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
// console.log("isAuthenticated ---------------->",isAuthenticated);

useEffect(()=>{
  // fetch("/restaurants.json")
  // .then((data) => data.json())
  // .then((res) => dispatch(getRestaurants(res.restaurants)));

  const fetchRestaurant = async()=>{
   

    try {
      const res = await instance.get('/api/v2/restaurant')
      if(res.data.success){
        dispatch(getRestaurants(res.data.restaurant))
      
      }else{
        console.log(res.data.message);
      }
    } catch (error) {
      console.log(error.message);
    }

  }

  fetchRestaurant();

  // return("")

}, [dispatch]);


//  const restaurant = {
//     id: 1,
//     name: "Mission Chinese Food",
//     neighborhood: "Manhattan",
//     photograph: "https://images.unsplash.com/photo-1526318896980-cf78c088247c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1534&q=80",
//     address: "171 E Broadway, New York, NY 10002",
// }

  return (
    
<Router>
<Header/>
<Routes>
  <Route path="/" element={<Home  />} />
  <Route path="/about" element={<About />} />
  <Route path="/contact" element={<Contact />} />
  <Route path='/details/:id' element={<Details />} />
  <Route path='/register' element={<Register />} />
  <Route path='/add' element={<ProtectedRoute isAuthenticated={true}><Addrestaurants /></ProtectedRoute>}/>
  <Route path='/login' element={<Login />} />
  <Route path='/users' element={<ProtectedRoute isAuthenticated={isAuthenticated}><Users /></ProtectedRoute>}/>
  <Route path='/user/:id' element={<ProtectedRoute isAuthenticated={isAuthenticated}><User /></ProtectedRoute>}/>
 
  
  
  
</Routes>
      <Footer/>
</Router>
     
    
  );
}

export default App;
