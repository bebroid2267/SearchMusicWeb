function triggerEvent(msg) {
    const clickQuaeryButton = new CustomEvent('clickEvent', {
        detail: { message: msg }
    });
    document.dispatchEvent(clickQuaeryButton);
}