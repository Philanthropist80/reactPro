import React from 'react'
import { Formik } from 'formik'
// import validate from './validate-spected'
// import getValidationSchema from './getValidationSchema-spected'

const initialValues = {
  name: '',
  email: '',
  phone: '',
  password: '',
  passwordConfirmation: '',
  consent: false,
  ca3be488eca6a56b4f8de5ff7fa241260fed6a85: '', //org
  e94d294620a4326580775c98cd25df13a0d0633b: '', //assistant
  d40004cf0ff966b68553a55bfa6a56db33f8ed78: '', //group
  '6a63d45d54afca4389fc067a099016966ac36cca': '' // location
}

export default function PersonFormContainer() {
  return (
    <Formik
      initialValues={initialValues}
      //   validate={validate(getValidationSchema)}
      onSubmit={onSubmit}
      render={PersonForm}
    />
  )
}

function PersonForm(props) {
  const { isSubmitting, errors, handleChange, handleSubmit, values } = props

  return (
    <div className="modalForm">
      <div className="row form">
        <div className="col-xs-12 col-sm-12 col-md-2">
          <span>Full Name:</span>
        </div>
        <div className="col-xs-12 col-sm-12 col-md-10">
          <input
            name="name"
            placeHolder="Enter FullName"
            value={values.name}
            type="text"
            onChange={handleChange}
          />
          <div className="form-field-error">{errors.name}</div>
        </div>

        <div className="col-xs-12 col-sm-6 col-md-2">
          <span>Phone:</span>
        </div>
        <div className="col-xs-12 col-sm-6 col-md-4">
          <input
            name="phone"
            placeholder="Enter Phone Number"
            value={values.phone}
            type="text"
            onChange={handleChange}
          />
          <div className="form-field-error">{errors.phone}</div>
        </div>

        <div className="col-xs-12 col-sm-6 col-md-2">
          <span>Email:</span>
        </div>
        <div className="col-xs-12 col-sm-6 col-md-4">
          <input
            name="phone"
            placeholder="Enter Email"
            value={values.email}
            type="text"
            onChange={handleChange}
          />
          <div className="form-field-error">{errors.email}</div>
        </div>

        <div className="col-xs-12 col-sm-6 col-md-2">
          <span>Organization:</span>
        </div>
        <div className="col-xs-12 col-sm-6 col-md-4">
          <input
            name="ca3be488eca6a56b4f8de5ff7fa241260fed6a85"
            placeholder="Enter Organization"
            value={values['ca3be488eca6a56b4f8de5ff7fa241260fed6a85']}
            type="text"
            onChange={handleChange}
          />
          <div className="form-field-error">
            {errors['ca3be488eca6a56b4f8de5ff7fa241260fed6a85']}
          </div>
        </div>

        <div className="col-xs-12 col-sm-6 col-md-2">
          <span>Assistant:</span>
        </div>
        <div className="col-xs-12 col-sm-6 col-md-4">
          <input
            name="e94d294620a4326580775c98cd25df13a0d0633b"
            placeholder="Enter Assistant"
            value={values['e94d294620a4326580775c98cd25df13a0d0633b']}
            type="text"
            onChange={handleChange}
          />
          <div className="form-field-error">
            {errors['e94d294620a4326580775c98cd25df13a0d0633b']}
          </div>
        </div>

        <div className="col-xs-12 col-sm-6 col-md-2">
          <span>Group:</span>
        </div>
        <div className="col-xs-12 col-sm-6 col-md-4">
          <input
            name="d40004cf0ff966b68553a55bfa6a56db33f8ed78"
            placeholder="Enter Group"
            value={values['d40004cf0ff966b68553a55bfa6a56db33f8ed78']}
            type="text"
            onChange={handleChange}
          />
          <div className="form-field-error">
            {errors['d40004cf0ff966b68553a55bfa6a56db33f8ed78']}
          </div>
        </div>

        <div className="col-xs-12 col-sm-6 col-md-2">
          <span>Location:</span>
        </div>
        <div className="col-xs-12 col-sm-6 col-md-4">
          <input
            name="6a63d45d54afca4389fc067a099016966ac36cca"
            placeholder="Enter Location"
            value={values['6a63d45d54afca4389fc067a099016966ac36cca']}
            type="text"
            onChange={handleChange}
          />
          <div className="form-field-error">
            {errors['6a63d45d54afca4389fc067a099016966ac36cca']}
          </div>
        </div>

        <div className="col-xs-12">
          <button onClick={handleSubmit}>
            {isSubmitting ? 'Please wait...' : 'Add Person'}
          </button>
        </div>
      </div>
    </div>
  )
}

function onSubmit(values, { setSubmitting, setErrors }) {
  setTimeout(() => {
    console.log('User has been sucessfully saved!', values)
    setSubmitting(false)
  }, 2000)
}
