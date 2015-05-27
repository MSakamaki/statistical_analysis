/* jshint esnext: true, -W100 */

import Immutable  from 'immutable';

/**
* perceptron(分類問題)
*
* ```math
* z = \sum_{i=0}^n w_i x_i =　W^{\mathrm{T}}X
* ```
*
* @class perceptron
* @module immutable
* @constructor
*/
export default class Perceptron {

  /**
  * Constractor metohd
  *
  * 描画用のキャンバスと点の数を設定
  *
  * @method constructor
  */
  constructor(canvas,size){
    this.canvas = canvas;
    this.size = size || 100;
  }

  /**
  * 初期処理
  */
  init(){
    // ランダムな２次元配列を描画
    this.X = this.makePoint(this.size);
    
    // 真の分離平面 5x + 3y = 1
    function h(x, y){
      return 5 * x + 3 * y - 1;
    }
    this.T = Array.from(new Array(this.size), (x,i) => {
      return (h(this.X[i][0], this.X[i][1]) > 0) ? 1 : -1 ;
    });

    this.showDot();
  }
 /**
  * 
  * f(x,y) = sgn+ (ax + by + c)
  * 
  */
  start(){
    var w = this.zeros(3); // 特徴関数 (3次の 0 ベクトル)
    var rList = Array.from(new Array(100), (x,i) => i);

    // ミスしなくなるまで再帰処理
    var tsk =()=>{
      this.miss = 0;
      setTimeout(()=>{
        // FIXME: 本当はランダムに回す。
        rList.forEach((v)=>{
          let x_n = this.X[v][0]; // x^m
          let y_n = this.X[v][1]; // y^m
          let t_n = this.T[v];
          /**
           * 予測
           * 
           * φ(x,y)=(x,y,1)
           * w=(a,b,c)
           */
          var predict = Math.sign(this.sum(w, this.phi(x_n, y_n)));
          // 予測が不正解なら，特徴関数を更新する
          if ( predict !== t_n ){
            /**
             * a' = a + t^n * x^n
             * b' = b + t^n * y^n
             * c' = c + t^n
             **/
            w = [
              w[0]+(t_n*x_n),
              w[1]+(t_n*y_n),
              w[2]+t_n
            ];
            this.miss++;
          }
        });
        console.log('miss', this.miss);
        if (this.miss) 
          tsk(); // ミスしたのでもう一回
        else
          this.view(w); // ミスしなくなった。
      },0);
    };
    tsk();
  }

  /**
  * データ点を特徴ベクトルに変換
  */
  phi(x, y){
    return [x, y, 1];
  }

  /**
  * single array np.zeros()
  */
  zeros(size){
    return Array.from(new Array(size), () => 0);
  }
  /**
  * ランダムな二次元配列（x,y 座標）を作成
  */
  makePoint(size){
    var rnum =function(num){
      var n = Math.random() * 600;
      return Math.floor(n - 300) / 100;
    };
    return Array.from(new Array(size), () => [
      rnum(), rnum()
      ]);
  }
  /**
  * pythonで言うところの [].sum()っぽいの
  */
  sum(w, training){
    let sum = 0;
    w.forEach((v, i)=>{
      sum += v * training[i];
    });
    return sum;
  }

  /**
  * 点を画面に描画
  */
  showDot(){
    this.X.forEach((v, i)=>{
      var x = ((v[0]+3) * 50),
          y = ((v[1]+3) * 50);

      var ctxR = this.canvas.getContext('2d');
      ctxR.beginPath();
      ctxR.fillStyle = (this.T[i]===1) ? 'rgb(255,00,00)' : 'rgb(00,00, 255)';
      ctxR.arc(x, y, 1, 0, Math.PI*2, true);
      ctxR.fill();
    });
  }

  /**
  * (線)回答描画 
  */
  view(w){
    var fill = (x, y, m)=>{
      var ctxR = this.canvas.getContext('2d');
      ctxR.beginPath();
      ctxR.fillStyle = (m===1) ? 'rgba(255,55,55,0.1)' : 'rgba(55,55, 255,0.1)';
      ctxR.arc(x, y, 1, 0, Math.PI*2, false);
      ctxR.fill();
    };
    var ary = Array.from(new Array(299), (v, i) => {
      return Array.from(new Array(299), (_v, _i) => 0)
    });
    ary.forEach((v,i)=>{
      v.forEach((k,j)=>{
        // 1~300 -> -3 ~ 3 convert
        var id = (i-150)/50,
            jd = (j-150)/50
        fill (i,j,Math.sign(this.sum(w, this.phi(id, jd))) );
      });
    });
  }
}
