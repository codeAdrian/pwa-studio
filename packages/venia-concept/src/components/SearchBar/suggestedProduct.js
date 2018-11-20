import React from 'react';
import { Price } from '@magento/peregrine';
import { makeProductMediaPath } from 'src/util/makeMediaPath';

const productUrlSuffix = '.html';

const suggestedProduct = ({ url_key, small_image, name, price }) => (
    <li>
        <a href={`/${url_key}${productUrlSuffix}`}>
            <img alt={name} src={makeProductMediaPath(small_image)} />
        </a>
        <a href={`/${url_key}${productUrlSuffix}`}>{name}</a>
        <a href={`/${url_key}${productUrlSuffix}`}>
            <Price
                currencyCode={price.regularPrice.amount.currency}
                value={price.regularPrice.amount.value}
            />
        </a>
    </li>
);

export default suggestedProduct;
