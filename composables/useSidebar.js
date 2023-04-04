export function useSidebar() {
    let isShowSidebar = useLocalStorage('show-drawer', true);
    let isRightSide = ref(false);
    let isRailSidebar = useLocalStorage('rail-in-drawer', true);

    function show() {
        isShowSidebar.value = true;
    }

    function hide() {
        isShowSidebar.value = false;
    }

    function toggleShow() {
        isShowSidebar.value === true ? hide() : show();
    }

    function right() {
        isRightSide.value = true;
    }

    function left() {
        isRightSide.value = false;
    }

    function switchSide() {
        isRightSide.value === true ? right() : left();
    }

    function reduce() {
        isRailSidebar.value = true;
    }

    function enlarge() {
        isRailSidebar.value = false;
    }

    function changeSizeSidebar() {
        isRailSidebar.value === false ? reduce() : enlarge();
    }
    return {
        isShowSidebar,
        isRightSide,
        hide,
        toggleShow,
        switchSide,
        isRailSidebar,
        changeSizeSidebar
    };
}
