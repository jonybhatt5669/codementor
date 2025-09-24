
import {StudentDashboardSidebar} from "@/components/studentdashboard/Sidebar.tsx";
import {Outlet} from "react-router";

function StudentDashboardLayout() {
    return (
        <div className={"min-h-screen bg-gray-100"}>
            <div className={"max-w-[1400px] flex-col md:flex-row flex"}>
                <StudentDashboardSidebar/>
                <Outlet/>
            </div>
        </div>
    )
}

export default StudentDashboardLayout
