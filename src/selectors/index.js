import * as R from 'ramda';

export const applicationMainSelector = (state) => R.prop('application', state);
