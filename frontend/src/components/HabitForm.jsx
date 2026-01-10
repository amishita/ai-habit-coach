import { useState } from "react";

function HabitForm() {
  const [date, setDate] = useState("");
  const [sleepHours, setSleepHours] = useState("");
  const [steps, setSteps] = useState("");
  const [mood, setMood] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const habitData = {
      date,
      sleep_hours: Number(sleepHours),
      steps: Number(steps),
      mood: Number(mood),
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/log-habit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(habitData),
      });

      const result = await response.json();

      if (!response.ok) {
        setMessage(result.detail || "Something went wrong");
      } else {
        setMessage("Habit logged successfully!");
        setDate("");
        setSleepHours("");
        setSteps("");
        setMood("");
      }
    } catch (error) {
      console.error(error);
      setMessage("Could not connect to backend");
    }
  };

  return (
    <>
      <h1>Habit Logger</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Date</label><br />
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>

        <div>
          <label>Sleep hours</label><br />
          <input type="number" value={sleepHours} onChange={(e) => setSleepHours(e.target.value)} required />
        </div>

        <div>
          <label>Steps</label><br />
          <input type="number" value={steps} onChange={(e) => setSteps(e.target.value)} required />
        </div>

        <div>
          <label>Mood (1–5)</label><br />
          <input type="number" min="1" max="5" value={mood} onChange={(e) => setMood(e.target.value)} required />
        </div>

        <button type="submit" style={{ marginTop: "1rem" }}>
          Submit
        </button>
      </form>

      {message && <p>{message}</p>}
    </>
  );
}

export default HabitForm;
