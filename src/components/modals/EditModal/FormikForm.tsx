import React, { FC, SyntheticEvent, useState } from 'react'
import { checkboxButtons, Input, inputs, radioButtons } from './utils'
import { Form, Field } from 'formik'
import { Product } from '../../../interfaces/interfaces'
import { formatNumber } from '../../../helpers/formatNumber'

interface FormikFormProps {
  shouldShowError: (inputName: string) => void
  isBorderRed: (inputName: string) => void
  handleLocationChange: (e: SyntheticEvent) => void
  locationConfig: { mode: string }
  currentProduct: Product
  isSubmitting: boolean
  values: any
}
const FormikForm: FC<FormikFormProps> = ({
  isBorderRed,
  shouldShowError,
  handleLocationChange,
  locationConfig,
  currentProduct,
  isSubmitting,
  values
}) => {
  const [isPriceInputFocused, setIsPriceInputFocused] = useState(false)
  const [priceValue, setPriceValue] = useState<number | string>('')
  const [touchedPrice, setTouchedPrice] = useState(false)

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

  const priceProps = {
    onBlur: setPriceFocusFalseOnBlur,
    onFocus: setPriceFocusTrueOnFocus,
    value: touchedPrice ? decideValue : formattedPrice
  }

  const countProps = {
    onPaste: onPasteOnlyNumbers
  }

  const addAdditionalProps = (inputName: string) => {
    const names = ['price', 'count']
    if (names.includes(inputName)) {
      return inputName === 'price' ? priceProps : countProps
    }
    return
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
      <span>Delivery:</span>
      <div className="contentModal__location-container">
        <Field as="select" name="mode" onChange={handleLocationChange}>
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
            {radioButtons.map((radioButton: string, i) => (
              <label key={radioButton} htmlFor={`fieldValue${i}`}>
                <Field type="radio" name="country" value={radioButton} id={`fieldValue${i}`} />
                {radioButton}
              </label>
            ))}
          </div>
        )}
        {locationConfig.mode === 'city' && values.country !== '' && (
          <div role="group" aria-labelledby="checkbox-group">
            {checkboxButtons.map((city: string, i) => (
              <label key={city} htmlFor={`cityfield${i}`}>
                <Field type="radio" name="country" value={city} id={`cityfield${i}`} />
                {city}
              </label>
            ))}
          </div>
        )}
      </div>
      <button type="submit" disabled={isSubmitting}>
        {currentProduct ? 'Edit' : 'Add'}{' '}
      </button>
    </Form>
  )
}

export default React.memo(FormikForm)
