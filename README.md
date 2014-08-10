Schwartz
=======

Schwartzian transform for js

The goal of this project is to provide a library for sorting arrays in a
similar fashion to Ruby's [Array#sort_by](http://ruby-doc.org/core-2.1.2/Enumerable.html#method-i-sort_by).
In addition to standard sorting, schwartz uses a special compareArrays method
to compare two arrays similar to Ruby's `<=>` operator.

How to use the Schwartz
-----------------------

Schwartz is very simple to use. Instead of providing a sorting function, a
transform function is provided which will provide the value to compare for
each item in the array.

```js
/* sort by user_id */

//standard way
users.sort(function (a, b) {
    var aValue = a.user_id;
    var bValue = b.user_id;
    return aValue < bVlaue ? -1
        : aValue > bValue ? 1
        : 0;
});


//call schwartz.useDaSchwartz() to bind .schwartz to the Array prototype.
schwartz.useDaSchwartz();

var sortedUsers = users.schwartz(function (user) {
    return user.user_id;
});
```

To sort along multiple criteria, we return an array:

```js

//sort by first name, last name, created_at
var sortedUsers = users.schwartz(function (user) {
    return [user.first_name, user.last_name, user.created_at];
});

//if we want sort null values last, we should place an impossibly high value as the default
var sortedUsers = users.schwartz(function (user) {
    return [user.first_name || 'ZZZZZZ', user.last_name || 'ZZZZZZ', user.created_at || new Date(9999,1,1)];
});
```

License
-------

ISC
