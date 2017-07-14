import '../sass/style.scss';

import { $, $$ } from './modules/bling';
import autoComplete from './modules/autocomplete';

// id was defined in _storeForm.pug
autoComplete($('#address'), $('#lat'), $('#lng'));