import React, { FC } from 'react';
import { memo, useState, createRef } from 'react';
import { Message } from 'src/common-types';

import MUIInput from '@mui/material/Input';
import MUIButton from '@mui/material/Button';

import style from './Form.module.css';

interface FormProps {
  addMessage: (msg: Message) => void;
}

export const Form: FC<FormProps> = memo(({ addMessage }) => {
  const [value, setValue] = useState('');
  const [message, setMessage] = useState<Message>({
    author: '',
    text: '',
    side: '',
  });
  const input: React.RefObject<HTMLInputElement> = createRef();

  const changeMessage = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setMessage({ author: 'Author', text: e.target.value, side: 'left' });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setValue(e.target.value);
    changeMessage(e);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    addMessage(message);
    setMessage({ author: '', text: '', side: '' });
    setValue('');
    if (input.current) {
      input.current.focus();
    }
  };

  return (
    <>
      <form className={style.form} action="#">
        <MUIInput
          id={style.message_input}
          type="text"
          value={value}
          ref={input}
          placeholder="Your message..."
          onChange={handleChange}
          fullWidth
          autoFocus
        />

        <MUIButton
          id={style.message_send}
          data-id='send'
          type="submit"
          variant="contained"
          onClick={handleClick}
        >
          Send
        </MUIButton>
      </form>
    </>
  );
});
