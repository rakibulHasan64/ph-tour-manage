import { Outlet } from "react-router"
import CommanLayout from "./components/layout/CommanLayout"




function App() {


  return (
    <>
      <CommanLayout>
        <Outlet />
      </CommanLayout>



    </>
  )
}

export default App
