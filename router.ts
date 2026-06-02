const routes :Record<string,() => Promise<any>> = {
    "list": ()=>import("./pages/list-page.js"),
    "graph/bfs": () => import("./pages/graph-bfs-page.js"),
    "graph/create": ()=> import("./pages/graph-matrix-create-page.js"),
};
function routerNav(container:HTMLElement){
    const nav = document.createElement("nav");
    const list = document.createElement("a");
    list.href = "#/list";
    list.textContent = "目录";

    list.addEventListener("click",(e)=>{
        e.preventDefault();
        location.hash = "#/list";
    });
    
    nav.appendChild(list);
    container.appendChild(nav);
}
async function navigate(path:string){
    //清空旧页面
    const app = document.getElementById("app");
    if(!app) return;
    app.innerHTML = "";
    //找路由
    const loader = routes[path];
    if(!loader) return;
    //动态加载模块
    const module = await loader();
    //挂载导航栏
    routerNav(app);
    //传入容器
    module.mount(app);
}

window.addEventListener("hashchange", () => {
    const path = location.hash.replace("#/", "") || "list";
    navigate(path);
});

// 首次加载也要触发一次
if (!location.hash) {
    location.hash = "#/list";
} else {
    navigate(location.hash.replace("#/", ""));
}