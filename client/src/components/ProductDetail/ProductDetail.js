	import React, { useEffect, useState } from 'react';
	import { useParams } from 'react-router-dom';

	import BreadCrumbs from '../BreadCrumbs/BreadCrumbs';
	import logoShipping from '../../assets/ic_shipping@2x.png';

	import './ProductDetail.scss';
	import '../../styles/commonStyles.scss';

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
		
		if (loading) return <p>Loading...</p>;
		if (error) return <p>Error: {error}</p>;
		if (!product) return <p>No product found.</p>;  // Manejar el caso cuando el producto no está cargado
		
		return (
			<div className='container-meli-content'>
				<div className='container-meli-content-section detail'>
					{product.category_path && (
						<BreadCrumbs categories={product.category_path} />
					)}
					
					<div className='container-meli-content-section-background'>
						<div className='container-meli-content-section-items'>
							<div className='content-product-details-info'>
								<div className='content-product-details-image'>
									<img src={product.picture} alt={product.title} />
								</div>
								<div className='content-product-details-texts'>
									<p className='content-product-details-texts-condition-product'>{product.condition}</p>
									<h2 className='content-product-details-texts-title-product'>{product.title}</h2>
									<div className='content-product-details-join-texts'>
										<p className='content-product-details-texts-price-product'>{product.price?.currency} {product.price?.amount.toFixed(2)}</p>
										<div className='content-product-details-shipping'>
											{
												product.free_shipping && <img src={logoShipping} alt={product.free_shipping} />
											}
										</div>
									</div>
									<button>Comprar</button>
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
		);
	}

	export default ProductDetail;
