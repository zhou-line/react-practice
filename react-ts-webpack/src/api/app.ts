import request from '../utils/request'

export function handleLabel(data: any) {
  return request({
    url: '/apps/handle_label',
    method: 'post',
    data
  })
}

export function getLabels() {
  return request({
    url: '/apps/get_labels',
    method: 'get'
  })
}

export function handleStudyGroup(data: any) {
  return request({
    url: '/apps/handle_study_group',
    method: 'post',
    data
  })
}

export function getStudyGroup() {
  return request({
    url: '/apps/get_study_groups',
    method: 'get'
  })
}

export function getNotices(params: any) {
  return request({
    url: '/apps/get_notices',
    method: 'get',
    params
  })
}

export function deleteNotices(data: any) {
  return request({
    url: '/apps/delete_notices',
    method: 'post',
    data
  })
}

export function uploadImage(data: any) {
  return request({
    url: '/apps/upload_image',
    method: 'post',
    data
  })
}

export function getImages(params: any) {
  return request({
    url: '/apps/get_images',
    method: 'get',
    params
  })
}

export function getTheImage(params: any) {
  return request({
    url: '/apps/get_image',
    method: 'get',
    params
  })
}

export function checkImage(data: any) {
  return request({
    url: '/apps/check_image',
    method: 'post',
    data
  })
}

export function deleteImages(data: any) {
  return request({
    url: '/apps/delete_image',
    method: 'post',
    data
  })
}


export function addAnnotation(data: any) {
  return request({
    url: '/apps/add_annotation',
    method: 'post',
    data
  })
}

export function editAnnotation(data: any) {
  return request({
    url: '/apps/edit_annotation',
    method: 'post',
    data
  })
}

export function deleteAnnotations(data: any) {
  return request({
    url: '/apps/delete_annotations',
    method: 'post',
    data
  })
}

export function getAnnotations(params: any) {
  return request({
    url: '/apps/get_annotations',
    method: 'get',
    params
  })
}

export function confirmAnnotations(data: any) {
  return request({
    url: '/apps/confirm_annotations',
    method: 'post',
    data
  })
}

export function autoAnnotations(data: any) {
  return request({
    url: '/apps/auto_annotations',
    method: 'post',
    data
  })
}

export function getSclies(params: any) {
  return request({
    url: '/apps/get_sclies',
    method: 'get',
    params
  })
}

export function exportSlices(data: any) {
  return request({
    url: '/apps/export_slices',
    method: 'post',
    data
  })
}

export function allAlign(data: any) {
  return request({
    url: '/apps/all_align',
    method: 'post',
    data
  })
}

export function getALLData(data: any) {
  return request({
    url: '/apps/get_all_data',
    method: 'post',
    data
  })
}

export function getPersonData(data: any) {
  return request({
    url: '/apps/get_person_data',
    method: 'post',
    data
  })
}