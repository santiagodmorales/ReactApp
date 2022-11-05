import * as emailjs from "@emailjs/browser";
import apiKeys from './apikeys'


export const EmailSenderRegister = async (props) => {

    emailjs.send('service_0yplzep', 'template_xjfzdtb', props, apiKeys.USER_ID);
    
}

export const EmailSenderCheckout = async (props) => {

    emailjs.send('service_0yplzep', 'template_xjfzdtb', props, apiKeys.USER_ID);
    
}

