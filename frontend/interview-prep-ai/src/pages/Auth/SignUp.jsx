import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { validateEmail, validateName } from '../../utils/helper'
import Input from '../../components/Inputs/Inputs'
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector'
// Assume an API utility for profile picture upload exists
// import { uploadProfilePicture } from '../../utils/api' 

const SignUp = ({ setCurrentPage }) => {
  const [profilePic, setProfilePic] = useState(null)
  const [fullname, setFullname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false) // Added loading state
  const navigate = useNavigate()

  const handleSignUp = async (e) => {
    e.preventDefault()
    setError(null) // Clear previous errors
    setLoading(true)

    // --- Validation Checks ---
    if (!validateName(fullname)) {
      setError('Please enter your full name.')
      setLoading(false)
      return
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.')
      setLoading(false)
      return
    }
    // FIX 2: Better password error message
    if (!password || password.length < 8) {
      setError('Password must be at least 8 characters long.')
      setLoading(false)
      return
    }
    // -------------------------

    let profileImageUrl = ''

    try {
      // 1. Handle Profile Picture Upload (if necessary)
      if (profilePic) {
        // NOTE: You would typically upload the file to a service (e.g., AWS S3) here.
        // profileImageUrl = await uploadProfilePicture(profilePic);
        // For now, we'll keep it simulated
        console.log('Profile picture ready for upload:', profilePic.name)
      }

      // 2. Perform Sign Up API Call
      // const response = await signUpApi({ fullname, email, password, profileImageUrl });
      
      // Simulate API call success
      await new Promise(resolve => setTimeout(resolve, 1500)); 

      // On successful signup
      navigate('/dashboard') 
      
    } catch (err) {
      // Handle API errors
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message)
      } else {
        setError('An error occurred during sign up. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  // FIX 1: The component must return the JSX directly from its body
  return (
    <div className='w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center items-center'>
      <h3 className='text-lg font-semibold text-black mb-4'>
        Create Your Account
      </h3>
      <p className='text-xs text-slate-700 mt-1 mb-6 text-left'>
        Join Us today by entering your details below
      </p>

      <form onSubmit={handleSignUp} className='w-full'>
        <ProfilePhotoSelector
          image={profilePic}
          setImage={setProfilePic}
        />

        <Input
          label='Full Name'
          type='text'
          placeholder='John Doe'
          value={fullname}
          onChange={({ target }) => setFullname(target.value)}
        />
        <Input
          label='Email Address'
          type='email'
          placeholder='john.doe@example.com'
          value={email}
          onChange={({ target }) => setEmail(target.value)}
        />
        <Input
          label='Password'
          type='password'
          placeholder='Min 8 Characters'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />

        {error && <p className='text-red-500 text-xs mt-2 text-center'>{error}</p>}
        
        <button 
          type='submit' 
          className='btn-primary mt-4' 
          disabled={loading} // Disabled while loading
        >
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>

        <p className='text-xs text-slate-700 mt-4 text-center'>
          Already have an account?{' '}
          <button 
            className='text-amber-600 font-medium underline cursor-pointer hover:text-amber-700 transition-smooth'
            type='button' 
            onClick={() => setCurrentPage('login')}
          >
            Login
          </button>
        </p>
      </form>
    </div>
  )
}

export default SignUp