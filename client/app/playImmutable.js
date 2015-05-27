/* jshint esnext: true, -W100 */

import Immutable  from 'immutable';

/**
* This is a JavaScript Framework Non-dependent project template for jspm and gulp base.
*
* これはGulpとjspmをベースとしたフレームワーク非依存のプロジェクトテンプレートです。(予定)
*
* プロジェクトテンプレート確認用のスクリプトです。
*
* + [6to5 features](https://6to5.org/docs/learn-es6/#enhanced-object-literals)
* + [traceur Features](https://github.com/google/traceur-compiler/wiki/LanguageFeatures)
*
* @class Bootstrap
* @module jquery
* @constructor
*/
export default class PlayImmutable {

  /**
  * Constractor metohd
  *
  * 処理無し
  *
  * @method constructor
  */
  constructor(){}

  /**
  * pojoに変換する関数
  *
  * @method fromJS
  */
  fromJS(){
    console.log('start fromJS');
    Immutable.fromJS();
    //var a = Immutable.fromJS(json: any, reviver?: (k: any, v: Iterable<any, any>) => any): any

    var b = Immutable.fromJS({a: {b: [10, 20, 30]}, c: 40}, function (key, value) {
      var isIndexed = Immutable.Iterable.isIndexed(value);
      return isIndexed ? value.toList() : value.toOrderedMap();
    });
    console.log('fromJS:', b);
  }

  /**
  * ユースケース
  * 配列を書き換えるケース
  *
  * @method Cas01
  */
  CaseArrayPojo01(arraySize, taskSize){
    var list = Array.from(new Array(arraySize), (x,i) => i);
    var start = Date.now();
    gotoTask(taskSize, ()=>{
      var idx = Math.floor(Math.random() * (arraySize-1));
      list[idx] = Math.random();
    }).then(()=>{
      Doing(start, 'Pure JavaScript');
    }).catch((e)=>{
      console.error(e);
    });
  }
  CaseArrayImmutable01(arraySize, taskSize){
    var list = Immutable.List(Array.from(new Array(arraySize), (x,i) => i));
    var start = Date.now();

    gotoTask(taskSize, ()=>{
      var idx = Math.floor(Math.random() * (arraySize-1));
      list[idx] = Math.random();
    }).then(()=>{
      Doing(start, 'Immutable');
    }).catch((e)=>{
      console.error(e);
    });
  }
}

function Doing(start, taskName){
  console.log('%c'+taskName+' Done!',
      'font-size: 50px; color: blue;' +
      'font-weight: bold; font-family: impact;');
  console.log('%c' + ((Date.now() - start) / 1000) +
      ' seconds required.', 'font-size: 30px; color: red;');
};
function gotoTask(limit, callback){
  return new Promise((resolve, reject)=>{
    try{
      let count = 1;
      var job = ()=>{
        if (limit <= count){
          resolve();
          return void 0;
        }
        setTimeout(()=>{
          callback();
          count++;
          job();
        }, 0);
      };
      job();
    }catch(e){
      reject(e);
    }
  });
}
