import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PostData } from '../utils/PostData';
import Header from '../components/Header';
import { Spinner } from 'react-bootstrap';
import '../assets/css/products.css';


function Products() {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                const result = await PostData('get-all-products.php', {});

                if (!result.status) {
                    setError(result.error);
                } else {
                    setProducts(result.data);
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <Header />
            <main className='products-wrapper'>
                <div className='search-products'>
                    <h3>Groundwork and Surfaces</h3>
                    <div>
                        <input type="text" className='input-search' />
                        <button className='search-product-btn'>Search</button>
                    </div>
                </div>

                <div className='sales-description'>
                    <h3 className='sales-and-installation'>SALES & INSTALLATION</h3>
                    <p className='sales-paragraph'>
                        Hanit recycled plastic flooring solutions are permanently weatherproof and rot-proof without time-consuming maintenance work and will still look good for years to come. The material is also especially robust compared to other solutions, and it's UV-resistant and splinter-free. This keeps the risk of injury when working with the material and during subsequent use to a minimum. Kids can play outside safely and run around barefoot on hanit without the risk of splinters.
                    </p>
                </div>

                <div className='product-banner-container'>
                    <img src="/assets/images/products-banner.png" alt="product banner" />
                </div>

                {loading ?
                    (
                        <section className='loading'>
                            <Spinner></Spinner>
                        </section>
                    ) : error ? (
                        <section className='loading'>
                            {error}
                        </section>
                    ) : (
                        <section className='products-section'>
                            {products.length > 0 ? (
                                products.map((product) => {
                                    // Check if product.images exists and has at least one item
                                    const imageUrl = product.images && product.images.length > 0 ? product.images[0].url : '/assets/images/product-1.png';

                                    return (
                                        <div className='product' key={product.id}>
                                            <img className='product-img' src={imageUrl} alt={product.name || "product"} />
                                            <div className='detail-section'>
                                                <h3 className='m-0'>{product.name}</h3>
                                                <div className='product-tags'>
                                                    <div className='hanpave'>
                                                        Hanpave
                                                    </div>
                                                    <div className='marking-element'>
                                                        Marking Element
                                                    </div>
                                                </div>
                                                <div className='product-quaintly-container'>
                                                    <Link to={`/product/${product.id}`} className='get-quote-btn'>View Item</Link>
                                                </div>
                                                <div>
                                                    Item Number: <span className='item-number'>{product.item_variations[0]?.sku || "N/A"}</span>
                                                </div>
                                                <div>
                                                    <p>{product.description || "No description available"}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            ) : (
                                <p>No products available</p>
                            )}
                        </section>

                    )}
            </main>
        </>
    )
}

export default Products;