export function useClassPosition() {
    function classPositionText(position) {
        return {
            'start' : 'justify-start',
            'center' : 'justify-center',
            'end' : 'justify-end',
            'between' : 'justify-between' 
        } [position]
    }

    const justifyContent = (position) => {
        return {
            'start' : 'justify-start',
            'center' : 'justify-center',
            'end' : 'justify-end',
            'between' : 'justify-between',
            'around' : 'justify-around',
            'evenly' : 'justify-evenly'
        } [position]
    }

    const alignItems = (position) => {
        return {
            'start' : 'items-start',
            'center' : 'items-center',
            'end' : 'items-end',
            'baseline' : 'items-baseline',
            'stretch' : 'items-stretch',
        } [position]
    }

    return {
        classPositionText,
        justifyContent,
        alignItems
    }
}