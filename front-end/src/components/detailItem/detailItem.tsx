import { render } from '@testing-library/react';
import React from 'react';
import Breadcrumb from '../common/UI/breadcrumb/breadcrumb'
import { ApiUrl } from '../common/apiConfig'
import Spinner from '../common/UI/spinner/spinner'
import axios from 'axios'
import './detailItem.scss';
import { connect } from 'http2';

class DetailItem extends React.Component<IDetailItemProps, IDetailItemState> {
  constructor(props : any) {
    super(props);
    this.state = {
      isLoading: true,
      item: null
    };
  }

  formatPrince = (price : string, decimals : number) => {
    return parseFloat(price).toFixed(decimals);
  }

  componentDidMount() {
    const fetchItems = async () => {
      let url : string = ApiUrl + "items/" + this.props.match.params.id;

      const result = await axios(
        url
      )
      console.log(result)
      this.setState({isLoading: false, item: result.data });
    }

    fetchItems()
  }

  render() {
    let content;
    if(this.state.isLoading) {
      content = (
        <div className="main-container">
          <div className="breadcrumb-container">
            <Breadcrumb categories={this.props.categories}></Breadcrumb>
          </div>
          <div className="route-view-container">
            <Spinner></Spinner>
          </div>
        </div>
      );
    } else {
      let priceFormated = this.formatPrince(this.state.item.price.amount, this.state.item.price.decimals);
      content = (
        <div className="main-container">
          <div className="breadcrumb-container">
            <Breadcrumb categories={this.props.categories}></Breadcrumb>
          </div>
          <div className="route-view-container">
            <div className="detail-padding">
              <div className="detail-container">
                <div className="detail-img-container">
                  <div className="img-container">
                    <img src={this.state.item.picture} alt={'imagen de ' + this.state.item.title}></img>
                  </div>
                </div>
                <div className="detail-item-data">
                  <div className="detail-state">
                    <span>{this.state.item.condition == 'new' ? 'Nuevo' : 'Usado'} - {this.state.item.sold_quantity > 1 ? this.state.item.sold_quantity + ' Vendidos' : this.state.item.sold_quantity + ' Vendido' }</span>
                  </div>
                  <div className="detail-title">
                    <span>{this.state.item.title}</span>
                  </div>
                  <div className="detail-price">
                    <span>{this.state.item.price.currency} {priceFormated}</span>
                  </div>
                  <div className="detail-button">
                    <button type="button" className=""><span>Comprar</span></button>
                  </div>
                </div>
              </div>
              <div className="detail-description-container">
                <div>
                  <h1>Descripcion del producto</h1>
                </div>
                <div className="description-body">
                  <p>{this.state.item.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } 

    return content;
  }
  
}

interface IDetailItemProps {
  categories?: any,
  setCategories?: any
  match: any
}

interface IDetailItemState {
  isLoading?: boolean;
  categories?: Array<any>;
  item?: any;
}
export default DetailItem;
