import React ,{ useState} from 'react'
import { Link , useNavigate} from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import {Eye , EyeOff }from 'lucide-react'


const Login = () => {
     const navigate = useNavigate();
        const [error , setError] = useState('');
        const [loading , setLoading] = useState(false);

       const [userdt , setUserdt] = useState({
        email : '',
        password : ''
       });


     const handleInputChange = (e) => {
         const {name , value} = e.target;
         setUserdt({...userdt , [name]: value});
     };

     const handleSubmit = async (e) => {
         e.preventDefault();
            setLoading(true);
            try {
            const logindt = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, userdt);
                  localStorage.setItem("utoken", logindt.data.token);
                    toast.success("Login successful!");
                    navigate('/home');
              
            }
            catch(error)
            {
               console.log("error in handlesubmit in login page: ",error)
            }
     }
    return (
        <>
         <div className='flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-100 to-blue-200'>
           <div className='bg-white shadow-xl p-8 rounded-xl w-full max-w-md'>
           <h2 className='text-3xl font-extrabold text-center mb-6'>Login</h2>

             <form onSubmit={handleSubmit}>
                <label className='block mb-2 text-gray-700'>Email</label>
            <input
              type='email'
              name='email'
              required
              placeholder='Enter your email'
              className='w-full px-4 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400'
              onChange={handleInputChange}
            />

             <label className='block mb-2 text-gray-700'>password</label>
            <input
              type='password'
              name='password'
              required
              placeholder='Enter your password'
              className='w-full px-4 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400'
              onChange={handleInputChange}
            /> 

            <button
              type='submit'
              className={`w-full py-2 rounded text-white font-bold transition ${
                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'
              }`}
            >
              {loading ? 'Logging in...' : 'Submit'}
            </button>


             </form>

              <p className='mt-4 text-center text-sm'>
              Don’t have an account?
            <Link
              to='/register'
              className='ml-2 text-xl text-green-600 hover:underline font-semibold'
            >
              Register
            </Link>
          </p>


         </div>
       </div>
       </>
    )
}

export default Login;