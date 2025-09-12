import { CensusData } from "./definitions";

export const formatDateToLocal = (
    dateStr: string,
    locale: string = 'en-US'
) => {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'numeric',
        // year: 'numeric',
    };
    return new Intl.DateTimeFormat(locale, options).format(date);
    
}

export const generateYAxis = (censusData: CensusData[]) => {
    // Calculate what labels we need display on the y-axis
    // based on highest record in 1000s
    const yAxisLabels = [];
    const highestRecord = Math.max(...censusData.map((item) => item.census));
    const topLabel = Math.ceil(highestRecord / 1000) * 1000;

    for (let i = topLabel; i >= 0; i -= 1000) {
        yAxisLabels.push(`${i / 1000}k` );
    }

    return { yAxisLabels, topLabel};
}


export const generatePagination = (currentPage: number, totalPages: number) => {
    // If the total number of pages is 7 or less,
    // display all pages without any ellipsis
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // If the current page is among the first 3 pages,
    // Show the first 3, an ellipsis, and the last two pages
    if (currentPage <= 3) {
        return [1, 2, 3, '...', totalPages -1, totalPages];
    }

    // If the current page is among the last 3 pages,
    // Show the first 2 pages, an ellipsis, and the last 3 pages
    if (currentPage >= totalPages - 2) {
        return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
    }

    // if the current page is somewhere in the middle,
    // show the first page, an ellipsis, the current page and it neighbors
    // another ellipsis, and the last page.
    if (currentPage > 3 && currentPage < totalPages ) {
        return [
            1,
            '...',
            currentPage - 1,
            currentPage,
            currentPage + 1,
            '...',
            totalPages
        ];
    };
};