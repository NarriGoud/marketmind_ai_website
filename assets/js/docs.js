// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM content loaded. Initializing script.");

    // Select the main content area where documentation will be displayed
    const docsContent = document.querySelector('.docs-content');

    // Select the search input and button
    const searchInput = document.getElementById('docs-search-input');
    const searchButton = document.getElementById('docs-search-button');

    // Function to load and display content from an external HTML file
    async function loadContent(url) {
        console.log(`Attempting to fetch content from: ${url}`);
        try {
            const response = await fetch(url);

            if (!response.ok) {
                console.error(`Fetch request failed. HTTP status: ${response.status}`);
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            console.log(`Fetch successful. Reading response as text.`);
            const html = await response.text();

            console.log("Successfully received HTML content. Attempting to set innerHTML.");
            docsContent.innerHTML = html;
            console.log("innerHTML set successfully.");

            // Add the scroll to top functionality
            window.scrollTo(0, 0);

            // Re-initialize listeners for the dynamically loaded content
            initializeFeedback();
            updateTelegramLink();
            setupDocLinks(); // ✅ re-bind links inside newly loaded content

            // Reset the search input and filter when new content is loaded
            if (searchInput) {
                searchInput.value = '';
                filterContent();
            }

        } catch (e) {
            console.error('An error occurred during content loading:', e);
            docsContent.innerHTML = '<p>Error loading content. Please check the file path.</p>';
        }
    }

    // New function to set the active link in the sidebar
    function setActiveLink(url) {
        const sidebarLinks = document.querySelectorAll('aside nav ul li a');
        sidebarLinks.forEach(link => {
            if (link.getAttribute('href') === url) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // ✅ Add click event listeners to ALL internal doc links (sidebar + FAQ + anywhere else)
    function setupDocLinks() {
        const docLinks = document.querySelectorAll('a[href^="assets/docs/"]');
        docLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault(); // Stop full page load
                let url = link.getAttribute('href');

                history.pushState(null, '', `?page=${url}`);
                loadContent(url);
                setActiveLink(url);
            });
        });
    }

    // Function to filter documentation content based on search input
    function filterContent() {
        const query = searchInput.value.toLowerCase();
        const allText = docsContent.innerText.toLowerCase();

        // Remove any previous "no results" message
        let noResultsMessage = document.getElementById('no-results-message');
        if (noResultsMessage) {
            noResultsMessage.remove();
        }

        if (query.trim() === "") {
            // If search box is empty, just reset highlights
            docsContent.querySelectorAll("mark").forEach(mark => {
                mark.outerHTML = mark.innerText;
            });
            return;
        }

        if (allText.includes(query)) {
            highlightMatches(query);
        } else {
            const message = document.createElement('p');
            message.id = 'no-results-message';
            message.textContent = 'No results found.';
            message.style.color = 'red';
            message.style.fontWeight = 'bold';
            docsContent.appendChild(message);
        }
    }

    // Helper: highlight search terms
    function highlightMatches(query) {
        // Reset old highlights
        docsContent.querySelectorAll("mark").forEach(mark => {
            mark.outerHTML = mark.innerText;
        });

        const regex = new RegExp(`(${query})`, "gi");
        docsContent.innerHTML = docsContent.innerHTML.replace(regex, "<mark>$1</mark>");
    }

    if (searchInput) {
        searchInput.addEventListener('input', filterContent);
    }

    // Function to initialize feedback listeners for dynamically loaded content
    function initializeFeedback() {
        const feedbackButtonsContainer = document.getElementById('feedback-buttons');
        const feedbackMessagePlaceholder = document.getElementById('feedback-message-placeholder');

        if (feedbackButtonsContainer && feedbackMessagePlaceholder) {
            feedbackButtonsContainer.addEventListener('click', (event) => {
                const button = event.target;
                if (button.classList.contains('feedback-btn')) {
                    feedbackButtonsContainer.style.display = 'none';
                    feedbackMessagePlaceholder.textContent = 'Thank you for your feedback!';
                    feedbackMessagePlaceholder.style.fontWeight = 'bold';
                    feedbackMessagePlaceholder.style.color = '#4a5568';
                    feedbackMessagePlaceholder.style.marginLeft = '10px';
                }
            });
        }
    }

    // Function to update the Telegram button's link for mobile users
    function updateTelegramLink() {
        const ctaButton = document.getElementById('telegram-cta-button');
        if (!ctaButton) {
            return;
        }

        const isMobile = /Mobi|Android/i.test(navigator.userAgent);

        if (isMobile) {
            ctaButton.href = 'tg://resolve?domain=Local_test_ai_bot';
            ctaButton.removeAttribute('target');
        }
    }

    // ------------------------------------------------------------------
    // ✅ NEW CODE: Mobile Sidebar Dropdown Functionality
    // ------------------------------------------------------------------
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebarNav = document.getElementById('sidebar-nav');
    const sidebarHeader = document.querySelector('.sidebar-header');

    if (sidebarToggle && sidebarNav && sidebarHeader) {
        // Attach listener to the header for a larger touch target
        sidebarHeader.addEventListener('click', () => {
            // Toggles the visibility of the nav links (CSS sets max-height)
            sidebarNav.classList.toggle('active');
            
            // Toggles the rotation of the dropdown icon (CSS sets transform: rotate)
            sidebarToggle.classList.toggle('active');
        });
    }
    // ------------------------------------------------------------------

    // Initial page load state
    const urlParams = new URLSearchParams(window.location.search);
    const initialPage = urlParams.get('page') || 'assets/docs/introduction.html';

    loadContent(initialPage);
    setActiveLink(initialPage);
    setupDocLinks(); // ✅ bind links on first load
});