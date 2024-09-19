import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { dob, izm, udalit } from './contactsSlice';

function App() {
  const contacts = useSelector((state) => state.contacts);
  const dispatch = useDispatch();
  const [name, setName] = useState('');

  const [izmenenie, setIzmenit] = useState(null);
  const [dobavit, setdobavit] = useState(null);

  const izmenit = () => {
    if (!name.trim()) return; 
    if (izmenenie) {
      dispatch(izm({ id: izmenenie, name }));
      setIzmenit(null);
    } else {
      dispatch(dob({ id: Date.now(), name }));
    }
    setName(''); 
  };

  const izme = (contact) => {
    setIzmenit(contact.id);
    setName(contact.name);
  };

  const doba = (contactId) => {
    setdobavit(contactId === dobavit ? null : contactId);
  };

  return (
    <div className="App">
      <div className="form">

        <h1 className='title'>Geeks</h1>
    <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
         
        />
        <button onClick={izmenit}>
          {izmenenie ? 'Изменить' : 'Добавить'}
        </button>
      </div>

      <ul className="contact-list">
        {contacts.map((contact) => (
          <li
            key={contact.id}
            style={{
              backgroundColor: contact.id === dobavit ? 'yellow' : 'transparent'
            }}
          >
            <span
              style={{
                color: contact.id === dobavit ? 'red' : 'black'
              }}
            >
              {contact.name}
            </span>
            <button onClick={() => izme(contact)}>ИЗМЕНИТЬ</button>
            <button onClick={() => dispatch(udalit(contact.id))}>УДАЛИТЬ</button>
            <button onClick={() => doba(contact.id)}>
              ВАЖНАЯ
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
