const menuList = document.querySelector('.fixed-menu__list')
const primaryBtn = document.querySelector('.fixed-menu__btn.primary')
const primaryItem = document.querySelector('.primary-item')


const closeMenuList = () => {
    menuList.dataset.opened = 'false'
    primaryItem.dataset.active = 'false'

}

const openMenuList = () => {
    menuList.dataset.opened = 'true'
    primaryItem.dataset.active = 'true'

}


const primaryBtnHandler = () => {
     if (menuList.dataset.opened === 'true'){
        closeMenuList()
        primaryBtn.addEventListener('click', primaryBtnHandler)
        primaryBtn.addEventListener('mouseenter', primaryBtnHandler)
    }
    else {
        openMenuList()
        primaryBtn.addEventListener('click', primaryBtnHandler)
        primaryBtn.removeEventListener('mouseenter', primaryBtnHandler)
    } 
}


const menuListClickHandler = (e) => {
        closeMenuList()
}


if(window.screen.availWidth <= 768) {
    primaryBtn.addEventListener('click', primaryBtnHandler)
} else {
    primaryBtn.addEventListener('mouseenter', primaryBtnHandler)
}




