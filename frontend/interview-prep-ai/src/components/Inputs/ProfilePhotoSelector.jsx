import React, { useState, useRef, useEffect } from 'react'
import { LuUser, LuUpload, LuTrash } from 'react-icons/lu'

const ProfilePhotoSelector = ({ image, setImage, preview, setPreview }) => {
    
    const inputRef = useRef(null) 
    
    // The component should manage its own preview URL state internally
    const [previewUrl, setPreviewUrl] = useState(
        // Ensure image is a File object before creating the URL
        image instanceof File ? URL.createObjectURL(image) : null
    )

    // IMPROVEMENT: Use useEffect to clean up object URLs to prevent memory leaks
    useEffect(() => {
        let url = null;

        if (image instanceof File) {
            url = URL.createObjectURL(image);
            setPreviewUrl(url);
            
            // If the parent component passed setPreview, update it too
            if (setPreview) setPreview(url);
        } else {
            setPreviewUrl(null);
        }
        
        return () => {
            // Cleanup function: revoke the object URL when the component unmounts or image changes
            if (url) {
                URL.revokeObjectURL(url);
            }
        };
    }, [image, setPreview]);


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Set the file object in the parent state, which triggers useEffect
            setImage(file); 
        }
    };

    const handleRemoveImage = () => {
        // Clear the file object in the parent state
        setImage(null);
    };

    const onChooseFile = () => {
        inputRef.current.click();
    }

    return (
        <div className='flex flex-col justify-center items-center mb-4'>
            <input 
                type="file"
                accept='image/*'
                ref={inputRef}
                onChange={handleImageChange}
                // Hiding the default input element
                className='hidden' 
            />

            {!image ? (
                // State: No image selected (User icon + Upload button)
                <div className='w-20 h-20 flex justify-center items-center bg-orange-50 rounded-full relative cursor-pointer'>
                    <LuUser className='text-4xl text-orange-500' />
                    <button
                        type='button'
                        onClick={onChooseFile}
                        // Used standard bg-gradient-to-r class
                        className='absolute bottom-0 right-0 p-1 bg-gradient-to-r from-[#FF9324] to-[#e99a4b] text-white flex justify-center items-center rounded-full shadow'>
                        <LuUpload className='text-base' />
                    </button>
                </div>
            ) : (
                // State: Image selected (Profile Photo + Remove button)
                <div className='relative w-20 h-20 rounded-full overflow-visible'> {/* Changed overflow-hidden to overflow-visible for the icon to slightly stick out */}
                    <img
                        className='w-full h-full object-cover rounded-full'
                        src={previewUrl} 
                        alt="Profile Photo" />
                    <button
                        // FIX: Added z-10 to bring the button forward
                        // IMPROVEMENT: Used top-0 right-0 with translate for positioning
                        className='w-6 h-6 bg-red-100 text-red-600 flex justify-center items-center rounded-full absolute bottom-0 right-0 shadow z-10 translate-x-1 -translate-y-1' 
                        type='button'
                        onClick={handleRemoveImage}>
                        <LuTrash className='text-sm' />
                    </button>
                </div>
            )}
        </div>
    )
}

export default ProfilePhotoSelector