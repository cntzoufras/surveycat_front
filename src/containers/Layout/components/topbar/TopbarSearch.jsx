import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from 'mdi-react/CloseIcon';
import SearchIcon from 'mdi-react/SearchIcon';

import { searchSurveys, clearSearchResults } from '@/redux/actions/searchActions';
import {
  colorAccent,
  colorBackgroundBody,
  colorText,
  colorBackground,
  colorTextMuted,
} from '@/utils/palette';
import {
  marginLeft,
  paddingLeft,
  paddingRight,
  right,
} from '@/utils/directions';
import { TopbarButton } from './BasicTopbarComponents';

// A simple debounce hook
const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);
    return debouncedValue;
};

const TopbarSearch = () => {
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const debouncedQuery = useDebounce(query, 300); // 300ms delay
    const searchRef = useRef(null);

    const dispatch = useDispatch();
    // Get search state from the Redux store
    const { loading, results } = useSelector(state => state.search);

    // Effect to dispatch search action
    useEffect(() => {
        dispatch(searchSurveys(debouncedQuery));
    }, [debouncedQuery, dispatch]);

    // Effect to handle clicks outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsFocused(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleClear = () => {
        setQuery('');
        dispatch(clearSearchResults());
    };

    const hasResults = results && results.length > 0;
    const showResultsDropdown = isFocused && query.length > 0;

    return (
      <SearchWrapper ref={searchRef}>
        <TopbarSearchForm onSubmit={e => e.preventDefault()}>
          <SearchIcon className="search-icon" />
          <TopbarSearchInput
            placeholder="Search your surveys..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
          />
          {query && (
            <TopbarSearchButton type="button" onClick={handleClear}>
              <CloseIcon />
            </TopbarSearchButton>
          )}
        </TopbarSearchForm>
        {showResultsDropdown && (
          <SearchResults>
            {loading && <SearchResultItem>Searching...</SearchResultItem>}
            {!loading && !hasResults && (
              <SearchResultItem>
                No results found for &quot;{debouncedQuery}&quot;
              </SearchResultItem>
            )}
            {!loading && hasResults && (
                results.filter(survey => survey.first_page_id).map(survey => (
                  <SearchResultLink
                    key={survey.id}
                    href={`/surveys/${survey.id}/pages/${survey.first_page_id}`}
                  >
                    <SurveyTitle>{survey.title}</SurveyTitle>
                    <SurveyDescription>{survey.description}</SurveyDescription>
                  </SearchResultLink>
                ))
            )}
          </SearchResults>
        )}
      </SearchWrapper>
    );
};

export default TopbarSearch;

// region STYLES

const SearchWrapper = styled.div`
  position: relative;
  margin: auto 0 10px;
  max-width: 350px;
  flex: 1;
  min-width: 0;

  @media screen and (max-width: 576px) {
    max-width: none;
    width: 100%;
    margin: 10px 0;
  }
`;

const TopbarSearchForm = styled.form`
  position: relative;
  width: 100%;

  .search-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    ${marginLeft}: 10px;
    fill: #cac1c1;
  }
`;

const TopbarSearchInput = styled.input`
  width: 100%;
  height: 36px;
  border-radius: 18px;
  transition: all 0.3s;
  ${paddingLeft}: 40px;
  ${paddingRight}: 40px;
  background-color: ${colorBackgroundBody};
  border: 1px solid transparent;
  color: ${colorText};
  
  &:focus, &:active {
    outline: none;
    border: 1px solid ${colorAccent};
    background-color: ${colorBackground};
  }
`;

const TopbarSearchButton = styled(TopbarButton)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  height: 30px;
  width: 30px;
  border-radius: 50%;
  ${right}: 3px;
`;

const SearchResults = styled.div`
  position: absolute;
  top: 100%;
  margin-top: 8px;
  width: 100%;
  background-color: ${colorBackground};
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  padding: 8px 0;
  max-height: 400px;
  overflow-y: auto;
  z-index: 1000;
`;

const SearchResultItem = styled.div`
  padding: 10px 16px;
  font-size: 14px;
  color: ${colorText};
`;

const SearchResultLink = styled.a`
  display: block;
  padding: 12px 16px;
  text-decoration: none;
  border-bottom: 1px solid ${colorBackgroundBody};

  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background-color: ${colorBackgroundBody};
  }
`;

const SurveyTitle = styled.div`
  font-size: 15px;
  font-weight: 500;
  color: ${colorText};
  margin-bottom: 4px;
`;

const SurveyDescription = styled.p`
  font-size: 13px;
  color: ${colorTextMuted};
  margin: 0;
  // Truncate long descriptions
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// endregion
