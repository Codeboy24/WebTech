document.addEventListener('DOMContentLoaded', () => {
    
    // FEATURE 1: Theme Switch
    // Toggles the dark-theme class on the body to switch appearances
    const themeToggleBtn = document.getElementById('theme-toggle');
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
    });

    // FEATURE 2: Expandable Content
    // Shows or hides project details when the specific button is clicked
    const expandButtons = document.querySelectorAll('.expand-btn');
    expandButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const detailsDiv = e.target.nextElementSibling;
            detailsDiv.classList.toggle('hidden');
            
            // Update button text to reflect the open/closed state
            if (detailsDiv.classList.contains('hidden')) {
                e.target.textContent = 'Show Details';
            } else {
                e.target.textContent = 'Hide Details';
            }
        });
    });

    // FEATURE 3: Gallery Viewer
    // Arrays holding image data for the viewer
    const galleryData = [
        {
            src: "images/photo1.jpg",
            alt: "Study desk setup with a laptop and code editor open",
            caption: "My study setup where I practice web programming."
        },
        {
            src: "images/photo2.jpg",
            alt: "Mulungushi University campus environment",
            caption: "Mulungushi University campus library area."
        },
        {
            src: "images/photo3.jpg",
            alt: "Notebook with handwritten code snippets and logic diagrams",
            caption: "My notes and project planning diagrams."
        }
    ];

    let currentPhotoIndex = 0;
    const galleryImg = document.getElementById('gallery-img');
    const galleryCaption = document.getElementById('gallery-caption');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    // Function to update the DOM with the new image
    function updateGallery() {
        galleryImg.src = galleryData[currentPhotoIndex].src;
        galleryImg.alt = galleryData[currentPhotoIndex].alt;
        galleryCaption.textContent = galleryData[currentPhotoIndex].caption;
    }

    prevBtn.addEventListener('click', () => {
        // Decrement index, loop to end if at the beginning
        currentPhotoIndex = (currentPhotoIndex === 0) ? galleryData.length - 1 : currentPhotoIndex - 1;
        updateGallery();
    });

    nextBtn.addEventListener('click', () => {
        // Increment index, loop to start if at the end
        currentPhotoIndex = (currentPhotoIndex === galleryData.length - 1) ? 0 : currentPhotoIndex + 1;
        updateGallery();
    });

    // COMPULSORY FEATURE: Contact Form Validation & Preview
    // Validates inputs and shows a summary locally without a server
    const contactForm = document.getElementById('contact-form');
    const feedbackMsg = document.getElementById('form-feedback');
    const previewBox = document.getElementById('form-preview');

    contactForm.addEventListener('submit', (event) => {
        // Prevent actual submission
        event.preventDefault(); 
        
        // Retrieve values and remove leading/trailing whitespace
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const topic = document.getElementById('topic').value;
        const message = document.getElementById('message').value.trim();

        feedbackMsg.classList.add('hidden');
        previewBox.classList.add('hidden');

        // Validation logic
        if (name === '') {
            feedbackMsg.textContent = 'Error: Name cannot be empty or just spaces.';
            feedbackMsg.classList.remove('hidden');
            return;
        }

        if (message === '') {
            feedbackMsg.textContent = 'Error: Message cannot be empty or just spaces.';
            feedbackMsg.classList.remove('hidden');
            return;
        }

        if (!email.includes('@') || !email.includes('.')) {
            feedbackMsg.textContent = 'Error: Please enter a valid email address.';
            feedbackMsg.classList.remove('hidden');
            return;
        }

        // If valid, populate preview using textContent for security
        document.getElementById('preview-name').textContent = name;
        document.getElementById('preview-email').textContent = email;
        document.getElementById('preview-topic').textContent = topic;
        document.getElementById('preview-message').textContent = message;

        // Display the success preview and hide the form inputs
        previewBox.classList.remove('hidden');
        contactForm.reset();
    });
});