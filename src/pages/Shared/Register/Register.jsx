import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../provider/AuthProviders';
import { baseUrl } from '../../../baseUrl/baseUrl';
import AOS from "aos";
import "aos/dist/aos.css";
const Register = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setError('');
    createUser(data.email, data.password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);

        updateUserProfile(data.name, data.photoURL)
          .then(() => {
            const saveUser = {
              name: data.name,
              email: data.email,
              dp: data.photoURL,
              gender: data.gender,
              dateOfBirth: data.dateOfBirth,
            };
            fetch(`${baseUrl}/users`, {
              method: 'POST',
              headers: {
                'content-type': 'application/json',
              },
              body: JSON.stringify(saveUser),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.insertedId) {
                  Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'User created successfully.',
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  navigate('/');
                }
              });
          })
          .catch((error) => console.log('--', error));
      })
      .catch((error) => setError(error.message));
  };
  useEffect(() => {
    AOS.init(); // Initialize AOS
}, []);
  return (
    <div className="row mx-auto" data-aos="fade-up"
    data-aos-anchor-placement="center-center">
      <h2 className="text-center mb-5">Registration Page</h2>
      <div className="col-md-6">
        <img src="https://i.gifer.com/X0XF.gif" alt="" className="w-100" />
      </div>
      <div className="col-md-6">
        <form className="needs-validation" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" className="form-control" id="name" {...register('name', { required: true })} />
            {errors.name && <span className="text-danger">Name is required</span>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" className="form-control" id="email" {...register('email', { required: true })} />
            {errors.email && <span className="text-danger">Email is required</span>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              className="form-control"
              id="password"
              {...register('password', { required: true, minLength: 6 })}
            />
            {errors.password?.type === 'required' && (
              <span className="text-danger">Password is required</span>
            )}
            {errors.password?.type === 'minLength' && (
              <span className="text-danger">Password must be at least 6 characters long</span>
            )}
          </div>
        
          
          <div className="form-group">
            <label htmlFor="gender">Gender:</label>
            <select className="form-control" id="gender" {...register('gender', { required: true })}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && <span className="text-danger">Gender is required</span>}
          </div>
          <div className="form-group">
            <label htmlFor="dateOfBirth">Date of Birth:</label>
            <input
              type="date"
              className="form-control"
              id="dateOfBirth"
              {...register('dateOfBirth', { required: true })}
            />
            {errors.dateOfBirth && <span className="text-danger">Date of Birth is required</span>}
          </div>
          <div className="form-group">
            <p className="text-danger">{error}</p>
            <Link to="/login">Already have an account</Link>
          </div>
          <button type="submit" className="btn btn-primary my-2">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
