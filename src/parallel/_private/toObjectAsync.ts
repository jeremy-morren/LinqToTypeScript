import type { IParallelEnumerable } from "../../types"
import { nextIterationAsync } from "./_nextIterationAsync"
import { typeDataToArray } from "./_typeDataToArray"

export const toObjectAsync = async <TSource, TKey extends keyof any, TValue>(
    source: IParallelEnumerable<TSource>,
    selector: (x: TSource) => Promise<TKey>,
    valueSelector?: (x: TSource) => Promise<TValue>): Promise<Record<TKey, TSource | TValue>> => {

    const dataFunc = nextIterationAsync(source, async (value) => {
        const key = await selector(value)
        return [key, valueSelector ? await valueSelector(value) : value] as [TKey, TSource | TValue]
    })

    const keyValues = await typeDataToArray(dataFunc)

    const map: Partial<Record<TKey, TSource | TValue>> = {}

    for (const [key, value] of keyValues) {
        map[key] = value
    }

    return map as Record<TKey, TSource | TValue>
}
