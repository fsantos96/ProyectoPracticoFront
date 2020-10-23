import React from 'react';
import './spinner.scss';

export default function Spinner() {
    return (
        <div className="spinner-container">
            <div className="loading">
                <div className="loader"></div>
            </div>
        </div>
    );
  
}
