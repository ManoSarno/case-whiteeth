document.addEventListener('DOMContentLoaded', function() {
  // Rating containers from all products
  const ratingContainer = document.querySelectorAll('.rating-stars');

  // Looping through each rating container
  ratingContainer.forEach((item, index) => {
    // Getting data rating
    let rating = parseFloat(item.getAttribute('data-rating')); // e.g. 4.3

    // Looping 5 times
    for(i = 0; i < 5; i++) {
        let starRating = rating - i;
        let starId = `star-${index + 1}-${i + 1}`
        let gradientId = `starGradient-${index + 1}-${i + 1}`;
        let stop = '';

        if (starRating >= 1) {
            // Full star
            stop = '100%';
        } else {
            // Partial star, calculate the fill percentage
            stop = `${(starRating * 100)}%`;
        }

        // Creating wrapper element for the star svg
        let starSpan = document.createElement('span');

        // Adding the html of the svg in the wrapper element with respective props
        starSpan.innerHTML =`
            <svg class="star" id="${starId}" xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 24 24">
                <path fill="url(#${gradientId})" stroke="#F7C325" stroke-width="2" d="m12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72l3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41l-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18l-1.1 4.72c-.2.86.73 1.54 1.49 1.08z"/>
                <defs>
                    <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="${stop}" stop-color="#F7C325" />
                        <stop offset="${stop}" stop-color="transparent" />
                    </linearGradient>
                </defs>
            </svg>
        `;

        // Appending the wrapper element to the rating container
        item.append(starSpan);
    }
  })
});
