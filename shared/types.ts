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
}
export type {GraphNode,MatrixGraph,BfsStep,Runtime}