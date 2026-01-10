import HabitForm from './components/HabitForm';
import HabitViewer from './components/HabitViewer';

function App() {
  return (
    <div style={{ padding: "2rem", maxWidth: "400px" }}>
      <HabitForm />
      <HabitViewer />
    </div>
  );
}

export default App;