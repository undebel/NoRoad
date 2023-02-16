// The function that reads the content of a file.
const readFile = (file) => {
    if (file) {
        const reader = new FileReader();

        return new Promise((resolve, reject) => {
            reader.onload = (e) => {
                resolve(e.target.result);
            }
            reader.readAsText(file);
        });
    }
    return {};
}

// The function that save the .conf file in system.
const saveFile = (file) => {
    const content = JSON.stringify(file);
    const blob = new Blob([content], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "noroad.conf";
    link.click();
};

export { saveFile, readFile };