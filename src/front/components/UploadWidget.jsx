import { useEffect, useRef } from 'react';
import useGlobalReducer from '../hooks/useGlobalReducer'
const CloudinaryUploadWidget = ({ uwConfig, setPublicId }) => {
    const uploadWidgetRef = useRef(null);
    const uploadButtonRef = useRef(null);
    const { store, dispatch } = useGlobalReducer();

    useEffect(() => {
        const initializeUploadWidget = () => {
            if (window.cloudinary && uploadButtonRef.current) {
                // Create upload widget
                uploadWidgetRef.current = window.cloudinary.createUploadWidget(
                    uwConfig,
                    (error, result) => {
                        if (!error && result && result.event === 'success') {
                            console.log('Upload successful:', result.info);
                            setPublicId(result.info.public_id);

                            dispatch({ type: "set_imageInfo", payload: { public_id: result.info.public_id, image_url: result.info.url } })

                            // const uploadendPoint = `${import.meta.env.VITE_BACKEND_URL}api/profile-images`;
                            // fetch(uploadendPoint, {
                            //     method: 'POST',
                            //     headers: {

                            //         'Content-Type': 'application/json',
                            //         "Authorization": `Bearer ${store.token}`,
                            //     },
                            //     body: JSON.stringify({
                            //         public_id: result.info.public_id,
                            //         image_url: result.info.secure_url,
                            //     }),
                            // })
                            //     .then((response) => {
                            //         if (!response.ok) {
                            //             throw new Error('Network response was not ok');
                            //         }
                            //         return response.json();
                            //     })
                            //     .then((data) => {
                            //         console.log('Image uploaded successfully:', data);
                            //     })
                            //     .catch((error) => {
                            //         console.error('Error uploading image:', error);
                            //     });
                        }
                    }
                );

                // Add click event to open widget
                const handleUploadClick = () => {
                    if (uploadWidgetRef.current) {
                        uploadWidgetRef.current.open();
                    }
                };

                const buttonElement = uploadButtonRef.current;
                buttonElement.addEventListener('click', handleUploadClick);

                // Cleanup
                return () => {
                    buttonElement.removeEventListener('click', handleUploadClick);
                };
            }
        };

        initializeUploadWidget();
    }, [uwConfig, setPublicId]);

    return (
        <button
            ref={uploadButtonRef}
            id="upload_widget"
            className="cloudinary-button"
        >
            Upload
        </button>
    );
};

export default CloudinaryUploadWidget;
