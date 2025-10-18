import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/Inputs/Inputs' 
import { validateEmail } from '../../utils/helper'

const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false) // Added loading state
  const navigate = useNavigate()

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault()
    
    if(!validateEmail(email)) {
      setError('Please enter a valid email address.')
      return
    }
    if (!password || password.length < 8) {
      setError('Please enter the password')
      return
    }
    setError("")

    // Login API Call
    try {

    } catch (err) {
      if(err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message)
      } else {
        setError('An error occurred during login. Please try again.')
      }
    }
  }

  return (
    <div className='w-full max-w-md mx-auto flex flex-col justify-center items-center'>
      <h3 className='text-lg font-semibold text-black mb-4'>
        Welcome Back! Please Login to Your Account
      </h3>
      {/* IMPROVEMENT: Corrected typo 't-[5px]' to 'mt-1' or similar for margin/spacing */}
      <p className='text-xs text-slate-700 mt-1 mb-6 text-center'>
        Please enter your credentials to access your account and continue your interview preparation journey.
      </p>

      {/* IMPROVEMENT: Added w-full to the form for better structure */}
      <form onSubmit={handleLogin} className='w-full'>
        <Input
          label='Email Address'
          type='email'
          placeholder='john@example.com'
          value={email}
          onChange={({ target }) => setEmail(target.value)}
        />
        <Input
          type='password'
          placeholder='Min 8 Characters'
          label='Password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />

        {/* IMPROVEMENT: Display error message */}
        {error && (
          <p className='text-sm text-red-500 my-3 text-center'>{error}</p>
        )}
        
        {/* FIX 2: Added a submit button */}
        <button 
          type="submit" 
          className='btn-primary mt-6' 
          disabled={loading} // Disable button during loading
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      {/* IMPROVEMENT: Added a link to switch to the Signup page */}
      <div className='text-center mt-4 text-xs'>
        Don't have an account?{" "}
        <span
          className='text-amber-600 font-medium cursor-pointer hover:text-amber-700 transition'
          onClick={() => setCurrentPage('signup')} // Use the prop to switch view
        >
          Sign Up
        </span>
      </div>
    </div>
  )
}

export default Login