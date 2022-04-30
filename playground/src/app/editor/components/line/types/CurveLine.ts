import type { Coordinate } from "@/@types/editor";
import type { LineTypePath } from "@/@types/lines";

export default class CurveLine implements LineTypePath {
    /**
     * Path for SVG `d` property
     */
    public getD(from: Coordinate, to: Coordinate) {
        let d: string[] = []

        return d.join(" ")
    }
}