import { GRAPH } from "../shared/config.js";
import type { GraphNode, MatrixGraph } from "../shared/types.js";

//创建一个MatrixGraph，使nodes为默认值，cnt为nodes数量
function createGraph(cnt:number):MatrixGraph{
  const nodes:GraphNode[] = [];
  for(let i=0;i<cnt;i++)
    nodes.push({x:0,y:0,label:`${i}`,status:"unvisited"})
  const matrix:number[][] = [];
  for(let i=0;i<cnt;i++){
    const row:number[] = [];
    for(let j=0;j<cnt;j++){
      row.push(0)
    }
    matrix.push(row)
  }
  return {
    nodes,
    matrix,
    cnt,
  }
}
//将MatrixGraph的matrix设置为需要值
function buildGraph(matrix:number[][],graph:MatrixGraph){
  calcCircleLayout(graph,GRAPH.LAYOUT_RADIUS,GRAPH.LAYOUT_CENTER_X,GRAPH.LAYOUT_CENTER_Y);
  graph.matrix = matrix;
}
//将MatrixGraph的nodes的坐标按照圆形布局赋值
function calcCircleLayout(graph : MatrixGraph,radius:number,cx:number,cy:number){
  const n = graph.cnt;
  for(let i=0;i<n;i++){
    const angle = 2*Math.PI*i/n;
    graph.nodes[i]!.x = cx + radius*Math.cos(angle);
    graph.nodes[i]!.y = cy + radius*Math.sin(angle);
  }
}
export{buildGraph,createGraph}