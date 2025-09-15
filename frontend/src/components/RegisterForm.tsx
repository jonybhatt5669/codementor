import {DialogContent, DialogHeader, DialogTitle,} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import Logo from '@/assets/svg/logo.svg'
import {useState} from "react";
import {toast} from "sonner";
import {Loader2} from "lucide-react";
import {useNavigate} from 'react-router'

const signupSchema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.email(),
    password: z.string().min(6,{message:"password must be 6 character long"}),
    confirmPassword: z.string().min(6,{message:"password must be 6 character long"}),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match", path: ["confirmPassword"],
});

type SignupFormValues = z.infer<typeof signupSchema>;

export const RegisterForm = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const {
        register, handleSubmit, formState: {errors},
    } = useForm<SignupFormValues>({
        resolver: zodResolver(signupSchema),
    });

    const onSubmit = async (data: SignupFormValues) => {
        setLoading(true)
        try {
            const res = await fetch("http://localhost:8080/api/auth/signup", {
                method: "POST", headers: {
                    "Content-Type": "application/json",
                }, body: JSON.stringify(data),
            })

            if (res.ok) {
                toast.success("Sign up successfully");
                navigate("/login")
            }
        } catch (e: unknown) {
            // @ts-expect-error: e should have message
            console.log("Registration failed:", e.message);
        } finally {
            setLoading(false);
        }
    };

    return (<DialogContent className="max-w-md w-full rounded-lg shadow-xl" aria-describedby={"SignUp form"}>
            <DialogHeader>
                <div className={"flex items-center justify-center"}>

                    <img src={Logo} alt="Logo" className="size-8/12"/>
                </div>
                <DialogTitle className="text-center text-2xl font-semibold">
                    Sign up
                </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
                {/* Name */}
                <div className={"space-y-2.5"}>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" {...register("firstName")} disabled={loading}/>
                    {errors.firstName && (<p className="text-sm text-red-500 mt-1">{errors.firstName?.message}</p>)}
                </div>


                <div className={"space-y-2.5"}>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" {...register("lastName")} disabled={loading}/>
                    {errors.lastName && (<p className="text-sm text-red-500 mt-1">{errors.lastName?.message}</p>)}
                </div>

                {/* Email */}
                <div className={"space-y-2.5"}>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" {...register("email")} disabled={loading}/>
                    {errors.email && (<p className="text-sm text-red-500 mt-1">{errors.email.message}</p>)}
                </div>

                {/* Password */}
                <div className={"space-y-2.5"}>
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" {...register("password")} disabled={loading}/>
                    {errors.password && (<p className="text-sm text-red-500 mt-1">{errors.password.message}</p>)}
                </div>

                {/* Confirm Password */}
                <div className={"space-y-2.5"}>
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                        id="confirmPassword"
                        type="password"
                        disabled={loading}
                        {...register("confirmPassword")}
                    />
                    {errors.confirmPassword && (<p className="text-sm text-red-500 mt-1">
                        {errors.confirmPassword.message}
                    </p>)}
                </div>

                <Button disabled={loading} type="submit" className="w-full  hover:bg-rose-700/70 text-white">
                    {loading ? <div className={"flex items-center gap-2"}>
                        <Loader2 color={"white"} size={24} className={"animate-spin duration-500 transition-all"}/>
                        Registering....
                    </div> : "Sign Up"}
                </Button>
            </form>

            <div className="mt-4 text-center text-sm text-gray-500">
                Already have an account?{" "}
                <a href="#" className="text-blue-600 hover:underline">
                    Log in
                </a>
            </div>


        </DialogContent>

    );
};
