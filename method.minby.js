const minBy = (array, iteratee) => {
    let current
    function baseExtremum(array, iteratee, comparator) {
        var index = -1,
            length = array.length;

        while (++index < length) {
            var value = array[index],
                current = iteratee(value);

            if (current != null && (computed === undefined
                ? (current === current && !isSymbol(current))
                : comparator(current, computed)
            )) {
                var computed = current,
                    result = value;
            }
        }
        return result;
    }
    function getIteratee() {
        var result = iteratee;
        result = result === iteratee ? baseIteratee : result;
        return arguments.length ? result(arguments[0], arguments[1]) : result;
      }
    return (array && array.length)
        ? baseExtremum(array, getIteratee(iteratee, 2), baseLt)
        : undefined;
}

module.exports = minBy