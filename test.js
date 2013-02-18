var test = require('tape')
var sort_by = require('./')

test('basic sorting', function(t){
  var unsorted = [
    {id: 5}
    , {id: 50}
    , {id: 10}
    , {id: 2}
    , {id: 10}
  ]

  var sorted = sort_by(unsorted, idsort)

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

  sort_by.bindToNative()

  var sorted = unsorted.sort_by(idsort)

  t.equal(sorted[0].id, 2, 'native test value 0')
  t.equal(sorted[1].id, 5, 'native test value 1')
  t.equal(sorted[2].id, 10, 'native test value 2')

  t.notEqual(sorted, unsorted_link, 'should be different objects')

  unsorted = unsorted.sort_by(idsort)

  t.equal(unsorted[0].id, 2, 'test value 0')
  t.equal(unsorted[1].id, 5, 'test value 1')
  t.equal(unsorted[2].id, 10, 'test value 2')

  t.end()
})


function idsort(x){
  return [x.id]
}
