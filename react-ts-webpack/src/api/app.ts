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
