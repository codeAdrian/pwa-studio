import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classify from 'src/classify';
import ColorOption from '../ColorOption';
import Icon from 'src/components/Icon';
import defaultClasses from './filterOption.css';

const circleIconAttrs = {
    width: 12,
    fill: 'black',
    color: 'white'
};

class FilterOption extends Component {
    static propTypes = {
        classes: PropTypes.shape({
            root: PropTypes.string
        }),
        item: PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
            items: PropTypes.array,
            RenderOption: PropTypes.func
        }),
        chosenFilterOptions: PropTypes.array,
        updateChosenFilterOptions: PropTypes.func,
        isExpanded: PropTypes.bool
    };

    get getCounter() {
        const { classes, chosenFilterOptions } = this.props;
        const chosenOptionsCount = chosenFilterOptions.length;

        return chosenOptionsCount ? (
            <button onClick={this.resetChosenItems} className={classes.counter}>
                X icon
                <span className={classes.counterNumber}>
                    {chosenOptionsCount}
                </span>
            </button>
        ) : null;
    }

    resetChosenItems = () => {
        this.updateChosenItems([]);
    };

    optionToggle = () => {
        const {
            toggleOption,
            item: { name }
        } = this.props;
        toggleOption(name);
    };

    updateChosenItems = actualItems => {
        const { updateChosenFilterOptions } = this.props;
        updateChosenFilterOptions(actualItems);
    };

    render() {
        const {
            classes,
            item: { name, filter_items, request_var },
            chosenFilterOptions,
            isExpanded
        } = this.props;
        const chosenOptions = chosenFilterOptions;

        const RenderOption = ColorOption;

        return (
            <div className={classes.root}>
                <div className={classes.optionHeader}>
                    <div className={classes.optionName}>{name}</div>
                    <div className={classes.counterAndCloseButtonContainer}>
                        {this.getCounter}
                        <button
                            onClick={this.optionToggle}
                            className={classes.optionToggleButton}
                        >
                            Arrow Icon
                        </button>
                    </div>
                </div>
                {isExpanded ? (
                    <RenderOption
                        id={request_var}
                        items={filter_items}
                        chosenOptions={chosenOptions}
                        updateChosenItems={this.updateChosenItems}
                    />
                ) : null}
            </div>
        );
    }
}

export default classify(defaultClasses)(FilterOption);
