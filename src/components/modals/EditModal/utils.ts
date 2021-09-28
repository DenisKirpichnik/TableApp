import * as Yup from 'yup'

export interface Input {
  spanName: string
  type: string
  name: string
}

export const inputs: Input[] = [
  {
    spanName: 'Name:',
    type: 'text',
    name: 'name'
  },
  {
    spanName: 'Email:',
    type: 'email',
    name: 'email'
  },
  {
    spanName: 'Count:',
    type: 'number',
    name: 'count'
  },
  {
    spanName: 'Price:',
    type: 'number',
    name: 'price'
  }
]

export const radioButtons: string[] = ['Russia', 'Canada', 'Japan']
export const checkboxButtons: string[] = ['Moscow', 'Rostov', 'Gukovo']

export const formSchema = Yup.object().shape({
  name: Yup.string().trim().max(15, 'Too Long!').required('cannot be Empty'),
  email: Yup.string().min(2, 'Too Short!').email('Invalid email').required('Required'),
  count: Yup.number().positive('should be positive').required('Required'),
  price: Yup.number().required('Required'),
  delivery: Yup.object({})
})
