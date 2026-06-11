interface GraphNode {
  x:number,
  y:number,
  label:string,
  status:"visited"|"unvisited"|"current"
  //状态:未被访问，已被访问，正在检查相邻节点，
}
interface MatrixGraph {
  nodes : GraphNode[],
  matrix : number[][],
  cnt : number,
} 
interface BfsStep {
  action:"enqueue"|"dequeue"|"visit"|"check",
  nodeId:number
}
interface DfsStep {
  action:"enqueue"|"dequeue"|"visit"|"check",
  nodeId:number
}
interface Runtime {
  stepQueue: BfsStep[]|DfsStep[];
  stepIndex: number;
  ms: number;
  isAnimating: boolean;
}

//弧结点
interface ArcNode {
    info:number,
    adjvex:number,
    next:ArcNode|null
}
//顶点结点
interface VNode<T> {
    VId:number,
    Vdata:T,
    firstArc:ArcNode|null
}
interface AListGraph<T> {
    nodes : GraphNode[],
    adList : VNode<T>[],
    cnt : number,
}
export type {GraphNode,MatrixGraph,BfsStep,Runtime,ArcNode,VNode,AListGraph}