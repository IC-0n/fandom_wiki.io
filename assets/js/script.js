document.addEventListener('DOMContentLoaded', () => {
    // Логика авторизации
    const authForm = document.getElementById('authForm');
    if (authForm) {
        authForm.addEventListener('submit', (event) => {
            event.preventDefault();

            let hasError = false;

            // Очистка сообщений об ошибках
            document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

            // Валидация логина
            const loginInput = document.getElementById('login');
            if (!/^[а-яА-ЯёЁ0-9]{4,10}$/.test(loginInput.value)) {
                document.getElementById('login-error').textContent = 'Логин должен содержать от 4 до 10 символов русского алфавита и/или цифр.';
                hasError = true;
            }

            // Валидация даты рождения
            const birthDateInput = document.getElementById('birthDate');
            const birthDate = new Date(birthDateInput.value);
            const currentDate = new Date();
            if (!birthDateInput.value || birthDate.getFullYear() < 1950 || birthDate > currentDate) {
                document.getElementById('birthdate-error').textContent = 'Дата рождения должна быть не ранее 1950 года и не позже текущей даты.';
                hasError = true;
            }

            // Валидация пола
            const genderSelect = document.getElementById('gender');
            if (!genderSelect.value) {
                document.getElementById('gender-error').textContent = 'Пожалуйста, выберите пол.';
                hasError = true;
            }

            // Если ошибок нет, сохраняем данные авторизации
            if (!hasError) {
                sessionStorage.setItem('userLogin', loginInput.value);
                sessionStorage.setItem('userBirthdate', birthDateInput.value);
                sessionStorage.setItem('userGender', genderSelect.value);
                window.location.href = 'dictionary.html'; // Перенаправление на главную страницу
            }
        });
    }

    // Проверка авторизации на других страницах
    if (!sessionStorage.getItem('userLogin')) {
        if (!authForm) {
            window.location.href = 'index.html';
        }
    } else {
        // Закрепление логина в заголовке
        const userLogin = sessionStorage.getItem('userLogin');
        const userGreeting = document.getElementById('user-greeting');
        if (userGreeting) {
            userGreeting.textContent = `Добро пожаловать, ${userLogin}!`;
        }
    }

    // Логика теста
    const testForm = document.getElementById('testForm');
    if (testForm) {
        testForm.addEventListener('submit', (event) => {
            event.preventDefault();

            let score = 0;
            const totalQuestions = 6;

            // Ответы теста
            const answers = {
                answer1: 'Хинамидзава',
                answer2: 'Кейчи',
                answer3: 'Рика',
                answer4: 'Акасака',
                answer5: 'Ватанагаси',
                answer6: 'Рюкиши07'
            };

            Object.keys(answers).forEach((key, index) => {
                let userAnswer = null;

                // Проверяем, это текстовое поле или радиокнопки
                const inputField = document.querySelector(`[name="${key}"]`);
                const radioButton = document.querySelector(`[name="${key}"]:checked`);

                if (inputField && inputField.type === 'text') {
                    userAnswer = inputField.value;
                } else if (radioButton) {
                    userAnswer = radioButton.value;
                }

                const correctAnswer = answers[key];
                const feedback = document.getElementById(`feedback${index + 1}`);

                // Сравниваем ответы с учётом регистра и пробелов
                if (userAnswer?.trim().toLowerCase() === correctAnswer.trim().toLowerCase()) {
                    score++;
                    feedback.textContent = 'Верно!';
                    feedback.style.color = 'green';
                } else {
                    feedback.textContent = `Неверно. Правильный ответ: ${correctAnswer}`;
                    feedback.style.color = 'red';
                }
            });

            // Отображение итогового результата
            document.getElementById('testResult').textContent = `Вы набрали ${score} из ${totalQuestions} баллов.`;
            sessionStorage.setItem('testResult', `${score} из ${totalQuestions}`);
            document.getElementById('retryTest').style.display = 'block';
        });

        // Сброс теста
        document.getElementById('retryTest').addEventListener('click', () => {
            sessionStorage.removeItem('testResult');
            testForm.reset();
            document.querySelectorAll('.feedback').forEach(feedback => feedback.textContent = '');
            document.getElementById('testResult').textContent = '';
            document.getElementById('retryTest').style.display = 'none';
        });
    }

    // Логика для словаря
    const descriptions = {
        hanyuu: 'Ханю - загадочный персонаж с мистической аурой.',
        keiti: 'Кейчи Маэбара - главный герой, прибывший в деревню.',
        mion: 'Мион Сонодзаки - лидер клуба друзей.',
        rika: 'Рика Фуруде - загадочная девочка с глубокими знаниями.',
        satoko: 'Сатоко Ходзё - младшая сестра с трудной судьбой.',
        satosi: 'Сатоси Ходзё - брат Сатоко, пропавший в деревне.',
        sion: 'Шион Сонодзаки - сестра-близнец Мион с тёмной стороной.',
        rena: 'Рэна Рюгу - загадочная девушка с любопытным характером.',
        hinamizawa: 'Хинамидзава - деревня, в которой разворачиваются события.',
        oyashiro: 'Проклятие Ояширо-сама - мистическая легенда деревни.'
    };

    const characterList = document.getElementById('character-list');
    const descriptionText = document.getElementById('description-text');
    const searchInput = document.getElementById('search');

    // Отображение описания
    if (characterList) {
        characterList.addEventListener('click', (event) => {
            const key = event.target.getAttribute('data-key');
            if (key && descriptions[key]) {
                descriptionText.textContent = descriptions[key];
            }
        });
    }

    // Фильтрация списка
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const query = searchInput.value.toLowerCase();
            const items = characterList.querySelectorAll('li');

            items.forEach((item) => {
                const text = item.textContent.toLowerCase();
                item.style.display = text.includes(query) ? '' : 'none';
            });
        });
    }

    // Логика для слайдера
    const slides = [
        { src: 'assets/images/hanyuu.jpg', caption: 'Ханю - загадочный персонаж с мистической аурой' },
        { src: 'assets/images/keiti.jpg', caption: 'Кейчи Маэбара - главный герой, прибывший в деревню' },
        { src: 'assets/images/mion.jpg', caption: 'Мион Сонодзаки - лидер клуба друзей' },
        { src: 'assets/images/rika.jpg', caption: 'Рика Фуруде - загадочная девочка с глубокими знаниями' },
        { src: 'assets/images/satoko.jpg', caption: 'Сатоко Ходзё - младшая сестра с трудной судьбой' },
        { src: 'assets/images/satosi.jpg', caption: 'Сатоси Ходзё - брат Сатоко, пропавший в деревне' },
        { src: 'assets/images/sion.jpg', caption: 'Шион Сонодзаки - сестра-близнец Мион с тёмной стороной' },
        { src: 'assets/images/rena.jpg', caption: 'Рэна Рюгу - загадочная девушка с любопытным характером' }
    ];

    let currentSlide = 0;
    const slideImage = document.getElementById('current-slide');
    const slideCaption = document.getElementById('slide-caption');
    const slideInfo = document.getElementById('slide-info');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');

    function updateSlide() {
        slideImage.src = slides[currentSlide].src;
        slideImage.alt = slides[currentSlide].caption;
        slideCaption.textContent = slides[currentSlide].caption;
        slideInfo.textContent = `${currentSlide + 1} слайд из ${slides.length}`;

        prevButton.disabled = currentSlide === 0;
        nextButton.disabled = currentSlide === slides.length - 1;
    }

    prevButton.addEventListener('click', () => {
        if (currentSlide > 0) {
            currentSlide--;
            updateSlide();
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentSlide < slides.length - 1) {
            currentSlide++;
            updateSlide();
        }
    });

    updateSlide();
});
