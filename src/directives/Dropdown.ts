const toggleDisplay = (el: HTMLElement) => {
  const lastChild = el.lastElementChild as HTMLElement
  if (lastChild) {
    if (lastChild.style.display === 'none' || lastChild.style.display === '') {
      lastChild.style.display = 'block'
    } else {
      lastChild.style.display = 'none'
    }
  }
}

export default {
  mounted(el: HTMLElement) {
    el.addEventListener('click', (event: Event) => {
      toggleDisplay(el)
    })
  },
  unmounted(el: HTMLElement) {
    el.removeEventListener('click', () => toggleDisplay(el))
  }
}
