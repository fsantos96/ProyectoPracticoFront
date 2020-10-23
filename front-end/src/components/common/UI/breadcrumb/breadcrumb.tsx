import React from 'react';
import './breadcrumb.scss';

export default function Breadcrumb(props :any) {
    const getBreadcrumbRendered = (props : any) => {
        return props.categories.map((category : any, index : number) => {
            let content;
            if(index == props.categories.length - 1) {
                content = (
                <div key={category.id} className="breadcrumb-item">
                    <span>{category.name}</span>
                </div> 
                );
            } else {
                content = (
                <div key={category.id} className="breadcrumb-item">
                    <span>{category.name}</span>
                    <span className="icon-chevron-right"></span>
                </div>
                )
            }
            return content
        });
    }
  
    return  (
       <div className="breadcrumb">
        {getBreadcrumbRendered(props)}
       </div>
    );  
}