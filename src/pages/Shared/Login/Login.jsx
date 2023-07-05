/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../provider/AuthProviders';
import AOS from "aos";
import "aos/dist/aos.css";

const Login = () => {
    const { login } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const [error, setError] = useState('')
    const from = location.state?.from?.pathname || "/";

    const onSubmit = (data) => {
        setError('');
        const { email, password } = data;
        login(email, password)
            .then(result => {
                const user = result.user;
                Swal.fire(
                    'Wow!',
                    'you have successfully logged in!',
                    'success'
                );
                navigate(from, { replace: true });
            })
            .catch(error => setError(error.message));
    };
    useEffect(() => {
        AOS.init(); // Initialize AOS
    }, []);
    return (
        <div data-aos="fade-up"
        data-aos-anchor-placement="center-center" className='row mx-auto'>
            <h2 className='text-center mb-5 '>Login Page</h2>
            <div className='col-md-6'>
                <img src="https://i.gifer.com/X0XF.gif" alt="" className='w-100' />
            </div>
            <div className="col-md-6">
                <form className="needs-validation" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            {...register('email', { required: true })}
                        />
                        {errors.email && <span className="text-danger">Email is required</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <div className="input-group">
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                {...register('password', { required: true, minLength: 6 })}
                            />
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={() => {
                                    const passwordInput = document.getElementById('password');
                                    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
                                }}
                            >
                                Show/Hide
                            </button>
                        </div>
                        {errors.password?.type === 'required' && (
                            <span className="text-danger">Password is required</span>
                        )}
                        {errors.password?.type === 'minLength' && (
                            <span className="text-danger">Password must be at least 6 characters long</span>
                        )}
                    </div>
                    <div className="form-group">
                        <p className='text-danger'>{error}</p>
                        <Link to="/register">Create an account</Link>
                    </div>
                    <div className="form-group my-2">
                        <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                </form>
            
            </div>
        </div>
    );
};

export default Login;
