import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

function Auth() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("validate");
    console.log("hello");
    console.log(token);
    if (!token) {
      navigate("/"); 
    }
  }, [navigate]);

  return (
    <div>
    
      <main>
        <Outlet /> 
      </main>
    </div>
  );
}

export default Auth;
