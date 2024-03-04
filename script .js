const quizData = [
            {
                question: '1.Who is first chief minister(Premier) of West Bengal?',
                options: ['(1)Dr. Bidhan Chandra Roy', '(2)Shri Jyoti Basu', '(3)Dr. Prafulla Chandra Ghosh', '(4)Shri Buddhadeb Bhattacharjee'],
                correctAnswer: '(3)Dr. Prafulla Chandra Ghosh'
            },
            {
                question: '2.who is first president in India?',
                options: ['(1)rajendra roy', '(2)khusbant singh', '(3)dilip rana', '(4)Rajendra Prasad'],
                correctAnswer: '(4)Rajendra Prasad'
            },
           
           
           
           
            {
                question: '3.Indian first company name?',
                options: ['(1)tata', '(2)Bombay Burmah Trading Corporation Limited', '(3)khan limited', '(4)haidrabad corporation'],
                correctAnswer: '(2)Bombay Burmah Trading Corporation Limited'
            }
            
            
            
         {
    question: '4. What is the capital of France?',
    options: ['(1)Berlin', '(2)London', '(3)Madrid', '(4)Paris'],
    correctAnswer: '(4)Paris'
},
{
    question: '5. Who wrote "Romeo and Juliet"?',
    options: ['(1)Charles Dickens', '(2)William Shakespeare', '(3)Jane Austen', '(4)Mark Twain'],
    correctAnswer: '(2)William Shakespeare'
},
{
    question: '6. Which planet is known as the Red Planet?',
    options: ['(1)Venus', '(2)Mars', '(3)Jupiter', '(4)Saturn'],
    correctAnswer: '(2)Mars'
},
// Add more questions as needed
  
            
            
            
            // Add more questions as needed
        ];

        let currentQuestion = 0;
        let timer;
        let userScore = 0;
        let incorrectAnswers = 0;

        function loadQuestion() {
            const questionContainer = document.getElementById('question-container');
            const optionsContainer = document.getElementById('options-container');
            const timerContainer = document.getElementById('timer-container');

            questionContainer.textContent = quizData[currentQuestion].question;
            optionsContainer.innerHTML = '';

            quizData[currentQuestion].options.forEach((option) => {
                const button = document.createElement('button');
                button.textContent = option;
                button.addEventListener('click', checkAnswer);
                optionsContainer.appendChild(button);
            });

            // Reset the timer and hide the timer container
            clearTimeout(timer);
            timerContainer.style.display = 'none';
        }

        function checkAnswer(event) {
            const userAnswer = event.target.textContent;
            const correctAnswer = quizData[currentQuestion].correctAnswer;

            const options = document.querySelectorAll('button');
            options.forEach(option => option.removeEventListener('click', checkAnswer));

            if (userAnswer === correctAnswer) {
                // Handle correct answer logic
                alert('Correct!');
                userScore++; // Increment the user's score for correct answers
            } else {
                // Handle incorrect answer logic
                alert('Incorrect. Try again!');
                incorrectAnswers++;

                if (incorrectAnswers === 2) {
                    // Lock options for 10 seconds after 2 incorrect answers
                    lockOptions(10);
                    return;
                }
            }

            // Move to the next question
            currentQuestion++;
            if (currentQuestion < quizData.length) {
                loadQuestion();
            } else {
                // Show the certificate page when the quiz is completed
                document.getElementById('quiz-container').style.display = 'none';
                document.getElementById('certificate-page').style.display = 'block';
            }
        }

        function lockOptions(seconds) {
            const timerContainer = document.getElementById('timer-container');
            let remainingTime = seconds;

            timerContainer.style.display = 'block';

            function updateTimer() {
                timerContainer.textContent = `Retry in ${remainingTime} seconds`;
                remainingTime--;

                if (remainingTime < 0) {
                    clearTimeout(timer);
                    timerContainer.style.display = 'none';
                    incorrectAnswers = 0; // Reset incorrect answers count
                    loadQuestion();
                } else {
                    timer = setTimeout(updateTimer, 1000);
                }
            }

            updateTimer();
        }

        function nextQuestion() {
            const timerContainer = document.getElementById('timer-container');

            // Check if the timer is active
            if (timerContainer.style.display === 'block') {
                alert('Options are locked. Please wait for the timer.');
            } else {
                if (currentQuestion < quizData.length) {
                    loadQuestion();
                } else {
                    // Show the certificate page when the quiz is completed
                    document.getElementById('quiz-container').style.display = 'none';
                    document.getElementById('certificate-page').style.display = 'block';
                }
            }
        }

        function showCertificate() {
            const userName = document.getElementById('name-input').value;
            const certificateContainer = document.getElementById('certificate');

            if (userName.trim() !== '') {
                certificateContainer.innerHTML = `<h2>Certificate of Completion</h2><p>This is to certify that ${userName} has successfully completed the MCQ Quiz with a score of ${userScore}/${quizData.length}.</p>`;
                // You can add a background image style here
                certificateContainer.style.background = 'url("https://i.postimg.cc/QN6KqVhq/huge.png")';
                certificateContainer.style.backgroundSize = 'cover';
                certificateContainer.style.color = '#1b1b1b';
                certificateContainer.style.padding = '80px';
                certificateContainer.style.borderRadius = '8px';
                certificateContainer.style.marginTop = '20px';
                certificateContainer.style.textAlign = 'center';
                certificateContainer.style.display = 'block';
            } else {
                alert('Please enter your name.');
            }
        }

        // Load the first question on page load
        loadQuestion();