import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosApi from "../../axiosApi.ts";
import MealForm from "../../components/MealForm/MealForm.tsx";
import { IMealMutation } from "../../types";

const EditMeal = () => {
    const navigate = useNavigate();
    const { idMeal } = useParams();
    const [meal, setMeal] = useState<IMealMutation | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMeal = async () => {
            try {
                const response = await axiosApi.get<IMealMutation>(`/meals/${idMeal}.json`);
                if (response.data) {
                    setMeal(response.data);
                }
            } catch (e) {
                console.error("Failed to fetch meal:", e);
            } finally {
                setLoading(false);
            }
        };

        if (idMeal) {
            fetchMeal();
        }
    }, [idMeal]);

    const updateMeal = async (updatedMeal: IMealMutation) => {
        try {
            await axiosApi.put(`/meals/${idMeal}.json`, updatedMeal);
            navigate("/");
        } catch (e) {
            console.error("Failed to update meal:", e);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (!meal) return <p>Meal not found</p>;

    return (
        <div className="row">
            <div className="col">
                <MealForm onAddNewMeal={updateMeal} initialMeal={meal} isEdit />
            </div>
        </div>
    );
};

export default EditMeal;