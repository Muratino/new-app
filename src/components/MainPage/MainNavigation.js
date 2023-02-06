import React from 'react'

const MainNavigation = () => {
  return (
    <>
      <div className='row row-title-blue'>Wybierz czego szukasz:</div>
      <div className='row'>
        <div className='col-5' style={{ margin: 'auto 0', width: 590 }}>
          <button className={'btn btn-sm btn-orange'}>Cross rental</button>
          <button className={'btn btn-sm btn-blues'}>Sprzęt używany</button>
          <button className={'btn btn-sm btn-blues'}>
            Informacje o obiektach
          </button>
          <button className={'btn btn-sm btn-blues'}>Ridery techniczne</button>
          <button className={'btn btn-sm btn-blues'}>Grupy zakupowe</button>
        </div>
        <div className='col-5' style={{ width: 500 }}>
          <div className='row'>
            <div className='col-2 title-blue' style={{ width: 83 }}>
              Na skróty:
            </div>
            <div className='col-10'>
              <div className='row'>
                <div className='col' style={{ marginBottom: 5 }}>
                  <div className='btn btn-sm btn-green'>Udostępnij sprzęt</div>
                  <div className='btn btn-sm btn-green'>Dodaj Rider</div>
                  <div className='btn btn-sm btn-green'>Sprzedaj sprzęt</div>
                </div>
              </div>
              <div className='row'>
                <div className='col'>
                  <div className='btn btn-sm btn-green'>Prześlij plany</div>
                  <div className='btn btn-sm btn-green'>Prześlij zdjęcia</div>
                  <div className='btn btn-sm btn-green'>Zgłoś chęć zakupu</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-2 col-image'></div>
      </div>
    </>
  )
}

export default MainNavigation
