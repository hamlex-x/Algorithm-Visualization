import { SVG } from "../shared/config.js";
import { initRect, initText, initLine } from "../shared/svg-utils.js";
import { graph } from "../shared/state.js";
function renderCategoryTreeRect(){
    const svg = document.querySelector("svg");
    const datastructRect = document.createElementNS(SVG.NAMESPACE,"rect");
    const linearRect = document.createElementNS(SVG.NAMESPACE,"rect");
    const nolinearRect = document.createElementNS(SVG.NAMESPACE,"rect");

    const linearlistRect = document.createElementNS(SVG.NAMESPACE,"rect");
    const stackReck = document.createElementNS(SVG.NAMESPACE,"rect");
    const queueRect = document.createElementNS(SVG.NAMESPACE,"rect");
    const treeRect = document.createElementNS(SVG.NAMESPACE,"rect");
    const heapRect = document.createElementNS(SVG.NAMESPACE,"rect");
    const graphRect = document.createElementNS(SVG.NAMESPACE,"rect");

    initRect(datastructRect,200,25,100,50,"black","none",4);
    initRect(linearRect,50,125,100,50,"black","none",4);
    initRect(nolinearRect,350,125,100,50,"black","none",4);

    initRect(linearlistRect,0,225,50,25,"black","transparent",4);
    initRect(stackReck,100,225,50,25,"black","transparent",4);
    initRect(queueRect,200,225,50,25,"black","transparent",4);
    initRect(treeRect,270,225,50,25,"black","transparent",4);
    initRect(heapRect,360,225,50,25,"black","transparent",4);
    initRect(graphRect,450,225,50,25,"black","transparent",4);

    datastructRect.setAttribute("id","cat_rect_datastruct");
    linearRect.setAttribute("id","cat_rect_linear");
    nolinearRect.setAttribute("id","cat_rect_nolinear");

    linearlistRect.setAttribute("id","cat_rect_linearlist");
    stackReck.setAttribute("id","cat_rect_stack");
    queueRect.setAttribute("id","cat_rect_queue");
    treeRect.setAttribute("id","cat_rect_tree");
    heapRect.setAttribute("id","cat_rect_heap");
    graphRect.setAttribute("id","cat_rect_graph");
    //添加页面跳转
    graphRect.addEventListener("click",() => {
        location.hash = "#/graph/create";
    });
    graphRect.style.cursor = "pointer";
    svg?.appendChild(datastructRect);
    svg?.appendChild(linearRect);
    svg?.appendChild(nolinearRect);
    svg?.appendChild(linearlistRect);
    svg?.appendChild(stackReck);
    svg?.appendChild(queueRect);
    svg?.appendChild(treeRect);
    svg?.appendChild(heapRect);
    svg?.appendChild(graphRect);
}
function renderCategoryTreeText(){
    const svg = document.querySelector("svg");

    const datastructText = document.createElementNS(SVG.NAMESPACE, "text");
    const linearText = document.createElementNS(SVG.NAMESPACE, "text");
    const nolinearText = document.createElementNS(SVG.NAMESPACE, "text");

    const linearlistText = document.createElementNS(SVG.NAMESPACE, "text");
    const stackText = document.createElementNS(SVG.NAMESPACE, "text");
    const queueText = document.createElementNS(SVG.NAMESPACE, "text");
    const treeText = document.createElementNS(SVG.NAMESPACE, "text");
    const heapText = document.createElementNS(SVG.NAMESPACE, "text");
    const graphText = document.createElementNS(SVG.NAMESPACE, "text");

    initText(datastructText, "数据结构", 250, 50, 16);
    initText(linearText, "线性结构", 100, 150, 14);
    initText(nolinearText, "非线性结构", 400, 150, 14);

    initText(linearlistText, "线性表", 25, 237.5, 10);
    initText(stackText, "栈", 125, 237.5, 10);
    initText(queueText, "队列", 225, 237.5, 10);
    initText(treeText, "树", 295, 237.5, 10);
    initText(heapText, "堆", 385, 237.5, 10);
    initText(graphText, "图", 475, 237.5, 10);

    datastructText.setAttribute("id", "cat_text_datastruct");
    linearText.setAttribute("id", "cat_text_linear");
    nolinearText.setAttribute("id", "cat_text_nolinear");

    linearlistText.setAttribute("id", "cat_text_linearlist");
    stackText.setAttribute("id", "cat_text_stack");
    queueText.setAttribute("id", "cat_text_queue");
    treeText.setAttribute("id", "cat_text_tree");
    heapText.setAttribute("id", "cat_text_heap");
    graphText.setAttribute("id", "cat_text_graph");

    svg?.appendChild(datastructText);
    svg?.appendChild(linearText);
    svg?.appendChild(nolinearText);
    svg?.appendChild(linearlistText);
    svg?.appendChild(stackText);
    svg?.appendChild(queueText);
    svg?.appendChild(treeText);
    svg?.appendChild(heapText);
    svg?.appendChild(graphText);
}
function renderCategoryTreeLine(){
    const svg = document.querySelector("svg");

    const ds2linear = document.createElementNS(SVG.NAMESPACE, "line");
    const ds2nolinear = document.createElementNS(SVG.NAMESPACE, "line");

    const linear2list = document.createElementNS(SVG.NAMESPACE, "line");
    const linear2stack = document.createElementNS(SVG.NAMESPACE, "line");
    const linear2queue = document.createElementNS(SVG.NAMESPACE, "line");

    const nolinear2tree = document.createElementNS(SVG.NAMESPACE, "line");
    const nolinear2heap = document.createElementNS(SVG.NAMESPACE, "line");
    const nolinear2graph = document.createElementNS(SVG.NAMESPACE, "line");

    initLine(ds2linear, 250, 75, 100, 125, "black", 2);
    initLine(ds2nolinear, 250, 75, 400, 125, "black", 2);

    initLine(linear2list, 100, 175, 25, 225, "black", 2);
    initLine(linear2stack, 100, 175, 125, 225, "black", 2);
    initLine(linear2queue, 100, 175, 225, 225, "black", 2);

    initLine(nolinear2tree, 400, 175, 295, 225, "black", 2);
    initLine(nolinear2heap, 400, 175, 385, 225, "black", 2);
    initLine(nolinear2graph, 400, 175, 475, 225, "black", 2);

    ds2linear.setAttribute("id", "cat_line_ds_linear");
    ds2nolinear.setAttribute("id", "cat_line_ds_nolinear");

    linear2list.setAttribute("id", "cat_line_linear_list");
    linear2stack.setAttribute("id", "cat_line_linear_stack");
    linear2queue.setAttribute("id", "cat_line_linear_queue");

    nolinear2tree.setAttribute("id", "cat_line_nolinear_tree");
    nolinear2heap.setAttribute("id", "cat_line_nolinear_heap");
    nolinear2graph.setAttribute("id", "cat_line_nolinear_graph");

    svg?.appendChild(ds2linear);
    svg?.appendChild(ds2nolinear);
    svg?.appendChild(linear2list);
    svg?.appendChild(linear2stack);
    svg?.appendChild(linear2queue);
    svg?.appendChild(nolinear2tree);
    svg?.appendChild(nolinear2heap);
    svg?.appendChild(nolinear2graph);
}   
function renderAlgoListRect(){
    const svg = document.querySelector("svg");

    const bfsRect = document.createElementNS(SVG.NAMESPACE, "rect");
    const dfsRect = document.createElementNS(SVG.NAMESPACE, "rect");
    const dijkstraRect = document.createElementNS(SVG.NAMESPACE, "rect");
    const astarRect = document.createElementNS(SVG.NAMESPACE, "rect");
    const kruskalRect = document.createElementNS(SVG.NAMESPACE, "rect");
    const primRect = document.createElementNS(SVG.NAMESPACE, "rect");

    initRect(bfsRect, 450, 275, 50, 20, "black", "transparent", 2);
    initRect(dfsRect, 450, 305, 50, 20, "black", "transparent", 2);
    initRect(dijkstraRect, 450, 330, 50, 20, "black", "transparent", 2);
    initRect(astarRect, 450, 355, 50, 20, "black", "transparent", 2);
    initRect(kruskalRect, 450, 380, 50, 20, "black", "transparent", 2);
    initRect(primRect, 450, 405, 50, 20, "black", "transparent", 2);

    bfsRect.setAttribute("id", "algo_rect_bfs");
    dfsRect.setAttribute("id", "algo_rect_dfs");
    dijkstraRect.setAttribute("id", "algo_rect_dijkstra");
    astarRect.setAttribute("id", "algo_rect_astar");
    kruskalRect.setAttribute("id", "algo_rect_kruskal");
    primRect.setAttribute("id", "algo_rect_prim");
    //添加页面跳转
    bfsRect.addEventListener("click", () => {
        if(graph.matrix.length === 0) {
            alert("请先点击‘图’创建矩阵");
            return;
        }
        location.hash = "#/graph/bfs";
    });
    bfsRect.style.cursor = "pointer";


    svg?.appendChild(bfsRect);
    svg?.appendChild(dfsRect);
    svg?.appendChild(dijkstraRect);
    svg?.appendChild(astarRect);
    svg?.appendChild(kruskalRect);
    svg?.appendChild(primRect);
}
function renderAlgoListText(){
    const svg = document.querySelector("svg");

    const bfsText = document.createElementNS(SVG.NAMESPACE, "text");
    const dfsText = document.createElementNS(SVG.NAMESPACE, "text");
    const dijkstraText = document.createElementNS(SVG.NAMESPACE, "text");
    const astarText = document.createElementNS(SVG.NAMESPACE, "text");
    const kruskalText = document.createElementNS(SVG.NAMESPACE, "text");
    const primText = document.createElementNS(SVG.NAMESPACE, "text");

    initText(bfsText, "BFS", 475, 285, 8);
    initText(dfsText, "DFS", 475, 315, 8);
    initText(dijkstraText, "Dijkstra", 475, 340, 8);
    initText(astarText, "A*", 475, 365, 8);
    initText(kruskalText, "Kruskal", 475, 390, 8);
    initText(primText, "Prim", 475, 415, 8);

    bfsText.setAttribute("id", "algo_text_bfs");
    dfsText.setAttribute("id", "algo_text_dfs");
    dijkstraText.setAttribute("id", "algo_text_dijkstra");
    astarText.setAttribute("id", "algo_text_astar");
    kruskalText.setAttribute("id", "algo_text_kruskal");
    primText.setAttribute("id", "algo_text_prim");

    svg?.appendChild(bfsText);
    svg?.appendChild(dfsText);
    svg?.appendChild(dijkstraText);
    svg?.appendChild(astarText);
    svg?.appendChild(kruskalText);
    svg?.appendChild(primText);
}
export {renderCategoryTreeRect,renderCategoryTreeText,renderCategoryTreeLine,renderAlgoListRect,renderAlgoListText}