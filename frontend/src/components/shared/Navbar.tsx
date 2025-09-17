import {useEffect, useRef, useState} from "react";

import gsap from "gsap";
import Logo from '@/assets/svg/logo.svg'
import ResponsiveLogo from '@/assets/svg/responsive_logo.svg'


import {MegaMenu} from "@/components/shared/MegaMenu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ArrowRightFromLine, ListFilter} from "lucide-react";
import {Link, useNavigate} from "react-router";
import {Dialog, DialogTrigger} from "@/components/ui/dialog.tsx";
import {RegisterForm} from "@/components/RegisterForm.tsx";
import {useAuthStore} from "@/store/authStore.ts";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";

import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export const Navbar = () => {
    const navigation = useNavigate()
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const iconRef = useRef<SVGSVGElement>(null);
    const isLoggedIn = useAuthStore(state => state.isAuthenticated)
    const logout = useAuthStore(state => state.logout)
    const accessToken = useAuthStore(state => state.accessToken)
    const [status, setStatus] = useState<"idle"|"loading"|"success"|"error">("idle");

    console.log("AccessToken: ", accessToken)


    useEffect(() => {
        if (isOpen && menuRef.current) {
            gsap.fromTo(menuRef.current, {height: 0, opacity: 0, y: -10}, {
                height: "auto", opacity: 1, y: 0, duration: 0.4, ease: "power2.out",
            });
        } else if (!isOpen && menuRef.current) {
            gsap.to(menuRef.current, {
                height: 0, opacity: 0, y: -10, duration: 0.3, ease: "power2.in",
            });
        }
    }, [isOpen]);

    useEffect(() => {
        if (iconRef.current) {
            gsap.fromTo(iconRef.current, {rotate: 0}, {
                rotate: isOpen ? 90 : 0, duration: 0.3, ease: "power2.out",
            });
        }
    }, [isOpen]);


    const logOut = async () => {
        setStatus("loading")
        try {

            const res = await fetch("http://localhost:8080/api/auth/logout", {
                method: "POST", headers: {
                    "Content-Type": "application/json", Authorization: `Bearer ${accessToken}`,
                }
            })

            if (res.ok) {
                setStatus(
                    "success"
                )
                logout()
                navigation("/login")
            }
        }catch (e) {
            console.log("Error: ",e)

        }finally {
            setStatus("idle")
        }


    }

    if(status==="loading"){
        return (<div className="fixed inset-0 flex items-center justify-center bg-white z-50">
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
        </div>);
    }

    return (<nav className="bg-white shadow-lg shadow-blue-400/30 fixed w-full z-10">
        <div className="max-w-svw mx-auto px-4 sm:px-6 lg:px-12 py-4">
            <div className="flex justify-between items-center">
                <div className={"flex items-center gap-4"}>
                    {/* Mobile Menu Button */}
                    <div className="lg:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-700 hover:text-blue-600 focus:outline-none"
                        >
                            <ListFilter/>
                        </button>
                    </div>

                    {/* Logo */}
                    <div className="flex-shrink-0 ">
                        <div className="hidden lg:block">
                            <img src={Logo} alt="Logo" className="size-auto"/>
                        </div>
                        <div className="lg:hidden">
                            <img src={ResponsiveLogo} alt="Small Logo" className="size-auto"/>
                        </div>
                    </div>

                    {/* Desktop Menu */}

                    <div className={"hidden lg:block"}>
                        <MegaMenu/>
                    </div>
                </div>

                {isLoggedIn ? <>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn"/>
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className={"-ml-8"}>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Billing</DropdownMenuItem>
                            <DropdownMenuItem>Team</DropdownMenuItem>
                            <DropdownMenuItem>
                                <Button variant={"outline"} className={"flex items-center gap-4"}
                                        onClick={logOut}
                                >
                                    <ArrowRightFromLine size={24}/>
                                    Log out
                                </Button>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                </> : <>
                    <div className={"flex items-center gap-4"}>
                        <Link to={"/"} className={"hidden sm:block"}>
                            <h2 className={" font-semibold text-sm md:text-lg"}>
                                Become a mentor
                            </h2>
                        </Link>
                        <Button variant="outline" size="lg"
                                className={"text-sm md:text-lg hover:ring-2 ring-offset-2 ring-primary duration-200 "}
                                onClick={() => navigation("/login")}
                        >Login</Button>
                        <Dialog>
                            <DialogTrigger asChild>

                                <Button variant="default" size="lg"
                                        className={"text-sm md:text-lg hover:ring-2 ring-offset-2 ring-accent hover:bg-green-200 hover:text-black duration-200 "}>Sign
                                    Up</Button>
                            </DialogTrigger>
                            <RegisterForm/>
                        </Dialog>

                    </div>
                </>}
            </div>
        </div>

        {/* Mobile Menu */}
        <div
            ref={menuRef}
            className="md:hidden overflow-hidden px-4 pt-2  space-y-2"
            style={{height: isOpen ? "auto" : 0}}
        >
            {["homecomponents", "About", "Services", "Contact"].map((item, i) => (<a
                key={i}
                href="#"
                className="block text-gray-700 hover:text-blue-600"
            >
                {item}
            </a>))}
        </div>
    </nav>);
};