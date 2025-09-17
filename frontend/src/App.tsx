import {Route, Routes} from "react-router";

import {HomePage, Login} from "@/pages";
import {AuthLayout, LandingPageLayout} from "@/layouts";
import {useAuthStore} from "@/store/authStore.ts";
import {useEffect} from "react";

function App() {
    const refreshTokenRefreshRequest = useAuthStore(state=>state.refreshTokenRefreshRequest)
    const isAuthenticated = useAuthStore(state=>state.isAuthenticated)

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isAuthenticated) {
            // refresh every 5 minutes
            interval = setInterval(async () => {
               await refreshTokenRefreshRequest();
            }, 5 * 60 * 1000);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isAuthenticated, refreshTokenRefreshRequest]);


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
