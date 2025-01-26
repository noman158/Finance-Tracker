import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addGoal, updateGoalProgress, deleteGoal } from '../store/goalsSlice';

const GoalTracker = () => {
  const dispatch = useDispatch();
  const goals = useSelector((state) => state.goals.goals);
  
  const [newGoal, setNewGoal] = useState({
    name: '',
    targetAmount: '',
    deadline: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newGoal.name || !newGoal.targetAmount) return;

    dispatch(
      addGoal({
        ...newGoal,
        targetAmount: parseFloat(newGoal.targetAmount),
      })
    );

    setNewGoal({
      name: '',
      targetAmount: '',
      deadline: '',
    });
  };

  const handleProgressUpdate = (goalId, amount) => {
    dispatch(
      updateGoalProgress({
        id: goalId,
        amount: parseFloat(amount),
      })
    );
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Goal Name
          </label>
          <input
            type="text"
            value={newGoal.name}
            onChange={(e) =>
              setNewGoal((prev) => ({ ...prev, name: e.target.value }))
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Target Amount
          </label>
          <input
            type="number"
            value={newGoal.targetAmount}
            onChange={(e) =>
              setNewGoal((prev) => ({ ...prev, targetAmount: e.target.value }))
            }
            min="0"
            step="0.01"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Target Date
          </label>
          <input
            type="date"
            value={newGoal.deadline}
            onChange={(e) =>
              setNewGoal((prev) => ({ ...prev, deadline: e.target.value }))
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Add Goal
        </button>
      </form>

      <div className="space-y-4">
        {goals.map((goal) => (
          <div
            key={goal.id}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {goal.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Target: ${goal.targetAmount.toFixed(2)}
                </p>
                {goal.deadline && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Deadline: {new Date(goal.deadline).toLocaleDateString()}
                  </p>
                )}
              </div>
              <button
                onClick={() => dispatch(deleteGoal(goal.id))}
                className="text-red-600 hover:text-red-900"
              >
                 Continuing directly from the previous response:

                Delete
              </button>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Progress</span>
                <span className="text-gray-900 dark:text-white">
                  ${goal.currentAmount.toFixed(2)} / ${goal.targetAmount.toFixed(2)}
                </span>
              </div>
              <div className="relative pt-1">
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary-200">
                  <div
                    style={{
                      width: `${Math.min(
                        (goal.currentAmount / goal.targetAmount) * 100,
                        100
                      )}%`,
                    }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-500"
                  ></div>
                </div>
              </div>

              <div className="flex gap-2">
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Update progress"
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
                  onChange={(e) =>
                    handleProgressUpdate(goal.id, e.target.value)
                  }
                  value={goal.currentAmount}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoalTracker;