import React from "react";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {fetchUserInfoByKey} from "../../redux/Slice/user";
import Loader from "../Loader";



const SignupSchema = Yup.object().shape({
    password: Yup.string()
        .min(5, 'Too Short!')
        .max(10, 'Too Long!')
        .required('Required'),
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
});
const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <>
            <Formik
                initialValues={{
                    email: '',
                    password: ''
                }}
                validationSchema={
                    SignupSchema
                }
                onSubmit={(values, actions) => {
                    let formData = new FormData();
                    for (let field in values) {
                        formData.append('LoginForm[' + field + ']', values[field]);
                    }

                    axios.post('https://cross-rental.newsystems.pl/admin/site/login?api=true', formData)
                        .then(response => {
                            if (response.data.status === '212') {
                                actions.setErrors({email: 'User not found!'})
                            } else {
                                let userKey = response.data.key;
                                localStorage.setItem("auth", userKey);
                                dispatch(fetchUserInfoByKey(userKey));
                                navigate("/");
                            }
                            actions.setSubmitting(false);
                        }).catch(e => {
                        actions.setSubmitting(false);
                        console.log(e);
                    })
                }}
            >
                {(props) => (
                    <div className="d-flex flex-column h-100">
                        <main role="main">
                            <div className="container">
                                <div className="row menu"></div>
                                <div className="site-login d-flex">
                                    <div className="mt-5 col-lg-5">
                                        {props.isSubmitting ? <Loader /> : null}
                                        <Form id="login-form" style={{marginTop: 50}}>
                                            <Link to={'/'}><div className="logo-img"></div></Link>
                                            <div className="row text-center" style={{margin: '10px 10%'}}>Zaloguj się
                                                aby
                                                przejść dalej
                                            </div>
                                            <div className="form-group field-loginform-email required">
                                                <Field type="text"
                                                       id="loginform-email"
                                                       className="input-login form-control"
                                                       name="email"
                                                />
                                                <ErrorMessage name='email' className="help-block" component={'div'}/>

                                            </div>
                                            <div className="form-group field-loginform-password required">
                                                <Field type="password" id="loginform-password"
                                                       className="input-login form-control"
                                                       name="password"
                                                />
                                                <ErrorMessage name='password' className="help-block" component={'div'}/>

                                            </div>
                                            <div className="form-group text-center">
                                                <button
                                                    type="submit"
                                                    className="btn btn-blue"
                                                    name="login-button"
                                                >Login
                                                </button>
                                            </div>
                                        </Form>

                                    </div>
                                    <div className="mt-5 col-lg-7 login-box-body">
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                )}
            </Formik>
        </>
    )
}

export default LoginForm;