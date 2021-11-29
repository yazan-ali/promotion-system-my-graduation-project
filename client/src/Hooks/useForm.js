import { useState } from 'react';

function useForm(initValue = {}) {

    const [state, setState] = useState(initValue);

    const handleChange = (evt) => {
        setState({ ...state, [evt.target.name]: evt.target.value });
    }

    const reset = () => {
        let restesInputs = {}
        for (let val in state) {
            restesInputs[val] = ""
        }
        setState(restesInputs);
    }

    return [state, handleChange, reset];
}

export default useForm;