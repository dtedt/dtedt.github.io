
    // cal.js content - extract this to cal.js
    const events = [
        {
            date: "15",
            month: "AUG",
            time: "7:00 PM - 9:00 PM",
            title: "Tech Networking Mixer",
            location: "Innovation Hub, Downtown",
            description: "Join us for an evening of networking with fellow tech professionals. Light refreshments and drinks will be provided.",
            googleCalendar: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Tech+Networking+Mixer",
            meetup: "https://www.meetup.com/tech-networking-group/events/123456789/",
            newsletter: "https://example.com/newsletter/tech-mixer"
        },
        {
            date: "22",
            month: "AUG",
            time: "2:00 PM - 4:00 PM",
            title: "Design Workshop: UX Fundamentals",
            location: "Creative Space, Arts District",
            description: "Learn the basics of user experience design in this hands-on workshop. Perfect for beginners and those looking to refresh their skills.",
            googleCalendar: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Design+Workshop+UX+Fundamentals",
            meetup: "https://www.meetup.com/design-workshop-group/events/234567890/",
            newsletter: "https://example.com/newsletter/ux-workshop"
        },
        {
            date: "28",
            month: "AUG",
            time: "6:30 PM - 8:30 PM",
            title: "Startup Pitch Night",
            location: "Entrepreneurship Center",
            description: "Watch local startups pitch their ideas to a panel of investors and industry experts. Networking reception follows.",
            googleCalendar: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Startup+Pitch+Night",
            meetup: "https://www.meetup.com/startup-community/events/345678901/",
            newsletter: "https://example.com/newsletter/pitch-night"
        },
        {
            date: "05",
            month: "SEP",
            time: "10:00 AM - 12:00 PM",
            title: "Digital Marketing Seminar",
            location: "Business Conference Center",
            description: "Discover the latest trends in digital marketing and learn actionable strategies to grow your online presence.",
            googleCalendar: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Digital+Marketing+Seminar",
            meetup: "https://www.meetup.com/marketing-professionals/events/456789012/",
            newsletter: "https://example.com/newsletter/marketing-seminar"
        },
        {
            date: "12",
            month: "SEP",
            time: "7:00 PM - 9:30 PM",
            title: "Code & Coffee: Open Source Night",
            location: "Tech Cafe, Silicon Valley",
            description: "Bring your laptop and contribute to open source projects while enjoying great coffee and meeting like-minded developers.",
            googleCalendar: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Code+Coffee+Open+Source+Night",
            meetup: "https://www.meetup.com/developers-group/events/567890123/",
            newsletter: "https://example.com/newsletter/code-coffee"
        }
    ];

    function createEventCard(event) {
        return `
            <div class="event-card" onclick="toggleCard(this)">
                <div class="expand-indicator"></div>
                <div class="event-main">
                    <div class="event-date">
                        <div class="day">${event.date}</div>
                        <div class="month">${event.month}</div>
                    </div>
                    <div class="event-info">
                        <h3 class="event-title">${event.title}</h3>
                        <div class="event-details">
                            <div class="event-time">${event.time}</div>
                            <div class="event-location">${event.location}</div>
                            <div class="event-description">${event.description}</div>
                        </div>
                    </div>
                </div>
                <div class="event-expanded">
                    <div class="event-links">
                        <a href="${event.googleCalendar}" target="_blank" class="event-link google">
                            📅 Add to Google Calendar
                        </a>
                        <a href="${event.meetup}" target="_blank" class="event-link meetup">
                            👥 View on Meetup
                        </a>
                        <a href="${event.newsletter}" target="_blank" class="event-link newsletter">
                            📧 Newsletter Signup
                        </a>
                    </div>
                </div>
            </div>
        `;
    }

    function toggleCard(card) {
        // Close other expanded cards
        const allCards = document.querySelectorAll('.event-card');
        allCards.forEach(c => {
            if (c !== card) {
                c.classList.remove('expanded');
            }
        });

        // Toggle current card
        card.classList.toggle('expanded');
    }

    function initializeEvents() {
        const eventsFeed = document.getElementById('eventsFeed');
        const eventsHTML = events.map(event => createEventCard(event)).join('');
        eventsFeed.innerHTML = eventsHTML;
    }

    // Initialize when page loads
    document.addEventListener('DOMContentLoaded', initializeEvents);

    // Add smooth scrolling when cards expand
    document.addEventListener('click', function(e) {
        if (e.target.closest('.event-card')) {
            setTimeout(() => {
                const expandedCard = document.querySelector('.event-card.expanded');
                if (expandedCard) {
                    expandedCard.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }
            }, 100);
        }
    });

    // Close expanded cards when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.event-card')) {
            const allCards = document.querySelectorAll('.event-card');
            allCards.forEach(card => card.classList.remove('expanded'));
        }
    });