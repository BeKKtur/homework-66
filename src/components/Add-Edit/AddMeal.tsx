import {MEAL} from "../../constants";
import {useState} from "react";
import {ApiMeal, ApiMeals, Meal} from "../../types";
import * as React from "react";
import axiosApi from "../../axiosApi";
import {useNavigate, useParams} from "react-router-dom";


const AddMeal= () => {

    const params = useParams();

    const navigate = useNavigate();

    const [editMeal, setEditMeal] = useState<Meal[]>([]);

    const [newMeal, setNewMeal] = useState<ApiMeal>({
        id:Math.random().toString(),
        meal: '',
        mealText: '',
        calories: 0
    });

    const onSubmitForm = async (e:React.FormEvent) => {
        e.preventDefault();
        try {
            await axiosApi.post('/meals.json', {...newMeal});
        } finally {
            navigate('/');
        }
    }

    const onChange = (e:React.ChangeEvent <HTMLSelectElement | HTMLInputElement>) => {
        setNewMeal(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    const editNewMeal = async () => {
        const {data: editMeal} = await axiosApi.put<ApiMeals | null>('/meals/' + params.id + '.json');
        if (editMeal) {
            setEditMeal(Object.keys(editMeal).map(id => ({
                ...editMeal[id],
                id
            })))
        } else {
            setEditMeal([]);
        }
    }

    const onPut = (e:React.ChangeEvent <HTMLSelectElement | HTMLInputElement>) => {
        setEditMeal(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    const putMeal = async (e:React.FormEvent) => {
        e.preventDefault()
        try {
            await axiosApi.put('/meals/' + params.id + '.json', {...editMeal});
        } finally {
            navigate('/');
        }
    }



    return (
        <>
            <form className='text-lg-start container-fluid pb-5 pt-5' onSubmit={params.id ? putMeal : onSubmitForm}>
                <h2>{params.id ? 'Edit meal' : 'Add new meal'}</h2>
                <div className='form-group mb-5'>
                    <select
                        name="meal"
                        id="meal"
                        required
                        className="form-control"
                        value={params.id ? editMeal.meal : newMeal.meal}
                        onChange={params.id ? onPut : onChange}
                    >
                        <option value="">Meal</option>
                        {MEAL.map(meal => (
                            <option value={meal.value} id={meal.value} key={meal.value}>{meal.label}</option>
                        ))}
                    </select>
                </div>
                <div className='form-group mb-5'>
                    <input
                        type="text"
                        name="mealText"
                        id="mealText"
                        required
                        placeholder='Meal description'
                        className="form-control"
                        value={params.id ? editMeal.mealText : newMeal.mealText}
                        onChange={params.id ? onPut : onChange}
                    />
                </div>
                <div className='form-group mb-5'>
                    <input
                        type="number"
                        required
                        name="calories"
                        id="calories"
                        placeholder='Calories'
                        className="form-control"
                        value={params.id ? editMeal.calories : newMeal.calories}
                        onChange={params.id ? onPut : onChange}
                    />
                </div>
                <button className='btn btn-success' onClick={() => editNewMeal}>Save</button>
            </form>
        </>
    );
};

export default AddMeal;