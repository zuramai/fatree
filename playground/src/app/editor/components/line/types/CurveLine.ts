import type { Coordinate } from "@/@types/editor";
import type { LineTypePath } from "@/@types/lines";

export default class CurveLine implements LineTypePath {
    /**
     * Path for SVG `d` property
     */
    public getD(from: Coordinate, to: Coordinate) {
        let d: any[] = []

        let controlPoint1 = {
            x: to.x > from.x ? from.x + 100 : from.x - 100,
            y: Math.abs(to.y - from.y) < 20 ? from.y : from.y-20
        } 
        let controlPoint2 = {
            x: to.x > from.x ? to.x - 100 : to.x + 100,
            y: Math.abs(to.y - from.y) < 20 ? to.y : to.y+20
        } 

        d.push('M', from.x, from.y)
        d.push('C', controlPoint1.x, controlPoint1.y, controlPoint2.x, controlPoint2.y, `${to.x} ${to.y}`)

        return d.join(" ")
    }
}