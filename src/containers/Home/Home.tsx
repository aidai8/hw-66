import {NavLink} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import {APIMealsList, IMeal} from "../../types";
import axiosAPI from "../../axiosApi.ts";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";


const Home = () => {
    const [meals, setMeals] = useState<IMeal[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axiosAPI.get<APIMealsList>('meals.json');
            if (!response.data) {
                setMeals([]);
                return;

            }

            const mealsObject = response.data;
            const mealsArray = Object.keys(mealsObject).map(mealId => ({
                ...mealsObject[mealId],
                id: mealId,
            }));

            setMeals(mealsArray);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void fetchData();
    }, [fetchData]);

    const totalCalories = meals.reduce((acc, meal) => acc + meal.calories, 0);

    return (
        <div className=" container">
            <div className="row justify-content-between align-items-center">
                <h1 className="col p-0">Total calories: {totalCalories}</h1>
                <NavLink className="btn btn-primary col-2" to="/add-meal">Add new Meal</NavLink>
            </div>

            {loading ? <Spinner/> : (
                <div className="row col-6 mt-5">
                    {meals.length > 0 ? (
                        meals.map(meal => (
                            <div key={meal.id} className="card mb-3 p-4">
                                <h5>{meal.meal_time}</h5>
                                <p>{meal.description}</p>
                                <p><strong>Calories:</strong> {meal.calories}</p>
                            </div>
                        ))
                    ) : (
                        <p>No meals yet</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Home;