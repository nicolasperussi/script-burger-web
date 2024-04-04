import Header from "./components/header";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <div className="container py-4 max-w-screen-2xl">
        <Outlet />
      </div>
    </>
  );
}

export default App;
