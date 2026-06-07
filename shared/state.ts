// const graph = {
//     matrix : [] as number[][],
//     representation: "matrix" as "matrix" | "list",
// }

import type { GraphNode, MatrixGraph } from "../shared/types.js";
const graph : {
    matrixGraph : MatrixGraph,
    representation:  "matrix" | "list"|null,
}={
    matrixGraph: {
        nodes : [] as GraphNode[],
        matrix : [] as number[][],
        cnt : 0
    },
    representation: null,  
}

export{graph};

