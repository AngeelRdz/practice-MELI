import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import BreadCrumbs from '../BreadCrumbs/BreadCrumbs';

import { insertDecimal, getDecimals } from '../../utils/functions';
import { fetchProductDetails } from '../../services/apis';

import './ProductDetail.scss';
import '../../styles/commonStyles.scss';
import '../../styles/loaders.scss';

function ProductDetail() {
	const { id } = useParams();
	const [product, setProduct] = useState({});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const fetchedProduct = await fetchProductDetails(id);
                setProduct(fetchedProduct);
            } catch (error) {
                setError(error.toString());
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);
	
	if (error) return <p>Error: {error}</p>;
	if (!product) return <p>No product found.</p>;
	
	return (
		<div className='container-meli-content'>
			{
				loading ? (
					<div className='loader-container'>
						<div className="loader"></div>
					</div> 
				) : (
					<div className='container-meli-content-section detail'>
						{
							product.category_path && (
								<BreadCrumbs categories={product.category_path} />
							)
						}
						<div className='container-meli-content-section-background'>
							<div className='container-meli-content-section-items'>
								<div className='container-meli-products-section'>
									<div className='content-product-details-info'>
										<div className='content-product-details-image'>
											<img src={product.picture} alt={product.title} />
										</div>
										<div className='content-product-details-texts'>
											<p className='content-product-details-texts-condition-product'>{product.condition === 'new' ? 'Nuevo' : 'Usado'}</p>
											<h2 className='content-product-details-texts-title-product'>{product.title}</h2>
											<div className='content-product-details-join-texts'>
												<p className='content-product-details-texts-price-product'>
													{product.price?.currency} {insertDecimal(product.price?.amount)}
													<span className='decimal-part'>
														{getDecimals(product.price?.amount, product.price?.decimals)}
													</span>
												</p>
											</div>
											<button className='button-buy-product-detail'>
												Comprar
											</button>
										</div>
									</div>
									<div className='content-product-details-description'>
										<h3 className='content-product-details-description-title'>Descripción del producto</h3>
										<p className='content-product-details-texts-description-product'>
											{product.description}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				)
			}
		</div>
	);
}

export default ProductDetail;
