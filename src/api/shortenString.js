const shortenFileName = (name) => {
    return name.length > 15? name.slice(0, 15) + '...' : name;
};


export {
    shortenFileName,
}