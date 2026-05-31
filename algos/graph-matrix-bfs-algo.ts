/*
//bfs步骤，
1.第一个访问第一个节点并置访问标志位，入队，若队列不空则继续
2.出队，并把寻找所有相邻节点，访问和置标志位对于每个节点，每个节点入队，若不为空则继续
3.循环执行第二步，直至为空结束

动画步骤分类：
1. 入队
2. 出队
3. 访问+置标志位
4. 检测相邻节点
*/
import { Queue } from "../shared/datastruct.js"
import type { MatrixGraph,BfsStep } from "../shared/types.js"

//用于将step快速的加入stepQueue
function pushBfsStep(stepQueue:BfsStep[],action:"enqueue"|"dequeue"|"visit"|"check",nodeId:number){
  //if(stepQueue === null) return ;
  stepQueue.push({action,nodeId});
}

//完成bfs所有步骤并且存到stepQueu中
function generateBfsSteps(graph:MatrixGraph,stepQueue:BfsStep[]){
  const visited:boolean[] = new Array(graph.cnt).fill(false);
  const queue = new Queue<number>();
  pushBfsStep(stepQueue,"visit",0);
  visited[0] = true;
  pushBfsStep(stepQueue,"enqueue",0);
  queue.enqueue(0);
  while(queue.empty() === false){
    const u = queue.dequeue();
    if(u === undefined) continue;
    pushBfsStep(stepQueue,"dequeue",u);
    pushBfsStep(stepQueue,"check",u);
    for(let i=0;i<graph.cnt;i++){
      if(graph.matrix[u]![i] === 1 && visited[i] === false){
        pushBfsStep(stepQueue,"visit",i);
        visited[i] = true;
        pushBfsStep(stepQueue,"enqueue",i);
        queue.enqueue(i);
      }
    }
  }
}

export{pushBfsStep,generateBfsSteps}