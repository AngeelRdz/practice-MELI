import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import BreadCrumbs from '../BreadCrumbs/BreadCrumbs';

import { insertDecimal } from '../../utils/functions';

import './ProductDetail.scss';
import '../../styles/commonStyles.scss';
import '../../styles/loaders.scss';

function ProductDetail() {
	const { id } = useParams();
	const [product, setProduct] = useState({});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	
	useEffect(() => {
		const fetchProductDetails = async () => {
			setLoading(true);
			try {
				const response = await fetch(`/api/items/${id}`);
				const data = await response.json();
				console.log('data:', data);
				if (data.item) {  // Verificar si existe 'item' en la respuesta
					setProduct(data.item);
				} else {
					throw new Error("Item not found in the response");
				}
			} catch (error) {
				console.error('Error fetching product details:', error);
				setError(error.toString());
			} finally {
				setLoading(false);
			}
		};
		
		fetchProductDetails();
	}, [id]);
	
	if (error) return <p>Error: {error}</p>;
	if (!product) return <p>No product found.</p>;  // Manejar el caso cuando el producto no está cargado
	
	return (
		<div className='container-meli-content'>
			{
				loading ? (
					<div className='loader-container'>
						<div class="loader"></div>
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
													<span className='decimal-part'>{(product.price?.amount % 1).toFixed(product.price?.decimals).split('.')[1]}</span>
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
