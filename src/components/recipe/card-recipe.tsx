'use client';

import { useState, useEffect } from 'react';

type Ingredient = {id: string, name: string}


export async function getRecipe(id: string): Promise<Recipe | null >{

}
export function RecipePage(){
    const [recipe, setRecipe] = useState<Resipe | null>(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            const data = await getRecipe();
            setRecipe(data);
        };
        fetchRecipe();
    }, []);
    if(!recipe) return <div className='p-8'>Louding...</div>

    return(
        <div>
            <h1>{recipe.title}</h1>
            <div>
                <div>Активное время , Полное время </div>
                <div></div>
                <div></div>
            </div>
        </div>
    )



}
