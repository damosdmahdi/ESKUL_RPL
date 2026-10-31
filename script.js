// Data awal (starter data)
// Cocok untuk simulasi: siswa bisa menambahkan data diri atau memicu conflict di sini!
let members = [
  {
    id: 1,
    nama: 'Adri Hidayat',
    role: 'Project Manager',
    quotes: 'Always commit, rarely revert.',
  },
  {
    id: 2,
    nama: 'Mentor UI/UX',
    role: 'UI/UX Designer',
    quotes: 'Design is how it works.',
  },
    {
    id: 3,
    nama: 'Muhammad Akmal Nurhakim',
    role: 'Backend Developer',
    quotes: 'Aku terbaik manusia di dunia',
  },
  {
    id: 4,
    nama: 'Repana Pirdaus',
    role: 'Gatau',
    quotes: 'Always Gatau, rarely Gatau.',
},
];

let currentFilter = 'all';

// DOM Elements
const memberForm = document.getElementById('member-form');
const namaInput = document.getElementById('nama');
const roleInput = document.getElementById('role');
const quotesInput = document.getElementById('quotes');
const membersList = document.getElementById('members-list');
const totalCountSpan = document.getElementById('total-count');
const filterButtons = document.querySelectorAll('.filter-btn');

// Fungsi Render Cards ke Halaman
function renderMembers() {
  membersList.innerHTML = '';

  const filteredMembers = currentFilter === 'all' ? members : members.filter((m) => m.role === currentFilter);

  filteredMembers.forEach((member) => {
    const card = document.createElement('div');
    card.className = 'member-card';
    card.innerHTML = `
      <div class="member-header">
        <h3 class="member-name">${escapeHtml(member.nama)}</h3>
        <span class="badge">${escapeHtml(member.role)}</span>
      </div>
      <p class="member-quote">"${escapeHtml(member.quotes)}"</p>
      <button class="btn-delete" onclick="deleteMember(${member.id})">Hapus</button>
    `;
    membersList.appendChild(card);
  });

  totalCountSpan.textContent = members.length;
}

// Fitur Tambah Member
memberForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const newMember = {
    id: Date.now(),
    nama: namaInput.value.trim(),
    role: roleInput.value,
    quotes: quotesInput.value.trim(),
  };

  members.push(newMember);
  renderMembers();

  memberForm.reset();
  namaInput.focus();
});

// Fitur Hapus Member
window.deleteMember = function (id) {
  members = members.filter((m) => m.id !== id);
  renderMembers();
};

// Fitur Filter Role
filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterButtons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.getAttribute('data-filter');
    renderMembers();
  });
});

// Utility untuk mencegah XSS sederhana
function escapeHtml(str) {
  return str.replace(
    /[&<>'"]/g,
    (tag) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;',
      })[tag] || tag,
  );
}

// Inisialisasi tampilan awal
renderMembers();
