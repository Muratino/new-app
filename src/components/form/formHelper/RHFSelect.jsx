import { useFormContext, Controller } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';


const RHFSelect = ({ children, classnames, name, label, option, ...other }) => {
  const [value, setValue] = useState('');
  const { control } = useFormContext();
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error, invalid } }) => (
        <>
          <Form.Label className={classnames.label} htmlFor={label}>{label} {children && children}</Form.Label>
          <Form.Select
            {...field}
            id={label}
            isInvalid={invalid}
            // onChange={(e) => setValue(e.target.value)}
            // value={value}
            {...other}
          >
            <option value=''></option>
            {
              option.map((el, i) => (
                <option key={i} value={el.label}>{el.label}</option>
              ))
            }
          </Form.Select>
          <Form.Control.Feedback className='ml-3' type='invalid'>
            {error
              ? error.message
              : null}
          </Form.Control.Feedback>
        </>
      )}
    />
  );
};

export default RHFSelect;