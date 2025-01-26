import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setMonthlyBudget, setCategoryBudget } from '../store/budgetSlice';

const BudgetManager = () => {
  const dispatch = useDispatch();
  const { monthlyBudget, categories } = useSelector((state) => state.budget);
  const transactionCategories = useSelector(
    (state) => state.transactions.categories
  );
  
  const [budget, setBudget] = useState(monthlyBudget);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setMonthlyBudget(parseFloat(budget)));
  };

  const handleCategoryBudget = (category, amount) => {
    dispatch(
      setCategoryBudget({
        category,
        amount: parseFloat(amount),
      })
    );
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Monthly Budget
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400">
              $
            </span>
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              min="0"
              step="0.01"
              className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border-gray-300 focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Set Budget
        </button>
      </form>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Category Budgets
        </h3>
        {transactionCategories
          .filter((category) => category.type === 'expense')
          .map((category) => (
            <div
              key={category.id}
              className="flex items-center space-x-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
            >
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {category.name}
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400">
                    $
                  </span>
                  <input
                    type="number"
                    value={categories[category.id] || ''}
                    onChange={(e) =>
                      handleCategoryBudget(category.id, e.target.value)
                    }
                    min="0"
                    step="0.01"
                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border-gray-300 focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default BudgetManager;