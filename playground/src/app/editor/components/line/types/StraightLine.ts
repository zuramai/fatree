import type { Coordinate } from "@/@types/editor";
import type { LineTypePath } from "@/@types/lines";

export default class StraightLine implements LineTypePath {
    /**
     * Path for SVG `d` property
     */
    getD(from: Coordinate, to: Coordinate) {
        let d: (string|number)[] = []
        d.push('M', `${from.x} ${from.y}`)
        d.push('L', `${to.x} ${to.y}`)


        return d.join(" ")
    }
}