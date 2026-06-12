import { SVG, CANVAS } from "./config.js";

//延迟一段时间
function wait(ms:number):Promise<void>{
  return new Promise((resolve)=>{setTimeout(resolve,ms)});
}
//创建一个svg画布
function initSVG(container:HTMLElement):SVGSVGElement{
  const svg = document.createElementNS(SVG.NAMESPACE,"svg");
  svg.setAttribute("width",`${CANVAS.WIDTH}`);
  svg.setAttribute("height",`${CANVAS.HEIGHT}`);
  container.appendChild(svg);
  return svg;
}
//初始化一个rect
function initRect(rect:SVGRectElement,x:number,y:number,weight:number,height:number,color:string,fill:string,stroke_width:number){
  rect.setAttribute("x",`${x}`);
  rect.setAttribute("y",`${y}`);
  rect.setAttribute("width",`${weight}`);
  rect.setAttribute("height",`${height}`);
  rect.setAttribute("stroke",color);
  rect.setAttribute("fill",fill);
  rect.setAttribute("stroke-width",`${stroke_width}`);
}
//初始化一个text
function initText(t:SVGTextElement,content: string, cx: number, cy: number, size: number){
        t.setAttribute("x", `${cx}`);
        t.setAttribute("y", `${cy}`);
        t.setAttribute("text-anchor", "middle");
        t.setAttribute("dominant-baseline", "central");
        t.setAttribute("font-size", `${size}`);
        t.textContent = content;
    }
//初始化一个line
function initLine(line:SVGLineElement,x1:number,y1:number,x2:number,y2:number,color:string,stroke_width:number){
    line.setAttribute("x1",`${x1}`);
    line.setAttribute("y1",`${y1}`);
    line.setAttribute("x2",`${x2}`);
    line.setAttribute("y2",`${y2}`);
    line.setAttribute("stroke",color);
    line.setAttribute("stroke-width",`${stroke_width}`);
}
//获取svg画布中鼠标点击的坐标
function getSVGPoint(svg:SVGSVGElement,event:MouseEvent):SVGPoint{
  const pt = svg.createSVGPoint();
  pt.x = event.clientX;
  pt.y = event.clientY;
  return pt.matrixTransform(svg.getScreenCTM()!.inverse());
}
export{wait,initSVG,initRect,initText,initLine,getSVGPoint}
