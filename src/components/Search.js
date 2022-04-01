import React from 'react'
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { useForm } from '../hooks/useForm';

export const Search = ({onSubmit}) => {

    const [formValues, handleInputChange] = useForm({
        filter: ''
    });

    const { filter } = formValues;

    const handleSubmit = (e) => {
      e.preventDefault();

      onSubmit(filter);
    }
    
  return (
    <form onSubmit={handleSubmit}>
        <InputGroup>
            <FormControl name='filter' placeholder='Search news...' value={filter} onChange={handleInputChange}></FormControl>
            <Button type='submit'>Search</Button>
        </InputGroup>
    </form>
  )
}
