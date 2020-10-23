import React, { useState } from 'react';
import { Link} from 'react-router-dom';
import { createHashHistory } from "history";
import './searchItem';

export default function SearchItems(props : any)  {
    const history = createHashHistory();
    const [formData, setFormData] = useState(defaultFormValue());
    const handlerOnChange = (event : any) => {
        setFormData({
            ...formData,
            [event.target.name] : event.target.value
        })
    }

    const handlerOnSubmit = (event : any) => {
        event.preventDefault();
    }

    return (
        <form role="search" onSubmit={handlerOnSubmit}>
            <input type="text" name="searchText" className="search-input" onChange={handlerOnChange} placeholder="Nunca dejes de buscar"/>
            <Link to={`/items?search=${formData.searchText}`}>
                <button className="search-input-button" type="submit"><div role="img" aria-label="Buscar"></div></button>
            </Link>
        </form>
    );
}

function defaultFormValue() {
    return {
        searchText: ""
    }
}
