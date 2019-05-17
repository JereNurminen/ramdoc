# ramdoc
Small terminal program to help with searching the Ramda docs.
## Usage:
`yarn start [search term]`

Running this prints out a list of Ramda functions (and their descriptions) where the function name matches the search term.

### Example:

<pre>
~/ramdadoc master*
❯ yarn start findIndex

<b>findIndex</b>
(a → Boolean) → [a] → Number

Returns the index of the first element of the list which matches the
predicate, or -1 if no element matches.
Acts as a transducer if a transformer is given in list position.

const xs = [{a: 1}, {a: 2}, {a: 3}];
R.findIndex(R.propEq('a', 2))(xs); //=> 1
R.findIndex(R.propEq('a', 4))(xs); //=> -1

See also:
transduce
</pre>
