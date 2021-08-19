// import logo from './logo.svg';
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Title from './components/title/Title';
import Item from './components/item/Item';
import Cart from './components/cart/Cart';
import { Link, Route, withRouter } from 'react-router-dom';
import Search from './components/search/Search';
import { FaCartPlus, FaSort, FaFilter, FaArrowLeft } from 'react-icons/fa';
export const shopContext = React.createContext();
const filterList = [
  { id: 1, name: 'high-low', label: 'Price - High Low'},
  { id: 2, name: 'low-high', label: 'Price - Low High'},
  { id: 3, name: 'discount', label: 'Discount'}
];
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          name: "Samsung Series 4",
          image: "https://rukminim1.flixcart.com/image/670/600/allinone-desktop/d/n/q/apple-imac-21-5-inch-4k-retina-core-i5-3-1ghz-8gb-1tb-intel-iris-original-imaeh5h83fuzbksz.jpeg?q=90", price: { actual: 14175, display: 22500 }, discount: 37
        }, {
          name: "Samsung Super 6", image: "https://rukminim1.flixcart.com/image/670/600/allinone-desktop/d/n/q/apple-imac-21-5-inch-4k-retina-core-i5-3-1ghz-8gb-1tb-intel-iris-original-imaeh5h83fuzbksz.jpeg?q=90",
          price: { actual: 36126, display: 66900 },
          discount: 46
        },
        {
          name: "Samsung The Frame",
          image: "https://rukminim1.flixcart.com/image/670/600/allinone-desktop/d/n/q/apple-imac-21-5-inch-4k-retina-core-i5-3-1ghz-8gb-1tb-intel-iris-original-imaeh5h83fuzbksz.jpeg?q=90",
          price: { actual: 85696, display: 133900 },
          discount: 36
        },
        {
          name: "Thomson B9 Pro",
          image: "https://rukminim1.flixcart.com/image/670/600/allinone-desktop/d/n/q/apple-imac-21-5-inch-4k-retina-core-i5-3-1ghz-8gb-1tb-intel-iris-original-imaeh5h83fuzbksz.jpeg?q=90",
          price: { actual: 10029.41, display: 16999 },
          discount: 41
        },
        {
          name: "LG Ultra HD",
          image: "https://rukminim1.flixcart.com/image/670/600/allinone-desktop/d/n/q/apple-imac-21-5-inch-4k-retina-core-i5-3-1ghz-8gb-1tb-intel-iris-original-imaeh5h83fuzbksz.jpeg?q=90",
          price: { actual: 407149.1, display: 79990 },
          discount: 50
        },
        {
          name: "Vu Ready LED TV",
          image: "https://rukminim1.flixcart.com/image/670/600/allinone-desktop/d/n/q/apple-imac-21-5-inch-4k-retina-core-i5-3-1ghz-8gb-1tb-intel-iris-original-imaeh5h83fuzbksz.jpeg?q=90",
          price: { actual: 8160, display: 17e3 },
          discount: 52
        },
        {
          name: "Koryo Android TV",
          image: "https://rukminim1.flixcart.com/image/670/600/allinone-desktop/d/n/q/apple-imac-21-5-inch-4k-retina-core-i5-3-1ghz-8gb-1tb-intel-iris-original-imaeh5h83fuzbksz.jpeg?q=90",
          price: {
            actual: 57997.1,
            display: 199990
          },
          discount: 71
        },
        {
          name: "Micromax LED Smart",
          image: "https://rukminim1.flixcart.com/image/670/600/allinone-desktop/d/n/q/apple-imac-21-5-inch-4k-retina-core-i5-3-1ghz-8gb-1tb-intel-iris-original-imaeh5h83fuzbksz.jpeg?q=90",
          price: { actual: 10076.4, display: 27990 },
          discount: 64
        }
      ],
      selectedItems: [],
      searchValue: '',
      showModal: false,
      minPrice: 0,
      maxPrice: 0,
      Price: 0,
      selectedPrice: 0,
      showSort: false,
      showFilters: false,
      selectedFilter: '',
      pathName: '',
      activeLink: null,
      timer: true
    }
  }
  addItem = (item) => {
    this.setState({timer: true});
    let { selectedItems } = this.state;
    let updatedItems;
    if (!!selectedItems.find(obj => obj.name === item.name)) {
      updatedItems = selectedItems.map(obj => {
        if (item.name === obj.name) {
          obj.quantity += 1;
        }
        return obj
      })
    } else {
      item['quantity'] = 1;
      updatedItems = [...selectedItems, item]
    }
    setTimeout(()=>{
      this.setState({timer: false});
    },3000)
    this.setState({ selectedItems: updatedItems })
  }
  removeItem = (item) => {
    let { selectedItems } = this.state;
    let updatedItems = selectedItems.map((ele, ind) => {
      if (item.name === ele.name) {
        ele.quantity -= 1;
      }
      return ele
    }).filter(ele => ele.quantity !== 0);
    this.setState({ selectedItems: updatedItems });
  }
  countChange = (item, e) => {
    let selectedItems = this.state.selectedItems;
    if (item.quantity >= 1) {
      selectedItems.map((ele, ind) => {
        if (ele.name === item.name) {
          ele.quantity = e.target.value;
          return ele
        } else {
          return ele
        }
      })
    }
    this.setState({ selectedItems: selectedItems });
  }
  filter = (val) => {
    this.setState({ searchValue: val });
  }
  filterItems = (val) => {
    let sortItems = this.state.items.sort((a, b) => {
      if (val === 'high-low') {
        return b.price.actual - a.price.actual
      } else if (val === 'low-high') {
        return a.price.actual - b.price.actual
      } else if (val === 'discount') {
        return b.discount - a.discount
      }
      return a
    });
    this.setState({ items: sortItems, showModal: false, activeLink: val });
  }
  handleShow = (val) => {
    if (val === 'sort') {
      this.setState({ showSort: true, showFilters: false });
    } else if (val === 'filters') {
      this.setState({ showSort: false, showFilters: true });
    }
    this.setState({ showModal: !this.state.showModal });
  }
  handleClose = () => this.setState({ showModal: !this.state.showModal });
  minMaxPrice = (e) => {
    document.getElementById('volume').value = e.target.value;
    this.setState({ selectedPrice: e.target.value })
  }
  applyPriceRange = () => {
    let rangeValue = document.getElementById('volume').value;
    console.log('rangeValue', rangeValue);
    this.setState({ showModal: false, Price: this.state.selectedPrice, selectedPrice: rangeValue });
  }
  onChangeSort = (event) => {
    this.setState({ selectedFilter: event.target.value });
  }
  componentDidMount() {
    // let rangeValue = document.getElementById('volume').value;
    // console.log('rangeValue', rangeValue);
    let minTomax;
    minTomax = this.state.items.sort((a, b) => a.price.display - b.price.display);
    this.setState({ pathName: window.location.pathname, minPrice: minTomax[0].price.display, selectedPrice: minTomax[0].price.display, Price: (minTomax[minTomax.length - 1].price.display), maxPrice: minTomax[minTomax.length - 1].price.display })
  }
  render() {
    const { items } = this.state;
    const { selectedItems } = this.state;
    const { Price } = this.state;
    const { history } = this.props;
    return (
      <shopContext.Provider value={{ addItem: this.addItem, removeItem: this.removeItem, countChange: this.countChange, filter: this.filter, cartList: selectedItems }}>
        <div className="App">
          <header className="main-head">
          <Link to={`${process.env.PUBLIC_URL}/`}>

            <span className="logo">POC</span>
          </Link>
            {
              selectedItems.length > 0 && history.location.pathname !== '/cart' && this.state.timer?
                <Title label={selectedItems[selectedItems.length - 1].name + ' added to cart'} className="added-item" />
                : null
            }
            {
              history.location.pathname !== '/cart' &&
              <span className="product-search">
                <Search />
              </span>
            }
          </header>
          <main>
            <Link to={`${process.env.PUBLIC_URL}/`}></Link>
            {
              !history.location.pathname.includes('/cart') ?
                <Link to={`${process.env.PUBLIC_URL}/cart`} className="cart-link">
                  <span className="cart-icon"><FaCartPlus /><span className="cart-count">{selectedItems ? selectedItems.length : null}</span></span>
                </Link> :
                <Link to={`${process.env.PUBLIC_URL}/`} className="back">
                  <span className="back-icon" title="Back"><FaArrowLeft /></span>
                </Link>
            }
            <Route exact={true} path={`${process.env.PUBLIC_URL}/`} >
              <section className="section">
                {
                  window.innerWidth > 767 ?
                    <div className="section-left">
                      <div className="range-slider">
                        <h6>Filter</h6>
                        <input value={this.state.selectedPrice} onChange={(e) => this.minMaxPrice(e)} className="range-control" title={this.state.Price} type="range" id="volume" name="volume" min={this.state.minPrice} max={this.state.maxPrice} />
                        <div className="prices-range">
                          <span>${this.state.minPrice}</span>
                          <span>${this.state.selectedPrice}</span>
                          <span>${this.state.maxPrice}</span>
                        </div>
                        <button className="btn btn-primary" onClick={() => this.applyPriceRange()}>Apply</button>
                      </div>
                    </div>
                    : null
                }
                <div className="section-right">
                  {
                    window.innerWidth < 767 ?
                      <div className="mobile-filters">
                        <span onClick={() => this.handleShow('sort')}><FaSort />Sort</span>
                        <span onClick={() => this.handleShow('filters')}><FaFilter />Filter</span>
                      </div>
                      : null
                  }
                  <Modal show={this.state.showModal} onHide={this.handleClose} animation={false}>
                    <Modal.Body>
                      {
                        this.state.showSort ?
                          <div className="range-slider">
                            <h6>Filter Options</h6>
                            <input value={this.state.selectedPrice} onChange={(e) => this.minMaxPrice(e)} className="range-control" title={this.state.Price} type="range" id="volume" name="volume" min={this.state.minPrice} max={this.state.maxPrice} />
                            <div className="prices-range">
                              <span>${this.state.minPrice}</span>
                              <span>${this.state.selectedPrice}</span>
                              <span>${this.state.maxPrice}</span>
                            </div>
                          </div>
                          : null
                      }
                      {
                        this.state.showFilters ?
                          <div onChange={this.onChangeSort.bind(this)}>
                            <h6>Sort Options</h6>
                            <div>
                              <label><input type="radio" name="filters" value="high-low" /> Price - High Low</label>

                            </div>
                            <div>
                              <label><input type="radio" name="filters" value="low-high" /> Price - Low High</label>

                            </div>
                            <div>
                              <label><input type="radio" name="filters" value="discount" /> Discount</label>

                            </div>
                          </div>
                          : null
                      }
                    </Modal.Body>
                    <Modal.Footer className="modalFooter">
                      <Button variant="light" onClick={this.handleClose}>
                        Cancel
                      </Button>
                      {
                        this.state.showSort ?
                          <Button variant="light" onClick={() => this.applyPriceRange()}>
                            Apply
                          </Button> :
                          <Button variant="light" onClick={() => this.filterItems(this.state.selectedFilter)}>
                            Apply
                          </Button>
                      }
                    </Modal.Footer>
                  </Modal>
                  {
                    window.innerWidth > 767 ?
                      <ul className="filter-list">
                        <li><b>Sort by</b></li>
                        {
                          filterList.map((item, ind) =>
                            <li key={item.name} className={item.name === this.state.activeLink ? 'active-filter' : ''} onClick={() => this.filterItems(item.name)}><span >{item.label}</span></li>

                          )
                        }
                      </ul>
                      : null
                  }
                  <div className="products">
                    <div className="cart-left">
                      {
                        items ?
                          items.filter(item => ((item.price.display <= Price) && (item.name.toLowerCase().includes(this.state.searchValue.toLowerCase())))).map((item, index) =>
                            <Item key={item.name} item={item} />
                          ) : null
                      }
                    </div>
                  </div>
                </div>
              </section>
            </Route>
            <Route path={`${process.env.PUBLIC_URL}/cart`} component={Cart}>
              <Cart cartList={this.state.selectedItems} /></Route>
          </main>
        </div>
      </shopContext.Provider>
    );
  }
}

export default withRouter(App);
