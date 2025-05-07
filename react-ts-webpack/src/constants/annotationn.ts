export enum  Mode{
    'Action' = 'action',
    'Default' = 'default',
    'Auto' = 'auto',
}

export interface REC {
    id: string;
    x: number; // x点
    y: number; // y点
    w: number; // 宽
    h: number; // 高
    type: number; // 是否选中
    index: number; // 索引
    annotator: string; // 注释者
    pictureId: string; // 图片id
    targetId?: string;
    userId?: string;
    name?: string; // 名称
    isNew: boolean; // 是否是新添加的
    label?: string; // 标签
    labelValue?: string; // 标签值
}

export interface CurObj {
    isRightClick: boolean; // 鼠标右键按下标识
    radious: number;          // 范围误差值
    recSize: number;         // 移动小框的大小
    index: number;    // 当前矩形框的index
    side: number;       // 边界值
    resize: boolean; // 是否拖拽大小
    draw: boolean; // 是否画图
    drag: boolean // 是否拖动
    x: number;  // 画图的起始x
    y: number;  // 画图的起始y
    startX: number;  // x轴开始位置
    startY: number;  // y轴开始位置
}