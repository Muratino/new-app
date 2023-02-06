import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

const codeValidation = (code) => {
  var regexp = /^[0-9]{2}-[0-9]{3}$/i
  const valid = regexp.test(code)
  return valid
    ? {
        isValid: true,
      }
    : {
        isValid: false,
        errorMessage: 'This is no postal code',
      }
}

const SignupSchema = Yup.object().shape({
  password: Yup.string()
    .min(5, 'Too Short!')
    .max(10, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  first_name: Yup.string().required('Required'),
  last_name: Yup.string().required('Required'),
  nickname: Yup.string().required('Required'),
  phone: Yup.number().required('Required').min(9, 'Too Short!'),
  description: Yup.string().min(10, 'Too Short!'),
  nip: Yup.string().min(10, 'Too Short!').required('Required'),
  firm: Yup.string().required('Required'),
  address: Yup.string().required('Required'),
  city: Yup.string().required('Required'),
  code: Yup.string()
    .required('Required')
    .test('validator-custom-name', function (value) {
      const validation = codeValidation(value)
      if (!validation.isValid) {
        return this.createError({
          path: this.path,
          message: validation.errorMessage,
        })
      } else {
        return true
      }
    }),
  regul: Yup.boolean().required('Required').oneOf([true], 'Required accept'),
  rodo: Yup.boolean().required('Required').oneOf([true], 'Required accept'),
  sms: Yup.boolean(),
  mail: Yup.boolean(),
  push: Yup.boolean(),
})

const RegisterFirmForm = () => {
  const [fileSrc, setFileSrc] = useState('')

  const openFile = (event) => {
    let input = event.target

    const reader = new FileReader()
    reader.onload = function () {
      setFileSrc(reader.result)
    }
    reader.readAsDataURL(input.files[0])
  }

  const getDataFromGUS = async (nip) => {
    // const response = await axios.get(
    //   // 5261040567 9522227606
    //   `https://cross-rental.newsystems.pl/admin/site/gus?nip=${nip}`
    // )
    fetch(`https://cross-rental.newsystems.pl/admin/site/gus?nip=${nip}`)
      .then((res) => console.log(res))
      .catch((e) => console.log(e))
    // if (response.status === '212') {
    //   throw new Error(`Could not fetch, status: ${response.data.status}`)
    // } else {
    //   return response.data[0][0]
    // }
  }

  // const getGus = () => {
  //   let nip = $('#customer-nip').val()
  //   $.get('/admin/customer/gus?nip=' + nip, function (data) {
  //     let customer = JSON.parse(data)
  //     if (customer.error == 'ok') {
  //       customer = customer.gus
  //       $('#customer-name').val(customer.name)
  //       $('#customer-address').val(customer.address)
  //       $('#customer-city').val(customer.city)
  //       $('#customer-zip').val(customer.zip)
  //     } else {
  //       toastr.error(customer.error)
  //     }
  //   })
  //   return false
  // }

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
          first_name: '',
          last_name: '',
          nickname: '',
          phone: '',
          file: '',
          sms: false,
          mail: false,
          push: false,
          description: '',
          nip: '',
          firm: '',
          address: '',
          city: '',
          code: '',
          regul: false,
          rodo: false,
        }}
        validationSchema={SignupSchema}
        onSubmit={(values, actions) => {
          let formData = new FormData()
          for (let field in values) {
            formData.append('Firm[' + field + ']', values[field])
          }

          axios
            .post(
              'https://cross-rental.newsystems.pl/admin/site/reg-firm?api=true',
              formData,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              }
            )
            .then((response) => {
              if (response.data.status === '212') {
                for (let field in response.data) {
                  actions.setErrors({ [field]: response.data[field][0] })
                }
              } else if (response.data.status === '201') {
                window.location = '/login'
              }
            })
            .catch((e) => {
              console.log(e)
            })
        }}>
        {({ isSubmitting, setFieldValue, getValues, values }) => (
          <Form id='register-form' style={{ marginTop: 50 }}>
            <div className='site-register' style={{ padding: '0 0 0 41px' }}>
              <div className='mt-5 row register-box-body'>
                <div className='col-md-4'>
                  <div className='form-group field-firm-email required'>
                    <label className='control-label' htmlFor='firm-email'>
                      Adres e-mail/login
                      <span style={{ color: 'red', marginLeft: 5 }}>*</span>
                    </label>
                    <Field
                      type='text'
                      id='firm-email'
                      className='input-login form-control required'
                      name='email'
                      aria-required='true'
                    />
                    <ErrorMessage
                      name='email'
                      className='help-block'
                      component={'div'}
                    />
                  </div>
                  <div className='form-group field-firm-password required'>
                    <label className='control-label' htmlFor='firm-password'>
                      Hasło
                      <span style={{ color: 'red', marginLeft: 5 }}>*</span>
                    </label>
                    <Field
                      type='password'
                      id='firm-password'
                      className='input-login form-control required'
                      name='password'
                      aria-required='true'
                    />
                    <ErrorMessage
                      name='password'
                      className='help-block'
                      component={'div'}
                    />
                  </div>
                  <div className='form-group field-firm-first_name required'>
                    <label className='control-label' htmlFor='firm-first_name'>
                      Imię
                      <span style={{ color: 'red', marginLeft: 5 }}>*</span>
                    </label>
                    <Field
                      type='text'
                      id='firm-first_name'
                      className='input-login form-control required'
                      name='first_name'
                      aria-required='true'
                    />
                    <ErrorMessage
                      name='first_name'
                      className='help-block'
                      component={'div'}
                    />
                  </div>
                  <div className='form-group field-firm-last_name required'>
                    <label className='control-label' htmlFor='firm-last_name'>
                      Nazwisko
                      <span style={{ color: 'red', marginLeft: 5 }}>*</span>
                    </label>
                    <Field
                      type='text'
                      id='firm-last_name'
                      className='input-login form-control required'
                      name='last_name'
                      aria-required='true'
                    />
                    <ErrorMessage
                      name='last_name'
                      className='help-block'
                      component={'div'}
                    />
                  </div>
                  <div className='form-group field-firm-nickname required'>
                    <label className='control-label' htmlFor='firm-nickname'>
                      Twój NICK
                      <span style={{ color: 'red', marginLeft: 5 }}>*</span>
                    </label>
                    <Field
                      type='text'
                      id='firm-nickname'
                      className='input-login form-control required'
                      name='nickname'
                      aria-required='true'
                    />
                    <ErrorMessage
                      name='nickname'
                      className='help-block'
                      component={'div'}
                    />
                  </div>
                  <div className='form-group field-firm-phone required'>
                    <label className='control-label' htmlFor='firm-phone'>
                      Telefon
                      <span style={{ color: 'red', marginLeft: 5 }}>*</span>
                    </label>
                    <Field
                      type='text'
                      id='firm-phone'
                      className='input-login form-control required'
                      name='phone'
                      aria-required='true'
                    />
                    <ErrorMessage
                      name='phone'
                      className='help-block'
                      component={'div'}
                    />
                  </div>
                  <div className='row' style={{ margin: 0 }}>
                    Jak informować Cię o nowych odpowiedziach na ogłoszenia?
                    <span style={{ color: 'red', marginLeft: 5 }}>*</span>
                  </div>
                  <div
                    className='row messages'
                    style={{ display: 'flex', margin: '10px 0 0 0' }}>
                    <div className='form-group field-firm-sms'>
                      <label>
                        <Field type='checkbox' id='firm-sms' name='sms' /> SMS
                      </label>
                      <ErrorMessage
                        name='sms'
                        className='help-block'
                        component={'div'}
                      />
                    </div>
                    <div className='form-group field-firm-mail'>
                      <label>
                        <Field type='checkbox' id='firm-mail' name='mail' />{' '}
                        e-mail
                      </label>
                      <ErrorMessage
                        name='mail'
                        className='help-block'
                        component={'div'}
                      />
                    </div>
                    <div className='form-group field-firm-push'>
                      <label>
                        <Field type='checkbox' id='firm-push' name='push' />{' '}
                        push
                      </label>
                      <ErrorMessage
                        name='push'
                        className='help-block'
                        component={'div'}
                      />
                    </div>
                  </div>
                  <div className='form-group field-firm-description'>
                    <label className='control-label' htmlFor='firm-description'>
                      Opis Firmy
                    </label>
                    <Field
                      id='firm-description'
                      className='input-login form-control'
                      name='description'
                      as={'textarea'}></Field>
                    <ErrorMessage
                      name='description'
                      className='help-block'
                      component={'div'}
                    />
                  </div>
                </div>
                <div className='col-md-4' style={{ padding: '0 0 0 120px' }}>
                  <div className='form-group field-firm-nip required'>
                    <label className='control-label' htmlFor='firm-nip'>
                      NIP
                      <span style={{ color: 'red', marginLeft: 5 }}>*</span>
                    </label>
                    <Field
                      type='number'
                      id='firm-nip'
                      className='input-login form-control required'
                      name='nip'
                    />
                    <ErrorMessage
                      name='nip'
                      className='help-block'
                      component={'div'}
                    />
                  </div>
                  <div className='form-group field-firm-firm required'>
                    <label className='control-label' htmlFor='firm-firm'>
                      Nazwa Firmy
                      <span style={{ color: 'red', marginLeft: 5 }}>*</span>
                    </label>
                    <Field
                      type='text'
                      id='firm-firm'
                      className='input-login form-control required'
                      name='firm'
                    />
                    <ErrorMessage
                      name='firm'
                      className='help-block'
                      component={'div'}
                    />
                  </div>
                  <div className='form-group field-firm-address required'>
                    <label className='control-label' htmlFor='firm-address'>
                      Adres
                      <span style={{ color: 'red', marginLeft: 5 }}>*</span>
                    </label>
                    <Field
                      type='text'
                      id='firm-address'
                      className='input-login form-control required'
                      name='address'
                    />
                    <ErrorMessage
                      name='address'
                      className='help-block'
                      component={'div'}
                    />
                  </div>
                  <div className='form-group field-firm-city required'>
                    <label className='control-label' htmlFor='firm-city'>
                      Miasto
                      <span style={{ color: 'red', marginLeft: 5 }}>*</span>
                    </label>
                    <Field
                      type='text'
                      id='firm-city'
                      className='input-login form-control required'
                      name='city'
                    />
                    <ErrorMessage
                      name='city'
                      className='help-block'
                      component={'div'}
                    />
                  </div>
                  <div className='form-group field-firm-code required'>
                    <label className='control-label' htmlFor='firm-code'>
                      Kod pocztowy
                      <span style={{ color: 'red', marginLeft: 5 }}>*</span>
                    </label>
                    <Field
                      type='text'
                      id='firm-code'
                      className='input-login form-control required'
                      name='code'
                    />
                    <ErrorMessage
                      name='code'
                      className='help-block'
                      component={'div'}
                    />
                  </div>
                  <div className='row mt-3 mb-3'>
                    <div
                      className='col-md-8'
                      style={{ margin: '30px auto', fontSize: 14 }}>
                      Dodaj Logo Firmy
                    </div>
                    <div className='col-md-4'>
                      {values.file ? (
                        <img
                          className='w-full rounded-1 mt-2 max-w-[100px] max-h-[100px]'
                          src={fileSrc}
                          alt='file'
                        />
                      ) : (
                        <label htmlFor='firm-file' className='file-image-link'>
                          <div className='add-plus-orange'></div>
                        </label>
                      )}
                    </div>
                  </div>
                  <div className='form-group field-firm-file'>
                    <label className='control-label' htmlFor='firm-file'>
                      Dodaj Logo Firmy
                    </label>
                    <input
                      type='file'
                      id='firm-file'
                      name='file'
                      onChange={(event) => {
                        setFieldValue('file', event.currentTarget.files[0])
                        openFile(event)
                      }}
                    />
                    <div className='help-block'></div>
                  </div>
                  <div className='form-group field-firm-regul required mb-2 d-flex'>
                    <Field
                      type='checkbox'
                      id='firm-regul'
                      className='form-check-input'
                      style={{ width: 19 }}
                      name='regul'
                    />
                    <label>
                      <span className='ml-2'>
                        Wyrażam zgodę na rejestracje, zapoznałem się z
                        regulaminem
                      </span>
                    </label>
                    <ErrorMessage
                      name='regul'
                      className='help-block'
                      component={'div'}
                    />
                  </div>
                  <div className='form-group field-firm-rodo required mb-3'>
                    <label>
                      <Field
                        type='checkbox'
                        id='firm-rodo'
                        className='form-check-input'
                        name='rodo'
                      />
                      <span className='ml-2'>Rodo check</span>
                    </label>
                    <ErrorMessage
                      name='rodo'
                      className='help-block'
                      component={'div'}
                    />
                  </div>
                  <div className='form-group'>
                    <button
                      type='submit'
                      className='regi-div'
                      name='btn btn-primary login-button'>
                      Zarejestruj
                    </button>
                  </div>
                </div>
                <div className='col-md-4' style={{ padding: '21px 0 0 30px' }}>
                  <button
                    onClick={() => getDataFromGUS(values.nip)}
                    type='button'
                    className='btn btn-blue'>
                    Pobierz dane z GUS
                  </button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default RegisterFirmForm
