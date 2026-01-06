
/**
 * Mobile Carousel for About Section
 * Handles the rotation of "Genç Yenilikçiler", "Çok Alanlı Uzmanlık", "Global Vizyon"
 * cards on mobile devices with a specific morphing animation.
 */

export function initMobileCarousel() {
  const aboutSection = document.getElementById('about');
  if (!aboutSection) return;

  const cardsContainer = aboutSection.querySelector('.grid-3');
  if (!cardsContainer) return;

  const cards = Array.from(cardsContainer.querySelectorAll('.card'));
  if (cards.length < 3) return; // We need at least 3 cards for this specific effect

  let intervalId = null;
  let currentIndex = 0;
  // Index 0: Active
  // Index 1: Preview 1
  // Index 2: Preview 2

  function updateClasses() {
    // Clean up all special classes first
    cards.forEach(card => {
      card.classList.remove('mobile-active', 'mobile-preview-1', 'mobile-preview-2', 'mobile-hidden');
    });

    // Calculate indices based on currentIndex
    // activeIndex = currentIndex
    // preview1Index = (currentIndex + 1) % 3
    // preview2Index = (currentIndex + 2) % 3

    const activeIndex = currentIndex % cards.length;
    const preview1Index = (currentIndex + 1) % cards.length;
    const preview2Index = (currentIndex + 2) % cards.length;

    // Apply classes
    cards[activeIndex].classList.add('mobile-active');
    cards[preview1Index].classList.add('mobile-preview-1');
    cards[preview2Index].classList.add('mobile-preview-2');

    // If there were more than 3, others would be hidden, but we have exactly 3 for this request.
    // For robustness if more cards are added later:
    cards.forEach((card, index) => {
        if (index !== activeIndex && index !== preview1Index && index !== preview2Index) {
            card.classList.add('mobile-hidden');
        }
    });
  }

  function startCarousel() {
    if (intervalId) return;

    cardsContainer.classList.add('mobile-carousel-container');
    updateClasses(); // Set initial state

    intervalId = setInterval(() => {
      currentIndex = (currentIndex + 1) % cards.length;
      updateClasses();
    }, 4000); // 4 seconds per slide
  }

  function stopCarousel() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
    cardsContainer.classList.remove('mobile-carousel-container');
    
    // Clean up classes to restore desktop view
    cards.forEach(card => {
      card.classList.remove('mobile-active', 'mobile-preview-1', 'mobile-preview-2', 'mobile-hidden');
    });
  }

  // Check screen size
  function checkScreenSize() {
    if (window.matchMedia('(max-width: 768px)').matches) {
      startCarousel();
    } else {
      stopCarousel();
    }
  }

  // Initial check
  checkScreenSize();

  // Listener
  window.addEventListener('resize', checkScreenSize);
}
