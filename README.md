ImmutableとJS機械学習のページ
----

```sh
git clone https://github.com/MSakamaki/statistical_analysis.git

cd statistical_analysis

npm  install
jspm inject
jspm install

```

### js perceptron

[パーセプトロンをJSで実装してみた](https://github.com/MSakamaki/statistical_analysis/blob/master/client/app/perceptron.js)

[参考にしたpythonのコード](https://github.com/MSakamaki/statistical_analysis/blob/master/py/p.py)

### Test Cases

js objectとimmutableで比較

 1. 配列にランダムに追加
 1. POJOにランダムに変更をかける
 1. POJOを増加しつつランダムに変更をかける

### page performance

[justice](https://github.com/okor/justice)

### Documentation

[API Document](http://facebook.github.io/immutable-js/docs/#/)

 + Iterable
 + Seq
 + Collection
 + Map
 + OrderedMap
 + List
 + Stack
 + Set
 + OrderedSet
 + Record
 + Range
 + Repeat
 + is
 + fromJS


### MEMO

```sh

# Justice install
jspm install justice=github:okor/justice -o "{ main: 'build/justice.min.js'}"

```
