import { useState } from "react"; // stores form input 


function App() {
  // state variables for form inputs
  const [date, setDate] = useState("");
  const [sleepHours, setSleepHours] = useState("");
  const [steps, setSteps] = useState("");
  const [mood, setMood] = useState("");
  const [message, setMessage] = useState("");
  const [fetchDate, setFetchDate] = useState("");
  const [fetchedHabit, setFetchedHabit] = useState(null);
  const [fetchError, setFetchError] = useState("");

  // function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent default form submission behavior

    // prepare data to send to backend
    const habitData = {
      date: date,
      sleep_hours: Number(sleepHours),
      steps: Number(steps),
      mood: Number(mood),
    };

    // send data to backend
    try {
      const response = await fetch("http://127.0.0.1:8000/log-habit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(habitData),
      });
      // parse JSON response
      const result = await response.json();
      // handle response
      if (!response.ok) {
        setMessage(result.detail || "Something went wrong");
      } else {
        setMessage("Habit logged successfully!");
      }
      // log the backend response
      console.log("Backend response:", result);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Could not connect to backend");
    }
  };

  const fetchHabitData = async () => {
    setFetchError("");
    setFetchedHabit(null);

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/habit/${fetchDate}`
      );

      const result = await response.json();

      if (!response.ok) {
        setFetchError(result.detail || "Habit not found.");
      } else {
        setFetchedHabit(result);
      }
    } catch (error) {
      console.error("Error:", error);
      setFetchError("Could not connect to backend");
    }
  }
  // render the form
  return (
    <div style={{ padding: "2rem", maxWidth: "400px" }}>
      <h1>Habit Logger</h1>

      <form onSubmit={handleSubmit}> {/* form submission handler */}
        <div>
          <label>Date</label><br />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Sleep hours</label><br />
          <input
            type="number"
            value={sleepHours}
            onChange={(e) => setSleepHours(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Steps</label><br />
          <input
            type="number"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Mood (1–5)</label><br />
          <input
            type="number"
            min="1"
            max="5"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            required
          />
        </div>

        <button type="submit" style={{ marginTop: "1rem" }}>
          Submit
        </button>
      </form>

      {message && <p>{message}</p>}

      <hr style={{ margin: "2rem 0" }} />

      <h2>View Habit by Date</h2>

      <input
        type="date"
        value={fetchDate}
        onChange={(e) => setFetchDate(e.target.value)}
      />

      <button onClick={fetchHabitData} style={{ marginLeft: "1rem" }}>
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
    </div>
  );
}

export default App;
