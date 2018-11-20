import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import classify from 'src/classify';
import SuggestedCategories from './suggestedCategories';
import SuggestedProducts from './suggestedProducts';

import defaultClasses from './autocomplete.css';

const searchAutocompleteQuery = gql`
    query($inputText: String) {
        products(search: $inputText) {
            items {
                id
                name
                small_image
                url_key
                categories {
                    url_key
                    id
                    name
                }
                price {
                    regularPrice {
                        amount {
                            value
                            currency
                        }
                    }
                }
            }
        }
    }
`;

class SearchAutocomplete extends Component {
    createCategorySuggestions = items =>
        items
            .map(item => item.categories)
            .reduce(
                (allCategories, category) => allCategories.concat(category),
                []
            )
            .filter(
                (category, index, categories) =>
                    categories.indexOf(category) === index
            );

    render() {
        const { searchQuery, classes } = this.props;
        const { createCategorySuggestions } = this;

        if (!searchQuery) return null;

        return (
            <Query
                query={searchAutocompleteQuery}
                variables={{
                    inputText: searchQuery
                }}
            >
                {({ loading, error, data }) => {
                    if (error) return <div>Data Fetch Error</div>;
                    if (loading) return <div>Fetching Data</div>;

                    const { items } = data.products;

                    if (items.length <= 0) return null;

                    const categorySuggestions = createCategorySuggestions(
                        items
                    );

                    return (
                        <div className={classes.root}>
                            <SuggestedCategories
                                searchQuery={searchQuery}
                                categorySuggestions={categorySuggestions}
                            />
                            <SuggestedProducts items={data.products.items} />
                        </div>
                    );
                }}
            </Query>
        );
    }
}

export default classify(defaultClasses)(SearchAutocomplete);
