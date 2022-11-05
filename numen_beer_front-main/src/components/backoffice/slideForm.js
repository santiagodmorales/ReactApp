import { useFormik, FormikProvider, Form, Field, ErrorMessage, } from 'formik';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as Yup from 'yup';
import { getReq, postReq, putReq } from '../../helpers/ReqToApi';
import './productForm.css'

const SlideForm = (props) => {

    const [ slideDetail, setSlideDetail] = useState(null);
    const {id} = useParams();
    const [ image, setImage ] = useState(null)
    const [pre_image, setPreImage] = useState(null)
    const navigate = useNavigate()

    const getData = async () => {
        const {data} = await getReq('/carrousel/' + id);
        setSlideDetail(data);
    };

    const previewImage = () => {
        let image_prev = ''
     if(pre_image){
        image_prev = <img className='image_prev' src={pre_image} /> 
    } else if (slideDetail) {
        image_prev =  <img className='image_prev' src={'https://s3.sa-east-1.amazonaws.com/g4-numen-bucket/' + slideDetail.image} /> 
    } else {
        image_prev = <img className='image_prev' src={'/images/producto-sin-imagen.png'}/> 
    }
    return image_prev;
    }

    useEffect(() => {
        getData();
    }, [])


    var data = {
        title: '',
        phrase: '',
        type: 'POST',
    }

    if (slideDetail){
        data = {
            id: slideDetail.id,
            title: slideDetail.title,
            phrase: slideDetail.phrase,
            type: 'PUT',
        }
    }

    const slideValidationSchema = Yup.object().shape({
        title: Yup.string().required('*Requerido'),
        phrase: Yup.string().required('*Requerido'),
      })

    const handleSubmit = async (values, {setSubmitting}) => {
        const data_im = new FormData();
        data_im.append('image', image);
        data_im.append('title', values.title);
        data_im.append('phrase', values.phrase);
        values.type === 'POST'
        ? postReq('/carrousel', data_im)
        : putReq('/carrousel/' + slideDetail.id, data_im)
        setSubmitting(false)
        navigate('/backoffice/setcarrousel')
    }
    
    const formik = useFormik({enableReinitialize:true, initialValues: data, validationSchema: slideValidationSchema, onSubmit: handleSubmit});
    
    return (
        <>
        <h1>{data.type === 'POST' ? 'Agregar nuevo slide' : 'Actualizar slide'}</h1>
        <section className="productFormContainer">
            
            <FormikProvider value={formik}>
                <Form className="prod-form">
                    <Field placeholder='Titulo de slide' name="title" className="prod-field"/> 
                    <ErrorMessage name='title'>{msg => <span className="error">{msg}</span>}</ErrorMessage>

                    <Field placeholder='Frase de slide' name="phrase" className="prod-field"/> 
                    <ErrorMessage name='phrase'>{msg => <span className="error">{msg}</span>}</ErrorMessage>

                    <Field type="file" name="image" className="prod-field" onChange={(e)=>{setImage(e.target.files[0]); setPreImage(URL.createObjectURL(e.target.files[0]))}} /> 
                    <ErrorMessage name='image'>{msg => <span className="error">{msg}</span>}</ErrorMessage>

                    <button type="submit" disabled={formik.isSubmitting} className="secondary">Enviar</button>
                </Form>
            </FormikProvider>
            <div className='image_prev_cont'>
                {previewImage()}
            </div>
        </section>
        </>
    )
}

export default SlideForm
