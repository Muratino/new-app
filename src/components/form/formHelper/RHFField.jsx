import { useFormContext, Controller } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function RHFField({ children, name, label, className, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error, invalid, isTouched } }) => (
        <>
          <Form.Label className={className} htmlFor={label}>{label} {children && children}</Form.Label>
          <Form.Control
            {...field}
            id={label}
            {...other}
            isInvalid={invalid}
          // isValid={name !== 'email' ? !error && field.value : !error && invalid}
          />
          <Form.Control.Feedback className='ml-4' type='invalid'>
            {error
              ? error.message
              : null}
          </Form.Control.Feedback>

        </>
      )}
    />
  );
}