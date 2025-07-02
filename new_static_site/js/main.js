document.addEventListener('DOMContentLoaded', () => {
  // --- Theme Toggle ---
  const themeToggleButtons = document.querySelectorAll('.theme-toggle-button');
  const htmlElement = document.documentElement;

  // Function to apply theme (from localStorage or system preference)
  const applyTheme = (theme) => {
    if (theme === 'dark') {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }
  };

  // Load saved theme or default to dark
  let currentTheme = localStorage.getItem('theme') || 'dark';
  applyTheme(currentTheme);

  themeToggleButtons.forEach(button => {
    button.addEventListener('click', () => {
      currentTheme = htmlElement.classList.contains('dark') ? 'light' : 'dark';
      applyTheme(currentTheme);
      localStorage.setItem('theme', currentTheme);
    });
  });

  // --- Mobile Menu ---
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  const xIcon = document.getElementById('x-icon');

  if (mobileMenuButton && mobileMenu && menuIcon && xIcon) {
    mobileMenuButton.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      mobileMenu.classList.toggle('max-h-0', !isOpen);
      mobileMenu.classList.toggle('opacity-0', !isOpen);
      // mobileMenu.classList.toggle('max-h-screen'); // Or a specific max height like max-h-[calc(100vh-4rem)]

      menuIcon.classList.toggle('hidden', isOpen);
      xIcon.classList.toggle('hidden', !isOpen);
    });
  }

  // Close mobile menu when a link is clicked
  const mobileNavLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenu.classList.contains('open')) {
        mobileMenu.classList.remove('open');
        mobileMenu.classList.add('max-h-0', 'opacity-0');
        menuIcon.classList.remove('hidden');
        xIcon.classList.add('hidden');
      }
    });
  });


  // --- Smooth Scrolling & Active Section Highlighting ---
  const navLinks = document.querySelectorAll('.nav-link'); // Covers both desktop and mobile
  const sections = document.querySelectorAll('section[id]');
  const navbarHeight = document.getElementById('navbar-container')?.offsetHeight || 64; // h-16

  // Smooth scroll for all nav links
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - navbarHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Smooth scroll for FIDIPA logo
  const logoLink = document.querySelector('.fidipa-logo');
  if (logoLink) {
    logoLink.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
       if (targetId && targetId.startsWith('#')) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - navbarHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  }

  // Active section highlighting on scroll
  const updateActiveLink = () => {
    let currentActiveId = null;
    const scrollPosition = window.scrollY + navbarHeight + 1; // +1 for precision

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentActiveId = section.getAttribute('id');
      }
    });

    // If near bottom of page and last section is small, it might not get highlighted.
    // Check if scrolled to the very bottom.
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 2) { // -2 for tolerance
        const lastSection = sections[sections.length -1];
        if(lastSection) currentActiveId = lastSection.id;
    }


    navLinks.forEach(link => {
      const navId = link.getAttribute('data-navid');
      if (navId === currentActiveId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };

  window.addEventListener('scroll', updateActiveLink);
  updateActiveLink(); // Initial check on load


  // --- Hero Slideshow ---
  const heroSlidesData = [
    {
      text: "Friendly Integrated Development Initiative in Poverty Alleviation (FIDIPA)",
      subtext: "A holistic peaceful and democratic society with justice for all",
      images: [
        'assets/random_image_10.jpg',
        'assets/random_image_11.jpg',
        'assets/random_image_12.jpg',
        'assets/random_image_13.jpg',
        'assets/random_image_14.jpg'
      ]
    },
    {
      text: "Empowering Communities Since 2007",
      subtext: "Registered under the NGO Act of Kenya as a National NGO",
      images: [
        'assets/random_image_15.jpg',
        'assets/random_image_16.jpg',
        'assets/random_image_17.jpg',
        'assets/random_image_18.jpg'
      ]
    },
    {
      text: "Fostering Unity and Effective Participation",
      subtext: "Working with urban and rural communities for sustainable development",
      images: [
        'assets/random_image_19.jpg',
        'assets/random_image_20.jpg',
        'assets/random_image_21.jpg',
        'assets/random_image_22.jpg'
      ]
    },
    {
      text: "Human Rights Based Approach",
      subtext: "Empowering women and girls to claim their rights",
      images: [
        'assets/random_image_23.jpg',
        'assets/random_image_24.jpg',
        'assets/random_image_25.jpg',
        'assets/random_image_26.jpg'
      ]
    },
    {
      text: "Supporting Education and Infrastructure",
      subtext: "Building better facilities and resources for our communities",
      images: [
        'assets/random_image_27.jpg',
        'assets/random_image_28.jpg',
        'assets/random_image_29.jpg',
        'assets/random_image_30.jpg'
      ]
    }
  ];

  const slidesContainer = document.getElementById('hero-slides-container');
  const textContainer = document.getElementById('hero-text-container');
  const dotsContainer = document.getElementById('hero-dots-container');
  const scrollDownChevron = document.getElementById('scroll-down-chevron');

  let currentSlideIndex = 0;
  let currentImageSubIndex = 0;
  let slideTextTimer, imageTimer;

  function createSlides() {
    if (!slidesContainer || !textContainer || !dotsContainer) return;

    slidesContainer.innerHTML = ''; // Clear previous slides
    textContainer.innerHTML = '';   // Clear previous text
    dotsContainer.innerHTML = '';   // Clear previous dots

    heroSlidesData.forEach((slideData, index) => {
      // Create image slide elements
      const imageSlideDiv = document.createElement('div');
      imageSlideDiv.className = 'hero-slide-image'; // Initially opacity 0
      imageSlideDiv.dataset.slideIndex = index;
      // Preload first image of each slide, others can be lazy or preloaded too
      const img = document.createElement('img');
      img.src = slideData.images[0]; // Default to first image for initial display
      img.alt = slideData.text;
      imageSlideDiv.appendChild(img);
      // Add overlay
      const overlayDiv = document.createElement('div');
      overlayDiv.className = 'absolute inset-0 bg-gradient-to-b from-black/70 to-black/40';
      imageSlideDiv.appendChild(overlayDiv);
      slidesContainer.appendChild(imageSlideDiv);

      // Create text slide elements
      const textSlideDiv = document.createElement('div');
      textSlideDiv.className = 'hero-slide-text'; // Initially opacity 0, transformY 20
      textSlideDiv.dataset.slideIndex = index;
      textSlideDiv.innerHTML = `
        <h1 class="text-2xl md:text-4xl lg:text-5xl font-bold mb-6 text-white leading-tight">${slideData.text}</h1>
        <p class="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">${slideData.subtext}</p>
      `;
      textContainer.appendChild(textSlideDiv);

      // Create dot indicators
      const dotButton = document.createElement('button');
      dotButton.className = 'hero-dot';
      dotButton.dataset.slideTo = index;
      dotButton.setAttribute('aria-label', `Go to slide ${index + 1}`);
      dotButton.addEventListener('click', () => {
        goToSlide(index);
        resetTimers();
      });
      dotsContainer.appendChild(dotButton);
    });
  }

  function updateSlideAppearance(newIndex) {
    // Update image slides
    slidesContainer.querySelectorAll('.hero-slide-image').forEach((div, i) => {
      div.classList.toggle('active', i === newIndex);
      if (i === newIndex) {
        // Update image within the active slide if multiple images exist for it
        const imgElement = div.querySelector('img');
        if (imgElement) {
            currentImageSubIndex = (currentImageSubIndex + 1) % heroSlidesData[newIndex].images.length;
            imgElement.src = heroSlidesData[newIndex].images[currentImageSubIndex];
        }
      }
    });

    // Update text slides
    textContainer.querySelectorAll('.hero-slide-text').forEach((div, i) => {
      div.classList.toggle('active', i === newIndex);
    });

    // Update dots
    dotsContainer.querySelectorAll('.hero-dot').forEach((button, i) => {
      button.classList.toggle('active', i === newIndex);
    });
  }

  function updateImageOnly(slideIdx) {
    const activeImageSlide = slidesContainer.querySelector(`.hero-slide-image[data-slide-index="${slideIdx}"].active`);
    if(activeImageSlide) {
        const imgElement = activeImageSlide.querySelector('img');
        if (imgElement && heroSlidesData[slideIdx].images.length > 1) {
            currentImageSubIndex = (currentImageSubIndex + 1) % heroSlidesData[slideIdx].images.length;
            imgElement.src = heroSlidesData[slideIdx].images[currentImageSubIndex];
        }
    }
  }


  function goToSlide(index) {
    currentSlideIndex = index;
    currentImageSubIndex = 0; // Reset image index for new text slide
    updateSlideAppearance(currentSlideIndex);
  }

  function nextSlide() {
    const newIndex = (currentSlideIndex + 1) % heroSlidesData.length;
    goToSlide(newIndex);
  }

  function startTimers() {
    clearInterval(slideTextTimer);
    clearInterval(imageTimer);

    slideTextTimer = setInterval(nextSlide, 5000); // Change text slide every 5 seconds

    // Change image within the current text slide every 3 seconds
    imageTimer = setInterval(() => {
        updateImageOnly(currentSlideIndex);
    }, 3000);
  }

  function resetTimers() {
    startTimers();
  }

  if (slidesContainer && textContainer && dotsContainer) {
    createSlides();
    goToSlide(0); // Show first slide initially
    startTimers();
  }

  // Scroll down chevron smooth scroll (already partially handled by general nav link handler, but specific target)
  if (scrollDownChevron) {
    scrollDownChevron.addEventListener('click', function(e) {
      e.preventDefault();
      const targetElement = document.getElementById('about');
      if (targetElement) {
        const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - navbarHeight; // navbarHeight from nav.js

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  }

  // --- About Section: Read More Toggle ---
  const readMoreButton = document.getElementById('read-more-button');
  const readMoreContent = document.getElementById('read-more-content');
  const readMoreChevronDown = readMoreButton ? readMoreButton.querySelector('.chevron-down') : null;
  const readMoreChevronUp = readMoreButton ? readMoreButton.querySelector('.chevron-up') : null;
  const readMoreButtonText = readMoreButton ? readMoreButton.querySelector('span') : null;

  if (readMoreButton && readMoreContent && readMoreChevronDown && readMoreChevronUp && readMoreButtonText) {
    readMoreButton.addEventListener('click', () => {
      const isOpen = readMoreContent.classList.toggle('open');
      readMoreContent.style.maxHeight = isOpen ? readMoreContent.scrollHeight + "px" : "0px"; // For CSS transition
      readMoreContent.style.opacity = isOpen ? "1" : "0";


      readMoreButtonText.textContent = isOpen ? "Show Less" : "Read More";
      readMoreChevronDown.classList.toggle('hidden', isOpen);
      readMoreChevronUp.classList.toggle('hidden', !isOpen);
    });
  }

  // --- Generic "Appear on Scroll" Animation Logic ---
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  const observerOptions = {
    root: null, // relative to document viewport
    rootMargin: '0px',
    threshold: 0.1 // trigger when 10% of the element is visible
  };

  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // Optional: stop observing once animated
      }
    });
  };

  const scrollObserver = new IntersectionObserver(observerCallback, observerOptions);

  animatedElements.forEach(el => {
    scrollObserver.observe(el);
  });

  // --- Team Section Carousel Logic ---
  const staffMembersData = [
    { id: "1", name: "Ms Jayne A. I. Wasonga", role: "Board Secretary and Chief Executive Officer" },
    { id: "2", name: "Ms Jesca Mitaya", role: "Finance and Administration FAM Manager" },
    { id: "3", name: "Ms Linda Otieno", role: "Project Lead (Volunteer)" },
    { id: "4", name: "Rev. Walter Ang'ienda", role: "Program Officer Peace Project (Volunteer)" },
    { id: "5", name: "Phillip Noel", role: "Volunteer, Soft Skills (Water and Sanitation)" },
    { id: "6", name: "Jackson Lesian", role: "Office Assistant/Driver" },
    { id: "7", name: "Jamima Mtuli", role: "Administer/Programs Assistant" }
  ];

  const boardMembersData = [
    { id: "1", name: "Mrs Rosemary Meyo", role: "Chairperson - Governance and Administration Expert" },
    { id: "2", name: "Dr. Josephine Munthali", role: "Vice Chairperson - Gender and Education Expert" },
    { id: "3", name: "Ms Jayne A. Wasonga", role: "Chief Executive Officer and Board Secretary" },
    { id: "4", name: "Sr. Mildred Mayeye", role: "Treasurer" },
    { id: "5", name: "Dr. Rev. Simon Oriedo", role: "Committee Member" },
    { id: "6", name: "Mr. Samwel Otieno", role: "Committee Member" },
    { id: "7", name: "Prof. Esther Mombo", role: "Committee Member" },
    { id: "8", name: "Ms Leah O. Wanaswa", role: "Committee Member" }
  ];

  function setupTeamCarousel(carouselId, membersData) {
    const carouselElement = document.getElementById(carouselId);
    if (!carouselElement) return;

    const viewport = carouselElement.querySelector('.carousel-viewport');
    const track = carouselElement.querySelector('.carousel-track');
    const prevButton = carouselElement.querySelector('.carousel-prev');
    const nextButton = carouselElement.querySelector('.carousel-next');

    if (!viewport || !track || !prevButton || !nextButton) return;

    let currentIndex = 0;
    let itemsPerPage = 3;
    let cardWidth = 288; // Default card width (w-72 from original Tailwind was likely 18rem = 288px)
    const cardGap = 24; // gap-6 from original Tailwind (1.5rem = 24px)
    let isAnimating = false;
    let totalItems = membersData.length;

    function updateItemsPerPage() {
      if (window.innerWidth < 640) itemsPerPage = 1;
      else if (window.innerWidth < 1024) itemsPerPage = 2;
      else itemsPerPage = 3;

      // Adjust viewport width based on itemsPerPage
      viewport.style.maxWidth = `${itemsPerPage * cardWidth + (itemsPerPage - 1) * cardGap}px`;
      renderCards(); // Re-render or adjust track for new itemsPerPage
      goToIndex(0, true); // Reset to first slide
    }

    function renderCards() {
      track.innerHTML = ''; // Clear existing cards
      membersData.forEach(member => {
        const card = document.createElement('div');
        card.className = 'team-member-card bg-white dark:bg-dark-lighter rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700 flex flex-col h-full items-center text-center';
        // card.style.width = `${cardWidth}px`; // Ensure fixed width
        card.style.marginRight = `${cardGap}px`; // Apply gap

        // User icon SVG (placeholder for photoUrl)
        const userIconSvg = `
          <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>`;

        card.innerHTML = `
          <div class="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center">
            ${userIconSvg}
            ${member.photoUrl ? `<img src="${member.photoUrl}" alt="${member.name}" class="w-full h-full object-cover">` : userIconSvg}
          </div>
          <div class="flex-1 flex flex-col items-center w-full">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">${member.name}</h3>
            <p class="text-primary font-medium text-sm">${member.role}</p>
          </div>
        `;
        // If using actual photo, replace userIconSvg in the condition above
        if(member.photoUrl){
            const imgContainer = card.querySelector('.bg-primary\\/10'); // Escape slash for querySelector
            if(imgContainer) imgContainer.innerHTML = `<img src="${member.photoUrl}" alt="${member.name}" class="w-full h-full object-cover">`;
        }
        track.appendChild(card);
      });
      // Remove margin from the last card
      if (track.lastChild) {
        track.lastChild.style.marginRight = '0px';
      }
    }

    function goToIndex(index, immediate = false) {
        if (index < 0) index = 0;
        if (index > totalItems - itemsPerPage) index = Math.max(0, totalItems - itemsPerPage);

        currentIndex = index;
        const offset = -currentIndex * (cardWidth + cardGap);

        if(immediate) track.style.transition = 'none'; // Disable transition for immediate jump
        track.style.transform = `translateX(${offset}px)`;
        if(immediate) {
            // Force reflow to apply transform immediately then re-enable transition
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            track.offsetHeight;
            track.style.transition = 'transform 0.5s ease-in-out';
        }

        isAnimating = true;
        setTimeout(() => { isAnimating = false; }, immediate ? 50 : 500); // Shorter for immediate
    }


    prevButton.addEventListener('click', () => {
      if (isAnimating) return;
      goToIndex(currentIndex - itemsPerPage);
    });

    nextButton.addEventListener('click', () => {
      if (isAnimating) return;
      goToIndex(currentIndex + itemsPerPage);
    });

    window.addEventListener('resize', () => {
        updateItemsPerPage(); // This will re-render and reset to index 0
    });

    // Initial setup
    updateItemsPerPage(); // This calls renderCards and goToIndex(0)
  }

  // Initialize carousels
  setupTeamCarousel('staff-carousel', staffMembersData);
  setupTeamCarousel('board-carousel', boardMembersData);

  // --- Programs Page Logic ---
  const programsData = [
    // Sample data structure, more items would come from a full data source
    {
      id: "1",
      slug: "agriculture-it",
      title: "Agriculture and Information Technology",
      description: "Empowering local farmers with modern agricultural techniques and digital literacy to enhance productivity and market access. This program focuses on sustainable farming, use of technology for market information, and financial literacy for agribusiness.",
      images: ['assets/random_image_31.jpg', 'assets/random_image_32.jpg', 'assets/random_image_33.jpg'],
      content: "• Training on climate-resilient crops • Workshops on mobile banking and market apps • Support for forming farmer cooperatives • Introduction to small-scale irrigation techniques"
    },
    {
      id: "2",
      slug: "girls-education-mentorship",
      title: "Girls Education and Mentorship Project",
      description: "Providing educational support, scholarships, and mentorship to young girls in underserved communities to foster leadership, academic excellence, and personal development. We aim to break barriers to girls' education.",
      images: ['assets/random_image_34.jpg', 'assets/random_image_35.jpg', 'assets/random_image_36.jpg'],
      content: "• Scholarship programs for secondary and tertiary education • Mentorship pairings with professional women • Life skills workshops (hygiene, confidence, rights) • STEM career awareness campaigns"
    },
    {
      id: "3",
      slug: "env-food-security",
      title: "Environment, Food Security, Resilience and Livelihood Program",
      description: "Promoting sustainable environmental practices and ensuring food security for vulnerable communities through resilient livelihood programs. This includes agroforestry, water conservation, and income-generating activities.",
      images: ['assets/random_image_37.jpg', 'assets/random_image_38.jpg'],
      content: "• Tree planting and soil conservation initiatives • Training on kitchen gardening and nutrition • Support for alternative income sources (e.g., beekeeping, poultry) • Water harvesting and management education"
    },
    {
      id: "4",
      slug: "women-land-property-rights",
      title: "Women Land and Property Rights",
      description: "Advocating for and supporting women's rights to land and property through legal aid, awareness campaigns, and policy engagement. Empowering women economically and socially by securing their property rights.",
      images: ['assets/random_image_39.jpg', 'assets/random_image_40.jpg'],
      content: "• Legal clinics and paralegal training • Community dialogues on gender and land • Advocacy for policy reforms • Support for women's groups in land claims"
    },
     {
      id: "5",
      slug: "soft-skills-leadership",
      title: "Soft Skills Training and Leadership training",
      description: "Equipping youth and community leaders with essential soft skills such as communication, problem-solving, teamwork, and leadership qualities to foster personal and community development.",
      images: ['assets/random_image_41.jpg', 'assets/random_image_42.jpg'],
      content: "• Workshops on public speaking and presentation • Conflict resolution and negotiation training • Team building and collaborative project exercises • Ethical leadership and decision-making modules"
    }
  ];

  function renderProgramsPage() {
    const container = document.getElementById('programs-list-container');
    if (!container) return; // Only run on programs.html

    container.innerHTML = ''; // Clear loading message

    programsData.forEach((program, index) => {
      const programElement = document.createElement('div');
      programElement.className = 'bg-white dark:bg-dark-lighter rounded-lg overflow-hidden shadow-lg dark:shadow-none animate-on-scroll fade-in-up';
      programElement.style.transitionDelay = `${index * 0.1}s`;

      const contentPointsHTML = program.content
        ? program.content.split('•').slice(1).map(point => `
            <div class="bg-light-darker dark:bg-dark p-4 rounded-lg">
              <p class="text-gray-600 dark:text-gray-400 text-sm">${point.trim()}</p>
            </div>`).join('')
        : '';

      const learnMoreLink = `program-detail.html#${program.slug}`; // Simplified detail page link

      programElement.innerHTML = `
        <div class="md:flex">
          <div class="md:w-1/3">
            <img src="${program.images[0]}" alt="${program.title}" class="w-full h-64 md:h-full object-cover">
            <!-- Simplified: No JS carousel here, just first image -->
          </div>
          <div class="p-6 md:w-2/3">
            <h2 class="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">${program.title}</h2>
            <p class="text-gray-600 dark:text-gray-300 mb-6">${program.description}</p>
            ${program.content ? `<div class="grid md:grid-cols-2 gap-4 mb-6">${contentPointsHTML}</div>` : ''}
            <a href="${learnMoreLink}" class="mt-6 inline-flex items-center text-primary hover:text-primary/80 transition-colors">
              Learn More
              <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </div>
      `;
      container.appendChild(programElement);
    });

    // Re-initialize IntersectionObserver for newly added animated elements on this page
    const newAnimatedElements = container.querySelectorAll('.animate-on-scroll');
    newAnimatedElements.forEach(el => {
        // Ensure this doesn't re-observe elements already handled by the main page observer
        // For simplicity here, we just observe. A more robust solution might check if already observed.
        scrollObserver.observe(el);
    });
  }

  // Call render functions specific to pages if their containers exist
  if (document.getElementById('programs-list-container')) {
    renderProgramsPage();
  }

  // --- Gallery Page Logic ---
  const galleryImagesData = [
    'assets/random_image_43.jpg',
    'assets/random_image_44.jpg',
    'assets/random_image_45.jpg',
    'assets/random_image_46.jpg',
    'assets/random_image_47.jpg',
    'assets/random_image_48.jpg',
    'assets/random_image_49.jpg',
    'assets/random_image_50.jpg',
    'assets/random_image_51.jpg',
    'assets/random_image_52.jpg', // Starting to use more than the initial 51
    'assets/random_image_53.jpg',
    'assets/random_image_54.jpg',
    'assets/random_image_55.jpg',
    'assets/random_image_56.jpg',
    'assets/random_image_57.jpg',
    'assets/random_image_58.jpg',
    'assets/random_image_59.jpg',
    'assets/random_image_60.jpg',
    'assets/random_image_61.jpg',
    'assets/random_image_62.jpg',
    'assets/random_image_63.jpg',
    'assets/random_image_64.jpg',
  ];

  function renderGalleryPage() {
    const gridContainer = document.getElementById('gallery-grid-container');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');

    let currentLightboxIndex = 0;

    if (!gridContainer || !lightbox || !lightboxImage || !lightboxClose || !lightboxPrev || !lightboxNext) return; // Only run on gallery.html

    gridContainer.innerHTML = ''; // Clear loading/placeholder

    galleryImagesData.forEach((imageSrc, index) => {
      const item = document.createElement('div');
      // Ensure class `gallery-item` is used for masonry CSS
      item.className = 'gallery-item relative group cursor-pointer aspect-square overflow-hidden rounded-lg animate-on-scroll fade-in-up';
      item.style.transitionDelay = `${index * 0.05}s`;
      item.addEventListener('click', () => openLightbox(index)); // Pass index

      item.innerHTML = `
        <img src="${imageSrc}" alt="Gallery image ${index + 1}" class="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110">
        <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
          <span class="text-white text-sm p-2 bg-black/40 rounded">Click to view</span>
        </div>
      `;
      gridContainer.appendChild(item);
    });

    // Re-initialize IntersectionObserver for newly added animated elements
    const newAnimatedElements = gridContainer.querySelectorAll('.animate-on-scroll');
    newAnimatedElements.forEach(el => scrollObserver.observe(el));

    function updateLightboxNavButtons() {
        lightboxPrev.disabled = currentLightboxIndex === 0;
        lightboxNext.disabled = currentLightboxIndex === galleryImagesData.length - 1;
    }

    function openLightbox(index) {
      currentLightboxIndex = index;
      lightboxImage.src = galleryImagesData[currentLightboxIndex];
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
      updateLightboxNavButtons();
    }

    function closeLightbox() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }

    function showPrevImage() {
      if (currentLightboxIndex > 0) {
        currentLightboxIndex--;
        lightboxImage.src = galleryImagesData[currentLightboxIndex];
        updateLightboxNavButtons();
      }
    }

    function showNextImage() {
      if (currentLightboxIndex < galleryImagesData.length - 1) {
        currentLightboxIndex++;
        lightboxImage.src = galleryImagesData[currentLightboxIndex];
        updateLightboxNavButtons();
      }
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', showPrevImage);
    lightboxNext.addEventListener('click', showNextImage);

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (lightbox.classList.contains('open')) {
        if (e.key === 'Escape') {
          closeLightbox();
        } else if (e.key === 'ArrowLeft') {
          showPrevImage();
        } else if (e.key === 'ArrowRight') {
          showNextImage();
        }
      }
    });
  }

  if (document.getElementById('gallery-grid-container')) {
    renderGalleryPage();
  }

});
