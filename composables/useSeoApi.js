
export function useSeoApi () {
    const useTitle = () => useState('title')

    const setTitle = (newTitle) => {
        const title = useTitle()
 
        title.value = newTitle
     }

    function createdSeo (data)  {
        return useFetchApi('/api/seo/create', {
            method: 'POST',
            body: data
        })
    }


    const getSeo = (params = {}) => {
        return  useFetchApi('/api/seo/basic', {
            method: 'GET',
            params
        })
    }

    function updateSeo  (params = {}) {
        return  useFetchApi('/api/seo/update', {
            method: 'PUT',
            params
        })
    }


    return {
        createdSeo,
        getSeo,
        updateSeo
    }
}