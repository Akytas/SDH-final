// Společná konfigurace souborů ke stažení pro celý web SDH Horoměřice
// Tento soubor se používá na všech stránkách - stačí upravit jen zde!

const downloadFiles = {
    sdh: {
        title: "🏢 SDH",
        files: [
            {
                path: "soubory/prihlaska-clen-hasic.pdf",
                name: "Přihláška člena SDH",
                description: "Formulář pro nové členy",
                type: "pdf",
                icon: "📝"
            },
            {
                path: "soubory/prihlaska-clen-mlady-hasic.pdf",
                name: "Přihláška člena Mládeže",
                description: "Formulář pro nové členy Mládeže",
                type: "pdf",
                icon: "📝"
            }
        ]
    },
    
    tabor: {
        title: "🏕️ Tábor",
        files: [
            {
                path: "souboryTabor/Přihláška-LDT-SDH-Horo.pdf",
                name: "Přihláška LDT SDH Horoměřice",
                description: "Oficiální přihláška na letní dětský tábor",
                type: "pdf",
                icon: "📝"
            },
            {
                path: "souboryTabor/22. Posudek-o-zdravotní-způsobulosti-dítěte.pdf",
                name: "Posudek o zdravotní způsobilosti",
                description: "Lékařský posudek pro účast na táboře",
                type: "pdf",
                icon: "📝"
            },
            {
                path: "souboryTabor/23. Čestné-prohlášení-BEZINFEKČNOST.pdf",
                name: "Čestné prohlášení - bezinfekčnost",
                description: "Prohlášení o zdravotním stavu",
                type: "pdf",
                icon: "📝"
            },
            {
                path: "souboryTabor/24. Nástupní-list-dítěte.pdf",
                name: "Nástupní list dítěte",
                description: "Formulář pro nástup na tábor",
                type: "pdf",
                icon: "📝"
            },
            {
                path: "souboryTabor/25. Souhlas-s-podáváním-léčiv.pdf",
                name: "Souhlas s podáváním léčiv",
                description: "Souhlas pro podávání léků",
                type: "pdf",
                icon: "📝"
            },
            {
                path: "souboryTabor/Doporučený-seznam-věcí.docx",
                name: "Doporučený seznam věcí",
                description: "Co si vzít na tábor",
                type: "word",
                icon: "📝"
            },
            {
                path: "souboryTabor/Smluvní-podmínky-LDT.docx",
                name: "Smluvní podmínky LDT",
                description: "Podmínky účasti na táboře",
                type: "word",
                icon: "📝"
            },
            {
                path: "souboryTabor/Táborový-řád.docx",
                name: "Táborový řád",
                description: "Pravidla a režim tábora",
                type: "word",
                icon: "📝"
            }
        ]
    }
};

// Funkce pro generování HTML modalu
function generateDownloadModal() {
    let modalHTML = `
    <div id="downloadModal" class="modal">
        <div class="modal-overlay" onclick="closeDownloadModal()"></div>
        <div class="modal-container download-modal">
            <div class="modal-header">
                <h2>📁 Ke stažení - SDH Horoměřice</h2>
                <button class="modal-close" onclick="closeDownloadModal()">&times;</button>
            </div>
            
            <div class="modal-content">
                <div class="download-categories">`;

    // Generování kategorií
    Object.keys(downloadFiles).forEach(categoryKey => {
        const category = downloadFiles[categoryKey];
        modalHTML += `
                    <div class="download-category">
                        <div class="category-header">
                            <h3>${category.title}</h3>
                            <span class="file-count">${category.files.length} ${category.files.length === 1 ? 'soubor' : (category.files.length <= 4 ? 'soubory' : 'souborů')}</span>
                        </div>
                        <div class="files-grid">`;

        // Generování souborů v kategorii
        category.files.forEach(file => {
            modalHTML += `
                            <div class="file-card" onclick="downloadFile('${file.path}', '${categoryKey}')">
                                <div class="file-icon ${file.type}">${file.icon}</div>
                                <div class="file-info">
                                    <h4>${file.name}</h4>
                                    <p>${file.description}</p>
                                </div>
                                <div class="download-btn">⬇️</div>
                            </div>`;
        });

        modalHTML += `
                        </div>
                    </div>`;
    });

    modalHTML += `
                </div>
            </div>
        </div>
    </div>`;

    return modalHTML;
}

// Funkce pro vložení modalu do stránky
function initDownloadModal() {
    // Odstraň existující modal pokud existuje
    const existingModal = document.getElementById('downloadModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Vlož nový modal
    document.body.insertAdjacentHTML('beforeend', generateDownloadModal());
}

// Inicializace po načtení stránky
document.addEventListener('DOMContentLoaded', function() {
    initDownloadModal();
});