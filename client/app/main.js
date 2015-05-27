import PlayImmutabe from './playImmutable';
import Perceptron from './perceptron';
import Justice from 'justice';

Justice.init({
  metrics: {
    TTFB:             { budget: 200   },
    domInteractive:   { budget: 250   },
    domComplete:      { budget: 800   },
    firstPaint:       { budget: 1000  },
    pageLoad:         { budget: 2000  },
    requests:         { budget: 6     },
  },

  warnThreshold: 0.70,
  showFPS: true,
  chartType: 'spline'
});

var pi = new PlayImmutabe();
var $$ = (selector) => {
  return document.querySelector(selector);
}

$$('#case1').addEventListener('click', ()=>{
  console.log('task start');
  var size = 100000;
  var task = 1000;
  pi.CaseArrayPojo01(size, task);
  pi.CaseArrayImmutable01(size, task);
});

var p = new Perceptron($$('#canvas'),100);
console.log('Perceptron ready');
p.init();
$$('#viewChart').addEventListener('click', ()=>{
  
  console.log('Perceptron go');
  p.start();
  console.log('Perceptron doneing.');
});
