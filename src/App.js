import Header from "./component/Header";
import Card from "./component/Card";
import {Route, Routes} from 'react-router-dom'
import Addmovie from "./component/Addmovie";
import Detail from "./component/Detail";
import { createContext, useEffect, useState } from "react";
import Login from "./component/Login";
import Signup from "./component/Signup";


const Appstate = createContext();

function App() {
  const [login, setLogin] = useState(false);
  const [userName, setUserName] = useState("");
    

  return (
    <Appstate.Provider value={{login, userName, setLogin, setUserName}}>                                  
    <div className="App relative">
     
     <Header/>
     <Routes>
     <Route path="/" element={<Card/>}/>
     <Route path="/addmovie" element={<Addmovie/>}/>
     <Route path="/detail/:id" element={<Detail/>}/>
     <Route path="/login" element={<Login/>}/>
     <Route path="/signup" element={<Signup/>}/>
     </Routes>
     
    </div>
    </Appstate.Provider> 
  );
}



export default App;
export {Appstate}
