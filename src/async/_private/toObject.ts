export const toObject = async <TSource, TKey extends keyof any, TValue>(
    source: AsyncIterable<TSource>,
    selector: (x: TSource) => TKey,
    valueSelector?: (x: TSource) => TValue): Promise<Record<TKey, TSource | TValue>> => {

    const map: Partial<Record<TKey, TSource | TValue>> = {}

    for await (const value of source) {
        map[selector(value)] = valueSelector ? valueSelector(value) : value
    }

    return map as Record<TKey, TSource | TValue>
}
