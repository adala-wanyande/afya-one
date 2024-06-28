import React from "react";

const UserInsightsPanel = ({ workoutData, weightsData, nutritionData }) => {
  const calculateWorkoutStreak = () => {
    const dates = Object.keys(workoutData).sort();
    if (dates.length === 0) return 0;

    let streak = 1;
    for (let i = dates.length - 1; i > 0; i--) {
      const currentDate = new Date(dates[i]);
      const previousDate = new Date(dates[i - 1]);
      const diffTime = Math.abs(currentDate - previousDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };

  const calculateAverageWeight = () => {
    if (weightsData.data.length === 0) return 0;
    const totalWeight = weightsData.data.reduce((a, b) => a + b, 0);
    return (totalWeight / weightsData.data.length).toFixed(2);
  };

  const calculateWeightChange = () => {
    if (weightsData.data.length === 0) return 0;
    const firstWeight = weightsData.data[0];
    const lastWeight = weightsData.data[weightsData.data.length - 1];
    return (lastWeight - firstWeight).toFixed(2);
  };

  const workoutStreak = calculateWorkoutStreak();
  const averageWeight = calculateAverageWeight();
  const totalWorkouts = Object.keys(workoutData).length;
  const weightChange = calculateWeightChange();

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg space-y-4 max-h-[50vh] overflow-auto mb-4">
      <h2 className="text-xl font-semibold">User Insights</h2>
      <div className="space-y-2">
        <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
          <h3 className="text-lg font-medium">Workout Streak</h3>
          <p>{workoutStreak} days</p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
          <h3 className="text-lg font-medium">Total Workouts</h3>
          <p>{totalWorkouts} sessions</p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
          <h3 className="text-lg font-medium">Average Weight</h3>
          <p>{averageWeight} kg</p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
          <h3 className="text-lg font-medium">Weight Change</h3>
          <p>{weightChange} kg</p>
        </div>
      </div>
    </div>
  );
};

export default UserInsightsPanel;
