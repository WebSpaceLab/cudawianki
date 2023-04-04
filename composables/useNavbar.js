import { ref, computed } from 'vue';

export function useNavbar() {
    let isNavbarDropdown = ref(false);

    function activeNavbarDropdown() {
        isNavbarDropdown.value = true
    }

    function closeNavbarDropdown() {
        isNavbarDropdown.value = false
    }

    return {
        isNavbarDropdown,
        activeNavbarDropdown,
        closeNavbarDropdown
    };
}