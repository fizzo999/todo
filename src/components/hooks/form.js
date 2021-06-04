import { useState } from 'react';

const useForm = (action) => {
  const [values, setValues] = useState({});

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    // if (e) e.persist();
    action(values); // values is the data that lives in state - so its like this.state.values

  }

  const handleChange = (e) => {
    // e.persist();
    setValues(values => ({...values, [e.target.name]: e.target.value }));// and this is like tripple hot:
    // we are setting the state to spread the past values and then add key-value pairs from any input that sit inside the form
  }

  const handleInput = {
    onChange: (e) => {
      // e.persist();
      setValues(values => ({...values, [e.target.name]: e.target.value}));
    }
  }

  return [
    handleSubmit,
    handleInput,
    handleChange,
    values
  ]
}

export default useForm;
