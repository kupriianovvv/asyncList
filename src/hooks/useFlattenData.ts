import { RawData } from "../types/rawData";

export const useFlattenData = (data: RawData[] | null) => {
    if (!data) return null;
    console.log(data)
    const flattenedData = data.reduce<RawData['results']>((accum, item) => {
        accum.push(...item.results)
        return accum;
    }, [])
    return flattenedData
}