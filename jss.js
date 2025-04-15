document.addEventListener('DOMContentLoaded', function() {
    // Check if touch is supported
    if ('ontouchstart' in window) {
        const timelineNodes = document.querySelectorAll('.indaba-timeline-node');
        const timelineContents = document.querySelectorAll('.indaba-timeline-content');
        
        // Track touch start position to distinguish between taps and scrolls
        let touchStartY = 0;
        let isTapping = false;
        
        // Function to close all popups
        function closeAllPopups() {
            document.querySelectorAll('.indaba-timeline-node.active').forEach(node => {
                node.classList.remove('active');
            });
        }
        
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
});