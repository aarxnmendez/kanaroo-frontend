import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";

import Landing from "@/pages/Landing";
import NotFound from "@/pages/NotFound";
import { useLenis } from "@/hooks/useLenis";

function App() {
  // Initialize Lenis
  const lenis = useLenis();

  // Make Lenis available globally (optional)
  useEffect(() => {
    if (lenis) {
      window.lenis = lenis;
    }
  }, [lenis]);

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
