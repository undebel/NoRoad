const saveFile = (file) => {
    const content = JSON.stringify(file);
    const blob = new Blob([content], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "noroad.conf";
    link.click();
};

export { saveFile };