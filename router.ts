const routes :Record<string,() => Promise<any>> = {
    "list": ()=>import("./pages/list.js"),
    "graph/bfs": () => import("./pages/graph-bfs-page.js"),
};
async function navigate(path:string){
    //清空旧页面
    const app = document.getElementById("app");
    if(!app) return;
    app.innerHTML = "";
    //找路由
    const loader = routes[path];
    if(!loader) return;
    //动态加载模块
    const module = await loader()
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