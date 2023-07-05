import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, useOutlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { AnimatePresence, motion } from "framer-motion";

const AnimatedOutlet: React.FC = () => {
  const o = useOutlet();
  const [outlet] = useState(o);

  return <>{outlet}</>;
};

function Root() {
  // Remove when possible
  let location = useLocation();
  let navigate = useNavigate();
  useEffect(() => {
    if (location.pathname === "/") navigate("/orders");
  });

  return (
    <div className="flex bg-background-primary">
      <Sidebar />
      <AnimatePresence mode="popLayout">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 200 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -200 }}
          className="p-10 w-full h-screen"
        >
          <AnimatedOutlet />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default Root;
