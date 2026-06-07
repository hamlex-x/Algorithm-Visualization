import { renderListUI } from "../renderers/list-renderer.js";
import { graph } from "../shared/state.js";
//为数据结构块添加跳转
function bindCategoryTreeEvents(svg:SVGSVGElement){
    const graphRect = svg.getElementById("cat_rect_graph") as HTMLElement;
    graphRect!.style.cursor = "pointer";
    graphRect!.addEventListener("click", () => {
        location.hash = "#/graph/create";
    });
}
//为算法块添加跳转
function bindAlgoListEvents(svg:SVGSVGElement){
    const bfsRect = svg.getElementById("algo_rect_bfs") as HTMLElement;
    const dfsRect = svg.getElementById("algo_rect_dfs") as HTMLElement;
    const dijkstraRect = svg.getElementById("algo_rect_dijkstra") as HTMLElement;
    const astarRect = svg.getElementById("algo_rect_astar") as HTMLElement;
    const kruskalRect = svg.getElementById("algo_rect_kruskal") as HTMLElement;
    const primRect = svg.getElementById("algo_rect_prim") as HTMLElement;

    //显示可以点击
    bfsRect!.style.cursor = "pointer";
    dfsRect!.style.cursor = "pointer";
    dijkstraRect!.style.cursor = "pointer";
    astarRect!.style.cursor = "pointer";
    kruskalRect!.style.cursor = "pointer";
    primRect!.style.cursor = "pointer";

    //添加页面跳转
    bfsRect!.addEventListener("click", () => {
        if(graph.matrixGraph.matrix.length === 0) {
            alert("请先点击‘图’创建矩阵");
            return;
        }
        location.hash = "#/graph/bfs";
    });
}
export function mount(container:HTMLElement){
    const svg = renderListUI(container);
    bindAlgoListEvents(svg);
    bindCategoryTreeEvents(svg);
}
