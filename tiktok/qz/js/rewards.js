/**
 * Handles the reward distribution and display
 */

// Configurações
const STARTING_BALANCE = 100;
const LAST_REWARD = 54.87;
const EXTRA_REWARD = 404;
const DISTRIBUTED_REWARD = EXTRA_REWARD - LAST_REWARD; // 404.64
const TOTAL_REWARD = 559.51;
const NUM_QUESTIONS = 11;

// Som de dinheiro
const moneySound = new Audio('https://br.app-lucrando.online/media/dinheiro.mp3');

// Geração de recompensas
function generateRewards() {
  const rewards = [];
  let remainingTotal = DISTRIBUTED_REWARD;
  let remainingQuestions = NUM_QUESTIONS - 1; // 10 perguntas (exceto a última)

  for (let i = 0; i < NUM_QUESTIONS - 1; i++) {
    const maxPortion = remainingTotal / remainingQuestions * 1.5;
    const minPortion = remainingTotal / remainingQuestions * 0.5;

    const reward = getRandomNumber(minPortion, maxPortion);
    const roundedReward = Math.round(reward * 100) / 100;

    rewards.push(roundedReward);
    remainingTotal -= roundedReward;
    remainingQuestions--;
  }

  // Embaralhar as 10 primeiras recompensas
  const shuffledRewards = shuffleArray(rewards);
  // Adicionar a última recompensa fixa
  shuffledRewards.push(LAST_REWARD);

  return shuffledRewards;
}

// Elementos do DOM
const rewardModal = document.getElementById('reward-modal');
const rewardValue = document.getElementById('reward-value');
const continueRewardBtn = document.getElementById('continue-reward-btn');
const currentBalance = document.getElementById('current-balance');
const finalModal = document.getElementById('final-modal');
const totalReward = document.getElementById('total-reward');
const restartBtn = document.getElementById('restart-btn');

// Estado inicial
let rewards = generateRewards();
let totalEarned = STARTING_BALANCE;
currentBalance.textContent = formatCurrency(totalEarned);

// Animação de valor
function animateValue(element, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const current = progress * (end - start) + start;
    element.textContent = formatCurrency(current);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

// Mostra recompensa por pergunta
function showReward(questionIndex) {
  const reward = rewards[questionIndex];
  const previousBalance = totalEarned;
  totalEarned += reward;

  animateValue(currentBalance, previousBalance, totalEarned, 1000);

  rewardValue.textContent = "0.00";
  rewardModal.classList.add('active');

  setTimeout(() => {
    startConfetti();
    moneySound.play();
    animateValue(rewardValue, 0, reward, 1000);
  }, 100);

  animateElement(document.querySelector('.reward-amount'), 'bounce');
}

// Esconde modal de recompensa
function hideReward() {
  rewardModal.classList.remove('active');
  stopConfetti();
}

// Mostra recompensa final
function showFinalReward() {
  totalReward.textContent = "0.00";
  finalModal.classList.add('active');

  setTimeout(() => {
    startConfetti();
    moneySound.play();
    animateValue(totalReward, STARTING_BALANCE, TOTAL_REWARD, 2000);
  }, 100);

  animateElement(document.querySelector('.final-content .reward-amount'), 'bounce');
}

// Esconde modal final
function hideFinalReward() {
  finalModal.classList.remove('active');
  stopConfetti();
}

// Botões
continueRewardBtn.addEventListener('click', () => {
  hideReward();
  nextQuestion();
});

restartBtn.addEventListener('click', () => {
  hideFinalReward();
  showPage('withdraw');
});
