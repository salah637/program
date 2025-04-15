// Mobile menu toggle functionality and touch support for descriptions
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            menuToggle.textContent = mainNav.classList.contains('active') ? '✕' : '☰';
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('nav ul li a');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                mainNav.classList.remove('active');
                menuToggle.textContent = '☰';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = mainNav.contains(event.target);
            const isClickOnToggle = menuToggle.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnToggle && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                menuToggle.textContent = '☰';
            }
        });
    }
    
    // Mobile touch support for timeline nodes
    if ('ontouchstart' in window) {
        const timelineNodes = document.querySelectorAll('.timeline-node');
        const allItems = document.querySelectorAll('.timeline-item');
        
        // Add touch handlers to nodes
        timelineNodes.forEach(node => {
            node.addEventListener('touchstart', function(e) {
                e.preventDefault();
                
                // Close any other open descriptions first
                document.querySelectorAll('.timeline-node.active').forEach(activeNode => {
                    if (activeNode !== node) {
                        activeNode.classList.remove('active');
                    }
                });
                
                // Toggle active class for this node
                node.classList.toggle('active');
            });
        });
        
        // Close descriptions when touching elsewhere
        document.addEventListener('touchstart', function(e) {
            if (!e.target.closest('.timeline-node')) {
                document.querySelectorAll('.timeline-node.active').forEach(node => {
                    node.classList.remove('active');
                });
            }
        });
        
        // Prevent scrolling when touching nodes (but allow scrolling elsewhere)
        timelineNodes.forEach(node => {
            node.addEventListener('touchmove', function(e) {
                e.preventDefault();
            });
        });
    }
});