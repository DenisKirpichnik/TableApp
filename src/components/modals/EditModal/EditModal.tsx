import React, { FC, useRef } from 'react'
import classNames from 'classnames'
import { ModalProps, Product } from '../../../interfaces/interfaces'
import useClickOutside from '../../../hooks/useClickOutside'
import { Formik, ErrorMessage } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { addNewProduct, editProduct, setCurrentProduct } from '../../../state/products/actions'
import { allProducts, oneCurrentProduct } from '../../../state/products/selectors'
import FormikForm from './FormikForm'
import { formSchema } from './utils'

const EditModal: FC<ModalProps> = ({ closeModal }) => {
  const ref = useRef<HTMLDivElement>(null)
  const dispatch = useDispatch()
  const products = useSelector(allProducts)
  const currentProduct = useSelector(oneCurrentProduct)

  const handleCloseModal = React.useCallback(() => {
    closeModal()
    dispatch(setCurrentProduct(null))
  }, [dispatch, closeModal])

  useClickOutside(ref, handleCloseModal)

  const setInitialValues = React.useCallback(() => {
    return currentProduct
      ? {
          ...currentProduct[0],
          email: currentProduct[0]?.email ? currentProduct[0].email : '',
          country: currentProduct[0]?.country ? currentProduct[0].country : '',
          city: currentProduct[0]?.city ? currentProduct[0].city : ''
        }
      : { name: '', email: '', count: 0, price: 0, country: '', city: '' }
  }, [currentProduct])

  return (
    <>
      <div className="modal-overlay" />
      <div className="modal-wrapper">
        <div className="modal" ref={ref}>
          <div className="contentModal__wrapper">
            <button onClick={closeModal} className="contentModal__close-modal">
              X
            </button>
            <Formik
              initialValues={setInitialValues()}
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
              {({ isSubmitting, errors, values, touched, setFieldValue, setErrors }) => {
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
                    currentProduct={currentProduct}
                    values={values}
                    isSubmitting={isSubmitting}
                    setFieldValue={setFieldValue}
                    errors={errors}
                    setErrors={setErrors}
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
