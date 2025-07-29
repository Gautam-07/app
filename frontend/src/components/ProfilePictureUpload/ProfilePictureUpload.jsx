import React, { useContext, useState, useRef } from 'react';
import './ProfilePictureUpload.css';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/frontend_assets/assets';

const ProfilePictureUpload = ({ onClose }) => {
    const { userProfile, uploadProfilePicture, updateUserProfilePicture } = useContext(StoreContext);
    const [isUploading, setIsUploading] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Validate file size (5MB limit)
            if (file.size > 5 * 1024 * 1024) {
                alert('File size must be less than 5MB');
                return;
            }
            
            // Validate file type
            if (!file.type.startsWith('image/')) {
                alert('Please select an image file');
                return;
            }
            
            // Create preview
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviewImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpload = async () => {
        if (!fileInputRef.current.files[0]) {
            alert('Please select a file first');
            return;
        }

        setIsUploading(true);
        try {
            const file = fileInputRef.current.files[0];
            const imageUrl = await uploadProfilePicture(file);
            
            if (imageUrl) {
                const success = await updateUserProfilePicture(imageUrl);
                if (success) {
                    alert('Profile picture updated successfully!');
                    onClose();
                } else {
                    alert('Failed to update profile picture');
                }
            } else {
                alert('Failed to upload image');
            }
        } catch (error) {
            console.error('Error uploading profile picture:', error);
            alert('Error uploading profile picture');
        } finally {
            setIsUploading(false);
        }
    };

    const handleRemovePicture = async () => {
        if (!userProfile?.profilePicture) {
            alert('No profile picture to remove');
            return;
        }

        setIsUploading(true);
        try {
            const success = await updateUserProfilePicture(null);
            if (success) {
                setPreviewImage(null);
                alert('Profile picture removed successfully!');
                onClose();
            } else {
                alert('Failed to remove profile picture');
            }
        } catch (error) {
            console.error('Error removing profile picture:', error);
            alert('Error removing profile picture');
        } finally {
            setIsUploading(false);
        }
    };

    const handleCancel = () => {
        setPreviewImage(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        onClose();
    };

    return (
        <div className="profile-picture-upload-overlay" onClick={handleCancel}>
            <div className="profile-picture-upload-modal" onClick={(e) => e.stopPropagation()}>
                <div className="profile-picture-upload-header">
                    <h3>Current Profile Picture</h3>
                    <button className="close-button" onClick={handleCancel}>×</button>
                </div>
                
                <div className="profile-picture-upload-content">
                    <div className="current-profile-picture">
                        <div className="profile-image-container">
                            <img 
                                src={userProfile?.profilePicture ? `http://localhost:4000${userProfile.profilePicture}` : assets.profile_icon} 
                                alt="Current Profile" 
                            />
                            <div className="profile-image-overlay">
                                <span>Current</span>
                            </div>
                        </div>
                        <p>Your current profile picture</p>
                    </div>

                    <div className="upload-section">
                        <button 
                            type="button" 
                            className="select-file-button" 
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isUploading}
                        >
                            <img src={assets.add_icon_white} alt="Select" />
                            Select New Image
                        </button>
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            onChange={handleFileSelect} 
                            accept="image/*" 
                            style={{ display: 'none' }} 
                        />
                        <p className="file-info">Supported formats: JPG, PNG, GIF (Max 5MB)</p>
                        
                        {previewImage && (
                            <div className="preview-section">
                                <div className="preview-image-container">
                                    <img src={previewImage} alt="Preview" />
                                    <div className="preview-overlay">
                                        <span>Preview</span>
                                    </div>
                                </div>
                                <p>Preview of selected image</p>
                            </div>
                        )}
                    </div>

                    <div className="action-buttons">
                        {previewImage && (
                            <button 
                                type="button" 
                                className="upload-button" 
                                onClick={handleUpload}
                                disabled={isUploading}
                            >
                                {isUploading ? '🔄 Uploading...' : '📤 Upload'}
                            </button>
                        )}
                        
                        {userProfile?.profilePicture && (
                            <button 
                                type="button" 
                                className="remove-button" 
                                onClick={handleRemovePicture}
                                disabled={isUploading}
                            >
                                {isUploading ? '🔄 Removing...' : '🗑️ Remove Picture'}
                            </button>
                        )}
                        
                        <button 
                            type="button" 
                            className="cancel-button" 
                            onClick={handleCancel}
                            disabled={isUploading}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePictureUpload; 