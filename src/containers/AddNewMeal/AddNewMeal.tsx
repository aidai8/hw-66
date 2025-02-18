import MealForm from "../../components/MealForm/MealForm.tsx";
import {IMealMutation} from "../../types";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import {useState} from "react";
import axiosAPI from "../../axiosApi.ts";
import {useNavigate} from "react-router-dom";


const AddNewMeal = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onAddNewMeal = async (meal: IMealMutation) => {
        try {
            setLoading(true);
           await axiosAPI.post('meals.json', meal);
           navigate('/');
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loading ? <Spinner/> : <MealForm onAddNewMeal={onAddNewMeal}/>}
        </>
    );
};

export default AddNewMeal;