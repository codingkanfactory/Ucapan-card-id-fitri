// Get all necessary elements
        const inputForm = document.getElementById('input-form');
        const cardResult = document.getElementById('card-result');
        const imageResult = document.getElementById('image-result');
        const nameInput = document.getElementById('name-input');
        const displayName = document.getElementById('display-name');
        const generateBtn = document.getElementById('generate-btn');
        const backBtn = document.getElementById('back-btn');
        const createImageBtn = document.getElementById('create-image-btn');
        const cardToDownload = document.getElementById('card-to-download');
        const generatedImage = document.getElementById('generated-image');
        const backToCardBtn = document.getElementById('back-to-card-btn');

        // Generate card function
        generateBtn.addEventListener('click', function() {
            const name = nameInput.value.trim();
            if (name !== '') {
                displayName.textContent = name;
                inputForm.classList.add('hidden');
                cardResult.classList.remove('hidden');
            } else {
                alert('Silahkan masukkan nama Anda terlebih dahulu');
            }
        });

        // Back button function
        backBtn.addEventListener('click', function() {
            cardResult.classList.add('hidden');
            inputForm.classList.remove('hidden');
        });
        
        // Back to card button function
        backToCardBtn.addEventListener('click', function() {
            imageResult.classList.add('hidden');
            cardResult.classList.remove('hidden');
        });

        // Create image function
        createImageBtn.addEventListener('click', function() {
            const name = displayName.textContent;
            
            // Add a small delay to ensure DOM is fully rendered
            setTimeout(() => {
                html2canvas(cardToDownload, {
                    backgroundColor: null,
                    useCORS: true,
                    scale: 2, // For better quality
                    allowTaint: true,
                    onclone: function(clonedDoc) {
                        // Ensure name appears in the cloned document
                        const clonedName = clonedDoc.getElementById('display-name');
                        if (clonedName) {
                            clonedName.textContent = name;
                        }
                    }
                }).then(canvas => {
                    // Convert canvas to image data URL
                    const imgData = canvas.toDataURL('image/jpeg', 1.0);
                    
                    // Set the image source and show image result
                    generatedImage.src = imgData;
                    cardResult.classList.add('hidden');
                    imageResult.classList.remove('hidden');
                    
                }).catch(error => {
                    console.error('Error generating image:', error);
                    alert('Maaf, terjadi kesalahan saat membuat gambar.');
                });
            }, 100); // Small delay to ensure rendering is complete
        });

        // Add enter key event for input
        nameInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                generateBtn.click();
            }
        });

        // Auto focus on input field when page loads
        window.onload = function() {
            nameInput.focus();
        };
