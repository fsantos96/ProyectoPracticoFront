import React, { useState } from 'react';
import './searchItem';

export default function SearchItems(props : any)  {
    const [formData, setFormData] = useState(defaultFormValue());
    const handlerOnChange = (event : any) => {
        setFormData({
            ...formData,
            [event.target.name] : event.target.value
        })
    }

    const handlerOnSubmit = (event : any) => {
        props.submitSearch(formData.searchText);
        event.preventDefault();
    }

    return (
        <form role="search" onSubmit={handlerOnSubmit}>
            <input type="text" name="searchText" className="search-input" onChange={handlerOnChange} placeholder="Nunca dejes de buscar"/>
            <button className="search-input-button" type="submit"><div role="img" aria-label="Buscar"></div></button>
        </form>
    );
}

function defaultFormValue() {
    return {
        searchText: ""
    }
}
