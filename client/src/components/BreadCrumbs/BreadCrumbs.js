import React from 'react';

import './BreadCrumbs.scss';

function Breadcrumbs({ categories }) {
	return (
		<ul className='container-breadcrumbs'>
			{categories.map((category, index) => (
				<React.Fragment key={category.id}>
					<li
						className='content-list'
					>
						{category.name}
					</li>
					{index < categories.length - 1 && ' > '}
				</React.Fragment>
			))}
      </ul>
    );
}

export default Breadcrumbs;
