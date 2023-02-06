import { React, useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import FilerobotImageEditor, { TABS, TOOLS } from 'react-filerobot-image-editor'
import axios from 'axios'
import MultiSelect from '../../hooks/Multiselect'
import './RegisterForm.css'

const RegUserSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(5, 'Too Short!')
    .max(10, 'Too Long!')
    .required('Required'),
  first_name: Yup.string().required('Required'),
  last_name: Yup.string().required('Required'),
  nickname: Yup.string().required('Required'),
  phone: Yup.string().min(9, 'To short!').required('Required'),
  // file: '',
  preferred_city: Yup.number().required('Required'),
  acceptable_city: Yup.number().required('Required'),
  preferred_work: Yup.number().required('Required'),
  contract: Yup.number().required('Required'),
  add_work: Yup.string(),
  sms: Yup.boolean(),
  mail: Yup.boolean(),
  push: Yup.boolean(),
  language: Yup.number().required('Required'),
  certificate: Yup.number().required('Required'),
  add_certificate: Yup.string(),
  experience: Yup.number('Only digit').required('Required'),
  experience_description: Yup.string().required('Required'),
  skill: Yup.number().required('Required'),
  add_skill: Yup.string(),
  support_devices: Yup.number().required('Required'),
  add_devices: Yup.string(),
  own_devices: Yup.number(),
  add_own_devices: Yup.string(),
  regul: Yup.boolean().required('Required').oneOf([true], 'Required accept'),
  rodo: Yup.boolean().required('Required').oneOf([true], 'Required accept'),
})

const RegisterForm = () => {
  const [isImgEditorShown, setIsImgEditorShown] = useState(false)
  const [show, setShow] = useState(false)
  const [data, setData] = useState(null)
  const [fileSrc, setFileSrc] = useState('')

  const toogleDisplayClass = () => {
    setShow(!show)
  }

  const openImgEditor = () => {
    setIsImgEditorShown(true)
  }

  const closeImgEditor = () => {
    setIsImgEditorShown(false)
  }

  useEffect(() => {
    axios
      .get('https://cross-rental.newsystems.pl/admin/site/reg-data')
      .then((response) => {
        if (response.status === 200) {
          setData(response.data)
        }
      })
      .catch((e) => {
        console.log(e)
      })
  }, [])

  const openFile = (event) => {
    let input = event.target

    const reader = new FileReader()
    reader.onload = function () {
      setFileSrc(reader.result)
    }
    reader.readAsDataURL(input.files[0])
  }

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
          preferred_city: '',
          acceptable_city: '',
          preferred_work: '',
          add_work: '',
          contract: '',
          sms: '',
          mail: '',
          push: '',
          language: '',
          certificate: '',
          add_certificate: '',
          experience: '',
          experience_description: '',
          skill: '',
          add_skill: '',
          support_devices: '',
          add_devices: '',
          own_devices: '',
          add_own_devices: '',
          regul: '',
          rodo: '',
        }}
        validationSchema={RegUserSchema}
        onSubmit={(values, actions) => {
          console.dir(values.file)

          let formData = new FormData()
          for (let field in values) {
            formData.append('User[' + field + ']', values[field])
          }

          axios
            .post(
              'https://cross-rental.newsystems.pl/admin/site/register-api',
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
          <Form
            id='register-form'
            style={{ marginTop: '50px', marginBottom: '20px' }}
            encType='multipart/form-data'>
            {/* <button onClick={openImgEditor}>Open Filerobot image editor</button>
            {isImgEditorShown && (
              <FilerobotImageEditor
                source='https://scaleflex.airstore.io/demo/stephen-walker-unsplash.jpg'
                onSave={(editedImageObject, designState) =>
                  console.log('saved', editedImageObject, designState)
                }
                onClose={closeImgEditor}
                annotationsCommon={{
                  fill: '#ff0000',
                }}
                Text={{ text: 'Filerobot...' }}
                Rotate={{ angle: 90, componentType: 'slider' }}
                Crop={{
                  presetsItems: [
                    {
                      titleKey: 'classicTv',
                      descriptionKey: '4:3',
                      ratio: 4 / 3,
                      // icon: CropClassicTv, // optional, CropClassicTv is a React Function component. Possible (React Function component, string or HTML Element)
                    },
                    {
                      titleKey: 'cinemascope',
                      descriptionKey: '21:9',
                      ratio: 21 / 9,
                      // icon: CropCinemaScope, // optional, CropCinemaScope is a React Function component.  Possible (React Function component, string or HTML Element)
                    },
                  ],
                  presetsFolders: [
                    {
                      titleKey: 'socialMedia', // will be translated into Social Media as backend contains this translation key
                      // icon: Social, // optional, Social is a React Function component. Possible (React Function component, string or HTML Element)
                      groups: [
                        {
                          titleKey: 'facebook',
                          items: [
                            {
                              titleKey: 'profile',
                              width: 180,
                              height: 180,
                              descriptionKey: 'fbProfileSize',
                            },
                            {
                              titleKey: 'coverPhoto',
                              width: 820,
                              height: 312,
                              descriptionKey: 'fbCoverPhotoSize',
                            },
                          ],
                        },
                      ],
                    },
                  ],
                }}
                tabsIds={[TABS.ADJUST, TABS.ANNOTATE, TABS.WATERMARK]} // or {['Adjust', 'Annotate', 'Watermark']}
                defaultTabId={TABS.ANNOTATE} // or 'Annotate'
                defaultToolId={TOOLS.TEXT} // or 'Text'
                defaultSavedImageType='jpg'
                // defaultSavedImageName=''
                closeAfterSave
              />
            )} */}
            <div
              className={`site-register ${!show ? '' : 'd-none'}`}
              id='first'
              style={{ padding: '0px 0 0 41px', margin: 20 }}>
              <div className='mt-5 offset-lg-3 row register-box-body mb-2'>
                <div className='col-md-4'>
                  <div className='form-group field-user-email required'>
                    <label className='control-label' htmlFor='user-email'>
                      Adres e-mail/login
                      <span style={{ color: 'red', marginLeft: '5px' }}>*</span>
                    </label>
                    <Field
                      type='text'
                      id='user-email'
                      className='input-login form-control required'
                      name='email'
                    />
                    <ErrorMessage
                      name='email'
                      className='help-block'
                      component={'div'}
                    />
                  </div>
                  <div className='form-group field-user-password required'>
                    <label className='control-label' htmlFor='user-password'>
                      Hasło
                      <span style={{ color: 'red', marginLeft: '5px' }}>*</span>
                    </label>
                    <Field
                      type='password'
                      id='user-password'
                      className='input-login form-control required'
                      name='password'
                    />
                    <ErrorMessage
                      name='password'
                      className='help-block'
                      component={'div'}
                    />
                  </div>
                  <div className='form-group field-user-first_name required'>
                    <label className='control-label' htmlFor='user-first_name'>
                      Imię
                      <span style={{ color: 'red', marginLeft: '5px' }}>*</span>
                    </label>
                    <Field
                      type='text'
                      id='user-first_name'
                      className='input-login form-control required'
                      name='first_name'
                    />
                    <ErrorMessage
                      name='first_name'
                      className='help-block'
                      component={'div'}
                    />
                  </div>
                  <div className='form-group field-user-last_name required'>
                    <label className='control-label' htmlFor='user-last_name'>
                      Nazwisko
                      <span style={{ color: 'red', marginLeft: '5px' }}>*</span>
                    </label>
                    <Field
                      type='text'
                      id='user-last_name'
                      className='input-login form-control required'
                      name='last_name'
                    />
                    <ErrorMessage
                      name='last_name'
                      className='help-block'
                      component={'div'}
                    />
                  </div>
                  <div className='form-group field-user-nickname required'>
                    <label className='control-label' htmlFor='user-nickname'>
                      Twój NICK
                      <span style={{ color: 'red', marginLeft: '5px' }}>*</span>
                    </label>
                    <Field
                      type='text'
                      id='user-nickname'
                      className='input-login form-control required'
                      name='nickname'
                    />
                    <ErrorMessage
                      name='nickname'
                      className='help-block'
                      component={'div'}
                    />
                  </div>
                  <div className='form-group field-user-phone required'>
                    <label className='control-label' htmlFor='user-phone'>
                      Telefon
                      <span style={{ color: 'red', marginLeft: '5px' }}>*</span>
                    </label>
                    <Field
                      type='text'
                      id='user-phone'
                      className='input-login form-control required'
                      name='phone'
                    />
                    <ErrorMessage
                      name='phone'
                      className='help-block'
                      component={'div'}
                    />
                  </div>
                  <div className='row'>
                    <div
                      className='col-md-8'
                      style={{ margin: '30px auto', fontSize: '14px' }}>
                      Dodaj zdjęcie/Avatar
                    </div>
                    <div className='col-md-4'>
                      {values.file ? (
                        <img
                          className='w-full rounded-1 mt-2'
                          src={fileSrc}
                          alt='file'
                        />
                      ) : (
                        <label htmlFor='user-file' className='file-image-link'>
                          <div className='add-plus-orange'></div>
                        </label>
                      )}
                    </div>
                  </div>
                  <div className='form-group field-user-file'>
                    <label className='control-label' htmlFor='user-file'>
                      File
                    </label>
                    <input
                      type='file'
                      id='user-file'
                      name='file'
                      onChange={(event) => {
                        setFieldValue('file', event.currentTarget.files[0])
                        openFile(event)
                      }}
                    />
                    <ErrorMessage
                      name='file'
                      className='help-block'
                      component={'div'}
                    />
                  </div>
                </div>
                <div className='col-md-5'>
                  <div
                    className='form-group input-div-control'
                    style={{ marginBottom: 20 }}>
                    <label className='control-label'>
                      Preferowane miasta pracy
                      <span style={{ color: 'red', marginLeft: '5px' }}>*</span>
                    </label>
                    <div className='form-group field-user-preferred_city required'>
                      <Field
                        id='user-preferred_city'
                        className='input-login form-control'
                        name='preferred_city'
                        isMulti={true}
                        component={MultiSelect}
                        options={data?.cities.map((el) => ({
                          value: el.id,
                          label: el.name,
                        }))}
                      />
                      <ErrorMessage
                        name='preferred_city'
                        className='help-block'
                        component={'div'}
                      />
                    </div>
                  </div>
                  <div
                    className='form-group input-div-control'
                    style={{ marginBottom: 20 }}>
                    <label className='control-label'>
                      Dopuszczalne miasta pracy
                      <span style={{ color: 'red', marginLeft: '5px' }}>*</span>
                    </label>
                    <Field
                      type='hidden'
                      id='user-acceptable_city'
                      className='input-login form-control'
                      name='acceptable_city'
                      isMulti={true}
                      component={MultiSelect}
                      options={data?.cities.map((el) => ({
                        value: el.id,
                        label: el.name,
                      }))}
                    />
                    <ErrorMessage
                      name='acceptable_city'
                      className='help-block'
                      component={'div'}
                    />
                  </div>
                  <div
                    className='row padding-border'
                    style={{ marginBottom: 20 }}>
                    <div className='form-group input-div-control'>
                      <label className='control-label'>
                        Preferowany zakres prac
                        <span style={{ color: 'red', marginLeft: '5px' }}>
                          *
                        </span>
                      </label>
                      <Field
                        type='hidden'
                        id='user-preferred_work'
                        className='input-login form-control'
                        name='preferred_work'
                        isMulti={true}
                        component={MultiSelect}
                        options={data?.works.map((el) => ({
                          value: el.id,
                          label: el.name,
                        }))}
                      />
                      <ErrorMessage
                        name='preferred_work'
                        className='help-block'
                        component={'div'}
                      />
                    </div>

                    <div className='form-group field-user-add_work'>
                      <label className='control-label' htmlFor='user-add_work'>
                        Preferowany zakres prac nieujęty na liście
                        <span
                          style={{
                            color: '#5EC1DB',
                            marginLeft: 5,
                          }}>
                          ( oddziel średnikiem ; )
                        </span>
                      </label>
                      <Field
                        type='text'
                        id='user-add_work'
                        className='input-login form-control addititional'
                        name='add_work'
                      />
                      <ErrorMessage
                        name='add_work'
                        className='help-block'
                        component={'div'}
                      />
                    </div>
                  </div>
                  <div
                    className='form-group input-div-control'
                    style={{ marginBottom: 20 }}>
                    <label className='control-label'>
                      Preferowany zakres prac
                      <span style={{ color: 'red', marginLeft: '5px' }}>*</span>
                    </label>
                    <Field
                      type='hidden'
                      id='user-contract'
                      className='input-login form-control'
                      name='contract'
                      isMulti={true}
                      component={MultiSelect}
                      options={data?.contracts.map((el) => ({
                        value: el.id,
                        label: el.name,
                      }))}
                    />
                    <ErrorMessage
                      name='contract'
                      className='help-block'
                      component={'div'}
                    />
                  </div>
                  <div className='row' style={{ margin: 0 }}>
                    Jak informować Cię o nowych odpowiedziach na głoszenia?
                    <span style={{ color: 'red', marginLeft: '5px' }}>*</span>
                  </div>
                  <div
                    className='row messages'
                    style={{ display: 'flex', margin: '10px 0 0 0' }}>
                    <div className='form-group field-user-sms'>
                      <label>
                        <Field type='checkbox' id='user-sms' name='sms' /> SMS
                      </label>
                      <ErrorMessage
                        name='sms'
                        className='help-block'
                        component={'div'}
                      />
                    </div>
                    <div className='form-group field-user-mail'>
                      <label>
                        <Field type='checkbox' id='user-mail' name='mail' />
                        e-mail
                      </label>
                      <ErrorMessage
                        name='mail'
                        className='help-block'
                        component={'div'}
                      />
                    </div>
                    <div className='form-group field-user-push'>
                      <label>
                        <Field type='checkbox' id='user-push' name='push' />{' '}
                        push
                      </label>
                      <ErrorMessage
                        name='push'
                        className='help-block'
                        component={'div'}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row' style={{ height: 20 }}>
                <div className='col-md-4'></div>
                <div className='col-md-5'>
                  <button
                    type='button'
                    id='first-next'
                    onClick={toogleDisplayClass}
                    className='regi-div btn'
                    name='login-button'>
                    Dalej
                  </button>
                </div>
              </div>
            </div>
            <div
              className={`site-register ${show ? '' : 'd-none'}`}
              id='second'
              style={{ padding: '0px 0 0 41px' }}>
              <div className='mt-5 offset-lg-3 row register-box-body'>
                <div className='col-md-4'>
                  <div
                    className='form-group input-div-control'
                    style={{ marginBottom: 20 }}>
                    <label className='control-label'>
                      Znajomość języków obcych
                      <span style={{ color: 'red', marginLeft: '5px' }}>*</span>
                    </label>
                    <Field
                      type='hidden'
                      id='user-language'
                      className='input-login form-control'
                      name='language'
                      isMulti={true}
                      component={MultiSelect}
                      options={data?.languages.map((el) => ({
                        value: el.id,
                        label: el.name,
                      }))}
                    />
                    <ErrorMessage
                      name='language'
                      className='help-block'
                      component={'div'}
                    />
                  </div>

                  <div
                    className='row padding-border'
                    style={{ marginBottom: 20 }}>
                    <div className='form-group input-div-control'>
                      <label className='control-label'>
                        Posiadane certyfikaty
                        <span style={{ color: 'red', marginLeft: '5px' }}>
                          *
                        </span>
                      </label>
                      <div className='form-group field-user-certificate required'>
                        <Field
                          type='hidden'
                          id='user-certificate'
                          className='form-control'
                          name='certificate'
                          isMulti={true}
                          component={MultiSelect}
                          options={data?.certificates.map((el) => ({
                            value: el.id,
                            label: el.name,
                          }))}
                        />
                        <ErrorMessage
                          name='certificate'
                          className='help-block'
                          component={'div'}
                        />
                      </div>

                      <div className='form-group field-user-add_certificate'>
                        <label
                          className='control-label'
                          htmlFor='user-add_certificate'>
                          Certyfikaty nieujęte na liście
                          <span
                            style={{
                              color: '#5EC1DB',
                              marginLeft: 5,
                            }}>
                            ( oddziel średnikiem ; )
                          </span>
                        </label>
                        <Field
                          type='text'
                          id='user-add_certificate'
                          className='input-login form-control addititional'
                          name='add_certificate'
                        />
                        <ErrorMessage
                          name='add_certificate'
                          className='help-block'
                          component={'div'}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='form-group field-user-experience required'>
                      <label
                        className='control-label'
                        htmlFor='user-experience'>
                        Doświadczenie zawodowe [Lata]
                        <span style={{ color: 'red', marginLeft: '5px' }}>
                          *
                        </span>
                      </label>
                      <Field
                        type='text'
                        id='user-experience'
                        className='input-login form-control required'
                        name='experience'
                      />
                      <ErrorMessage
                        name='experience'
                        className='help-block'
                        component={'div'}
                      />
                    </div>
                    <div className='form-group field-user-experience_description required'>
                      <label
                        className='control-label'
                        htmlFor='user-experience_description'>
                        Doświadczenie zawodowe
                        <span style={{ color: 'red', marginLeft: '5px' }}>
                          *
                        </span>
                      </label>
                      <Field
                        id='user-experience_description'
                        className='input-login form-control required'
                        name='experience_description'
                        as={'textarea'}
                      />
                      <ErrorMessage
                        name='experience_description'
                        className='help-block'
                        component={'div'}
                      />
                    </div>
                  </div>
                </div>
                <div className='col-md-5'>
                  <div
                    className='row padding-border'
                    style={{ marginBottom: 20 }}>
                    <div className='form-group input-div-control'>
                      <label className='control-label'>
                        Umiejętności
                        <span style={{ color: 'red', marginLeft: '5px' }}>
                          *
                        </span>
                      </label>
                      <Field
                        type='hidden'
                        id='user-skill'
                        className='form-control'
                        name='skill'
                        isMulti={true}
                        component={MultiSelect}
                        options={data?.skills.map((el) => ({
                          value: el.id,
                          label: el.name,
                        }))}
                      />
                      <ErrorMessage
                        name='skill'
                        className='help-block'
                        component={'div'}
                      />
                    </div>
                    <div className='form-group field-user-add_skill'>
                      <label className='control-label' htmlFor='user-add_skill'>
                        Umiejętności nieujęte na liście
                        <span
                          style={{
                            color: '#5EC1DB',
                            marginLeft: 5,
                          }}>
                          ( oddziel średnikiem ; )
                        </span>
                      </label>
                      <Field
                        type='text'
                        id='user-add_skill'
                        className='input-login form-control addititional'
                        name='add_skill'
                      />
                      <ErrorMessage
                        name='add_skill'
                        className='help-block'
                        component={'div'}
                      />
                    </div>
                  </div>
                  <div
                    className='row padding-border'
                    style={{ marginBottom: 20 }}>
                    <div className='form-group input-div-control'>
                      <label className='control-label'>
                        Obsługiwane urządzenia
                        <span style={{ color: 'red', marginLeft: '5px' }}>
                          *
                        </span>
                      </label>
                      <Field
                        type='hidden'
                        id='user-support_devices'
                        className='form-control'
                        name='support_devices'
                        isMulti={true}
                        component={MultiSelect}
                        options={data?.devices.map((el) => ({
                          value: el.id,
                          label: el.name,
                        }))}
                      />
                      <ErrorMessage
                        name='support_devices'
                        className='help-block'
                        component={'div'}
                      />
                    </div>

                    <div className='form-group field-user-add_devices'>
                      <label
                        className='control-label'
                        htmlFor='user-add_devices'>
                        Obsługiwane urządzenia nieujęte na liście
                        <span
                          style={{
                            color: '#5EC1DB',
                            marginLeft: 5,
                          }}>
                          ( oddziel średnikiem ; )
                        </span>
                      </label>
                      <Field
                        type='text'
                        id='user-add_devices'
                        className='input-login form-control addititional'
                        name='add_devices'
                      />
                      <ErrorMessage
                        name='add_devices'
                        className='help-block'
                        component={'div'}
                      />
                    </div>
                  </div>
                  <div
                    className='row padding-border'
                    style={{ marginBottom: 20 }}>
                    <div className='form-group input-div-control'>
                      <label className='control-label'>
                        Posiadane własne urządzenia
                      </label>
                      <Field
                        type='hidden'
                        id='user-own_devices'
                        className='form-control'
                        name='own_devices'
                        isMulti={true}
                        component={MultiSelect}
                        options={data?.devices.map((el) => ({
                          value: el.id,
                          label: el.name,
                        }))}
                      />
                      <ErrorMessage
                        name='own_devices'
                        className='help-block'
                        component={'div'}
                      />
                    </div>
                    <div className='form-group field-user-add_own_devices'>
                      <label
                        className='control-label'
                        htmlFor='user-add_own_devices'>
                        Posiadane własne urządzenia nieujęte na liście
                      </label>
                      <Field
                        type='text'
                        id='user-add_own_devices'
                        className='input-login form-control'
                        name='add_own_devices'
                      />
                      <ErrorMessage
                        name='add_own_devices'
                        className='help-block'
                        component={'div'}
                      />
                    </div>
                  </div>

                  <div className='form-group field-user-regul'>
                    <label>
                      <Field
                        type='checkbox'
                        id='user-regul'
                        className='required'
                        name='regul'
                      />
                      <span style={{ marginLeft: 10 }}>
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
                  <div className='form-group field-user-rodo'>
                    <label>
                      <Field
                        type='checkbox'
                        id='user-rodo'
                        className='required'
                        name='rodo'
                      />
                      <span style={{ marginLeft: 10 }}>Rodo check</span>
                    </label>
                    <ErrorMessage
                      name='rodo'
                      className='help-block'
                      component={'div'}
                    />
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-md-4'></div>
                <div className='col-md-5'>
                  <button
                    type='button'
                    id='second-back'
                    onClick={toogleDisplayClass}
                    className='regi-div btn login-button'>
                    Znow
                  </button>
                  <button type='submit' className='regi-div btn login-button'>
                    Zarejestruj
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

export default RegisterForm
