'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import AuthLayout from "../layout";

const SignUp = () => {
    const [signupData, setSignupData] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null); // To handle error messages
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            // If the response is OK, show success message
            if (response.ok) {
                setSignupData(data); // Store the user data in state if successful
                setErrorMessage(null); // Clear any previous errors
            } else {
                // If there is an error, show an error message
                const errorResponse = await response.json();
                setErrorMessage(errorResponse.error || 'Failed to create account');
            }
        } catch (error) {
            // Handle any unexpected errors
            setErrorMessage('An unexpected error occurred. Please try again later.');
            console.error('Error during signup:', error);
        }
    }

    return (
        <AuthLayout bgImage="bg_image--9">
            <div className="axil-signin-form" bgImage="bg_image--9">
                <h3 className="title">I&apos;m New Here</h3>
                <p className="b2 mb--55">Enter your detail below</p>
                <form className="singin-form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label>User Name</label>
                        <input
                            type="text"
                            className="form-control"
                            {...register('userName', { required: true })}
                            placeholder="admin"
                        />
                        {errors.userName && <p className="error">User Name is required.</p>}
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control"
                            {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                            placeholder="annie@example.com"
                        />
                        {errors.email && <p className="error">Email is required.</p>}
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            {...register('password', { required: true, minLength: 4 })}
                        />
                        {errors.password && <p className="error">Password is required.</p>}
                    </div>
                    <div className="form-group">
                        <button type="submit" className="axil-btn btn-bg-primary submit-btn">Create Account</button>
                        {signupData && <p className="success">Account Created successfully</p>}
                        {errorMessage && <p className="error">{errorMessage}</p>} {/* Display error if any */}
                    </div>
                </form>
            </div>
        </AuthLayout>
    );
}

export default SignUp;
