import BoxAnnotator from "./components/annotation/BoxAnnotator";
import thali2 from "./components/images/thali2.jpeg";
import thali from "./components/images/thali.jpeg";
import thali3 from "./components/images/thali3.jpg";

function App() {
  const food = ["food1", "food2", "food3", "food4", "food5", "food6", "food7"];
  return (
    <div>
      <BoxAnnotator image={thali2} classes={food}></BoxAnnotator>
    </div>
  );
}

export default App;
