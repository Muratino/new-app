import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { debounce } from 'lodash'
import {
  fetchFiltersTablo,
  fetchNewTabloData,
  fetchTabloData,
  setChat,
  tabloProcess,
} from '../../redux/Slice/tablo'
import Loader from '../Loader'
import MainTableItem from './MainTableItem'
import MainTableSelect from './MainTableSelect'

const MainTable = () => {
  const dispatch = useDispatch()
  const { homeTablo, process, isChatOpen } = useSelector((state) => state.tablo)
  const [offset, setOffset] = useState(1)
  const [categoryValue, setCategoryValue] = useState('')
  const [countryValue, setCountryValue] = useState('')
  const [cityValue, setCityValue] = useState('')
  const [subCategoryValue, setSubCategoryValue] = useState('')
  const [inputValue, setInputValue] = useState('')

  const debouncedSearch = React.useRef(
    debounce((value, valuesObj) => {
      dispatch(
        fetchFiltersTablo({
          values: valuesObj,
          name: value,
          offset: 0,
        })
      )
      setOffset(1)
    }, 500)
  ).current

  useEffect(() => {
    dispatch(fetchTabloData())
  }, [dispatch])

  useEffect(() => {
    return () => {
      debouncedSearch.cancel()
    }
  }, [debouncedSearch])

  const openChat = () => {
    dispatch(setChat(!isChatOpen))
  }

  const onLoadMore = () => {
    const valuesObj = {
      country: countryValue,
      town: cityValue,
      category: categoryValue,
      subCategory: subCategoryValue,
    }
    dispatch(
      fetchNewTabloData({
        values: valuesObj,
        name: inputValue,
        offset,
      })
    )
    setOffset(offset + 1)
  }

  const searchInput = (value) => {
    const valuesObj = {
      country: countryValue,
      town: cityValue,
      category: categoryValue,
      subCategory: subCategoryValue,
    }
    debouncedSearch(value, valuesObj)
    setInputValue(value)
  }

  const fetchFilters = (values) => {
    console.log(values)
    dispatch(fetchFiltersTablo({ values, name: inputValue, offset: 0 }))
    setOffset(1)
  }

  const loading = process === tabloProcess.LOADING ? <Loader /> : null
  const success = process === tabloProcess.SUCCESS ? true : false

  return (
    <>
      <div className='row title-blue' style={{ fontSize: 18 }}>
        Cross Rental
      </div>
      <div
        className='row border'
        style={{ borderRadius: 10, margin: '0 1px 0 0' }}>
        <div className='row'>
          <button
            className='btn btn-sm btn-green'
            style={{ margin: '15px 10px' }}>
            Udostępnij sprzęt
          </button>
        </div>
        <div className='row'>
          <div className='col d-flex' style={{ marginBottom: 15 }}>
            <div className='search-icone'></div>
            <InputTablo inputValue={inputValue} searchInput={searchInput} />
            <div onClick={() => searchInput('')} className='clear-icone'></div>
            <MainTableSelect
              categoryValue={categoryValue}
              setCategoryValue={setCategoryValue}
              countryValue={countryValue}
              setCountryValue={setCountryValue}
              cityValue={cityValue}
              setCityValue={setCityValue}
              subCategoryValue={subCategoryValue}
              setSubCategoryValue={setSubCategoryValue}
              fetchFilters={fetchFilters}
            />
          </div>
        </div>
        <div className='row' style={{ margin: 0 }}>
          {loading}
          <table className='table'>
            <thead>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>Zdjęcie</th>
                <th scope='col'>Nazwa</th>
                <th scope='col'>Firma</th>
                <th scope='col'>Miasto</th>
                <th scope='col'>Kraj</th>
                <th scope='col'>Liczba</th>
                <th scope='col'></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={8} style={{ padding: 0 }}>
                  <span className='row info-colored'>Multimedia</span>
                </td>
              </tr>
              {success
                ? homeTablo.map((el, idx) => (
                    <MainTableItem
                      openChat={openChat}
                      // key={el.gear_model_id}
                      key={idx}
                      photo={`https://e4e.newsystems.pl/files/gear/${el.gear_model_photo}`}
                      name={el.gear_model_name}
                      other={el}
                    />
                  ))
                : null}
              <tr>
                <td colSpan={8} style={{ padding: 0 }}>
                  <span className='row info-outled'>Multimedia</span>
                </td>
              </tr>
              <tr>
                <td colSpan={8} style={{ padding: 0 }}>
                  <span
                    onClick={onLoadMore}
                    style={{ cursor: 'pointer' }}
                    className='row info-outled'>
                    MORE
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default MainTable

const InputTablo = ({ inputValue, searchInput }) => {
  return (
    <input
      value={inputValue}
      onChange={(e) => searchInput(e.target.value)}
      type='text'
      className='form-control search'
      placeholder={'Nazwa sprzętu'}
    />
  )
}
