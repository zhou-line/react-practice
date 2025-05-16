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