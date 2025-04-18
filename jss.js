document.addEventListener('DOMContentLoaded', function() {
    // Restructure timeline items to have a header container
    const timelineItems = document.querySelectorAll('.indaba-timeline-item');
    
    timelineItems.forEach(item => {
        // Create header div
        const headerDiv = document.createElement('div');
        headerDiv.className = 'indaba-timeline-item-header';
        
        // Find elements to move to header
        const content = item.querySelector('.indaba-timeline-content');
        const node = item.querySelector('.indaba-timeline-node');
        const connector = item.querySelector('.indaba-timeline-connector');
        
        // Clone them (to avoid move issues)
        const contentClone = content.cloneNode(true);
        const nodeClone = node.cloneNode(true);
        const connectorClone = connector.cloneNode(true);
        
        // Add to header
        headerDiv.appendChild(contentClone);
        headerDiv.appendChild(nodeClone);
        headerDiv.appendChild(connectorClone);
        
        // Insert header at the beginning of item
        item.insertBefore(headerDiv, item.firstChild);
        
        // Remove original elements
        content.remove();
        node.remove();
        connector.remove();
        
        // Any 'more_info' elements should be removed since they're no longer needed
        const moreInfo = item.querySelector('.more_info');
        if (moreInfo) {
            moreInfo.remove();
        }
        
        // Any 'show_disc' elements should be removed since they're no longer needed
        const showDisc = item.querySelector('.show_disc');
        if (showDisc) {
            showDisc.remove();
        }
    });
    
    // Day 2 Toggle Functionality (keeping this functionality)
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
});