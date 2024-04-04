import Header from "./components/header";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="container py-4 max-w-screen-2xl flex-1">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
