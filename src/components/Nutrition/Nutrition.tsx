import {useCallback, useEffect, useState} from "react";
import {ApiMeals, Meal} from "../../types";
import axiosApi from "../../axiosApi";
import {Link, NavLink} from "react-router-dom";

const Nutrition = () => {
    const [meals, setMeals] = useState<Meal[]>([]);

    const fetchMeal = useCallback( async () => {
        const {data: meal} = await axiosApi.get<ApiMeals | null>('/meals.json');
        if (meal) {
            setMeals(Object.keys(meal).map(id => ({
                ...meal[id],
                id: id
            })));
        } else {
            setMeals([])
        }
    }, []);

    const fetchDeleteMeal = async (id:string | undefined) => {
        const {data: deleteMeal} = await axiosApi.delete<ApiMeals | null>('/meals/' + id + '.json');
        if (deleteMeal) {
            setMeals(Object.keys(deleteMeal).map(id => ({
                ...deleteMeal[id],
                id
            })));
        }

        void fetchMeal()
    }

    useEffect(() => {
        void fetchMeal()
    }, [fetchMeal])

    const total = meals.reduce((acc, kcal) => {
        return acc + parseInt(kcal.calories)
    }, 0);

    return (
        <div className='container-fluid'>
            <div className='d-flex align-items-center justify-content-around gap-3 mb-3'>
                <h3>Calories: {total}</h3>
                <NavLink to='/add'>Add new meal</NavLink>
            </div>
            {meals.map(meal => (
                <div key={meal.id} className='card text-lg-start mb-3'>
                    <div className='d-flex align-items-center p-3'>
                        <div className="card-body d-flex justify-content-between flex-column">
                            <p>{meal.meal}</p>
                            <p>{meal.mealText}</p>
                        </div>
                        <div className='card-body'>
                            <p>{meal.calories}</p>
                        </div>
                        <div className='d-flex flex-column gap-2'>
                            <Link to={'/meals/' + meal.id} className='btn btn-success'>Edit</Link>
                            <button className='btn btn-danger' onClick={() => fetchDeleteMeal(meal.id)}>X</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Nutrition;