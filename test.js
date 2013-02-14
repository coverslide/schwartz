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

  var sorted = sort_by(unsorted, function(x){return [x.id]})

  t.equal(sorted[0].id, 2, 'test value 0')
  t.equal(sorted[1].id, 5, 'test value 1')
  t.equal(sorted[2].id, 10, 'test value 2')

  t.end()
})
