
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  // Redirect to the map page
  useEffect(() => {
    navigate("/map");
  }, [navigate]);

  return null;
};

export default Index;
