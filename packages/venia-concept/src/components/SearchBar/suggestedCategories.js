import React from 'react';

const SuggestedCategories = ({ searchQuery, categorySuggestions }) => (
    <ul>
        {categorySuggestions.map(category => (
            <li key={category.id}>
                <a href={category.url_key}>
                    <strong>{searchQuery}</strong> in {category.name}
                </a>
            </li>
        ))}
    </ul>
);

export default SuggestedCategories;
