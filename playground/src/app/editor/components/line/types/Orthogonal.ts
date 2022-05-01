import type { Coordinate } from "@/@types/editor";
import type { LineTypePath } from "@/@types/lines";
import { coordinateGap } from "@/app/utils/coordinate";

export default class OrthogonalLine implements LineTypePath {
    /**
     * Path for SVG `d` property
     */
    getD(from: Coordinate, to: Coordinate) {
        let d: (string|number)[] = []


        let corner1:Coordinate = { x: 0, y: 0}
        let corner2:Coordinate = { x: 0, y: 0}

        let gap = coordinateGap(from, to)

        corner1 = {
            x: from.x,
            y: from.y - gap.y / 2
        }
        corner2 = {
            x: to.x,
            y: to.y + gap.y / 2
        }
        

        d.push(`M`, from.x, from.y)
        d.push(`L`, corner1.x, corner1.y)
        d.push(`L`, corner2.x, corner2.y)
        d.push(`L`, to.x, to.y)

        return d.join(" ")
    }
}