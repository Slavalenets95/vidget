const menuList = document.querySelector('.fixed-menu__list')
const primaryBtn = document.querySelector('.fixed-menu__btn.primary')
const primaryItem = document.querySelector('.primary-item')
const popupList = document.querySelector('.popup-list')
let activePopup = null

const closeMenuList = () => {
    menuList.dataset.opened = 'false'
    primaryItem.dataset.active = 'false'

    if (popupList.dataset.opened === 'false') {
        primaryBtn.addEventListener('mouseenter', primaryBtnMouseHandler)
        primaryBtn.removeEventListener('click', primaryBtnClickHandler)
        menuList.removeEventListener('click', menuListClickHandler)
    }

    if (popupList.dataset.opened === 'false' && menuList.dataset.opened === 'false') {
        primaryBtn.addEventListener('mouseenter', primaryBtnMouseHandler)
        primaryBtn.addEventListener('click', primaryBtnMouseHandler)
        menuList.removeEventListener('click', menuListClickHandler)
    }

    if (popupList.dataset.opened === 'true') {
        primaryBtn.addEventListener('click', primaryBtnMouseHandler)
        primaryBtn.removeEventListener('mouseenter', primaryBtnMouseHandler)
        menuList.removeEventListener('click', menuListClickHandler)
    }
}
const openMenuList = () => {
    menuList.dataset.opened = 'true'
    primaryItem.dataset.active = 'true'

    primaryBtn.addEventListener('click', primaryBtnClickHandler)
    menuList.addEventListener('click', menuListClickHandler)
    primaryBtn.removeEventListener('mouseenter', primaryBtnMouseHandler)
}

const openPopupList = (activeEl) => {
    popupList.dataset.opened = 'true'
    activeEl.dataset.active = 'true'
 
    popupList.addEventListener('click', closePopupHandler)
}

const closePopupList = (activeEl) => {
    popupList.dataset.opened = 'false'
    activeEl.dataset.active = 'false'
    popupList.removeEventListener('click', closePopupHandler)
}

const primaryBtnMouseHandler = () => {
    if (popupList.dataset.opened === 'false' && menuList.dataset.opened === 'false') {
        openMenuList()
    }
}

const primaryBtnClickHandler = () => {
    if (popupList.dataset.opened === 'true') {
        openMenuList()
        closePopupList(activePopup)
        return
    }
    else if (menuList.dataset.opened === 'true'){
        closeMenuList()
    }
    else {
        openMenuList()
    } 
}


const menuListClickHandler = (e) => {
    if (e.target.closest('.fixed-menu__list-link') && e.target.closest('.fixed-menu__list-link').dataset.target) {
        const currentElem = e.target.closest('.fixed-menu__list-link')
        activePopup = document.querySelector(`${currentElem.dataset.target}`)
        e.preventDefault()
        openPopupList(activePopup)
        closeMenuList()
    }
}


const closePopupHandler = (e) => {
    if (e.target.closest('.popup-list__close-btn')) {
        const item = e.target.closest('.popup-list__item')
        closePopupList(item)
        primaryBtn.removeEventListener('click', primaryBtnClickHandler)
        if(window.screen.availWidth <= 768) {
            primaryBtn.addEventListener('click', primaryBtnMouseHandler)
        } else {
            primaryBtn.addEventListener('mouseenter', primaryBtnMouseHandler)
        }
    }
}

if(window.screen.availWidth <= 768) {
    primaryBtn.addEventListener('click', primaryBtnMouseHandler)
} else {
    primaryBtn.addEventListener('mouseenter', primaryBtnMouseHandler)
}


