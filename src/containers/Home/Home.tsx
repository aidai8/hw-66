import {Link, NavLink} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import {APIMealsList, IMeal} from "../../types";
import axiosAPI from "../../axiosApi.ts";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";

const Home = () => {
    const [meals, setMeals] = useState<IMeal[]>([]);
    const [loading, setLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axiosAPI.get<APIMealsList>('meals.json');
            if (!response.data) {
                setMeals([]);
                return;
            }

            const mealsArray = Object.keys(response.data).map(mealId => ({
                ...response.data[mealId],
                id: mealId,
                calories: Number(response.data[mealId].calories)
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

    const deleteMeal = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this meal?")) return;

        try {
            setDeleteLoading(id);
            await axiosAPI.delete(`meals/${id}.json`);
            setMeals(prevMeals => prevMeals.filter(meal => meal.id !== id));
        } catch (e) {
            console.error("Error deleting meal:", e);
        } finally {
            setDeleteLoading(null);
        }
    };

    const totalCalories = meals.reduce((acc, meal) => acc + Number(meal.calories), 0);

    return (
        <div className=" container">
            <div className="row justify-content-between align-items-center">
                <h1 className="col p-0">Total calories: {totalCalories}</h1>
                <NavLink className="btn btn-primary col-2" to="/add-meal">Add new Meal</NavLink>
            </div>

            {loading ? <Spinner/> : (
                <div className="row col-12 mt-5">
                    {meals.length > 0 ? (
                        meals.map(meal => (
                            <div key={meal.id} className="card mb-3 p-4">
                                <h5>{meal.meal_time}</h5>
                                <p>{meal.description}</p>
                                <hr/>
                                <p><strong>Calories:</strong> {meal.calories}</p>
                                <div className="d-flex gap-2">
                                    <Link to={`/edit-meal/${meal.id}`} className="btn btn-secondary">Edit</Link>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => deleteMeal(meal.id)}
                                        disabled={deleteLoading === meal.id}
                                    >
                                        {deleteLoading === meal.id ? <Spinner/> : "Delete"}
                                    </button>
                                </div>
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