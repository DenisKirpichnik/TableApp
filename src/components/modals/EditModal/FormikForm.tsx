import React, { FC, SyntheticEvent, useState } from 'react'
import { countriesCities, Input, inputs } from './utils'
import { Form, Field, ErrorMessage } from 'formik'
import { Product, FormikValues } from '../../../interfaces/interfaces'
import { formatNumber } from '../../../helpers/formatNumber'

interface FormikFormProps {
  shouldShowError: (inputName: string) => void
  isBorderRed: (inputName: string) => void
  currentProduct: Product
  isSubmitting: boolean
  values: FormikValues
  setFieldValue: (fieldName: string, data: any) => void
  errors: any
  setErrors: (data: any) => void
}
const FormikForm: FC<FormikFormProps> = ({
  isBorderRed,
  shouldShowError,
  currentProduct,
  isSubmitting,
  values,
  setFieldValue,
  errors,
  setErrors
}) => {
  const [locationConfig, setLocationConfig] = useState({ mode: '' })
  const [isPriceInputFocused, setIsPriceInputFocused] = useState(false)
  const [priceValue, setPriceValue] = useState<number | string>('')
  const [touchedPrice, setTouchedPrice] = useState(false)
  console.log('errors', errors)
  console.log('locationConfig', locationConfig)
  const determineTypeOfInput = (inputName: string, inputType: string) => {
    return inputName === 'price' ? (isPriceInputFocused ? 'number' : 'text') : inputType
  }

  const setPriceFocusFalseOnBlur = React.useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    const target = e.target
    const formattedValue = target.value === '' ? '' : formatNumber(e.target.value)
    setPriceValue(formattedValue)
    setIsPriceInputFocused(false)
    target.value = formattedValue
  }, [])

  const setPriceFocusTrueOnFocus = React.useCallback(() => {
    setIsPriceInputFocused(true)
    setTouchedPrice(true)
  }, [])

  const onPasteOnlyNumbers = React.useCallback((e: React.ClipboardEvent) => {
    console.log('paste crap', e.clipboardData.getData('text'))
    const pastedData = e.clipboardData.getData('text')
    const numbersOnly = pastedData.replace(/\D/g, '')
    return numbersOnly
  }, [])

  const decideValue = !isPriceInputFocused ? priceValue : values.price
  const formattedPrice = formatNumber(values.price)

  const priceProps = React.useMemo(() => {
    return {
      onBlur: setPriceFocusFalseOnBlur,
      onFocus: setPriceFocusTrueOnFocus,
      value: touchedPrice ? decideValue : formattedPrice
    }
  }, [
    decideValue,
    formattedPrice,
    setPriceFocusFalseOnBlur,
    setPriceFocusTrueOnFocus,
    touchedPrice
  ])

  const countProps = React.useMemo(() => {
    return { onPaste: onPasteOnlyNumbers }
  }, [onPasteOnlyNumbers])

  const addAdditionalProps = React.useCallback(
    (inputName: string) => {
      const names = ['price', 'count']
      if (names.includes(inputName)) {
        return inputName === 'price' ? priceProps : countProps
      }
      return
    },
    [countProps, priceProps]
  )

  const handleCityChange = React.useCallback(() => {
    if (values.country !== '') {
      values.city.length !== countriesCities[values.country].length
        ? setFieldValue('city', countriesCities[values.country])
        : setFieldValue('city', '')
    }
  }, [setFieldValue, values.city.length, values.country])

  const handleLocationChange = React.useCallback(
    (e: SyntheticEvent) => {
      const element = e.target as HTMLInputElement
      if (element.value === '') {
        setFieldValue('country', '')
        setFieldValue('city', '')
        setErrors({ ...errors, city: null })
        console.log('values', values)
      }
      setLocationConfig({ mode: element.value })
    },
    [setFieldValue, setErrors, values, errors]
  )

  const shouldShowCityError = (inputName: string) => {
    if (errors[inputName]) {
      return (
        <ErrorMessage name={inputName} component="div" className="contentModal__errorMessage" />
      )
    }
  }

  return (
    <Form className="contentModal__form">
      {inputs.map((input: Input) => {
        return (
          <div key={input.name} className="contentModal__input-container">
            <span>{input.spanName}</span>
            <div className="contentModal__inputError-container">
              <Field
                type={determineTypeOfInput(input.name, input.type)}
                name={input.name}
                className={isBorderRed(input.name)}
                {...addAdditionalProps(input.name)}
              />
              {shouldShowError(input.name)}
            </div>
          </div>
        )
      })}
      <p className="formikForm__combobox-header">Delivery:</p>
      <div className="contentModal__location-container">
        <Field
          as="select"
          name="mode"
          onChange={handleLocationChange}
          className="contentModal__delivery-config"
        >
          <option value=""></option>
          <option value="country">Country</option>
          <option value="city">City</option>
        </Field>

        {locationConfig.mode === 'country' && (
          <div
            role="group"
            aria-labelledby="my-radio-group"
            className="contentModal__country-selector"
          >
            {Object.keys(countriesCities).map((country, i) => (
              <label key={country} htmlFor={`fieldValue${i}`}>
                <Field type="radio" name="country" value={country} id={`fieldValue${i}`} />
                {country}
              </label>
            ))}
          </div>
        )}
        {locationConfig.mode === 'city' && values.country && (
          <div
            role="group"
            aria-labelledby="checkbox-group"
            className="contentModal__city-selector"
          >
            <label htmlFor={`selectAll`}>
              <Field
                type="checkbox"
                name="city"
                onChange={handleCityChange}
                checked={
                  countriesCities[values.country] &&
                  values.city &&
                  values.city.length === countriesCities[values.country].length
                }
                value={countriesCities[values.country]}
                id="selectAll"
              />
              Select All
            </label>
            {values.country &&
              countriesCities[values.country].map((city, i) => (
                <label key={city} htmlFor={`cityfield${i}`}>
                  <Field type="checkbox" name="city" value={city} id={`cityfield${i}`} />
                  {city}
                </label>
              ))}
          </div>
        )}
        {shouldShowCityError('city')}
      </div>
      <button type="submit" disabled={isSubmitting} className="formikForm__submit-button">
        {currentProduct ? 'Edit' : 'Add'}{' '}
      </button>
    </Form>
  )
}

export default React.memo(FormikForm)
