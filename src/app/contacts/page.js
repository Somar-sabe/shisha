'use client'; 
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import FooterTwo from "@/components/footer/FooterTwo";
import HeaderFive from "@/components/header/HeaderFive";
import { StoreInfo } from "@/data/Common";
import { useTranslation } from 'react-i18next';  

const ContactUs = () => {
    const [result, showResult] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // Added loading state
    const [showPopup, setShowPopup] = useState(false); // State for the popup
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { t } = useTranslation();  // Get the translation function

    const sendEmail = async (formData) => {
        setIsLoading(true); // Show loading state when submitting the form
        setShowPopup(true); // Show popup while form is submitting

        try {
            // Send the form data to your backend to save in MongoDB
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            const data = await response.json();
    
            if (data.success) {
                console.log('Form data saved to MongoDB');
            } else {
                console.log('Error saving form data to MongoDB:', data.message);
            }
    
            // Send the email using emailjs
            await emailjs.send('service_g3aufzu', 'template_sk4dqiz', formData, '9L_sRsO66U253zcxC');
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setIsLoading(false); // Hide loading state once submission is complete
        }
    
        reset();
        setTimeout(() => {
            showResult(true); // Show the "Thanks" message
            setShowPopup(false); // Hide the popup
        }, 2000); // Wait for 2 seconds before showing the success message
    };

    return ( 
        <>
        <HeaderFive headerSlider />
        <main className="main-wrapper">
            <div className="axil-contact-page-area axil-section-gap">
                <div className="container">
                    <div className="axil-contact-page">
                        <div className="row row--30">
                            <div className="col-lg-8">
                                <div className="contact-form">
                                    <div>
                                        <h3 className="title mb--10">{t('contact.form_title')}</h3>
                                        <p>{t('contact.form_description')}</p>
                                        <form onSubmit={handleSubmit(sendEmail)}>
                                            <div className="row row--10">
                                                <div className="col-lg-4">
                                                    <div className="form-group">
                                                        <label>{t('contact.form_name')} <span>*</span></label>
                                                        <input type="text" {...register('name', { required: true })} />
                                                        {errors.name && <p className="error">{t('contact.form_name')} {t('common.required')}</p>}
                                                    </div>
                                                </div>
                                                <div className="col-lg-4">
                                                    <div className="form-group">
                                                        <label>{t('contact.form_phone')} <span>*</span></label>
                                                        <input type="text" {...register('phone', { required: true })} />
                                                        {errors.phone && <p className="error">{t('contact.form_phone')} {t('common.required')}</p>}
                                                    </div>
                                                </div>
                                                <div className="col-lg-4">
                                                    <div className="form-group">
                                                        <label>{t('contact.form_email')} <span> *</span></label>
                                                        <input type="email" {...register('email', { required: true })} />
                                                        {errors.email && <p className="error">{t('contact.form_email')} {t('common.required')}</p>}
                                                    </div>
                                                </div>
                                                <div className="col-lg-4">
                                                    <div className="form-group">
                                                        <label>Company<span>*</span></label>
                                                        <input type="text" {...register('company', { required: true })} />
                                                        {errors.name && <p className="error">{t('contact.form_company')} {t('common.required')}</p>}
                                                    </div>
                                                </div>
                                                <div className="col-lg-4">
                                                    <div className="form-group">
                                                        <label>Position<span>*</span></label>
                                                        <input type="text" {...register('position', { required: true })} />
                                                        {errors.name && <p className="error">{t('contact.form_position')} {t('common.required')}</p>}
                                                    </div>
                                                </div>
                                                <div className="col-lg-4">
                                                    <div className="form-group">
                                                        <label>Country<span>*</span></label>
                                                        <input type="text" {...register('country', { required: true })} />
                                                        {errors.name && <p className="error">{t('contact.form_country')} {t('common.required')}</p>}
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="form-group">
                                                        <label>{t('contact.form_message')}</label>
                                                        <textarea {...register('message')} cols={1} rows={2}  />
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="form-group mb--0">
                                                        <button name="submit" type="submit" className="axil-btn btn-bg-primary">
                                                            {isLoading ? (
                                                                <div className="spinner"></div>  // Spinner here
                                                            ) : (
                                                                t('contact.form_send_button')
                                                            )}
                                                        </button>
                                                        {result && <p className="success">{t('contact.form_success_message')}</p>}
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div> 
                            <div className="col-lg-4">
                                <div className="contact-location mb--40">
                                    <h4 className="title mb--20">{t('contact.store.title')}</h4>
                                    <span className="address mb--20">{t('contact.store.address')}</span>
                                    <span className="phone">{t('contact.store.phone')}: {StoreInfo.phone}</span>
                                    <span className="email">{t('contact.store.email')}: {StoreInfo.email}</span>
                                </div>
                                <div className="contact-career mb--40">
                                    <h4 className="title mb--20">{t('contact.careers.title')}</h4>
                                    <p>{t('contact.careers.description')}</p>
                                </div>
                                <div className="opening-hour">
                                    <h4 className="title mb--20">{t('contact.opening_hours.title')}</h4>
                                    <p>{t('contact.opening_hours.mon_to_sat')}: {StoreInfo.opening.monToSat}
                                        <br /> {t('contact.opening_hours.sunday')}: {StoreInfo.opening.othersDay}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <FooterTwo />

        {/* Popup Style */}
        <div className={`popup ${showPopup ? 'show' : ''}`}>
            <div className="popup-content">
                {isLoading ? (
                    <div className="spinner"></div>  // Spinner inside the popup
                ) : (
                    <p>Thank you</p>  // Success message
                )}
            </div>
        </div>

        {/* Add your CSS in the same file */}
        <style jsx>{`
            .popup {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.5);
                display: none;
                justify-content: center;
                align-items: center;
            }
            .popup.show {
                display: flex;
            }
            .popup-content {
                background-color: white;
                padding: 20px;
                border-radius: 10px;
                text-align: center;
                width: 300px;
            }
            .spinner {
                width: 24px;
                height: 24px;
                border: 4px solid transparent;
                border-top: 4px solid #333;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto;  // Center the spinner
            }
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `}</style>
        </>
    );
}

export default ContactUs;
