// const graph = {
//     matrix : [] as number[][],
//     representation: "matrix" as "matrix" | "list",
// }


import type { AListGraph, GraphNode, MatrixGraph, VNode } from "../shared/types.js";
const graph : {
    matrixGraph : MatrixGraph,
    adLGraph : AListGraph<string>,
    representation:  "matrix" | "adlist"|null,
}={
    matrixGraph: {
        nodes : [] as GraphNode[],
        matrix : [] as number[][],
        cnt : 0
    },
    adLGraph: {
        nodes : [] as GraphNode[],
        adList : [] as VNode<string>[],
        cnt : 0
    },
    representation: null,  
}

export{graph};

