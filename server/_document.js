/* eslint-disable react/no-danger */

import React from 'react';
import { object, string } from 'prop-types';

const Document = ({ helmet, assets, preloadedState }) => {
  const htmlAttrs = helmet.htmlAttributes.toComponent();
  const bodyAttrs = helmet.bodyAttributes.toComponent();

  return (
    <html lang="en" {...htmlAttrs}>
      <head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
        <meta charSet="utf-8" />
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        {helmet.link.toComponent()}
        {assets.main.css && (
          <link rel="stylesheet" href={assets.main.css} />
        )}
      </head>
      <body {...bodyAttrs}>
        <div id="app">SSR_MARKUP</div>
        <script
          id="redux-state"
          dangerouslySetInnerHTML={{
            __html: `window.__PRELOADED_STATE__=${preloadedState}`,
          }}
        />
        <script
          type="text/javascript"
          src={assets.main.js}
          defer
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
};

Document.propTypes = {
  helmet: object.isRequired,
  assets: object.isRequired,
  preloadedState: string.isRequired
};

export default Document;
