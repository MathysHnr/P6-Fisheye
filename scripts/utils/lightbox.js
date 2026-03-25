let keyboardHandler = null;

export const displayLightbox = medias => {
    const lightboxWrapper = document.querySelector('.lightbox_wrapper');
    const btnClose = document.querySelector('.btn_close_lightbox');
    const btnPrevious = document.querySelector('.btn_previous');
    const btnNext = document.querySelector('.btn_next');
    const lightboxMedia = document.querySelector('.lightbox_media');
    const mediaProvider = Array.from(document.querySelectorAll('.gallery_card a'));

    const photographer = medias.photographer;
    const mediasList = medias.medias;
    let currentIndex = 0;

    const openLightbox = mediaId => {
        const mediaIndex = mediasList.findIndex(media => media.id == mediaId);
        currentIndex = mediaIndex;
        lightboxWrapper.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        btnClose.focus();
        lightboxTemplate();
    };

    mediaProvider.forEach(media => {
        media.addEventListener('click', e => {
            e.preventDefault();
            openLightbox(media.dataset.media);
        });
    });

    const lightboxTemplate = () => {
        const currentMedia = mediasList[currentIndex];

        lightboxMedia.innerHTML = `
            ${currentMedia.image ? `
            <img src="./assets/images/photographers/samplePhotos-Medium/${photographer.name}/${currentMedia.image}" alt="${currentMedia.alt}">` :
            `<video controls aria-label="${currentMedia.alt}"><source src="./assets/images/photographers/samplePhotos-Medium/${photographer.name}/${currentMedia.video}" type="video/mp4"></video>`}

            <figcaption>${currentMedia.title}</figcaption>
        `;
    };

    const closeLightbox = () => {
        lightboxWrapper.style.display = 'none';
        lightboxMedia.innerHTML = '';
        document.body.style.overflow = '';
    };

    const nextMedia = () => {
        currentIndex++;
        if (currentIndex > mediasList.length - 1) currentIndex = 0;
        lightboxTemplate();
        showActiveBtn(btnNext);
    };

    const previousMedia = () => {
        currentIndex--;
        if (currentIndex < 0) currentIndex = mediasList.length - 1;
        lightboxTemplate();
        showActiveBtn(btnPrevious);
    };

    const showActiveBtn = btn => {
        btn.classList.add('active');
        setTimeout(() => btn.classList.remove('active'), 100);
    };

    // Focus trap inside lightbox
    const focusableElements = [btnClose, btnPrevious, btnNext];
    const trapFocus = e => {
        if (lightboxWrapper.style.display !== 'flex') return;
        if (e.key !== 'Tab') return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            }
        } else {
            if (document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    };

    // Remove previous keyboard handler to avoid accumulation
    if (keyboardHandler) {
        document.removeEventListener('keyup', keyboardHandler);
        document.removeEventListener('keydown', trapFocus);
    }

    keyboardHandler = e => {
        if (lightboxWrapper.style.display !== 'flex') return;
        switch (e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                previousMedia();
                break;
            case 'ArrowRight':
                nextMedia();
                break;
        }
    };

    document.addEventListener('keyup', keyboardHandler);
    document.addEventListener('keydown', trapFocus);

    btnPrevious.addEventListener('click', () => previousMedia());
    btnNext.addEventListener('click', () => nextMedia());
    btnClose.addEventListener('click', () => closeLightbox());
};
