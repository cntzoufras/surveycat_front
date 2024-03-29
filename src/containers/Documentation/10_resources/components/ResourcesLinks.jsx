import React from 'react';
import {
  Card, CardBody, CardTitleWrap, CardTitle,
} from '@/shared/components/Card';

const ResourcesLinks = () => (
  <Card height="auto">
    <CardBody>
      <CardTitleWrap>
        <CardTitle>Main</CardTitle>
      </CardTitleWrap>
      <ul>
        <li>
          <p>Create-react-app:
            <a href="https://github.com/facebook/create-react-app"> https://github.com/facebook/create-react-app</a>
          </p>
        </li>
        <li>
          <p>React-router:
            <a href="https://github.com/ReactTraining/react-router"> https://github.com/ReactTraining/react-router</a>
          </p>
        </li>
        <li>
          <p>Redux:
            <a href="https://redux.js.org/"> https://redux.js.org</a>
          </p>
        </li>
        <li>
          <p>Hot-loader:
            <a href="https://github.com/gaearon/react-hot-loader"> https://github.com/gaearon/react-hot-loader</a>
          </p>
        </li>
        <li>
          <p>Internationalization addon:
            <a href="https://github.com/i18next/react-i18next"> https://github.com/i18next/react-i18next</a>
          </p>
        </li>
        <li>
          <p>Styled components:
            <a href="https://styled-components.com/"> https://styled-components.com/</a>
          </p>
        </li>
      </ul>
      <CardTitleWrap>
        <CardTitle>Fonts and Icons</CardTitle>
      </CardTitleWrap>
      <ul>
        <li>
          <p>Roboto from Google Font:
            <a href="https://fonts.google.com/specimen/Roboto"> https://fonts.google.com/specimen/Roboto</a>
          </p>
        </li>
        <li>
          <p>Free version of Linearicons:
            <a href="https://linearicons.com/free"> https://linearicons.com/free</a>
          </p>
        </li>
        <li>
          <p>Material Design Icons:
            <a href="https://materialdesignicons.com/"> https://materialdesignicons.com</a>
          </p>
        </li>
      </ul>
      <CardTitleWrap>
        <CardTitle>Form</CardTitle>
      </CardTitleWrap>
      <ul>
        <li>
          <p>React Final Form:
            <a href="https://final-form.org/react"> https://final-form.org/react</a>
          </p>
        </li>
        <li><p>Material-UI: <a href="https://material-ui-next.com/">https://material-ui-next.com</a></p></li>
        <li>
          <p>For selects fields:
            <a href="https://github.com/JedWatson/react-select"> https://github.com/JedWatson/react-select</a>
          </p>
        </li>
        <li>
          <p>Date Pickers:
            <a href="https://github.com/Hacker0x01/react-datepicker"> https://github.com/Hacker0x01/react-datepicker</a>
          </p>
        </li>
        <li>
          <p>Time Pickers:
            <a href="https://github.com/react-component/time-picker"> https://github.com/react-component/time-picker</a>
          </p>
        </li>
        <li>
          <p>DropZones: <span />
            <a href="https://github.com/react-dropzone/react-dropzone/">
              https://github.com/react-dropzone/react-dropzone
            </a>
          </p>
        </li>
        <li>
          <p>Color Pickers:
            <a href="https://github.com/casesandberg/react-color/"> https://github.com/casesandberg/react-color</a>
          </p>
        </li>
      </ul>
      <CardTitleWrap>
        <CardTitle>Components</CardTitle>
      </CardTitleWrap>
      <ul>
        <li>
          <p>React Bootstrap 5 components:
            <a href="https://react-bootstrap.github.io/"> https://react-bootstrap.github.io</a>
          </p>
        </li>
        <li>
          <p>Slick Carousel:
            <a href="https://github.com/akiran/react-slick"> https://github.com/akiran/react-slick</a>
          </p>
        </li>
        <li>
          <p>Notifications: <span />
            <a href="https://github.com/react-component/notification">
              https://github.com/react-component/notification
            </a>
          </p>
        </li>
        <li>
          <p>LightBox:
            <a href="https://github.com/brainhubeu/react-carousel"> https://github.com/brainhubeu/react-carousel</a>
          </p>
        </li>
        <li>
          <p>Scrollbar: <span />
            <a href="https://github.com/idiotWu/react-smooth-scrollbar">
              https://github.com/idiotWu/react-smooth-scrollbar
            </a>
          </p>
        </li>
        <li>
          <p>Data Table:
            <a href="https://github.com/tannerlinsley/react-table"> https://github.com/tannerlinsley/react-table</a>
          </p>
        </li>
        <li>
          <p>Text Editor:
            <a href="https://github.com/jpuri/react-draft-wysiwyg"> https://github.com/jpuri/react-draft-wysiwyg</a>
          </p>
        </li>
        <li>
          <p>Calendar: <span />
            <a href="https://github.com/intljusticemission/react-big-calendar">
              https://github.com/intljusticemission/react-big-calendar
            </a>
          </p>
        </li>
      </ul>
      <CardTitleWrap>
        <CardTitle>Laravel Sanctum Authentication</CardTitle>
      </CardTitleWrap>
      <ul>
        <li>
          <p>
            Laravel: <a href="https://laravel.com/docs/10.x/sanctum"> https://laravel.com/docs/10.x/sanctum</a>
          </p>
        </li>
        <li>
          <p>
            Auth0: <span />
            <a href="https://auth0.com/docs/quickstart/spa/vanillajs">
              https://auth0.com/docs/quickstart/spa/vanillajs
            </a>
          </p>
        </li>
      </ul>
    </CardBody>
  </Card>
);

export default ResourcesLinks;
