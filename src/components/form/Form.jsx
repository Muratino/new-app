import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '../Button';
import FormProvider from './FormProvider';
import RHFField from './formHelper/RHFField';
import RHFFile from './formHelper/RHFFile';
import RHFCheckbox from './formHelper/RHFCheckbox';
import RHFSelect from './formHelper/RHFSelect';

const Form = ({ defaultValues, elements, UpdateUserSchema }) => {

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      console.log(data);
      // const newObj = { last_name: data.lastName, name: data.displayName };

      // const response = await axios.put(`${process.env.HOST_API_Ki`, { ...newObj });

      // if (response.data.success) {
      //     dispatch(fetchUserProfile());
      // }

    } catch (error) {
      console.error(error);
    }
  };

  const classNameFile = {
    label: 'text-[14px] font-semibold',
    item: 'w-[80px] h-[80px] rounded-full border-2 border-[#43B7D6] relative bg-[url("https://cross-rental.newsystems.pl/themes/e4e/img/antFill-camera%20Copy.svg")] bg-center bg-no-repeat'
  }

  const classNameSelect = {
    label: 'mr-4 text-xs font-bold mt-2 mb-1',
    item: ''
  }

  return (
    <FormProvider className='w-full mt-5 pl-12 pr-6 bg-[url("https://cross-rental.newsystems.pl/themes/e4e/img/Image%205@1x.png")] bg-right-top bg-no-repeat' methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <div className="w-3/4 flex items-start">
        <div className="w-1/2 pr-3">
          {
            elements.left.map((el) => {
              if (el.type === 'file') {
                return <RHFFile style={{ cursor: 'pointer' }} classnames={classNameFile} key={el.name} name={el.name} label={el.label} type={el.type} >
                  <img className='absolute bottom-3.5 right-3' src='https://cross-rental.newsystems.pl/themes/e4e/img/antFill-plus-circle%20Copy%20(3).svg' alt='plus' />
                </RHFFile>
              }
              if (el.type === 'input') {
                return <RHFField className={'mr-4 text-xs font-bold mt-2 mb-1'} key={el.name} name={el.name} label={el.label}>
                  <span className="text-red-600 text-base">*</span>
                </RHFField>
              }
            })
          }
        </div>
        <div className="w-1/2 pl-3">
          {
            elements.right.map((el, i) => {
              if (el.type === 'select') {
                return <RHFSelect classnames={classNameSelect} key={el.name} name={el.name} label={el.label} option={el.option} >
                  <span className="text-red-600 text-base">*</span>
                </RHFSelect>
              }

              if (el.type === 'selectAndInput') {
                return (
                  <div key={el.select.name} className='py-4 px-3 mt-4 border-[1px] border-[#BBBBBB] rounded-xs'>
                    <RHFSelect classnames={classNameSelect} name={el.select.name} label={el.select.label} option={el.select.option} >
                      <span className="text-red-600 text-base">*</span>
                    </RHFSelect>
                    <RHFField className='ml-4 text-xs font-bold mt-2 mb-1' name={el.input.name} label={el.input.label} >
                      <span style={{ color: '#5EC1DB', marginLeft: '5px', fontSize: '11px' }}>(oddziel średnikiem)</span>
                    </RHFField>
                  </div>
                )

              }

              if (el.type === 'text') {
                return <p key={i} className='text-[11px]'>Jak informować Cię o nowych odpowiedziach na ogłoszenia?<span className="text-red-600 text-base">*</span></p>
              }

              if (el.type === 'checkbox') {
                return <RHFCheckbox key={el.name} element={el.element} classnames='text-[14px] mr-5 !mb-0' name={el.name} />
              }
            })
          }
        </div>
      </div>

      <div className="flex items-center justify-center py-5">
        {/* <Link to='register'> */}
        <Button type='submit' onClick={() => { }} className='py-1 px-2.5 bg-stone-700 rounded-md text-white text-sm' title='Dalej' />
        {/* </Link> */}
      </div>
    </FormProvider>
  );
};

export default Form;