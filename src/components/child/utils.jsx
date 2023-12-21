export const capitalize = (str) => {
    if (typeof str !== "string") return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
}

//  it is not safe to use innerHTML to set HTML from unknown sources.
export const parseSanitizedHTML = (sanitizedHTML) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(sanitizedHTML, 'text/html');
    return doc.body.innerHTML;
}


// replace 150x150 with 500x500
export const replace150to500 = (url) => {
    if (url.toString().includes("-150x150")) {
        return url.replace("150x150", "500x500");
    }
    return url;
};