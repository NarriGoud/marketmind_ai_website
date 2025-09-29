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
            setupDocLinks(); // ✅ CRITICAL: Re-bind links after content load

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

    // ✅ UPDATED: Add touchstart event for mobile reliability in addition to click
    function setupDocLinks() {
        const docLinks = document.querySelectorAll('a[href^="assets/docs/"]');
        docLinks.forEach(link => {
            
            const linkHandler = (event) => {
                event.preventDefault(); // Stop full page load
                let url = link.getAttribute('href');

                history.pushState(null, '', `?page=${url}`);
                loadContent(url);
                setActiveLink(url);
                
                // Close sidebar dropdown after clicking a link on mobile
                const sidebarNav = document.getElementById('sidebar-nav');
                const sidebarToggle = document.getElementById('sidebar-toggle');
                if (sidebarNav && sidebarToggle && window.innerWidth <= 768) {
                    sidebarNav.classList.remove('active');
                    sidebarToggle.classList.remove('active');
                }
            };

            // Use click for standard desktop/mouse interaction
            link.addEventListener('click', linkHandler);
            
            // Use touchstart for better reliability on native mobile browsers
            // Ensure the handler only runs once to prevent double-loading
            link.addEventListener('touchstart', (event) => {
                 if (event.cancelable) {
                    // Prevent default touch behavior (like scrolling) before click fires
                    event.preventDefault(); 
                 }
                 // Trigger the link handler logic
                 linkHandler(event);
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
    
        if (!feedbackButtonsContainer || !feedbackMessagePlaceholder) return;
    
        feedbackButtonsContainer.addEventListener('click', async (event) => {
            const button = event.target;
            if (!button.classList.contains('feedback-btn')) return;
    
            const responseValue = button.dataset.response;
            if (!responseValue) return;
    
            // Disable buttons after click
            feedbackButtonsContainer.querySelectorAll('.feedback-btn').forEach(btn => btn.disabled = true);
    
            // Show temporary message while sending
            feedbackMessagePlaceholder.textContent = 'Submitting feedback...';
            feedbackMessagePlaceholder.style.fontWeight = 'bold';
            feedbackMessagePlaceholder.style.color = '#4a5568';
            feedbackMessagePlaceholder.style.marginLeft = '10px';
    
            try {
                const res = await fetch('https://marketmind-ai-api.onrender.com/api/feedback', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ response: responseValue })
                });
    
                if (res.ok) {
                    feedbackMessagePlaceholder.textContent = 'Thank you for your feedback!';
                    feedbackMessagePlaceholder.style.color = '#22c55e'; // green
                } else {
                    const data = await res.json();
                    feedbackMessagePlaceholder.textContent = `Error: ${data.detail || res.statusText}`;
                    feedbackMessagePlaceholder.style.color = '#ef4444'; // red
                }
            } catch (err) {
                feedbackMessagePlaceholder.textContent = `Network error: ${err.message}`;
                feedbackMessagePlaceholder.style.color = '#ef4444';
            }
        });
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
    // ✅ FIX 1: Mobile Sidebar Dropdown Functionality
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