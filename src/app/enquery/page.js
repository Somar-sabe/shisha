'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import FooterTwo from "@/components/footer/FooterTwo";
import HeaderFive from "@/components/header/HeaderFive";
import ServiceTwo from "@/components/services/ServiceTwo";
import { StoreInfo } from "@/data/Common";
import { useTranslation } from 'react-i18next';  
const ContactUs = () => {
    const [ result, showresult ] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { t } = useTranslation();  // Get the translation function

    const sendEmail = (formData) => {
        emailjs.send('service_g3aufzu', 'template_sk4dqiz', formData, '9L_sRsO66U253zcxC')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
        reset();
        showresult(true);
    };

    setTimeout(() => {
        showresult(false);
    }, 2000);

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
                                                        <label>{t('contact.form_email')} <span>*</span></label>
                                                        <input type="email" {...register('email', { required: true })} />
                                                        {errors.email && <p className="error">{t('contact.form_email')} {t('common.required')}</p>}
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
                                                        <button name="submit" type="submit" className="axil-btn btn-bg-primary">{t('contact.form_send_button')}</button>
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
        </>
    );
}

export default ContactUs;
