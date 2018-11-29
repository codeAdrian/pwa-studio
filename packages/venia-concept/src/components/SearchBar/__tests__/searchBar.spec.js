import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { SearchBar } from '../searchBar';

configure({ adapter: new Adapter() });

const classes = {
    searchBlockOpen: 'open',
    searchBlock: 'closed',
    clearIcon: 'hidden',
    clearIconOpen: 'visible'
};

/* Using mount to simulate event propagation - submitting via native form onsubmit event */
test('When the search bar is expanded, pressing the Enter key will submit.', async () => {
    let wrapper = mount(<SearchBar classes={classes} isOpen={true} />);
    const searchInput = wrapper.find('input');
    const spy = jest
        .spyOn(wrapper.instance(), 'handleSearchSubmit')
        .mockImplementation(event => {
            if (
                event.type === 'submit' &&
                searchInput.instance().value !== ''
            ) {
                return true;
            } else {
                return false;
            }
        });
    wrapper.instance().forceUpdate();
    searchInput.instance().value = 'a';
    searchInput.simulate('change');
    searchInput.simulate('submit');
    expect(spy).toHaveReturnedWith(true);
});

/* Using mount to simulate event propagation - submitting via native button with type submit */
test('When the search icon is clicked, the query in the input component will be submitted.', async () => {
    let wrapper = mount(<SearchBar classes={classes} isOpen={true} />);
    const searchInput = wrapper.find('input');
    const searchButton = wrapper.find('button[type="submit"]').at(0);
    const spy = jest
        .spyOn(wrapper.instance(), 'handleSearchSubmit')
        .mockImplementation(event => {
            if (
                event.type === 'submit' &&
                searchInput.instance().value !== ''
            ) {
                return true;
            } else {
                return false;
            }
        });
    wrapper.instance().forceUpdate();
    searchInput.instance().value = 'a';
    searchInput.simulate('change');
    searchButton.simulate('submit');
    expect(spy).toHaveReturnedWith(true);
});

/* Using mount to simulate event propagation - submitting via pressing enter in search input */
test('When the input component is empty, search submit will not be called.', async () => {
    const mockExecuteSearch = jest.fn();
    let wrapper = mount(
        <SearchBar
            classes={classes}
            isOpen={true}
            executeSearch={mockExecuteSearch}
        />
    );

    const spy = jest
        .spyOn(wrapper.instance(), 'handleSearchSubmit')
        .mockImplementation(event => {
            if (
                event.type === 'submit' &&
                searchInput.instance().value !== ''
            ) {
                return true;
            } else {
                return false;
            }
        });

    const searchInput = wrapper.find('input');
    const searchForm = wrapper.find('form');
    wrapper.instance().forceUpdate();
    searchInput.simulate('change', { currentTarget: { value: '' } });
    searchForm.simulate('submit', { preventDefault: () => {} });
    expect(spy).toHaveReturnedWith(false);
});

test('When url is pointed to search results page, the search input will get its value from the url.', async () => {
    let wrapper = shallow(<SearchBar classes={classes} isOpen={true} />);
    wrapper.setProps({
        history: {
            location: { pathname: '/search.html', search: '?query=dress' }
        },
        location: {
            pathname: '/search.html',
            search: '?query=dress'
        }
    });
    wrapper.instance().componentDidMount();
    const searchInput = wrapper.find('input');
    expect(searchInput.props().value).toBe('dress');
});

test('When the clear button is pressed, any text in the input component is removed.', async () => {
    const mockFocus = jest.fn();
    let wrapper = shallow(<SearchBar classes={classes} isOpen={true} />);

    const searchInput = wrapper.find('input');
    const clearButton = wrapper.find('button').at(1);
    wrapper.instance().searchRef = {
        current: { value: 'test', focus: mockFocus }
    };
    wrapper.instance().forceUpdate();
    searchInput.simulate('change', { currentTarget: { value: 'test' } });
    clearButton.simulate('click');
    expect(searchInput.props().value).toBe('');
});

test('When the input component is empty, the clear button is not displayed.', async () => {
    const mockFocus = jest.fn();
    let wrapper = shallow(
        <SearchBar
            classes={classes}
            isOpen={true}
            location={{ pathname: '/search.html', search: '' }}
        />,
        { disableLifecycleMethods: true }
    );

    wrapper.instance().searchRef = { current: { value: '', focus: mockFocus } };
    wrapper.instance().componentDidMount();
    const clearButton = wrapper.find('button').at(1);
    expect(clearButton.props().className).toBe(classes.clearIcon);
});

test('Autocomplete popup should be visible if input has focus on it', async () => {
    let wrapper = shallow(<SearchBar classes={classes} isOpen={true} />);
    const searchInput = wrapper.find('input');
    expect(wrapper.instance().state.autocompleteVisible).toEqual(false);
    searchInput.simulate('focus');
    expect(wrapper.instance().state.autocompleteVisible).toEqual(true);
});

test('Autocomplete popup should not be visible if input has been cleared by button click', async () => {
    let wrapper = shallow(<SearchBar classes={classes} isOpen={true} />);
    const mockFocus = jest.fn();
    const searchInput = wrapper.find('input');
    const clearButton = wrapper.find('button').at(1);
    wrapper.instance().searchRef = {
        current: { value: 'test', focus: mockFocus }
    };
    searchInput.simulate('focus');
    expect(wrapper.instance().state.autocompleteVisible).toEqual(true);
    wrapper.instance().forceUpdate();
    searchInput.simulate('change', { currentTarget: { value: 'test' } });
    clearButton.simulate('click');
    expect(wrapper.instance().state.autocompleteVisible).toEqual(false);
});

test('Autocomplete popup should not be visible if form has been submitted', async () => {
    const executeSearch = jest.fn().mockImplementationOnce(() => {});
    let wrapper = shallow(
        <SearchBar
            executeSearch={executeSearch}
            classes={classes}
            isOpen={true}
        />
    );
    const searchInput = wrapper.find('input');
    const searchForm = wrapper.find('form');
    wrapper.instance().forceUpdate();
    searchInput.simulate('focus');
    expect(wrapper.instance().state.autocompleteVisible).toEqual(true);
    searchInput.simulate('change', { currentTarget: { value: 'test' } });
    searchForm.simulate('submit', { preventDefault: () => {} });
    expect(wrapper.instance().state.autocompleteVisible).toEqual(false);
});
