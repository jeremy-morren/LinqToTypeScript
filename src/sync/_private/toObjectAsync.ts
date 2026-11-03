export const toObjectAsync = async <TSource, TKey extends keyof any, TValue>(
    source: Iterable<TSource>,
    selector: (x: TSource) => Promise<TKey>,
    valueSelector?: (x: TSource) => Promise<TValue>): Promise<Record<TKey, TSource | TValue>> => {

    const map: Partial<Record<TKey, TSource | TValue>> = {}

    for (const value of source) {
        map[await selector(value)] = valueSelector ? await valueSelector(value) : value
    }

    return map as Record<TKey, TSource | TValue>
}
