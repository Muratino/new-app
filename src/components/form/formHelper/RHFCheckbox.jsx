import { useFormContext, Controller } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';


const RHFCheckbox = ({ classnames, name, element }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error, invalid } }) => (
        <>
          <div className='flex items-center justify-start w-full mt-2.5'>
            {
              element.map(el => <Form.Check
                {...field}
                onChange={(e) => field.onChange(e.target.checked === true ? `${e.target.checked}: ${el.label}` : `${e.target.checked}:${el.label}`)}
                key={el.name}
                className={classnames}
                type='checkbox'
                id={el.label}
                isInvalid={invalid}
                label={el.label}
              />
              )
            }
          </div >
          <Form.Control.Feedback className='ml-4' type='invalid'>
            {error
              ? error.message
              : null}
          </Form.Control.Feedback>
        </>
      )}
    />
  );
};

export default RHFCheckbox;