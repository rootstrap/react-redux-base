/* eslint-disable no-console */
import webpack from 'webpack';
import clientConfig from '../../webpack/webpack.config.client';
import { chalkError, chalkSuccess, chalkWarning, chalkProcessing } from '../../tools/chalkConfig';

process.env.NODE_ENV = 'production';

console.log(chalkProcessing('Compiling client...'));

webpack(clientConfig).run((error, stats) => {
  if (error) { // so a fatal error occurred. Stop here.
    console.log(chalkError(error));
    return 1;
  }

  const jsonStats = stats.toJson();

  if (jsonStats.hasErrors) {
    return jsonStats.errors.map(error => console.log(chalkError(error)));
  }

  if (jsonStats.hasWarnings) {
    console.log(chalkWarning('Webpack generated the following warnings: '));
    jsonStats.warnings.map(warning => console.log(chalkWarning(warning)));
  }

  console.log(`Webpack stats: ${stats}`);

  // if we got this far, the build succeeded.
  console.log(chalkSuccess('Your client is compiled! '));

  return 0;
});
