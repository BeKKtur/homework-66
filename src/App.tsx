import Nutrition from "./components/Nutrition/Nutrition";
import {Route, Routes} from "react-router-dom";
import AddMeal from "./components/Add-Edit/AddMeal";

function App() {

  return (
    <>
        <div>
            <Routes>
                <Route path='/' element={<Nutrition/>}/>
                <Route path='/add' element={<AddMeal/>}/>
                <Route path={'/meals/:id'} element={<AddMeal/>}/>
                <Route path='*' element={<h2>Not Found</h2>}/>
            </Routes>
        </div>
    </>
  )
}

export default App
