import React, {FormEvent, useState} from "react";
import {IMealMutation} from "../../types";

interface Props {
    onAddNewMeal: (quote: IMealMutation) => void;
}

const MealForm: React.FC<Props> = ({onAddNewMeal}) => {
    const [form, setForm] = useState<IMealMutation>({
        meal_time: '-',
        description: '',
        calories: 0,
    });

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setForm({ ...form, [name]: value});
    };

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (form.meal_time === '-') {
            alert('Please select a meal time');
        } else {
            onAddNewMeal({...form});
        }
    };

    return (
        <div>
            <div className='container'>
                <form onSubmit={onSubmit} className="w-50 mx-auto mt-5">
                    <div className="mb-3">
                        <label htmlFor="meal_time">
                            Meal Time
                            <select className="form-select" name="meal_time" value={form.meal_time}
                                    onChange={onInputChange}>
                                <option value="-" disabled> Select meal time</option>
                                <option value="breakfast">Breakfast</option>
                                <option value="snack">Snack</option>
                                <option value="lunch">Lunch</option>
                                <option value="dinner">Dinner</option>
                            </select>
                        </label>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="description">Meal Description</label>
                        <textarea
                            required
                            className="form-control"
                            name="description"
                            value={form.description} onChange={onInputChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="calories">Calories</label>
                        <input
                            required
                            className="form-control"
                            type="number"
                            name="calories"
                            value={form.calories} onChange={onInputChange}
                        />
                    </div>
                    <div className="text-center mt-3">
                        <button
                            className="btn btn-primary"
                            type="submit"
                        >Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MealForm;