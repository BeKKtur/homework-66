export interface ApiMeal {
    id?: string,
    meal: string,
    mealText: string,
    calories: number
}

export interface Meal extends ApiMeal {
    [id: string]
}

export interface ApiMeals {
    [id: string]: ApiMeal
}