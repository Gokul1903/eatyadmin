import { BrowserRouter, Routes, Route } from "react-router-dom";

import "bootstrap/dist/js/bootstrap.bundle.min.js"; 



import AdminLogin from "./AdminLogin";
import Register from "./register";

const MainLayout=()=>{
  return(<div className="container ">
        <div className="row">
        
        <Routes>
          <Route path="/Home" element={<Register />} />

          
        </Routes>
        </div>
      </div>
      )
  
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<AdminLogin/>} ></Route>

          <Route path="/*" element={<MainLayout/>} ></Route>
          
        </Routes>
      
    </BrowserRouter>
  );
}



export default App;
