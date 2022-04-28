import type { Connection } from "@/@types/family";
import { reactive } from "vue";
import { XLine } from "../editor/components/XLine";
import { v4 as uuidv4 } from 'uuid';

/**
 * Connection is an abstract class,
 * it does not have any component
 */
export class FConnections {
    // public connections: 

    // addConnection(data: Connection) {
    //     data.id = uuidv4()
    //     this.connections[data.id] = data
    // }
}