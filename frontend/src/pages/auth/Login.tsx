import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Card, CardContent, CardHeader, CardTitle,} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import {useState} from "react";
import {useAuthStore} from "@/store/authStore.ts";
import {useNavigate} from "react-router";

const loginSchema = z.object({
    email: z.email("Invalid email address"), password: z.string().min(4, "Password must be at least 4 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function Login() {
    const [loading, setLoading] = useState(false);
    const login = useAuthStore((state) => state.login)
    const navigate = useNavigate()
    const {
        register, handleSubmit, formState: {errors, isSubmitting},
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormValues) => {
        console.log("Login data:", data);
        // TODO: integrate with your auth API
        setLoading(true);
        try {
            const res = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST", headers: {
                    "Content-Type": "application/json",
                }, body: JSON.stringify(data),
            })
            if (!res.ok) throw new Error("Login failed");

            const tokens = await res.json();

            login(tokens.access_token, tokens.refresh_token);

            navigate('/user-onboard')
        } catch (e) {
            // @ts-expect-error: e should have message
            console.log("Registration failed:", e.message);
        }
    };

    return (<div className="min-h-screen flex flex-col md:flex-row">
        {/* Left Branding Panel */}
        <div className="bg-blue-600 text-white flex flex-col justify-center items-center p-8 md:w-1/2">
            <div className="max-w-md">
                <h1 className="text-3xl font-bold mb-4">Codementor</h1>
                <p className="text-sm leading-relaxed">
                    Codementor is a mentorship platform related to the Arc brand that
                    helps you get better at coding. You can use the same account to log
                    into both Codementor and Arc.
                </p>
            </div>
        </div>

        {/* Right Form Panel */}
        <div className="flex flex-1 justify-center items-center p-6">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold">
                        Log in to continue to Codementor
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Email */}
                        <div className={"flex flex-col gap-2.5"}>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                {...register("email")}
                                disabled={loading}
                            />
                            {errors.email && (<p className="text-sm text-red-500 mt-1">
                                {errors.email.message}
                            </p>)}
                        </div>

                        {/* Password */}
                        <div className={"flex flex-col gap-2.5"}>
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                {...register("password")}
                                disabled={loading}
                            />
                            {errors.password && (<p className="text-sm text-red-500 mt-1">
                                {errors.password.message}
                            </p>)}
                        </div>

                        <Button
                            type="submit"
                            className="w-full  hover:bg-rose-500/80"
                            disabled={isSubmitting || loading}
                        >
                            {isSubmitting ? "Logging in..." : "Log In"}
                        </Button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center my-6">
                        <Separator className="flex-1"/>
                        <span className="px-2 text-xs text-gray-500">OR</span>
                        <Separator className="flex-1"/>
                    </div>

                    {/* Social Logins */}
                    <div className="flex justify-center gap-4">
                        <Button variant="outline" size="icon" aria-label="Login with GitHub">
                            🐙
                        </Button>
                        <Button variant="outline" size="icon" aria-label="Login with LinkedIn">
                            in
                        </Button>
                        <Button variant="outline" size="icon" aria-label="Login with Facebook">
                            f
                        </Button>
                        <Button variant="outline" size="icon" aria-label="Login with Google">
                            G
                        </Button>
                    </div>

                    {/* Links */}
                    <div className="mt-6 text-center space-y-2">
                        <a href="#" className="text-sm text-blue-600 hover:underline">
                            Forgot your password?
                        </a>
                        <div>
                <span className="text-sm text-gray-500">
                  Don&apos;t have an account?{" "}
                </span>
                            <a href="#" className="text-sm text-blue-600 hover:underline">
                                Sign up
                            </a>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>);
}