import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const MainTableSelect = ({
  fetchFilters,
  categoryValue,
  setCategoryValue,
  countryValue,
  setCountryValue,
  cityValue,
  setCityValue,
  subCategoryValue,
  setSubCategoryValue
}) => {
  const { category, city, country } = useSelector((state) => state.tablo)
  const [subCategory, setSubCategory] = useState({});

  const categoryItem = (obj) => {
    const newArr = Object.entries(obj)
    return newArr.map(el => {
      return (
        <option key={el[0]} value={el[0]}>{el[1].name}</option>
      )
    })
  }

  const subCategoryElements = (obj) => {
    const newArr = Object.entries(obj)
    return newArr.map(el => {
      return (
        <option key={el[0]} value={el[0]}>{el[1]}</option>
      )
    })
  }

  const subCategoryItem = (idx, obj) => {
    const subCategoriesObj = { ...obj }

    for (let key in subCategoriesObj) {
      // if (subCategoriesObj[key]?.name === idx) {
      //   setSubCategory({ ...subCategoriesObj[key]?.subCategories })
      // }
      if (key === idx) {
        setSubCategory({ ...subCategoriesObj[key]?.subCategories })
      }
    }
  }

  const categoryElements = categoryItem(category)
  const subCategoryElement = subCategoryElements(subCategory)

  return (
    <>
      <select value={categoryValue} onChange={e => {
        setCategoryValue(e.target.value)
        subCategoryItem(e.target.value, category)
        fetchFilters({ country: countryValue, town: cityValue, category: e.target.value, subCategory: subCategoryValue })
      }} name='' id='' className={'form-select select'}>
        <option value='1'>Kategoria</option>
        {categoryElements}
      </select>
      <select value={subCategoryValue} onChange={e => {
        setSubCategoryValue(e.target.value)
        fetchFilters({ country: countryValue, town: cityValue, category: categoryValue, subCategory: e.target.value })
      }} name='' id='' className={'form-select select'}>
        <option value='1'>Podkategoria</option>
        {subCategoryElement}
      </select>
      <select value={cityValue} onChange={e => {
        setCityValue(e.target.value)
        fetchFilters({ country: countryValue, town: e.target.value, category: categoryValue, subCategory: subCategoryValue })
      }} name='' id='' className={'form-select select'}>
        <option value='1'>Miasto</option>
        {
          city?.map((item, idx) => (
            item.owner_city &&
            <option key={idx} value={item.owner_city}>{item.owner_city}</option>
          ))
        }
      </select>
      <select value={countryValue} onChange={e => {
        setCountryValue(e.target.value)
        fetchFilters({ country: e.target.value, town: cityValue, category: categoryValue, subCategory: subCategoryValue })
      }} name='' id='' className={'form-select select'}>
        {
          country?.map((item, idx) => (
            item.owner_country &&
            <option key={idx} value={item.owner_country}>{item.owner_country}</option>
          ))
        }
      </select>
    </>
  );
};

export default MainTableSelect;