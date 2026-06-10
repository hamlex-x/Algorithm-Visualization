import { GRAPH } from "../shared/config.js";

//正在访问节点动画
async function animateVisitNode(node : SVGElement) {
    await node.animate(
        [
            {transform:"scale(1)"},
            {transform:"scale(1.25)"},
            {transform:"scale(1)"},
        ],
        {
            duration:300,
            easing:"ease-out",
        }
    ).finished
}
//检查节点相邻节点动画动画
async function animateCheckNode(node: SVGElement) {
  await node.animate(
    [
        { opacity: 1 },
        { opacity: 0.4 },
        { opacity: 1 }
    ],
    {
      duration: 250,
      easing: "ease-out"
    }
  ).finished;
}
//入队动画，fromX,feomY为rect进队位置左上点的坐标，toX,toY为rect到达位置位置左上点的坐标
async function enqueueBfsAnimation(rect:SVGElement,text:SVGElement,fromX:number,fromY:number,toX:number,toY:number) {
    //出现
    await Promise.all([
        rect.animate(
            [
                { transform: `translate(${fromX}px,${fromY}px)`, opacity: 0 },
                { transform: `translate(${fromX}px,${fromY}px)`, opacity: 1 }
            ],
            {
                duration: 250,
                easing: "ease-out",
            }
        ).finished,
        text.animate(
            [
                { transform: `translate(${fromX+GRAPH.QUEUE_CELL_WIDTH/2}px,${fromY+GRAPH.QUEUE_CELL_HEIGHT/2}px)`, opacity: 0 },
                { transform: `translate(${fromX+GRAPH.QUEUE_CELL_WIDTH/2}px,${fromY+GRAPH.QUEUE_CELL_HEIGHT/2}px)`, opacity: 1 },
            ],
            {
                duration: 250,
                easing: "ease-out",
            }
        ).finished
    ])
    //移动
    await Promise.all([
        rect.animate(
            [
                { transform: `translate(${fromX}px,${fromY}px)`},
                { transform: `translate(${toX}px,${toY}px)`}
            ],
            {
                duration: 500,
                easing: "ease-out",
            }
        ).finished,
        text.animate(
            [
                { transform: `translate(${fromX+GRAPH.QUEUE_CELL_WIDTH/2}px,${fromY+GRAPH.QUEUE_CELL_HEIGHT/2}px)`},
                { transform: `translate(${toX+GRAPH.QUEUE_CELL_WIDTH/2}px,${toY+GRAPH.QUEUE_CELL_HEIGHT/2}px)`},
            ],
            {
                duration: 500,
                easing: "ease-out",
            }
        ).finished
    ])
}
//出队动画,参数fromX,feomY为rect左上点的坐标
async function dequeueBfsAnimation(rect:SVGElement,text:SVGElement,fromX:number,fromY:number){
    //移动
    await Promise.all([
        rect.animate(
            [
                { transform: `translate(0px,0px)`},
                { transform: `translate(${-GRAPH.QUEUE_CELL_WIDTH}px,0px)`}
            ],
            {
                duration: 500,
                easing: "ease-out",
            }
        ).finished,
        text.animate(
            [
                { transform: `translate(0px,0px)`},
                { transform: `translate(${-GRAPH.QUEUE_CELL_WIDTH}px,0px)`},
            ],
            {
                duration: 500,
                easing: "ease-out",
            }
        ).finished
    ])
    //如果位置大于队头消失
    if(fromX - GRAPH.QUEUE_CELL_WIDTH < GRAPH.QUEUE_X){
        await Promise.all([
            rect.animate(
                [
                    { transform: `translate(${-GRAPH.QUEUE_CELL_WIDTH}px,0px)`,opacity:1},
                    { transform: `translate(${-GRAPH.QUEUE_CELL_WIDTH}px,0px)`,opacity:0},
                ],
                {
                    duration: 250,
                    easing: "ease-out",
                }
            ).finished,
            text.animate(
                [
                    { transform: `translate(${-GRAPH.QUEUE_CELL_WIDTH}px,0px)`,opacity:1},
                    { transform: `translate(${-GRAPH.QUEUE_CELL_WIDTH}px,0px)`,opacity:0},
                ],
                {
                    duration: 250,
                    easing: "ease-out",
                }
            ).finished
        ])
    }
}

export {animateVisitNode,animateCheckNode,enqueueBfsAnimation,dequeueBfsAnimation};