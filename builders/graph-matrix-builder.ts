import { GRAPH } from "../shared/config.js";
import type { GraphNode, MatrixGraph } from "../shared/types.js";

//创建nodes为默认值
function createNodes(cnt:number):GraphNode[]{
  const nodes:GraphNode[] = [];
  for(let i=0;i<cnt;i++)
    nodes.push({x:0,y:0,label:`${i}`,status:"unvisited"})
  return nodes;
}

//将MatrixGraph的nodes的坐标按照圆形布局赋值
function calcCircleLayout(nodes:GraphNode[],radius:number,cx:number,cy:number){
  const n = nodes.length;
  for(let i=0;i<n;i++){
    const angle = 2*Math.PI*i/n;
    nodes[i]!.x = cx + radius*Math.cos(angle);
    nodes[i]!.y = cy + radius*Math.sin(angle);
  }
}
//完成对整个graph.matrixGraph的初始化
function buildGraphMatrix(matrix:number[][]):MatrixGraph{
  const graphMatrix:MatrixGraph = {matrix:matrix,cnt:0,nodes:[]};
  graphMatrix.matrix = matrix;
  graphMatrix.cnt = matrix.length;
  graphMatrix.nodes = createNodes(graphMatrix.cnt);
  calcCircleLayout(graphMatrix.nodes,GRAPH.LAYOUT_RADIUS,GRAPH.LAYOUT_CENTER_X,GRAPH.LAYOUT_CENTER_Y);
  return graphMatrix;
}
export{buildGraphMatrix,createNodes}