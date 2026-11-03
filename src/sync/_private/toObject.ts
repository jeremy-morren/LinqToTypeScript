export const toObject = <TSource, TKey extends keyof any, TValue>(
    source: Iterable<TSource>,
    selector: (x: TSource) => TKey,
    valueSelector?: (x: TSource) => TValue): Record<TKey, TSource | TValue> => {

    const map: Partial<Record<TKey, TSource | TValue>> = {}

    for (const value of source) {
        map[selector(value)] = valueSelector ? valueSelector(value) : value
    }

    return map as Record<TKey, TSource | TValue>
}
