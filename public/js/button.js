window.addEventListener('load', (event) => {
    const countButton = document.querySelector('#count-button');
    const saveButton = document.querySelector('#save-button');
    const resetButton = document.querySelector('#reset-button');

    let count = localStorage.getItem('count') || 0;

    const showCount = (countValue) => {
        const counterElement = document.querySelector('.playground > h2');
        counterElement.textContent = `Click count: ${countValue}`;
    };

    showCount(count);

    countButton.addEventListener('click', (event) => {
        event.preventDefault();
        count++;
        showCount(count);
    });
    saveButton.addEventListener('click', (event) => {
        event.preventDefault();
        localStorage.setItem('count', count);
    });
    resetButton.addEventListener('click', (event) => {
        event.preventDefault();
        localStorage.removeItem('count');
        count = 0;
        showCount(count);
    });
});