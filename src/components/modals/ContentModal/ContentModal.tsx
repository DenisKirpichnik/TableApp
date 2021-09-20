import React, { FC, useRef, useState } from 'react'
import { ModalProps, Product } from '../../../interfaces/interfaces'
import useClickOutside from '../../../utils/customHooks/useClickOutside'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { addNewProduct, editProduct } from '../../../state/actions'
import { allProducts, oneCurrentProduct } from '../../../state/productReducer'
// import countries from '../../../utils/deliveryData/countries.json'

const formSchema = Yup.object().shape({
  name: Yup.string().min(1, 'Too Short!').max(15, 'Too Long!').required('Required'),
  count: Yup.number().positive('should be positive').required('Required'),
  price: Yup.number().positive('should be positive').required('Required'),
  email: Yup.string().min(2, 'Too Short!').email('Invalid email').required('Required'),
  delivery: Yup.object({}),
})

export const ContentModal: FC<ModalProps> = ({ hide }) => {
  const [locationConfig, setLocationConfig] = useState({ mode: '' })
  // console.log(locationConfig)
  const ref = useRef<HTMLDivElement>(null)
  useClickOutside(ref, hide)
  const dispatch = useDispatch()

  const products = useSelector(allProducts)
  const currentProduct = useSelector(oneCurrentProduct)
  console.log('currentProduct', currentProduct)
  // console.log('products', products[products.length - 1].id)

  // console.log('countries', countries)

  const handleLocationChange = (e: any) => {
    setLocationConfig({ mode: e.target.value })
  }

  return (
    <>
      <div className="modal-overlay" />
      <div className="modal-wrapper">
        <div className="modal" ref={ref}>
          <div className="contentModal__wrapper">
            <button onClick={hide}>X</button>
            <Formik
              initialValues={
                currentProduct ? { ...currentProduct[0], email: '' } : { name: '', email: '', count: 0, price: 0 }
              }
              validationSchema={formSchema}
              // validate={formValidate}
              // validateOnChange={(values) => {
              //   console.log(values)
              // }}
              onSubmit={(values, { setSubmitting }) => {
                console.log(values)
                const newProduct = {
                  ...values,
                  id: products.sort((a: Product, b: Product) => a.id - b.id)[products.length - 1].id + 1,
                }
                const editedProduct = {
                  ...values,
                }
                dispatch(currentProduct ? editProduct(editedProduct) : addNewProduct(newProduct))
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2))
                  setSubmitting(false)
                }, 400)
              }}
            >
              {({ isSubmitting, errors, values, touched }) => (
                <Form className="contentModal__form">
                  {/* I. name Input */}
                  <div className="contentModal__input-container">
                    <span>Name:</span>
                    <div className="contentModal__inputError-container">
                      <Field
                        type="text"
                        name="name"
                        maxLength={15}
                        className={
                          touched.name && errors.name ? 'contentModal__form-inputRed' : 'contentModal__form-input'
                        }
                      />
                      {touched.name && errors.name && (
                        <ErrorMessage name="name" component="div" className="contentModal__errorMessage" />
                      )}
                    </div>
                  </div>
                  {/* II. email Input */}
                  <div className="contentModal__input-container">
                    <span>Supplier email:</span>
                    <div className="contentModal__inputError-container">
                      <Field
                        type="email"
                        name="email"
                        className={
                          errors.email && touched.email ? 'contentModal__form-inputRed' : 'contentModal__form-input'
                        }
                      />
                      {touched.email && errors.email && (
                        <ErrorMessage name="email" component="div" className="contentModal__errorMessage" />
                      )}
                    </div>
                  </div>
                  {/* III. count Input */}
                  <div className="contentModal__input-container">
                    <span>Count:</span>
                    <div className="contentModal__inputError-container">
                      <Field
                        type="number"
                        name="count"
                        className={
                          touched.count && errors.count ? 'contentModal__form-inputRed' : 'contentModal__form-input'
                        }
                      />
                      {touched.count && errors.count && (
                        <ErrorMessage name="count" component="div" className="contentModal__errorMessage" />
                      )}
                    </div>
                  </div>
                  {/* IV. price Input */}
                  <div className="contentModal__input-container">
                    <span>Price:</span>
                    <div className="contentModal__inputError-container">
                      <Field
                        type="number"
                        name="price"
                        className={
                          errors.price && touched.price ? 'contentModal__form-inputRed' : 'contentModal__form-input'
                        }
                      />
                      {errors.price && touched.price && (
                        <ErrorMessage name="price" component="div" className="contentModal__errorMessage" />
                      )}
                    </div>
                  </div>
                  {/* V. delivery Input */}
                  <span>Delivery:</span>
                  <div className="contentModal__location-container">
                    <Field as="select" name="mode" onChange={handleLocationChange}>
                      <option value=""></option>
                      <option value="country">Country</option>
                      <option value="city">City</option>
                    </Field>
                    <ErrorMessage name="price" component="div" />
                    {locationConfig.mode === 'country' && (
                      <div role="group" aria-labelledby="my-radio-group" className="contentModal__country-selector">
                        <label htmlFor="fieldValue1">
                          <Field type="radio" name="country" value="Russia" id="fieldValue1" />
                          Russia
                        </label>
                        <label htmlFor="fieldValue2">
                          <Field type="radio" name="country" value="Canada" id="fieldValue2" />
                          Canada
                        </label>
                        <label htmlFor="fieldValue3">
                          <Field type="radio" name="country" value="Japan" id="fieldValue3" />
                          Japan
                        </label>
                      </div>
                    )}
                    {locationConfig.mode === 'city' && values.country !== '' && (
                      <div role="group" aria-labelledby="checkbox-group">
                        <label htmlFor="cityValue1">
                          <Field type="checkbox" name="city" value="Gukovo" id="cityValue1" />
                          One
                        </label>
                        <label htmlFor="cityValue2">
                          <Field type="checkbox" name="city" value="Moscow" id="cityValue2" />
                          Two
                        </label>
                        <label htmlFor="cityValue3">
                          <Field type="checkbox" name="city" value="Taganrog" id="cityValue3" />
                          Three
                        </label>
                      </div>
                    )}
                  </div>
                  <button type="submit" disabled={isSubmitting}>
                    {currentProduct ? 'Edit' : 'Add'}{' '}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  )
}
