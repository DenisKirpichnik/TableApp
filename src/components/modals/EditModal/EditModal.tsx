import React, { FC, SyntheticEvent, useRef, useState } from 'react'
import classNames from 'classnames'
// import { ModalProps, Product } from '../../../interfaces/interfaces'
import useClickOutside from '../../../hooks/useClickOutside'
import { Formik, ErrorMessage } from 'formik'

import { useDispatch, useSelector } from 'react-redux'
import { addNewProduct, editProduct, setCurrentProduct } from '../../../state/products/actions'
import { allProducts, oneCurrentProduct } from '../../../state/products/selectors'
import { formSchema } from './utils'
import { Product } from '../../../interfaces/interfaces'
import FormikForm from './FormikForm'

const EditModal: FC<any> = ({ closeModal }) => {
  const [locationConfig, setLocationConfig] = useState({ mode: '' })

  const ref = useRef<HTMLDivElement>(null)

  const dispatch = useDispatch()

  const products = useSelector(allProducts)
  const currentProduct = useSelector(oneCurrentProduct)

  const handleCloseModal = React.useCallback(() => {
    closeModal()
    dispatch(setCurrentProduct(null))
  }, [dispatch, closeModal])

  const handleLocationChange = (e: SyntheticEvent) => {
    const element = e.target as HTMLInputElement
    setLocationConfig({ mode: element.value })
  }
  useClickOutside(ref, handleCloseModal)
  return (
    <>
      <div className="modal-overlay" />
      <div className="modal-wrapper">
        <div className="modal" ref={ref}>
          <div className="contentModal__wrapper">
            <button onClick={closeModal}>X</button>
            <Formik
              initialValues={
                currentProduct
                  ? { ...currentProduct[0], email: '' }
                  : { name: '', email: '', count: 0, price: 0 }
              }
              validationSchema={formSchema}
              onSubmit={(values, { setSubmitting }) => {
                console.log('submitting', values)
                const newProduct = {
                  ...values,
                  id:
                    products.sort((a: Product, b: Product) => a.id - b.id)[products.length - 1].id +
                    1
                }
                const editedProduct = {
                  ...values
                }
                dispatch(currentProduct ? editProduct(editedProduct) : addNewProduct(newProduct))
                setSubmitting(false)
                closeModal()
              }}
            >
              {({ isSubmitting, errors, values, touched }) => {
                const isBorderRed = (inputName: string) => {
                  return classNames({
                    'contentModal__form-inputRed': touched[inputName] && errors[inputName],
                    'contentModal__form-input': !errors[inputName]
                  })
                }
                const shouldShowError = (inputName: string) => {
                  if (touched[inputName] && errors[inputName]) {
                    return (
                      <ErrorMessage
                        name={inputName}
                        component="div"
                        className="contentModal__errorMessage"
                      />
                    )
                  }
                }

                return (
                  <FormikForm
                    shouldShowError={shouldShowError}
                    isBorderRed={isBorderRed}
                    handleLocationChange={handleLocationChange}
                    locationConfig={locationConfig}
                    currentProduct={currentProduct}
                    values={values}
                    isSubmitting={isSubmitting}
                  />
                )
              }}
            </Formik>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditModal
