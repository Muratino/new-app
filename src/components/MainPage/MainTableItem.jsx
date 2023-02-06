import React from 'react';
import { useSelector } from 'react-redux';

const MainTableItem = ({ photo, name, other, openChat }) => {
  const { user } = useSelector((state) => state.user)

  return (
    <tr>
      <td>
        <input type='checkbox' />
      </td>
      <td>
        <img
          src={photo}
          className={'table-img'}
          alt=''
        />
      </td>
      <td>
        <span className={'title-blue'}>{name}</span>
      </td>
      <td>
        {user ? (
          <span className={'firm-title'}>
            {other.owner_name}
          </span>
        ) : (
          <span className={'not-registered'}>
            Zaloguj się aby zobaczyć
          </span>
        )}
      </td>
      <td>
        <span className={'town-table'}>{other.owner_city}</span>
      </td>
      <td>
        <span className={'town-table'}>{other.owner_country}</span>
      </td>
      <td>
        <span className={'town-table'}>{other.quantity}</span>
      </td>
      <td>
        <button onClick={openChat} className='btn btn-sm btn-chat'>Zapytaj</button>
      </td>
    </tr>
  );
};

export default MainTableItem;