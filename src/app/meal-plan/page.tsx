import MealPlan from './meal-plan';
import {Metadata} from 'next';

export const metadata: Metadata = {
    title: 'Meal Planning',
    description: 'Plan your meals for the week',
};

export default function MealPlanPage() {
  return (
      <div className="container p-6 space-y-6">
          <div className="flex flex-col gap-4">
              <h1 className="text-3xl font-bold">Meal Planning</h1>
          </div>
      <MealPlan />
      </div>
  );
}
