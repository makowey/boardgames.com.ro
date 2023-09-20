export function stripHtml(value: string) {
    return value.replace(/(<([^>]+)>)/gi, "");
}