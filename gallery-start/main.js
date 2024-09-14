const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
// 이미지 파일 이름 배열 선언
const imageFilenames = ['pic1.jpg', 'pic2.jpg', 'pic3.jpg', 'pic4.jpg', 'pic5.jpg'];

/* Declaring the alternative text for each image file */
// 각 이미지 파일에 대한 대체 텍스트 선언
const altTexts = ['이미지 1', '이미지 2', '이미지 3', '이미지 4', '이미지 5'];

/* Looping through images */
// 이미지 반복
for (let i = 0; i < imageFilenames.length; i++) {
    const newImage = document.createElement('img');
    newImage.setAttribute('src',  `images/${imageFilenames[i]}`);
    newImage.setAttribute('alt', altTexts[i]);

    // onclick 핸들러를 각 섬네일 이미지에 추가하기
    newImage.addEventListener('click', () => {
        displayedImage.setAttribute('src', newImage.getAttribute('src'));
        displayedImage.setAttribute('alt', newImage.getAttribute('alt'));
    });

    thumbBar.appendChild(newImage);
}

/* Wiring up the Darken/Lighten button */
/* 어두워지게/밝게 하는 버튼의 핸들러 설정 */
btn.addEventListener('click', () => {
    const currentClass = btn.getAttribute('class');

    if (currentClass === 'dark') {
        btn.setAttribute('class', 'light');
        btn.textContent = 'Lighten';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    } else {
        btn.setAttribute('class', 'dark');
        btn.textContent = 'Darken';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    }
});