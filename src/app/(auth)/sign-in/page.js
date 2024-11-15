'use client';
import Link from "next/link";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useDispatch } from "react-redux";
import AuthLayout from "../layout";
import { logIn } from "@/store/slices/authSlice";

const SignIn = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [loginError, setLoginError] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const result = await response.json();

                // Save the token in localStorage (or cookies if preferred)
                localStorage.setItem('token', result.token);

                // Dispatch login action with the email (and optionally the token)
                dispatch(logIn({ email: data.email, token: result.token }));

                // Redirect the user to the dashboard
                router.push('/dashboard');
            } else {
                setLoginError(true);
            }
        } catch (error) {
            console.error("An error occurred:", error);
            setLoginError(true);
        }
    };

    return ( 
        <AuthLayout bgImage="bg_image--9">
            <div className="axil-signin-form">
                <h3 className="title">Sign in to Holster.</h3>
                <p className="b2 mb--55">Enter your detail below</p>
                <form className="singin-form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control" {...register('email', { required: true })} placeholder="admin@email.com" />
                        {errors.email && <p className="error">Email is required.</p>}
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" {...register('password', { required: true, minLength: 4})}  />
                        {errors.password && <p className="error">Password is required.</p>}
                    </div>
                    <div className="form-group d-flex align-items-center justify-content-between">
                        <button type="submit" className="axil-btn btn-bg-primary submit-btn">Sign In</button>
                        <Link href="/forgot-password" className="forgot-btn">Forget password?</Link>
                    </div>
                    {loginError && <p className="error">Invalid email or password.</p>}
                </form>
            </div>
        </AuthLayout>
     );
}

export default SignIn;
