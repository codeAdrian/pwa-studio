import React from 'react';
import classify from 'src/classify';

import defaultClasses from './suggestedCategories.css';

const SuggestedCategories = ({ classes, searchQuery, categorySuggestions }) => (
    <ul className={classes.root}>
        {categorySuggestions.map(category => (
            <li className={classes.item} key={category.id}>
                <a href={category.url_key}>
                    <strong>{searchQuery}</strong> in {category.name}
                </a>
            </li>
        ))}
    </ul>
);

export default classify(defaultClasses)(SuggestedCategories);
