export const toObjectAsync = async <TSource, TKey extends keyof any, TValue>(
    source: AsyncIterable<TSource>,
    selector: (x: TSource) => Promise<TKey>,
    valueSelector?: (x: TSource) => Promise<TValue>): Promise<Record<TKey, TSource | TValue>> => {

    const map: Partial<Record<TKey, TSource | TValue>> = {}

    for await (const value of source) {
        map[await selector(value)] = valueSelector ? await valueSelector(value) : value
    }

    return map as Record<TKey, TSource | TValue>
}
