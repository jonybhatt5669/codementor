import {NavLink, useLocation} from "react-router";
import {useState} from "react";
import {Calendar1, Clock3, Eye, NotebookText, Rocket, Settings, Star} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import ResponsiveLogo from '@/assets/svg/responsive_logo.svg'
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area"


export const StudentDashboardSidebar = () => {
    const [settingLinksOpen, setSettingLinksOpen] = useState(false);
    const pathname = useLocation().pathname

    const navLinks = [{name: "Dashboard", path: "/s/dashboard", icon: Rocket}, {
        name: "Requests", path: "/s/dashboard/my-requests", icon: NotebookText
    }, {name: "Scheduled sessions", path: "/s/dashboard/my-schedules", icon: Calendar1}, {
        name: "Session history", path: "/s/dashboard/session-history", icon: Clock3
    }, {name: "Freelance jobs", path: "/s/dashboard/freelance-jobs", icon: Star}, {
        name: "Code reviews", path: "/s/dashboard/code-reviews", icon: Eye
    },

    ];

    const settingsLinks = {
        name: "Account settings",
        path: "/settings",
        children: [{name: "Notifications", path: "/settings/notifications"}, {
            name: "Team", path: "/settings/team"
        }, {name: "Buy Credits", path: "/settings/credits"}, {name: "Plans", path: "/settings/plans"}, {
            name: "Billing", path: "/settings/billing"
        }, {name: "Manage account", path: "/settings/manage"},],
    }

    return (<>
        <aside className="hidden md:flex flex-col lg:w-64 md:w-32 bg-white border-r border-gray-200 p-6 gap-6 min-h-dvh">
            <img src={ResponsiveLogo} alt="logo" className={"size-auto"}/>


            <nav className="flex-1 mt-2">
                <ul className="space-y-2">
                    {navLinks.map(({name, path, icon: Icon}) => (<li key={name}>
                        <NavLink
                            to={path}
                            className={({isActive}) => `
                                flex items-center gap-2 px-3 py-2 rounded-md transition-colors duration-200 
                                ${isActive || location.pathname.startsWith(path) ? "bg-rose-100/50 text-gray-900 font-medium" : "hover:bg-rose-50"}`}
                        >
                            <Icon className={`${pathname === path ? "text-rose-500" : ""}`}/>
                          <span className={"md:hidden lg:block"}>{name}</span>
                        </NavLink>


                        {/* Render children if active */}

                    </li>))}
                </ul>
                <button
                    onClick={() => setSettingLinksOpen((prev) => !prev)}
                    className={`flex w-full items-center gap-2 justify-between rounded px-3 py-2 hover:bg-rose-200 cursor-pointer ${location.pathname.startsWith("/settings") ? "bg-gray-200 font-semibold" : ""}`}
                >
                            <p className="flex items-center gap-2">
                                <Settings className="w-4 h-4"/>
                                <span className={"md:hidden lg:block"}>Account Setting</span>
                            </p>

                </button>

                {settingLinksOpen && (<div className={"mt-6 ml-2 space-y-2"}>
                    {settingsLinks.children.map((sublink) => (<NavLink
                        key={sublink.name}
                        to={sublink.path}
                        className={({isActive}) => `block px-3 py-2 rounded-md transition-colors duration-200 text-sm ${isActive || location.pathname.startsWith(sublink.path) ? "bg-rose-100 text-gray-900 font-medium" : "hover:bg-rose-50"}`}
                    >
                        {sublink.name}
                    </NavLink>))}
                </div>)}
            </nav>


            <Button size={"sm"} className={"rounded font-medium text-xs w-full"}>Post Request</Button>
        </aside>

        <ScrollArea className={" rounded-md border whitespace-nowrap md:hidden"}>
            <div className={"flex w-max space-x-4 p-4 flex-wrap items-center justify-center"}>
                {navLinks.map(({name, path, icon: Icon}) => (<NavLink
                    key={name}
                    to={path}
                    className={({isActive}) => `
                                flex flex-col items-center gap-1 px-3 py-2 rounded-md transition-colors duration-200 
                                ${isActive || location.pathname.startsWith(path) ? "bg-rose-100/50 text-gray-900 font-medium" : "hover:bg-rose-50"}`}
                >
                    <Icon className={`${pathname === path ? "text-rose-500" : ""}`}/>
                    <span className={"text-xs"}>{name}</span>
                </NavLink>))}
            </div>
            <ScrollBar orientation={"horizontal"} className={"border-t-rose-400"} />
        </ScrollArea>
    </>);
};
