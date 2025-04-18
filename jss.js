document.addEventListener('DOMContentLoaded', function() {
    const timelineNodes = document.querySelectorAll('.indaba-timeline-node');
    const timelineContents = document.querySelectorAll('.indaba-timeline-content');
    
    // Function to close all popups
    function closeAllPopups() {
        document.querySelectorAll('.indaba-timeline-node.active').forEach(node => {
            node.classList.remove('active');
        });
    }
    
    // Day 2 Toggle Functionality
    const showDay2Button = document.getElementById('show-day2-button');
    const hideDay2Button = document.getElementById('hide-day2-button');
    const day2Section = document.getElementById('day2-section');
    
    // Show Day 2 when button is clicked
    if (showDay2Button) {
        showDay2Button.addEventListener('click', function() {
            day2Section.style.display = 'block';
            showDay2Button.style.display = 'none';
            // Scroll to Day 2 section for better UX
            day2Section.scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Hide Day 2 when button is clicked
    if (hideDay2Button) {
        hideDay2Button.addEventListener('click', function() {
            day2Section.style.display = 'none';
            showDay2Button.style.display = 'block';
            // Scroll back to Day 1 section for better UX
            document.getElementById('day1-section').scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // TOUCH DEVICE SUPPORT
    if ('ontouchstart' in window) {
        // Track touch start position to distinguish between taps and scrolls
        let touchStartY = 0;
        let isTapping = false;
        
        // Add touch handlers to nodes
        timelineNodes.forEach(node => {
            node.addEventListener('touchstart', function(e) {
                // Store initial touch position
                touchStartY = e.touches[0].clientY;
                isTapping = true;
                
                // Don't prevent default here to allow scrolling
            });
            
            node.addEventListener('touchmove', function(e) {
                // Check if user is scrolling or just tapping
                const touchMoveY = e.touches[0].clientY;
                const deltaY = Math.abs(touchMoveY - touchStartY);
                
                // If moved more than 10px, consider it a scroll, not a tap
                if (deltaY > 10) {
                    isTapping = false;
                }
                
                // Don't prevent default to allow scrolling
            });
            
            node.addEventListener('touchend', function(e) {
                // Only handle as a tap if not scrolling
                if (isTapping) {
                    // Check if this node is already active
                    const isCurrentlyActive = node.classList.contains('active');
                    
                    // Close any other open descriptions first
                    closeAllPopups();
                    
                    // Toggle active class for this node - only add it if it wasn't already active
                    if (!isCurrentlyActive) {
                        node.classList.add('active');
                    }
                    // If it was active, it's now closed by closeAllPopups()
                    
                    // Prevent default action only for taps
                    e.preventDefault();
                }
            });
        });
        
        // Add touch handlers to timeline content (text)
        timelineContents.forEach(content => {
            content.addEventListener('touchstart', function(e) {
                // Store initial touch position
                touchStartY = e.touches[0].clientY;
                isTapping = true;
                
                // Don't prevent default here to allow scrolling
            });
            
            content.addEventListener('touchmove', function(e) {
                // Check if user is scrolling or just tapping
                const touchMoveY = e.touches[0].clientY;
                const deltaY = Math.abs(touchMoveY - touchStartY);
                
                // If moved more than 10px, consider it a scroll, not a tap
                if (deltaY > 10) {
                    isTapping = false;
                }
                
                // Don't prevent default to allow scrolling
            });
            
            content.addEventListener('touchend', function(e) {
                // Only handle as a tap if not scrolling
                if (isTapping) {
                    // Get the parent timeline item
                    const timelineItem = content.closest('.indaba-timeline-item');
                    
                    // Find the node in this timeline item
                    const nodeInSameItem = timelineItem.querySelector('.indaba-timeline-node');
                    
                    // Check if this node is already active
                    const isCurrentlyActive = nodeInSameItem && nodeInSameItem.classList.contains('active');
                    
                    // Close all popups first
                    closeAllPopups();
                    
                    // Add active class to the node in this timeline item only if it wasn't already active
                    if (nodeInSameItem && !isCurrentlyActive) {
                        nodeInSameItem.classList.add('active');
                    }
                    // If it was active, it's now closed by closeAllPopups()
                    
                    // Prevent default action only for taps
                    e.preventDefault();
                }
            });
        });
        
        // Close descriptions when touching elsewhere (using touchend to allow scrolling)
        document.addEventListener('touchend', function(e) {
            if (!e.target.closest('.indaba-timeline-node') && 
                !e.target.closest('.indaba-timeline-content') &&
                !e.target.closest('.indaba-timeline-description')) {
                closeAllPopups();
            }
        });
    }
    
    // DESKTOP SUPPORT - Add click handlers
    
    // Add click handlers to timeline nodes
    timelineNodes.forEach(node => {
        node.addEventListener('click', function(e) {
            // Check if this node is already active
            const isCurrentlyActive = node.classList.contains('active');
            
            // Close any other open descriptions first
            closeAllPopups();
            
            // Toggle active class for this node - only add it if it wasn't already active
            if (!isCurrentlyActive) {
                node.classList.add('active');
            }
            // If it was active, it's now closed by closeAllPopups()
            
            e.preventDefault();
            e.stopPropagation();
        });
    });
    
    // Add click handlers to timeline content (text)
    timelineContents.forEach(content => {
        content.addEventListener('click', function(e) {
            // Get the parent timeline item
            const timelineItem = content.closest('.indaba-timeline-item');
            
            // Find the node in this timeline item
            const nodeInSameItem = timelineItem.querySelector('.indaba-timeline-node');
            
            // Check if this node is already active
            const isCurrentlyActive = nodeInSameItem && nodeInSameItem.classList.contains('active');
            
            // Close all popups first
            closeAllPopups();
            
            // Add active class to the node in this timeline item only if it wasn't already active
            if (nodeInSameItem && !isCurrentlyActive) {
                nodeInSameItem.classList.add('active');
            }
            // If it was active, it's now closed by closeAllPopups()
            
            e.preventDefault();
            e.stopPropagation();
        });
    });
    
    // Close popups when clicking elsewhere on the document
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.indaba-timeline-node') && 
            !e.target.closest('.indaba-timeline-content') &&
            !e.target.closest('.indaba-timeline-description')) {
            closeAllPopups();
        }
    });
});