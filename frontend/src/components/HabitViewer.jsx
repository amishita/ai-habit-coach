import { useState } from "react";

function HabitViewer() {
  const [fetchDate, setFetchDate] = useState("");
  const [fetchedHabit, setFetchedHabit] = useState(null);
  const [fetchError, setFetchError] = useState("");

  const handleFetchHabit = async () => {
    setFetchError("");
    setFetchedHabit(null);

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/habit/${fetchDate}`
      );

      const result = await response.json();

      if (!response.ok) {
        setFetchError(result.detail || "Habit not found");
      } else {
        setFetchedHabit(result);
      }
    } catch (error) {
      console.error(error);
      setFetchError("Could not connect to backend");
    }
  };

  return (
    <>
      <hr style={{ margin: "2rem 0" }} />
      <h2>View Habit by Date</h2>

      <input
        type="date"
        value={fetchDate}
        onChange={(e) => setFetchDate(e.target.value)}
      />

      <button onClick={handleFetchHabit} style={{ marginLeft: "1rem" }}>
        Fetch
      </button>

      {fetchError && <p style={{ color: "red" }}>{fetchError}</p>}

      {fetchedHabit && (
        <div style={{ marginTop: "1rem" }}>
          <p><strong>Date:</strong> {fetchedHabit.date}</p>
          <p><strong>Sleep:</strong> {fetchedHabit.sleep_hours} hours</p>
          <p><strong>Steps:</strong> {fetchedHabit.steps}</p>
          <p><strong>Mood:</strong> {fetchedHabit.mood}</p>
        </div>
      )}
    </>
  );
}

export default HabitViewer;
