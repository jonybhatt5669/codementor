import {DialogContent, DialogHeader, DialogTitle,} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import Logo from '@/assets/svg/logo.svg'


const signupSchema = z.object({
    name: z.string().min(2), email: z.string().email(), password: z.string().min(6), confirmPassword: z.string().min(6),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match", path: ["confirmPassword"],
});

type SignupFormValues = z.infer<typeof signupSchema>;

export const RegisterForm = () => {
    const {
        register, handleSubmit, formState: {errors},
    } = useForm<SignupFormValues>({
        resolver: zodResolver(signupSchema),
    });

    const onSubmit = (data: SignupFormValues) => {
        console.log("Signup data:", data);
        // TODO: integrate with backend
    };

    return (<DialogContent className="max-w-md w-full rounded-lg shadow-xl">
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
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" {...register("name")} />
                    {errors.name && (<p className="text-sm text-red-500 mt-1">{errors.name.message}</p>)}
                </div>

                {/* Email */}
                <div className={"space-y-2.5"}>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" {...register("email")} />
                    {errors.email && (<p className="text-sm text-red-500 mt-1">{errors.email.message}</p>)}
                </div>

                {/* Password */}
                <div className={"space-y-2.5"}>
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" {...register("password")} />
                    {errors.password && (<p className="text-sm text-red-500 mt-1">{errors.password.message}</p>)}
                </div>

                {/* Confirm Password */}
                <div className={"space-y-2.5"}>
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                        id="confirmPassword"
                        type="password"
                        {...register("confirmPassword")}
                    />
                    {errors.confirmPassword && (<p className="text-sm text-red-500 mt-1">
                        {errors.confirmPassword.message}
                    </p>)}
                </div>

                <Button type="submit" className="w-full  hover:bg-rose-700/70 text-white">
                    Sign Up
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
