import React, { useEffect, useRef, useState } from "react";
import './index.scss';
import { Mode, REC } from "@/constants/annotationn";

interface Props {
    mode: string;
    imageSrc: string,
    recArrs: REC[],
    setRecArrs: (recArrs: REC[]) => void,
    addToRecs: (e: any, curObj: any) => void
}

export const AnnotationShow = (props: Props) => {

    const image = new Image();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [ctx2d, setCtx2d] = useState<CanvasRenderingContext2D | null>(null)
    const [canvasDom, setCanvasDom] = useState<HTMLCanvasElement | null>(null);
    const [shownWidth, setShownWidth] = useState(0);
    const [shownHeight, setShownHeight] = useState(0);
    const recArrs = props.recArrs;
    const curObj = {
        isRightClick: false, // 鼠标右键按下标识
        radious: 8,          // 范围误差值
        recSize: 6,         // 移动小框的大小
        index: -1,          // 当前矩形框的index
        side: -1,            // 边界值
        resize: false, // 是否拖拽大小
        draw: false, // 是否画图
        drag: false, // 是否拖动
        x: 0, // 画图的起始x
        y: 0, // 画图的起始y
        startX: 0, // x轴开始位置
        startY: 0, // y轴开始位置
    }
    // 初始化显示
    const getShowContext = () => {
        image.src = props.imageSrc;
        const canvas = canvasRef.current;
        if (!canvas) return;
        setCtx2d(canvas.getContext('2d'))
        const content = canvas.getContext('2d')
        setCanvasDom(canvasRef.current)
        image.onload = function () {
            canvas.width = image.width
            canvas.height = image.height
            setShownWidth(image.width)
            setShownHeight(image.height)
            content?.drawImage(image, 0, 0, image.width, image.height)
        }
    }

    useEffect(() => {
        getShowContext()
    }, [props.imageSrc])


    // 重绘
    useEffect(() => {
        clearCanvas();
        // 清空矩形数据后，这里重绘
        drawOldRect(recArrs);
        curObj.side = 0
        changeResizeCursor(curObj.side)
    }, [recArrs.length])

    useEffect(() => {
        recArrs.forEach(item => {
            item.type = 1
            item.isNew = false
        })
    }, [props.mode])

    // 清除canvas
    const clearCanvas = () => {
        if (!ctx2d) return
        image.src = props.imageSrc;
        ctx2d.clearRect(0, 0, shownWidth, shownHeight);
        ctx2d.drawImage(image, 0, 0, shownWidth, shownHeight)
    }

    // 鼠标按下并移动，画矩形
    const drawRect = (e: any) => {
        if (!ctx2d) return;
        if (curObj.draw) {
            ctx2d.strokeStyle = "rgb(255, 0, 0)";
            ctx2d.setLineDash([]);
            ctx2d.strokeRect(
                curObj.x,
                curObj.y,
                e.offsetX - curObj.x,
                e.offsetY - curObj.y
            );
        }
    }


    const moveFunction = (e: any) => {
        const target = e.nativeEvent
        // 需要清除之前的
        clearCanvas();
        // 清空矩形数据后，这里重绘
        drawOldRect(recArrs);
        // 画选中的矩形
        drawSelectedRecs(recArrs);
        // 画矩形
        drawRect(target);
        // 移动或缩放
        moveOrScale(target);
    }

    const drawSelectedRecs = (recArrs: REC[]) => {
        for (let i = 0; i < recArrs.length; i++) {
            if (recArrs[i].type === 0) {
                drawLitRecs(i)
            }
        }
    }

    const drawLitRecs = (index: number) => {
        if (!ctx2d) return;
        if (index !== -1) {
            const data = prepareLitRecs(index)
            const {recSize} = curObj
            for (let i = 0; i < data.length; i++) {
                ctx2d.lineWidth = 2;
                ctx2d.fillStyle = "rgb(255, 0, 0)";   // 矩形框的线条颜色   // 矩形框的线条宽度
                ctx2d.fillRect(
                    data[i][0] - recSize / 2,
                    data[i][1] - recSize / 2,
                    recSize,
                    recSize,
                );
            }
        }
    }

    //把一个框的左上角坐标和宽高输入，得到8个坐标，左3，右3中2
    const prepareLitRecs = (index: number) => {
        const li = [];
        if (index > -1) {
            const data = recArrs[index]
            li[0] = [data.x, data.y];
            li[1] = [data.x, data.y + data.h / 2];
            li[2] = [data.x, data.y + data.h];
            li[3] = [data.x + data.w, data.y];
            li[4] = [data.x + data.w, data.y + data.h / 2];
            li[5] = [data.x + data.w, data.y + data.h];
            li[6] = [data.x + data.w / 2, data.y];
            li[7] = [data.x + data.w / 2, data.y + data.h];
        }
        return li;
    }

    // 移动矩形框/缩放矩形框
    const moveOrScale = (e: any) => {
        const index = getEventIndex(e.offsetX, e.offsetY)
        let side = -1
        if (props.mode === Mode.Action) {
            side = 0
        }
        if (index > -1 && !curObj.resize && !curObj.drag) {
            const selects: number[] = []
            side = getEventArea(index, e.offsetX, e.offsetY)
            const cloneSide = side

            recArrs.forEach((item, index) => {
                if (item.type === 0) {
                    selects.push(index)
                }
            })
            if (selects.findIndex(item => item === index) > -1) {
                side = cloneSide
            } else {
                side = 9
                curObj.resize = false
            }
            if (curObj.draw) {
                side = -1
                curObj.resize = false
            }
        } else if (curObj.index > -1 && (curObj.resize || curObj.drag)) {
            side = getEventArea(curObj.index, e.offsetX, e.offsetY)
        }
        // 鼠标样式
        changeResizeCursor(side);
        // 如果在移动
        moveRec(e)
        // 如果在缩放
        reSizeRec(e)
    }


    // 移动
    const moveRec = (e: any) => {
        if (!canvasDom) return;
        if (curObj.drag && recArrs[curObj.index]) {
            let x = curObj.startX + e.offsetX - curObj.x
            let y = curObj.startY + e.offsetY - curObj.y

            const minX = canvasDom.offsetLeft
            const maxX = canvasDom.offsetLeft + canvasDom.offsetWidth - recArrs[curObj.index].w
            const minY = canvasDom.offsetTop
            const maxY = canvasDom.offsetTop + canvasDom.offsetHeight - recArrs[curObj.index].h

            if (x < minX) {
                x = minX
            }
            if (x > maxX) {
                x = maxX
            }
            if (y < minY) {
                y = minY
            }
            if (y > maxY) {
                y = maxY
            }

            recArrs[curObj.index].x = x
            recArrs[curObj.index].y = y
        }
    }

    // 缩放
    const reSizeRec = (e: any) => {
        const {side, index, recSize} = curObj
        const rec = recArrs[index]
        if (curObj.resize && rec) {
            const temX = rec.x;
            const temY = rec.y;
            const ex = e.offsetX
            const ey = e.offsetY
            if (side < 4 && temX + rec.w - ex > recSize) {
                rec.x = ex;
            }
            if (
                (side === 1 || side === 4 || side === 7) &&
                temY + rec.h - ey > recSize
            ) {
                rec.y = ey;
            }
            if (side < 4) {
                if (temX + rec.w - ex > recSize) {
                    rec.w = temX + rec.w - ex;
                }
            } else if (side < 7) {
                if (ex - temX > recSize) {
                    rec.w = ex - temX;
                }
            }
            if (side === 1 || side === 4 || side === 7) {
                if (temY + rec.h - ey > recSize) {
                    rec.h = temY + rec.h - ey;
                }
            } else if (side === 3 || side === 6 || side === 8) {
                if (ey - temY > recSize) {
                    rec.h = ey - temY;
                }
            }
        }
    }

    // 画初始数据
    const drawOldRect = (recArrs: REC[]) => {
        if (!recArrs.length) return
        if (!ctx2d) return
        for (let i = 0; i < recArrs.length; i++) {
            // >2的判断是为了防止误触画出来的数据
            if (recArrs[i].w > 2 && recArrs[i].h > 2) {
                ctx2d.beginPath();
                ctx2d.setLineDash([]);
                ctx2d.strokeStyle = "#1D8CF8";  // 矩形框的线条颜色
                if (recArrs[i].type === 0) {
                    ctx2d.setLineDash([20, 5])
                    ctx2d.strokeStyle = "rgb(255, 0, 0)";  // 矩形框的线条颜色
                }
                ctx2d.lineWidth = 2;    // 矩形框的线条宽度
                ctx2d.strokeRect(recArrs[i].x, recArrs[i].y, recArrs[i].w, recArrs[i].h);     // 矩形框
            }
        }
    }

    // 修改鼠标样式
    const changeResizeCursor = (side: number) => {
        if (!canvasDom) return;
        switch (side) {
            case 0:
                canvasDom.style.cursor = "crosshair"; // 十字线光标
                break;
            case 1:
                canvasDom.style.cursor = "se-resize"; // 指向右下角的调整大小光标
                break;
            case 2:
                canvasDom.style.cursor = "e-resize"; // 指向右边的调整大小光标
                break;
            case 3:
                canvasDom.style.cursor = "ne-resize"; // 指向右上角的调整大小光标
                break;
            case 4:
                canvasDom.style.cursor = "sw-resize"; // 指向左下角的调整大小光标
                break;
            case 5:
                canvasDom.style.cursor = "w-resize"; // 指向左边的调整大小光标
                break;
            case 6:
                canvasDom.style.cursor = "nw-resize"; // 指向左上角的调整大小光标
                break;
            case 7:
                canvasDom.style.cursor = "s-resize"; // 指向底部的调整大小光标
                break;
            case 8:
                canvasDom.style.cursor = "n-resize"; // 指向顶部的调整大小光标
                break;
            case 9:
                canvasDom.style.cursor = "move"; // 移动光标
                break;
            default:
                canvasDom.style.cursor = "default"; // 默认光标
        }
    }

    //得到落点在一个框中的区域
    const getEventArea = (index: number, x: number, y: number) => {
        const radious = curObj.radious
        const data = recArrs[index] 

        // 左
        if (x > data.x - radious && x < data.x + radious) {
            if (y > data.y - radious && y < data.y + radious) {
                return 1; // 左上角
            } else if (y < (data.y + (data.h / 2) - radious) && y > (data.y + radious)) {
                return 9
            } else if (y < (data.y + (data.h / 2) + radious) && y > (data.y + (data.h / 2) - radious)) {
                return 2; // 左侧
            } else if (y > (data.y + (data.h / 2) + radious) && y < data.y + data.h - radious) {
                return 9;
            } else if (y > data.y + data.h - radious && y < data.y + data.h + radious) {
                return 3; // 左下角
            } else {
                return -1
            }
            // 右
        } else if (x > data.x + radious && x < data.x + data.w - radious) {
            if (y > data.y - radious && y < data.y + radious) {
                if (x > data.x + radious && x < (data.x + (data.w / 2) - radious)) {
                    return 9
                } else if (x < (data.x + (data.w / 2) + radious) && x > (data.x + (data.w / 2) - radious)) {
                    return 7; // 上侧
                } else if (x < (data.x + data.w - radious) && x > (data.x + (data.w / 2) + radious)) {
                    return 9
                } else {
                    return -1
                }
            } else if (y > data.y + data.h - radious && y < data.y + data.h + radious) {
                if (x > data.x + radious && x < (data.x + (data.w / 2) - radious)) {
                    return 9
                } else if (x < (data.x + (data.w / 2) + radious) && x > (data.x + (data.w / 2) - radious)) {
                    return 8; // 下侧
                } else if (x < (data.x + data.w - radious) && x > (data.x + (data.w / 2) + radious)) {
                    return 9
                } else {
                    return -1
                }
            } else {
                return -1
            }
        } else if (x > data.x + data.w - radious && x < data.x + data.w + radious) {
            if (y > data.y - radious && y < data.y + radious) {
                return 4; // 右上角
            } else if (y < (data.y + (data.h / 2) - radious) && y > (data.y + radious)) {
                return 9
            } else if (y < (data.y + (data.h / 2) + radious) && y > (data.y + (data.h / 2) - radious)) {
                return 5; // 右侧
            } else if (y < (data.y + data.h - radious) && y > (data.y + (data.h / 2) + radious)) {
                return 9
            } else if (y > data.y + data.h - radious && y < data.y + data.h + radious) {
                return 6; // 右下角
            } else {
                return -1
            }
        } else {
            return -1
        }
    }

    // 获取鼠标落点所在矩形的index, -1 表示没有落在任何框内
    const getEventIndex = (x: number, y: number) => {
        if (!recArrs.length) return -1
        for (let i = 0; i < recArrs.length; i++) {
            const index = getEventArea(i, x, y)
            // 有在范围内的，返回index
            if (index !== -1) {
                return i;
            }
        }

        return -1;
    }


     // 鼠标移出画布
     const outFunction = (e: any) => {
        if (!canvasDom) return;
        const target = e.nativeEvent
        const x = target.clientX;
        const y = target.clientY;
        const left = canvasDom.offsetLeft
        const top = canvasDom.offsetTop
        const width = canvasDom.offsetWidth
        const height = canvasDom.offsetHeight
        const limitX = left + width
        const limitY = top + height
        if (x < left || x > limitX || y < top || y > limitY) {
            curObj.draw = false
            curObj.resize = false
            curObj.drag = false
        }
    }

    // 鼠标按下事件
    const downFunction = (e: any) => {
        const target = e.nativeEvent

        // 赋值 x,y 轴起始数据
        curObj.x = target.offsetX
        curObj.y = target.offsetY

        // 判断是否落在的矩形框上
        // 得到落点所在框的序数
        curObj.index = getEventIndex(curObj.x, curObj.y)


        // 【判断是否是多选】
        if (!e.ctrlKey) {
            recArrs.forEach(item => {
                item.type = 1
                item.isNew = false
            })
            
            if (curObj.index === -1) {
                curObj.draw = true
            } else {
                recArrs[curObj.index].type = 0
                curObj.draw = false
                curObj.startX = recArrs[curObj.index]?.x;
                curObj.startY = recArrs[curObj.index]?.y;
                curObj.side = getEventArea(curObj.index, curObj.x, curObj.y);

                if (curObj.side < 9) {
                    curObj.resize = true;
                } else {
                    curObj.drag = true;
                }
            }
        } else {
            // 【多选】
            if (e.ctrlKey && curObj.index > -1) {
                recArrs[curObj.index].type = 0
            } else {
                recArrs.forEach(item => {
                    item.type = 1
                })
            }
        }
        clearCanvas()
        drawOldRect(recArrs)
        drawSelectedRecs(recArrs);
    }

    const getSelectedRecs = (e: any) => {
        const rec = {
            x: curObj.x > e.offsetX ? e.offsetX : curObj.x, // x点
            y: curObj.y > e.offsetY ? e.offsetY : curObj.y, // y点
            w: Math.abs(e.offsetX - curObj.x), // 宽
            h: Math.abs(e.offsetY - curObj.y), // 高
        };

        const select = {
            startX: rec.x,
            startY: rec.y,
            endX: rec.x + rec.w,
            endY: rec.y + rec.h
        }

        recArrs.forEach((item, index) => {
            const theRec = {
                startX: item.x,
                startY: item.y,
                endX: item.x + item.w,
                endY: item.y + item.h
            }

            if (theRec.startX >= select.startX && theRec.startY >= select.startY && theRec.startX <= select.endX && theRec.startY <= select.endY) {
                if (theRec.endX <= select.endX && theRec.endY <= select.endY && theRec.endX >= select.startX && theRec.endY >= select.startY) {
                    drawLitRecs(index)
                    recArrs[index].type = 0
                }
            }
        })
    }

    // 鼠标抬起事件
    const upFunction = (e: any) => {
        const target = e.nativeEvent
        if (!e.ctrlKey) {
            if (curObj.draw && props.mode === Mode.Action) {
                // 添加框图
                curObj.index = recArrs.length - 1
                props.addToRecs(target, curObj)
            } else if (curObj.draw && props.mode === Mode.Default) {
                recArrs.forEach(item => {
                    item.type = 1
                    item.isNew = false
                })  
                getSelectedRecs(target)

            } else if (!curObj.resize && !curObj.drag) {
                const focusIndex = getEventIndex(target.offsetX, target.offsetY)
                if (focusIndex > -1) {
                    curObj.index = focusIndex
                    recArrs[focusIndex].type = 0
                } else {
                    curObj.index = -1
                }
            }
        }

        curObj.draw = false;
        curObj.resize = false
        curObj.drag = false

        // 重绘
        clearCanvas()
        drawOldRect(recArrs)

        drawSelectedRecs(recArrs);
    }

    const contextMenuFunction = (e: any) => {
        e.nativeEvent.preventDefault();
        return false
    }

    return (
        <div>
            <canvas ref={canvasRef}
                onMouseMove={moveFunction}
                onMouseDown={downFunction}
                onMouseUp={upFunction}
                onMouseOut={outFunction}
                onContextMenu={contextMenuFunction}
            />
        </div>
    )
}