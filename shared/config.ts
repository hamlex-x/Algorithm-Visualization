// SVG 基础
const SVG = {
  NAMESPACE: "http://www.w3.org/2000/svg",
} as const;

// 画布
const CANVAS = {
  WIDTH: 500,
  HEIGHT: 700,
} as const;

// 图相关常量
const GRAPH = {
  // 圆形布局
  LAYOUT_RADIUS: 150,
  LAYOUT_CENTER_X: CANVAS.WIDTH / 2,   // 250
  LAYOUT_CENTER_Y: 50 + 150,           // 200
  NODE_RADIUS: 24,

  // BFS 队列渲染
  QUEUE_X: 50,
  QUEUE_Y: 480,
  QUEUE_WIDTH: 400,
  QUEUE_HEIGHT: 50,
  QUEUE_CELL_WIDTH: 50,                // 单个队列元素宽度
  QUEUE_CELL_HEIGHT: 50,

  // 说明文本
  INTRODUCE_X: CANVAS.WIDTH / 2,       // 250
  INTRODUCE_Y: 400,
} as const;

export { SVG, CANVAS, GRAPH };
