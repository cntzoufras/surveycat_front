import React, { Fragment } from 'react';
import {
  Card, CardTitleWrap, CardTitle, CardSubhead,
} from '@/shared/components/Card';
import { DocumentationChangelog } from '../../DocumentationElements';

import data from './changelog_data.json';

const renderChangesList = (changes) => {
  if (!changes) return null;
  
  return (
    <ul>
      {changes.map(change => (
        <Fragment>
          <li>{change.name}</li>
          {renderChangesList(change.changes)}
        </Fragment>
      ))}
    </ul>
  );
};

const ResourcesLinks = () => (
  <Card height="auto">
    <DocumentationChangelog>
      {data.map(version => (
        <Fragment>
          <CardTitleWrap>
            <CardTitle>v{version.version}</CardTitle>
            <CardSubhead>{version.date}</CardSubhead>
          </CardTitleWrap>
          {renderChangesList(version.changes)}
        </Fragment>
      ))}
    </DocumentationChangelog>
  </Card>
);

export default ResourcesLinks;
