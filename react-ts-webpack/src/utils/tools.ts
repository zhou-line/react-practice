/**
 * 带立即执行选项的防抖函数
 * @param func 要执行的函数
 * @param delay 延迟时间（毫秒）
 * @param immediate 是否立即执行
 * @returns 防抖后的函数
 */
export function debounce<T extends (...args: any[]) => any>(
    func: T,
    delay: number
  ): (...args: Parameters<T>) => void {
    let timeoutId: ReturnType<typeof setTimeout>;
  
    return (...args: Parameters<T>) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  }


export const getRec = (annotations: any) => {
    const array: any = []
    annotations.forEach((item: any) => {
        const rec = {
            id: item.id,
            x: item.left, // x点
            y: item.top, // y点
            w: item.width, // 宽
            h: item.height, // 高
            type: 1, // 类型
            index: -1,
            annotator: item.annotator,
            pictureId: item.picture_id,
            target: item?.target,
            labelValue: item.label_id,
            label: item.label,
            isNew: false,
            confirm: item.confirm,
            align: item.align,
            color: item.color
        }
        array.push(rec)
    })
    return array
}

export const getAutoRec = (annotations: any) => {
  const array: any = []
  annotations.forEach((item: any) => {
      const rec = {
          id: item.id,
          x: item.left, // x点
          y: item.top, // y点
          w: item.width, // 宽
          h: item.height, // 高
          type: item.auto === 1 ? 0: 1, // 类型
          index: -1,
          annotator: item.annotator,
          pictureId: item.picture_id,
          target: item?.target,
          labelValue: item.label_id,
          label: item.label,
          isNew: false,
          confirm: item.confirm,
          align: item.align,
          color: item.color
      }
      array.push(rec)
  })
  return array
}

export const isChineseRegex = (filename: string) => {
    return /[\u4e00-\u9fa5]/.test(filename);
}