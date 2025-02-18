import {NavLink} from "react-router-dom";


const Home = () => {
    return (
        <div className="row justify-content-between align-items-center">
            <h1 className="col">Total calories: {}</h1>
            <NavLink className="btn btn-primary col-2" to="/add-meal">Add new Meal</NavLink>
        </div>
    );
};

export default Home;