
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Products from './components/products/Products';
import Categories from './components/categories/Categories';
import Index from './components/index/Index';
import Footer from './components/index/Footer';
import {
    BrowserRouter,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Header from './components/index/Header';
function App() {
    return (
        <BrowserRouter>
            <Header />
            <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top" >
                <div className="container">
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link to="/" className="nav-link"  >Home
                    </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/products" className="nav-link"  >Products
                    </Link>
                            </li>
                            <li>
                                <Link to="/categories" className="nav-link">Categories
                    </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <Switch>
                <Route exact path="/">
                    <Index />
                </Route>
                <Route path="/products">
                    <Products />
                </Route>
                <Route path="/categories">
                    <Categories />
                </Route>
            </Switch>
            <Footer />
        </BrowserRouter>

    );
}

export default App;
