export interface IMealMutation {
    meal_time: string;
    description: string;
    calories: number;
}

export interface IMeal {
    id: string;
    meal_time: string;
    description: string;
    calories: number;
}

export interface APIMealsList {
    [id: string]: IMealMutation;
}