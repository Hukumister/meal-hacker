
import React from 'react';
import { Clock8, Flame, EggFried, ShoppingBag } from 'lucide-react';


export default function RecipeCard() {
  const recipe = {
    title: 'Шоколадный Торт',
    cookingTime: { active: 20, total: 40 },
    calories: 350,
    caloriesPer100: 100,
    nutritionPerServing: { protein: 10, fat: 15, carbs: 40 },
    nutritionPer100: { protein: 3, fat: 5, carbs: 20 },
    ingredients: [
      { name: 'Мука', amount: 200, unit: 'г' },
      { name: 'Сахар', amount: 100, unit: 'г' },
      { name: 'Орехи', amount: 50, unit: 'г' },
      { name: 'Какао-порошок', amount: 50, unit: 'г' },
      { name: 'Яйцо', amount: 2, unit: 'шт.' },
      { name: 'Молоко', amount: 100, unit: 'мл' },
      { name: 'Масло растительное', amount: 50, unit: 'мл' },
      { name: 'Разрыхлитель теста', amount: 1, unit: 'ч.л.' },
    ],
    instructions: [
      'В глубокой миске перемешай все сухие ингредиенты.',
      'Добавь воду, масло и ванильный экстракт. Перемешай.',
      'Если тесто густое, добавь воду (1–2 ст. ложки).',
      'Застели форму бумагой и вылей тесто.',
      'Разогрей духовку до 180 °C и выпекай 20–25 мин.',
      'Проверь шпажкой и при необходимости допеки.',
      'Оставь в форме на 10 мин, переложи на решётку.',
      'Укрась пудрой, орехами или ягодами.',
      'Подавай с чаем или кофе.',
    ],
};
  return (
    <div className="max-w-6xl p-9 text-brown-800 font-sans">
      <h1 className="text-3xl font-bold text-center mb-10">{recipe.title}</h1>

      <div className="border border-brown-800 rounded-xl p-4 bg-white text-brown-800 font-sans grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-left my-6">
  
        <div className="flex flex-col items-center space-y-1">
          <Clock8 width={30} height={30}/>
          <div className="flex flex-col items-start">
            <div><strong>Активное время:</strong> {recipe.cookingTime.active} мин</div>
            <div><strong>Полное время:</strong> {recipe.cookingTime.total} мин</div>
          </div>
        </div>

        <div className="flex flex-col items-center space-y-1">
          <Flame width={30} height={30}/>
          <div className="flex flex-col items-start">
            <div><strong>На порцию:</strong> {recipe.calories} ккал</div>
            <div><strong>На 100 г:</strong> {recipe.caloriesPer100} ккал</div>
          </div>
        </div>

        <div className="flex flex-col items-center space-y-1">
          <EggFried width={30} height={30} />
          <div className="flex flex-col items-start">
            <div><strong>На порцию:</strong> {recipe.nutritionPerServing.protein}б {recipe.nutritionPerServing.fat}ж {recipe.nutritionPerServing.carbs}у</div>
            <div><strong>На 100 г:</strong> {recipe.nutritionPer100.protein}б {recipe.nutritionPer100.fat}ж {recipe.nutritionPer100.carbs}у</div>
          </div>
        </div>
      </div>

       <div className="flex flex-col lg:flex-row gap-10 my-6">
        <div className="lg:w-1/3 max-w-sm rounded-lg bg-gray-100 p-6 text-left self-start">
          <h2 className="font-semibold text-xl mb-2">Ингредиенты:</h2>
          <ul className="list-disc pl-6 space-y-1">
            {recipe.ingredients.map((ing, idx) => (
              <li key={idx}>
                {ing.name} - {ing.amount} {ing.unit}
              </li>
            ))}
          </ul>
          <button className="p-2">
            <ShoppingBag width={40} height={40} />
          </button>
        </div>
        <div className="w-full lg:flex-1 px-6 py-8 pt-2 bg-gradient-to-b from-white to-gray-100 rounded-lg">
          <h2 className="font-semibold text-xl mb-6 text-center">Шаги приготовления:</h2>
          <ol className="list-decimal list-inside space-y-5 text-gray-800">
            {recipe.instructions.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>
        </div>
        </div>

    </div>
  );
}
