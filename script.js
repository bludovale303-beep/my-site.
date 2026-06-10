// Функция для подсчёта фотографий
function countPhotos() {
    let photos = document.querySelectorAll('.photo');
    let counter = document.getElementById('count');
    
    if (counter) {
        counter.textContent = photos.length;
    }
    
    console.log('Найдено фотографий:', photos.length);
}

// Функция для работы с лайками
function setupLikes() {
    let likeButtons = document.querySelectorAll('.like-btn');
    let totalLikesElement = document.getElementById('total-likes');
    let totalLikes = 0;
    
    // Для каждой кнопки лайка
    likeButtons.forEach(function(button) {
        // При клике на кнопку
        button.addEventListener('click', function() {
            let likesSpan = this.querySelector('.likes');
            let currentLikes = parseInt(likesSpan.textContent);
            
            if (this.classList.contains('liked')) {
                // Убираем лайк
                currentLikes--;
                totalLikes--;
                this.classList.remove('liked');
            } else {
                // Добавляем лайк
                currentLikes++;
                totalLikes++;
                this.classList.add('liked');
            }
            
            // Обновляем счётчики
            likesSpan.textContent = currentLikes;
            totalLikesElement.textContent = totalLikes;
            
            // Анимация
            this.style.transform = 'scale(1.2)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 300);
            
            console.log('Лайков всего:', totalLikes);
        });
    });
}

// Когда страница загрузится
document.addEventListener('DOMContentLoaded', function() {
    console.log('Галерея загружена!');
    
    countPhotos();
    setupLikes();
    
    // Показываем, что JavaScript работает
    setTimeout(function() {
        console.log('✅ JavaScript работает правильно!');
    }, 1000);
});
  // Этот скрипт идентичен тому, что в index.html
             document.addEventListener('DOMContentLoaded', () => {
                 const mainContent = document.querySelector('main');
                 const body = document.body;
 
                 function fadeOut(element, callback) {
                     element.style.transition = 'opacity .5s ease';
                     element.style.opacity = '0';
                     body.style.opacity = '0';
                     setTimeout(() => {
                         body.style.backgroundColor = getComputedStyle(element).backgroundColor;
                         body.style.opacity = '1';
                         if (callback) callback();
                     }, 500);
                 }
 
                 function fadeIn(element) {
                     element.style.opacity = '0';
                     void element.offsetWidth;
                     element.style.transition = 'opacity .5s ease';
                     element.style.opacity = '1';
                 }
 
                 document.addEventListener('click', (event) => {
                     const isInternalLink = event.target.closest('a')?.href?.startsWith(window.location.origin);
                     if (!isInternalLink) return;
 
                     event.preventDefault();
                     const targetUrl = event.target.closest('a').href;
 
                     fadeOut(mainContent, () => {
                         fetch(targetUrl)
                             .then(response => response.text())
                             .then(data => {
                                 const parser = new DOMParser();
                                 const tempDoc = parser.parseFromString(data, 'text/html');
                                 const newContent = tempDoc.querySelector('main');
                                 if (newContent) {
                                     mainContent.innerHTML = newContent.innerHTML;
                                     fadeIn(mainContent);
                                     window.history.pushState({page: targetUrl}, '', targetUrl);
                                 } else {
                                     window.location.href = targetUrl;
                                 }
                             })
                             .catch(() => window.location.href = targetUrl);
                     });
                 });
             });