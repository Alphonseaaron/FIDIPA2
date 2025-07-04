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

  // --- Mobile Menu (Only for main navbar, so check if it exists) ---
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  const xIcon = document.getElementById('x-icon');

  if (mobileMenuButton && mobileMenu && menuIcon && xIcon) {
    mobileMenuButton.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      mobileMenu.classList.toggle('max-h-0', !isOpen);
      mobileMenu.classList.toggle('opacity-0', !isOpen);
      menuIcon.classList.toggle('hidden', isOpen);
      xIcon.classList.toggle('hidden', !isOpen);
    });

    // Close mobile menu when a link is clicked (specific to main navbar's mobile menu)
    const mobileNavLinks = mobileMenu.querySelectorAll('a');
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (mobileMenu.classList.contains('open')) {
          mobileMenu.classList.remove('open');
          mobileMenu.classList.add('max-h-0', 'opacity-0');
          if(menuIcon) menuIcon.classList.remove('hidden');
          if(xIcon) xIcon.classList.add('hidden');
        }
      });
    });
  }

  // --- Capacity Statement Read More Toggle (on index.html) ---
  const capacityReadMoreButton = document.getElementById('capacity-read-more-button');
  const capacityStatementContent = document.getElementById('capacity-statement-content');

  if (capacityReadMoreButton && capacityStatementContent) {
    const buttonText = capacityReadMoreButton.querySelector('span');
    const chevronDown = capacityReadMoreButton.querySelector('.chevron-down');
    const chevronUp = capacityReadMoreButton.querySelector('.chevron-up');

    capacityReadMoreButton.addEventListener('click', () => {
      const isOpen = capacityStatementContent.classList.toggle('open');
      if (buttonText) buttonText.textContent = isOpen ? "Show Less" : "Read More";
      if (chevronDown) chevronDown.classList.toggle('hidden', isOpen);
      if (chevronUp) chevronUp.classList.toggle('hidden', !isOpen);
    });
  }

  // --- Smooth Scrolling & Active Section Highlighting (Only for main navbar on index.html) ---
  const mainNavbar = document.getElementById('navbar-container'); // This ID is on the main navbar
  const pageHeader = document.getElementById('page-header-container'); // This ID is on the new page headers

  if (mainNavbar && !pageHeader) { // Only run this block if it's the main page with the full navbar
    const navLinks = mainNavbar.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]'); // Assumes sections are direct children or easily queryable
    const navbarHeight = mainNavbar.offsetHeight || 64;

    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        // Only prevent default for internal links on the main page
        if (targetId && targetId.startsWith('#')) {
          e.preventDefault();
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
        // For links like "programs.html", let the default navigation happen.
      });
    });

    const updateActiveLink = () => {
      let currentActiveId = null;
      const scrollPosition = window.scrollY + navbarHeight + 1;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          currentActiveId = section.getAttribute('id');
        }
      });

      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 2) {
        const lastSection = sections[sections.length - 1];
        if (lastSection) currentActiveId = lastSection.id;
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
    updateActiveLink(); // Initial check
  }

  // Smooth scroll for FIDIPA logo (present on all pages, but behavior might differ)
  // On index.html, it scrolls to #home. On other pages, it links to index.html#home.
  // The `<a>` tag itself handles the navigation for non-index pages.
  // We only need special JS handling for smooth scroll on index.html.
  const logoLinks = document.querySelectorAll('.fidipa-logo'); // Might be multiple logos now
  logoLinks.forEach(logoLink => {
    if (logoLink) {
      logoLink.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId && targetId.startsWith('index.html#') && window.location.pathname.endsWith('index.html')) {
          // If on index.html and clicking logo to go to a section on index.html
          e.preventDefault();
          const sectionId = targetId.split('#')[1];
          const targetElement = document.getElementById(sectionId);
          if (targetElement) {
            const navbarHeight = document.getElementById('navbar-container')?.offsetHeight || 64; // Main navbar
            const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - navbarHeight;
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        } else if (targetId && targetId.startsWith('#') && mainNavbar && !pageHeader) {
          // If on index.html and clicking logo to go to #home (or other section)
          e.preventDefault();
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            const navbarHeight = mainNavbar.offsetHeight || 64;
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

  // Scroll down chevron smooth scroll (already partially handled by general nav link handler, but specific target)
  // Note: The old JS slideshow logic has been removed. The new slideshow is CSS-only.
  const scrollDownChevron = document.getElementById('scroll-down-chevron');
  if (scrollDownChevron) {
    scrollDownChevron.addEventListener('click', function(e) {
      e.preventDefault();
      const targetElement = document.getElementById('about');
      if (targetElement) {
        // Recalculate navbarHeight here or ensure it's available in this scope
        // For simplicity, assuming navbarHeight is still accessible or re-fetched if needed.
        // If not, it would be: const navbarHeight = document.getElementById('navbar-container')?.offsetHeight || 64;
        const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - navbarHeight;

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
  const boardOfDirectorsData = [
    { name: "Mrs Rosemary N. Meyo", role: "Chairperson - Administration and governance Expert - MBA 2010 – Maseno University", photoUrl: "assets/Mrs. Rosemary N. Meyo - Chairperson.jpg" },
    { name: "Dr. Josephine Munthali", role: "Vice Chairperson - Gender and Education Expert - University of Edinburgh UK (2001)", photoUrl: "assets/Dr. Josephine Munthali - Vice Chairperson.png" },
    { name: "Ms Jayne A. I. Wasonga", role: "Secretary and CEO - Gender and Project Management Specialist - Catholic University of Eastern Africa 2016", photoUrl: "assets/Ms Jayne A. I. Wasonga - Secretary & CEO.jpg" },
    { name: "Sr. Mildred Mayeye", role: "Treasurer – Lwak Mission" }, // Placeholder if specific image not found
    { name: "Dr. Rev. Simon Oriedo", role: "Committee Member - Theology and Development Expert - Africa International University", photoUrl: "assets/Dr. Rev. Simon Oriedo - Committee Member.png" },
    { name: "Mr. Samwel O. Onyango", role: "Committee Member - Business Management Specialist - The University of Nairobi 2017", photoUrl: "assets/Mr. Samwel O. Onyango - Committee Member.png" }
  ];

  const managementCommitteeData = [
    { name: "Prof. Esther Mombo", role: "Theology and Gender Expert – University of Wales" }, // Placeholder
    { name: "Ms. Grace Ananda", role: "Policy and Governance Expert – University of Nairobi" }, // Placeholder
    { name: "Ms. Christine Sanguli", role: "Gender Expert – Masinde Muliro University" }, // Placeholder
    // Assuming "Jayne A. I. Wasonga" in management is the same as CEO, using her photo. If different, needs a new photo.
    { name: "Jayne A. I. Wasonga", role: "Gender, Project Management Expert", photoUrl: "assets/Ms Jayne A. I. Wasonga - Secretary & CEO.jpg" },
    { name: "Juliet Dima", role: "Legal Expert - University of Nairobi" } // Placeholder
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
    let itemsPerPage = 3; // Default for desktop
    let cardWidth = 280; // Approx. 250-300px range, adjusted for gap. (w-72 is 288px)
    const cardGap = 24; // gap-6 (1.5rem)
    let isAnimating = false;
    let totalItems = membersData.length;

    function updateCarouselState() {
      const screenWidth = window.innerWidth;
      if (screenWidth < 768) { // Mobile
        itemsPerPage = 1;
        // For mobile, cardWidth will be effectively 100% of viewport minus padding.
        // The viewport itself might not need a max-width, or it's 100vw.
        // We'll make the cards themselves take full width within the track.
      } else if (screenWidth < 1024) { // Tablet
        itemsPerPage = 2;
        cardWidth = 260; // Adjust for tablet if needed
      } else { // Desktop
        itemsPerPage = 3;
        cardWidth = 280; // Desktop card width
      }

      // Adjust viewport width for desktop/tablet to show multiple cards
      if (screenWidth >= 768) {
        viewport.style.maxWidth = `${itemsPerPage * cardWidth + (itemsPerPage - 1) * cardGap + 2}px`;
      } else {
        viewport.style.maxWidth = '100%'; // Full width on mobile
      }
      renderCards();
      goToIndex(0, true);
    }

    function renderCards() {
      track.innerHTML = ''; // Clear existing cards
      const screenWidth = window.innerWidth;

      membersData.forEach(member => {
        const card = document.createElement('div');
        // Base classes
        let cardClasses = 'team-member-card bg-white dark:bg-dark-lighter rounded-lg p-4 md:p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700 flex flex-col items-center text-center';

        // Responsive classes
        if (screenWidth < 768) { // Mobile
          cardClasses += ' w-full h-auto'; // Full width, auto height
          card.style.marginRight = '0px'; // No gap for single full-width card
        } else { // Tablet/Desktop
          cardClasses += ` md:w-[${cardWidth}px] h-[320px]`; // Fixed width for carousel, reduced height
          card.style.width = `${cardWidth}px`;
          card.style.marginRight = `${cardGap}px`;
        }

        card.className = cardClasses;

        const imageContainerSizeClass = "w-24 h-24"; // Consistent 96x96px size for the container
        const nameTextClass = screenWidth < 768 ? 'text-base md:text-lg' : 'text-lg lg:text-xl'; // Mobile: 16px, Desktop: 18-20px
        const roleTextClass = screenWidth < 768 ? 'text-xs md:text-sm' : 'text-sm lg:text-base'; // Mobile: 12-13px, Desktop: 14-16px

        const placeholderImageSrc = "assets/default-avatar.svg";

        let imageContent;
        // Added class `team-member-photo` to the img tag itself
        if (member.photoUrl && member.photoUrl.trim() !== "") {
          imageContent = `<img src="${member.photoUrl}" alt="${member.name}" class="team-member-photo w-full h-full object-cover">`;
        } else {
          imageContent = `<img src="${placeholderImageSrc}" alt="Default avatar for ${member.name}" class="team-member-photo w-full h-full object-cover">`;
        }

        // Added class `team-member-photo-container` to the div wrapping the image
        card.innerHTML = `
          <div class="team-member-photo-container ${imageContainerSizeClass} mx-auto mb-2 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center border dark:border-gray-700 shrink-0">
            ${imageContent}
          </div>
          <div class="flex-1 flex flex-col items-center justify-center w-full">
            <h3 class="${nameTextClass} font-semibold text-gray-900 dark:text-white mb-1 md:mb-2">${member.name}</h3>
            <p class="text-primary font-medium ${roleTextClass} line-clamp-2">${member.role}</p>
          </div>
        `;
        track.appendChild(card);
      });

      if (screenWidth >= 768 && track.lastChild) {
        track.lastChild.style.marginRight = '0px';
      }
    }

    function goToIndex(index, immediate = false) {
      if (window.innerWidth < 768) { // Mobile: handle as a simple scroll, or disable carousel buttons
        // For now, let's assume carousel buttons still work, but itemsPerPage is 1
        // If we want native scroll, this whole function needs rethink for mobile
      }

      if (index < 0) index = 0;
      // Ensure index doesn't go too far right if totalItems < itemsPerPage (e.g. only 1 or 2 items)
      const maxIndex = Math.max(0, totalItems - itemsPerPage);
      if (index > maxIndex) index = maxIndex;


      currentIndex = index;
      // Calculate offset based on current cardWidth (which might change on resize)
      const currentCardWidth = (window.innerWidth < 768) ? viewport.offsetWidth : cardWidth; // Full viewport width for mobile cards
      const currentGap = (window.innerWidth < 768) ? 0 : cardGap;
      const offset = -currentIndex * (currentCardWidth + currentGap);


      if(immediate) track.style.transition = 'none';
      track.style.transform = `translateX(${offset}px)`;
      if(immediate) {
        track.offsetHeight; // Force reflow
        track.style.transition = 'transform 0.5s ease-in-out';
      }

      isAnimating = true;
      setTimeout(() => { isAnimating = false; }, immediate ? 50 : 500);
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
        updateCarouselState();
    });

    // Initial setup
    updateCarouselState();
  }

  // Initialize carousels
  setupTeamCarousel('board-carousel', boardOfDirectorsData); // Changed 'staff-carousel' to 'board-carousel' and used new data
  setupTeamCarousel('management-committee-carousel', managementCommitteeData); // Added new carousel for management committee

  // --- Programs Page Logic ---
  const programsData = [
    {
      id: "1",
      slug: "women-land-rights-food-security",
      title: "Women Land Rights and food security",
      description: "FIDIPA advocates for women's land rights and food security. The project believes that the Rights-holders become champions: rather than beneficiaries who are dependent on aid, the target group becomes champions, influencing peers and others to change for their improved livelihood.",
      images: ['assets/Women Land Rights and food security 1.jpg', 'assets/Paralegals follow-up on women land rights.jpg', 'assets/Women Champions of land rights.jpg'],
      content: "" // No specific bullet points provided for this one
    },
    {
      id: "2",
      slug: "women-leadership-socio-economic",
      title: "Women Leadership and Socio-economic Project",
      description: "Historically, cultural and institutional structures have created gender relationships that have led to the subordination of women in various social spheres, leading to gender inequalities and leadership underrepresentation. FIDIPA train both women and girls on soft skills, leadership, entrepreneurship and group dynamics with emphasis on empowerment arise and shine.",
      images: ['assets/Women in leadership training.jpg', 'assets/Jayne training leadership and gender at NITA.jpg', 'assets/Enterpreneurship by Mrs Awiti.jpg'],
      content: ""
    },
    {
      id: "3",
      slug: "climate-justice-resilience",
      title: "Climate Justice - Resilience Environment and Livelihood Project",
      description: "FIDIPA recognizes that environmental degradation and climate change are serious global problems. The organization is committed to minimizing her impact on the environment and climate. To meet this goal FIDIPA aims to reduce her carbon footprint as well as minimize actions that can contribute to environmental degradation. FIDIPA is working with farmer community-based organizations and stakeholders to drive towards the desired change. The project seeks to achieve the following four outcomes:",
      images: ['assets/Climate Justice - Resilience Environment and Livelihood Project 1.png', 'assets/Climate Justice - Resilience Environment and Livelihood Project 2.png', 'assets/Women in action for climate change.jpg'],
      content: "• Outcome 1: Individuals practicing sustainable land management practices. • Outcome 2: Households with stable sources of income. • Outcome 3: CSOs influencing stakeholders on sustainable use of natural resource in the target area. • Outcome 4: Institutions have adopted strategies for sustainable use of natural resource"
    },
    {
      id: "4",
      slug: "widows-disability-agribusiness",
      title: "Widows and women with disability agribusiness project",
      description: "FIDIPA has remained sensitive to the needs of the vulnerable and marginalized women in and out of prison to restore their sense of pride and hope, giving them the confidence to take responsibility for those who are suffering. FIDIPA help them sale some of their products. The women are involved in small scale farming for their food and surplus for income.",
      images: ['assets/Widows program.jpg', 'assets/Gift to PWD - nyakach.jpg', 'assets/FARM 1 - WWD .JPG'],
      content: ""
    },
    {
      id: "5",
      slug: "women-prison-project",
      title: "Women prison project",
      description: "The women in and out of prison are targeted because other than the reason for their conviction they have also experienced harassment, oppression, stigma, and discrimination among others that need socio-economic empowerment.",
      images: ['assets/Women in Prison.jpg', 'assets/Visit to womens prison.jpg'], // Assuming 'Women in Prison.jpg' and 'Visit to womens prison.jpg' exist or similar
      content: ""
    },
    {
      id: "6",
      slug: "grandmothers-ovc-project",
      title: "Grandmothers and Orphans/Vulnerable Children Project",
      description: "The project support the granny’s taking care of the orphans and vulnerable children (OVC) improve food security, nutrition and health, and livelihood.",
      images: [
        'assets/Grandmothers and Orphans or Vulnerable Children Project.png',
        'assets/Grandmothers and Orphans or Vulnerable Children Project 2.png',
        'assets/Grandmothers and Orphans or Vulnerable Children Project 3.png',
        'assets/Grandmothers and Orphans or Vulnerable Children Project 4.png',
        'assets/Grandmothers and Orphans or Vulnerable Children Project 5.png',
        'assets/OVCs firewood.jpg'
      ],
      content: ""
    },
    {
      id: "7",
      slug: "youth-engagement",
      title: "Youth Engagement",
      description: "The youth soft skills and advocacy project envisions recognized, respected, engaged youth able to redefine their identities and working to improve their socio-economic situations through inclusion in development processes business start-up skills, developing an entrepreneurial mindset, creative thinking, visionary leadership, resourcefulness, and resource mobilization in Kenya. FIDIPA FIDIPA work in Kisumu and Kwale Counties.",
      images: [
        'assets/YOUTH PROGRAM AT SABAKI.JPG',
        'assets/Youth engagement in land advocacy.jpg',
        'assets/SOFT SKILLS SESSIONS.jpg',
        'assets/Linda talking girls Sabako.jpg',
        'assets/Youth program by Linda.jpg',
        'assets/YOUTH-LED COMMUNITY DIALOGUE.jpg'
      ],
      content: ""
    },
    {
      id: "8",
      slug: "school-mentorship-program",
      title: "School mentorship program",
      description: "The program seeks to empower both boys and girls from rural primary schools in Kenya with soft skills and career development. Mainly the project seeks to reduce the high rate of teenage pregnancy and school dropout and improve girls’ education standard in marginalized communities.",
      images: ['assets/School children with new desks.jpg', 'assets/JP and girls visioning at Sabako.jpg', 'assets/Visioning with girls.jpg', 'assets/School Mentorship Program.jpg'], // Assuming 'School Mentorship Program.jpg' exists
      content: ""
    }
  ];

  function renderProgramsPage() {
    const container = document.getElementById('programs-list-container');
    if (!container) return; // Only run on programs.html

    container.innerHTML = ''; // Clear loading message

    programsData.forEach((program, index) => {
      const programElement = document.createElement('div');
      // Added mb-12 for spacing between program items and id for deep linking
      programElement.className = 'program-item bg-white dark:bg-dark-lighter rounded-lg overflow-hidden shadow-lg dark:shadow-none animate-on-scroll fade-in-up mb-12';
      programElement.style.transitionDelay = `${index * 0.1}s`;
      programElement.id = program.slug;

      const contentPointsHTML = program.content
        ? program.content.split('•').slice(1).map(point => `
            <div class="bg-light-darker dark:bg-dark p-4 rounded-lg">
              <p class="text-gray-600 dark:text-gray-400 text-sm">${point.trim()}</p>
            </div>`).join('')
        : '';

      let imagesHTML = '';
      if (program.images && program.images.length > 0) {
        // Determine grid columns based on number of images, up to 3
        const gridColsClass = program.images.length === 1 ? 'sm:grid-cols-1 md:grid-cols-1' :
                              program.images.length === 2 ? 'sm:grid-cols-2 md:grid-cols-2' :
                              'sm:grid-cols-2 md:grid-cols-3';
        imagesHTML = `<div class="program-images-grid grid grid-cols-1 ${gridColsClass} gap-4 mb-6">`;
        program.images.forEach((imgSrc, imgIndex) => {
          // Pass unique index for this image within the global galleryImagesData if we merge them,
          // or handle program images in a separate lightbox instance / logic.
          // For now, using the main gallery's openLightbox function.
          // We need to find this image's actual index if it were part of galleryImagesData, or pass src directly.
          imagesHTML += `
            <div class="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden group">
              <img src="${imgSrc}" alt="${program.title} image ${imgIndex + 1}" class="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105">
            </div>`;
        });
        imagesHTML += `</div>`;
      }

      programElement.innerHTML = `
        <div class="p-6 md:p-8">
          <h2 class="text-3xl font-bold mb-4 text-gray-900 dark:text-white">${program.title}</h2>
          ${imagesHTML}
          <p class="text-gray-700 dark:text-gray-300 mb-6 text-lg leading-relaxed">${program.description}</p>
          ${program.content ? `<h3 class="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-100">Key Outcomes/Activities:</h3><div class="space-y-4">${contentPointsHTML}</div>` : ''}
        </div>
      `;
      container.appendChild(programElement);
    });

    const newAnimatedElements = container.querySelectorAll('.animate-on-scroll');
    newAnimatedElements.forEach(el => {
        scrollObserver.observe(el);
    });

    // Check for hash in URL and scroll to program if present
    if (window.location.hash) {
      const hash = window.location.hash.substring(1);
      const targetElement = document.getElementById(hash);
      if (targetElement) {
        const navbarHeight = document.getElementById('navbar-container')?.offsetHeight || 64;
        const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - navbarHeight;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  }

// Lightbox function for program images.
// It will use the existing lightbox from gallery.html.
// Ensure gallery.html's lightbox HTML (#lightbox, #lightbox-image, #lightbox-close, #lightbox-prev, #lightbox-next)
// is present or copied to programs.html if it's intended to be standalone.
// For now, we assume programs.html will also have the lightbox structure.
window.openProgramImageLightbox = (src, altText) => {
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');

  if (lightbox && lightboxImage && lightboxPrev && lightboxNext) {
    lightboxImage.src = src;
    lightboxImage.alt = altText || "Program image";

    // For program images, we might not have a 'gallery' to navigate through.
    // So, hide nav buttons. If we want to make them part of a larger gallery, this needs more complex logic.
    lightboxPrev.style.display = 'none';
    lightboxNext.style.display = 'none';

    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Ensure the main close button and escape key functionality (from gallery setup) works.
    // If programs.html doesn't have the gallery's full JS for lightbox,
    // we'd need to add minimal close logic here.
    // Assuming gallery.js or equivalent setup for lightbox is active.
  } else {
    console.warn("Lightbox elements (lightbox, lightbox-image, prev/next buttons) not found for program image.");
  }
};

  // Call render functions specific to pages if their containers exist
  if (document.getElementById('programs-list-container')) {
    renderProgramsPage();
  }

  // --- Gallery Page Logic ---
  const galleryImagesData = [
    // This list will be populated with all images from new_static_site/assets/
    // For brevity in this example, I'll list a selection. Assume all ~150+ images are here.
    'assets/20240405_103802.jpg',
    'assets/20250117_162229.jpg',
    'assets/20250118_140709.jpg',
    'assets/20250531_143420.jpg',
    'assets/20250531_143746.jpg',
    'assets/AT LANDESA.JPG',
    'assets/Au Zambia presentation.jpg',
    'assets/Climate Justice - Resilience Environment and Livelihood Project 1.png',
    'assets/Climate Justice - Resilience Environment and Livelihood Project 2.png',
    'assets/Climate Justice - Resilience Environment and Livelihood Project 3.png',
    'assets/Climate Justice - Resilience Environment and Livelihood Project 4.png',
    'assets/Climate Justice - Resilience Environment and Livelihood Project 5.png',
    'assets/Climate Justice - Resilience Environment and Livelihood Project 6.png',
    'assets/Climate Justice - Resilience Environment and Livelihood Project 7.png',
    'assets/Climate Justice - Resilience Environment and Livelihood Project 8.png',
    'assets/Creative thinking NITA.jpg',
    // Skipping team photos from main gallery, they are in team section
    // 'assets/Dr. Josephine Munthali - Vice Chairperson.png',
    // 'assets/Dr. Rev. Simon Oriedo - Committee Member.png',
    'assets/During the training of WWD.jpg',
    'assets/Enterpreneurship by Mrs Awiti.jpg',
    'assets/Enterpreneuship training sessions.jpg',
    'assets/FARM 1 - WWD .JPG',
    'assets/Follow up visit.jpg',
    'assets/Gift to PWD - nyakach.jpg',
    'assets/Grandmothers and Orphans or Vulnerable Children Project 2.png',
    'assets/Grandmothers and Orphans or Vulnerable Children Project 3.png',
    'assets/Grandmothers and Orphans or Vulnerable Children Project 4.png',
    'assets/Grandmothers and Orphans or Vulnerable Children Project 5.png',
    'assets/Grandmothers and Orphans or Vulnerable Children Project.png',
    'assets/Innocent YILA.jpg',
    'assets/Israel ch.jpg',
    'assets/JP PACJA - UN meeting preparation.jpg',
    'assets/JP Picture NITA leadership  training.jpg',
    'assets/JP UN gigiri.jpg',
    'assets/JP and girls visioning at Sabako.jpg',
    'assets/JP with Ambassadeur Seku - AU.jpg',
    'assets/Jayne training leadership and gender at NITA.jpg',
    'assets/Leadership training sessions in Kwale.jpg',
    'assets/Linda talking girls Sabako.jpg',
    'assets/M&E TO WWD.JPG',
    'assets/Millys house- she is locked out.jpg',
    // 'assets/Mr. Samwel O. Onyango - Committee Member.png',
    'assets/Mrs Noel visit to FIDIPA office.jpg',
    // 'assets/Mrs. Rosemary N. Meyo - Chairperson.jpg',
    // 'assets/Ms Jayne A. I. Wasonga - Secretary & CEO.jpg',
    'assets/OVCs firewood.jpg',
    'assets/PNBC.jpg',
    'assets/Paralegals follow-up on women land rights.jpg',
    'assets/Rev. Karen visit to FIDIPA office.jpg',
    'assets/SOFT SKILLS SESSIONS.jpg',
    'assets/Sabaki WEF project.jpg',
    'assets/School children with new desks.jpg',
    'assets/School Mentorship Program.jpg',
    'assets/Team picture.jpg',
    'assets/Team work.jpg',
    'assets/Training of Trainers.jpg',
    'assets/Training sessions at Sabaki.jpg',
    'assets/Visit to FIdipa office by CEO KLA.jpg',
    'assets/Visit to womens prison.jpg',
    'assets/Visioning with girls.jpg',
    'assets/Voiceless speaking after training.jpg',
    'assets/WASHEB project.png',
    'assets/Widows program.jpg',
    'assets/Women Champions of land rights.jpg',
    'assets/Women Land Rights and food security 1.jpg',
    'assets/Women Land Rights and food security 2.jpg',
    'assets/Women Land Rights and food security 3.jpg',
    'assets/Women in Prison.jpg',
    'assets/Women in action for climate change.jpg',
    'assets/Women in leadership training.jpg',
    'assets/Women reading a book.jpg',
    'assets/YOUTH PROGRAM AT SABAKI.JPG',
    'assets/YOUTH-LED COMMUNITY DIALOGUE.jpg',
    'assets/Youth engagement in land advocacy.jpg',
    'assets/Youth program by Linda.jpg'
    // ... and so on for all other images from the ls output.
  ];

  function renderGalleryPage() {
    const gridContainer = document.getElementById('gallery-grid-container');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');

    let currentLightboxIndex = 0;

    if (!gridContainer || !lightbox || !lightboxImage || !lightboxClose || !lightboxPrev || !lightboxNext) return;

    gridContainer.innerHTML = '';

    galleryImagesData.forEach((imageSrc, index) => {
      const item = document.createElement('div');
      item.className = 'gallery-item relative group cursor-pointer aspect-square overflow-hidden rounded-lg animate-on-scroll fade-in-up';
      item.style.transitionDelay = `${index * 0.05}s`;
      item.addEventListener('click', () => openLightbox(index));

      item.innerHTML = `
        <img src="${imageSrc}" alt="Gallery image ${index + 1}" loading="lazy" class="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110">
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
      lightboxImage.alt = `Gallery image ${currentLightboxIndex + 1}`; // Update alt text

      // Ensure prev/next buttons are visible for the main gallery
      if(lightboxPrev) lightboxPrev.style.display = 'block'; // Or 'flex', 'inline-flex' depending on original style
      if(lightboxNext) lightboxNext.style.display = 'block';

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

  // --- CSS Slideshow Auto-play ---
  const slideshowContainer = document.querySelector('.css-slideshow-container');
  if (slideshowContainer) {
    const slideRadios = document.querySelectorAll('.css-slide-input');
    const numSlides = slideRadios.length;
    let currentSlideIndex = 0; // Used to determine starting point, will be updated
    const autoPlayInterval = 7000; // 7 seconds
    let slideshowTimer;

    const playNextSlide = () => {
      // Find currently checked radio to ensure we know the actual current slide
      for (let i = 0; i < numSlides; i++) {
        if (slideRadios[i].checked) {
          currentSlideIndex = i;
          break;
        }
      }

      // slideRadios[currentSlideIndex].checked = false; // Not strictly necessary as radio group behavior handles this
      currentSlideIndex = (currentSlideIndex + 1) % numSlides; // Move to next, loop
      slideRadios[currentSlideIndex].checked = true; // Check next

      // Dispatch a change event, as programmatic checking might not trigger it for CSS transitions or JS listeners
      const event = new Event('change', { bubbles: true });
      slideRadios[currentSlideIndex].dispatchEvent(event);
    };

    const startAutoPlay = () => {
      stopAutoPlay(); // Clear any existing timer
      if (numSlides > 1) { // Only start if there's more than one slide
        slideshowTimer = setInterval(playNextSlide, autoPlayInterval);
      }
    };

    const stopAutoPlay = () => {
      clearInterval(slideshowTimer);
    };

    if (numSlides > 0) { // Initialize based on the initially checked slide
        for (let i = 0; i < numSlides; i++) {
            if (slideRadios[i].checked) {
                currentSlideIndex = i;
                break;
            }
        }
    }

    if (numSlides > 1) {
      startAutoPlay();

      // Optional: Pause on hover over the slideshow container
      slideshowContainer.addEventListener('mouseenter', stopAutoPlay);
      slideshowContainer.addEventListener('mouseleave', startAutoPlay);

      // Optional: Pause and reset timer when dots are clicked (user interaction)
      const slideDots = document.querySelectorAll('.css-dot');
      slideDots.forEach(dot => {
        dot.addEventListener('click', () => {
          // When a dot is clicked, the corresponding radio is already checked by the label.
          // We need to find out which one was just clicked to update currentSlideIndex
          const radioId = dot.getAttribute('for');
          const clickedRadio = document.getElementById(radioId);
          if (clickedRadio) {
            for(let i=0; i<slideRadios.length; i++) {
              if(slideRadios[i].id === radioId) {
                currentSlideIndex = i;
                slideRadios[i].checked = true; // Ensure it's checked
                break;
              }
            }
          }
          startAutoPlay(); // Restart the timer from this point
        });
      });

      // Also reset timer if radio buttons are changed directly by other means (e.g. keyboard nav if implemented)
      slideRadios.forEach(radio => {
        radio.addEventListener('change', () => {
          if (radio.checked) { // When a radio becomes checked
            for(let i=0; i<slideRadios.length; i++) { // Update currentSlideIndex
                if(slideRadios[i].id === radio.id) {
                    currentSlideIndex = i;
                    break;
                }
            }
            // If the change was user-initiated (not by playNextSlide), reset autoplay
            // This is tricky to distinguish. For now, any programmatic change will also restart timer.
            startAutoPlay();
          }
        });
      });
    }
  }
});
