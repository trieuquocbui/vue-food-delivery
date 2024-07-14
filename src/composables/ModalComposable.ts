import type ModalModel from '@/models/ModalModel'
import { reactive } from 'vue'

export const useModal = () => {
  const data = reactive<ModalModel>({
    display: 'none',
    showBtn: undefined,
    title: undefined,
    submitName: undefined,
    type: undefined
  })

  const close = () => {
    data.display = 'none'
    data.title = undefined
    data.showBtn = undefined
    data.submitName = undefined
    data.type = undefined
  }

  const open = (
    title: string = 'Thông báo',
    showBtn: boolean = true,
    submitName: string = 'Xác nhận',
    type: string = 'message'
  ) => {
    data.display = 'flex'
    data.title = title
    data.showBtn = showBtn
    data.submitName = submitName
    data.type = type
  }

  return { data, close, open }
}
