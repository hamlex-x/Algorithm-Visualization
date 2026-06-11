import type {BfsStep} from '../shared/types.js';
//弧结点
interface ArcNode<T> {
    info:T,
    adjvex:number,
    next:ArcNode<T>|null
}
//顶点结点
interface VNode<T> {
    VId:number,
    Vdata:T,
    firstArc:ArcNode<T>|null
}


const vnode0:VNode<number> = {
    VId:0,
    Vdata:0,
    firstArc:{
        info:1,adjvex:2,
        next:{
            info:1,adjvex:3,
            next:null
        }
    }
}
const vnode1:VNode<number> = {
    VId:1,
    Vdata:1,
    firstArc:{
        info:1,adjvex:3,
        next:null
    }
}
const vnode2:VNode<number> = {
    VId:2,
    Vdata:2,
    firstArc:{
        info:1,adjvex:0,
        next:{
            info:1,adjvex:3,
            next:null
        }
    }
}
const vnode3:VNode<number> = {
    VId:3,
    Vdata:3,
    firstArc:{
        info:1,adjvex:0,
        next:{
            info:1,adjvex:1,
            next:{
                info:1,adjvex:2,
                next:null
            }
        }
    }
}
const ALGraph:VNode<number>[] = [vnode0,vnode1,vnode2,vnode3];

function builderALGraphByEdgeList(ALGraph:VNode<any>[]):VNode<any>[]{
    const t : VNode<any>[] = [];
    return t;
}
// function renderGraph(graph:MatrixGraph){
//   const svg = document.querySelector("svg");
//   if (!svg) return;
//   //画线
//   for(let i=0;i<graph.cnt;i++){
//     for(let j=0;j<graph.cnt;j++){
//       if(graph.matrix[i]![j]===1 && i!==j){
//         const line = document.createElementNS(SVG.NAMESPACE,"line");
//         let x1 = graph.nodes[i]!.x;
//         let y1 = graph.nodes[i]!.y;
//         let x2 = graph.nodes[j]!.x;
//         let y2 = graph.nodes[j]!.y;
//         let hypotenuse = Math.sqrt(Math.pow(x1-x2,2)+Math.pow(y1-y2,2));

//         let x3 = x2 + GRAPH.NODE_RADIUS*(x1-x2)/hypotenuse;
//         let y3 = y2 + GRAPH.NODE_RADIUS*(y1-y2)/hypotenuse;
//         line.setAttribute("x1",`${x1}`);
//         line.setAttribute("y1",`${y1}`);
//         line.setAttribute("x2",`${x3}`);
//         line.setAttribute("y2",`${y3}`);
//         line.setAttribute("stroke","black");
//         line.setAttribute("stroke-width","4"); 
//         line.setAttribute("marker-end","url(#svg_arrow_marker)")
//         line.setAttribute("id",`edge_line_${i}_${j}`);
//         svg.appendChild(line);
//       }
//     }
//   }
//   for(let i=0;i<graph.cnt;i++){
//     //节点
//     const node = document.createElementNS(SVG.NAMESPACE,"circle");
//     node.setAttribute("cx",`${graph.nodes[i]?.x}`);
//     node.setAttribute("cy",`${graph.nodes[i]?.y}`);
//     node.setAttribute("r",`${GRAPH.NODE_RADIUS}`);
//     node.setAttribute("id",`node_circle_${i}`);
//     node.classList.add("node");
//     //文本
//     const label = document.createElementNS(SVG.NAMESPACE,"text");
//     label.setAttribute("x",`${graph.nodes[i]?.x}`);
//     label.setAttribute("y",`${graph.nodes[i]?.y}`);
//     label.setAttribute("font-size","20");
//     label.setAttribute("font-family","Arial");
//     label.setAttribute("text-anchor","middle");
//     label.textContent = `${i}`
//    //绘制
//     svg.appendChild(node);
//     svg.appendChild(label);
//   }
// }
// function renderNodes(){
    
// }
// function renderGraph(graph:ALdata[]){

// }

// function generateBfsSteps(graph:ALdata[],stepQueue:BfsStep[]){

// }
