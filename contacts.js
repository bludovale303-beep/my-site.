document.querySelectorAll('.faq-item').forEach(item => {
    let question = item.querySelector('.faq-q');
    let answer = item.querySelector('.faq-a');
    
    question.addEventListener('click', function() {
        answer.classList.toggle('show');
    });
});

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let message = document.getElementById('message').value;
    let consent = document.getElementById('consent').checked;
    
    if(name && email && message && consent) {
        let msgDiv = document.getElementById('successMsg');
        msgDiv.textContent = 'Отправлено! Скоро отвечу.';
        msgDiv.classList.add('show');
        
        this.reset();
        
        setTimeout(() => {
            msgDiv.classList.remove('show');
        }, 3000);
    }
});