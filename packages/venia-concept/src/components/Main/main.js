import React, { Component } from 'react';
import { bool, shape, string } from 'prop-types';

import classify from 'src/classify';
import Footer from 'src/components/Footer';
import Header from 'src/components/Header';
import defaultClasses from './main.css';

class Main extends Component {
    static propTypes = {
        classes: shape({
            page: string,
            page_masked: string,
            root: string,
            root_masked: string
        }),
        isMasked: bool
    };

    get classes() {
        const { classes, isMasked } = this.props;
        const suffix = isMasked ? '_masked' : '';

        return ['page', 'root'].reduce(
            (acc, val) => ({ ...acc, [val]: classes[`${val}${suffix}`] }),
            {}
        );
    }

    render() {
        const { classes, props } = this;
        const { children } = props;

        return (
            <main className={classes.root}>
                <Header style={{ flex: 1 }} />
                <div style={{ flex: 2 }}>{children}</div>
                <Footer style={{ flex: 1 }} />
            </main>
        );
    }
}

export default classify(defaultClasses)(Main);
