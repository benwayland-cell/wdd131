
const images = document.getElementById('images');
const modal = document.querySelector('dialog');
const modalImage = modal.querySelector('img');
const closeButton = modal.querySelector('.close-viewer');

// Event listener for opening the modal
images.addEventListener('click', openModal);

function openModal(event) {
    let givenSrc = event.target.src;
    if (givenSrc == undefined) return;

    let fullSizeSrc = givenSrc.replace("-sm.", "-full.");
    modalImage.src = fullSizeSrc;
    modal.showModal();

    console.log(document.getElementsByClassName("viewer"));
}
// Close modal on button click
closeButton.addEventListener('click', () => {
    modal.close();
});

// Close modal if clicking outside the image
modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.close();
    }
});
          