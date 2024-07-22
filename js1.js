document.getElementById('service-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('service-title').value;
    const image = document.getElementById('service-image').value;
    const description = document.getElementById('service-description').value;
    
    addService(title, image, description);
});

function addService(title, image, description) {
    const serviceContainer = document.getElementById('services-container');
    const serviceCard = document.createElement('div');
    serviceCard.className = 'service-card';
    
    serviceCard.innerHTML = `
        <div class="actions owner-actions">
            <button onclick="deleteService(event)">حذف</button>
            <button class="edit-button" onclick="editService(event, '${title}', '${image}', '${description}')">تعديل</button>
            <button onclick="toggleFavorite(event)">مفضلة</button>
        </div>
        <img src="${image}" alt="${title}">
        <h2>${title}</h2>
        <p>${description}</p>
        <button class="contact-button" onclick="toggleContactDetails(event)">تواصل معنا</button>
        <div class="contact-details">
            <a href="https://wa.me/123456789" target="_blank">واتساب</a>
            <a href="https://www.instagram.com/your_profile" target="_blank">إنستاجرام</a>
            <a href="https://www.facebook.com/your_profile" target="_blank">فيسبوك</a>
        </div>
    `;
    
    serviceCard.onclick = (e) => {
        if (e.target.tagName !== 'BUTTON') {
            showDetails(title, image, description);
        }
    };

    serviceContainer.appendChild(serviceCard);
}

function showDetails(title, image, description) {
    const serviceDetails = document.getElementById('service-details');
    serviceDetails.innerHTML = `
        <h2>${title}</h2>
        <img src="${image}" alt="${title}">
        <p>${description}</p>
    `;
    document.getElementById('modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

function deleteService(event) {
    event.stopPropagation();
    const serviceCard = event.target.closest('.service-card');
    serviceCard.remove();
}

let currentEditServiceCard;

function editService(event, title, image, description) {
    event.stopPropagation();
    currentEditServiceCard = event.target.closest('.service-card');
    document.getElementById('edit-service-title').value = title;
    document.getElementById('edit-service-image').value = image;
    document.getElementById('edit-service-description').value = description;
    document.getElementById('edit-modal').style.display = 'flex';
}

document.getElementById('edit-service-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('edit-service-title').value;
    const image = document.getElementById('edit-service-image').value;
    const description = document.getElementById('edit-service-description').value;

    currentEditServiceCard.querySelector('h2').textContent = title;
    currentEditServiceCard.querySelector('img').src = image;
    currentEditServiceCard.querySelector('p').textContent = description;

    closeEditModal();
});

function closeEditModal() {
    document.getElementById('edit-modal').style.display = 'none';
}

function toggleFavorite(event) {
    event.stopPropagation();
    const serviceCard = event.target.closest('.service-card');
    serviceCard.classList.toggle('favorite');
    const serviceContainer = document.getElementById('services-container');
    serviceContainer.insertBefore(serviceCard, serviceContainer.firstChild);
}

function toggleContactDetails(event) {
    event.stopPropagation();
    const contactDetails = event.target.closest('.service-card').querySelector('.contact-details');
    contactDetails.style.display = contactDetails.style.display === 'block' ? 'none' : 'block';
}
