export const getRec = (annotations) => {
    const recArrs = []
    annotations.data.forEach(item => {
        item.annotations.forEach(value => {
            let rec = {
                id: value.id,
                x: value.left, // x点
                y: value.top, // y点
                w: value.width, // 宽
                h: value.height, // 高
                type: 1, // 类型
                index: -1,
                annotator: value.annotator,
                pictureId: value.picture_id,
                targetId: value.target_id,
                label: value.labelValues,
                name: item.userName,
                userId: item.userId,
                isNew: false
            }
            recArrs.push(rec)
        })
    })
    return recArrs
}