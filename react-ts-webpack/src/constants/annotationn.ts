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
    isNew: boolean; // 是否是新添加的
}