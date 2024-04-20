	import React, { useEffect, useState } from 'react';
	import { useParams } from 'react-router-dom';

	import BreadCrumbs from '../BreadCrumbs/BreadCrumbs';

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
			<div>
				{product.category_path && (
					<div>
						<BreadCrumbs categories={product.category_path} />
					</div>
				)}
				
				<h2>{product.title}</h2>
				<p>{product.price?.currency} {product.price?.amount.toFixed(2)}</p>
				<img src={product.picture} alt={product.title} />
				<p>Condition: {product.condition}</p>
				{product.free_shipping && <p>Free Shipping Available</p>}
				<p>{product.description}</p>
			</div>
		);
	}

	export default ProductDetail;
