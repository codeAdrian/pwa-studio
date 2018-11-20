import React from 'react';
import { List } from '@magento/peregrine';
import SuggestedProduct from './suggestedProduct';

const SuggestedProducts = ({ items }) => (
    <List
        render="ul"
        items={items}
        getItemKey={item => item.id}
        renderItem={props => <SuggestedProduct {...props.item} />}
    />
);

export default SuggestedProducts;
