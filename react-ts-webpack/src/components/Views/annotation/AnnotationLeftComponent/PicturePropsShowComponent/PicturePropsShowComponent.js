import React, {useEffect, useState} from 'react';
import TaggedVideoSearch from "../../../searchComponent/TaggedVideoSearch";
import {useSelector} from "react-redux";
import REST from "../../../Shared/REST";

const PicturePropsShowComponents = ({...props}) => {
    const {picId}=props
    const loginUser = JSON.parse(localStorage.getItem('is_staff').toLowerCase());
    //获取SearchBar数据 target
    const target=useSelector(state => state.picture.picTarget)
    //获取ResultList数据 annotations
    const annotations=useSelector(state => state.picture.picAnnotations)
    const recArrs=useSelector(state => state.picture.recArrs)
    // SearchResultList列表展示数据
    const [dataList,setDataList]=useState([])
    //SearchBar条件筛选
    const [searchOption,setSearchOption]=useState({user:null,label:null,role:null,labelValue:null})
    // 表单数据
    const [formData, setFormData] = useState({})
    // 表单下拉数据
    const [selectFormData,setSelectFormData]=useState(null)
    //annotation数据state
    const [annotationData,setAnnotationData]=useState(null)
    //根据status点击进行状态切换
    const [selectedStatus,setSelectedStatus]=useState({align:null,value:null})
    //表单实例对象,在点击切换用户操作时，禁用表单
    const [formStatus,setFormStatus]=useState(true)
    //列表项选中的索引index值，以判断是否加样式
    const [selectListItem,setSelectListItem]=useState(null)
    //更新数据里面的width,height,left,top
    const [recData,setRecData]=useState([])
    const [search, setSearch] = useState({ label: null,role: null, label_value: null}) //当前下拉框选中的值

    //当前选择的标注对象，默认target_id为null
    const [userId,setUserId]=useState(null)

    useEffect(()=>{
        //默认选择第一个
        if(target) {
            setUserId(target[0].id)
        }
    },[target])

    //将数据格式按照视频页面的格式处理函数
    function convertAnnotationsToTempFormat(annotations) {
        return annotations.data.map(user => {
            // 创建一个新对象来存储转换后的数据
            const newUser = {
                userId: user.userId,
                userName: user.userName,
                annotations: user.annotations.map(annotation => {
                    // 复制注释对象，避免直接修改原对象
                    const newAnnotation = { ...annotation };
                    // 确保labelValues字段存在并复制
                    newAnnotation.labelValues = annotation.labelValues || [];
                    return newAnnotation;
                })
            };

            return newUser;
        });
    }

    //labelValues里面的多个标签值value的拼接
    const handellabelValues=(labelValues)=>{
        let str=''
        labelValues.forEach(item=>{
            str+=" "+item.value
        })
        return str
    }

    const dealAnnotations=(annotations)=>{
        if(annotations!=null) {
            const convertedData = convertAnnotationsToTempFormat(annotations);
            return convertedData? convertedData.map(item=>({
                userName:item.userName,
                userId:item.userId,
                annotations:item.annotations.map(annotationItem=>({
                    ...annotationItem,
                    prop1:annotationItem.align,
                    prop2:handellabelValues(annotationItem.labelValues)+"("+annotationItem.left+","+annotationItem.top+")",
                    prop3: "("+annotationItem.width+","+annotationItem.height+")"
                }))
            })):[]
        }
    }

    //更新数据里面的width,height,left,top
    const dealrecArrs=(annotationData, recArrs)=>{
        recArrs.forEach(rec => {
            // 查找对应的annotationData对象
            let annotationObj = annotationData.find(obj => obj.annotations.some(anno => anno.id === rec.id));
            if (annotationObj) {
                // 找到对应的annotationData对象后，更新数据
                annotationObj.annotations.forEach(anno => {
                    if (anno.id === rec.id) {
                        anno.width = rec.w;
                        anno.height = rec.h;
                        anno.left = rec.x;
                        anno.top = rec.y;
                        anno.prop2 =  handellabelValues(anno.labelValues)+"("+anno.left+","+anno.top+")";
                        anno.prop3 ="("+anno.width+","+anno.height+")";
                    }
                });
            }
        });
        return annotationData;
    }

    useEffect(()=>{
        //（删除标注）在重新加载数据后禁用表单
        setFormData({})
        if(annotations!=null) {
            setAnnotationData(dealAnnotations(annotations))
            //搜索条件用户默认设置成第一个
            setSearchOption(pre=>({
                ...pre,
                user:annotations.data[0].userName
            }))
        }
    },[annotations])

    useEffect(()=>{
        if(recArrs.length>0&&annotationData!=null) {
            const data=dealrecArrs(annotationData,recArrs)
            setRecData([...data])
        }
    },[recArrs])

    const findLabel=(id,labelValues)=>{
        for (let i = 0; i < labelValues.length; i++) {
            if (labelValues[i].label_id === id) {
                return true;
            }
        }
        return false;
    }

    const findLabelValue=(id,labelValues)=>{
        for (let i = 0; i < labelValues.length; i++) {
            if (labelValues[i].value_id === id) {
                return true;
            }
        }
        return false;
    }

    //监听搜索条件searchOption，把searchOption作为筛选条件
    // 如果发生改变就重新显示列表数据
    const searchOptionFilter=(newSearch,data)=>{
        const tempData=JSON.parse(JSON.stringify(data))
        if(tempData!=null&&tempData!=undefined&&tempData.length>0) {
            const temp=tempData.filter(item=>item.userName===searchOption.user)[0]
            if(temp!=undefined) {
                if(newSearch!=undefined) {
                    const andata=temp.annotations
                    if(newSearch.user!=null&&newSearch.role!=null&&newSearch.label===null&&newSearch.labelValue===null) {
                        setDataList(andata.filter(item=>item.annotator===newSearch.user&&item.target_id===newSearch.role))
                    }else if(newSearch.user!=null&&newSearch.role!=null&&newSearch.label!=null&&newSearch.labelValue===null) {
                        setDataList(andata.filter(item=>item.annotator===newSearch.user&&item.target_id===newSearch.role&&findLabel(newSearch.label,item.labelValues)))
                    }else if(newSearch.user!=null&&newSearch.role!=null&&newSearch.label!=null&&newSearch.labelValue!=null) {
                        setDataList(andata.filter(item=>item.annotator===newSearch.user&&item.target_id===newSearch.role&&
                            findLabel(newSearch.label,item.labelValues)&&findLabelValue(newSearch.labelValue,item.labelValues)))
                    }
                }
            }
        }
    }

    useEffect(()=>{
        searchOptionFilter(searchOption,annotationData)
    },[searchOption])

    //获取表单数据--下拉框选项
    const getSelectFormData=async ()=>{
        await REST.getAnnotationOptions().then(res=>{
            if(res.code===1) {
                setSelectFormData(res.data)
            }
        })
    }

    useEffect(()=>{
        getSelectFormData()
    },[])

    //取消状态选中、列表、表单、视频进度条选中
    const cancelStatus=function () {
        setSelectedStatus({align:null,value:null}) //取消状态筛选选中
        setSelectListItem(null) //取消列表项选中
        setFormStatus(true) //禁用表单
        setFormData({})
    }

    return (
        <div>
            {/*<PropsShowComponent data={props} />*/}
            <TaggedVideoSearch
                target={target}
                annotations={annotationData}
                setAnnotationData={setAnnotationData}
                flag={'pic'}
                dataList={dataList}
                setDataList={setDataList}
                searchOption={searchOption}
                setSearchOption={setSearchOption}
                searchOptionFilter={searchOptionFilter}
                formData={formData}
                setFormData={setFormData}
                selectFormData={selectFormData}
                loginUser={loginUser}
                picId={picId}
                dealAnnotations={dealAnnotations}
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
                formStatus={formStatus}
                setFormStatus={setFormStatus}
                selectListItem={selectListItem}
                setSelectListItem={setSelectListItem}
                cancelStatus={cancelStatus}
                recData={recData}
                search={search}
                setSearch={setSearch}
                userId={userId}
                setUserId={setUserId}
            />
        </div>
    )
};

export default PicturePropsShowComponents;