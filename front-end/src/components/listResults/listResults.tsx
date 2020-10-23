import React from 'react';
import ItemCard from './itemCard/itemCard'
import Spinner from '../common/UI/spinner/spinner'
import Breadcrumb from '../common/UI/breadcrumb/breadcrumb'
import { Link } from 'react-router-dom';
import axios from 'axios'
import './listResults.scss';
import { ApiUrl } from '../common/apiConfig';

//Este componente fue creado como clase para usar el componentDidMount
class ListResults extends React.Component<IListResultProps, IListResultState> {
  constructor(props : any) {
    super(props);
    this.state = {
      isLoading: true,
      categories: [],
      items: []
    };
  }

  componentDidMount() {
    const fetchItems = async () => {
      let amountResult : number = 4
      let searchText : string = this.props.location.search.split("search=")[1];
      let url : string = ApiUrl + "items?searchText=" + searchText + "&amountResults=" + amountResult;

      const result = await axios(
        url
      )
      this.props.setCategories(result.data.categories);
      this.setState({isLoading: false, items: result.data.items, categories: result.data.categories });
    }

    fetchItems()
  }

  renderCards = () => {
    return this.state.items.map((item : any, index : number) => {
      let content;
      item.priceFormated = this.formatPrince(item.price.amount, item.price.decimals);
      if(index == this.state.items.length - 1) {
        content = (
          <Link to={`/items/` + item.id} key={item.id}>
            <ItemCard data={item} categories={this.state.categories}></ItemCard>
          </Link>
        );
      } else {
        content = (
          <Link to={`/items/`+ item.id} key={item.id}>
            <ItemCard data={item}></ItemCard>
            <div className="line-divisor-container">
              <div className="line-divisor"></div>
            </div>
          </Link>
        )
      }
      return content
    });
  };

  formatPrince = (price : string, decimals : number) => {
    return parseFloat(price).toFixed(decimals);
}

  render() {
    let content;
    if(this.state.isLoading) {
      content = <Spinner></Spinner>
    } else {
      content = (
        <div className="main-container">
          <div className="breadcrumb-container">
            <Breadcrumb categories={this.state.categories}></Breadcrumb>
          </div>
          <div className="route-view-container">
            {this.renderCards()}
          </div>
        </div>
      );
    }
    return content;
  }
}

interface IListResultProps {
  location?: any,
  categories?: any,
  setCategories: any
}

interface IListResultState {
  isLoading?: boolean;
  items: Array<any>,
  categories: Array<any>
}

export default ListResults;