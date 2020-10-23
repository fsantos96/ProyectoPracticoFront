import React, { useState } from 'react';
import Navbar from '../common/UI/navbar/navBar';
import { Redirect } from "react-router";

export default function Home(props : any) {
    const [searchText, setSearchText] = useState("");
    const handlerSubmit = (value : string) => {
        setSearchText(value);
    }

    if(searchText) {
        return <Redirect to={"/items?search=" + searchText}/>
    }
    return (
        <> 
            <header className="nav-bar">
                <Navbar submitSearch={handlerSubmit}></Navbar>
            </header>
            <main>

            </main>
        </>
    );
  
}
