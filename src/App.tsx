import './App.css'
import Layout from "./components/Layout/Layout.tsx";
import {Route, Routes} from "react-router-dom";
import Home from "./containers/Home/Home.tsx";
import AddNewMeal from "./containers/AddNewMeal/AddNewMeal.tsx";

const App = () => {

  return (
      <>
        <Layout>
          <Routes>
              <Route path="/"  element={<Home/>}/>
              <Route path="/meals"  element={<Home/>}/>
              <Route path="/add-meal"  element={<AddNewMeal/>}/>
              <Route path="*" element={<h1>Not found</h1>}/>
          </Routes>
        </Layout>
      </>
  )
};

export default App
