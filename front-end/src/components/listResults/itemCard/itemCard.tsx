import React from 'react';
import './itemCard.scss';

class ItemCard extends React.Component {
  render() {
    return (
      <div>
        <div className="item-container">
            <div className="item-img">
                {/* cargar imagen */}
            </div>
            <div className="item-data">
                <div className="item-data-container">
                    <h1>$ 1980</h1>
                    <div className="icon-shipping"></div>
                    <div className="item-title">
                        <span>Apple ipod thouche 5g 16gb negro igual a nuevo</span>
                    </div>
                    <div>
                        <span>Completo Unico!</span>
                    </div>
                    <div className="item-location-sm">
                        <span>Completo Unico!</span>
                    </div>
                </div>
            </div>
            <div className="item-location">
                <span>Completo Unico!</span>
            </div>
        </div>
        <div className="line-divisor-container">
            <div className="line-divisor"></div>
        </div>
      </div>   
    );
  }
}

export default ItemCard;