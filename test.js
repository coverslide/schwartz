var test = require('tape')
var schwartz = require('./schwartz.js')

test('basic sorting', function(t){
  var unsorted = [
    {id: 5}
    , {id: 50}
    , {id: 10}
    , {id: 2}
    , {id: 10}
  ]

  var sorted = schwartz(unsorted, idsort)

  t.equal(sorted[0].id, 2, 'test value 0')
  t.equal(sorted[1].id, 5, 'test value 1')
  t.equal(sorted[2].id, 10, 'test value 2')

  t.end()
})

test('native binding', function(t){
  var unsorted = [
    {id: 5}
    , {id: 50}
    , {id: 10}
    , {id: 2}
    , {id: 10}
  ]

  var unsorted_link = unsorted

  schwartz.useDaSchwartz()

  var sorted = unsorted.schwartz(idsort)

  t.equal(sorted[0].id, 2, 'native test value 0')
  t.equal(sorted[1].id, 5, 'native test value 1')
  t.equal(sorted[2].id, 10, 'native test value 2')

  t.notEqual(sorted, unsorted_link, 'should be different objects')

  unsorted = unsorted.schwartz(idsort)

  t.equal(unsorted[0].id, 2, 'test value 0')
  t.equal(unsorted[1].id, 5, 'test value 1')
  t.equal(unsorted[2].id, 10, 'test value 2')

  t.end()
});


test('array comparison', function(t){
    var unsorted = [
        [11, 5],
        [10, 5],
        [5, 10],
        [5, 5],
        [12, 5]
    ]

    var unsorted_link = unsorted;
    var unsorted2 = unsorted;

    var sorted = unsorted.sort(schwartz.compareArrays);
    var sorted2 = unsorted2.sort(schwartz.compare);

    t.equal(sorted[0][0], 5);
    t.equal(sorted[0][1], 5);
    t.equal(sorted[1][0], 5);
    t.equal(sorted[1][1], 10);
    t.equal(sorted[4][0], 12);
    t.equal(sorted[4][1], 5);

    t.deepEqual(sorted, sorted2)
});

function idsort(x){
  return [x.id]
}
