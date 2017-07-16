import '../sass/style.scss';

import { $, $$ } from './modules/bling';
import autoComplete from './modules/autocomplete';

import typeAhead from './modules/typeAhead.js'

// id was defined in _storeForm.pug
autoComplete($('#address'), $('#lat'), $('#lng'));

typeAhead($('.search'));