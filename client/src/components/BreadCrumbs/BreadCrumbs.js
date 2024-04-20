import React, { useEffect, useState } from 'react';

function Breadcrumbs({ categories }) {
	return (
		<div>
			{categories.map((category, index) => (
				<React.Fragment key={category.id}>
					<a href={`/category/${category.id}`}>{category.name}</a>
					{index < categories.length - 1 && ' > '}
				</React.Fragment>
			))}
      </div>
    );
}

export default Breadcrumbs;
