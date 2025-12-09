// 1. DADOS DO QUIZ: Perguntas, Respostas e Resposta Correta (TEMAS DE SALÃO DE UNHAS)
const quizQuestions = [
    {
        question: "Qual é o principal benefício de aplicar uma base fortalecedora antes de esmaltar?",
        options: ["Garantir que a cor do esmalte fique mais forte", "Proteger a unha natural e evitar manchas", "Fazer o esmalte secar em menos tempo", "Apenas estética, não tem benefício funcional"],
        answer: "Proteger a unha natural e evitar manchas"
    },
    {
        question: "Qual técnica de alongamento de unhas exige obrigatoriamente o uso de uma cabine UV/LED para secagem?",
        options: ["Fibra de Vidro", "Unha de Acrílico", "Unha de Gel", "Unha Postiça Comum"],
        answer: "Unha de Gel"
    },
    {
        question: "Na Nail Art, o que significa a sigla 'Francesinha Reversa'?",
        options: ["Unha totalmente pintada de branco", "Um desenho em V na ponta da unha", "Um traço colorido na base (na lúnula)", "Aplicar esmalte com a unha virada para baixo"],
        answer: "Um traço colorido na base (na lúnula)"
    },
    {
        question: "Qual produto é essencial para manter a hidratação e a flexibilidade das cutículas, evitando que fiquem ressecadas?",
        options: ["Óleo secante", "Spray fixador de esmalte", "Óleo de cutícula (ou cera)", "Removedor de esmalte sem acetona"],
        answer: "Óleo de cutícula (ou cera)"
    },
    {
        question: "Qual o período ideal (em média) para fazer a manutenção de um alongamento de unhas?",
        options: ["A cada 7 dias", "Entre 15 a 21 dias", "A cada 45 dias", "Apenas quando a unha cair"],
        answer: "Entre 15 a 21 dias"
    }
];

// 2. CONFIGURAÇÃO DE DESCONTOS (De 0 a 5 acertos)
const discountTiers = [
    { minScore: 0, maxScore: 1, message: "Quase lá, mas seu mimo está garantido! Use 5% OFF em qualquer serviço!", coupon: "QUIZUNHA5", cta: "WhatsApp" },
    { minScore: 2, maxScore: 3, message: "Arrasou! Você ganhou 15% OFF no seu próximo alongamento ou design!", coupon: "QUIZUNHA15", cta: "WhatsApp" },
    { minScore: 4, maxScore: 5, message: "Parabéns, Nail Expert! Seu prêmio é o máximo de 25% OFF em qualquer serviço ou produto!", coupon: "QUIZUNHA25", cta: "WhatsApp" }
];

// 3. VARIÁVEIS DE ESTADO DO JOGO
let currentQuestionIndex = 0;
let score = 0;
let answerSelected = false;

// 4. REFERÊNCIAS DO DOM
const questionNumEl = document.getElementById('question-number');
const questionTextEl = document.getElementById('question-text');
const optionsContainerEl = document.getElementById('options-container');
const nextButton = document.getElementById('next-button');
const feedbackEl = document.getElementById('feedback');
const quizContainer = document.getElementById('quiz-container');
const resultContainer = document.getElementById('result-container');
const scoreTextEl = document.getElementById('score-text');
const discountMessageEl = document.getElementById('discount-message');
const couponCodeEl = document.getElementById('coupon-code');
const ctaLink = document.getElementById('cta-link');

// 5. FUNÇÕES PRINCIPAIS

function loadQuestion() {
    answerSelected = false;
    nextButton.disabled = true;
    feedbackEl.textContent = '';

    if (currentQuestionIndex < quizQuestions.length) {
        const currentQ = quizQuestions[currentQuestionIndex];
        
        questionNumEl.textContent = `Pergunta ${currentQuestionIndex + 1} de ${quizQuestions.length}`;
        questionTextEl.textContent = currentQ.question;
        optionsContainerEl.innerHTML = '';

        currentQ.options.forEach(option => {
            const optionElement = document.createElement('div');
            optionElement.classList.add('option');
            optionElement.textContent = option;
            optionElement.addEventListener('click', () => selectAnswer(optionElement, option, currentQ.answer));
            optionsContainerEl.appendChild(optionElement);
        });
    } else {
        showResults();
    }
}

function selectAnswer(selectedEl, selectedAnswer, correctAnswer) {
    if (answerSelected) return; 

    answerSelected = true;
    nextButton.disabled = false;
    
    selectedEl.style.fontWeight = 'bold';
    
    if (selectedAnswer === correctAnswer) {
        selectedEl.classList.add('correct');
        score++;
        feedbackEl.textContent = "Acertou! Unhas impecáveis e cérebro afiado!";
    } else {
        selectedEl.classList.add('incorrect');
        feedbackEl.textContent = `Errou. A resposta correta era: ${correctAnswer}`;
    }

    Array.from(optionsContainerEl.children).forEach(option => {
        option.style.pointerEvents = 'none';
        if (option.textContent === correctAnswer && option !== selectedEl) {
             option.classList.add('correct');
        }
    });
}

function showResults() {
    quizContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');

    const tier = discountTiers.find(t => score >= t.minScore && score <= t.maxScore);

    scoreTextEl.textContent = `Você acertou ${score} de ${quizQuestions.length} perguntas.`;
    discountMessageEl.textContent = tier.message;
    couponCodeEl.textContent = tier.coupon;
    
    // LINK DO WHATSAPP CONFIGURADO (COM NÚMERO E CÓDIGO)
    const whatsappLink = "https://wa.me/5532988073101?text=Ol%C3%A1%2C%20ganhei%20um%20cupom%20no%20Quiz!%20Meu%20c%C3%B3digo%20%C3%A9%3A%20" + tier.coupon;

    ctaLink.href = whatsappLink;
    ctaLink.textContent = `CHAMAR NO WHATSAPP E USAR O CÓDIGO!`;
    
    // Adiciona a instrução para o cliente
    const instructionMessage = document.createElement('p');
    instructionMessage.style.marginTop = '15px';
    instructionMessage.style.fontSize = '0.9em';
    instructionMessage.style.color = '#dc3545';
    instructionMessage.style.fontWeight = 'bold';
    instructionMessage.textContent = 'Atenção: Ao clicar, o código é enviado automaticamente no chat. Basta agendar!';
    
    const existingInstruction = resultContainer.querySelector('#instruction-message');
    if (existingInstruction) {
        resultContainer.removeChild(existingInstruction);
    }
    instructionMessage.id = 'instruction-message';
    resultContainer.insertBefore(instructionMessage, ctaLink);
}

// 6. EVENT LISTENERS
nextButton.addEventListener('click', () => {
    if (answerSelected) {
        currentQuestionIndex++;
        loadQuestion();
    }
});

// 7. INICIALIZAÇÃO
loadQuestion();