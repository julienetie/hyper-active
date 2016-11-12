import jsdom from 'jsdom';
import { expect } from 'chai';
import colors from 'colors';

global.expect = expect;
global.document = jsdom.jsdom('<html></html>');
global.window = document.defaultView;

after(() => {
	console.log(`██  ${new Date().toLocaleTimeString()}  ██████████████████████████████`.red)
});
