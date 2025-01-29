import { useEffect, useState } from 'react';

type Product = {
    id: number;
    name: string;
    price: number;
    category: string;
    image: string;
};

function ProductCard() {
    const [products, setProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetch('products.json')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Sikertelen fetch!');
                }
                return response.json();
            })
            .then((data) => {
                if (Array.isArray(data.products)) { 
                    setProducts(data.products);
                } else {
                    console.error('HIBA! Rossz adatmodell!!');
                }
            })
            .catch((error) => console.error(error));
    }, []);

    const handleSearch = () => {
        const results = products.filter((product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (results.length > 0) {
            setFilteredProducts(results);
            setErrorMessage('');
        } else {
            setFilteredProducts([]);
            setErrorMessage('No product found with the given name.');
        }
    };

    return (
        <div className="App">
            <div className="product-card">
                <div className="search-section">
                    <label htmlFor="search">Enter product name:</label>
                    <input
                        type="text"
                        id="search"
                        placeholder="Enter product name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button onClick={handleSearch}>Search</button>
                </div>

                <div className="results-section">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <div key={product.id} className="product-info">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="product-image"
                                />
                                <div className="product-details">
                                    <p>ID: {product.id}</p>
                                    <p>Name: {product.name}</p>
                                    <p>Price: ${product.price}</p>
                                    <p>Category: {product.category}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        errorMessage && <div className="error">{errorMessage}</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
