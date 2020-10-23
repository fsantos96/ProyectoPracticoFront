import React from 'react';
import Breadcrumb from '../common/UI/breadcrumb/breadcrumb';
import { ApiUrl } from '../common/apiConfig';
import Spinner from '../common/UI/spinner/spinner';
import axios from 'axios';
import './detailItem.scss';
import Navbar from '../common/UI/navbar/navBar';
import { Redirect } from "react-router";

class DetailItem extends React.Component<IDetailItemProps, IDetailItemState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: true,
      categories: [],
      item: null,
      searchText: ""
    };
  }

  formatPrince = (price: string, decimals: number) => {
    return parseFloat(price).toFixed(decimals);
  }

  componentDidMount() {
    this.fetchItems()
  }

  handlerSubmit = (value : string) => {
    this.setState({searchText : value});
  }

  fetchItems = async (value? : string) => {
    let url: string = ApiUrl + "items/" + this.props.match.params.id;

    const result = await axios(
      url
    )

    this.setState({ isLoading: false, item: result.data, categories: result.data.categories });
  }

  render() {
    let content;
    if(this.state.searchText) {
      return <Redirect to={"/items?search=" + this.state.searchText}/>
    }
    if (this.state.isLoading) {
      content = (
        <>
          <header className="nav-bar">
            <Navbar></Navbar>
          </header>
          <main>
            <div className="main-container">
              <div className="breadcrumb-container">
                <Breadcrumb categories={this.state.categories}></Breadcrumb>
              </div>
              <div className="route-view-container">
                <Spinner></Spinner>
              </div>
            </div>
          </main>
        </>
      );
    } else {
      let priceFormated = this.formatPrince(this.state.item.price.amount, this.state.item.price.decimals);
      content = (
        <>
          <header className="nav-bar">
            <Navbar submitSearch={this.handlerSubmit}></Navbar>
          </header>
          <main>
            <div className="main-container">
              <div className="breadcrumb-container">
                <Breadcrumb categories={this.state.categories}></Breadcrumb>
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
                        <span>{this.state.item.condition == 'new' ? 'Nuevo' : 'Usado'} - {this.state.item.sold_quantity > 1 ? this.state.item.sold_quantity + ' Vendidos' : this.state.item.sold_quantity + ' Vendido'}</span>
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
          </main>
        </>
      )
    }

    return content;
  }

}

interface IDetailItemProps {
  match: any
}

interface IDetailItemState {
  isLoading?: boolean;
  categories?: Array<any>;
  item?: any;
  searchText?: string
}
export default DetailItem;
