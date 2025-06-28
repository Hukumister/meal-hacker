'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

type Ingredient = { id: string; name: string; optional: boolean };
type Step = { id: string; text: string; order: number };

type Recipe = {
  id: string;
  title: string;
  activeTime: number;
  totalTime: number;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  ingredients: Ingredient[];
  steps: Step[];
};

const getRecipe = async (id: string): Promise<Recipe> => {
  return {
    id,
    title: 'Шоколадный Торт',
    activeTime: 20,
    totalTime: 40,
    calories: 350,
    protein: 10,
    fat: 15,
    carbs: 40,
    ingredients: [
      { id: '1', name: 'Мука — 200 г', optional: false },
      { id: '2', name: 'Сахар — 100 г', optional: false },
      { id: '3', name: 'Орехи — 50 г', optional: true},
      { id: '4', name: 'Какао-порошок — 50 г', optional: false },
      { id: '5', name: 'Яйцо — 2 шт.', optional: false },
      { id: '6', name: 'Молоко — 100 мл', optional: false },
      { id: '7', name: 'Масло растительное — 50 мл', optional: false },
      { id: '8', name: 'Разрыхлитель теста — 1 ч.л.', optional: false },
    ],
   steps: [
      { id: '1', text: 'В глубокой миске тщательно перемешай все сухие ингредиенты: муку, сахар, какао и разрыхлитель.', order: 1 },
      { id: '2', text: 'Добавь в смесь воду, растительное масло и ванильный экстракт. Перемешай венчиком до однородности без комков.', order: 2 },
      { id: '3', text: 'Если тесто кажется слишком густым, добавь ещё немного воды (1–2 ст. ложки) и снова перемешай.', order: 3 },
      { id: '4', text: 'Застели форму для выпечки пергаментной бумагой и вылей тесто, равномерно распределив его по форме.', order: 4 },
      { id: '5', text: 'Разогрей духовку до 180 °C. Поставь форму с тестом на средний уровень и выпекай около 20–25 минут.', order: 5 },
      { id: '6', text: 'Проверь готовность деревянной шпажкой — она должна выходить сухой. Если нужно, выпекай ещё 5 минут.', order: 6 },
      { id: '7', text: 'Достань торт из духовки и оставь в форме на 10 минут, затем аккуратно переложи на решётку для полного остывания.', order: 7 },
      { id: '8', text: 'По желанию укрась верх торта сахарной пудрой, измельчёнными орехами или ягодами.', order: 8 },
      { id: '9', text: 'Подавай торт к столу с чаем или кофе. Приятного аппетита!', order: 9 }
    ],

  };
};

export default function RecipePage() {
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      const data = await getRecipe('recipe-id-123');
      setRecipe(data);
    };
    fetchRecipe();
  }, []);

  if (!recipe) return <div className="p-8">Загрузка...</div>;

  return (
    <div className="max-w-6xl p-9 text-brown-800 font-sans">
      <h1 className="text-3xl font-bold text-center mb-10">{recipe.title}</h1>

      <div className="border border-brown-800 rounded-xl p-4 bg-white text-brown-800 font-sans grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-left my-6">
  
        <div className="flex flex-col items-center space-y-1">
          <Image src="/assets/clock_8250904.png" alt="..." width={30} height={30} className='text-center'/>
          <div className="flex flex-col items-start">
            <div><strong>Активное время:</strong> {recipe.activeTime} мин</div>
            <div><strong>Полное время:</strong> {recipe.totalTime} мин</div>
          </div>
        </div>

        <div className="flex flex-col items-center space-y-1">
          <Image src="/assets/burning_13351832.png" alt="..." width={30} height={30} />
          <div className="flex flex-col items-start">
            <div><strong>На порцию:</strong> {recipe.calories} ккал</div>
            <div><strong>На 100 г:</strong> 100 ккал</div>
          </div>
        </div>

        <div className="flex flex-col items-center space-y-1">
          <Image src="/assets/crab_8611029.png" alt="..." width={30} height={30} />
          <div className="flex flex-col items-start">
            <div><strong>На порцию:</strong> {recipe.protein}б {recipe.fat}ж {recipe.carbs}у</div>
            <div><strong>На 100 г:</strong> 3б 5ж 20у</div>
          </div>
        </div>
      </div>

       <div className="flex flex-col lg:flex-row gap-10 my-6">
        <div className="lg:w-1/3 max-w-sm rounded-lg bg-gray-100 p-6 text-left self-start">
          <h2 className="font-semibold text-xl mb-2">Ингредиенты:</h2>
          <ul className="list-disc pl-6 space-y-1">
            {recipe.ingredients.map((ing) => (
              <li key={ing.id}>
                {ing.name}{" "}
                {ing.optional && <span className="text-gray-500 text-sm">(по желанию)</span>}
              </li>
            ))}
          </ul>
          <button className="">
            <Image src="/assets/bag_7156253.png" alt="..." width={45} height={45} />
          </button>
        </div>
        <div className="w-full lg:flex-1 px-6 py-8 pt-2 bg-gradient-to-b from-white to-gray-100 rounded-lg">
          <h2 className="font-semibold text-xl mb-6 text-center">Шаги приготовления:</h2>
          <ol className="list-decimal list-inside space-y-5 text-gray-800">
            {recipe.steps
              .sort((a, b) => a.order - b.order)
              .map((step) => (
                <li key={step.id}>{step.text}</li>
              ))}
          </ol>
        </div>
        </div>

    </div>
  );
}
