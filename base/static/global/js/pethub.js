// Preview showcase pets array for interactive hero cycling
const previewPets = [
    { name: "Bento", age: "8 meses", type: "Filhote • Energético", image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=800", desc: "Adora correr no parque, especialista em dar tapinhas com a pata e muito curioso com borboletas." },
    { name: "Luna", age: "1 ano", type: "Jovem • Carinhosa", image: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=800", desc: "Companheira ideal para maratonas de filmes e carinhos na barriga. Super dócil com crianças." },
    { name: "Thor", age: "2 anos", type: "Adulto • Protetor", image: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=800", desc: "Fã de caminhadas longas ao ar livre, muito inteligente e obediente. Um verdadeiro gentleman." }
];
let currentPreviewIndex = 0;

function nextPreviewPet() {
    currentPreviewIndex = (currentPreviewIndex + 1) % previewPets.length;
    const pet = previewPets[currentPreviewIndex];
    const heroCard = document.querySelector('.lg\\:col-span-5');
    if (!heroCard) return;

    heroCard.style.opacity = '0.5';
    setTimeout(() => {
        const img = heroCard.querySelector('img');
        const title = heroCard.querySelector('h3');
        const desc = heroCard.querySelector('p');

        if (img) img.src = pet.image;
        if (title) title.textContent = `${pet.name}, ${pet.age}`;
        if (desc) desc.textContent = `"${pet.desc}"`;

        heroCard.style.opacity = '1';
    }, 150);
}

// Filtering grid pets
function filterPets(category) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
        if (btn.dataset.category === category) {
            btn.classList.add('bg-brand-primary', 'text-white');
            btn.classList.remove('text-brand-text-muted');
        } else {
            btn.classList.remove('bg-brand-primary', 'text-white');
            btn.classList.add('text-brand-text-muted');
        }
    });

    const cards = document.querySelectorAll('.pet-card');
    cards.forEach(card => {
        if (category === 'all' || card.dataset.type === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Modal Handler
function openModal(type, data = '') {
    const modal = document.getElementById('app-modal');
    const content = document.getElementById('modal-content');
    if (!modal || !content) return;

    modal.classList.remove('hidden');

    if (type === 'match') {
        content.innerHTML = `
            <div class="text-center space-y-3">
                <div class="w-16 h-16 bg-brand-secondary-light text-brand-secondary rounded-2xl mx-auto flex items-center justify-center text-3xl font-bold">✨</div>
                <h3 class="font-display text-2xl font-bold text-brand-primary">Quiz de Compatibilidade PetHub</h3>
                <p class="text-brand-text-muted text-sm">Responda rápido para encontrarmos o pet ideal para o seu estilo de vida.</p>
            </div>
            <div class="space-y-4 pt-2">
                <div>
                    <label class="block text-sm font-bold text-brand-primary mb-2">Qual o seu nível de atividade física diária?</label>
                    <select class="w-full p-3.5 rounded-xl border border-brand-border bg-brand-background focus:outline-none focus:border-brand-primary font-medium">
                        <option>Moderado (Caminhadas leves)</option>
                        <option>Alto (Corridas e trilhas frequentes)</option>
                        <option>Tranquilo (Aproveito o sofá e aconchego)</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-bold text-brand-primary mb-2">Você possui espaço aberto em casa?</label>
                    <select class="w-full p-3.5 rounded-xl border border-brand-border bg-brand-background focus:outline-none focus:border-brand-primary font-medium">
                        <option>Sim, quintal espaçoso</option>
                        <option>Apartamento aconchegante</option>
                        <option>Casa com varanda ou jardim médio</option>
                    </select>
                </div>
                <button onclick="submitQuiz()" class="w-full py-4 bg-brand-accent hover:bg-brand-accent-hover text-white rounded-xl font-display font-bold text-lg shadow-lg shadow-brand-accent/20 transition-all">
                    Encontrar Meu Match Perfeito 🐾
                </button>
            </div>
        `;
    } else if (type === 'adopt') {
        content.innerHTML = `
            <div class="text-center space-y-3">
                <div class="w-16 h-16 bg-brand-primary-light text-brand-primary rounded-2xl mx-auto flex items-center justify-center text-3xl font-bold">❤️</div>
                <h3 class="font-display text-2xl font-bold text-brand-primary">Iniciar adoção de ${data}</h3>
                <p class="text-brand-text-muted text-sm">Que alegria! Preencha seus dados básicos para que nossa equipe conecte você ao abrigo responsável.</p>
            </div>
            <div class="space-y-4 pt-2">
                <div>
                    <label class="block text-sm font-bold text-brand-primary mb-1">Seu Nome Completo</label>
                    <input type="text" placeholder="Ex: Camila Silva" class="w-full p-3.5 rounded-xl border border-brand-border bg-brand-background focus:outline-none focus:border-brand-primary">
                </div>
                <div>
                    <label class="block text-sm font-bold text-brand-primary mb-1">WhatsApp de Contato</label>
                    <input type="text" placeholder="(11) 99999-9999" class="w-full p-3.5 rounded-xl border border-brand-border bg-brand-background focus:outline-none focus:border-brand-primary">
                </div>
                <button onclick="submitAdopt('${data}')" class="w-full py-4 bg-brand-primary hover:bg-brand-primary-hover text-white rounded-xl font-display font-bold text-lg shadow-lg shadow-brand-primary/20 transition-all">
                    Enviar Solicitação de Conexão
                </button>
            </div>
        `;
    } else if (type === 'ong') {
        content.innerHTML = `
            <div class="text-center space-y-3">
                <div class="w-16 h-16 bg-brand-secondary-light text-brand-secondary rounded-2xl mx-auto flex items-center justify-center text-3xl font-bold">🛡️</div>
                <h3 class="font-display text-2xl font-bold text-brand-primary">Cadastro de Abrigos e ONGs</h3>
                <p class="text-brand-text-muted text-sm">Faça parte da nossa rede tecnológica e dê visibilidade aos seus pets resgatados.</p>
            </div>
            <div class="space-y-4 pt-2">
                <div>
                    <label class="block text-sm font-bold text-brand-primary mb-1">Nome da Instituição ou ONG</label>
                    <input type="text" placeholder="Ex: Abrigo Amigo Fiel" class="w-full p-3.5 rounded-xl border border-brand-border bg-brand-background focus:outline-none focus:border-brand-primary">
                </div>
                <div>
                    <label class="block text-sm font-bold text-brand-primary mb-1">E-mail Institucional</label>
                    <input type="email" placeholder="contato@ong.org" class="w-full p-3.5 rounded-xl border border-brand-border bg-brand-background focus:outline-none focus:border-brand-primary">
                </div>
                <button onclick="submitOng()" class="w-full py-4 bg-brand-secondary hover:bg-brand-secondary-hover text-white rounded-xl font-display font-bold text-lg shadow-lg shadow-brand-secondary/20 transition-all">
                    Cadastrar Instituição
                </button>
            </div>
        `;
    }
}

function closeModal() {
    const modal = document.getElementById('app-modal');
    if (modal) modal.classList.add('hidden');
}

function likePet(name) {
    openAdoptModal(name);
}

function openAdoptModal(name) {
    openModal('adopt', name);
}

function submitQuiz() {
    const content = document.getElementById('modal-content');
    if (!content) return;
    content.innerHTML = `
        <div class="text-center space-y-4 py-6">
            <div class="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full mx-auto flex items-center justify-center text-4xl font-bold animate-bounce">🎉</div>
            <h3 class="font-display text-2xl font-bold text-brand-primary">Match Calculado com Sucesso!</h3>
            <p class="text-brand-text-muted text-sm">Identificamos 4 pets com perfil altamente compatível com a sua rotina. Estamos preparando sua lista exclusiva!</p>
            <button onclick="closeModal()" class="w-full py-3.5 bg-brand-primary text-white rounded-xl font-display font-bold">Ver Meus Pets Compatíveis</button>
        </div>
    `;
}

function submitAdopt(name) {
    const content = document.getElementById('modal-content');
    if (!content) return;
    content.innerHTML = `
        <div class="text-center space-y-4 py-6">
            <div class="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full mx-auto flex items-center justify-center text-4xl font-bold">✨</div>
            <h3 class="font-display text-2xl font-bold text-brand-primary">Solicitação Enviada!</h3>
            <p class="text-brand-text-muted text-sm">Obrigado! O abrigo responsável por <strong>${name}</strong> entrará em contato via WhatsApp em até 24 horas.</p>
            <button onclick="closeModal()" class="w-full py-3.5 bg-brand-primary text-white rounded-xl font-display font-bold">Continuar Explorando</button>
        </div>
    `;
}

function submitOng() {
    const content = document.getElementById('modal-content');
    if (!content) return;
    content.innerHTML = `
        <div class="text-center space-y-4 py-6">
            <div class="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full mx-auto flex items-center justify-center text-4xl font-bold">🚀</div>
            <h3 class="font-display text-2xl font-bold text-brand-primary">Parceria Solicitada!</h3>
            <p class="text-brand-text-muted text-sm">Nossa equipe de curadoria técnica entrará em contato para alinhar a integração dos perfis dos animais.</p>
            <button onclick="closeModal()" class="w-full py-3.5 bg-brand-primary text-white rounded-xl font-display font-bold">Entendido</button>
        </div>
    `;
}
