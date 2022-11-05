import { useFormik, FormikProvider, Form, Field, ErrorMessage, } from 'formik';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as Yup from 'yup';
import { getReq, postReq, putReq } from '../../helpers/ReqToApi';
import './productForm.css'

const ProductsForm = (props) => {

    const [ productDetail, setProductDetail] = useState(null);
    const {id} = useParams();
    const [ image, setImage ] = useState(null)
    const [pre_image, setPreImage] = useState(null)
    const navigate = useNavigate()

    const getData = async () => {
        const {data} = await getReq('/products/' + id);
        setProductDetail(data);
    };

    const previewImage = () => {
        let image_prev = ''
     if(pre_image){
        image_prev = <img className='image_prev' src={pre_image} /> 
    } else if (productDetail) {
        image_prev =  <img className='image_prev' src={'https://s3.sa-east-1.amazonaws.com/g4-numen-bucket/' + productDetail.image} /> 
    } else {
        image_prev = <img className='image_prev' src={'/images/producto-sin-imagen.png'}/> 
    }
    return image_prev;
    }

    useEffect(() => {
        getData();
    }, [])


    var data = {
        name: '',
        packaging: '',
        category: '',
        stock: '',
        price: '',
        description: '',
        type: 'POST',
    }

    if (productDetail){
        data = {
            id: productDetail.id,
            name: productDetail.name,
            packaging: productDetail.packaging,
            category: productDetail.category,
            stock: productDetail.stock,
            price: productDetail.price,
            description: productDetail.description,
            type: 'PUT',
        }
    }

    const ProductValidationSchema = Yup.object().shape({
        name: Yup.string().required('*Requerido'),
        category: Yup.string().required('*Requerido'),
        packaging: Yup.string().required('*Requerido'),
        stock: Yup.number().required('*Requerido'),
        price: Yup.number().required('*Requerido'),
        description: Yup.string().required('*Requerido'),
      })

    const handleSubmit = async (values, {setSubmitting}) => {
        const data_im = new FormData();
        data_im.append('image', image);
        data_im.append('name', values.name);
        data_im.append('packaging', values.packaging);
        data_im.append('category', values.category);
        data_im.append('stock', values.stock);
        data_im.append('price', values.price);
        data_im.append('description', values.description);
        values.type === 'POST'
        ? postReq('/products', data_im)
        : putReq('/products/' + productDetail.id, data_im)
        setSubmitting(false)
        navigate('/backoffice')
    }
    
    const formik = useFormik({enableReinitialize:true, initialValues: data, validationSchema: ProductValidationSchema, onSubmit: handleSubmit});
    
    return (
        <>
        <h1>{data.type === 'POST' ? 'Agregar nuevo producto' : 'Actualizar producto'}</h1>
        <section className="productFormContainer">
            
            <FormikProvider value={formik}>
                <Form className="prod-form">
                    <Field placeholder='Nombre del producto' name="name" className="prod-field"/> 
                    <ErrorMessage name='name'>{msg => <span className="error">{msg}</span>}</ErrorMessage>

                    <Field placeholder='Presentación/Packaging' name="packaging" className="prod-field"/> 
                    <ErrorMessage name='packaging'>{msg => <span className="error">{msg}</span>}</ErrorMessage>

                    <Field placeholder='Categoria' name="category" className="prod-field"/> 
                    <ErrorMessage name='category'>{msg => <span className="error">{msg}</span>}</ErrorMessage>

                    <Field placeholder='Stock Disponible' name="stock" className="prod-field"/> 
                    <ErrorMessage name='stock'>{msg => <span className="error">{msg}</span>}</ErrorMessage>

                    <Field placeholder='Precio' name="price" className="prod-field"/> 
                    <ErrorMessage name='price'>{msg => <span className="error">{msg}</span>}</ErrorMessage>

                    <Field as='textarea' name="description" className="prod-field" placeholder='Descripción'/>
                    <ErrorMessage name='description'>{msg => <span className="error">{msg}</span>}</ErrorMessage>

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

export default ProductsForm
