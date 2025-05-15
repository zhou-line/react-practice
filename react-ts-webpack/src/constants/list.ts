export enum AnalysisLabel {
    'name' = '名称',
    'group' = '项目组',
    'resource' = '来源',
    'num' = '标注数量'
}

export interface Analysis {
    name: string,
    group: string,
    resource: string,
    num: number
}

export enum ResourceLabel {
    'name' = '名称',
    'group' = '项目组',
    'resource' = '来源图片',
    'num' = '标注数量',
    'emo' = '表情'
}

export interface Resource {
    name: string,
    group: string,
    resource: string,
    emo: string,
}