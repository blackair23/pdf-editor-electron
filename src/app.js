import { page, render} from './lib.js';
import { homeView } from './views/home.js';
import { mergeView } from './views/merge.js';
import { removeView } from './views/remove.js';
import { splitView } from './views/split.js';

const main = document.querySelector('main');

page(decorateContext);
page('/', homeView);
page('/split', splitView);
page('/merge',mergeView);
page('/remove', removeView);

console.log('page.js Started')
page.start();

function decorateContext(ctx, next){
    ctx.render = renderMain;
    next();
}

function renderMain(templateResult) {
    render(templateResult, main);
}

