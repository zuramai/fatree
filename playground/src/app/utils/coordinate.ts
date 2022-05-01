import type { Coordinate } from "@/@types/editor";

export function coordinateGap(c1: Coordinate, c2: Coordinate): Coordinate {
    return {
        x: c1.x - c2.x,
        y: c1.y - c2.y,
    }
}