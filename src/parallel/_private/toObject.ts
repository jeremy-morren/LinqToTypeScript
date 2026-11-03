import type { IParallelEnumerable } from "../../types"
import { typeDataToArray } from "./_typeDataToArray"

export const toObject = async <TSource, TKey extends keyof any, TValue>(
    source: IParallelEnumerable<TSource>,
    selector: (x: TSource) => TKey,
    valueSelector?: (x: TSource) => TValue): Promise<Record<TKey, TSource | TValue>> => {

    const dataFunc = source.dataFunc
    const values = await typeDataToArray(dataFunc)

    const map: Partial<Record<TKey, TSource | TValue>> = {}

    for (const value of values) {
        map[selector(value)] = valueSelector ? valueSelector(value) : value
    }

    return map as Record<TKey, TSource | TValue>
}
