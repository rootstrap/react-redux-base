import React from 'react';

import Status from 'components/routes/Status';

const NotFoundPage = () => (
  <Status code={404}>
    <div>
      <p>404 page not found :(</p>
    </div>
  </Status>
);

export default NotFoundPage;
