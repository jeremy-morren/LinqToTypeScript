import { asAsync, itAsync, itEnumerable, itParallel } from "../TestHelpers"

const objectKeys = <TObject extends object>(object: TObject) => {
    return Object.keys(object) as Array<keyof TObject>
}

describe("toObject", () => {
    itEnumerable("basic", (asEnumerable) => {
        const object = asEnumerable([1, 2, 3])
            .toObject((x) => `Key_${ x }`)
        
        for (const key of objectKeys(object)) {
            const value = object[key]
            expect(key).toBe(`Key_${ value }`)
        }
    })

    itAsync("basic", async () => {
        const object = await asAsync([1, 2, 3])
            .toObject((x) => `Key_${ x }`)

        for (const key of objectKeys(object)) {
            const value = object[key]
            expect(key).toBe(`Key_${ value }`)
        }
    })

    itParallel("basic", async (asParallel) => {
        const object = await asParallel([1, 2, 3])
            .toObject((x) => `Key_${ x }`)

        for (const key of objectKeys(object)) {
            const value = object[key]
            expect(key).toBe(`Key_${ value }`)
        }
    })

    itEnumerable("with value selector", (asEnumerable) => {
        const object: Record<string, string> = asEnumerable([1, 2, 3])
            .toObject((x) => `Key_${ x }`, (x) => `Value_${ x }`)

        expect(object).toEqual({ Key_1: "Value_1", Key_2: "Value_2", Key_3: "Value_3" })
    })

    itAsync("with value selector", async () => {
        const object: Record<string, string> = await asAsync([1, 2, 3])
            .toObject((x) => `Key_${ x }`, (x) => `Value_${ x }`)

        expect(object).toEqual({ Key_1: "Value_1", Key_2: "Value_2", Key_3: "Value_3" })
    })

    itParallel("with value selector", async (asParallel) => {
        const object: Record<string, string> = await asParallel([1, 2, 3])
            .toObject((x) => `Key_${ x }`, (x) => `Value_${ x }`)

        expect(object).toEqual({ Key_1: "Value_1", Key_2: "Value_2", Key_3: "Value_3" })
    })

    itEnumerable("with falsy value selector", (asEnumerable) => {
        const object: Record<string, number> = asEnumerable([1, 2])
            .toObject((x) => `Key_${ x }`, () => 0)

        expect(object).toEqual({ Key_1: 0, Key_2: 0 })
    })
})
