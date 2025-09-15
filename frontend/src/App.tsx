import {Route, Routes} from "react-router";

import {HomePage, Login} from "@/pages";
import {AuthLayout, LandingPageLayout} from "@/layouts";

function App() {
    return (
        <Routes>
            <Route element={<LandingPageLayout/>}>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/about" element={<div>About Page</div>}/>
                <Route path="/contact" element={<div>Contact Page</div>}/>
            </Route>
            <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />}/>

            </Route>
        </Routes>
    )
}

export default App
