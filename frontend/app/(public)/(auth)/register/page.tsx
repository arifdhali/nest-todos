"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Eye,
    EyeOff,
    CheckSquare,
    LockKeyhole,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RegisterPage() {

    return (
        <div className="grid min-h-[650px]   gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="relative hidden h-[620px] overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-100 via-indigo-200 to-violet-300 lg:block">

                <div className="absolute -left-24 top-20 h-96 w-96 rounded-full bg-blue-400/50 blur-3xl" />

                <div className="absolute -right-20 top-32 h-96 w-96 rounded-full bg-violet-500/40 blur-3xl" />

                <div className="absolute -bottom-32 left-20 h-96 w-96 rounded-full bg-white/70 blur-3xl" />

                {/* Abstract Shapes */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative h-[440px] w-[340px] rotate-[-25deg] rounded-[100px] border border-white/70 bg-gradient-to-br from-white/80 via-blue-300/40 to-indigo-500/60 shadow-2xl backdrop-blur-sm">

                        <div className="absolute inset-8 rounded-[80px] border border-white/70 bg-gradient-to-tr from-indigo-500/50 via-blue-300/30 to-white/80 shadow-xl" />

                        <div className="absolute inset-16 rounded-[60px] bg-gradient-to-br from-white/70 via-violet-300/40 to-blue-500/50 shadow-inner" />

                        <div className="absolute -right-12 top-20 h-40 w-40 rounded-full bg-blue-400/50 blur-3xl" />

                    </div>
                </div>

                {/* Bottom Text */}
                <div className="absolute bottom-10 left-10 z-10 max-w-sm">
                    <h2 className="text-3xl font-bold text-slate-900">
                        Organize your work.
                        <br />
                        Achieve more.
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-slate-700">
                        Bring your tasks, projects and team together.
                        Stay focused and get things done with TaskFlow.
                    </p>
                </div>
            </div>
            <FormPanel />
        </div>
    );
}


function FormPanel() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div className="">

            {/* Heading */}
            <div className="mb-8">


                <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                    Create an account
                </h1>

                <p className="mt-2 text-sm text-slate-500">
                    Join TaskFlow and start managing your tasks.
                </p>
            </div>

            {/* Registration Form */}
            <form className="space-y-5">

                {/* First & Last Name */}
                <div className="grid grid-cols-2 gap-4">

                    <div className="space-y-2">
                        <Label htmlFor="firstName">
                            First Name <span className="text-red-500">*</span>
                        </Label>

                        <Input
                            id="firstName"
                            name="firstName"
                            placeholder="First name"
                            autoComplete="given-name"
                            required
                            className="h-11 bg-slate-50"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="lastName">
                            Last Name <span className="text-red-500">*</span>
                        </Label>

                        <Input
                            id="lastName"
                            name="lastName"
                            placeholder="Last name"
                            autoComplete="family-name"
                            required
                            className="h-11 bg-slate-50"
                        />
                    </div>

                </div>

                {/* Email */}
                <div className="space-y-2">
                    <Label htmlFor="email">
                        Email Address <span className="text-red-500">*</span>
                    </Label>

                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        autoComplete="email"
                        required
                        className="h-11 bg-slate-50"
                    />
                </div>

                {/* Password */}
                <div className="space-y-2">
                    <Label htmlFor="password">
                        Password <span className="text-red-500">*</span>
                    </Label>

                    <div className="relative">
                        <Input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a password"
                            autoComplete="new-password"
                            required
                            minLength={8}
                            className="h-11 bg-slate-50 pr-11"
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-900"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                        </button>
                    </div>

                    <p className="text-xs text-slate-400">
                        Use at least 8 characters.
                    </p>
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                    <Label htmlFor="confirmPassword">
                        Confirm Password <span className="text-red-500">*</span>
                    </Label>

                    <div className="relative">
                        <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Re-enter your password"
                            autoComplete="new-password"
                            required
                            minLength={8}
                            className="h-11 bg-slate-50 pr-11"
                        />

                        <button
                            type="button"
                            onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-900"
                            aria-label={
                                showConfirmPassword
                                    ? "Hide confirm password"
                                    : "Show confirm password"
                            }
                        >
                            {showConfirmPassword ? (
                                <EyeOff size={19} />
                            ) : (
                                <Eye size={19} />
                            )}
                        </button>
                    </div>
                </div>

                {/* Submit */}
                <Button
                    type="submit"
                    className="h-11 w-full bg-violet-600 font-semibold text-white hover:bg-violet-700"
                >
                    Create Account
                </Button>

            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-4">
                <div className="h-px flex-1 bg-slate-200" />
                <span className="text-xs text-slate-400">OR</span>
                <div className="h-px flex-1 bg-slate-200" />
            </div>

            {/* Social Signup */}
            <div className="space-y-3">

                <Button
                    type="button"
                    variant="outline"
                    className="h-11 w-full gap-3 font-normal"
                >
                    <span className="text-lg font-bold text-blue-600">G</span>
                    Sign up with Google
                </Button>

                <Button
                    type="button"
                    variant="outline"
                    className="h-11 w-full gap-3 font-normal"
                >
                    <span className="text-lg font-bold text-blue-700">f</span>
                    Sign up with Facebook
                </Button>

            </div>

            {/* Login Link */}
            <p className="mt-7 text-center text-sm text-slate-500">
                Already have an account?{" "}
                <Link
                    href="/login"
                    className="font-semibold text-violet-600 hover:underline"
                >
                    Sign in
                </Link>
            </p>

            {/* Terms */}
            <p className="mt-8 text-center text-xs leading-5 text-slate-400">
                By signing up, you agree to our{" "}
                <Link href="/terms" className="font-medium underline">
                    Terms and Conditions
                </Link>
                .
            </p>

        </div>
    )
}