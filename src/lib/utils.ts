export function stripHtml(value: string) {
    if(value === null || value?.length === 0) {
        return '';
    }

    return value.replace(/(<([^>]+)>)/gi, "");
}