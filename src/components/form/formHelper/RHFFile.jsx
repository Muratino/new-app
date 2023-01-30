import { useFormContext, Controller } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import { useDropzone } from 'react-dropzone';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useCallback } from 'react';


const RHFFile = ({ children, name, label, classnames, style }) => {
  const { control } = useFormContext();

  // const files = acceptedFiles.map(file => (
  //   <li key={file.path}>
  //     {file.path} - {file.size} bytes
  //   </li>
  // ));
  // console.log(acceptedFiles);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange } }) => (
        <Dropzone
          name={name}
          label={label}
          style={style}
          classnames={classnames}
          children={children}
          onChange={(e) => onChange(e.target.files[0])}
        />
      )
      }
    />
  );
};

export default RHFFile;

const Dropzone = ({
  onChange,
  name,
  children,
  label,
  style,
  classnames
}) => {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    console.log({ acceptedFiles });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    // <div {...getRootProps()}>
    //   <input {...getInputProps({ onChange })} />
    // </div>
    <div className='flex items-center justify-between w-full mt-2.5'>
      <Form.Label className={classnames.label} htmlFor={label}>{label}</Form.Label>
      {/* {!isDragActive
        ? null
        : <Form.Label className={classnames.label} htmlFor={label}>Drop the files here ...</Form.Label>
      } */}
      {/* <Form.Label className={classnames.label} htmlFor={label}>{label}</Form.Label> */}
      <div style={style} {...getRootProps({ className: classnames.item })}>
        <input {...getInputProps({ onChange, name })} />
        {children}
      </div>
    </div>
  )
}