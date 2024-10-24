// Exercise categories
const exercises = {
  push: [
    "Dumbbell Bench Press",
    "Dumbbell Shoulder Press",
    "Push-Ups",
    "Plank to Push-Up",
    "Diamond Push-Ups",
    "Incline Dumbbell Press",
  ],
  pull: [
    "Dumbbell Row",
    "Dumbbell Bicep Curl",
    "Dumbbell Chest Fly",
    "Renegade Row",
    "Inverted Row",
    "Bent-Over Dumbbell Row",
  ],
  legs: [
    "Dumbbell Squat",
    "Bulgarian Split Squat",
    "Dumbbell Deadlift",
    "Lunges",
    "Step-ups",
    "Goblet Squat",
  ],
  core: [
    "Leg Raises",
    "Plank Hold",
    "Bicycle Crunch",
    "Russian Twist",
    "Mountain Climbers",
    "Plank Shoulder Taps",
  ],
  cardio: [
    "Jump Squats",
    "Mountain Climbers",
    "Burpees",
    "Jumping Jacks",
    "High Knees",
    "Plank Jacks",
  ],
};

// Rep and set choices
const repChoices = [
  { sets: 3, reps: 12 },
  { sets: 4, reps: 10 },
  { sets: 5, reps: 8 },
];

// Wildcard options for duplicate rolls
const wildcards = [
  "Max Push-ups in 1 Minute",
  "1-minute Plank",
  "50 Mountain Climbers",
  "20 Burpees",
  "1-minute Wall Sit",
];

// Surprise finishers
const finishers = [
  "1-minute plank",
  "30 Jump Squats",
  "20 Burpees",
  "50 Mountain Climbers",
  "Max Push-Ups in 1 Minute",
  "1-minute Wall Sit",
];

// Define weekly plans based on the number of workout days
const weeklyPlans = {
  3: ["push", "pull", "legs"], // Balanced 3-day routine
  4: ["push", "pull", "legs", "core/cardio"], // Add a core/cardio day to balance
  5: ["push", "pull", "legs", "core", "cardio"], // Full body split
  6: ["push", "pull", "legs", "core", "cardio", "mix"], // Max training week with mixed day (push/pull)
};

// Generate a workout based on the type of day
function generateWorkout() {
  const workoutType = document.getElementById("workoutType").value;
  const selectedExercises = rollExercises(workoutType);

  // Display the result
  const resultDiv = document.getElementById("workoutResult");
  let resultHTML = `<h3>Today's ${
    workoutType.charAt(0).toUpperCase() + workoutType.slice(1)
  } Workout</h3>`;

  selectedExercises.exercises.forEach((exercise) => {
    resultHTML += `<p>- ${exercise}: ${selectedExercises.sets} sets of ${selectedExercises.reps} reps</p>`;
  });

  // Add the surprise finisher
  resultHTML += `<p><strong>Surprise Finisher:</strong> ${selectedExercises.finisher}</p>`;

  resultDiv.innerHTML = resultHTML;
}

// Function to handle randomization (dice rolls)
function rollExercises(dayType) {
  const chosenExercises = [];
  while (chosenExercises.length < 3) {
    let exercise =
      exercises[dayType][Math.floor(Math.random() * exercises[dayType].length)];

    if (!chosenExercises.includes(exercise)) {
      chosenExercises.push(exercise);
    } else {
      // If a duplicate is rolled, pick a wildcard
      exercise = wildcards[Math.floor(Math.random() * wildcards.length)];
      chosenExercises.push(exercise);
    }
  }

  // Choose sets and reps
  const { sets, reps } =
    repChoices[Math.floor(Math.random() * repChoices.length)];

  // Choose a surprise finisher
  const finisher = finishers[Math.floor(Math.random() * finishers.length)];

  return { exercises: chosenExercises, sets, reps, finisher };
}

// Generate a weekly workout plan based on the number of workout days
function generatePlan() {
  const workoutDays = parseInt(document.getElementById("workoutDays").value);
  const workoutPlan = weeklyPlans[workoutDays];

  const resultDiv = document.getElementById("planResult");
  let resultHTML = `<h3>Your ${workoutDays}-Day Weekly Plan</h3>`;

  workoutPlan.forEach((dayType, index) => {
    if (dayType === "core/cardio") {
      resultHTML += `<p>Day ${index + 1}: Core and Cardio</p>`;
    } else if (dayType === "mix") {
      resultHTML += `<p>Day ${index + 1}: Mixed Day (Push & Pull)</p>`;
    } else {
      resultHTML += `<p>Day ${index + 1}: ${
        dayType.charAt(0).toUpperCase() + dayType.slice(1)
      }</p>`;
    }
  });

  resultDiv.innerHTML = resultHTML;
}
